"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from "@/lib/supabaseClient"; 
import LoginCard from "@/components/loginCard";

export default function AdminLoginPage() {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const handleSignIn = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
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
      />
    </div>
  );
}