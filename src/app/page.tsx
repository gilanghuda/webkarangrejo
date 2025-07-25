"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import dynamic from "next/dynamic";
import { supabase } from "@/lib/supabaseClient";

const LeafletMap = dynamic(() => import("./LeafletMap"), {
  ssr: false,
});

export default function Home() {
  const images = [
    "/images/home1.png",
    "/images/home2.png",
    "/images/home3.png",
    "/images/home4.png",
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [newsData, setNewsData] = useState<any[]>([]);
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
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    // Fetch berita dari Supabase, bersihkan kategori dan image
    const fetchBerita = async () => {
      const { data, error } = await supabase
        .from("berita")
        .select("*")
        .order("created_at", { ascending: false }) 
        .limit(5);
      if (!error && data) {
        console.log("Berita fetched:", data);
        // Bersihkan kategori dari tag HTML dan pastikan image_url dipakai
        const cleanData = data.map((item: any) => ({
          ...item,
          kategori: typeof item.kategori === "string"
            ? item.kategori.replace(/<[^>]+>/g, "") // hapus tag html
            : item.kategori,
          imgurl: item.image_url || "", // gunakan image_url dari database
        }));
        setNewsData(cleanData);
      }
    };

    fetchBerita();

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Navbar />

      {/* Home Section with Parallax */}
      <section
        id="home"
        className="relative min-h-screen pt-[123px] bg-gray-50 scroll-mt-[123px] overflow-hidden"
      >
        <div className="absolute inset-0">
          {images.map((src, index) => (
            <div
              key={src}
              ref={(el) => {
                parallaxRefs.current[index] = el;
              }}
              className={`absolute inset-0 will-change-transform transition-opacity duration-1000 ${
                index === currentImageIndex ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                src={src}
                alt={`Pemandangan Desa Karangrejo ${index + 1}`}
                fill
                className="object-cover"
                priority={index === 0}
              />
              <div className="absolute inset-0 bg-black/50" />
            </div>
          ))}
        </div>
        <div className="relative container mx-auto px-6 py-50 text-left text-white min-h-screen flex flex-col">
          <h2 className="text-5xl font-bold mb-3 font-sans">
            Website Resmi Desa Karangrejo
          </h2>
          <p className="text-2xl text-gray-200 font-bold font-sans">
            Sumber informasi terbaru tentang pemerintahan di Desa Karangrejo
          </p>
        </div>
      </section>

      {/* Profil Section */}
      <section
        id="profil"
        className="bg-white py-16 scroll-mt-[123px] relative z-10"
      >
        <div className="container mx-auto px-6">
          {/* Sejarah Desa */}
          <div className="mb-16">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              <div className="w-60 h-60 relative flex-shrink-0 mx-auto md:mx-0">
                <Image
                  src="/logo-desa.png"
                  alt="Logo Desa Karangrejo"
                  width={300}
                  height={300}
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="text-4xl font-bold mb-4 font-sans text-black text-center md:text-left">
                  Sejarah Desa
                </h3>
                <p className="text-gray-700 mb-6 font-sans text-justify">
                  Pada masa penjajahan, wilayah Desa Karangrejo merupakan kebun
                  karet milik perusahaan Belanda NV. Nederlands Indische Rubber
                  Koffie Cultuur Maatschappij dengan status tanah Recht van
                  Erfpacht. Lahan ini terbagi dalam tiga ampean: Karang Tanjung,
                  Sumenur, dan Karangrejo. Setelah kemerdekaan, hak kelola asing
                  dicabut oleh pemerintah melalui SK Menteri Pertanian dan
                  Agraria pada 25 Mei 1964, sebagai bagian dari reforma agraria.
                  <br />
                  Karangrejo kemudian resmi menjadi desa melalui SK Gubernur
                  Jawa Timur tahun 1968 dan SK Bupati Blitar tahun 1969. Kepala
                  desa pertamanya adalah Bapak Sukemi, diikuti oleh beberapa
                  pemimpin lain hingga kini dijabat oleh Bapak Imam Rohadi sejak
                  2023.
                  <br />
                  Struktur pemerintahan desa mengalami beberapa perubahan
                  mengikuti kebijakan nasional, mulai dari sistem tradisional
                  hingga sistem modern sesuai UU Desa. Istilah seperti Lurah,
                  Carik, dan Kamituwo diganti menjadi Kepala Desa, Sekretaris,
                  dan lainnya, mencerminkan penyesuaian administratif demi tata
                  kelola desa yang lebih baik.
                </p>
              </div>
            </div>
          </div>

          {/* Peta Desa */}
          <div className="mb-16">
            <h3 className="text-4xl font-bold mb-4 font-sans text-black text-center md:text-left">
              Peta Desa
            </h3>
            <div className="relative z-0">
              <LeafletMap />
            </div>
            <p className="text-gray-700 mt-6 text-justify mx-auto font-sans">
              Desa Karangrejo terletak pada 7°21'–7°31' LS dan 110°10'–111°40'
              BT, dengan ketinggian sekitar 700 meter di atas permukaan laut.
              Secara fisik, wilayah desa ini terdiri dari pemukiman, lahan
              tegalan, sawah, dan kebun rakyat. Iklim di Desa Karangrejo
              ditandai dengan curah hujan rata-rata sekitar 8,50 mm per tahun,
              dengan 10 bulan hujan, suhu harian mencapai 28°C, dan kelembaban
              sekitar 57%. Curah hujan tertinggi biasanya terjadi pada bulan
              Desember. Secara administratif, desa ini berbatasan dengan
              beberapa desa, yaitu : Desa Modangan (Kecamatan Nglegok) di
              sebelah barat, Desa Sidodadi (Kecamatan Garum) di sebelah timur
              dan selatan, serta Perhutani Ngancar (Kabupaten Kediri) di sebelah
              utara.
            </p>
          </div>

          {/* Visi dan Misi */}
          <div className="mb-16">
            <h3 className="text-4xl font-bold mb-8 text-center font-sans text-black">
              Visi dan Misi
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mx-auto">
              {/* Visi Card */}
              <div className="bg-[#F6FAEB] hover:bg-[#D7E9AD] transition-colors duration-300 rounded-lg shadow-md p-15 flex items-center">
                <p className="text-gray-700 font-sans font-semibold text-center text-xl w-full">
                  Terwujudnya desa Karangrejo yang mandiri, adil dan sejahtera,
                  berakhlak mulia dengan prinsip semangat gotong royong.
                </p>
              </div>

              {/* Misi Card */}
              <div className="bg-[#F6FAEB] hover:bg-[#D7E9AD] transition-colors duration-300 rounded-lg shadow-md p-15">
                <ul className="text-gray-700 font-sans font-medium list-decimal">
                  <li>
                    Menciptakan pemerintah desa yang inovatif, bersih dan
                    bertanggungjawab
                  </li>
                  <li>
                    Meningkatkan kesejahteraan sosial yang berkeadilan
                    berdasarkan kearifan dan budaya lokal
                  </li>
                  <li>Meningkatkan kualitas SDM masyarakat Desa Karangrejo</li>
                  <li>
                    Melaksanakan pemerataan pembangunan berkelanjutan
                    berdasarkan potensi ekonomi lokal dengan pemberdayaan
                    masyarakat desa karangrejo yang berwawasan lingkungan dengan
                    prinsip semangat gotong royong.
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Administrasi Penduduk */}
          <div className="mb-16">
            <h3 className="text-4xl font-bold font-sans text-black text-center md:text-left">
              Administrasi Penduduk
            </h3>
            <p className="text-gray-700 mt-2 font-sans font-medium mb-8 text-center md:text-left">
              Informasi dan layanan resmi terkait pendataan dan pengurusan
              administrasi warga.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
              <div className="grid grid-rows-2 gap-4">
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-[#F6FAEB] rounded-lg shadow-md p-3 flex items-center justify-center">
                    <p className="text-gray-700 font-sans font-medium text-lg text-center">
                      Jumlah Penduduk
                    </p>
                  </div>
                  <div className="bg-[#4E6922] rounded-lg shadow-md p-3 flex items-center justify-center">
                    <p className="text-white font-sans text-lg font-bold text-center">
                      10,488
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-[#F6FAEB] rounded-lg shadow-md p-3 flex items-center justify-center">
                    <p className="text-gray-700 font-sans font-medium text-lg text-center">
                      Kepala Keluarga
                    </p>
                  </div>
                  <div className="bg-[#4E6922] rounded-lg shadow-md p-3 flex items-center justify-center">
                    <p className="text-white font-sans text-lg font-bold text-center">
                      2,500
                    </p>
                  </div>
                </div>
              </div>
              <div className="grid grid-rows-2 gap-4">
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-[#F6FAEB] rounded-lg shadow-md p-3 flex items-center justify-center">
                    <p className="text-gray-700 font-sans font-medium text-lg text-center">
                      Laki-laki
                    </p>
                  </div>
                  <div className="bg-[#4E6922] rounded-lg shadow-md p-3 flex items-center justify-center">
                    <p className="text-white font-sans text-lg font-bold text-center">
                      5,244
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-[#F6FAEB] rounded-lg shadow-md p-3 flex items-center justify-center">
                    <p className="text-gray-700 font-sans font-medium text-lg text-center">
                      Perempuan
                    </p>
                  </div>
                  <div className="bg-[#4E6922] rounded-lg shadow-md p-3 flex items-center justify-center">
                    <p className="text-white font-sans text-lg font-bold text-center">
                      5,244
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Perangkat Desa */}
          <div className="mb-16">
            <h3 className="text-4xl font-bold mb-8 font-sans text-black text-center md:text-left">
              Perangkat Desa Karangrejo
            </h3>
            <div className="flex justify-center">
              <Image
                src="/images/perangkat-desa.png"
                alt="Struktur Perangkat Desa Karangrejo"
                width={1200}
                height={600}
                className="w-full max-w-4xl h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Wisata Section */}
      <section id="wisata" className="bg-white scroll-mt-[123px] relative z-10">
        <div className="container mx-auto px-6 py-8">
          <h2 className="text-4xl font-bold text-black font-sans mb-6 text-center md:text-left">
            Wisata Desa
          </h2>
          <p className="text-gray-700 mt-2 font-sans font-medium mb-8 text-center md:text-left">
            Layanan yang menyediakan informasi dan membantu promosi wisata desa.
          </p>
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Card Wisata 1 */}
            <div className="relative bg-white rounded-lg shadow-lg overflow-hidden h-100">
              <Image
                src="/images/bon-c.jpg"
                alt="Sumber Bon C"
                width={600}
                height={400}
                className="w-full h-2/3 object-cover"
              />
              <div className="h-1/3 bg-[#F6FAEB] p-4 flex flex-col justify-between">
                <div>
                  <h3 className="text-3xl font-semibold font-sans text-black">
                    Sumber Bon C
                  </h3>
                  <div className="flex items-center mt-0.5">
                    <p className="text-black font-sans font-semibold">
                      Camping Ground, Healing Spot, Wisata Keluarga
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <p className="text-black font-sans font-semibold">
                      Rp 3.000/orang
                    </p>
                  </div>
                  <Link href="/detail-wisata/sumber-bon-c">
                    <button className="bg-[#F2AF4B] text-white px-3 py-1 rounded-[20px] hover:bg-[#e09a3c] transition-colors duration-300 font-sans text-sm">
                      Lihat Detail
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Card Wisata 2 */}
            <div className="relative bg-white rounded-lg shadow-lg overflow-hidden h-100">
              <Image
                src="/images/kelud.jpg"
                alt="Gunung Kelud"
                width={600}
                height={400}
                className="w-full h-2/3 object-cover"
              />
              <div className="h-1/3 bg-[#F6FAEB] p-4 flex flex-col justify-between">
                <div>
                  <h3 className="text-3xl font-semibold font-sans text-black">
                    Gunung Kelud
                  </h3>
                  <div className="flex items-center mt-0.5">
                    <p className="text-black font-sans font-semibold">
                      Pendakian, Adventure Tourism, Camping Ground
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <p className="text-black font-sans font-semibold">
                      Rp 10.000/orang
                    </p>
                  </div>
                  <Link href="/detail-wisata/gunung-kelud">
                    <button className="bg-[#F2AF4B] text-white px-3 py-1 rounded-[20px] hover:bg-[#e09a3c] transition-colors duration-300 font-sans text-sm">
                      Lihat Detail
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Berita Section */}
      <section
        id="berita"
        className="bg-white py-5 scroll-mt-[123px] relative z-10"
      >
        <div className="container mx-auto px-4 md:px-6 py-8">
          <h2 className="text-4xl font-bold font-sans text-black text-center md:text-left">
            Berita Desa
          </h2>
          <p className="text-gray-700 font-sans font-medium mb-8 text-center md:text-left">
            Layanan yang menyediakan informasi resmi kegiatan dan program desa.
          </p>
          {newsData && newsData.length > 0 ? (
            <div className="max-h-[600px] overflow-y-auto">
              <div className="grid grid-cols-1 gap-6">
                {newsData.slice(0, 5).map((news) => {
                  return (
                    <article
                      key={news.id}
                      className="bg-gray-50 rounded-lg p-4 flex flex-col md:flex-row items-stretch gap-4 md:gap-6 h-auto md:h-40"
                    >
                      {/* Image Container */}
                      <div className="w-full md:w-32 h-40 md:h-full relative flex-shrink-0">
                        {news.imgurl ? (
                          <Image
                            src={news.imgurl}
                            alt={news.title}
                            fill
                            className="object-cover rounded-lg"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-200 flex items-center justify-center rounded-lg text-gray-400 text-xs">
                            Tidak ada gambar
                          </div>
                        )}
                      </div>
                      {/* Content */}
                      <div className="flex-1 flex flex-col justify-between overflow-hidden">
                        <div className="space-y-2">
                          <h3 className="text-lg font-semibold font-sans line-clamp-2">
                            {news.title}
                          </h3>
                          <div
                            className="max-w-xs overflow-auto text-gray-700 font-sans text-sm line-clamp-3 md:line-clamp-2"
                            dangerouslySetInnerHTML={{ __html: news.description }}
                          />
                        </div>
                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2 md:gap-4 mt-3">
                          <div className="flex items-center gap-2">
                            <p className="text-gray-500 text-xs font-sans">
                              {new Date(news.created_at).toLocaleDateString("id-ID")}
                            </p>
                            <span className="text-gray-300">|</span>
                            <p className="text-gray-500 text-xs font-sans">
                              {news.kategori}
                            </p>
                          </div>
                          <Link href={`/berita/${news.id}`}>
                            <button
                              className="bg-[#F2AF4B] text-white px-3 py-1 rounded-[20px] hover:bg-[#e09a3c] 
                                      transition-colors duration-300 font-sans text-xs whitespace-nowrap w-full md:w-auto"
                            >
                              Baca Berita
                            </button>
                          </Link>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          ) : (
            <p className="text-black text-2xl font-sans font-medium text-center py-8">
              Belum ada berita yang tersedia saat ini
            </p>
          )}
        </div>
      </section>

      <Footer id="kontak" />
    </>
  );
}