import React from 'react';
import { HijriMonthData, HistoricalEvent } from '../types';
import { WEEKDAYS_NAMES } from '../data/calendarData';
import { Sparkles, AlertTriangle } from 'lucide-react';

interface CalendarGridProps {
  month: HijriMonthData;
  selectedHijriDay: number | null;
  todayHijriDay?: number | null;
  isTodayMonth?: boolean;
  onSelectDay: (hijriDay: number) => void;
}

export const CalendarGrid: React.FC<CalendarGridProps> = ({
  month,
  selectedHijriDay,
  todayHijriDay,
  isTodayMonth,
  onSelectDay,
}) => {
  // Helper to check if a day has events
  const getEventsForDay = (day: number): HistoricalEvent[] => {
    return month.events.filter((e) => e.day === day);
  };

  // Helper to check if date falls in scorpio range
  const isScorpioDay = (hijriDay: number): boolean => {
    const gridItem = month.grid.find((g) => g.hijri === hijriDay);
    if (!gridItem) return false;

    // Check against month's scorpio timings
    return month.scorpioTimings.some((timing) => {
      // Check if grid item matches entry or exit or between
      const gDay = gridItem.gregorianDay;
      const gMonth = gridItem.gregorianMonth;

      // Extract day number from entryDateGregorian (e.g. "24 حزيران 2026 م")
      const entryMatch = timing.entryDateGregorian.match(/(\d+)\s+([^\s]+)/);
      const exitMatch = timing.exitDateGregorian.match(/(\d+)\s+([^\s]+)/);

      if (entryMatch && exitMatch) {
        const entryD = parseInt(entryMatch[1], 10);
        const entryM = entryMatch[2];
        const exitD = parseInt(exitMatch[1], 10);
        const exitM = exitMatch[2];

        if (entryM === exitM && gMonth === entryM) {
          return gDay >= entryD && gDay <= exitD;
        } else if (entryM !== exitM) {
          if (gMonth === entryM && gDay >= entryD) return true;
          if (gMonth === exitM && gDay <= exitD) return true;
        }
      }
      return false;
    });
  };

  // Empty cells padding for first week (startDayOfWeek 0 = Sat, 1 = Sun, etc.)
  const emptyDaysCount = month.startDayOfWeek;
  const emptyCells = Array.from({ length: emptyDaysCount }, (_, i) => i);

  return (
    <div className="glass-card rounded-2xl p-3.5 sm:p-5 border border-amber-500/20 shadow-xl">
      {/* Month Title & Subheading */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-3 mb-3 border-b border-stone-800">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-amber-300 font-amiri flex items-center gap-2">
            <span>تقويم شهر {month.nameWithPrefix}</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
              ١٤٤٨ هـ
            </span>
          </h2>
          <p className="text-xs text-stone-400 font-tajawal mt-0.5">
            الموافق: ({month.gregorianMonthsSpan}) • {month.totalDays} يوماً
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-3 text-[11px] text-stone-400 mt-1 sm:mt-0">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            اليوم الحالي
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-amber-400"></span>
            مناسبة إسلامية
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-rose-400"></span>
            القمر في العقرب
          </span>
        </div>
      </div>

      {/* Weekday Header Matrix */}
      <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-2 text-center">
        {WEEKDAYS_NAMES.map((weekday, idx) => (
          <div
            key={weekday}
            className={`py-1.5 text-xs sm:text-sm font-semibold rounded-lg ${
              idx === 6
                ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-800/40' // الجمعة
                : 'bg-stone-850/80 text-stone-300 border border-stone-800'
            }`}
          >
            {weekday}
          </div>
        ))}
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 gap-1 sm:gap-2">
        {/* Leading empty cells before the 1st of month */}
        {emptyCells.map((_, idx) => (
          <div
            key={`empty-${idx}`}
            className="min-h-[58px] sm:min-h-[70px] rounded-xl bg-stone-950/20 border border-stone-900/40 opacity-30"
          />
        ))}

        {/* Month days */}
        {month.grid.map((cell) => {
          const events = getEventsForDay(cell.hijri);
          const isScorpio = isScorpioDay(cell.hijri);
          const isSelected = selectedHijriDay === cell.hijri;
          const isToday = Boolean(isTodayMonth && todayHijriDay === cell.hijri);
          const isFriday = cell.dayOfWeek === 'الجمعة';

          return (
            <button
              key={cell.hijri}
              onClick={() => onSelectDay(cell.hijri)}
              id={`day-cell-${cell.hijri}`}
              className={`min-h-[58px] sm:min-h-[72px] p-1 sm:p-2 rounded-xl transition-all duration-150 relative flex flex-col justify-between text-right border ${
                isSelected
                  ? 'bg-amber-600/30 border-amber-400 ring-2 ring-amber-400/40 shadow-lg shadow-amber-950/50 scale-[1.03] z-10'
                  : isToday
                  ? 'bg-emerald-950/50 border-emerald-400 ring-2 ring-emerald-500/50 shadow-md shadow-emerald-950/60'
                  : isFriday
                  ? 'bg-emerald-950/20 hover:bg-emerald-900/30 border-emerald-800/30'
                  : 'bg-stone-950/50 hover:bg-stone-800/60 border-stone-800/70'
              }`}
            >
              {/* Top Row in Cell: Hijri number and Event Icons / Today badge */}
              <div className="flex items-start justify-between w-full">
                <div className="flex items-center gap-1">
                  <span
                    className={`text-base sm:text-lg font-bold font-tajawal leading-none ${
                      isSelected
                        ? 'text-amber-300'
                        : isToday
                        ? 'text-emerald-300'
                        : isFriday
                        ? 'text-emerald-300'
                        : 'text-stone-100'
                    }`}
                  >
                    {cell.hijri}
                  </span>
                  {isToday && (
                    <span className="text-[9px] px-1 py-0.2 rounded bg-emerald-500 text-stone-950 font-bold leading-tight">
                      اليوم
                    </span>
                  )}
                </div>

                {/* Badges/Dots */}
                <div className="flex items-center gap-0.5">
                  {events.length > 0 && (
                    <span
                      title={events.map((e) => e.title).join(' • ')}
                      className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-amber-400 shadow-sm shadow-amber-400/50 animate-pulse"
                    />
                  )}
                  {isScorpio && (
                    <span
                      title="القمر في برج العقرب"
                      className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-rose-500 shadow-sm shadow-rose-500/50"
                    />
                  )}
                </div>
              </div>

              {/* Bottom Row in Cell: Gregorian Date */}
              <div className="w-full flex items-center justify-between text-[10px] sm:text-xs text-stone-400">
                <span className="truncate">{cell.gregorianDay}</span>
                <span className="text-[9px] text-stone-500 hidden sm:inline truncate mr-1">
                  {cell.gregorianMonth}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
