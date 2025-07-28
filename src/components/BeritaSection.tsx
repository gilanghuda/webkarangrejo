import React, { useState, useEffect } from "react";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import { uploadImage } from "@/lib/uploadImage";
import { supabase } from "@/lib/supabaseServer";
import BeritaDialog from "./BeritaDialog";
import Image from "next/image";

type Berita = {
  id: number;
  title: string;
  description: string;
  kategori: string;
  image_url: string;
  created_at: string;
  [key: string]: unknown;
};

export default function BeritaSection() {
  const [loading, setLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [picture, setPicture] = useState<File | null>(null);
  const [kategori, setKategori] = useState("");
  const [isClient, setIsClient] = useState(false);
  const [beritaList, setBeritaList] = useState<Berita[]>([]);
  const [editBerita, setEditBerita] = useState<Berita | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Bold,
      Italic,
      Underline,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: desc,
    onUpdate: ({ editor }) => {
      setDesc(editor.getHTML());
    },
    immediatelyRender: false,
  });

  // Fetch berita from Supabase
  const fetchBerita = async () => {
    const { data, error } = await supabase
      .from("berita")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error && data) setBeritaList(data as Berita[]);
  };

  useEffect(() => {
    if (!showDialog) fetchBerita();
  }, [showDialog]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    let imageUrl = "";
    try {
      if (picture) {
        imageUrl = await uploadImage(picture, "berita-images");
      }
      const { error: insertError } = await supabase
        .from("berita")
        .insert([
          {
            title,
            description: desc,
            image_url: imageUrl,
            kategori,
          },
        ]);
      if (insertError) throw insertError;
      setShowDialog(false);
      setTitle("");
      setDesc("");
      setPicture(null);
      setKategori("");
      if (editor) editor.commands.setContent("");
      alert("Berita berhasil diupload!");
      fetchBerita();
    } catch (err: any) {
      console.error("Error uploading berita:", err);
      alert("Gagal upload berita: " + (err?.message || JSON.stringify(err)));
    }
    setLoading(false);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editBerita) return;
    setLoading(true);
    let imageUrl = editBerita.image_url;
    try {
      if (picture) {
        imageUrl = await uploadImage(picture, "berita-images");
      }
      console.log("Update payload:", {
        title,
        description: typeof desc === "string" ? desc : "",
        image_url: imageUrl,
        kategori,
      });
      const { data, error: updateError } = await supabase
        .from("berita")
        .update({
          title,
          description: typeof desc === "string" ? desc : "",
          image_url: imageUrl,
          kategori,
        })
        .eq("id", editBerita.id)
        .select();
      console.log("Supabase update response:", { data, updateError });
      if (updateError) throw updateError;
      setShowDialog(false);
      setEditBerita(null);
      setTitle("");
      setDesc("");
      setPicture(null);
      setKategori("");
      if (editor) editor.commands.setContent("");
      alert("Berita berhasil diperbarui!");
      fetchBerita();
    } catch (err: any) {
      console.error("Error updating berita:", err);
      alert("Gagal perbarui berita: " + (err?.message || JSON.stringify(err)));
    }
    setLoading(false);
  };

  const handleDelete = async () => {
    if (deleteTargetId == null) return;
    setLoading(true);
    try {
      const { error } = await supabase.from("berita").delete().eq("id", deleteTargetId);
      if (error) throw error;
      setDeleteDialogOpen(false);
      setDeleteTargetId(null);
      alert("Berita berhasil dihapus!");
      fetchBerita();
    } catch (err: any) {
      console.error("Error deleting berita:", err);
      alert("Gagal menghapus berita: " + (err?.message || JSON.stringify(err)));
    }
    setLoading(false);
  };

  const openUpdateDialog = (berita: Berita) => {
    setEditBerita(berita);
    setTitle(berita.title);
    setDesc(berita.description);
    setKategori(berita.kategori as string);
    setPicture(null);
    setShowDialog(true);
    if (editor) editor.commands.setContent(berita.description || "");
  };

  return (
    <>
      <section className="w-full bg-[#f6f7fb] rounded-xl p-4 sm:p-6 md:p-8 overflow-hidden container mx-auto px-6">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-black mb-6">Berita Desa</h1>
        <div className="mb-6">
          <div className="bg-white rounded-xl shadow px-4 sm:px-6 py-4 sm:py-5 flex items-center justify-between w-full sm:max-w-xs md:max-w-md">
            <span className="font-medium text-black text-base sm:text-lg md:text-xl">Tambah Berita</span>
            <button
              className="w-12 h-12 flex items-center justify-center rounded-full bg-[#6c3ef4] text-white text-3xl shadow hover:bg-[#5a32c8] transition-colors hover:cursor-pointer"
              onClick={() => setShowDialog(true)}
              aria-label="Tambah Berita"
            >
              +
            </button>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow px-4 sm:px-6 py-4 sm:py-6 overflow-hidden">
          <h2 className="text-base sm:text-lg md:text-xl text-black font-semibold mb-4">Daftar Berita</h2>
          {/* Desktop: Table Layout */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full text-base table-fixed">
              <thead>
                <tr className="bg-[#f6f7fb]">
                  <th className="text-black font-medium px-3 py-2 text-left w-[5%] min-w-[80px]">No</th>
                  <th className="text-black font-medium px-3 py-2 text-left w-[20%] min-w-[120px] max-w-[200px]">Judul</th>
                  <th className="text-black font-medium px-3 py-2 text-left w-[15%] min-w-[100px]">Kategori</th>
                  <th className="text-black font-medium px-3 py-2 text-left w-[15%] min-w-[100px]">Gambar</th>
                  <th className="text-black font-medium px-3 py-2 text-left w-[35%] min-w-[150px] max-w-[300px]">Deskripsi</th>
                  <th className="text-black font-medium px-3 py-2 text-left w-[10%] min-w-[80px]">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {beritaList.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-4 text-black">
                      Belum ada berita.
                    </td>
                  </tr>
                ) : (
                  beritaList.map((berita, idx) => (
                    <tr key={berita.id} className="border-b">
                      <td className="px-3 py-2 text-black">{idx + 1}</td>
                      <td className="px-3 py-2 text-black">{berita.title}</td>
                      <td className="px-3 py-2 text-black">{berita.kategori}</td>
                      <td className="px-3 py-2 text-black">
                        {berita.image_url ? (
                          <Image
                            src={berita.image_url as string}
                            alt="Berita"
                            width={120}
                            height={90}
                            className="max-w-[120px] h-auto rounded object-cover"
                            style={{ aspectRatio: "4/3" }}
                          />
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                      <td className="px-3 py-2 text-black">
                        <div
                          className="max-w-[300px] line-clamp-3"
                          dangerouslySetInnerHTML={{ __html: berita.description }}
                        />
                      </td>
                      <td className="px-3 py-2 text-black">
                        <div className="flex gap-2 items-center">
                          <button
                            type="button"
                            title="Update"
                            className="p-2.5 rounded hover:bg-[#f6f7fb] transition hover:cursor-pointer"
                            onClick={() => openUpdateDialog(berita)}
                          >
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                              <path d="M4 21h4.586a2 2 0 0 0 1.414-.586l9.707-9.707a2 2 0 0 0 0-2.828l-3.172-3.172a2 2 0 0 0-2.828 0L4.586 14.414A2 2 0 0 0 4 15.828V21z" stroke="#F2994A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M14.828 7.172l2 2" stroke="#F2994A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </button>
                          <button
                            type="button"
                            title="Delete"
                            className="p-2.5 rounded hover:bg-[#f6f7fb] transition hover:cursor-pointer"
                            onClick={() => {
                              setDeleteTargetId(berita.id);
                              setDeleteDialogOpen(true);
                            }}
                          >
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                              <path d="M3 6h18" stroke="#EB5757" strokeWidth="2" strokeLinecap="round"/>
                              <path d="M8 6V4a2 2 0 0 1 2-2h4a2 0 0 1 2 2v2" stroke="#EB5757" strokeWidth="2" strokeLinecap="round"/>
                              <rect x="5" y="6" width="14" height="14" rx="2" stroke="#EB5757" strokeWidth="2"/>
                              <path d="M10 11v6" stroke="#EB5757" strokeWidth="2" strokeLinecap="round"/>
                              <path d="M14 11v6" stroke="#EB5757" strokeWidth="2" strokeLinecap="round"/>
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          {/* Mobile/iPad: Card Layout */}
          <div className="block lg:hidden space-y-4">
            {beritaList.length === 0 ? (
              <div className="text-center py-4 text-black text-base md:text-lg">Belum ada berita.</div>
            ) : (
              beritaList.map((berita, idx) => (
                <div key={berita.id} className="bg-white rounded-xl shadow p-4 border">
                  <div className="grid grid-cols-1 gap-3">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-black text-base md:text-lg">No: {idx + 1}</span>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          title="Update"
                          className="p-2.5 rounded hover:bg-[#f6f7fb] transition hover:cursor-pointer"
                          onClick={() => openUpdateDialog(berita)}
                        >
                          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                            <path d="M4 21h4.586a2 2 0 0 0 1.414-.586l9.707-9.707a2 2 0 0 0 0-2.828l-3.172-3.172a2 2 0 0 0-2.828 0L4.586 14.414A2 2 0 0 0 4 15.828V21z" stroke="#F2994A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M14.828 7.172l2 2" stroke="#F2994A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </button>
                        <button
                          type="button"
                          title="Delete"
                          className="p-2.5 rounded hover:bg-[#f6f7fb] transition hover:cursor-pointer"
                          onClick={() => {
                            setDeleteTargetId(berita.id);
                            setDeleteDialogOpen(true);
                          }}
                        >
                          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                            <path d="M3 6h18" stroke="#EB5757" strokeWidth="2" strokeLinecap="round"/>
                            <path d="M8 6V4a2 0 0 1 2-2h4a2 0 0 1 2 2v2" stroke="#EB5757" strokeWidth="2" strokeLinecap="round"/>
                            <rect x="5" y="6" width="14" height="14" rx="2" stroke="#EB5757" strokeWidth="2"/>
                            <path d="M10 11v6" stroke="#EB5757" strokeWidth="2" strokeLinecap="round"/>
                            <path d="M14 11v6" stroke="#EB5757" strokeWidth="2" strokeLinecap="round"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div>
                      <span className="font-medium text-black text-base md:text-lg">Judul:</span>
                      <p className="text-black">{berita.title}</p>
                    </div>
                    <div>
                      <span className="font-medium text-black text-base md:text-lg">Kategori:</span>
                      <p className="text-black">{berita.kategori}</p>
                    </div>
                    <div>
                      <span className="font-medium text-black text-base md:text-lg">Gambar:</span>
                      {berita.image_url ? (
                        <Image
                          src={berita.image_url as string}
                          alt="Berita"
                          width={150}
                          height={112.5}
                          className="max-w-[150px] h-auto rounded object-cover mt-1"
                          style={{ aspectRatio: "4/3" }}
                        />
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </div>
                    <div>
                      <span className="font-medium text-black text-base md:text-lg">Deskripsi:</span>
                      <div
                        className="max-w-full line-clamp-3"
                        dangerouslySetInnerHTML={{ __html: berita.description }}
                      />
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
      {showDialog && (
        <BeritaDialog
          setShowDialog={(v: boolean) => {
            setShowDialog(v);
            if (!v) setEditBerita(null);
          }}
          title={title}
          setTitle={setTitle}
          picture={picture}
          setPicture={setPicture}
          kategori={kategori}
          setKategori={setKategori}
          loading={loading}
          handleSubmit={editBerita ? handleUpdate : handleSubmit}
          editor={editor}
          isClient={isClient}
          editBerita={editBerita}
        />
      )}
      {deleteDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 max-w-[90vw] sm:max-w-xs md:max-w-md w-full">
            <h3 className="text-base md:text-lg font-semibold mb-2 text-black">Konfirmasi Hapus</h3>
            <p className="mb-4 text-black text-sm md:text-base">Yakin ingin menghapus berita ini?</p>
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 rounded bg-gray-200 text-black text-sm md:text-base hover:bg-gray-300"
                onClick={() => {
                  setDeleteDialogOpen(false);
                  setDeleteTargetId(null);
                }}
                disabled={loading}
              >
                Batal
              </button>
              <button
                className="px-4 py-2 rounded bg-red-600 text-white text-sm md:text-base hover:bg-red-700"
                onClick={handleDelete}
                disabled={loading}
              >
                {loading ? "Menghapus..." : "Hapus"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}