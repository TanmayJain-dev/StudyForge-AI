"use client";

import { motion } from 'motion/react';
import { useRouter } from 'next/navigation';
import UploadCard from '@/components/UploadCard';
import Hero from '@/components/Hero';

export default function Home() {
  const router = useRouter();

  const handleUpload = async (file: File) => {
    const formData = new FormData();

    formData.append("file", file);

    try {
      const response = await fetch(
        "http://localhost:8000/api/notes",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();

      console.log("Backend response:", data);

      const searchParams = new URLSearchParams({
        filename: data.filename,
        size: file.size.toString(),
        notes: data.notes,
      });

      router.push(
        `/dashboard?${searchParams.toString()}`
      );

    } catch (error) {
      console.error(error);
      alert("Failed to process document");
    }
  };

  return (
    <div className="flex-1 flex flex-col relative overflow-hidden pt-16">
      {/* Background gradients */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-900/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-900/20 blur-[120px] pointer-events-none" />

      <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-20 z-10">
        <Hero />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="w-full"
        >
          <UploadCard onUpload={handleUpload} />
        </motion.div>
      </main>
    </div>
  );
}
