import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function DashboardHeader({
  user,
  handleSignOut,
}: {
  user: { email?: string };
  handleSignOut: () => void;
}) {
  const [showDialog, setShowDialog] = useState(false);

  const onLogoutClick = () => setShowDialog(true);
  const onConfirm = () => {
    setShowDialog(false);
    handleSignOut();
  };
  const onCancel = () => setShowDialog(false);

  return (
    <>
      <header className="w-full bg-white flex items-center justify-between px-4 sm:px-8 py-3 border-b border-gray-100">
        <Link href="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity cursor-pointer" aria-label="Kembali ke halaman utama">
          <div className="w-7 h-7 rounded-md flex items-center justify-center bg-white">
            <Image
              src="/logo-desa.png"
              alt="Logo Desa Karangrejo"
              width={28}
              height={28}
              className="object-contain w-7 h-7"
              draggable={false}
            />
          </div>
          <span className="font-bold text-lg text-black">
            Admin Desa Karangrejo
          </span>
        </Link>
        <div className="flex items-center gap-4 flex-wrap">
          <span
            className="w-23 border-gray-100 bg-gray-100 text-black rounded-lg py-2 font-medium cursor-pointer hover:cursor-pointer flex items-center gap-1"
            onClick={onLogoutClick}
          >
            <svg width="20" height="20" fill="none" className="inline mr-1">
              <circle cx="10" cy="10" r="9" stroke="#222" strokeWidth="2" />
              <path
                d="M10 6v5"
                stroke="#222"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M10 14h.01"
                stroke="#222"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            Logout
          </span>
          <div className="w-8 h-8 bg-[#6c3ef4] rounded-full flex items-center justify-center border-4 border-black/20">
            <span className="text-white font-bold" title={user?.email || ""}>
              {user?.email?.[0]?.toUpperCase() || "U"}
            </span>
          </div>
        </div>
      </header>
      {showDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-2">
          <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 min-w-0 w-full max-w-xs">
            <h2 className="text-lg text-black font-semibold mb-2">Konfirmasi Logout</h2>
            <p className="mb-4 text-black">Apakah Anda yakin ingin logout?</p>
            <div className="flex justify-end gap-2 flex-wrap">
              <button
                className="px-4 py-2 bg-gray-200 text-black rounded hover:bg-gray-300 hover:cursor-pointer"
                onClick={onCancel}
              >
                Batal
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 hover:cursor-pointer"
                onClick={onConfirm}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}