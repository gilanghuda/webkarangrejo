"use client";

import React, { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Footer from "@/components/Footer";
import { supabase } from "@/lib/supabaseClient";

interface NewsItem {
  id: string;
  title: string;
  description: string;
  kategori: string;
  image_url: string;
  created_at: string;
}

const NewsDetail: React.FC = () => {
  const { id } = useParams();
  const [newsItem, setNewsItem] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        const scrollPosition = window.pageYOffset;
        parallaxRef.current.style.transform = `translateY(${scrollPosition * 0.5}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fetchBerita = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("berita")
        .select("*")
        .eq("id", id)
        .single();
      if (!error && data) setNewsItem(data);
      setLoading(false);
    };
    if (id) fetchBerita();
  }, [id]);

  if (loading) {
    return <div className="min-h-screen bg-white text-center py-16">Loading...</div>;
  }

  if (!newsItem) {
    return <div className="min-h-screen bg-white text-center py-16">News not found</div>;
  }

  // Split description into paragraphs
  const paragraphs = newsItem.description.split("\n\n");

  return (
    <div className="min-h-screen bg-white">
      {/* Embedded Navbar */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 bg-[#1C270C]/70 backdrop-blur-sm h-[80px] md:h-[123px]"
        role="navigation"
        aria-label="News Detail Navigation"
      >
        <div className="container mx-auto px-4 md:px-6 h-full flex items-center">
          <div className="flex items-center space-x-4 justify-start">
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
          </div>
        </div>
      </nav>

      {/* Main Image with Parallax Effect */}
      <div className="w-full h-[478px] overflow-hidden relative">
        <div ref={parallaxRef} className="parallax absolute top-0 left-0 w-full h-full will-change-transform">
          <Image
            src={newsItem.image_url}
            alt={`${newsItem.title} main view`}
            width={1200}
            height={478}
            className="w-full h-full object-cover"
            priority
          />
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-6 py-12 relative z-10 bg-white">
        <div className="grid grid-cols-1 gap-12">
          <div className="bg-white rounded-xl p-5">
            <h1 className="text-3xl font-bold mb-4 font-sans text-black">{newsItem.title}</h1>
            <h2 className="text-xl mb-2 font-sans text-gray-700" style={{ fontWeight: 400 }}>
              {newsItem.kategori}
            </h2>
            <h3 className="text-md mb-6 font-sans text-gray-500" style={{ fontWeight: 400 }}>
              {newsItem.created_at && !isNaN(new Date(newsItem.created_at).getTime())
                ? new Date(newsItem.created_at).toLocaleDateString("id-ID")
                : "-"}
            </h3>
            <div
              className="prose prose-sm text-black space-y-4 text-justify"
              style={{ fontSize: "0.875rem" }}
              dangerouslySetInnerHTML={{ __html: newsItem.description }}
            />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default NewsDetail;