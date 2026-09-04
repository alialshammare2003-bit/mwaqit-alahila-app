import React from 'react';
import {
  BookOpen,
  Compass,
  ShieldAlert,
  Sparkles,
  Moon,
  Library,
  Scale,
  Calendar,
} from 'lucide-react';
import { AppDomain } from './TopMasterDomainSwitcher';

interface HeaderProps {
  activeDomain: AppDomain;
  onChangeDomain: (domain: AppDomain) => void;
  onOpenIntro: () => void;
  onOpenScorpioTable: () => void;
  onOpenEventsDirectory: () => void;
  onOpenDateConverter: () => void;
  onOpenBooksLibrary: () => void;
  onOpenFiqhAI: () => void;
  onOpenCalendarAI: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeDomain,
  onChangeDomain,
  onOpenIntro,
  onOpenScorpioTable,
  onOpenEventsDirectory,
  onOpenDateConverter,
  onOpenBooksLibrary,
  onOpenFiqhAI,
  onOpenCalendarAI,
}) => {
  const isFiqh = activeDomain === 'fiqh';

  return (
    <header
      className={`relative overflow-hidden pt-3 pb-3 sm:pb-4 px-3 sm:px-4 text-stone-100 shadow-2xl transition-all duration-500 ${
        isFiqh
          ? 'bg-gradient-to-b from-emerald-950 via-stone-950 to-emerald-950/90 border-b border-emerald-700/40'
          : 'bg-gradient-to-b from-slate-950 via-indigo-950/80 to-slate-950 border-b border-sky-900/40'
      }`}
    >
      {/* Decorative Top Bar Accent */}
      <div
        className={`absolute top-0 left-0 right-0 h-1 transition-all duration-500 ${
          isFiqh
            ? 'bg-gradient-to-r from-emerald-500 via-amber-400 to-emerald-500 opacity-95'
            : 'bg-gradient-to-r from-sky-500 via-amber-300 to-indigo-500 opacity-95'
        }`}
      />

      {/* Ambient Glow */}
      <div
        className={`absolute top-0 left-1/2 -translate-x-1/2 w-[32rem] h-28 blur-3xl pointer-events-none transition-all duration-500 ${
          isFiqh ? 'bg-emerald-500/15' : 'bg-sky-500/15'
        }`}
      />

      <div className="max-w-5xl mx-auto relative z-10 space-y-3">
        {/* Main Title Section */}
        <div className="flex flex-col items-center text-center">
          {isFiqh ? (
            /* ================= FIQH DOMAIN HEADER ================= */
            <>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/90 border border-emerald-500/40 text-emerald-300 text-xs sm:text-sm font-bold font-scheherazade mb-1 shadow-inner">
                <Library className="w-3.5 h-3.5 text-amber-400" />
                <span>المكتبة الفقهية والرسائل العملية</span>
                <span className="w-1 h-1 rounded-full bg-amber-400"></span>
                <span>فتاوى المرجعية الدينية العليا</span>
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl font-scheherazade font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-emerald-100 to-amber-300 tracking-wide drop-shadow-sm">
                القِـسْـمُ الفِـقْـهِيُّ وَالأَحْـكَـامُ الشَّـرْعِيَّـة
              </h1>

              <p className="text-xs sm:text-sm text-emerald-200/90 mt-0.5 font-amiri">
                مكتب سماحة آية الله العظمى السيد علي الحسيني السيستاني (دام ظله) • ١٣ مؤلفاً نصياً معتمداً
              </p>
            </>
          ) : (
            /* ================= CALENDAR DOMAIN HEADER ================= */
            <>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950/90 border border-sky-500/40 text-cyan-300 text-xs sm:text-sm font-bold font-cairo mb-1 shadow-inner">
                <Moon className="w-3.5 h-3.5 text-amber-400 fill-amber-400/30" />
                <span>التقويم السنوي لأوائل الشهور ومواقيت الأهلة</span>
                <span className="w-1 h-1 rounded-full bg-cyan-400"></span>
                <span>أفق النجف الأشرف</span>
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl font-amiri font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-sky-200 to-amber-200 tracking-wide drop-shadow-sm">
                مَـوَاقِيـتُ الأَهِلَّـةِ وَالوَقَـائِعُ لِعَـامِ ١٤٤٨ هـ
              </h1>

              <p className="text-xs sm:text-sm text-sky-200/80 mt-0.5 font-tajawal">
                ( 2026 – 2027 م ) • طبقاً للحسابات الفلكية الصادرة عن مكتب سماحة السيد السيستاني (دام ظله)
              </p>
            </>
          )}
        </div>

        {/* Quick Access Action Pills */}
        <div className="flex items-center justify-center gap-1.5 sm:gap-2.5 flex-wrap pt-0.5">
          {isFiqh ? (
            /* FIQH ACTION BUTTONS */
            <>
              <button
                onClick={onOpenFiqhAI}
                id="btn-header-fiqh-ai"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 hover:from-amber-400 hover:to-amber-500 text-stone-950 text-xs sm:text-sm font-bold font-scheherazade active:scale-95 transition-all shadow-md ring-1 ring-amber-300"
                title="المساعد الفقهي الذكي المستند للمؤلفات الـ 13"
              >
                <Sparkles className="w-3.5 h-3.5 text-stone-950" />
                <span>اسألني سؤال فقهي</span>
              </button>

              <button
                onClick={onOpenBooksLibrary}
                id="btn-books-library"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 text-emerald-200 text-xs sm:text-sm font-bold font-scheherazade border border-emerald-500/40 active:scale-95 transition-all shadow-sm"
              >
                <Library className="w-4 h-4 text-amber-400" />
                <span>تصفح الكتب الـ ١٣ كاملة</span>
              </button>

              <button
                onClick={() => onChangeDomain('calendar')}
                id="btn-switch-to-calendar"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-900 hover:bg-stone-850 text-stone-300 hover:text-cyan-300 text-xs sm:text-sm font-medium border border-stone-800 active:scale-95 transition-all shadow-sm"
              >
                <Moon className="w-3.5 h-3.5 text-cyan-400" />
                <span>الانتقال لقسم المناسبات والأهلة ↶</span>
              </button>
            </>
          ) : (
            /* CALENDAR ACTION BUTTONS */
            <>
              <button
                onClick={onOpenCalendarAI}
                id="btn-header-calendar-ai"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-cyan-600 to-sky-700 hover:from-cyan-500 hover:to-sky-600 text-stone-950 text-xs sm:text-sm font-bold active:scale-95 transition-all shadow-md ring-1 ring-cyan-300"
                title="المساعد الذكي لمواقيت الأهلة والأحداث التاريخية"
              >
                <Moon className="w-3.5 h-3.5 text-stone-950" />
                <span>اسألني عن الأهلة والمناسبات</span>
              </button>

              <button
                onClick={onOpenEventsDirectory}
                id="btn-events-dir"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-cyan-200 text-xs sm:text-sm font-medium border border-sky-800/60 active:scale-95 transition-all shadow-sm"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>دليل المناسبات (١٣٢)</span>
              </button>

              <button
                onClick={onOpenScorpioTable}
                id="btn-scorpio-table"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-stone-300 hover:text-rose-300 text-xs sm:text-sm font-medium border border-stone-800 active:scale-95 transition-all shadow-sm"
              >
                <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
                <span>برج العقرب</span>
              </button>

              <button
                onClick={onOpenDateConverter}
                id="btn-date-converter"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-stone-300 hover:text-cyan-300 text-xs sm:text-sm font-medium border border-stone-800 active:scale-95 transition-all shadow-sm"
              >
                <Compass className="w-3.5 h-3.5 text-cyan-400" />
                <span>تحويل التاريخ</span>
              </button>

              <button
                onClick={onOpenIntro}
                id="btn-intro-modal"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-stone-300 hover:text-amber-200 text-xs sm:text-sm font-medium border border-stone-800 active:scale-95 transition-all shadow-sm"
              >
                <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                <span>المقدمة</span>
              </button>

              <button
                onClick={() => onChangeDomain('fiqh')}
                id="btn-switch-to-fiqh"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 text-emerald-200 text-xs sm:text-sm font-medium border border-emerald-600/40 active:scale-95 transition-all shadow-sm"
              >
                <Library className="w-3.5 h-3.5 text-amber-400" />
                <span>الانتقال للقسم الفقهي ↶</span>
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

