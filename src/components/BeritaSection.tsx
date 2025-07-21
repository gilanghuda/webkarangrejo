import React from "react";

export default function BeritaSection() {
  return (
    <section className="w-full bg-[#f6f7fb] rounded-xl p-2 sm:p-6">
      <h1 className="text-2xl font-semibold text-black mb-6">Berita Desa</h1>
      <div className="mb-6">
        <div className="bg-white rounded-xl shadow px-6 py-5 flex items-center justify-between max-w-xs">
          <span className="font-medium text-black">Tambah Berita</span>
          <button className="w-8 h-8 flex items-center justify-center rounded-full bg-[#6c3ef4] text-white text-2xl shadow">
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
                <th className="text-[#6c3ef4] font-medium px-3 py-2 text-left">No</th>
                <th className="text-[#6c3ef4] font-medium px-3 py-2 text-left">Judul Berita</th>
                <th className="text-[#6c3ef4] font-medium px-3 py-2 text-left">Deskripsi</th>
                <th className="text-[#6c3ef4] font-medium px-3 py-2 text-left">Kategori</th>
              </tr>
            </thead>
            <tbody>
              {/* Empty state */}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
