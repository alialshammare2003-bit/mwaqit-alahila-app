import React from 'react';
import { Clock, Calendar, Sparkles, ShieldAlert, CheckCircle, ArrowLeft, Moon, Flame } from 'lucide-react';
import { TodayInfo } from '../utils/dateUtils';

interface LiveTodayBannerProps {
  todayInfo: TodayInfo;
  onJumpToToday: () => void;
  onOpenDayDetails: (hijriDay: number) => void;
  isViewingToday: boolean;
}

export const LiveTodayBanner: React.FC<LiveTodayBannerProps> = ({
  todayInfo,
  onJumpToToday,
  onOpenDayDetails,
  isViewingToday,
}) => {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-stone-900 via-stone-900/95 to-amber-950/30 border border-amber-500/30 shadow-2xl p-4 sm:p-5">
      {/* Background ambient lighting */}
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Left Side: Real-Time Clock & Date */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
          {/* Pulsing Live Clock Badge */}
          <div className="flex items-center gap-2.5 bg-stone-950/80 px-3.5 py-2.5 rounded-xl border border-amber-500/30 self-start shadow-inner">
            <div className="relative flex items-center justify-center">
              <span className="w-3 h-3 rounded-full bg-emerald-500 animate-ping absolute" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 relative" />
            </div>
            <div className="flex flex-col">
              <div className="text-[10px] text-stone-400 font-medium flex items-center gap-1">
                <Clock className="w-3 h-3 text-amber-400" />
                <span>الوقت المباشر الآن</span>
              </div>
              <div className="text-base sm:text-lg font-bold font-mono text-amber-300 tracking-wider">
                {todayInfo.timeFormatted}
              </div>
            </div>
          </div>

          {/* Today's Full Date Display */}
          <div className="space-y-0.5">
            <div className="flex items-center gap-1.5 text-xs text-amber-400 font-semibold">
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              <span>اليوم المتزامن في الكراس:</span>
            </div>
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-stone-100 font-amiri tracking-wide">
              {todayInfo.hijriDateFormatted}
            </h2>
            <p className="text-xs text-stone-400 font-tajawal">
              الموافق: {todayInfo.weekdayName} {todayInfo.gregorianDay} {todayInfo.gregorianMonthName} {todayInfo.gregorianYear} م
            </p>
          </div>
        </div>

        {/* Right Side: Status Badges & Quick Action */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 self-stretch md:self-center justify-start md:justify-end border-t md:border-t-0 border-stone-800/80 pt-3 md:pt-0">
          {/* Scorpio Live Status Badge */}
          {todayInfo.isScorpioNow ? (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-950/70 border border-rose-500/40 text-rose-300 text-xs font-medium animate-pulse">
              <ShieldAlert className="w-4 h-4 text-rose-400" />
              <span>القمر في برج العقرب حالياً</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-950/60 border border-stone-800 text-stone-300 text-xs font-medium">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>خارج برج العقرب</span>
            </div>
          )}

          {/* Today's Event Chip if any */}
          {todayInfo.events.length > 0 && todayInfo.hijriDay !== null && (
            <button
              onClick={() => onOpenDayDetails(todayInfo.hijriDay!)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-950/60 hover:bg-amber-900/70 border border-amber-500/40 text-amber-300 text-xs font-medium transition-all active:scale-95 shadow-sm"
              title="عرض تفاصيل مناسبة اليوم"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span className="max-w-[140px] truncate">{todayInfo.events[0].title}</span>
            </button>
          )}

          {/* Jump to Today Button (Visible when user navigated away) */}
          {!isViewingToday && (
            <button
              onClick={onJumpToToday}
              id="btn-jump-today"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 text-stone-950 font-bold text-xs shadow-md shadow-amber-950/50 hover:brightness-110 active:scale-95 transition-all ml-auto md:ml-0"
            >
              <span>الذهاب لليوم الحالي</span>
              <ArrowLeft className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
