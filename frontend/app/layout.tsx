import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "StudyForge AI",
  description: "Turn any PDF into beautiful AI-generated notes, flashcards, quizzes and revision material.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased dark font-sans">
      <body className="min-h-full flex flex-col bg-zinc-950 text-white selection:bg-indigo-500/30">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
