import React, { useState } from 'react';
import { Moon, Sunset, Compass, Eye, Sparkles, Clock, AlertCircle, CheckCircle2 } from 'lucide-react';
import { HijriMonthData } from '../types';

interface CrescentCardProps {
  month: HijriMonthData;
}

export const CrescentCard: React.FC<CrescentCardProps> = ({ month }) => {
  // Toggle between primary night and previous night if available
  const [viewMode, setViewMode] = useState<'primary' | 'previous'>('primary');

  const activeObs =
    viewMode === 'previous' && month.crescentPreviousNight
      ? month.crescentPreviousNight
      : month.crescentPrimary;

  const isVisibleByEye = !activeObs.statusText.includes('لا يُتوقع');

  return (
    <div className="glass-card rounded-2xl p-4 sm:p-5 border border-amber-500/20 shadow-xl overflow-hidden relative">
      {/* Decorative top corner flair */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />

      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-800">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Moon className="w-5 h-5 fill-amber-400/20" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-stone-100 font-amiri">
              توقعات رؤية هلال شهر {month.name}
            </h2>
            <p className="text-xs text-stone-400">
              أفق النجف الأشرف • عند غروب الشمس الساعة ({activeObs.sunsetTime})
            </p>
          </div>
        </div>

        {/* Night Selector Toggle if Previous Night Data Exists */}
        {month.crescentPreviousNight && (
          <div className="flex items-center bg-stone-850 p-1 rounded-xl border border-stone-750 self-start sm:self-center">
            <button
              onClick={() => setViewMode('primary')}
              className={`px-2.5 py-1 text-xs rounded-lg transition-all font-medium ${
                viewMode === 'primary'
                  ? 'bg-amber-600 text-stone-950 font-bold shadow-sm'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              الليلة الأولى المتوقعة
            </button>
            <button
              onClick={() => setViewMode('previous')}
              className={`px-2.5 py-1 text-xs rounded-lg transition-all font-medium ${
                viewMode === 'previous'
                  ? 'bg-amber-600 text-stone-950 font-bold shadow-sm'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              الليلة الماضية (29)
            </button>
          </div>
        )}
      </div>

      {/* Target Sighting Date Badge */}
      <div className="mt-3.5 flex items-center justify-between bg-stone-950/60 rounded-xl px-3.5 py-2 border border-stone-800/80">
        <span className="text-xs text-stone-400">تاريخ الرصد:</span>
        <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold">
          <span className="text-amber-300 font-amiri text-sm">{activeObs.dateHijri}</span>
          <span className="text-stone-500">|</span>
          <span className="text-stone-300">{activeObs.dateGregorian}</span>
        </div>
      </div>

      {/* 4 Core Astronomical Parameters Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 mt-3.5">
        {/* 1. Age of Moon */}
        <div className="bg-stone-950/40 rounded-xl p-3 border border-stone-800/60 flex flex-col items-center text-center">
          <div className="flex items-center gap-1 text-stone-400 text-[11px] mb-1">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span>عمر الهلال</span>
          </div>
          <div className="text-base sm:text-lg font-bold text-amber-200">
            {activeObs.ageHours} <span className="text-xs font-normal text-stone-400">ساعة</span>
          </div>
          <div className="text-xs text-stone-400">
            و {activeObs.ageMinutes} <span className="text-[10px]">دقيقة</span>
          </div>
        </div>

        {/* 2. Altitude */}
        <div className="bg-stone-950/40 rounded-xl p-3 border border-stone-800/60 flex flex-col items-center text-center">
          <div className="flex items-center gap-1 text-stone-400 text-[11px] mb-1">
            <Compass className="w-3.5 h-3.5 text-amber-400" />
            <span>الارتفاع عن الأفق</span>
          </div>
          <div className="text-base sm:text-lg font-bold text-amber-200">
            {activeObs.altitudeDegrees}° <span className="text-xs font-normal text-stone-400">درجة</span>
          </div>
          <div className="text-xs text-stone-400">
            و {activeObs.altitudeMinutes} <span className="text-[10px]">دقيقة</span>
          </div>
        </div>

        {/* 3. Duration after sunset */}
        <div className="bg-stone-950/40 rounded-xl p-3 border border-stone-800/60 flex flex-col items-center text-center">
          <div className="flex items-center gap-1 text-stone-400 text-[11px] mb-1">
            <Sunset className="w-3.5 h-3.5 text-amber-400" />
            <span>مدة البقاء بعد الغروب</span>
          </div>
          <div className="text-base sm:text-lg font-bold text-amber-200">
            {activeObs.durationHours !== undefined && activeObs.durationHours > 0 ? (
              <>
                {activeObs.durationHours} <span className="text-xs font-normal text-stone-400">ساعة</span>
              </>
            ) : null}
            <span className={activeObs.durationHours ? " mr-1" : ""}>
              {activeObs.durationMinutes} <span className="text-xs font-normal text-stone-400">دقيقة</span>
            </span>
          </div>
          <div className="text-[10px] text-stone-400">بعد مغيب الشمس</div>
        </div>

        {/* 4. Illuminated Percentage */}
        <div className="bg-stone-950/40 rounded-xl p-3 border border-stone-800/60 flex flex-col items-center text-center">
          <div className="flex items-center gap-1 text-stone-400 text-[11px] mb-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>نسبة القسم المنار</span>
          </div>
          <div className="text-base sm:text-lg font-bold text-emerald-400">
            %{activeObs.illuminatedPercentage.toFixed(2)}
          </div>
          <div className="text-[10px] text-stone-400">من قرص القمر</div>
        </div>
      </div>

      {/* Sighting Expectation Verdict Banner */}
      <div
        className={`mt-3.5 p-3 rounded-xl border flex items-center gap-2.5 ${
          isVisibleByEye
            ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-200'
            : 'bg-rose-950/40 border-rose-500/30 text-rose-200'
        }`}
      >
        {isVisibleByEye ? (
          <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
        ) : (
          <AlertCircle className="w-5 h-5 text-rose-400 flex-shrink-0" />
        )}
        <div className="text-xs sm:text-sm font-medium leading-relaxed font-amiri">
          <span className="font-bold">حالة الرؤية المتوقعة: </span>
          <span>{activeObs.statusText}.</span>
        </div>
      </div>

      {/* Sharia Disclaimer Footnote */}
      <p className="text-[11px] text-stone-400 text-center mt-2.5 italic">
        * بداية الشهور القمرية تعتمد على ثبوت رؤية الهلال شرعاً، وهذه التوقعات فلكية علمية استئناسية.
      </p>
    </div>
  );
};
