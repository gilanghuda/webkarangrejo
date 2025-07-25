"use client";

import React, { useState } from "react";
import Image from "next/image";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      setIsMenuOpen(false);
    }
  };

  const navigationItems = [
    { id: "home", label: "Home" },
    { id: "profil", label: "Profil" },
    { id: "wisata", label: "Wisata" },
    { id: "berita", label: "Berita" },
    { id: "kontak", label: "Kontak" },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#1C270C]/70 backdrop-blur-sm h-[123px]">
        <div className="container mx-auto px-6 h-full">
          <div className="flex items-center justify-between h-full">
            {/* Logo and Title Section */}
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 relative">
                <Image
                  src="/logo-desa.png"
                  alt="Logo Desa Karangrejo"
                  width={64}
                  height={64}
                  className="object-contain"
                />
              </div>
              <div className="text-white">
                <h1 className="text-xl font-bold leading-tight font-sans">
                  Desa Karangrejo
                </h1>
                <p className="text-lg font-medium opacity-90 font-sans">
                  Kabupaten Blitar
                </p>
              </div>
            </div>

            {/* Desktop Navigation Menu */}
            <div className="hidden lg:flex items-center space-x-5">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-white text-xl font-bold transition-colors duration-300 px-4 py-2 rounded-md hover:bg-[#2a3815] hover:bg-opacity-70 font-sans"
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Tablet Navigation Menu */}
            <div className="hidden md:flex lg:hidden items-center space-x-3">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-white text-base font-bold transition-colors duration-300 px-3 py-1 rounded-md hover:bg-[#2a3815] hover:bg-opacity-70 font-sans"
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white text-2xl font-sans p-2"
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              >
                {isMenuOpen ? "✕" : "☰"}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Full-screen Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          {/* Full-screen Menu Background */}
          <div
            className="absolute inset-0 bg-[#1C270C]/70 backdrop-blur-sm"
            onClick={() => setIsMenuOpen(false)}
          />

          {/* Menu Content - Centered */}
          <div className="absolute inset-0 flex flex-col items-center justify-center space-y-8 p-6">
            {/* Close Button (Top Right) */}
            <button
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-8 right-6 text-white text-3xl p-2"
              aria-label="Close menu"
            >
              ✕
            </button>

            {/* Menu Items */}
            <div className="w-full max-w-md space-y-4">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="w-full text-white text-2xl font-bold py-4 px-6 rounded-md hover:bg-[#2a3815] hover:bg-opacity-70 text-center font-sans transition-all duration-200"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;