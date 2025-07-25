import { supabase } from "@/lib/supabaseClient";

export async function uploadImage(file: File, bucket: string): Promise<string> {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
  const { error } = await supabase.storage
    .from(bucket)
    .upload(fileName, file, { upsert: true });
  if (error) throw error;
  const { data: publicUrlData } = supabase.storage
    .from(bucket)
    .getPublicUrl(fileName);
  return publicUrlData?.publicUrl || "";
}
