"use client";
import DashboardLayout from "@/components/DashboardLayout";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';  
import { supabase } from "@/lib/supabaseClient";
import { User } from "@supabase/supabase-js";

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) router.push('/admin');
      else setUser(data.session.user);
    };
    checkSession();
  }, [router]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/admin');
  };

  if (!user) return <p>Loading...</p>;
  return <DashboardLayout user={user} handleSignOut={handleSignOut} />;
}
