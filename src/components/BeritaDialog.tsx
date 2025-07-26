import React from "react";
import { EditorContent } from "@tiptap/react";

export default function BeritaDialog({
  showDialog,
  setShowDialog,
  title,
  setTitle,
  desc,
  setDesc,
  picture,
  setPicture,
  kategori,
  setKategori,
  loading,
  handleSubmit,
  editor,
  isClient,
  editBerita,
}: any) {
  const handlePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) setPicture(e.target.files[0]);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <form
        className="bg-white rounded-lg shadow-lg p-4 sm:p-8 w-full max-w-3xl mx-2 flex flex-col gap-4"
        style={{ minWidth: 0 }}
        onSubmit={handleSubmit}
      >
        <h2 className="text-lg font-semibold mb-2 text-black">
          {editBerita ? "Perbarui Berita" : "Tambah Berita"}
        </h2>
        <div
          className="flex flex-col md:flex-row gap-4 md:gap-6"
          style={{ minHeight: 0 }}
        >
          <div
            className="flex flex-col gap-4 min-w-0"
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
                <option value="Umum"></option>
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
                className="px-2 py-1 bg-[#6c3ef4] text-white rounded hover:bg-[#5a2edc] text-sm hover:cursor-pointer"
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
            className="min-w-0 flex flex-col"
            style={{ flex: 5, minWidth: 0 }}
          >
            <label className="block text-sm font-medium text-black mb-1">
              Deskripsi
            </label>
            <div
              className="border rounded-md bg-white cursor-text text-black px-3 py-2 outline-none focus-within:border-[#6c3ef4] transition"
              style={{ minHeight: 350, position: "relative" }}
              onClick={() => editor?.chain().focus().run()}
            >
              <div className="flex gap-3 pb-2 border-b mb-2">
                <button
                  type="button"
                  onClick={() => editor?.chain().focus().toggleBold().run()}
                  className={`w-8 h-8 flex items-center justify-center border rounded-md text-black bg-white transition hover:bg-gray-100 hover:scale-105 active:bg-gray-200 ${
                    editor?.isActive("bold") ? "font-bold bg-gray-200" : ""
                  }`}
                  aria-label="Bold"
                >
                  B
                </button>
                <button
                  type="button"
                  onClick={() => editor?.chain().focus().toggleItalic().run()}
                  className={`w-8 h-8 flex items-center justify-center border rounded-md text-black bg-white transition hover:bg-gray-100 hover:scale-105 active:bg-gray-200 ${
                    editor?.isActive("italic") ? "italic bg-gray-200" : ""
                  }`}
                  aria-label="Italic"
                >
                  I
                </button>
                <button
                  type="button"
                  onClick={() => editor?.chain().focus().toggleUnderline().run()}
                  className={`w-8 h-8 flex items-center justify-center border rounded-md text-black bg-white transition hover:bg-gray-100 hover:scale-105 active:bg-gray-200 ${
                    editor?.isActive("underline") ? "underline bg-gray-200" : ""
                  }`}
                  aria-label="Underline"
                >
                  U
                </button>
                <button
                  type="button"
                  onClick={() => editor?.chain().focus().setTextAlign("left").run()}
                  className={`w-8 h-8 flex items-center justify-center border rounded-md text-black bg-white transition hover:bg-gray-100 hover:scale-105 active:bg-gray-200 ${
                    editor?.isActive({ textAlign: "left" })
                      ? "font-bold bg-gray-200"
                      : ""
                  }`}
                  aria-label="Align Left"
                >
                  <span style={{ fontWeight: "bold" }}>L</span>
                </button>
                <button
                  type="button"
                  onClick={() => editor?.chain().focus().setTextAlign("center").run()}
                  className={`w-8 h-8 flex items-center justify-center border rounded-md text-black bg-white transition hover:bg-gray-100 hover:scale-105 active:bg-gray-200 ${
                    editor?.isActive({ textAlign: "center" })
                      ? "font-bold bg-gray-200"
                      : ""
                  }`}
                  aria-label="Align Center"
                >
                  <span style={{ fontWeight: "bold" }}>C</span>
                </button>
                <button
                  type="button"
                  onClick={() => editor?.chain().focus().setTextAlign("right").run()}
                  className={`w-8 h-8 flex items-center justify-center border rounded-md text-black bg-white transition hover:bg-gray-100 hover:scale-105 active:bg-gray-200 ${
                    editor?.isActive({ textAlign: "right" })
                      ? "font-bold bg-gray-200"
                      : ""
                  }`}
                  aria-label="Align Right"
                >
                  <span style={{ fontWeight: "bold" }}>R</span>
                </button>
              </div>
              {isClient && (
                <div
                  className="w-full h-[300px] text-black outline-none overflow-y-auto"
                  style={{ color: "#222", minHeight: 220 }}
                >
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
        <div className="flex justify-end gap-2 mt-2 flex-wrap">
          <button
            type="button"
            className="px-4 py-2 bg-gray-200 text-black rounded hover:bg-gray-300 hover:cursor-pointer"
            onClick={() => setShowDialog(false)}
          >
            Batal
          </button>
          <button
            type="submit"
            className={`px-4 py-2 bg-[#6c3ef4] text-white rounded hover:bg-[#5a2edc] ${
              loading ? "opacity-60 cursor-not-allowed" : ""
            } hover:cursor-pointer`}
            disabled={loading}
          >
            {loading
              ? editBerita
                ? "Memperbarui..."
                : "Uploading..."
              : editBerita
                ? "Perbaharui"
                : "Simpan"}
          </button>
        </div>
      </form>
      <style>{`
        @media (max-width: 640px) {
          .min-w-\\[600px\\] { min-width: 0 !important; }
          .max-w-3xl { max-width: 100vw !important; }
          form { padding: 1rem !important; }
        }
      `}</style>
    </div>
  );
}
