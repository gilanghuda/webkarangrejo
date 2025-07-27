"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from "@/lib/supabaseClient"; 
import LoginCard from "@/components/loginCard";
import Image from "next/image";

export default function AdminLoginPage() {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); 
  const router = useRouter();
  const handleSignIn = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (!error) router.push('/admin/dashboard');
    else alert(error.message);
  };

  return (
    <div className="min-h-screen bg-[#fafafa] flex items-center justify-center px-2">
      <LoginCard
        email={email}
        password={password}
        setEmail={setEmail}
        setPassword={setPassword}
        handleSignIn={handleSignIn}
        loading={loading} // pass loading ke LoginCard
      />
      <Image
        src="/images/bgLogin.png"
        alt="Background Login"
        width={1920}
        height={600}
        className="w-full object-bottom object-cover absolute left-0 bottom-0 z-0 pointer-events-none select-none"
        draggable={false}
      />
    </div>
  );
}