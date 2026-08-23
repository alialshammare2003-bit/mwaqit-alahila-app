import React, { useRef, useEffect } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { MONTHS_DATA } from '../data/calendarData';

interface MonthSelectorProps {
  selectedMonthId: number;
  onSelectMonth: (id: number) => void;
}

export const MonthSelector: React.FC<MonthSelectorProps> = ({
  selectedMonthId,
  onSelectMonth,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto scroll active button into center view when changed
  useEffect(() => {
    if (containerRef.current) {
      const activeEl = containerRef.current.querySelector(`[data-month-id="${selectedMonthId}"]`);
      if (activeEl) {
        activeEl.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }
    }
  }, [selectedMonthId]);

  const handlePrev = () => {
    if (selectedMonthId > 1) {
      onSelectMonth(selectedMonthId - 1);
    } else {
      onSelectMonth(12);
    }
  };

  const handleNext = () => {
    if (selectedMonthId < 12) {
      onSelectMonth(selectedMonthId + 1);
    } else {
      onSelectMonth(1);
    }
  };

  return (
    <div className="sticky top-0 z-30 bg-stone-900/95 backdrop-blur-md border-b border-stone-800 py-2.5 px-2 sm:px-4 shadow-md">
      <div className="max-w-4xl mx-auto flex items-center justify-between gap-2">
        {/* Next Month Button (RTL: Chevron Right goes previous, Chevron Left goes next) */}
        <button
          onClick={handlePrev}
          title="الشهر السابق"
          className="p-2 rounded-xl bg-stone-800/80 hover:bg-stone-700 text-stone-300 hover:text-white active:scale-95 transition-all border border-stone-700/50 flex-shrink-0"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Scrollable Month Pills Carousel */}
        <div
          ref={containerRef}
          className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth py-1 px-1 flex-1"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {MONTHS_DATA.map((month) => {
            const isSelected = month.id === selectedMonthId;
            return (
              <button
                key={month.id}
                data-month-id={month.id}
                onClick={() => onSelectMonth(month.id)}
                className={`flex-shrink-0 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 border whitespace-nowrap flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-gradient-to-r from-amber-600 to-amber-500 text-stone-950 font-bold border-amber-400 shadow-md shadow-amber-950/40 scale-105'
                    : 'bg-stone-800/60 hover:bg-stone-800 text-stone-300 hover:text-white border-stone-700/60'
                }`}
              >
                <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${isSelected ? 'bg-stone-950/30 text-stone-950 font-bold' : 'bg-stone-700 text-stone-300'}`}>
                  {month.id}
                </span>
                <span>{month.name}</span>
              </button>
            );
          })}
        </div>

        {/* Previous Month Button */}
        <button
          onClick={handleNext}
          title="الشهر التالي"
          className="p-2 rounded-xl bg-stone-800/80 hover:bg-stone-700 text-stone-300 hover:text-white active:scale-95 transition-all border border-stone-700/50 flex-shrink-0"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
