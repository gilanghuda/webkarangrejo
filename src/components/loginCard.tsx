import React, { useState } from "react";

export default function LoginCard({
  email,
  password,
  setEmail,
  setPassword,
  handleSignIn,
  loading,
}: {
  email: string;
  password: string;
  setEmail: (v: string) => void;
  setPassword: (v: string) => void;
  handleSignIn: () => void;
  loading?: boolean;
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative w-full flex flex-col items-center px-2">
      <div className="bg-white rounded-xl shadow-md px-2 py-6 sm:px-8 sm:py-10 w-full max-w-md mx-auto flex flex-col gap-6 z-10">
        <div className="flex items-center gap-2 mb-2">
          {/* Logo */}
          <div className="w-7 h-7 rounded-md flex items-center justify-center bg-white">
            <img
              src="/logo-desa.png"
              alt="Logo Desa Karangrejo"
              className="object-contain w-7 h-7"
              draggable={false}
            />
          </div>
          <span className="font-bold text-lg sm:text-xl text-black">
            Admin Desa Karangrejo
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-medium text-[#1a357a] font-montserrat mb-2">
          Selamat Datang
        </h2>
        <form
          className="flex flex-col gap-4"
          onSubmit={e => {
            e.preventDefault();
            handleSignIn();
          }}
        >
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-[#1a357a] mb-1"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Email"
              className="w-full px-3 py-2 sm:px-4 sm:py-2 rounded-md border border-gray-200 text-base text-black outline-none focus:border-[#1a357a] transition"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-[#1a357a] mb-1"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full px-3 py-2 sm:px-4 sm:py-2 rounded-md border border-gray-200 text-base text-black outline-none focus:border-[#1a357a] transition"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#1a357a] focus:outline-none hover:cursor-pointer"
                onClick={() => setShowPassword(v => !v)}
                tabIndex={-1}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  // Eye open SVG
                  <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
                    <path d="M10 4C5.454 4 2.273 8.09 2.273 10c0 1.91 3.181 6 7.727 6s7.727-4.09 7.727-6c0-1.91-3.181-6-7.727-6zm0 10c-2.485 0-4.5-2.015-4.5-4.5S7.515 5 10 5s4.5 2.015 4.5 4.5S12.485 14 10 14zm0-7a2.5 2.5 0 100 5 2.5 2.5 0 000-5z" fill="currentColor"/>
                  </svg>
                ) : (
                  // Eye closed SVG
                  <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
                    <path d="M2 2l16 16M10 4c-4.546 0-7.727 4.09-7.727 6 0 .97.62 2.37 1.68 3.68M10 16c4.546 0 7.727-4.09 7.727-6 0-.97-.62-2.37-1.68-3.68M7.5 10a2.5 2.5 0 014.5 0m-2.5 2.5a2.5 2.5 0 01-2.5-2.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                )}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className={`bg-[#1a357a] text-white font-semibold rounded-md py-2 mt-2 text-base text-black transition flex items-center justify-center ${loading ? 'opacity-60 cursor-not-allowed' : 'hover:bg-[#16306a]'} hover:cursor-pointer`}
            disabled={loading}
          >
            {loading ? (
              <span className="inline-block w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
            ) : null}
            {loading ? 'Loading...' : 'Log in'}
          </button>
        </form>
      </div>
    </div>
  );
}
