import React, { useState } from 'react';
import { HijriMonthData, HistoricalEvent } from '../types';
import { Sparkles, Search, Filter, Calendar } from 'lucide-react';

interface EventsListProps {
  month: HijriMonthData;
  onSelectDay: (hijriDay: number) => void;
}

export const EventsList: React.FC<EventsListProps> = ({ month, onSelectDay }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('all');

  const filteredEvents = month.events.filter((ev) => {
    const matchesSearch =
      ev.title.includes(searchQuery) ||
      ev.description.includes(searchQuery) ||
      (ev.yearHijriOrPre && ev.yearHijriOrPre.includes(searchQuery));

    const matchesType = filterType === 'all' || ev.type === filterType;

    return matchesSearch && matchesType;
  });

  const getBadgeStyle = (type: HistoricalEvent['type']) => {
    switch (type) {
      case 'shahadah':
        return 'bg-rose-950/60 text-rose-300 border-rose-800/60';
      case 'wiladah':
        return 'bg-emerald-950/60 text-emerald-300 border-emerald-800/60';
      case 'eid':
        return 'bg-amber-950/60 text-amber-300 border-amber-700/60';
      case 'ghazwah':
        return 'bg-sky-950/60 text-sky-300 border-sky-800/60';
      default:
        return 'bg-stone-800 text-stone-300 border-stone-700';
    }
  };

  const getTypeName = (type: HistoricalEvent['type']) => {
    switch (type) {
      case 'shahadah':
        return 'شهادة / وفاة';
      case 'wiladah':
        return 'ولادة';
      case 'eid':
        return 'عيد / مناسبة';
      case 'ghazwah':
        return 'غزوة / معركة';
      default:
        return 'حدث تاريخي';
    }
  };

  return (
    <div className="glass-card rounded-2xl p-4 sm:p-5 border border-amber-500/20 shadow-xl space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-stone-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-stone-100 font-amiri">
              أهم الوقائع التاريخية في شهر {month.name}
            </h3>
            <p className="text-xs text-stone-400">
              {month.events.length} وقائع وأحداث مسجلة في هذا الشهر
            </p>
          </div>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-56">
          <Search className="w-4 h-4 text-stone-400 absolute right-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="بحث في الوقائع..."
            className="w-full bg-stone-950/60 border border-stone-800 rounded-xl pr-9 pl-3 py-1.5 text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-amber-500/50"
          />
        </div>
      </div>

      {/* Filter Chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 text-xs">
        <button
          onClick={() => setFilterType('all')}
          className={`px-3 py-1 rounded-lg border font-medium transition-all whitespace-nowrap ${
            filterType === 'all'
              ? 'bg-amber-600 text-stone-950 font-bold border-amber-400 shadow-sm'
              : 'bg-stone-950/40 text-stone-400 hover:text-stone-200 border-stone-800'
          }`}
        >
          الكل ({month.events.length})
        </button>
        <button
          onClick={() => setFilterType('shahadah')}
          className={`px-3 py-1 rounded-lg border font-medium transition-all whitespace-nowrap ${
            filterType === 'shahadah'
              ? 'bg-rose-600 text-white font-bold border-rose-400 shadow-sm'
              : 'bg-stone-950/40 text-rose-400 hover:text-rose-200 border-stone-800'
          }`}
        >
          شهادات ووفيات
        </button>
        <button
          onClick={() => setFilterType('wiladah')}
          className={`px-3 py-1 rounded-lg border font-medium transition-all whitespace-nowrap ${
            filterType === 'wiladah'
              ? 'bg-emerald-600 text-white font-bold border-emerald-400 shadow-sm'
              : 'bg-stone-950/40 text-emerald-400 hover:text-emerald-200 border-stone-800'
          }`}
        >
          ولادات ميمونة
        </button>
        <button
          onClick={() => setFilterType('eid')}
          className={`px-3 py-1 rounded-lg border font-medium transition-all whitespace-nowrap ${
            filterType === 'eid'
              ? 'bg-amber-500 text-stone-950 font-bold border-amber-300 shadow-sm'
              : 'bg-stone-950/40 text-amber-400 hover:text-amber-200 border-stone-800'
          }`}
        >
          أعياد ومناسبات
        </button>
        <button
          onClick={() => setFilterType('historical')}
          className={`px-3 py-1 rounded-lg border font-medium transition-all whitespace-nowrap ${
            filterType === 'historical'
              ? 'bg-stone-600 text-white font-bold border-stone-400 shadow-sm'
              : 'bg-stone-950/40 text-stone-300 hover:text-white border-stone-800'
          }`}
        >
          أحداث تاريخية
        </button>
      </div>

      {/* Events List */}
      <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((ev, idx) => {
            const gridItem = month.grid.find((g) => g.hijri === ev.day);
            return (
              <div
                key={idx}
                onClick={() => onSelectDay(ev.day)}
                className="p-3 rounded-xl bg-stone-950/60 hover:bg-stone-900 border border-stone-800/80 hover:border-amber-500/40 cursor-pointer transition-all duration-200 flex items-start gap-3 group"
              >
                {/* Day Badge */}
                <div className="flex-shrink-0 w-12 text-center p-1.5 rounded-lg bg-stone-900 group-hover:bg-amber-500/10 border border-stone-800 group-hover:border-amber-500/30 transition-all">
                  <span className="block text-sm font-bold text-amber-300 font-tajawal">
                    {ev.day}
                  </span>
                  <span className="block text-[9px] text-stone-400">
                    {month.name}
                  </span>
                  {gridItem && (
                    <span className="block text-[8px] text-stone-500 mt-0.5">
                      {gridItem.gregorianDay} {gridItem.gregorianMonth}
                    </span>
                  )}
                </div>

                {/* Event Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 flex-wrap mb-1">
                    <h4 className="text-sm font-bold text-stone-100 group-hover:text-amber-200 font-amiri transition-colors">
                      {ev.title}
                    </h4>
                    <span className={`text-[10px] px-2 py-0.5 rounded-md border ${getBadgeStyle(ev.type)}`}>
                      {getTypeName(ev.type)}
                    </span>
                  </div>
                  <p className="text-xs text-stone-300 leading-relaxed line-clamp-2">
                    {ev.description}
                  </p>
                  {ev.yearHijriOrPre && (
                    <span className="inline-block mt-1 text-[10px] text-amber-400/90 font-mono">
                      {ev.yearHijriOrPre}
                    </span>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-6 text-xs text-stone-400 bg-stone-950/30 rounded-xl border border-stone-800/50">
            لم يتم العثور على نتائج مطابقة للبحث أو التصفية.
          </div>
        )}
      </div>
    </div>
  );
};
