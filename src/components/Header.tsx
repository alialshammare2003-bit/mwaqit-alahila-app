import React from 'react';
import {
  BookOpen,
  Compass,
  ShieldAlert,
  Sparkles,
  Moon,
} from 'lucide-react';

interface HeaderProps {
  onOpenIntro: () => void;
  onOpenScorpioTable: () => void;
  onOpenEventsDirectory: () => void;
  onOpenDateConverter: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenIntro,
  onOpenScorpioTable,
  onOpenEventsDirectory,
  onOpenDateConverter,
}) => {
  return (
    <header className="relative overflow-hidden pt-4 pb-4 px-3 sm:px-4 bg-gradient-to-b from-stone-950 via-stone-900/95 to-stone-950 border-b border-amber-900/40 text-stone-100 shadow-2xl">
      {/* Decorative Islamic Top Bar Accent */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-600 via-amber-400 to-amber-600 opacity-90" />

      {/* Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[32rem] h-32 bg-amber-500/10 blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10 space-y-3">
        {/* Main Title Section */}
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/60 border border-amber-600/30 text-amber-300 text-xs sm:text-sm font-medium mb-1.5 shadow-inner">
            <Moon className="w-3.5 h-3.5 text-amber-400 fill-amber-400/30" />
            <span>التقويم السنوي لأوائل الشهور القمرية</span>
            <span className="w-1 h-1 rounded-full bg-amber-400"></span>
            <span>أفق النجف الأشرف</span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-amiri font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-300 to-amber-100 tracking-wide drop-shadow-sm">
            مَـوَاقِيـتُ الأَهِلَّـةِ لِعَـامِ ١٤٤٨ هـ
          </h1>

          <p className="text-xs sm:text-sm text-stone-400 mt-0.5 font-tajawal">
            ( 2026 – 2027 م ) • طبقاً للحسابات العلمية الصادرة عن مكتب سماحة السيد السيستاني (دام ظله)
          </p>
        </div>

        {/* Quick Access Action Pills */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap pt-1">
          <button
            onClick={onOpenIntro}
            id="btn-intro-modal"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-800/90 hover:bg-stone-700 text-amber-200 text-xs sm:text-sm font-medium border border-amber-600/20 active:scale-95 transition-all shadow-sm"
          >
            <BookOpen className="w-4 h-4 text-amber-400" />
            <span>المقدمة والمنهجية</span>
          </button>

          <button
            onClick={onOpenScorpioTable}
            id="btn-scorpio-table"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-800/90 hover:bg-stone-700 text-amber-200 text-xs sm:text-sm font-medium border border-amber-600/20 active:scale-95 transition-all shadow-sm"
          >
            <ShieldAlert className="w-4 h-4 text-rose-400" />
            <span>برج العقرب للعام</span>
          </button>

          <button
            onClick={onOpenEventsDirectory}
            id="btn-events-dir"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-800/90 hover:bg-stone-700 text-amber-200 text-xs sm:text-sm font-medium border border-amber-600/20 active:scale-95 transition-all shadow-sm"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>دليل المناسبات</span>
          </button>

          <button
            onClick={onOpenDateConverter}
            id="btn-date-converter"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-800/90 hover:bg-stone-700 text-amber-200 text-xs sm:text-sm font-medium border border-amber-600/20 active:scale-95 transition-all shadow-sm"
          >
            <Compass className="w-4 h-4 text-cyan-400" />
            <span>تحويل التاريخ</span>
          </button>
        </div>
      </div>
    </header>
  );
};
