import React from 'react';
import { X, ShieldAlert, Calendar, Clock, AlertTriangle } from 'lucide-react';
import { MONTHS_DATA } from '../data/calendarData';

interface YearScorpioTableProps {
  onClose: () => void;
  onSelectMonth: (monthId: number) => void;
}

export const YearScorpioTable: React.FC<YearScorpioTableProps> = ({
  onClose,
  onSelectMonth,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-stone-900 border border-rose-600/30 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl relative max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-stone-950 via-stone-900 to-stone-950 p-4 border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-300">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-stone-100 font-amiri">
                جدول دخول القمر برج العقرب لكامل عام ١٤٤٨ هـ
              </h3>
              <p className="text-xs text-stone-400 font-tajawal">
                ( 2026 – 2027 م ) • لجميع شهور السنة الهجرية
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

        {/* Body */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4 flex-1">
          {/* Hadith Notice */}
          <div className="p-3.5 rounded-xl bg-rose-950/30 border border-rose-500/30 text-xs text-rose-200 font-amiri leading-relaxed">
            روي عن أبي عبد الله الصادق (عليه السلام): «مَن سَافَرَ أَو تَزَوَّجَ وَالقَمَرُ فِي العَقرَبِ لَم يَرَ الحُسنَى».
          </div>

          {/* Months List */}
          <div className="space-y-3">
            {MONTHS_DATA.map((m) => (
              <div
                key={m.id}
                className="p-3.5 rounded-xl bg-stone-950/70 border border-stone-800 hover:border-rose-500/40 transition-all space-y-2.5"
              >
                <div className="flex items-center justify-between border-b border-stone-800/80 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-rose-500/20 text-rose-300 text-xs flex items-center justify-center font-bold">
                      {m.id}
                    </span>
                    <span className="font-bold text-sm text-stone-100 font-amiri">
                      شهر {m.nameWithPrefix}
                    </span>
                    <span className="text-[11px] text-stone-400">
                      ({m.gregorianMonthsSpan})
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      onSelectMonth(m.id);
                      onClose();
                    }}
                    className="text-xs text-amber-400 hover:text-amber-300 hover:underline"
                  >
                    عرض تقويم الشهر ←
                  </button>
                </div>

                <div className="space-y-2">
                  {m.scorpioTimings.map((t, idx) => (
                    <div
                      key={idx}
                      className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs p-2 rounded-lg bg-stone-900/90 border border-stone-800"
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-rose-500 flex-shrink-0" />
                        <div>
                          <span className="text-stone-400 block text-[10px]">الدخول:</span>
                          <span className="font-semibold text-rose-300">
                            {t.entryDay} ({t.entryDateGregorian})
                          </span>
                          <span className="text-stone-300 mr-1 font-mono">
                            الساعة {t.entryTime} {t.entryPeriod}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0" />
                        <div>
                          <span className="text-stone-400 block text-[10px]">الخروج:</span>
                          <span className="font-semibold text-emerald-300">
                            {t.exitDay} ({t.exitDateGregorian})
                          </span>
                          <span className="text-stone-300 mr-1 font-mono">
                            الساعة {t.exitTime} {t.exitPeriod}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
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
