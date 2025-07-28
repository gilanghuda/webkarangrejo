import React from 'react';
import { Mail, Phone, Clock } from 'lucide-react';

const Footer: React.FC<{ id?: string }> = ({ id }) => {
  return (
    <footer id={id} className="bg-[#1C270C] text-[#F6FAEB] pt-8 pb-4 px-4 md:px-8 lg:px-12">
      <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-col lg:flex-row items-center lg:items-start gap-6 md:gap-8 lg:gap-10">
        
        {/* Left Section - Desa Name */}
        <div className="flex-shrink-0 text-center lg:text-left">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
            Desa<br />
            Karangrejo
          </h1>
        </div>

        {/* Divider Line - Hidden on mobile and tablet */}
        <div className="hidden lg:block w-px bg-[#F6FAEB] h-24 self-center"></div>

        {/* Middle and Right Sections */}
        <div className="w-full flex flex-col md:flex-row gap-6 md:gap-8 lg:gap-10">
          {/* Address and Contact Info */}
          <div className="flex-1 space-y-3 text-center md:text-left">
            <div className="mb-2">
              <p className="text-base md:text-lg font-medium">
                Jl. Raya Karangrejo, Kec. Garum, Kabupaten Blitar, Jawa Timur 66182
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-center md:justify-start gap-2">
                <Mail size={18} className="text-[#F6FAEB]" />
                <span className="text-sm md:text-base">desakarangrejo15@gmail.com</span>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-2">
                <Phone size={18} className="text-[#F6FAEB]" />
                <span className="text-sm md:text-base">085732117511</span>
              </div>
            </div>
          </div>

          {/* Office Hours */}
          <div className="flex-1 space-y-3 text-center md:text-right">
            <div>
              <h3 className="text-base md:text-lg font-semibold mb-1">Senin - Kamis</h3>
              <div className="flex items-center justify-center md:justify-end gap-2">
                <Clock size={16} className="text-[#F6FAEB]" />
                <span className="text-sm md:text-base">08.00 - 14.00</span>
              </div>
            </div>
            <div>
              <h3 className="text-base md:text-lg font-semibold mb-1">Jumat</h3>
              <div className="flex items-center justify-center md:justify-end gap-2">
                <Clock size={16} className="text-[#F6FAEB]" />
                <span className="text-sm md:text-base">08.00 - 11.00</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Horizontal Divider & Footer Bottom Row */}
      <div className="border-t border-[#F6FAEB] mt-6 pt-4 flex flex-col md:flex-row justify-between items-center gap-4 text-sm font-bold text-[#F6FAEB]">
        <span>DIBUAT OLEH MMD 15 FILKOM UB 2025</span>
        <a
          href="/admin"
          className="text-xs font-light text-[#F6FAEB]/70 hover:text-[#F6FAEB] hover:underline transition"
        >
          Admin
        </a>
      </div>
    </footer>
  );
};

export default Footer;