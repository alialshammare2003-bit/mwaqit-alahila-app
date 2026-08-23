import React from 'react';
import { HeartHandshake, Clock, ArrowLeft, Sparkles } from 'lucide-react';
import { NextMarriageInfo } from '../utils/dateUtils';

interface MarriageCountdownCardProps {
  nextMarriage: NextMarriageInfo | null;
  onNavigateToDay: (monthId: number, hijriDay: number) => void;
  isClosest?: boolean;
}

export const MarriageCountdownCard: React.FC<MarriageCountdownCardProps> = ({
  nextMarriage,
  onNavigateToDay,
  isClosest = false,
}) => {
  if (!nextMarriage) return null;

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
  } = nextMarriage;

  return (
    <div
      id="infallible-marriage-card"
      className={`relative overflow-hidden rounded-2xl bg-gradient-to-br from-stone-950 via-pink-950/30 to-stone-900 border shadow-2xl p-4 sm:p-5 transition-all ${
        isClosest ? 'border-pink-500/60 ring-1 ring-pink-500/20' : 'border-pink-600/30'
      }`}
    >
      {/* Subtle Pink Background Glow */}
      <div className="absolute top-0 right-1/4 w-64 h-32 bg-pink-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-stone-800/80">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-pink-500/15 border border-pink-500/30 flex items-center justify-center text-pink-400">
            <HeartHandshake className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-base sm:text-lg font-bold text-pink-200 font-amiri">
                العد التنازلي لزواج المعصومين المبارك
              </h3>
              {isClosest && (
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold">
                  ★ الأقرب موعداً
                </span>
              )}
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-pink-950/80 text-pink-300 border border-pink-700/50">
                مناسبة بهيجة ومباركة
              </span>
            </div>
            <p className="text-xs text-stone-400 font-tajawal">
              خاص بمناسبات زواج المعصومين (كزواج النورين علي والزهراء، وزواج النبي الأكرم من خديجة الكبرى عليهم السلام)
            </p>
          </div>
        </div>

        {/* Quick View in Calendar */}
        <button
          onClick={() => onNavigateToDay(month.id, event.day)}
          className="self-start sm:self-center text-xs text-pink-400 hover:text-pink-300 flex items-center gap-1 hover:underline active:scale-95 transition-all"
        >
          <span>عرض في التقويم</span>
          <ArrowLeft className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Event Details and Target Date */}
      <div className="mt-3.5 flex flex-col md:flex-row md:items-center justify-between gap-3 bg-stone-950/60 p-3.5 rounded-xl border border-stone-800/80">
        <div className="space-y-1">
          <h4 className="text-base sm:text-lg font-bold text-pink-300 font-amiri">
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
        <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-pink-950/80 via-stone-900 to-pink-950/80 border border-pink-500/40 text-center space-y-1">
          <div className="text-base sm:text-lg font-bold text-pink-300 font-amiri">
            متباركون بذكرى الزواج الميمون المبارك
          </div>
          <div className="text-xs sm:text-sm text-stone-300">
            اليوم تصادف ذكرى: <strong>{event.title}</strong>
          </div>
        </div>
      ) : (
        <div className="mt-4">
          <div className="text-xs text-stone-400 mb-2 flex items-center justify-between">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-pink-400" />
              <span>الوقت المتبقي حتى حلول مناسبة الزواج المباركة:</span>
            </span>
            <span className="text-[11px] text-pink-400 font-mono">
              تحديث حي لحظي
            </span>
          </div>

          <div className="grid grid-cols-4 gap-2 sm:gap-3 text-center">
            {/* Days */}
            <div className="bg-stone-950/80 rounded-xl p-2.5 sm:p-3 border border-pink-900/40 shadow-inner">
              <div className="text-xl sm:text-3xl font-bold font-mono text-pink-200">
                {days}
              </div>
              <div className="text-[11px] sm:text-xs text-stone-400 mt-0.5">
                {days === 1 ? 'يوم' : days === 2 ? 'يومان' : days >= 3 && days <= 10 ? 'أيام' : 'يوماً'}
              </div>
            </div>

            {/* Hours */}
            <div className="bg-stone-950/80 rounded-xl p-2.5 sm:p-3 border border-pink-900/40 shadow-inner">
              <div className="text-xl sm:text-3xl font-bold font-mono text-pink-200">
                {String(hours).padStart(2, '0')}
              </div>
              <div className="text-[11px] sm:text-xs text-stone-400 mt-0.5">
                ساعة
              </div>
            </div>

            {/* Minutes */}
            <div className="bg-stone-950/80 rounded-xl p-2.5 sm:p-3 border border-pink-900/40 shadow-inner">
              <div className="text-xl sm:text-3xl font-bold font-mono text-pink-200">
                {String(minutes).padStart(2, '0')}
              </div>
              <div className="text-[11px] sm:text-xs text-stone-400 mt-0.5">
                دقيقة
              </div>
            </div>

            {/* Seconds */}
            <div className="bg-stone-950/80 rounded-xl p-2.5 sm:p-3 border border-pink-900/40 shadow-inner relative overflow-hidden">
              <div className="absolute top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-pink-500 animate-ping" />
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
