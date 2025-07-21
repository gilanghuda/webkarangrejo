'use client'

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';

export default function Home() {
  const images = [
    '/images/home1.png',
    '/images/home2.png',
    '/images/home3.png',
    '/images/home4.png',
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Ganti gambar setiap 5 detik

    return () => clearInterval(interval); // Bersihkan interval saat komponen unmount
  }, [images.length]);

  return (
    <>
      <Navbar />
      
      {/* Home Section */}
      <section id="home" className="relative min-h-screen pt-[123px] bg-gray-50">
        <div className="absolute inset-0">
          {images.map((src, index) => (
            <Image
              key={src}
              src={src}
              alt={`Pemandangan Desa Karangrejo ${index + 1}`}
              fill
              className={`object-cover transition-opacity duration-1000 ${
                index === currentImageIndex ? 'opacity-100' : 'opacity-0'
              }`}
              priority={index === 0} // Prioritas untuk gambar pertama agar dimuat lebih cepat
            />
          ))}
          <div className="absolute inset-0 bg-black/50" /> {/* Overlay untuk keterbacaan */}
        </div>
        <div className="relative container mx-auto px-6 py-16 text-left text-white">
          <h2 className="text-5xl font-bold mb-3 font-sans">
            Website Resmi Desa Karangrejo
          </h2>
          <p className="text-2xl text-gray-200 font-bold font-sans">
            Sumber informasi terbaru tentang pemerintahan di Desa Karangrejo
          </p>
        </div>
      </section>

      {/* Profil Section */}
      <section id="profil" className="bg-white py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12 font-sans">Profil Desa</h2>

          {/* Sejarah Desa */}
          <div className="mb-16">
            <div className="flex flex-col md:flex-row items-start gap-8">
              <div className="w-60 h-60 relative flex-shrink-0">
                <Image
                  src="/logo-desa.png"
                  alt="Logo Desa Karangrejo"
                  width={300}
                  height={300}
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="text-4xl font-bold mb-4 font-sans text-black">Sejarah Desa</h3>
                <p className="text-gray-700 mb-6 font-sans text-justify">
                  Pada masa penjajahan, wilayah Desa Karangrejo merupakan kebun karet milik perusahaan Belanda NV. Nederlands Indische Rubber Koffie Cultuur Maatschappij dengan status tanah Recht van Erfpacht. Lahan ini terbagi dalam tiga ampean: Karang Tanjung, Sumenur, dan Karangrejo. Setelah kemerdekaan, hak kelola asing dicabut oleh pemerintah melalui SK Menteri Pertanian dan Agraria pada 25 Mei 1964, sebagai bagian dari reforma agraria.
                  <br />
                  Karangrejo kemudian resmi menjadi desa melalui SK Gubernur Jawa Timur tahun 1968 dan SK Bupati Blitar tahun 1969. Kepala desa pertamanya adalah Bapak Sukemi, diikuti oleh beberapa pemimpin lain hingga kini dijabat oleh Bapak Imam Rohadi sejak 2023.
                  <br />
                  Struktur pemerintahan desa mengalami beberapa perubahan mengikuti kebijakan nasional, mulai dari sistem tradisional hingga sistem modern sesuai UU Desa. Istilah seperti Lurah, Carik, dan Kamituwo diganti menjadi Kepala Desa, Sekretaris, dan lainnya, mencerminkan penyesuaian administratif demi tata kelola desa yang lebih baik.
                </p>
              </div>
            </div>
          </div>

          {/* Peta Desa */}
          <div className="mb-16">
            <h3 className="text-4xl font-bold mb-4 font-sans text-black">Peta Desa</h3>
            <div className="flex justify-center">
              <Image
                src="/images/peta-desa.png"
                alt="Peta Desa Karangrejo"
                width={1200}
                height={1000}
                className="object-contain rounded-lg shadow-md"
              />
            </div>
            <p className="text-gray-700 mt-6 text-justify max-w-4xl mx-auto font-sans">
              Desa Karangrejo terletak pada 7°21'–7°31' LS dan 110°10'–111°40' BT, dengan ketinggian sekitar 700 meter di atas permukaan laut. Secara fisik, wilayah desa ini terdiri dari pemukiman, lahan tegalan, sawah, dan kebun rakyat. Iklim di Desa Karangrejo ditandai dengan curah hujan rata-rata sekitar 8,50 mm per tahun, dengan 10 bulan hujan, suhu harian mencapai 28°C, dan kelembaban sekitar 57%. Curah hujan tertinggi biasanya terjadi pada bulan Desember. Secara administratif, desa ini berbatasan dengan beberapa desa, yaitu : Desa Modangan (Kecamatan Nglegok) di sebelah barat, Desa Sidodadi (Kecamatan Garum) di sebelah timur dan selatan, serta Perhutani Ngancar (Kabupaten Kediri) di sebelah utara.
            </p>
          </div>

          {/* Visi dan Misi */}
          <div className="mb-16">
            <h3 className="text-2xl font-semibold mb-4 text-center font-sans">Visi dan Misi</h3>
            <p className="text-gray-700 max-w-4xl mx-auto font-sans">
              <strong>Visi:</strong> Menjadikan Desa Karangrejo sebagai desa yang maju, sejahtera, dan berbudaya dengan tata kelola pemerintahan yang transparan dan akuntabel.<br /><br />
              <strong>Misi:</strong><br />
              1. Meningkatkan kualitas infrastruktur desa untuk mendukung mobilitas dan ekonomi masyarakat.<br />
              2. Mengembangkan potensi wisata dan budaya lokal untuk meningkatkan pendapatan desa.<br />
              3. Memberdayakan masyarakat melalui pelatihan dan pendidikan untuk meningkatkan kesejahteraan.<br />
              4. Menjaga kelestarian lingkungan dan sumber daya alam untuk generasi mendatang.
            </p>
          </div>

          {/* Administrasi Penduduk */}
          <div className="mb-16">
            <h3 className="text-2xl font-semibold mb-4 text-center font-sans">Administrasi Penduduk</h3>
            <p className="text-gray-700 max-w-4xl mx-auto font-sans">
              Desa Karangrejo memiliki jumlah penduduk sekitar [masukkan jumlah penduduk] jiwa, terdiri dari [masukkan data demografi, misalnya laki-laki/perempuan]. Pelayanan administrasi penduduk mencakup pembuatan KTP, KK, akta kelahiran, akta kematian, dan surat keterangan lainnya. Pelaksanaan pelayanan dilakukan di Kantor Desa Karangrejo sesuai jam pelayanan yang telah ditentukan.
            </p>
          </div>

          {/* Perangkat Desa */}
          <div>
            <h3 className="text-2xl font-semibold mb-4 text-center font-sans">Perangkat Desa Karangrejo</h3>
            <p className="text-gray-700 max-w-4xl mx-auto font-sans">
              Pemerintahan Desa Karangrejo dipimpin oleh Kepala Desa, Bapak Imam Rohadi, yang didukung oleh perangkat desa, termasuk:<br />
              - <strong>Sekretaris Desa</strong>: [Nama Sekretaris Desa]<br />
              - <strong>Kaur Keuangan</strong>: [Nama Kaur Keuangan]<br />
              - <strong>Kaur Umum</strong>: [Nama Kaur Umum]<br />
              - <strong>Kasi Pemerintahan</strong>: [Nama Kasi Pemerintahan]<br />
              - <strong>Kasi Kesejahteraan</strong>: [Nama Kasi Kesejahteraan]<br />
              Struktur ini memastikan pelaksanaan tugas pemerintahan, pembangunan, dan pelayanan masyarakat berjalan dengan baik.
            </p>
          </div>
        </div>
      </section>

      {/* Wisata Section */}
      <section id="wisata" className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-6 py-16">
          <h2 className="text-4xl font-bold text-center mb-8 font-sans">Wisata</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-4 font-sans">Destinasi Wisata 1</h3>
              <p className="text-gray-700 font-sans">Deskripsi tempat wisata...</p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-4 font-sans">Destinasi Wisata 2</h3>
              <p className="text-gray-700 font-sans">Deskripsi tempat wisata...</p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-4 font-sans">Destinasi Wisata 3</h3>
              <p className="text-gray-700 font-sans">Deskripsi tempat wisata...</p>
            </div>
          </div>
        </div>
      </section>

      {/* Berita Section */}
      <section id="berita" className="min-h-screen bg-white">
        <div className="container mx-auto px-6 py-16">
          <h2 className="text-4xl font-bold text-center mb-8 font-sans">Berita</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <article className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3 font-sans">Berita Terbaru 1</h3>
              <p className="text-gray-600 text-sm mb-3 font-sans">21 Juli 2025</p>
              <p className="text-gray-700 font-sans">Ringkasan berita atau artikel...</p>
            </article>
            <article className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3 font-sans">Berita Terbaru 2</h3>
              <p className="text-gray-600 text-sm mb-3 font-sans">20 Juli 2025</p>
              <p className="text-gray-700 font-sans">Ringkasan berita atau artikel...</p>
            </article>
            <article className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3 font-sans">Berita Terbaru 3</h3>
              <p className="text-gray-600 text-sm mb-3 font-sans">19 Juli 2025</p>
              <p className="text-gray-700 font-sans">Ringkasan berita atau artikel...</p>
            </article>
          </div>
        </div>
      </section>

      {/* Kontak Section */}
      <section id="kontak" className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-6 py-16">
          <h2 className="text-4xl font-bold text-center mb-8 font-sans">Kontak</h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-semibold mb-4 font-sans">Informasi Kontak</h3>
              <div className="space-y-4">
                <p className="flex items-center font-sans">
                  <span className="font-semibold w-24">Alamat:</span>
                  <span>Desa Karangrejo, Kabupaten Blitar, Jawa Timur</span>
                </p>
                <p className="flex items-center font-sans">
                  <span className="font-semibold w-24">Telepon:</span>
                  <span>(0342) xxx-xxxx</span>
                </p>
                <p className="flex items-center font-sans">
                  <span className="font-semibold w-24">Email:</span>
                  <span>info@desakarangrejo.go.id</span>
                </p>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-4 font-sans">Jam Pelayanan</h3>
              <div className="space-y-2">
                <p className="font-sans"><span className="font-semibold">Senin - Jumat:</span> 08.00 - 16.00 WIB</p>
                <p className="font-sans"><span className="font-semibold">Sabtu:</span> 08.00 - 12.00 WIB</p>
                <p className="font-sans"><span className="font-semibold">Minggu:</span> Tutup</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}