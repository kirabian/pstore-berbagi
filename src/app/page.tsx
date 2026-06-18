import React from 'react';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-950 flex flex-col items-center justify-center p-6 text-white overflow-hidden relative">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute -top-[30%] -left-[10%] w-[70%] h-[70%] rounded-full bg-blue-600/20 blur-[120px]"></div>
        <div className="absolute top-[60%] -right-[10%] w-[60%] h-[60%] rounded-full bg-indigo-600/20 blur-[120px]"></div>
      </div>

      <div className="z-10 flex flex-col items-center max-w-2xl text-center space-y-8 animate-fade-in-up">
        {/* Badge */}
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
          <span className="flex w-2 h-2 rounded-full bg-blue-500 mr-3 animate-pulse"></span>
          <span className="text-sm font-medium tracking-wide text-gray-300">Segera Hadir</span>
        </div>

        {/* Title */}
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
          PSTORE <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-600">Berbagi</span>
        </h1>

        {/* Description */}
        <p className="text-lg md:text-xl text-gray-400 max-w-xl mx-auto leading-relaxed">
          Sistem Pengecekan NIK PSTORE Berbagi sedang dalam tahap pengembangan dan penyempurnaan. Kami akan segera kembali dengan pengalaman yang lebih baik.
        </p>

        {/* Decorative Construction Elements */}
        <div className="pt-8 w-full max-w-md mx-auto">
          <div className="relative h-2 w-full bg-gray-800 rounded-full overflow-hidden">
            <div className="absolute top-0 left-0 h-full w-1/2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full animate-pulse"></div>
          </div>
          <div className="flex justify-between items-center mt-3 text-sm text-gray-500 font-medium">
            <span>Sistem sedang disiapkan...</span>
            <span>80%</span>
          </div>
        </div>

        {/* Contact/Info */}
        <div className="pt-12">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} PSTORE Berbagi. All rights reserved.
          </p>
        </div>
      </div>
    </main>
  );
}
