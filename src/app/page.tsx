"use client";

import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Search, UserX, UserCheck, Loader2, Download, CheckCircle2, AlertCircle } from 'lucide-react';

export default function Home() {
  const [nik, setNik] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const handleCekNik = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!nik || nik.length < 16) {
      setErrorMsg('Masukkan 16 digit NIK dengan benar.');
      setResult(null);
      return;
    }

    setLoading(true);
    setErrorMsg('');
    setResult(null);

    try {
      // Menembak API Laravel
      const response = await fetch(`https://jumatberbagi.my.id/api/cek-nik/${nik}`);
      const data = await response.json();

      if (response.ok && data.success) {
        setResult(data);
      } else {
        // NIK Tidak ditemukan atau error lain
        setErrorMsg(data.message || 'NIK anda belum terdaftar silahkan datang ke pstore lenteng agung untuk pendaftaran NIK');
      }
    } catch (error) {
      setErrorMsg('Gagal terhubung ke server. Silahkan coba beberapa saat lagi.');
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadQr = async () => {
    const svg = document.getElementById("qr-code-svg");
    if (!svg) return;

    // Track download in background
    try {
      fetch('https://jumatberbagi.my.id/api/track-qr-download', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ nik: nik })
      }).catch(e => console.error("Tracking failed:", e));
    } catch (e) {
      // Ignore tracking errors
    }

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    
    img.onload = () => {
      canvas.width = img.width + 40; // Add padding
      canvas.height = img.height + 40;
      if (ctx) {
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 20, 20);
        const pngFile = canvas.toDataURL("image/png");
        const downloadLink = document.createElement("a");
        downloadLink.download = `QR-PSTORE-${nik}.png`;
        downloadLink.href = `${pngFile}`;
        downloadLink.click();
      }
    };
    
    img.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData)));
  };
  const isUnderConstruction = false;

  if (isUnderConstruction) {
    return (
      <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
          PSTORE <span className="text-blue-600">Berbagi</span>
        </h1>
        <div className="bg-yellow-50 border border-yellow-200 p-8 rounded-2xl max-w-md w-full shadow-sm flex flex-col items-center">
          <span className="text-6xl mb-4">🚧</span>
          <h2 className="text-xl font-bold text-yellow-800 mb-2">Sistem Sedang Dibangun</h2>
          <p className="text-sm text-yellow-700">Mohon maaf, Sistem Pengecekan NIK saat ini sedang dalam tahap pengembangan dan pemeliharaan rutin. Silakan kembali lagi nanti.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
      
      {/* Header */}
      <div className="w-full max-w-md text-center mb-8">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-2">
          PSTORE <span className="text-blue-600">Berbagi</span>
        </h1>
        <p className="text-sm text-gray-500">
          Sistem Pengecekan NIK & Pengambilan Paket
        </p>
      </div>

      {/* Main Card */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        
        {/* Form Section */}
        <div className="p-6 sm:p-8">
          <form onSubmit={handleCekNik} className="space-y-4">
            <div>
              <label htmlFor="nik" className="block text-sm font-medium text-gray-700 mb-1">
                Nomor Induk Kependudukan (NIK)
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="number"
                  id="nik"
                  className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-3 py-3 sm:text-sm border-gray-300 rounded-xl bg-gray-50 border outline-none transition-all text-gray-900"
                  placeholder="Masukkan 16 digit NIK"
                  value={nik}
                  onChange={(e) => setNik(e.target.value)}
                  maxLength={16}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-70 disabled:cursor-not-allowed transition-all"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" />
                  Mengecek Data...
                </>
              ) : (
                'Cek Status NIK'
              )}
            </button>
          </form>
        </div>

        {/* Error State */}
        {errorMsg && (
          <div className="px-6 pb-8">
            <div className="bg-red-50 border border-red-100 rounded-xl p-4 flex items-start">
              <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Pengecekan Gagal</h3>
                <p className="mt-1 text-sm text-red-700">{errorMsg}</p>
              </div>
            </div>
          </div>
        )}

        {/* Success State */}
        {result && (
          <div className="border-t border-gray-100 bg-gray-50 p-6 sm:p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            
            <div className="bg-green-50 border border-green-100 rounded-xl p-4 flex items-start mb-6">
              <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
              <div className="ml-3">
                <p className="text-sm text-green-800 font-medium">{result.message}</p>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center bg-white p-6 rounded-xl border border-gray-200 shadow-sm mb-6">
              <div className="bg-white p-2 rounded-lg">
                <QRCodeSVG 
                  id="qr-code-svg"
                  value={result.data.encrypted_nik || result.data.nik} 
                  size={1024}
                  style={{ width: '250px', height: '250px' }}
                  level={"H"}
                  includeMargin={false}
                />
              </div>
              <button 
                onClick={handleDownloadQr}
                className="mt-4 flex items-center justify-center space-x-2 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-full w-full"
              >
                <Download className="w-4 h-4" />
                <span>Download Barcode</span>
              </button>
            </div>

            {/* Biodata Singkat */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="px-4 py-3 bg-gray-100 border-b border-gray-200 flex items-center">
                <UserCheck className="w-4 h-4 text-gray-500 mr-2" />
                <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider">Data Pribadi</h3>
              </div>
              <dl className="divide-y divide-gray-100">
                <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4">
                  <dt className="text-xs font-medium text-gray-500">Nama Lengkap</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 font-medium">
                    {result.data.nama.length > 3 
                      ? result.data.nama.substring(0, 3) + '*'.repeat(result.data.nama.length - 3) 
                      : result.data.nama}
                  </dd>
                </div>
                <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4">
                  <dt className="text-xs font-medium text-gray-500">NIK</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 font-mono">{result.data.nik}</dd>
                </div>
                {result.data.alamat_ktp && (
                  <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt className="text-xs font-medium text-gray-500">Alamat</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{result.data.alamat_ktp}</dd>
                  </div>
                )}
              </dl>
            </div>

          </div>
        )}

      </div>
      
      {/* Footer */}
      <div className="mt-8 text-center">
        <p className="text-xs text-gray-400">
          © {new Date().getFullYear()} PSTORE Berbagi. All rights reserved.
        </p>
      </div>

    </main>
  );
}
