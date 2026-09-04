import React from 'react';
import { Landmark, Clock, ArrowLeft, Users, CalendarCheck } from 'lucide-react';
import { NextOtherEventInfo } from '../utils/dateUtils';

interface NonInfallibleOtherEventCardProps {
  nextOtherEvent: NextOtherEventInfo | null;
  onNavigateToDay: (monthId: number, hijriDay: number) => void;
  isClosest?: boolean;
}

export const NonInfallibleOtherEventCard: React.FC<NonInfallibleOtherEventCardProps> = ({
  nextOtherEvent,
  onNavigateToDay,
  isClosest = false,
}) => {
  if (!nextOtherEvent) return null;

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
  } = nextOtherEvent;

  return (
    <div
      id="non-infallible-other-event-card"
      className={`relative overflow-hidden rounded-2xl bg-gradient-to-br from-stone-950 via-teal-950/30 to-stone-900 border shadow-2xl p-4 sm:p-5 transition-all ${
        isClosest ? 'border-teal-500/60 ring-1 ring-teal-500/20' : 'border-teal-600/30'
      }`}
    >
      {/* Subtle Teal Background Glow */}
      <div className="absolute top-0 right-1/4 w-64 h-32 bg-teal-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-stone-800/80">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-teal-500/15 border border-teal-500/30 flex items-center justify-center text-teal-400">
            <CalendarCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-base sm:text-lg font-bold text-teal-200 font-amiri">
                العد التنازلي للحدث التاريخي القادم
              </h3>
              {isClosest && (
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold">
                  ★ الأقرب موعداً
                </span>
              )}
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-teal-950/80 text-teal-300 border border-teal-700/50">
                وقائع وأحداث عامة
              </span>
            </div>
            <p className="text-xs text-stone-400 font-tajawal">
              خاص بالوقائع والأحداث التاريخية العامة (عدا الاستشهاد والوفاة والولادة والمولد)
            </p>
          </div>
        </div>

        {/* Quick View in Calendar */}
        <button
          onClick={() => onNavigateToDay(month.id, event.day)}
          className="self-start sm:self-center text-xs text-teal-400 hover:text-teal-300 flex items-center gap-1 hover:underline active:scale-95 transition-all"
        >
          <span>عرض في التقويم</span>
          <ArrowLeft className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Event Details and Target Date */}
      <div className="mt-3.5 flex flex-col md:flex-row md:items-center justify-between gap-3 bg-stone-950/60 p-3.5 rounded-xl border border-stone-800/80">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h4 className="text-base sm:text-lg font-bold text-teal-300 font-amiri">
              {event.title}
            </h4>
            {event.yearHijriOrPre && (
              <span className="text-[10px] px-2 py-0.5 rounded bg-stone-800 text-stone-300 border border-stone-700">
                {event.yearHijriOrPre}
              </span>
            )}
          </div>
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
        <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-teal-950/80 via-stone-900 to-teal-950/80 border border-teal-500/40 text-center space-y-1">
          <div className="text-base sm:text-lg font-bold text-teal-300 font-amiri">
            اليوم تصادف هذه المناسبة التاريخية
          </div>
          <div className="text-xs sm:text-sm text-stone-300">
            اليوم ذكرى: <strong>{event.title}</strong>
          </div>
        </div>
      ) : (
        <div className="mt-4">
          <div className="text-xs text-stone-400 mb-2 flex items-center justify-between">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-teal-400" />
              <span>الوقت المتبقي حتى حلول هذا الحدث:</span>
            </span>
            <span className="text-[11px] text-teal-400 font-mono">
              تحديث حي لحظي
            </span>
          </div>

          <div className="grid grid-cols-4 gap-2 sm:gap-3 text-center">
            {/* Days */}
            <div className="bg-stone-950/80 rounded-xl p-2.5 sm:p-3 border border-teal-900/40 shadow-inner">
              <div className="text-xl sm:text-3xl font-bold font-mono text-teal-200">
                {days}
              </div>
              <div className="text-[11px] sm:text-xs text-stone-400 mt-0.5">
                {days === 1 ? 'يوم' : days === 2 ? 'يومان' : days >= 3 && days <= 10 ? 'أيام' : 'يوماً'}
              </div>
            </div>

            {/* Hours */}
            <div className="bg-stone-950/80 rounded-xl p-2.5 sm:p-3 border border-teal-900/40 shadow-inner">
              <div className="text-xl sm:text-3xl font-bold font-mono text-teal-200">
                {String(hours).padStart(2, '0')}
              </div>
              <div className="text-[11px] sm:text-xs text-stone-400 mt-0.5">
                ساعة
              </div>
            </div>

            {/* Minutes */}
            <div className="bg-stone-950/80 rounded-xl p-2.5 sm:p-3 border border-teal-900/40 shadow-inner">
              <div className="text-xl sm:text-3xl font-bold font-mono text-teal-200">
                {String(minutes).padStart(2, '0')}
              </div>
              <div className="text-[11px] sm:text-xs text-stone-400 mt-0.5">
                دقيقة
              </div>
            </div>

            {/* Seconds */}
            <div className="bg-stone-950/80 rounded-xl p-2.5 sm:p-3 border border-teal-900/40 shadow-inner relative overflow-hidden">
              <div className="absolute top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-teal-500 animate-ping" />
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
