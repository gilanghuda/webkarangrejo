import React, { useState, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";

export default function BeritaSection() {
  const [showDialog, setShowDialog] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [picture, setPicture] = useState<File | null>(null);
  const [kategori, setKategori] = useState("");
  const [isClient, setIsClient] = useState(false);

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

  const handlePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) setPicture(e.target.files[0]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: handle berita submit logic here
    setShowDialog(false);
    setTitle("");
    setDesc("");
    setPicture(null);
    setKategori("");
  };

  return (
    <>
      <section className="w-full bg-[#f6f7fb] rounded-xl p-2 sm:p-6">
        <h1 className="text-2xl font-semibold text-black mb-6">Berita Desa</h1>
        <div className="mb-6">
          <div className="bg-white rounded-xl shadow px-6 py-5 flex items-center justify-between max-w-xs">
            <span className="font-medium text-black">Tambah Berita</span>
            <button
              className="w-8 h-8 flex items-center justify-center rounded-full bg-[#6c3ef4] text-white text-2xl shadow"
              onClick={() => setShowDialog(true)}
              aria-label="Tambah Berita"
            >
              +
            </button>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow px-4 py-6">
          <h2 className="text-lg font-semibold mb-4">Daftar Berita</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-[#f6f7fb]">
                  <th className="text-[#6c3ef4] font-medium px-3 py-2 text-left">
                    No
                  </th>
                  <th className="text-[#6c3ef4] font-medium px-3 py-2 text-left">
                    Judul Berita
                  </th>
                  <th className="text-[#6c3ef4] font-medium px-3 py-2 text-left">
                    Deskripsi
                  </th>
                  <th className="text-[#6c3ef4] font-medium px-3 py-2 text-left">
                    Kategori
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* Empty state */}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      {showDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <form
            className="bg-white rounded-lg shadow-lg p-8 min-w-[600px] w-full max-w-3xl flex flex-col gap-4"
            onSubmit={handleSubmit}
          >
            <h2 className="text-lg font-semibold mb-2 text-black">
              Tambah Berita
            </h2>
            <div
              className="flex flex-col md:flex-row gap-6"
              style={{ minHeight: 350 }}
            >
              <div
                className="flex flex-col gap-4 min-w-[200px]"
                style={{ flex: 1 }}
              >
                <div>
                  <label className="block text-sm font-medium text-black mb-1">
                    Judul Berita
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3 py-2 rounded-md border text-base text-black outline-none focus:border-[#6c3ef4] transition"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black mb-1">
                    Kategori
                  </label>
                  <select
                    value={kategori}
                    onChange={(e) => setKategori(e.target.value)}
                    className="w-full px-3 py-2 rounded-md border text-base text-black outline-none focus:border-[#6c3ef4] transition"
                    required
                  >
                    <option value="Umum">Umum</option>
                    <option value="Pemerintahan">Pemerintahan</option>
                    <option value="Kegiatan">Kegiatan</option>
                    <option value="Pengumuman">Pengumuman</option>
                  </select>
                </div>
                <div className="flex flex-col gap-2 w-full">
                  <label className="block text-sm font-medium text-black mb-1">
                    Gambar
                  </label>
                  <button
                    type="button"
                    className="px-2 py-1 bg-[#6c3ef4] text-white rounded hover:bg-[#5a2edc] text-sm"
                    onClick={() =>
                      document.getElementById("upload-gambar")?.click()
                    }
                  >
                    Upload Gambar
                  </button>
                  <input
                    id="upload-gambar"
                    type="file"
                    accept="image/*"
                    onChange={handlePictureChange}
                    className="hidden"
                  />
                  {picture && (
                    <img
                      src={URL.createObjectURL(picture)}
                      alt="Preview"
                      className="mt-2 rounded max-h-32"
                    />
                  )}
                </div>
              </div>
              <div
                className="min-w-[200px] flex flex-col"
                style={{ flex: 5, minWidth: 0 }}
              >
                <label className="block text-sm font-medium text-black mb-1">
                  Deskripsi
                </label>
                <div
                className="border rounded-md bg-white cursor-text text-black px-3 py-2 outline-none focus-within:border-[#6c3ef4] transition"
                style={{ minHeight: 350, position: 'relative' }}
                onClick={() => editor?.chain().focus().run()}
                >
                  <div className="flex gap-3 pb-2 border-b mb-2">
                    <button
                      type="button"
                      onClick={() => editor?.chain().focus().toggleBold().run()}
                      className={`w-8 h-8 flex items-center justify-center border rounded-md text-black bg-white transition hover:bg-gray-100 hover:scale-105 active:bg-gray-200 ${editor?.isActive('bold') ? 'font-bold bg-gray-200' : ''}`}
                      aria-label="Bold"
                    >
                      B
                    </button>
                    <button
                      type="button"
                      onClick={() => editor?.chain().focus().toggleItalic().run()}
                      className={`w-8 h-8 flex items-center justify-center border rounded-md text-black bg-white transition hover:bg-gray-100 hover:scale-105 active:bg-gray-200 ${editor?.isActive('italic') ? 'italic bg-gray-200' : ''}`}
                      aria-label="Italic"
                    >
                      I
                    </button>
                    <button
                      type="button"
                      onClick={() => editor?.chain().focus().toggleUnderline().run()}
                      className={`w-8 h-8 flex items-center justify-center border rounded-md text-black bg-white transition hover:bg-gray-100 hover:scale-105 active:bg-gray-200 ${editor?.isActive('underline') ? 'underline bg-gray-200' : ''}`}
                      aria-label="Underline"
                    >
                      U
                    </button>
                    <button
                      type="button"
                      onClick={() => editor?.chain().focus().setTextAlign('left').run()}
                      className={`w-8 h-8 flex items-center justify-center border rounded-md text-black bg-white transition hover:bg-gray-100 hover:scale-105 active:bg-gray-200 ${editor?.isActive({ textAlign: 'left' }) ? 'font-bold bg-gray-200' : ''}`}
                      aria-label="Align Left"
                    >
                      <span style={{ fontWeight: "bold" }}>L</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => editor?.chain().focus().setTextAlign('center').run()}
                      className={`w-8 h-8 flex items-center justify-center border rounded-md text-black bg-white transition hover:bg-gray-100 hover:scale-105 active:bg-gray-200 ${editor?.isActive({ textAlign: 'center' }) ? 'font-bold bg-gray-200' : ''}`}
                      aria-label="Align Center"
                    >
                      <span style={{ fontWeight: "bold" }}>C</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => editor?.chain().focus().setTextAlign('right').run()}
                      className={`w-8 h-8 flex items-center justify-center border rounded-md text-black bg-white transition hover:bg-gray-100 hover:scale-105 active:bg-gray-200 ${editor?.isActive({ textAlign: 'right' }) ? 'font-bold bg-gray-200' : ''}`}
                      aria-label="Align Right"
                    >
                      <span style={{ fontWeight: "bold" }}>R</span>
                    </button>
                  </div>
                  {isClient && (
                    <div className="w-full h-[300px] text-black outline-none overflow-y-auto" style={{ color: '#222', minHeight: 220 }}>
                      <EditorContent
                        editor={editor}
                        className="w-full h-full"
                        style={{ minHeight: 220 }}
                      />
                    </div>
                  )}
                  <style>{`
                    .ProseMirror {
                      color: #222 !important;
                      outline: none !important;
                      background: transparent;
                    }
                    .ProseMirror:focus {
                      outline: none !important;
                    }
                    .ProseMirror strong,
                    .ProseMirror em,
                    .ProseMirror u {
                      color: #222 !important;
                    }
                  `}</style>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-2">
              <button
                type="button"
                className="px-4 py-2 bg-gray-200 text-black rounded hover:bg-gray-300"
                onClick={() => setShowDialog(false)}
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-[#6c3ef4] text-white rounded hover:bg-[#5a2edc]"
              >
                Simpan
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
