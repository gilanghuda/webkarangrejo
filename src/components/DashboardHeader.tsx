import React, { useState } from "react";

export default function DashboardHeader({
  user,
  handleSignOut,
}: {
  user: any;
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
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-neutral-800 rounded-md flex items-center justify-center"></div>
          <span className="font-bold text-lg text-black">
            Admin Desa Karangrejo
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span
            className="hidden sm:inline text-gray-500 cursor-pointer"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-lg shadow-lg p-6 min-w-[300px]">
            <h2 className="text-lg text-black font-semibold mb-2">Konfirmasi Logout</h2>
            <p className="mb-4 text-black">Apakah Anda yakin ingin logout?</p>
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-gray-200 text-black rounded hover:bg-gray-300"
                onClick={onCancel}
              >
                Batal
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
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
