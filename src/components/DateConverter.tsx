import React, { useState } from 'react';
import { X, Compass, Calendar, ArrowRightLeft, Sparkles, ShieldAlert, ArrowLeft } from 'lucide-react';
import { MONTHS_DATA } from '../data/calendarData';

interface DateConverterProps {
  onClose: () => void;
  onNavigateToDay: (monthId: number, hijriDay: number) => void;
}

export const DateConverter: React.FC<DateConverterProps> = ({
  onClose,
  onNavigateToDay,
}) => {
  const [conversionMode, setConversionMode] = useState<'hijriToGreg' | 'gregToHijri'>('hijriToGreg');

  // Mode 1: Hijri to Gregorian
  const [selectedMonthId, setSelectedMonthId] = useState<number>(1);
  const [selectedHijriDay, setSelectedHijriDay] = useState<number>(1);

  // Mode 2: Gregorian to Hijri
  const [selectedGregMonth, setSelectedGregMonth] = useState<string>('حزيران');
  const [selectedGregDay, setSelectedGregDay] = useState<number>(17);

  const activeMonth = MONTHS_DATA.find((m) => m.id === selectedMonthId) || MONTHS_DATA[0];

  // Lookup result for Hijri -> Gregorian
  const hijriResultGrid = activeMonth.grid.find((g) => g.hijri === selectedHijriDay) || activeMonth.grid[0];
  const hijriResultEvents = activeMonth.events.filter((e) => e.day === selectedHijriDay);

  // Lookup result for Gregorian -> Hijri
  let gregResultMatch: {
    month: (typeof MONTHS_DATA)[0];
    cell: (typeof MONTHS_DATA)[0]['grid'][0];
  } | null = null;

  for (const m of MONTHS_DATA) {
    const found = m.grid.find(
      (g) => g.gregorianMonth === selectedGregMonth && g.gregorianDay === selectedGregDay
    );
    if (found) {
      gregResultMatch = { month: m, cell: found };
      break;
    }
  }

  const allGregMonths = [
    'حزيران',
    'تموز',
    'آب',
    'أيلول',
    'تشرين الأول',
    'تشرين الثاني',
    'كانون الأول',
    'كانون الثاني',
    'شباط',
    'آذار',
    'نيسان',
    'أيار',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-stone-900 border border-cyan-600/30 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl relative max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-stone-950 via-stone-900 to-stone-950 p-4 border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-300">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-stone-100 font-amiri">
                محول وباحث التاريخ (١٤٤٨ هـ ↔ ٢٠٢٦-٢٠٢٧ م)
              </h3>
              <p className="text-xs text-stone-400 font-tajawal">
                مطابقة دقيقة طبقاً لتقويم أفق النجف الأشرف
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

        {/* Mode Switcher */}
        <div className="p-3 bg-stone-950 border-b border-stone-800 flex items-center justify-center gap-2">
          <button
            onClick={() => setConversionMode('hijriToGreg')}
            className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ${
              conversionMode === 'hijriToGreg'
                ? 'bg-cyan-600 text-stone-950 font-bold shadow-sm'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <span>من هجري (١٤٤٨) إلى ميلادي</span>
          </button>
          <button
            onClick={() => setConversionMode('gregToHijri')}
            className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ${
              conversionMode === 'gregToHijri'
                ? 'bg-cyan-600 text-stone-950 font-bold shadow-sm'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <span>من ميلادي إلى هجري (١٤٤٨)</span>
          </button>
        </div>

        {/* Body */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4 flex-1">
          {conversionMode === 'hijriToGreg' ? (
            <div className="space-y-4">
              {/* Selectors */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-stone-400 mb-1">الشهر الهجري:</label>
                  <select
                    value={selectedMonthId}
                    onChange={(e) => {
                      const newMonthId = Number(e.target.value);
                      setSelectedMonthId(newMonthId);
                      const m = MONTHS_DATA.find((item) => item.id === newMonthId);
                      if (m && selectedHijriDay > m.totalDays) {
                        setSelectedHijriDay(m.totalDays);
                      }
                    }}
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-xs sm:text-sm text-stone-200 focus:outline-none focus:border-cyan-500/50"
                  >
                    {MONTHS_DATA.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.id}. {m.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs text-stone-400 mb-1">اليوم الهجري:</label>
                  <select
                    value={selectedHijriDay}
                    onChange={(e) => setSelectedHijriDay(Number(e.target.value))}
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-xs sm:text-sm text-stone-200 focus:outline-none focus:border-cyan-500/50"
                  >
                    {Array.from({ length: activeMonth.totalDays }, (_, i) => i + 1).map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Result Card */}
              {hijriResultGrid && (
                <div className="p-4 rounded-2xl bg-stone-950/80 border border-cyan-500/30 space-y-3">
                  <div className="text-center pb-3 border-b border-stone-800">
                    <span className="text-xs text-cyan-400 font-semibold block mb-1">
                      التاريخ الميلادي المقابل
                    </span>
                    <h4 className="text-lg sm:text-xl font-bold text-stone-100 font-amiri">
                      يوم {hijriResultGrid.dayOfWeek} {hijriResultGrid.gregorianDay} {hijriResultGrid.gregorianMonth}{' '}
                      {hijriResultGrid.gregorianMonth === 'كانون الثاني' ||
                      hijriResultGrid.gregorianMonth === 'شباط' ||
                      hijriResultGrid.gregorianMonth === 'آذار' ||
                      hijriResultGrid.gregorianMonth === 'نيسان' ||
                      hijriResultGrid.gregorianMonth === 'أيار' ||
                      (hijriResultGrid.gregorianMonth === 'حزيران' && activeMonth.id === 12)
                        ? 2027
                        : 2026}{' '}
                      م
                    </h4>
                  </div>

                  {/* Events on that day if any */}
                  {hijriResultEvents.length > 0 && (
                    <div className="space-y-1.5 pt-1">
                      <span className="text-[11px] text-amber-400 font-semibold flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5" />
                        مناسبات هذا اليوم:
                      </span>
                      {hijriResultEvents.map((ev, i) => (
                        <p key={i} className="text-xs text-stone-300 bg-stone-900/60 p-2 rounded-lg border border-stone-800">
                          <strong>{ev.title}:</strong> {ev.description}
                        </p>
                      ))}
                    </div>
                  )}

                  <button
                    onClick={() => {
                      onNavigateToDay(activeMonth.id, selectedHijriDay);
                      onClose();
                    }}
                    className="w-full mt-2 py-2 px-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-stone-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all shadow-md"
                  >
                    <span>الانتقال لتقويم هذا اليوم</span>
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {/* Selectors */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-stone-400 mb-1">الشهر الميلادي:</label>
                  <select
                    value={selectedGregMonth}
                    onChange={(e) => setSelectedGregMonth(e.target.value)}
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-xs sm:text-sm text-stone-200 focus:outline-none focus:border-cyan-500/50"
                  >
                    {allGregMonths.map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs text-stone-400 mb-1">اليوم الميلادي:</label>
                  <select
                    value={selectedGregDay}
                    onChange={(e) => setSelectedGregDay(Number(e.target.value))}
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-xs sm:text-sm text-stone-200 focus:outline-none focus:border-cyan-500/50"
                  >
                    {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Result Card */}
              {gregResultMatch ? (
                <div className="p-4 rounded-2xl bg-stone-950/80 border border-cyan-500/30 space-y-3">
                  <div className="text-center pb-3 border-b border-stone-800">
                    <span className="text-xs text-cyan-400 font-semibold block mb-1">
                      التاريخ الهجري المطابق
                    </span>
                    <h4 className="text-lg sm:text-xl font-bold text-amber-300 font-amiri">
                      {gregResultMatch.cell.dayOfWeek} {gregResultMatch.cell.hijri} {gregResultMatch.month.nameWithPrefix} ١٤٤٨ هـ
                    </h4>
                  </div>

                  <button
                    onClick={() => {
                      if (gregResultMatch) {
                        onNavigateToDay(gregResultMatch.month.id, gregResultMatch.cell.hijri);
                        onClose();
                      }
                    }}
                    className="w-full mt-2 py-2 px-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-stone-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all shadow-md"
                  >
                    <span>الانتقال لتقويم هذا اليوم</span>
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-stone-950/40 border border-stone-800 text-center text-xs text-stone-400">
                  التاريخ المدخل خارج نطاق العام الهجري 1448 هـ (17 حزيران 2026 إلى 5 حزيران 2027).
                </div>
              )}
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
