import React from 'react';
import { Flame, Clock, Calendar, ArrowLeft, HeartHandshake, Sparkles } from 'lucide-react';
import { NextShahadahInfo } from '../utils/dateUtils';

interface ShahadahCountdownCardProps {
  nextShahadah: NextShahadahInfo | null;
  onNavigateToDay: (monthId: number, hijriDay: number) => void;
  isClosest?: boolean;
}

export const ShahadahCountdownCard: React.FC<ShahadahCountdownCardProps> = ({
  nextShahadah,
  onNavigateToDay,
  isClosest = false,
}) => {
  if (!nextShahadah) return null;

  const {
    event,
    month,
    hijriDateFormatted,
    gregorianDateFormatted,
    isToday,
    days,
    hours,
    minutes,
    seconds,
  } = nextShahadah;

  return (
    <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br from-stone-950 via-stone-900 to-rose-950/40 border shadow-2xl p-4 sm:p-5 transition-all ${
      isClosest ? 'border-rose-500/60 ring-1 ring-rose-500/20' : 'border-rose-600/30'
    }`}>
      {/* Subtle Background Glow */}
      <div className="absolute top-0 right-1/4 w-64 h-32 bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-stone-800/80">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-400">
            <Flame className="w-5 h-5 fill-rose-500/20" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-base sm:text-lg font-bold text-rose-200 font-amiri">
                العد التنازلي لذكرى الاستشهاد القادم
              </h3>
              {isClosest && (
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold">
                  ★ الأقرب موعداً
                </span>
              )}
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-950/80 text-rose-300 border border-rose-700/50">
                مناسبة أليمة
              </span>
            </div>
            <p className="text-xs text-stone-400 font-tajawal">
              خاص بالمعصومين الأربعة عشر (النبي الأعظم، فاطمة الزهراء، والأئمة الاثنا عشر عليهم السلام)
            </p>
          </div>
        </div>

        {/* Quick View in Calendar */}
        <button
          onClick={() => onNavigateToDay(month.id, event.day)}
          className="self-start sm:self-center text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1 hover:underline active:scale-95 transition-all"
        >
          <span>عرض في التقويم</span>
          <ArrowLeft className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Event Details and Target Date */}
      <div className="mt-3.5 flex flex-col md:flex-row md:items-center justify-between gap-3 bg-stone-950/60 p-3.5 rounded-xl border border-stone-800/80">
        <div className="space-y-1">
          <h4 className="text-base sm:text-lg font-bold text-stone-100 font-amiri">
            {event.title}
          </h4>
          <p className="text-xs text-stone-300 leading-relaxed max-w-xl">
            {event.description}
          </p>
        </div>

        <div className="flex flex-col sm:items-end text-xs text-stone-400 space-y-0.5 border-t md:border-t-0 border-stone-800 pt-2 md:pt-0">
          <span className="font-bold text-amber-300 font-amiri text-sm">
            {hijriDateFormatted}
          </span>
          <span className="text-stone-400 text-[11px]">
            الموافق: {gregorianDateFormatted}
          </span>
        </div>
      </div>

      {/* Countdown Timer Display */}
      {isToday ? (
        <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-rose-950/80 via-stone-900 to-rose-950/80 border border-rose-500/40 text-center space-y-1">
          <div className="text-base sm:text-lg font-bold text-rose-300 font-amiri">
            عظّم الله أجوركم وأحسن عزاءكم
          </div>
          <div className="text-xs sm:text-sm text-stone-300">
            اليوم تصادف ذكرى: <strong>{event.title}</strong>
          </div>
        </div>
      ) : (
        <div className="mt-4">
          <div className="text-xs text-stone-400 mb-2 flex items-center justify-between">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-rose-400" />
              <span>الوقت المتبقي حتى حلول الذكرى:</span>
            </span>
            <span className="text-[11px] text-rose-400 font-mono">
              تحديث حي لحظي
            </span>
          </div>

          <div className="grid grid-cols-4 gap-2 sm:gap-3 text-center">
            {/* Days */}
            <div className="bg-stone-950/80 rounded-xl p-2.5 sm:p-3 border border-rose-900/40 shadow-inner">
              <div className="text-xl sm:text-3xl font-bold font-mono text-rose-200">
                {days}
              </div>
              <div className="text-[11px] sm:text-xs text-stone-400 mt-0.5">
                {days === 1 ? 'يوم' : days === 2 ? 'يومان' : days >= 3 && days <= 10 ? 'أيام' : 'يوماً'}
              </div>
            </div>

            {/* Hours */}
            <div className="bg-stone-950/80 rounded-xl p-2.5 sm:p-3 border border-rose-900/40 shadow-inner">
              <div className="text-xl sm:text-3xl font-bold font-mono text-rose-200">
                {String(hours).padStart(2, '0')}
              </div>
              <div className="text-[11px] sm:text-xs text-stone-400 mt-0.5">
                ساعة
              </div>
            </div>

            {/* Minutes */}
            <div className="bg-stone-950/80 rounded-xl p-2.5 sm:p-3 border border-rose-900/40 shadow-inner">
              <div className="text-xl sm:text-3xl font-bold font-mono text-rose-200">
                {String(minutes).padStart(2, '0')}
              </div>
              <div className="text-[11px] sm:text-xs text-stone-400 mt-0.5">
                دقيقة
              </div>
            </div>

            {/* Seconds */}
            <div className="bg-stone-950/80 rounded-xl p-2.5 sm:p-3 border border-rose-900/40 shadow-inner relative overflow-hidden">
              <div className="absolute top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
              <div className="text-xl sm:text-3xl font-bold font-mono text-amber-300">
                {String(seconds).padStart(2, '0')}
              </div>
              <div className="text-[11px] sm:text-xs text-stone-400 mt-0.5">
                ثانية
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
