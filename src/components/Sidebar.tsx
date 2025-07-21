import React from "react";

export default function Sidebar() {
  return (
    <aside className="hidden sm:flex flex-col w-56 bg-white border-r border-gray-100 py-6 px-4 min-h-full">
      <nav className="flex flex-col gap-2">
        <button className="bg-gray-100 text-black rounded-lg py-2 font-medium">
          Dashboard
        </button>
        <button className="bg-[#6c3ef4] text-white rounded-lg py-2 font-medium">
          Berita Desa
        </button>
      </nav>
    </aside>
  );
}
