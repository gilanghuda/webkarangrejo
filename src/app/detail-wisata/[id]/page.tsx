"use client";

import React, { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Camera, ChevronLeft, ChevronRight } from "lucide-react";
import Footer from "@/components/Footer";

interface TourismDetail {
  id: string;
  name: string;
  name2: string;
  description: string;
  detail: {
    overview: string;
    experience: string;
  };
  details: {
    location: string;
    ticketPrice: string;
    duration?: { ascent: string; descent: string };
    campingArea?: string;
    guide?: string;
    route?: string;
    waterSource?: string;
    operationalHours?: string;
    parking?: string;
    facilities?: string;
    photoSpots?: string;
    favoriteActivities?: string;
  };
  images: string[];
}

const TourismDetail: React.FC = () => {
  const { id } = useParams();
  const [tourismData, setTourismData] = useState<TourismDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [galleryImageIndex, setGalleryImageIndex] = useState(0);
  const parallaxRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      parallaxRefs.current.forEach((ref) => {
        if (ref) {
          const scrollPosition = window.pageYOffset;
          ref.style.transform = `translateY(${scrollPosition * 0.5}px)`;
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    fetch("/tourism.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch tourism data");
        }
        return response.json();
      })
      .then((data) => {
        const item = data.find((item: TourismDetail) => item.id === id);
        setTourismData(item || null);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching tourism data:", error);
        setLoading(false);
      });
  }, [id]);

  // Automatic image cycling for main, large, and small images
  useEffect(() => {
    if (!tourismData || tourismData.images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % tourismData.images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [tourismData]);

  const handleImageClick = (index: number) => {
    if (index === currentImageIndex) return;
    setCurrentImageIndex(index);
  };

  const nextGalleryImage = () => {
    setGalleryImageIndex((prev) => (prev + 1) % (tourismData?.images.length || 1));
  };

  const prevGalleryImage = () => {
    setGalleryImageIndex((prev) => (prev - 1 + (tourismData?.images.length || 1)) % (tourismData?.images.length || 1));
  };

  if (loading) {
    return <div className="min-h-screen bg-white text-center py-16">Loading...</div>;
  }

  if (!tourismData) {
    return <div className="min-h-screen bg-white text-center py-16">Tourism destination not found</div>;
  }

  const paragraphs = tourismData.description.split("\n\n");
  const smallImageIndices = [
    (currentImageIndex + 1) % tourismData.images.length,
    (currentImageIndex + 2) % tourismData.images.length,
    (currentImageIndex + 3) % tourismData.images.length,
  ];
  const gallerySmallImageIndices = [
    (galleryImageIndex + 1) % tourismData.images.length,
    (galleryImageIndex + 2) % tourismData.images.length,
    (galleryImageIndex + 3) % tourismData.images.length,
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Embedded Navbar */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 bg-[#1C270C]/70 backdrop-blur-sm h-[80px] md:h-[123px]"
        role="navigation"
        aria-label="Tourism Detail Navigation"
      >
        <div className="container mx-auto px-4 md:px-6 h-full flex items-center">
          <div className="flex flex-col md:flex-row items-center justify-between w-full">
            <Link
              href="/"
              className="flex items-center space-x-4 justify-start cursor-pointer hover:opacity-90 transition-opacity"
              aria-label="Kembali ke halaman utama Desa Karangrejo"
            >
              <div className="w-10 md:w-16 h-10 md:h-16 relative flex-shrink-0">
                <Image
                  src="/logo-desa.png"
                  alt="Logo Desa Karangrejo"
                  width={64}
                  height={64}
                  className="object-contain"
                />
              </div>
              <div className="text-white text-left">
                <h1 className="text-base md:text-xl font-bold leading-tight font-sans">
                  Desa Karangrejo
                </h1>
                <p className="text-xs md:text-lg font-medium opacity-90 font-sans">
                  Kabupaten Blitar
                </p>
              </div>
            </Link>
            <div
              className="hidden md:block text-white text-right"
              aria-label={tourismData ? (tourismData.id === "gunung-kelud" ? `${tourismData.name} ${tourismData.name2}` : tourismData.name) : "Wisata Desa"}
            >
              {tourismData ? (
                tourismData.id === "gunung-kelud" ? (
                  <div className="flex flex-col leading-tight">
                    <span className="text-xl font-bold font-sans">
                      {tourismData.name}
                    </span>
                    <span className="text-base font-medium font-sans">
                      {tourismData.name2}
                    </span>
                  </div>
                ) : (
                  <span className="text-xl font-bold font-sans">
                    {tourismData.name}
                  </span>
                )
              ) : (
                <span className="text-xl font-bold font-sans">
                  Wisata Desa
                </span>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Image with Parallax Effect and Fade Transition */}
      <div className="w-full h-[478px] overflow-hidden relative" aria-live="polite">
        <div className="absolute inset-0">
          {tourismData.images.map((src, index) => (
            <div
              key={src}
              ref={(el) => {
                parallaxRefs.current[index] = el;
              }}
              className={`absolute inset-0 will-change-transform transition-opacity duration-1000 ease-in-out ${
                index === currentImageIndex ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                src={src}
                alt={`${tourismData.name} view ${index + 1}`}
                fill
                className="object-cover"
                priority={index === 0}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Image and Description Section */}
      <div className="container mx-auto px-6 py-12 relative z-10 bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            {/* Large Image with Fade Transition */}
            <div className="w-full h-96 bg-white rounded-xl shadow-lg overflow-hidden relative" style={{ aspectRatio: "1 / 1" }}>
              {tourismData.images.map((src, index) => (
                <div
                  key={`large-${index}`}
                  className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                    index === currentImageIndex ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <Image
                    src={src}
                    alt={`${tourismData.name} large view ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
            
            {/* Three Small Images with Fade Transition */}
            <div className="grid grid-cols-3 gap-4">
              {smallImageIndices.map((imageIndex, index) => (
                <div
                  key={index}
                  className="w-full h-32 bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer hover:opacity-80 transition-opacity relative"
                  onClick={() => handleImageClick(imageIndex)}
                >
                  <div className="absolute inset-0">
                    {tourismData.images.map((src, idx) => (
                      <div
                        key={`small-${idx}-${index}`}
                        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                          idx === imageIndex ? "opacity-100" : "opacity-0"
                        }`}
                      >
                        <Image
                          src={src}
                          alt={`${tourismData.name} small view ${idx + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                  {imageIndex === currentImageIndex && (
                    <div className="absolute inset-0 border-2 border-primary-500 rounded-xl" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Description */}
          <div className="bg-white rounded-xl p-5">
            <h1 className="text-3xl font-bold text-black mb-2 text-justify">{tourismData.name}</h1>
            <h2 className="text-xl text-gray-700 mb-6 font-sans" style={{ fontWeight: 400 }}>{tourismData.name2}</h2>
            <div className="prose prose-sm text-black space-y-2 text-justify" style={{ fontSize: "0.875rem" }}>
              {paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>

        {/* Detail Section */}
        <div className="mt-12">
          <div className="bg-white rounded-xl p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-justify">Detail</h3>
            <div className="text-gray-600 leading-relaxed text-justify">
              <p className="mb-4">{tourismData.detail.overview}</p>
              <p className="mb-4">{tourismData.detail.experience}</p>
            </div>

            {tourismData.id === "gunung-kelud" ? (
              <div className="grid md:grid-cols-2 gap-6 mt-8">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Image
                      src="/icons/lokasi.png"
                      alt="Lokasi Basecamp"
                      width={20}
                      height={20}
                      className="w-5 h-5 mt-1"
                    />
                    <div className="text-justify">
                      <span className="font-semibold text-gray-800">Lokasi Basecamp:</span>
                      <p className="text-gray-600">{tourismData.details.location}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Image
                      src="/icons/durasi.png"
                      alt="Durasi Pendakian"
                      width={20}
                      height={20}
                      className="w-5 h-5 mt-1"
                    />
                    <div className="text-justify">
                      <span className="font-semibold text-gray-800">Durasi Pendakian:</span>
                      <p className="text-gray-600">Naik: {tourismData.details.duration?.ascent}</p>
                      <p className="text-gray-600">Turun: {tourismData.details.duration?.descent}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Image
                      src="/icons/tiket.png"
                      alt="Tiket Masuk"
                      width={20}
                      height={20}
                      className="w-5 h-5 mt-1"
                    />
                    <div className="text-justify">
                      <span className="font-semibold text-gray-800">Tiket Masuk:</span>
                      <p className="text-gray-600">{tourismData.details.ticketPrice}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Image
                      src="/icons/area.png"
                      alt="Area Berkemah"
                      width={20}
                      height={20}
                      className="w-5 h-5 mt-1"
                    />
                    <div className="text-justify">
                      <span className="font-semibold text-gray-800">Area Berkemah:</span>
                      <p className="text-gray-600">{tourismData.details.campingArea}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Image
                      src="/icons/layanan.png"
                      alt="Layanan Pemandu"
                      width={20}
                      height={20}
                      className="w-5 h-5 mt-1"
                    />
                    <div className="text-justify">
                      <span className="font-semibold text-gray-800">Layanan Pemandu:</span>
                      <p className="text-gray-600">{tourismData.details.guide}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Image
                      src="/icons/kondisi.png"
                      alt="Kondisi Jalur"
                      width={20}
                      height={20}
                      className="w-5 h-5 mt-1"
                    />
                    <div className="text-justify">
                      <span className="font-semibold text-gray-800">Kondisi Jalur:</span>
                      <p className="text-gray-600">{tourismData.details.route}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Image
                      src="/icons/sumber.png"
                      alt="Sumber Air"
                      width={20}
                      height={20}
                      className="w-5 h-5 mt-1"
                    />
                    <div className="text-justify">
                      <span className="font-semibold text-gray-800">Sumber Air:</span>
                      <p className="text-gray-600">{tourismData.details.waterSource}</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6 mt-8">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Image
                      src="/icons/lokasi.png"
                      alt="Lokasi"
                      width={20}
                      height={20}
                      className="w-5 h-5 mt-1"
                    />
                    <div className="text-justify">
                      <span className="font-semibold text-gray-800">Lokasi:</span>
                      <p className="text-gray-600">{tourismData.details.location}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Image
                      src="/icons/jam.png"
                      alt="Jam Operasional"
                      width={20}
                      height={20}
                      className="w-5 h-5 mt-1"
                    />
                    <div className="text-justify">
                      <span className="font-semibold text-gray-800">Jam Operasional:</span>
                      <p className="text-gray-600">{tourismData.details.operationalHours}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Image
                      src="/icons/tiket.png"
                      alt="Tiket Masuk"
                      width={20}
                      height={20}
                      className="w-5 h-5 mt-1"
                    />
                    <div className="text-justify">
                      <span className="font-semibold text-gray-800">Tiket Masuk:</span>
                      <p className="text-gray-600">{tourismData.details.ticketPrice}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Image
                      src="/icons/parkir.png"
                      alt="Parkir"
                      width={20}
                      height={20}
                      className="w-5 h-5 mt-1"
                    />
                    <div className="text-justify">
                      <span className="font-semibold text-gray-800">Parkir:</span>
                      <p className="text-gray-600">{tourismData.details.parking}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Image
                      src="/icons/kondisi.png"
                      alt="Fasilitas"
                      width={20}
                      height={20}
                      className="w-5 h-5 mt-1"
                    />
                    <div className="text-justify">
                      <span className="font-semibold text-gray-800">Fasilitas:</span>
                      <p className="text-gray-600">{tourismData.details.facilities}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Image
                      src="/icons/spot.png"
                      alt="Spot Foto"
                      width={20}
                      height={20}
                      className="w-5 h-5 mt-1"
                    />
                    <div className="text-justify">
                      <span className="font-semibold text-gray-800">Spot Foto:</span>
                      <p className="text-gray-600">{tourismData.details.photoSpots}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Image
                      src="/icons/area.png"
                      alt="Aktivitas Favorit"
                      width={20}
                      height={20}
                      className="w-5 h-5 mt-1"
                    />
                    <div className="text-justify">
                      <span className="font-semibold text-gray-800">Aktivitas Favorit:</span>
                      <p className="text-gray-600">{tourismData.details.favoriteActivities}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Gallery Section */}
        <div className="mt-12 space-y-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-800 flex items-center text-justify">
                <Camera className="w-6 h-6 mr-2" />
                Galeri
              </h3>
              <div className="flex space-x-2 md:space-x-4">
                <button
                  onClick={prevGalleryImage}
                  className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 active:bg-gray-300 transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-6 h-6 text-black" />
                </button>
                <button
                  onClick={nextGalleryImage}
                  className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 active:bg-gray-300 transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-6 h-6 text-black" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              {/* Left Column - Large Square Photo */}
              <div className="w-full h-64 md:h-96 bg-white rounded-xl shadow-lg overflow-hidden relative transition-transform duration-300 ease-in-out md:hover:scale-105 active:scale-95" style={{ aspectRatio: "4 / 3" }}>
                <Image
                  src={tourismData.images[galleryImageIndex]}
                  alt={`${tourismData.name} gallery ${galleryImageIndex + 1}`}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Right Column - Two Stacked Photos and One Portrait */}
              <div className="col-span-1 md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="grid grid-rows-2 gap-4 md:gap-6">
                  <div className="w-full h-28 md:h-44 bg-white rounded-xl shadow-lg overflow-hidden relative transition-transform duration-300 ease-in-out md:hover:scale-105 active:scale-95" style={{ aspectRatio: "4 / 3" }}>
                    <Image
                      src={tourismData.images[gallerySmallImageIndices[0]]}
                      alt={`${tourismData.name} gallery ${gallerySmallImageIndices[0] + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="w-full h-28 md:h-44 bg-white rounded-xl shadow-lg overflow-hidden relative transition-transform duration-300 ease-in-out md:hover:scale-105 active:scale-95" style={{ aspectRatio: "4 / 3" }}>
                    <Image
                      src={tourismData.images[gallerySmallImageIndices[1]]}
                      alt={`${tourismData.name} gallery ${gallerySmallImageIndices[1] + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                <div className="w-full h-64 md:h-96 bg-white rounded-xl shadow-lg overflow-hidden relative transition-transform duration-300 ease-in-out md:hover:scale-105 active:scale-95" style={{ aspectRatio: "4 / 3" }}>
                  <Image
                    src={tourismData.images[gallerySmallImageIndices[2]]}
                    alt={`${tourismData.name} gallery ${gallerySmallImageIndices[2] + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TourismDetail;