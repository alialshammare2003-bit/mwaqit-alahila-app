import React, { useState, useMemo } from 'react';
import { X, Sparkles, Search, Calendar, ChevronLeft, Bookmark } from 'lucide-react';
import { MONTHS_DATA } from '../data/calendarData';
import { HistoricalEvent } from '../types';

interface YearEventsDirectoryProps {
  onClose: () => void;
  onNavigateToDay: (monthId: number, hijriDay: number) => void;
}

export const YearEventsDirectory: React.FC<YearEventsDirectoryProps> = ({
  onClose,
  onNavigateToDay,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterMonth, setFilterMonth] = useState<number | 'all'>('all');

  // Flatten all events across 12 months with their month context
  const allEventsWithMonth = useMemo(() => {
    const list: { event: HistoricalEvent; monthId: number; monthName: string; gregorianText: string }[] = [];
    
    MONTHS_DATA.forEach((month) => {
      month.events.forEach((ev) => {
        const gridItem = month.grid.find((g) => g.hijri === ev.day);
        const gregStr = gridItem ? `${gridItem.dayOfWeek} ${gridItem.gregorianDay} ${gridItem.gregorianMonth}` : '';
        list.push({
          event: ev,
          monthId: month.id,
          monthName: month.name,
          gregorianText: gregStr,
        });
      });
    });
    return list;
  }, []);

  const filteredEvents = useMemo(() => {
    return allEventsWithMonth.filter(({ event, monthId, monthName }) => {
      const matchesSearch =
        event.title.includes(searchQuery) ||
        event.description.includes(searchQuery) ||
        monthName.includes(searchQuery) ||
        (event.yearHijriOrPre && event.yearHijriOrPre.includes(searchQuery));

      const matchesType = filterType === 'all' || event.type === filterType;
      const matchesMonth = filterMonth === 'all' || monthId === filterMonth;

      return matchesSearch && matchesType && matchesMonth;
    });
  }, [allEventsWithMonth, searchQuery, filterType, filterMonth]);

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-stone-900 border border-amber-600/30 rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl relative max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-stone-950 via-stone-900 to-stone-950 p-4 border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-stone-100 font-amiri">
                دليل المناسبات والوقائع الإسلامية لعام ١٤٤٨ هـ
              </h3>
              <p className="text-xs text-stone-400 font-tajawal">
                فهرس شامل لجميع المناسبات والشهادات والولادات والأحداث
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-stone-400 hover:text-white hover:bg-stone-800 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search and Filters Bar */}
        <div className="p-3.5 sm:p-4 bg-stone-950/70 border-b border-stone-800 space-y-3">
          <div className="flex flex-col sm:flex-row gap-2">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-stone-400 absolute right-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="بحث في جميع المناسبات (اسم المعصوم، المعركة، الحدث...)"
                className="w-full bg-stone-900 border border-stone-800 rounded-xl pr-9 pl-3 py-2 text-xs sm:text-sm text-stone-200 placeholder-stone-500 focus:outline-none focus:border-amber-500/50"
              />
            </div>

            {/* Month Filter Select */}
            <select
              value={filterMonth}
              onChange={(e) => setFilterMonth(e.target.value === 'all' ? 'all' : Number(e.target.value))}
              className="bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-xs sm:text-sm text-stone-200 focus:outline-none focus:border-amber-500/50"
            >
              <option value="all">جميع الشهور (١٢)</option>
              {MONTHS_DATA.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.id}. {m.name}
                </option>
              ))}
            </select>
          </div>

          {/* Type Filter Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-0.5 text-xs">
            <button
              onClick={() => setFilterType('all')}
              className={`px-3 py-1 rounded-lg border font-medium transition-all whitespace-nowrap ${
                filterType === 'all'
                  ? 'bg-amber-600 text-stone-950 font-bold border-amber-400 shadow-sm'
                  : 'bg-stone-900 text-stone-400 hover:text-stone-200 border-stone-800'
              }`}
            >
              الكل ({allEventsWithMonth.length})
            </button>
            <button
              onClick={() => setFilterType('shahadah')}
              className={`px-3 py-1 rounded-lg border font-medium transition-all whitespace-nowrap ${
                filterType === 'shahadah'
                  ? 'bg-rose-600 text-white font-bold border-rose-400 shadow-sm'
                  : 'bg-stone-900 text-rose-400 hover:text-rose-200 border-stone-800'
              }`}
            >
              شهادات ووفيات
            </button>
            <button
              onClick={() => setFilterType('wiladah')}
              className={`px-3 py-1 rounded-lg border font-medium transition-all whitespace-nowrap ${
                filterType === 'wiladah'
                  ? 'bg-emerald-600 text-white font-bold border-emerald-400 shadow-sm'
                  : 'bg-stone-900 text-emerald-400 hover:text-emerald-200 border-stone-800'
              }`}
            >
              ولادات ميمونة
            </button>
            <button
              onClick={() => setFilterType('eid')}
              className={`px-3 py-1 rounded-lg border font-medium transition-all whitespace-nowrap ${
                filterType === 'eid'
                  ? 'bg-amber-500 text-stone-950 font-bold border-amber-300 shadow-sm'
                  : 'bg-stone-900 text-amber-400 hover:text-amber-200 border-stone-800'
              }`}
            >
              أعياد ومناسبات
            </button>
            <button
              onClick={() => setFilterType('historical')}
              className={`px-3 py-1 rounded-lg border font-medium transition-all whitespace-nowrap ${
                filterType === 'historical'
                  ? 'bg-stone-600 text-white font-bold border-stone-400 shadow-sm'
                  : 'bg-stone-900 text-stone-300 hover:text-white border-stone-800'
              }`}
            >
              أحداث تاريخية
            </button>
          </div>
        </div>

        {/* Events Results List */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-2.5 flex-1">
          {filteredEvents.length > 0 ? (
            filteredEvents.map(({ event, monthId, monthName, gregorianText }, index) => (
              <div
                key={index}
                onClick={() => {
                  onNavigateToDay(monthId, event.day);
                  onClose();
                }}
                className="p-3.5 rounded-xl bg-stone-950/60 hover:bg-stone-900 border border-stone-800/80 hover:border-amber-500/40 cursor-pointer transition-all duration-200 flex items-start justify-between gap-3 group"
              >
                <div className="flex items-start gap-3 min-w-0 flex-1">
                  {/* Date Badge */}
                  <div className="flex-shrink-0 w-16 text-center p-2 rounded-xl bg-stone-900 group-hover:bg-amber-500/10 border border-stone-800 group-hover:border-amber-500/30 transition-all">
                    <span className="block text-sm font-bold text-amber-300 font-tajawal">
                      {event.day} {monthName}
                    </span>
                    <span className="block text-[10px] text-stone-400 truncate mt-0.5">
                      {gregorianText}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <h4 className="text-sm sm:text-base font-bold text-stone-100 group-hover:text-amber-200 font-amiri transition-colors">
                        {event.title}
                      </h4>
                      <span className={`text-[10px] px-2 py-0.5 rounded-md border ${getBadgeStyle(event.type)}`}>
                        {getTypeName(event.type)}
                      </span>
                    </div>
                    <p className="text-xs text-stone-300 leading-relaxed">
                      {event.description}
                    </p>
                    {event.yearHijriOrPre && (
                      <span className="inline-block mt-1 text-[10px] text-amber-400/90 font-mono">
                        {event.yearHijriOrPre}
                      </span>
                    )}
                  </div>
                </div>

                <ChevronLeft className="w-5 h-5 text-stone-500 group-hover:text-amber-400 transition-colors flex-shrink-0 self-center" />
              </div>
            ))
          ) : (
            <div className="text-center py-10 text-xs text-stone-400 bg-stone-950/30 rounded-xl border border-stone-800/50">
              لم يتم العثور على أي مناسبات مطابقة لمعايير البحث والتصفية.
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3.5 bg-stone-950 border-t border-stone-800 flex justify-end">
          <button
            onClick={onClose}
            className="py-2 px-5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 font-medium text-xs sm:text-sm transition-all"
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
};
