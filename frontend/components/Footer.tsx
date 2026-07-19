"use client";

export default function Footer() {
  return (
    <footer className="bg-black py-12 border-t border-white/10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
        <p className="text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} StudyForge AI. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
