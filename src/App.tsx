import React from "react";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-premium p-6 space-y-4">
        <div className="text-center">
          <p className="text-xs font-semibold text-emerald-600 tracking-[0.25em] uppercase">
            Noor
          </p>
          <h1 className="mt-2 text-2xl font-bold text-emerald-900">
            Islamic Companion
          </h1>
          <p className="mt-1 text-xs text-emerald-700/70">
            Adhan times, Quran recitation, daily adhkar.
          </p>
        </div>

        <div className="bg-emerald-50 rounded-2xl p-4 space-y-2">
          <p className="text-xs font-semibold text-emerald-700 uppercase tracking-wide">
            Quran
          </p>
          <p className="arabic-text text-right text-xl leading-relaxed text-emerald-900">
            ٱقْرَأْ بِاسْمِ رَبِّكَ ٱلَّذِى خَلَقَ
          </p>
          <p className="text-[11px] text-emerald-800/80">
            Recite in the name of your Lord who created. (Al-Alaq 96:1)
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3 text-[11px]">
          <button className="flex flex-col items-center justify-center py-3 rounded-2xl bg-emerald-600 text-white font-semibold">
            Adhan
          </button>
          <button className="flex flex-col items-center justify-center py-3 rounded-2xl bg-emerald-50 text-emerald-800 font-semibold">
            Quran
          </button>
          <button className="flex flex-col items-center justify-center py-3 rounded-2xl bg-emerald-50 text-emerald-800 font-semibold">
            Dhikr
          </button>
        </div>

        <p className="text-[10px] text-center text-emerald-800/60 mt-2">
          This is a starter UI. You can now plug in your full functionality.
        </p>
      </div>
    </div>
  );
}