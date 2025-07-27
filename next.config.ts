import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['omqnslhxcdfwkvapoczb.supabase.co'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
