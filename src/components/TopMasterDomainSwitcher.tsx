import React from 'react';
import {
  BookOpen,
  Moon,
  Sparkles,
  Scale,
  Calendar,
  Compass,
  Library,
  Star,
  ShieldCheck,
  Flame,
} from 'lucide-react';

export type AppDomain = 'fiqh' | 'calendar';

interface TopMasterDomainSwitcherProps {
  activeDomain: AppDomain;
  onChangeDomain: (domain: AppDomain) => void;
  onOpenFiqhAI: () => void;
  onOpenCalendarAI: () => void;
}

export const TopMasterDomainSwitcher: React.FC<TopMasterDomainSwitcherProps> = ({
  activeDomain,
  onChangeDomain,
  onOpenFiqhAI,
  onOpenCalendarAI,
}) => {
  return (
    <div className="w-full max-w-5xl mx-auto px-2 sm:px-4 pt-2 sm:pt-3">
      {/* Outer Grand Container with dynamic domain aura border */}
      <div
        className={`p-1.5 sm:p-2.5 rounded-2xl sm:rounded-3xl transition-all duration-500 shadow-2xl ${
          activeDomain === 'fiqh'
            ? 'bg-gradient-to-r from-emerald-950 via-stone-900 to-emerald-950 border-2 border-emerald-500/60 shadow-[0_10px_35px_rgba(5,150,105,0.25)]'
            : 'bg-gradient-to-r from-slate-950 via-indigo-950/90 to-slate-950 border-2 border-sky-500/60 shadow-[0_10px_35px_rgba(14,165,233,0.22)]'
        }`}
      >
        {/* The Two Main Domain Cards / Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3">
          {/* ============================================================
              1. BUTTON / CARD: القسم الفقهي والأحكام الشرعية
             ============================================================ */}
          <button
            id="domain-switcher-fiqh"
            onClick={() => onChangeDomain('fiqh')}
            className={`group relative text-right p-3.5 sm:p-4 rounded-xl sm:rounded-2xl transition-all duration-400 overflow-hidden flex flex-col justify-between ${
              activeDomain === 'fiqh'
                ? 'bg-gradient-to-br from-emerald-900/90 via-emerald-950/95 to-stone-950 border-2 border-amber-400/80 shadow-[0_0_25px_rgba(16,185,129,0.35)] ring-2 ring-emerald-500/30'
                : 'bg-stone-900/60 hover:bg-emerald-950/40 border border-stone-800 hover:border-emerald-700/50 opacity-80 hover:opacity-100'
            }`}
          >
            {/* Ambient emerald backlight when active */}
            {activeDomain === 'fiqh' && (
              <div className="absolute -top-12 -right-12 w-40 h-40 bg-emerald-500/20 rounded-full blur-2xl pointer-events-none" />
            )}

            <div className="relative z-10 space-y-2">
              <div className="flex items-center justify-between gap-2">
                {/* Domain Category Pill */}
                <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-950/90 border border-emerald-500/40 text-emerald-300 text-[11px] sm:text-xs font-scheherazade font-bold">
                  <Library className="w-3.5 h-3.5 text-amber-400" />
                  <span>المكتبة الفقهية والأحكام الشرعية</span>
                </div>

                {/* Status Indicator */}
                {activeDomain === 'fiqh' ? (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-400/50 text-amber-300 text-[10px] font-bold font-scheherazade animate-pulse">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    <span>القسم النشط حالياً</span>
                  </span>
                ) : (
                  <span className="text-[10px] text-stone-400 group-hover:text-emerald-300 transition-colors font-tajawal">
                    انقر للانتقال ↶
                  </span>
                )}
              </div>

              {/* Title & Classical Subtitle */}
              <div>
                <h2
                  className={`text-lg sm:text-xl font-scheherazade font-bold transition-colors ${
                    activeDomain === 'fiqh'
                      ? 'text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-emerald-100 to-amber-300'
                      : 'text-stone-200 group-hover:text-emerald-200'
                  }`}
                >
                  القسم الفقهي والرسائل العملية
                </h2>
                <p className="text-xs sm:text-sm text-emerald-200/80 font-amiri line-clamp-1 mt-0.5">
                  فتاوى ومؤلفات سماحة السيد السيستاني (دام ظله) • ١٣ مؤلفاً نصياً • المساعد الفقهي الذكي
                </p>
              </div>
            </div>

            {/* Bottom badges & quick launcher */}
            <div className="relative z-10 flex items-center justify-between gap-2 pt-2.5 mt-2 border-t border-emerald-800/40 text-[11px]">
              <div className="flex items-center gap-2 text-stone-300 font-scheherazade">
                <span className="text-amber-400 font-bold">١٣ مؤلفاً كاملاً</span>
                <span>•</span>
                <span className="text-emerald-300">منهاج الصالحين والمسائل</span>
              </div>

              {activeDomain === 'fiqh' && (
                <span className="px-2 py-0.5 rounded bg-emerald-700/40 border border-emerald-500/30 text-emerald-200 text-[10px] font-bold">
                  ثيم الزمرد الحوزوي
                </span>
              )}
            </div>
          </button>

          {/* ============================================================
              2. BUTTON / CARD: قسم المناسبات والأحداث ومواقيت الأهلة
             ============================================================ */}
          <button
            id="domain-switcher-calendar"
            onClick={() => onChangeDomain('calendar')}
            className={`group relative text-right p-3.5 sm:p-4 rounded-xl sm:rounded-2xl transition-all duration-400 overflow-hidden flex flex-col justify-between ${
              activeDomain === 'calendar'
                ? 'bg-gradient-to-br from-indigo-950/95 via-slate-900/95 to-sky-950 border-2 border-cyan-400/80 shadow-[0_0_25px_rgba(6,182,212,0.35)] ring-2 ring-sky-500/30'
                : 'bg-stone-900/60 hover:bg-slate-900/80 border border-stone-800 hover:border-sky-700/50 opacity-80 hover:opacity-100'
            }`}
          >
            {/* Ambient cyan/starlight backlight when active */}
            {activeDomain === 'calendar' && (
              <div className="absolute -top-12 -left-12 w-40 h-40 bg-sky-500/20 rounded-full blur-2xl pointer-events-none" />
            )}

            <div className="relative z-10 space-y-2">
              <div className="flex items-center justify-between gap-2">
                {/* Domain Category Pill */}
                <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-950/90 border border-sky-500/40 text-cyan-300 text-[11px] sm:text-xs font-cairo font-bold">
                  <Moon className="w-3.5 h-3.5 text-amber-400 fill-amber-400/20" />
                  <span>مواقيت الأهلة والوقائع التاريخية</span>
                </div>

                {/* Status Indicator */}
                {activeDomain === 'calendar' ? (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-cyan-500/20 border border-cyan-400/50 text-cyan-300 text-[10px] font-bold font-cairo animate-pulse">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    <span>القسم النشط حالياً</span>
                  </span>
                ) : (
                  <span className="text-[10px] text-stone-400 group-hover:text-cyan-300 transition-colors font-tajawal">
                    انقر للانتقال ↶
                  </span>
                )}
              </div>

              {/* Title & Modern Astronomical Subtitle */}
              <div>
                <h2
                  className={`text-lg sm:text-xl font-cairo font-bold transition-colors ${
                    activeDomain === 'calendar'
                      ? 'text-transparent bg-clip-text bg-gradient-to-r from-sky-200 via-white to-cyan-300'
                      : 'text-stone-200 group-hover:text-cyan-200'
                  }`}
                >
                  قسم المناسبات والأهلة والتقويم
                </h2>
                <p className="text-xs sm:text-sm text-sky-200/80 font-tajawal line-clamp-1 mt-0.5">
                  تقويم عام ١٤٤٨ هـ (أفق النجف الأشرف) • ١٣٢ واقعة للمعصومين • مكوث برج العقرب
                </p>
              </div>
            </div>

            {/* Bottom badges & quick launcher */}
            <div className="relative z-10 flex items-center justify-between gap-2 pt-2.5 mt-2 border-t border-sky-800/40 text-[11px]">
              <div className="flex items-center gap-2 text-stone-300 font-tajawal">
                <span className="text-amber-400 font-bold">١٢ شهراً قمرياً</span>
                <span>•</span>
                <span className="text-sky-300">أفق النجف والمناسبات</span>
              </div>

              {activeDomain === 'calendar' && (
                <span className="px-2 py-0.5 rounded bg-sky-900/50 border border-sky-500/40 text-cyan-200 text-[10px] font-bold">
                  ثيم الفلك والسماء الليلية
                </span>
              )}
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
