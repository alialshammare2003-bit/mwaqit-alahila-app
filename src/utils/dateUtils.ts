import { MONTHS_DATA } from '../data/calendarData';
import { HijriMonthData, HistoricalEvent, ScorpioTiming } from '../types';

export const ARABIC_MONTH_NAMES = [
  'كانون الثاني',
  'شباط',
  'آذار',
  'نيسان',
  'أيار',
  'حزيران',
  'تموز',
  'آب',
  'أيلول',
  'تشرين الأول',
  'تشرين الثاني',
  'كانون الأول',
];

export const ARABIC_WEEKDAYS = [
  'الأحد',
  'الإثنين',
  'الثلاثاء',
  'الأربعاء',
  'الخميس',
  'الجمعة',
  'السبت',
];

export interface TodayInfo {
  date: Date;
  timeFormatted: string;
  weekdayName: string;
  gregorianDay: number;
  gregorianMonthName: string;
  gregorianYear: number;
  hijriMonth: HijriMonthData | null;
  hijriDay: number | null;
  hijriDateFormatted: string;
  events: HistoricalEvent[];
  isScorpioNow: boolean;
  activeScorpioTiming: ScorpioTiming | null;
  nextScorpioTiming: {
    timing: ScorpioTiming;
    monthName: string;
    isEntry: boolean;
    targetDate: Date;
  } | null;
}

export interface NextShahadahInfo {
  event: HistoricalEvent;
  month: HijriMonthData;
  targetDate: Date;
  hijriDateFormatted: string;
  gregorianDateFormatted: string;
  isToday: boolean;
  diffMs: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export interface NextWiladahInfo {
  event: HistoricalEvent;
  month: HijriMonthData;
  targetDate: Date;
  hijriDateFormatted: string;
  gregorianDateFormatted: string;
  isToday: boolean;
  diffMs: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export interface NextOtherEventInfo {
  event: HistoricalEvent;
  month: HijriMonthData;
  targetDate: Date;
  hijriDateFormatted: string;
  gregorianDateFormatted: string;
  isToday: boolean;
  diffMs: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export type NextMarriageInfo = NextOtherEventInfo;

// Convert Scorpio date text like "24 حزيران 2026 م" and time "9:44" and period "صباحاً" to Date
export function parseScorpioTimestamp(
  dateStr: string,
  timeStr: string,
  period: string
): Date | null {
  try {
    const parts = dateStr.match(/(\d+)\s+([^\s]+)\s+(\d+)/);
    if (!parts) return null;

    const day = parseInt(parts[1], 10);
    const monthName = parts[2];
    const year = parseInt(parts[3], 10);

    const monthIndex = ARABIC_MONTH_NAMES.indexOf(monthName);
    if (monthIndex === -1) return null;

    const timeParts = timeStr.split(':');
    let hours = parseInt(timeParts[0], 10);
    const minutes = parseInt(timeParts[1], 10);

    if (period.includes('مساء') && hours < 12) {
      hours += 12;
    } else if (period.includes('منتصف الليل') && hours === 12) {
      hours = 0;
    } else if (period.includes('صباح') && hours === 12) {
      hours = 0;
    }

    return new Date(year, monthIndex, day, hours, minutes, 0);
  } catch (e) {
    return null;
  }
}

export function isFourteenInfalliblesShahadah(ev: HistoricalEvent): boolean {
  if (ev.isFourteenInfallibles && ev.type === 'shahadah') return true;
  if (ev.type !== 'shahadah') return false;
  const t = (ev.title + ' ' + (ev.description || '')).toLowerCase();
  const infalliblesPatterns = [
    /النبي\s*الأعظم|رحلة\s*النبي|وفاة\s*خاتم\s*الأنبياء|محمد\s*\(ص/i,
    /الإمام\s*علي|أمير\s*المؤمنين\s*علي|علي\s*بن\s*أبي\s*طالب/i,
    /الزهراء|فاطمة\s*الزهراء/i,
    /الحسن\s*المجتبى|الحسن\s*بن\s*علي/i,
    /الحسين|عاشوراء|سيد\s*الشهداء/i,
    /علي\s*بن\s*الحسين|السجاد|زين\s*العابدين/i,
    /محمد\s*بن\s*علي\s*الباقر|الباقر/i,
    /جعفر\s*بن\s*محمد|الصادق/i,
    /موسى\s*بن\s*جعفر|الكاظم/i,
    /علي\s*بن\s*موسى|الرضا/i,
    /محمد\s*بن\s*علي\s*الجواد|الجواد/i,
    /علي\s*بن\s*محمد\s*الهادي|الهادي/i,
    /الحسن\s*العسكري|العسكري/i
  ];
  return infalliblesPatterns.some((p) => p.test(t));
}

export function isFourteenInfalliblesWiladah(ev: HistoricalEvent): boolean {
  if (ev.isFourteenInfallibles && ev.type === 'wiladah') return true;
  if (ev.type !== 'wiladah' && ev.type !== 'eid') return false;
  const t = (ev.title + ' ' + (ev.description || '')).toLowerCase();
  // Exclude non-14 infallible personalities
  if (
    t.includes('العباس') ||
    t.includes('زينب') ||
    t.includes('المعصومة') ||
    t.includes('الأكبر') ||
    t.includes('القاسم') ||
    t.includes('خديجة') ||
    t.includes('فطر') ||
    t.includes('أضحى') ||
    t.includes('غدير') ||
    t.includes('مباهلة') ||
    t.includes('دحو')
  ) {
    if (!t.includes('المهدي') && !t.includes('الحسين') && !t.includes('الحسن') && !t.includes('الزهراء') && !t.includes('الصادق') && !t.includes('الباقر') && !t.includes('الرضا') && !t.includes('الجواد') && !t.includes('الهادي') && !t.includes('العسكري') && !t.includes('السجاد') && !t.includes('الكاظم') && !t.includes('المولد النبوي')) {
      return false;
    }
  }
  const infalliblesPatterns = [
    /النبي|المولد\s*النبوي|ميلاد\s*النبي/i,
    /أمير\s*المؤمنين|علي\s*بن\s*أبي\s*طالب/i,
    /الزهراء|فاطمة\s*الزهراء/i,
    /الحسن\s*المجتبى|الحسن\s*بن\s*علي/i,
    /الإمام\s*الحسين/i,
    /علي\s*بن\s*الحسين|السجاد|زين\s*العابدين/i,
    /محمد\s*بن\s*علي\s*الباقر|الباقر/i,
    /جعفر\s*بن\s*محمد|الصادق/i,
    /موسى\s*بن\s*جعفر|الكاظم/i,
    /علي\s*بن\s*موسى|الرضا/i,
    /محمد\s*بن\s*علي\s*الجواد|الجواد/i,
    /علي\s*بن\s*محمد\s*الهادي|الهادي/i,
    /الحسن\s*العسكري|العسكري/i,
    /المهدي|الحجة\s*بن\s*الحسن|النصف\s*من\s*شعبان/i
  ];
  return infalliblesPatterns.some((p) => p.test(t));
}

export function isNonInfallibleShahadahOrWafat(ev: HistoricalEvent): boolean {
  if (isFourteenInfalliblesShahadah(ev) || isFourteenInfalliblesWiladah(ev)) return false;
  if (ev.isFourteenInfallibles) return false;

  const t = (ev.title + ' ' + (ev.description || '')).toLowerCase();

  // Exclude general non-death historical events
  if (
    t.includes('تفجير') ||
    t.includes('يوم البقيع') ||
    t.includes('حصار شعب') ||
    t.includes('واقعة صفين') ||
    t.includes('واقعة الجمل') ||
    t.includes('واقعة النهروان') ||
    t.includes('واقعة الحرة') ||
    t.includes('صلح الإمام') ||
    t.includes('رد الشمس') ||
    t.includes('تحويل القبلة') ||
    t.includes('إحراق الكعبة') ||
    t.includes('رمي الكعبة') ||
    t.includes('فتح البصرة') ||
    t.includes('فتح مكة') ||
    t.includes('ليلة المبيت') ||
    t.includes('ورود كربلاء') ||
    t.includes('ورود عمر بن سعد') ||
    t.includes('دخول سبايا') ||
    t.includes('دفن شهداء') ||
    t.includes('خروج السبايا') ||
    t.includes('وصول أمير المؤمنين') ||
    t.includes('إحضار الإمام') ||
    t.includes('تجديد بناء الكعبة') ||
    t.includes('رسالة مسلم') ||
    t.includes('نزول سورة') ||
    t.includes('سجن الإمام') ||
    t.includes('بيعة الإمام') ||
    t.includes('خروج النبي') ||
    t.includes('خروج الحسين') ||
    t.includes('خروج مسلم') ||
    t.includes('تولي الإمام')
  ) {
    if (
      !t.includes('جعفر الطيار') &&
      !t.includes('حمزة') &&
      !t.includes('مسلم بن عقيل') &&
      !t.includes('هاني بن عروة') &&
      !t.includes('زيد بن صوحان') &&
      !t.includes('عمار بن ياسر') &&
      !t.includes('سعيد بن جبير') &&
      !t.includes('ميثم التمار') &&
      !t.includes('طفلي مسلم')
    ) {
      return false;
    }
  }

  const deathKeywords = /وفاة|شهادة|استشهاد|مقتل|رحيل|قتل\s*على\s*يد/i;
  if (!deathKeywords.test(t) && ev.type !== 'shahadah') {
    return false;
  }

  const nonInfalliblePatterns = [
    /أم\s*البنين/i,
    /خديجة|أم\s*المؤمنين\s*خديجة/i,
    /مسلم\s*بن\s*عقيل|هانئ\s*بن\s*عروة|هاني\s*بن\s*عروة/i,
    /حمزة\s*بن\s*عبد\s*المطلب|حمزة/i,
    /جعفر\s*الطيار|جعفر\s*بن\s*أبي\s*طالب|زيد\s*بن\s*حارثة/i,
    /ميثم\s*التمار/i,
    /زيد\s*بن\s*علي/i,
    /رقية|السيدة\s*رقية/i,
    /سكينة|السيدة\s*سكينة/i,
    /أم\s*كلثوم/i,
    /أبي\s*طالب|أبو\s*طالب/i,
    /عبد\s*المطلب/i,
    /سلمان\s*الفارسي|سلمان\s*المحمدي/i,
    /عمار\s*بن\s*ياسر/i,
    /محمد\s*بن\s*أبي\s*بكر/i,
    /سعيد\s*بن\s*جبير/i,
    /علي\s*الخير|علي\s*بن\s*الحسن\s*المثلث/i,
    /حذيفة\s*بن\s*اليمان/i,
    /علي\s*العريضي|علي\s*بن\s*جعفر/i,
    /طفلي\s*مسلم/i,
    /القاسم\s*بن\s*الكاظم/i,
    /سبع\s*الدجيل|محمد\s*بن\s*علي\s*الهادي/i,
    /عبد\s*العظيم\s*الحسني/i,
    /عثمان\s*بن\s*سعيد/i,
    /محمد\s*بن\s*عثمان/i,
    /الحسين\s*بن\s*روح/i,
    /علي\s*بن\s*محمد\s*السمري|السمري/i,
    /إبراهيم\s*بن\s*الرسول/i,
    /زيد\s*بن\s*صوحان/i,
    /المختار\s*الثقفي/i,
    /الشريف\s*الرضي/i,
    /السيدة\s*المعصومة|فاطمة\s*المعصومة/i
  ];

  return nonInfalliblePatterns.some((p) => p.test(t)) || (ev.type === 'shahadah' && !isFourteenInfalliblesShahadah(ev));
}

export function isNonInfallibleWiladah(ev: HistoricalEvent): boolean {
  if (isFourteenInfalliblesWiladah(ev) || isFourteenInfalliblesShahadah(ev)) return false;
  if (ev.isFourteenInfallibles) return false;

  const t = (ev.title + ' ' + (ev.description || '')).toLowerCase();

  if (
    t.includes('فطر') ||
    t.includes('أضحى') ||
    t.includes('غدير') ||
    t.includes('مباهلة') ||
    t.includes('مبعث') ||
    t.includes('دحو') ||
    t.includes('رأس السنة') ||
    t.includes('زواج')
  ) {
    if (!t.includes('زينب') && !t.includes('العباس') && !t.includes('الأكبر') && !t.includes('المعصومة') && !t.includes('القاسم')) {
      return false;
    }
  }

  const nonInfallibleWiladahPatterns = [
    /السيدة\s*زينب|زينب\s*الكبرى|زينب\s*الحوراء/i,
    /أبي\s*الفضل\s*العباس|العباس\s*بن\s*علي|قمر\s*بني\s*هاشم/i,
    /علي\s*الأكبر|علي\s*بن\s*الحسين\s*الأكبر/i,
    /فاطمة\s*المعصومة|السيدة\s*المعصومة|المعصومة/i,
    /علي\s*الأصغر/i,
    /القاسم\s*بن\s*الحسن/i,
    /سكينة/i,
    /رقية/i
  ];

  const hasWiladahKeyword = /ولادة|مولد|ميلاد/i.test(t) || ev.type === 'wiladah';
  return hasWiladahKeyword && nonInfallibleWiladahPatterns.some((p) => p.test(t));
}

export type DayAtmosphere =
  | 'royal-gold'
  | 'emerald'
  | 'turquoise'
  | 'shahadah'
  | 'wafat'
  | 'celebration'
  | 'sapphire-violet'
  | 'normal';

export function isShahadahEvent(ev: HistoricalEvent): boolean {
  const t = (ev.title + ' ' + (ev.description || '')).toLowerCase();
  return (
    ev.type === 'shahadah' ||
    t.includes('استشهاد') ||
    t.includes('شهادة') ||
    t.includes('مقتل') ||
    t.includes('قتل') ||
    t.includes('استشهد') ||
    t.includes('سم ') ||
    t.includes('مسموم')
  );
}

export function isWafatEvent(ev: HistoricalEvent): boolean {
  const t = (ev.title + ' ' + (ev.description || '')).toLowerCase();
  if (isShahadahEvent(ev)) return false;
  return (
    t.includes('وفاة') ||
    t.includes('توفي') ||
    t.includes('ارتحال') ||
    t.includes('رحيل') ||
    t.includes('انتقال')
  );
}

export function isCelebrationEvent(ev: HistoricalEvent): boolean {
  const t = (ev.title + ' ' + (ev.description || '')).toLowerCase();
  return (
    ev.type === 'wiladah' ||
    ev.type === 'eid' ||
    t.includes('ولادة') ||
    t.includes('مولد') ||
    t.includes('ميلاد') ||
    t.includes('زواج') ||
    t.includes('عقد قران') ||
    t.includes('قران') ||
    t.includes('عيد') ||
    t.includes('تتويج') ||
    t.includes('فرحة') ||
    t.includes('مباهلة') ||
    t.includes('غدير') ||
    t.includes('مبعث')
  );
}

export function getDayAtmosphere(events: HistoricalEvent[] = []): DayAtmosphere {
  if (!events || events.length === 0) return 'royal-gold';
  if (events.some(isShahadahEvent)) return 'shahadah';
  if (events.some(isWafatEvent)) return 'wafat';
  if (events.some(isCelebrationEvent)) return 'celebration';
  return 'royal-gold';
}

export function isShahadahOrWafatEvent(ev: HistoricalEvent): boolean {
  if (ev.type === 'shahadah') return true;
  const t = (ev.title + ' ' + (ev.description || '')).toLowerCase();
  const deathKeywords = /شهادة|استشهاد|مقتل|قتل|استشهد|سم |مسموم|وفاة|توفي|ارتحال|رحيل|انتقال/i;
  return deathKeywords.test(t);
}

export function isWiladahOrMawlidEvent(ev: HistoricalEvent): boolean {
  if (ev.type === 'wiladah') return true;
  const t = (ev.title + ' ' + (ev.description || '')).toLowerCase();
  const birthKeywords = /ولادة|مولد|ميلاد/i;
  return birthKeywords.test(t);
}

export function isOtherEvent(ev: HistoricalEvent): boolean {
  return !isShahadahOrWafatEvent(ev) && !isWiladahOrMawlidEvent(ev);
}

export function isFourteenInfalliblesOtherEvent(ev: HistoricalEvent): boolean {
  if (!isOtherEvent(ev)) return false;
  if (ev.isFourteenInfallibles) return true;
  const t = (ev.title + ' ' + (ev.description || '')).toLowerCase();
  const patterns = [
    /النبي|الرسول|خاتم\s*الأنبياء|المصطفى/i,
    /أمير\s*المؤمنين|علي\s*بن\s*أبي\s*طالب/i,
    /الزهراء|فاطمة/i,
    /الحسن\s*المجتبى|الحسن\s*بن\s*علي|الإمام\s*الحسن/i,
    /الإمام\s*الحسين|الحسين\s*\(ع\)|سبايا\s*أهل\s*البيت|ورود\s*كربلاء/i,
    /السجاد|زين\s*العابدين|علي\s*بن\s*الحسين/i,
    /الباقر|محمد\s*بن\s*علي/i,
    /الصادق|جعفر\s*بن\s*محمد/i,
    /الكاظم|موسى\s*بن\s*جعفر/i,
    /الرضا|علي\s*بن\s*موسى/i,
    /الجواد|محمد\s*بن\s*علي/i,
    /الهادي|علي\s*بن\s*محمد/i,
    /العسكري|الحسن\s*بن\s*علي/i,
    /المهدي|الحجة|صاحب\s*الزمان/i,
    /الغدير|المباهلة|المبعث|ليلة\s*المبيت|رد\s*الشمس|فدك|هل\s*أتى|الأربعين|ليلة\s*القدر|عيد\s*الفطر|عيد\s*الأضحى|دحو\s*الأرض|زواج\s*النورين|حجة\s*الوداع|المؤاخاة|معراج\s*النبي/i
  ];
  return patterns.some((p) => p.test(t));
}

export function isNonInfallibleOtherEvent(ev: HistoricalEvent): boolean {
  if (!isOtherEvent(ev)) return false;
  return !isFourteenInfalliblesOtherEvent(ev);
}

export function isFourteenInfalliblesMarriage(ev: HistoricalEvent): boolean {
  return isFourteenInfalliblesOtherEvent(ev);
}

export function isNonInfallibleMarriage(ev: HistoricalEvent): boolean {
  return isNonInfallibleOtherEvent(ev);
}

export function getNextShahadah(now: Date = new Date()): NextShahadahInfo | null {
  const currentTimestamp = now.getTime();
  let nextMatch: {
    event: HistoricalEvent;
    month: HijriMonthData;
    targetDate: Date;
    hijriDateFormatted: string;
    gregorianDateFormatted: string;
    isToday: boolean;
    diffMs: number;
  } | null = null;

  for (const m of MONTHS_DATA) {
    const shahadahEvents = m.events.filter((e) => isFourteenInfalliblesShahadah(e));

    for (const ev of shahadahEvents) {
      const gridItem = m.grid.find((g) => g.hijri === ev.day);
      if (!gridItem) continue;

      const gMonthIdx = ARABIC_MONTH_NAMES.indexOf(gridItem.gregorianMonth);
      if (gMonthIdx === -1) continue;

      // Determine correct Gregorian year
      const is2027 =
        gridItem.gregorianMonth === 'كانون الثاني' ||
        gridItem.gregorianMonth === 'شباط' ||
        gridItem.gregorianMonth === 'آذار' ||
        gridItem.gregorianMonth === 'نيسان' ||
        gridItem.gregorianMonth === 'أيار' ||
        (gridItem.gregorianMonth === 'حزيران' && m.id === 12);
      const gYear = is2027 ? 2027 : 2026;

      const targetDate = new Date(gYear, gMonthIdx, gridItem.gregorianDay, 0, 0, 0);
      const endOfDay = new Date(gYear, gMonthIdx, gridItem.gregorianDay, 23, 59, 59).getTime();

      // If the day hasn't passed yet
      if (endOfDay >= currentTimestamp) {
        const diffMs = targetDate.getTime() - currentTimestamp;
        const isToday = currentTimestamp >= targetDate.getTime() && currentTimestamp <= endOfDay;

        if (!nextMatch || targetDate.getTime() < nextMatch.targetDate.getTime()) {
          nextMatch = {
            event: ev,
            month: m,
            targetDate,
            hijriDateFormatted: `${gridItem.dayOfWeek} ${ev.day} ${m.nameWithPrefix} ١٤٤٨ هـ`,
            gregorianDateFormatted: `${gridItem.gregorianDay} ${gridItem.gregorianMonth} ${gYear} م`,
            isToday,
            diffMs: Math.max(0, diffMs),
          };
        }
      }
    }
  }

  // If reached end of year, pick the first 14 Infallibles shahadah in 1448
  if (!nextMatch && MONTHS_DATA.length > 0) {
    for (const m of MONTHS_DATA) {
      const firstShahadah = m.events.find((e) => isFourteenInfalliblesShahadah(e));
      if (firstShahadah) {
        const gridItem = m.grid.find((g) => g.hijri === firstShahadah.day);
        if (gridItem) {
          const gMonthIdx = ARABIC_MONTH_NAMES.indexOf(gridItem.gregorianMonth);
          const targetDate = new Date(2026, gMonthIdx, gridItem.gregorianDay, 0, 0, 0);
          const diffMs = targetDate.getTime() - currentTimestamp;
          nextMatch = {
            event: firstShahadah,
            month: m,
            targetDate,
            hijriDateFormatted: `${gridItem.dayOfWeek} ${firstShahadah.day} ${m.nameWithPrefix} ١٤٤٨ هـ`,
            gregorianDateFormatted: `${gridItem.gregorianDay} ${gridItem.gregorianMonth} 2026 م`,
            isToday: false,
            diffMs: Math.max(0, diffMs),
          };
          break;
        }
      }
    }
  }

  if (!nextMatch) return null;

  const totalSeconds = Math.floor(nextMatch.diffMs / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return {
    ...nextMatch,
    days,
    hours,
    minutes,
    seconds,
  };
}

export function getNextWiladah(now: Date = new Date()): NextWiladahInfo | null {
  const currentTimestamp = now.getTime();
  let nextMatch: {
    event: HistoricalEvent;
    month: HijriMonthData;
    targetDate: Date;
    hijriDateFormatted: string;
    gregorianDateFormatted: string;
    isToday: boolean;
    diffMs: number;
  } | null = null;

  for (const m of MONTHS_DATA) {
    const wiladahEvents = m.events.filter((e) => isFourteenInfalliblesWiladah(e));

    for (const ev of wiladahEvents) {
      const gridItem = m.grid.find((g) => g.hijri === ev.day);
      if (!gridItem) continue;

      const gMonthIdx = ARABIC_MONTH_NAMES.indexOf(gridItem.gregorianMonth);
      if (gMonthIdx === -1) continue;

      // Determine correct Gregorian year
      const is2027 =
        gridItem.gregorianMonth === 'كانون الثاني' ||
        gridItem.gregorianMonth === 'شباط' ||
        gridItem.gregorianMonth === 'آذار' ||
        gridItem.gregorianMonth === 'نيسان' ||
        gridItem.gregorianMonth === 'أيار' ||
        (gridItem.gregorianMonth === 'حزيران' && m.id === 12);
      const gYear = is2027 ? 2027 : 2026;

      const targetDate = new Date(gYear, gMonthIdx, gridItem.gregorianDay, 0, 0, 0);
      const endOfDay = new Date(gYear, gMonthIdx, gridItem.gregorianDay, 23, 59, 59).getTime();

      // If the day hasn't passed yet
      if (endOfDay >= currentTimestamp) {
        const diffMs = targetDate.getTime() - currentTimestamp;
        const isToday = currentTimestamp >= targetDate.getTime() && currentTimestamp <= endOfDay;

        if (!nextMatch || targetDate.getTime() < nextMatch.targetDate.getTime()) {
          nextMatch = {
            event: ev,
            month: m,
            targetDate,
            hijriDateFormatted: `${gridItem.dayOfWeek} ${ev.day} ${m.nameWithPrefix} ١٤٤٨ هـ`,
            gregorianDateFormatted: `${gridItem.gregorianDay} ${gridItem.gregorianMonth} ${gYear} م`,
            isToday,
            diffMs: Math.max(0, diffMs),
          };
        }
      }
    }
  }

  // If reached end of year, pick the first 14 Infallibles wiladah in 1448
  if (!nextMatch && MONTHS_DATA.length > 0) {
    for (const m of MONTHS_DATA) {
      const firstWiladah = m.events.find((e) => isFourteenInfalliblesWiladah(e));
      if (firstWiladah) {
        const gridItem = m.grid.find((g) => g.hijri === firstWiladah.day);
        if (gridItem) {
          const gMonthIdx = ARABIC_MONTH_NAMES.indexOf(gridItem.gregorianMonth);
          const targetDate = new Date(2026, gMonthIdx, gridItem.gregorianDay, 0, 0, 0);
          const diffMs = targetDate.getTime() - currentTimestamp;
          nextMatch = {
            event: firstWiladah,
            month: m,
            targetDate,
            hijriDateFormatted: `${gridItem.dayOfWeek} ${firstWiladah.day} ${m.nameWithPrefix} ١٤٤٨ هـ`,
            gregorianDateFormatted: `${gridItem.gregorianDay} ${gridItem.gregorianMonth} 2026 م`,
            isToday: false,
            diffMs: Math.max(0, diffMs),
          };
          break;
        }
      }
    }
  }

  if (!nextMatch) return null;

  const totalSeconds = Math.floor(nextMatch.diffMs / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return {
    ...nextMatch,
    days,
    hours,
    minutes,
    seconds,
  };
}

export function getNextNonInfallibleShahadah(now: Date = new Date()): NextShahadahInfo | null {
  const currentTimestamp = now.getTime();
  let nextMatch: {
    event: HistoricalEvent;
    month: HijriMonthData;
    targetDate: Date;
    hijriDateFormatted: string;
    gregorianDateFormatted: string;
    isToday: boolean;
    diffMs: number;
  } | null = null;

  for (const m of MONTHS_DATA) {
    const events = m.events.filter((e) => isNonInfallibleShahadahOrWafat(e));

    for (const ev of events) {
      const gridItem = m.grid.find((g) => g.hijri === ev.day);
      if (!gridItem) continue;

      const gMonthIdx = ARABIC_MONTH_NAMES.indexOf(gridItem.gregorianMonth);
      if (gMonthIdx === -1) continue;

      const is2027 =
        gridItem.gregorianMonth === 'كانون الثاني' ||
        gridItem.gregorianMonth === 'شباط' ||
        gridItem.gregorianMonth === 'آذار' ||
        gridItem.gregorianMonth === 'نيسان' ||
        gridItem.gregorianMonth === 'أيار' ||
        (gridItem.gregorianMonth === 'حزيران' && m.id === 12);
      const gYear = is2027 ? 2027 : 2026;

      const targetDate = new Date(gYear, gMonthIdx, gridItem.gregorianDay, 0, 0, 0);
      const endOfDay = new Date(gYear, gMonthIdx, gridItem.gregorianDay, 23, 59, 59).getTime();

      if (endOfDay >= currentTimestamp) {
        const diffMs = targetDate.getTime() - currentTimestamp;
        const isToday = currentTimestamp >= targetDate.getTime() && currentTimestamp <= endOfDay;

        if (!nextMatch || targetDate.getTime() < nextMatch.targetDate.getTime()) {
          nextMatch = {
            event: ev,
            month: m,
            targetDate,
            hijriDateFormatted: `${gridItem.dayOfWeek} ${ev.day} ${m.nameWithPrefix} ١٤٤٨ هـ`,
            gregorianDateFormatted: `${gridItem.gregorianDay} ${gridItem.gregorianMonth} ${gYear} م`,
            isToday,
            diffMs: Math.max(0, diffMs),
          };
        }
      }
    }
  }

  // Fallback rollover to next cycle if passed all year
  if (!nextMatch && MONTHS_DATA.length > 0) {
    for (const m of MONTHS_DATA) {
      const firstEv = m.events.find((e) => isNonInfallibleShahadahOrWafat(e));
      if (firstEv) {
        const gridItem = m.grid.find((g) => g.hijri === firstEv.day);
        if (gridItem) {
          const gMonthIdx = ARABIC_MONTH_NAMES.indexOf(gridItem.gregorianMonth);
          const targetDate = new Date(2026, gMonthIdx, gridItem.gregorianDay, 0, 0, 0);
          const diffMs = targetDate.getTime() - currentTimestamp;
          nextMatch = {
            event: firstEv,
            month: m,
            targetDate,
            hijriDateFormatted: `${gridItem.dayOfWeek} ${firstEv.day} ${m.nameWithPrefix} ١٤٤٨ هـ`,
            gregorianDateFormatted: `${gridItem.gregorianDay} ${gridItem.gregorianMonth} 2026 م`,
            isToday: false,
            diffMs: Math.max(0, diffMs),
          };
          break;
        }
      }
    }
  }

  if (!nextMatch) return null;

  const totalSeconds = Math.floor(nextMatch.diffMs / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return {
    ...nextMatch,
    days,
    hours,
    minutes,
    seconds,
  };
}

export function getNextNonInfallibleWiladah(now: Date = new Date()): NextWiladahInfo | null {
  const currentTimestamp = now.getTime();
  let nextMatch: {
    event: HistoricalEvent;
    month: HijriMonthData;
    targetDate: Date;
    hijriDateFormatted: string;
    gregorianDateFormatted: string;
    isToday: boolean;
    diffMs: number;
  } | null = null;

  for (const m of MONTHS_DATA) {
    const events = m.events.filter((e) => isNonInfallibleWiladah(e));

    for (const ev of events) {
      const gridItem = m.grid.find((g) => g.hijri === ev.day);
      if (!gridItem) continue;

      const gMonthIdx = ARABIC_MONTH_NAMES.indexOf(gridItem.gregorianMonth);
      if (gMonthIdx === -1) continue;

      const is2027 =
        gridItem.gregorianMonth === 'كانون الثاني' ||
        gridItem.gregorianMonth === 'شباط' ||
        gridItem.gregorianMonth === 'آذار' ||
        gridItem.gregorianMonth === 'نيسان' ||
        gridItem.gregorianMonth === 'أيار' ||
        (gridItem.gregorianMonth === 'حزيران' && m.id === 12);
      const gYear = is2027 ? 2027 : 2026;

      const targetDate = new Date(gYear, gMonthIdx, gridItem.gregorianDay, 0, 0, 0);
      const endOfDay = new Date(gYear, gMonthIdx, gridItem.gregorianDay, 23, 59, 59).getTime();

      if (endOfDay >= currentTimestamp) {
        const diffMs = targetDate.getTime() - currentTimestamp;
        const isToday = currentTimestamp >= targetDate.getTime() && currentTimestamp <= endOfDay;

        if (!nextMatch || targetDate.getTime() < nextMatch.targetDate.getTime()) {
          nextMatch = {
            event: ev,
            month: m,
            targetDate,
            hijriDateFormatted: `${gridItem.dayOfWeek} ${ev.day} ${m.nameWithPrefix} ١٤٤٨ هـ`,
            gregorianDateFormatted: `${gridItem.gregorianDay} ${gridItem.gregorianMonth} ${gYear} م`,
            isToday,
            diffMs: Math.max(0, diffMs),
          };
        }
      }
    }
  }

  // Fallback rollover
  if (!nextMatch && MONTHS_DATA.length > 0) {
    for (const m of MONTHS_DATA) {
      const firstEv = m.events.find((e) => isNonInfallibleWiladah(e));
      if (firstEv) {
        const gridItem = m.grid.find((g) => g.hijri === firstEv.day);
        if (gridItem) {
          const gMonthIdx = ARABIC_MONTH_NAMES.indexOf(gridItem.gregorianMonth);
          const targetDate = new Date(2026, gMonthIdx, gridItem.gregorianDay, 0, 0, 0);
          const diffMs = targetDate.getTime() - currentTimestamp;
          nextMatch = {
            event: firstEv,
            month: m,
            targetDate,
            hijriDateFormatted: `${gridItem.dayOfWeek} ${firstEv.day} ${m.nameWithPrefix} ١٤٤8 هـ`,
            gregorianDateFormatted: `${gridItem.gregorianDay} ${gridItem.gregorianMonth} 2026 م`,
            isToday: false,
            diffMs: Math.max(0, diffMs),
          };
          break;
        }
      }
    }
  }

  if (!nextMatch) return null;

  const totalSeconds = Math.floor(nextMatch.diffMs / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return {
    ...nextMatch,
    days,
    hours,
    minutes,
    seconds,
  };
}

export function getNextInfallibleOtherEvent(now: Date = new Date()): NextOtherEventInfo | null {
  const currentTimestamp = now.getTime();
  let nextMatch: {
    event: HistoricalEvent;
    month: HijriMonthData;
    targetDate: Date;
    hijriDateFormatted: string;
    gregorianDateFormatted: string;
    isToday: boolean;
    diffMs: number;
  } | null = null;

  for (const m of MONTHS_DATA) {
    const otherEvents = m.events.filter((e) => isFourteenInfalliblesOtherEvent(e));

    for (const ev of otherEvents) {
      const gridItem = m.grid.find((g) => g.hijri === ev.day);
      if (!gridItem) continue;

      const gMonthIdx = ARABIC_MONTH_NAMES.indexOf(gridItem.gregorianMonth);
      if (gMonthIdx === -1) continue;

      // Determine correct Gregorian year
      const is2027 =
        gridItem.gregorianMonth === 'كانون الثاني' ||
        gridItem.gregorianMonth === 'شباط' ||
        gridItem.gregorianMonth === 'آذار' ||
        gridItem.gregorianMonth === 'نيسان' ||
        gridItem.gregorianMonth === 'أيار' ||
        (gridItem.gregorianMonth === 'حزيران' && m.id === 12);
      const gYear = is2027 ? 2027 : 2026;

      const targetDate = new Date(gYear, gMonthIdx, gridItem.gregorianDay, 0, 0, 0);
      const endOfDay = new Date(gYear, gMonthIdx, gridItem.gregorianDay, 23, 59, 59).getTime();

      // If the day hasn't passed yet
      if (endOfDay >= currentTimestamp) {
        const diffMs = targetDate.getTime() - currentTimestamp;
        const isToday = currentTimestamp >= targetDate.getTime() && currentTimestamp <= endOfDay;

        if (!nextMatch || targetDate.getTime() < nextMatch.targetDate.getTime()) {
          nextMatch = {
            event: ev,
            month: m,
            targetDate,
            hijriDateFormatted: `${gridItem.dayOfWeek} ${ev.day} ${m.nameWithPrefix} ١٤٤٨ هـ`,
            gregorianDateFormatted: `${gridItem.gregorianDay} ${gridItem.gregorianMonth} ${gYear} م`,
            isToday,
            diffMs: Math.max(0, diffMs),
          };
        }
      }
    }
  }

  // Fallback rollover to first infallible other event of the calendar year
  if (!nextMatch && MONTHS_DATA.length > 0) {
    for (const m of MONTHS_DATA) {
      const firstEv = m.events.find((e) => isFourteenInfalliblesOtherEvent(e));
      if (firstEv) {
        const gridItem = m.grid.find((g) => g.hijri === firstEv.day);
        if (gridItem) {
          const gMonthIdx = ARABIC_MONTH_NAMES.indexOf(gridItem.gregorianMonth);
          const targetDate = new Date(2026, gMonthIdx, gridItem.gregorianDay, 0, 0, 0);
          const diffMs = targetDate.getTime() - currentTimestamp;
          nextMatch = {
            event: firstEv,
            month: m,
            targetDate,
            hijriDateFormatted: `${gridItem.dayOfWeek} ${firstEv.day} ${m.nameWithPrefix} ١٤٤٨ هـ`,
            gregorianDateFormatted: `${gridItem.gregorianDay} ${gridItem.gregorianMonth} 2026 م`,
            isToday: false,
            diffMs: Math.max(0, diffMs),
          };
          break;
        }
      }
    }
  }

  if (!nextMatch) return null;

  const totalSeconds = Math.floor(nextMatch.diffMs / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return {
    ...nextMatch,
    days,
    hours,
    minutes,
    seconds,
  };
}

export function getNextNonInfallibleOtherEvent(now: Date = new Date()): NextOtherEventInfo | null {
  const currentTimestamp = now.getTime();
  let nextMatch: {
    event: HistoricalEvent;
    month: HijriMonthData;
    targetDate: Date;
    hijriDateFormatted: string;
    gregorianDateFormatted: string;
    isToday: boolean;
    diffMs: number;
  } | null = null;

  for (const m of MONTHS_DATA) {
    const otherEvents = m.events.filter((e) => isNonInfallibleOtherEvent(e));

    for (const ev of otherEvents) {
      const gridItem = m.grid.find((g) => g.hijri === ev.day);
      if (!gridItem) continue;

      const gMonthIdx = ARABIC_MONTH_NAMES.indexOf(gridItem.gregorianMonth);
      if (gMonthIdx === -1) continue;

      // Determine correct Gregorian year
      const is2027 =
        gridItem.gregorianMonth === 'كانون الثاني' ||
        gridItem.gregorianMonth === 'شباط' ||
        gridItem.gregorianMonth === 'آذار' ||
        gridItem.gregorianMonth === 'نيسان' ||
        gridItem.gregorianMonth === 'أيار' ||
        (gridItem.gregorianMonth === 'حزيران' && m.id === 12);
      const gYear = is2027 ? 2027 : 2026;

      const targetDate = new Date(gYear, gMonthIdx, gridItem.gregorianDay, 0, 0, 0);
      const endOfDay = new Date(gYear, gMonthIdx, gridItem.gregorianDay, 23, 59, 59).getTime();

      // If the day hasn't passed yet
      if (endOfDay >= currentTimestamp) {
        const diffMs = targetDate.getTime() - currentTimestamp;
        const isToday = currentTimestamp >= targetDate.getTime() && currentTimestamp <= endOfDay;

        if (!nextMatch || targetDate.getTime() < nextMatch.targetDate.getTime()) {
          nextMatch = {
            event: ev,
            month: m,
            targetDate,
            hijriDateFormatted: `${gridItem.dayOfWeek} ${ev.day} ${m.nameWithPrefix} ١٤٤٨ هـ`,
            gregorianDateFormatted: `${gridItem.gregorianDay} ${gridItem.gregorianMonth} ${gYear} م`,
            isToday,
            diffMs: Math.max(0, diffMs),
          };
        }
      }
    }
  }

  // Fallback rollover to first non-infallible other event of the calendar year
  if (!nextMatch && MONTHS_DATA.length > 0) {
    for (const m of MONTHS_DATA) {
      const firstEv = m.events.find((e) => isNonInfallibleOtherEvent(e));
      if (firstEv) {
        const gridItem = m.grid.find((g) => g.hijri === firstEv.day);
        if (gridItem) {
          const gMonthIdx = ARABIC_MONTH_NAMES.indexOf(gridItem.gregorianMonth);
          const targetDate = new Date(2026, gMonthIdx, gridItem.gregorianDay, 0, 0, 0);
          const diffMs = targetDate.getTime() - currentTimestamp;
          nextMatch = {
            event: firstEv,
            month: m,
            targetDate,
            hijriDateFormatted: `${gridItem.dayOfWeek} ${firstEv.day} ${m.nameWithPrefix} ١٤٤٨ هـ`,
            gregorianDateFormatted: `${gridItem.gregorianDay} ${gridItem.gregorianMonth} 2026 م`,
            isToday: false,
            diffMs: Math.max(0, diffMs),
          };
          break;
        }
      }
    }
  }

  if (!nextMatch) return null;

  const totalSeconds = Math.floor(nextMatch.diffMs / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return {
    ...nextMatch,
    days,
    hours,
    minutes,
    seconds,
  };
}

export function getNextAnyOtherEvent(now: Date = new Date()): NextOtherEventInfo | null {
  const currentTimestamp = now.getTime();
  let nextMatch: {
    event: HistoricalEvent;
    month: HijriMonthData;
    targetDate: Date;
    hijriDateFormatted: string;
    gregorianDateFormatted: string;
    isToday: boolean;
    diffMs: number;
  } | null = null;

  for (const m of MONTHS_DATA) {
    const otherEvents = m.events.filter((e) => isOtherEvent(e));

    for (const ev of otherEvents) {
      const gridItem = m.grid.find((g) => g.hijri === ev.day);
      if (!gridItem) continue;

      const gMonthIdx = ARABIC_MONTH_NAMES.indexOf(gridItem.gregorianMonth);
      if (gMonthIdx === -1) continue;

      const is2027 =
        gridItem.gregorianMonth === 'كانون الثاني' ||
        gridItem.gregorianMonth === 'شباط' ||
        gridItem.gregorianMonth === 'آذار' ||
        gridItem.gregorianMonth === 'نيسان' ||
        gridItem.gregorianMonth === 'أيار' ||
        (gridItem.gregorianMonth === 'حزيران' && m.id === 12);
      const gYear = is2027 ? 2027 : 2026;

      const targetDate = new Date(gYear, gMonthIdx, gridItem.gregorianDay, 0, 0, 0);
      const endOfDay = new Date(gYear, gMonthIdx, gridItem.gregorianDay, 23, 59, 59).getTime();

      if (endOfDay >= currentTimestamp) {
        const diffMs = targetDate.getTime() - currentTimestamp;
        const isToday = currentTimestamp >= targetDate.getTime() && currentTimestamp <= endOfDay;

        if (!nextMatch || targetDate.getTime() < nextMatch.targetDate.getTime()) {
          nextMatch = {
            event: ev,
            month: m,
            targetDate,
            hijriDateFormatted: `${gridItem.dayOfWeek} ${ev.day} ${m.nameWithPrefix} ١٤٤٨ هـ`,
            gregorianDateFormatted: `${gridItem.gregorianDay} ${gridItem.gregorianMonth} ${gYear} م`,
            isToday,
            diffMs: Math.max(0, diffMs),
          };
        }
      }
    }
  }

  if (!nextMatch && MONTHS_DATA.length > 0) {
    for (const m of MONTHS_DATA) {
      const firstEv = m.events.find((e) => isOtherEvent(e));
      if (firstEv) {
        const gridItem = m.grid.find((g) => g.hijri === firstEv.day);
        if (gridItem) {
          const gMonthIdx = ARABIC_MONTH_NAMES.indexOf(gridItem.gregorianMonth);
          const targetDate = new Date(2026, gMonthIdx, gridItem.gregorianDay, 0, 0, 0);
          const diffMs = targetDate.getTime() - currentTimestamp;
          nextMatch = {
            event: firstEv,
            month: m,
            targetDate,
            hijriDateFormatted: `${gridItem.dayOfWeek} ${firstEv.day} ${m.nameWithPrefix} ١٤٤٨ هـ`,
            gregorianDateFormatted: `${gridItem.gregorianDay} ${gridItem.gregorianMonth} 2026 م`,
            isToday: false,
            diffMs: Math.max(0, diffMs),
          };
          break;
        }
      }
    }
  }

  if (!nextMatch) return null;

  const totalSeconds = Math.floor(nextMatch.diffMs / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return {
    ...nextMatch,
    days,
    hours,
    minutes,
    seconds,
  };
}

export const getNextOtherEvent = getNextInfallibleOtherEvent;
export const getNextMarriage = getNextInfallibleOtherEvent;
export const getNextNonInfallibleMarriage = getNextNonInfallibleOtherEvent;

export function getTodayInfo(now: Date = new Date()): TodayInfo {
  const gDay = now.getDate();
  const gMonthIdx = now.getMonth();
  const gMonthName = ARABIC_MONTH_NAMES[gMonthIdx];
  const gYear = now.getFullYear();
  const weekdayName = ARABIC_WEEKDAYS[now.getDay()];

  // Format time with seconds (e.g. 09:45:12 ص)
  let hours = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  const period = hours >= 12 ? 'م' : 'ص';
  const hours12 = String(hours % 12 || 12).padStart(2, '0');
  const timeFormatted = `${hours12}:${minutes}:${seconds} ${period}`;

  // Find matching Hijri Month and Day from the booklet dataset
  let matchedMonth: HijriMonthData | null = null;
  let matchedHijriDay: number | null = null;

  for (const m of MONTHS_DATA) {
    const foundCell = m.grid.find(
      (cell) => cell.gregorianDay === gDay && cell.gregorianMonth === gMonthName
    );
    if (foundCell) {
      matchedMonth = m;
      matchedHijriDay = foundCell.hijri;
      break;
    }
  }

  // If outside exact 1448 range, fallback gracefully to Month 1
  const events =
    matchedMonth && matchedHijriDay
      ? matchedMonth.events.filter((e) => e.day === matchedHijriDay)
      : [];

  const hijriDateFormatted =
    matchedMonth && matchedHijriDay
      ? `${weekdayName} ${matchedHijriDay} ${matchedMonth.nameWithPrefix} ١٤٤٨ هـ`
      : `${weekdayName} ${gDay} ${gMonthName} ${gYear} م`;

  // Calculate Scorpio status in real-time
  let isScorpioNow = false;
  let activeScorpioTiming: ScorpioTiming | null = null;
  let nextScorpioTiming: TodayInfo['nextScorpioTiming'] = null;

  const currentTime = now.getTime();

  for (const m of MONTHS_DATA) {
    for (const timing of m.scorpioTimings) {
      const entryDate = parseScorpioTimestamp(
        timing.entryDateGregorian,
        timing.entryTime,
        timing.entryPeriod
      );
      const exitDate = parseScorpioTimestamp(
        timing.exitDateGregorian,
        timing.exitTime,
        timing.exitPeriod
      );

      if (entryDate && exitDate) {
        if (currentTime >= entryDate.getTime() && currentTime <= exitDate.getTime()) {
          isScorpioNow = true;
          activeScorpioTiming = timing;
        } else if (entryDate.getTime() > currentTime) {
          if (
            !nextScorpioTiming ||
            entryDate.getTime() < nextScorpioTiming.targetDate.getTime()
          ) {
            nextScorpioTiming = {
              timing,
              monthName: m.name,
              isEntry: true,
              targetDate: entryDate,
            };
          }
        }
      }
    }
  }

  return {
    date: now,
    timeFormatted,
    weekdayName,
    gregorianDay: gDay,
    gregorianMonthName: gMonthName,
    gregorianYear: gYear,
    hijriMonth: matchedMonth,
    hijriDay: matchedHijriDay,
    hijriDateFormatted,
    events,
    isScorpioNow,
    activeScorpioTiming,
    nextScorpioTiming,
  };
}
