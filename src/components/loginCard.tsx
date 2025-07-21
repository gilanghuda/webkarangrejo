import React from "react";

export default function LoginCard() {
  return (
    <div className="bg-white rounded-xl shadow-md px-4 py-8 sm:px-8 sm:py-10 w-full max-w-md mx-auto flex flex-col gap-6">
      <div className="flex items-center gap-2 mb-2">
        {/* Logo */}
        <div className="w-7 h-7 bg-neutral-800 rounded-md flex items-center justify-center">
          {/* Replace with SVG if needed */}
        </div>
        <span className="font-bold text-lg sm:text-xl text-black">
          Admin Desa Karangrejo
        </span>
      </div>
      <h2 className="text-2xl sm:text-3xl font-medium text-[#1a357a] font-montserrat mb-2">
        Selamat Datang
      </h2>
      <form className="flex flex-col gap-4">
        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium text-[#1a357a] mb-1"
          >
            Username
          </label>
          <input
            id="username"
            type="text"
            placeholder="Username"
            className="w-full px-3 py-2 sm:px-4 sm:py-2 rounded-md border border-gray-200 text-base outline-none focus:border-[#1a357a] transition"
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-[#1a357a] mb-1"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            className="w-full px-3 py-2 sm:px-4 sm:py-2 rounded-md border border-gray-200 text-base outline-none focus:border-[#1a357a] transition"
          />
        </div>
        <button
          type="submit"
          className="bg-[#1a357a] text-white font-semibold rounded-md py-2 mt-2 text-base hover:bg-[#16306a] transition"
        >
          Log in
        </button>
      </form>
    </div>
  );
}
