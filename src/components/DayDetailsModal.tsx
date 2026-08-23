import React, { useState } from 'react';
import { X, Calendar, Sparkles, ShieldAlert, Share2, Check, Clock, Bookmark } from 'lucide-react';
import { HijriMonthData, HistoricalEvent } from '../types';

interface DayDetailsModalProps {
  month: HijriMonthData;
  dayHijri: number;
  onClose: () => void;
}

export const DayDetailsModal: React.FC<DayDetailsModalProps> = ({
  month,
  dayHijri,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);

  const gridItem = month.grid.find((g) => g.hijri === dayHijri);
  if (!gridItem) return null;

  const events: HistoricalEvent[] = month.events.filter((e) => e.day === dayHijri);

  // Check if scorpio relates to this day
  const scorpioMatches = month.scorpioTimings.filter((t) => {
    return (
      t.entryDateGregorian.includes(`${gridItem.gregorianDay} ${gridItem.gregorianMonth}`) ||
      t.exitDateGregorian.includes(`${gridItem.gregorianDay} ${gridItem.gregorianMonth}`)
    );
  });

  const fullHijriDate = `${dayHijri} ${month.nameWithPrefix} ١٤٤٨ هـ`;
  const fullGregorianDate = `${gridItem.dayOfWeek} ${gridItem.gregorianDay} ${gridItem.gregorianMonth} ${
    gridItem.gregorianMonth === 'كانون الثاني' || gridItem.gregorianMonth === 'شباط' || gridItem.gregorianMonth === 'آذار' || gridItem.gregorianMonth === 'نيسان' || gridItem.gregorianMonth === 'أيار' || (gridItem.gregorianMonth === 'حزيران' && month.id === 12)
      ? 2027
      : 2026
  } م`;

  const handleShare = () => {
    let shareText = `تقويم مواقيت الأهلة لعام 1448 هـ\n📅 ${fullHijriDate}\n📆 ${fullGregorianDate}\n`;

    if (events.length > 0) {
      shareText += `\n✨ أهم الوقائع والمناسبات:\n` + events.map((e) => `• ${e.title}: ${e.description} ${e.yearHijriOrPre ? `(${e.yearHijriOrPre})` : ''}`).join('\n');
    }

    if (scorpioMatches.length > 0) {
      shareText += `\n\n🦂 أحوال برج العقرب:\n` + scorpioMatches.map((t) => `• دخول: ${t.entryDay} (${t.entryDateGregorian}) الساعة ${t.entryTime} ${t.entryPeriod}\n• خروج: ${t.exitDay} (${t.exitDateGregorian}) الساعة ${t.exitTime} ${t.exitPeriod}`).join('\n');
    }

    shareText += `\n\n— وفقاً لأفق النجف الأشرف ومكتب سماحة السيد السيستاني (دام ظله)`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getEventTypeBadge = (type: HistoricalEvent['type']) => {
    switch (type) {
      case 'shahadah':
        return { label: 'شهادة / وفاة', bg: 'bg-rose-950/60 text-rose-300 border-rose-800/60' };
      case 'wiladah':
        return { label: 'ولادة مباركة', bg: 'bg-emerald-950/60 text-emerald-300 border-emerald-800/60' };
      case 'eid':
        return { label: 'عيد / مناسبة سعيدة', bg: 'bg-amber-950/60 text-amber-300 border-amber-700/60' };
      case 'ghazwah':
        return { label: 'غزوة / معركة', bg: 'bg-sky-950/60 text-sky-300 border-sky-800/60' };
      default:
        return { label: 'واقعة تاريخية', bg: 'bg-stone-800 text-stone-300 border-stone-700' };
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-stone-900 border border-amber-600/30 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl relative max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-stone-950 via-stone-900 to-stone-950 p-4 border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300 font-bold text-lg">
              {dayHijri}
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-stone-100 font-amiri">
                {fullHijriDate}
              </h3>
              <p className="text-xs text-amber-400 font-tajawal">
                {fullGregorianDate}
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

        {/* Modal Body */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4 flex-1">
          {/* Events Section */}
          <div>
            <h4 className="text-xs font-semibold text-stone-400 mb-2.5 flex items-center gap-1.5 uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>الوقائع التاريخية والمناسبات</span>
            </h4>

            {events.length > 0 ? (
              <div className="space-y-2.5">
                {events.map((ev, index) => {
                  const badge = getEventTypeBadge(ev.type);
                  return (
                    <div
                      key={index}
                      className="p-3.5 rounded-xl bg-stone-950/70 border border-stone-800 hover:border-amber-600/30 transition-all space-y-1.5"
                    >
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <span className="font-bold text-stone-200 font-amiri text-base">
                          {ev.title}
                        </span>
                        <span className={`text-[11px] px-2 py-0.5 rounded-full border ${badge.bg}`}>
                          {badge.label}
                        </span>
                      </div>
                      <p className="text-xs text-stone-300 leading-relaxed">
                        {ev.description}
                      </p>
                      {ev.yearHijriOrPre && (
                        <div className="text-[11px] text-amber-400/80 font-mono">
                          {ev.yearHijriOrPre}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-stone-950/40 border border-stone-800/60 text-center text-xs text-stone-400">
                لا توجد وقائع تاريخية مسجلة في هذا اليوم في الكراس الرسمي.
              </div>
            )}
          </div>

          {/* Moon in Scorpio Alert for this day if applicable */}
          {scorpioMatches.length > 0 && (
            <div className="p-3.5 rounded-xl bg-rose-950/40 border border-rose-600/40 space-y-2">
              <div className="flex items-center gap-2 text-rose-300 font-bold text-xs sm:text-sm">
                <ShieldAlert className="w-4 h-4 text-rose-400" />
                <span>حركة القمر في برج العقرب في هذا اليوم</span>
              </div>
              {scorpioMatches.map((sc, idx) => (
                <div key={idx} className="text-xs text-rose-200/90 leading-relaxed">
                  <p>
                    • <strong>الدخول:</strong> {sc.entryDay} ({sc.entryDateGregorian}) الساعة {sc.entryTime} {sc.entryPeriod}
                  </p>
                  <p>
                    • <strong>الخروج:</strong> {sc.exitDay} ({sc.exitDateGregorian}) الساعة {sc.exitTime} {sc.exitPeriod}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Hadith quote */}
          <div className="p-3 rounded-xl bg-stone-950/40 border border-stone-800/80 text-[11px] text-stone-400 leading-relaxed font-amiri italic">
            عن الإمام جعفر بن محمد الصادق (عليه السلام): «مَن سَافَرَ أَو تَزَوَّجَ وَالقَمَرُ فِي العَقرَبِ لَم يَرَ الحُسنَى».
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-3.5 bg-stone-950 border-t border-stone-800 flex items-center justify-between gap-3">
          <button
            onClick={handleShare}
            className="flex-1 py-2 px-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 active:scale-95 transition-all shadow-md"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-stone-950" />
                <span>تم النسخ بنجاح!</span>
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4 text-stone-950" />
                <span>مشاركة / نسخ تفاصيل اليوم</span>
              </>
            )}
          </button>

          <button
            onClick={onClose}
            className="py-2 px-4 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs sm:text-sm font-medium transition-all"
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
};
