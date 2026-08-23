import React from 'react';
import { X, BookOpen, Moon, CheckCircle2, ShieldAlert, Sparkles, HelpCircle } from 'lucide-react';
import { INTRO_TEXT } from '../data/calendarData';

interface IntroModalProps {
  onClose: () => void;
}

export const IntroModal: React.FC<IntroModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-stone-900 border border-amber-600/30 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl relative max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-stone-950 via-stone-900 to-stone-950 p-4 border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-stone-100 font-amiri">
                مقدمة الكراس وبيان المرجعية الدينية
              </h3>
              <p className="text-xs text-stone-400 font-tajawal">
                طريقة العمل والضوابط الفلكية والشرعية
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

        {/* Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1 text-stone-200">
          {/* Quranic Ayah */}
          <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-500/30 text-center space-y-2">
            <div className="font-amiri text-lg sm:text-xl text-amber-300 leading-relaxed font-bold">
              ﴿ {INTRO_TEXT.ayah.text} ﴾
            </div>
            <div className="text-xs text-amber-400/80 font-tajawal">
              {INTRO_TEXT.ayah.surah}
            </div>
          </div>

          {/* Official Statement */}
          <div className="space-y-3 bg-stone-950/60 p-4 rounded-2xl border border-stone-800">
            <h4 className="font-bold text-amber-400 text-sm font-amiri border-b border-stone-800 pb-2">
              بيان مكتب سماحة السيد السيستاني (دام ظله)
            </h4>
            <div className="text-xs sm:text-sm text-stone-300 leading-relaxed whitespace-pre-line font-tajawal">
              {INTRO_TEXT.openingStatement}
            </div>
          </div>

          {/* Methodology */}
          <div className="space-y-3">
            <h4 className="font-bold text-amber-400 text-sm font-amiri flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>طريقة العمل بهذا الكراس الفلكي</span>
            </h4>

            <div className="grid grid-cols-1 gap-2.5">
              {INTRO_TEXT.methodology.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-stone-950/50 border border-stone-800/80 hover:border-amber-500/30 transition-all space-y-1"
                >
                  <div className="flex items-center gap-2 font-bold text-xs sm:text-sm text-amber-300 font-amiri">
                    <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 text-[11px] flex items-center justify-center flex-shrink-0">
                      {idx + 1}
                    </span>
                    <span>{item.title}</span>
                  </div>
                  <p className="text-xs text-stone-300 leading-relaxed pr-7">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3.5 bg-stone-950 border-t border-stone-800 flex justify-end">
          <button
            onClick={onClose}
            className="py-2 px-5 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs sm:text-sm transition-all"
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
};
