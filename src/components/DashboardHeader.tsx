import React from "react";

export default function DashboardHeader() {
  return (
    <header className="w-full bg-white flex items-center justify-between px-4 sm:px-8 py-3 border-b border-gray-100">
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 bg-neutral-800 rounded-md flex items-center justify-center"></div>
        <span className="font-bold text-lg text-black">
          Admin Desa Karangrejo
        </span>
      </div>
      <div className="flex items-center gap-4">
        <span className="hidden sm:inline text-gray-500">
          <svg width="20" height="20" fill="none" className="inline mr-1">
            <circle cx="10" cy="10" r="9" stroke="#222" strokeWidth="2" />
            <path d="M10 6v5" stroke="#222" strokeWidth="2" strokeLinecap="round"/>
            <path d="M10 14h.01" stroke="#222" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          Logout
        </span>
      </div>
    </header>
  );
}
