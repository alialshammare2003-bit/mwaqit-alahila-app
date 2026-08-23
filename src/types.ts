export interface CrescentObservation {
  dateHijri: string;
  dateGregorian: string;
  sunsetTime: string;
  ageHours: number;
  ageMinutes: number;
  altitudeDegrees: number;
  altitudeMinutes: number;
  durationHours?: number;
  durationMinutes: number;
  illuminatedPercentage: number;
  statusText: string;
  isPrimary: boolean;
}

export interface HistoricalEvent {
  day: number;
  title: string;
  description: string;
  type: 'wiladah' | 'shahadah' | 'eid' | 'historical' | 'ghazwah' | 'general';
  yearHijriOrPre?: string;
  isFourteenInfallibles?: boolean;
  infallibleName?: string;
}

export interface ScorpioTiming {
  entryDay: string;
  entryDateGregorian: string;
  entryTime: string;
  entryPeriod: string; // صباحاً / مساءً / بعد منتصف الليل
  exitDay: string;
  exitDateGregorian: string;
  exitTime: string;
  exitPeriod: string;
  note?: string;
}

export interface CalendarDay {
  hijriDay: number;
  gregorianDay: number;
  gregorianMonthName: string;
  gregorianMonthNumber: number;
  gregorianYear: number;
  dayOfWeek: number; // 0 = Sat, 1 = Sun, 2 = Mon, 3 = Tue, 4 = Wed, 5 = Thu, 6 = Fri
  events?: HistoricalEvent[];
  isScorpio?: boolean;
  scorpioDetail?: string;
}

export interface HijriMonthData {
  id: number;
  name: string;
  nameWithPrefix: string;
  yearHijri: number;
  gregorianMonthsSpan: string; // e.g. "حزيران / تموز 2026م"
  startDayOfWeek: number; // Day of week for 1st of month (0: Sat, 1: Sun, ... 6: Fri)
  totalDays: 29 | 30;
  crescentPrimary: CrescentObservation;
  crescentPreviousNight?: CrescentObservation;
  events: HistoricalEvent[];
  scorpioTimings: ScorpioTiming[];
  grid: {
    hijri: number;
    gregorianDay: number;
    gregorianMonth: string;
    dayOfWeek: string;
  }[];
}
