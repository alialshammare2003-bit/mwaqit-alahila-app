import React from 'react';
import { ShieldAlert, Clock, Info, Calendar } from 'lucide-react';
import { ScorpioTiming } from '../types';

interface ScorpioCardProps {
  monthName: string;
  timings: ScorpioTiming[];
}

export const ScorpioCard: React.FC<ScorpioCardProps> = ({ monthName, timings }) => {
  return (
    <div className="glass-card rounded-2xl p-4 sm:p-5 border border-rose-500/20 shadow-xl space-y-3.5">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-stone-800">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-stone-100 font-amiri">
              أوقات دخول القمر برج العقرب في شهر {monthName}
            </h3>
            <p className="text-xs text-stone-400">
              حسابات فلكية دقيقة طبقاً للتقويم الصادر
            </p>
          </div>
        </div>
      </div>

      {/* Hadith Banner */}
      <div className="p-3 rounded-xl bg-stone-950/60 border border-amber-500/20 text-xs text-amber-200/90 font-amiri leading-relaxed">
        <span className="font-bold text-amber-400">روي عن أبي عبد الله الصادق (عليه السلام): </span>
        <span>«مَن سَافَرَ أَو تَزَوَّجَ وَالقَمَرُ فِي العَقرَبِ لَم يَرَ الحُسنَى».</span>
      </div>

      {/* Timings List */}
      <div className="space-y-2.5">
        {timings.map((t, idx) => (
          <div
            key={idx}
            className="p-3.5 rounded-xl bg-stone-950/70 border border-stone-800/80 hover:border-rose-500/30 transition-all space-y-2.5"
          >
            {timings.length > 1 && (
              <div className="text-xs font-bold text-rose-400 border-b border-stone-800 pb-1 flex items-center justify-between">
                <span>الفترة {idx + 1}</span>
                {t.note && <span className="text-[10px] text-stone-400 font-normal">{t.note}</span>}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {/* Entry */}
              <div className="flex items-center gap-2 p-2 rounded-lg bg-stone-900 border border-stone-800">
                <span className="w-2 h-2 rounded-full bg-rose-500 flex-shrink-0 animate-ping" />
                <div>
                  <span className="text-stone-400 block text-[10px]">وقت الدخول:</span>
                  <span className="font-bold text-rose-300">
                    يوم {t.entryDay} ({t.entryDateGregorian})
                  </span>
                  <span className="text-stone-300 mr-1 font-mono">
                    الساعة ({t.entryTime}) {t.entryPeriod}
                  </span>
                </div>
              </div>

              {/* Exit */}
              <div className="flex items-center gap-2 p-2 rounded-lg bg-stone-900 border border-stone-800">
                <span className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0" />
                <div>
                  <span className="text-stone-400 block text-[10px]">وقت الخروج:</span>
                  <span className="font-bold text-emerald-300">
                    يوم {t.exitDay} ({t.exitDateGregorian})
                  </span>
                  <span className="text-stone-300 mr-1 font-mono">
                    الساعة ({t.exitTime}) {t.exitPeriod}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
