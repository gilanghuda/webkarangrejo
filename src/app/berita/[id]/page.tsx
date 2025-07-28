"use client";

import React, { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Share2, X, Copy, MessageCircle } from "lucide-react";
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
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const spacerRef = useRef<HTMLDivElement>(null);
  const shareButtonRef = useRef<HTMLButtonElement>(null);

  // Handle parallax scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.pageYOffset;
      if (parallaxRef.current) {
        parallaxRef.current.style.transform = `translateY(${scrollPosition * 0.5}px)`;
      }
      if (spacerRef.current) {
        spacerRef.current.style.transform = `translateY(${scrollPosition * 0.5}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fetch news data
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

  // Handle focus for copy functionality
  useEffect(() => {
    if (showShareOptions) {
      // Focus the modal container when it opens
      const modal = document.getElementById('share-modal');
      modal?.focus();
    } else {
      // Return focus to share button when modal closes
      shareButtonRef.current?.focus();
    }
  }, [showShareOptions]);

  // Share functionality
  const handleShare = () => {
    setShowShareOptions(true);
    setIsCopied(false);
  };

  const closeShareOptions = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setShowShareOptions(false);
    setIsCopied(false);
  };

  const shareToWhatsApp = () => {
    if (typeof window !== 'undefined') {
      const currentUrl = window.location.href;
      const message = `Baca berita ini: ${newsItem?.title}\n${currentUrl}`;
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
    }
    closeShareOptions();
  };

  const copyLink = async () => {
    try {
      if (typeof window !== 'undefined' && typeof navigator !== 'undefined') {
        const currentUrl = window.location.href;
        await navigator.clipboard.writeText(currentUrl);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      }
    } catch (err) {
      console.error('Failed to copy: ', err);
      // Fallback for browsers that don't support clipboard API
      if (typeof window !== 'undefined') {
        const textArea = document.createElement('textarea');
        textArea.value = window.location.href;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      }
    }
  };

  // Loading and error states
  if (loading) {
    return <div className="min-h-screen bg-white text-center py-16">Loading...</div>;
  }

  if (!newsItem) {
    return <div className="min-h-screen bg-white text-center py-16">News not found</div>;
  }

  return (
    <div className="min-h-screen bg-white relative">
      {/* Share Options Modal with Backdrop Blur */}
      {showShareOptions && (
        <div 
          id="share-modal"
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={closeShareOptions}
          tabIndex={-1}
        >
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true"></div>
          <div 
            className="bg-white rounded-xl p-6 max-w-md w-full relative z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">Bagikan Berita</h3>
              <button 
                onClick={closeShareOptions}
                className="text-gray-500 hover:text-gray-700 transition-colors cursor-pointer"
                aria-label="Close share options"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={shareToWhatsApp}
                className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 cursor-pointer"
                aria-label="Share to WhatsApp"
              >
                <div className="bg-green-100 p-3 rounded-full mb-2">
                  <MessageCircle className="text-green-600" size={24} />
                </div>
                <span className="text-sm font-medium">WhatsApp</span>
              </button>
              
              <button
                onClick={copyLink}
                className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer"
                aria-label="Copy link"
              >
                <div className="bg-blue-100 p-3 rounded-full mb-2">
                  <Copy className="text-blue-600" size={24} />
                </div>
                <span className="text-sm font-medium">
                  {isCopied ? 'Tersalin!' : 'Salin Link'}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Bar */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 bg-[#1C270C]/70 backdrop-blur-sm h-[80px] md:h-[123px]"
        role="navigation"
        aria-label="News Detail Navigation"
      >
        <div className="container mx-auto px-4 md:px-6 h-full flex items-center">
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
        </div>
      </nav>

      {/* Navbar Spacer with Parallax Effect */}
      <div
        ref={spacerRef}
        className="w-full h-[80px] md:h-[123px] bg-[#1C270C]/70 backdrop-blur-sm will-change-transform"
      ></div>

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
           
            {/* Share Button */}
            <div className="flex justify-center mt-8">
              <button
                ref={shareButtonRef}
                onClick={handleShare}
                className="flex items-center bg-[#D7E9AD] rounded-[20px] px-6 py-3 text-black font-sans font-medium text-base hover:bg-[#C8D99E] active:bg-[#B8C98E] transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-[#1C270C] focus:ring-offset-2 cursor-pointer"
                aria-label="Share this news article"
              >
                <Share2 size={18} className="mr-2" />
                <span>Bagikan Berita</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default NewsDetail;