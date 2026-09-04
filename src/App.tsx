import React, { useState, useEffect, useMemo } from 'react';
import { MONTHS_DATA } from './data/calendarData';
import { Header } from './components/Header';
import { MonthSelector } from './components/MonthSelector';
import { CrescentCard } from './components/CrescentCard';
import { CalendarGrid } from './components/CalendarGrid';
import { DayDetailsModal } from './components/DayDetailsModal';
import { EventsList } from './components/EventsList';
import { ScorpioCard } from './components/ScorpioCard';
import { IntroModal } from './components/IntroModal';
import { YearScorpioTable } from './components/YearScorpioTable';
import { YearEventsDirectory } from './components/YearEventsDirectory';
import { DateConverter } from './components/DateConverter';
import { LiveTodayBanner } from './components/LiveTodayBanner';
import { BooksLibraryModal } from './components/BooksLibraryModal';
import { BooksSection } from './components/BooksSection';
import { FiqhSectionView } from './components/FiqhSectionView';
import { TopMasterDomainSwitcher, AppDomain } from './components/TopMasterDomainSwitcher';
import { FiqhAIAssistantModal } from './components/FiqhAIAssistantModal';
import { CalendarAIAssistantModal } from './components/CalendarAIAssistantModal';
import { FiqhTextLibraryModal } from './components/FiqhTextLibraryModal';
import { ShahadahCountdownCard } from './components/ShahadahCountdownCard';
import { WiladahCountdownCard } from './components/WiladahCountdownCard';
import { OtherEventCountdownCard } from './components/OtherEventCountdownCard';
import { NonInfallibleShahadahCard } from './components/NonInfallibleShahadahCard';
import { NonInfallibleWiladahCard } from './components/NonInfallibleWiladahCard';
import { NonInfallibleOtherEventCard } from './components/NonInfallibleOtherEventCard';
import { BloodRainEffect } from './components/effects/BloodRainEffect';
import { FlowerPetalsEffect } from './components/effects/FlowerPetalsEffect';
import { GoldenStardustEffect } from './components/effects/GoldenStardustEffect';
import { EmeraldAuraEffect } from './components/effects/EmeraldAuraEffect';
import { CyanStarlightEffect } from './components/effects/CyanStarlightEffect';
import { CosmicNebulaEffect } from './components/effects/CosmicNebulaEffect';
import {
  getTodayInfo,
  getNextShahadah,
  getNextWiladah,
  getNextInfallibleOtherEvent,
  getNextNonInfallibleShahadah,
  getNextNonInfallibleWiladah,
  getNextNonInfallibleOtherEvent,
  getDayAtmosphere,
  DayAtmosphere,
  TodayInfo,
  NextShahadahInfo,
  NextWiladahInfo,
  NextOtherEventInfo,
} from './utils/dateUtils';
import { Calendar, Sparkles, ShieldAlert, Flame, Users, CalendarDays, Library, Moon } from 'lucide-react';

export default function App() {
  // Active main domain: 'fiqh' (القسم الفقهي) vs 'calendar' (قسم المناسبات والأهلة)
  const [activeDomain, setActiveDomain] = useState<AppDomain>('calendar');

  // Live state for current time and date
  const [todayInfo, setTodayInfo] = useState<TodayInfo>(() => getTodayInfo(new Date()));
  const [nextShahadah, setNextShahadah] = useState<NextShahadahInfo | null>(() => getNextShahadah(new Date()));
  const [nextWiladah, setNextWiladah] = useState<NextWiladahInfo | null>(() => getNextWiladah(new Date()));
  const [nextOtherEvent, setNextOtherEvent] = useState<NextOtherEventInfo | null>(() =>
    getNextInfallibleOtherEvent(new Date())
  );
  const [nextNonInfallibleShahadah, setNextNonInfallibleShahadah] = useState<NextShahadahInfo | null>(() =>
    getNextNonInfallibleShahadah(new Date())
  );
  const [nextNonInfallibleWiladah, setNextNonInfallibleWiladah] = useState<NextWiladahInfo | null>(() =>
    getNextNonInfallibleWiladah(new Date())
  );
  const [nextNonInfallibleOtherEvent, setNextNonInfallibleOtherEvent] = useState<NextOtherEventInfo | null>(() =>
    getNextNonInfallibleOtherEvent(new Date())
  );

  // Active category: 14 Infallibles vs Non-Infallibles vs All
  const [countdownCategory, setCountdownCategory] = useState<'infallibles' | 'non_infallibles' | 'all'>('infallibles');

  // Active countdown tab: all, shahadah, wiladah, other
  const [countdownTab, setCountdownTab] = useState<'all' | 'wiladah' | 'shahadah' | 'other'>('all');

  // Compute active theme automatically based on today's events atmosphere
  const computedActiveTheme: DayAtmosphere = useMemo(() => {
    return getDayAtmosphere(todayInfo.events);
  }, [todayInfo.events]);

  // Active month in the view (1 to 12) - initialize with today's month if found
  const [selectedMonthId, setSelectedMonthId] = useState<number>(() => {
    const initial = getTodayInfo(new Date());
    return initial.hijriMonth?.id || 1;
  });

  // State for active day modal
  const [selectedHijriDay, setSelectedHijriDay] = useState<number | null>(null);

  // Modals state
  const [showIntroModal, setShowIntroModal] = useState<boolean>(false);
  const [showScorpioTable, setShowScorpioTable] = useState<boolean>(false);
  const [showEventsDir, setShowEventsDir] = useState<boolean>(false);
  const [showDateConverter, setShowDateConverter] = useState<boolean>(false);
  const [showBooksLibrary, setShowBooksLibrary] = useState<boolean>(false);

  // New AI Assistants and Textual Jurisprudence Library states
  const [showFiqhAI, setShowFiqhAI] = useState<boolean>(false);
  const [fiqhAIQuestion, setFiqhAIQuestion] = useState<string>('');
  const [showCalendarAI, setShowCalendarAI] = useState<boolean>(false);
  const [calendarAIQuestion, setCalendarAIQuestion] = useState<string>('');
  const [showFiqhTextLibrary, setShowFiqhTextLibrary] = useState<boolean>(false);
  const [selectedLibraryBookId, setSelectedLibraryBookId] = useState<string | undefined>(undefined);

  // Active view tab on mobile (calendar / events / scorpio / books)
  const [activeTab, setActiveTab] = useState<'calendar' | 'events' | 'scorpio' | 'books'>('calendar');

  // Sorted Infallible events list by proximity
  const infallibleCardsList = useMemo(() => {
    const list: Array<{ type: 'shahadah' | 'wiladah' | 'other'; data: NextShahadahInfo | NextWiladahInfo | NextOtherEventInfo }> = [];
    if (nextShahadah) list.push({ type: 'shahadah', data: nextShahadah });
    if (nextWiladah) list.push({ type: 'wiladah', data: nextWiladah });
    if (nextOtherEvent) list.push({ type: 'other', data: nextOtherEvent });

    list.sort((a, b) => {
      if (a.data.isToday && !b.data.isToday) return -1;
      if (!a.data.isToday && b.data.isToday) return 1;
      return a.data.diffMs - b.data.diffMs;
    });

    return list;
  }, [nextShahadah, nextWiladah, nextOtherEvent]);

  // Sorted Non-Infallible events list by proximity
  const nonInfallibleCardsList = useMemo(() => {
    const list: Array<{ type: 'shahadah' | 'wiladah' | 'other'; data: NextShahadahInfo | NextWiladahInfo | NextOtherEventInfo }> = [];
    if (nextNonInfallibleShahadah) list.push({ type: 'shahadah', data: nextNonInfallibleShahadah });
    if (nextNonInfallibleWiladah) list.push({ type: 'wiladah', data: nextNonInfallibleWiladah });
    if (nextNonInfallibleOtherEvent) list.push({ type: 'other', data: nextNonInfallibleOtherEvent });

    list.sort((a, b) => {
      if (a.data.isToday && !b.data.isToday) return -1;
      if (!a.data.isToday && b.data.isToday) return 1;
      return a.data.diffMs - b.data.diffMs;
    });

    return list;
  }, [nextNonInfallibleShahadah, nextNonInfallibleWiladah, nextNonInfallibleOtherEvent]);

  // Real-time interval that ticks every second and auto-advances at midnight
  useEffect(() => {
    let lastDateDay = new Date().getDate();

    const timer = setInterval(() => {
      const now = new Date();
      const currentDay = now.getDate();
      const newInfo = getTodayInfo(now);
      setTodayInfo(newInfo);
      setNextShahadah(getNextShahadah(now));
      setNextWiladah(getNextWiladah(now));
      setNextOtherEvent(getNextInfallibleOtherEvent(now));
      setNextNonInfallibleShahadah(getNextNonInfallibleShahadah(now));
      setNextNonInfallibleWiladah(getNextNonInfallibleWiladah(now));
      setNextNonInfallibleOtherEvent(getNextNonInfallibleOtherEvent(now));

      // If midnight rolled over to the next day, auto-advance calendar to today's month
      if (currentDay !== lastDateDay) {
        lastDateDay = currentDay;
        if (newInfo.hijriMonth) {
          setSelectedMonthId(newInfo.hijriMonth.id);
        }
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const currentMonth =
    MONTHS_DATA.find((m) => m.id === selectedMonthId) || MONTHS_DATA[0];

  const handleNavigateToDay = (monthId: number, hijriDay: number) => {
    setSelectedMonthId(monthId);
    setSelectedHijriDay(hijriDay);
  };

  const handleJumpToToday = () => {
    if (todayInfo.hijriMonth) {
      setSelectedMonthId(todayInfo.hijriMonth.id);
      if (todayInfo.hijriDay !== null) {
        setSelectedHijriDay(todayInfo.hijriDay);
      }
    }
  };

  const isViewingTodayMonth = todayInfo.hijriMonth?.id === selectedMonthId;

  return (
    <div
      className={`min-h-screen flex flex-col pb-14 sm:pb-8 relative transition-colors duration-500 ${
        activeDomain === 'fiqh'
          ? 'domain-fiqh-canvas selection:bg-emerald-700 selection:text-white'
          : `domain-calendar-canvas selection:bg-sky-700 selection:text-white theme-${computedActiveTheme}`
      }`}
    >
      {/* Dynamic Background Atmospheric & Particle Effects */}
      {activeDomain === 'fiqh' ? (
        <>
          <EmeraldAuraEffect />
          <GoldenStardustEffect />
        </>
      ) : (
        <>
          {(computedActiveTheme === 'royal-gold' || computedActiveTheme === 'normal') && <GoldenStardustEffect />}
          {computedActiveTheme === 'emerald' && <EmeraldAuraEffect />}
          {computedActiveTheme === 'turquoise' && <CyanStarlightEffect />}
          {computedActiveTheme === 'shahadah' && <BloodRainEffect />}
          {computedActiveTheme === 'celebration' && <FlowerPetalsEffect />}
          {computedActiveTheme === 'sapphire-violet' && <CosmicNebulaEffect />}
        </>
      )}

      {/* App Header with Domain-Aware Controls */}
      <Header
        activeDomain={activeDomain}
        onChangeDomain={setActiveDomain}
        onOpenIntro={() => setShowIntroModal(true)}
        onOpenScorpioTable={() => setShowScorpioTable(true)}
        onOpenEventsDirectory={() => setShowEventsDir(true)}
        onOpenDateConverter={() => setShowDateConverter(true)}
        onOpenBooksLibrary={() => setShowFiqhTextLibrary(true)}
        onOpenFiqhAI={() => {
          setFiqhAIQuestion('');
          setShowFiqhAI(true);
        }}
        onOpenCalendarAI={() => {
          setCalendarAIQuestion('');
          setShowCalendarAI(true);
        }}
      />

      {/* Prominent Top Dual-Domain Master Switcher */}
      <TopMasterDomainSwitcher
        activeDomain={activeDomain}
        onChangeDomain={setActiveDomain}
        onOpenFiqhAI={() => {
          setFiqhAIQuestion('');
          setShowFiqhAI(true);
        }}
        onOpenCalendarAI={() => {
          setCalendarAIQuestion('');
          setShowCalendarAI(true);
        }}
      />

      {/* ============================================================
          BRANCH 1: FIQH & SHARIA JURISPRUDENCE SECTION
         ============================================================ */}
      {activeDomain === 'fiqh' ? (
        <main className="flex-1 max-w-5xl w-full mx-auto p-3 sm:p-5">
          <FiqhSectionView
            onOpenFiqhAI={(q) => {
              setFiqhAIQuestion(q || '');
              setShowFiqhAI(true);
            }}
            onOpenFullTextLibrary={(bookId) => {
              setSelectedLibraryBookId(bookId);
              setShowFiqhTextLibrary(true);
            }}
          />
        </main>
      ) : (
        /* ============================================================
            BRANCH 2: CALENDAR, CRESCENT & HISTORICAL EVENTS SECTION
           ============================================================ */
        <>
          {/* Sticky Month Selector Ribbon */}
          <MonthSelector
            selectedMonthId={selectedMonthId}
            onSelectMonth={setSelectedMonthId}
          />

          {/* Mobile Tab Switcher */}
          <div className="max-w-4xl mx-auto w-full px-3 pt-3 flex sm:hidden">
            <div className="grid grid-cols-4 w-full bg-stone-900/90 p-1 rounded-xl border border-stone-800 text-[11px]">
              <button
                onClick={() => setActiveTab('calendar')}
                className={`py-1.5 rounded-lg font-bold flex items-center justify-center gap-1 transition-all ${
                  activeTab === 'calendar'
                    ? 'bg-amber-600 text-stone-950 shadow-sm'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>التقويم</span>
              </button>

              <button
                onClick={() => setActiveTab('events')}
                className={`py-1.5 rounded-lg font-bold flex items-center justify-center gap-1 transition-all ${
                  activeTab === 'events'
                    ? 'bg-amber-600 text-stone-950 shadow-sm'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>الوقائع</span>
              </button>

              <button
                onClick={() => setActiveDomain('fiqh')}
                className="py-1.5 rounded-lg font-bold flex items-center justify-center gap-1 transition-all text-emerald-400 hover:text-emerald-300"
              >
                <Library className="w-3.5 h-3.5" />
                <span>القسم الفقهي</span>
              </button>

              <button
                onClick={() => setActiveTab('scorpio')}
                className={`py-1.5 rounded-lg font-bold flex items-center justify-center gap-1 transition-all ${
                  activeTab === 'scorpio'
                    ? 'bg-rose-600 text-white shadow-sm'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>العقرب</span>
              </button>
            </div>
          </div>

          {/* Main Content Area */}
          <main className="flex-1 max-w-4xl w-full mx-auto p-3 sm:p-5 space-y-4 sm:space-y-6">
            {/* Live Real-Time Date & Clock Banner */}
            <LiveTodayBanner
              todayInfo={todayInfo}
              onJumpToToday={handleJumpToToday}
              onOpenDayDetails={(day) => {
                if (todayInfo.hijriMonth) {
                  setSelectedMonthId(todayInfo.hijriMonth.id);
                }
                setSelectedHijriDay(day);
              }}
              isViewingToday={isViewingTodayMonth}
            />

            {/* Section: Countdown Switcher & Cards */}
            <div id="countdowns-section" className="space-y-3.5">
              {/* Main Category Selector and Sub-filter */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2.5 px-1">
                {/* Category Selector Tabs */}
                <div className="flex items-center gap-1.5 p-1 bg-stone-900/90 rounded-xl border border-stone-800 text-xs overflow-x-auto">
                  <button
                    id="tab-category-infallibles"
                    onClick={() => setCountdownCategory('infallibles')}
                    className={`px-3 py-1.5 rounded-lg font-medium transition-all whitespace-nowrap flex items-center gap-1.5 ${
                      countdownCategory === 'infallibles'
                        ? 'bg-amber-600 text-stone-950 font-bold shadow-md'
                        : 'text-stone-300 hover:text-stone-100 hover:bg-stone-800/60'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>المعصومون الـ ١٤ (ع)</span>
                  </button>

                  <button
                    id="tab-category-non-infallibles"
                    onClick={() => setCountdownCategory('non_infallibles')}
                    className={`px-3 py-1.5 rounded-lg font-medium transition-all whitespace-nowrap flex items-center gap-1.5 ${
                      countdownCategory === 'non_infallibles'
                        ? 'bg-purple-600 text-white font-bold shadow-md'
                        : 'text-stone-300 hover:text-stone-100 hover:bg-stone-800/60'
                    }`}
                  >
                    <Users className="w-3.5 h-3.5" />
                    <span>الشخصيات غير المعصومة</span>
                  </button>

                  <button
                    id="tab-category-all"
                    onClick={() => setCountdownCategory('all')}
                    className={`px-3 py-1.5 rounded-lg font-medium transition-all whitespace-nowrap flex items-center gap-1.5 ${
                      countdownCategory === 'all'
                        ? 'bg-stone-700 text-stone-100 font-bold shadow-md'
                        : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/60'
                    }`}
                  >
                    <span>عرض الجميع</span>
                  </button>
                </div>

                {/* Event Type Sub-filter pills (All, Shahadah/Wafat, Wiladah, Other Events) */}
                <div className="flex items-center self-start md:self-auto bg-stone-900 p-1 rounded-xl border border-stone-800 text-xs flex-wrap gap-1">
                  <button
                    onClick={() => setCountdownTab('all')}
                    className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                      countdownTab === 'all'
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold'
                        : 'text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    الكل
                  </button>
                  <button
                    onClick={() => setCountdownTab('shahadah')}
                    className={`px-2.5 py-1 rounded-lg font-medium transition-all flex items-center gap-1 ${
                      countdownTab === 'shahadah'
                        ? 'bg-rose-600 text-white font-bold shadow-sm'
                        : 'text-rose-400 hover:text-rose-300'
                    }`}
                  >
                    <Flame className="w-3 h-3" />
                    <span>الاستشهاد / الوفاة</span>
                  </button>
                  <button
                    onClick={() => setCountdownTab('wiladah')}
                    className={`px-2.5 py-1 rounded-lg font-medium transition-all flex items-center gap-1 ${
                      countdownTab === 'wiladah'
                        ? 'bg-emerald-600 text-white font-bold shadow-sm'
                        : 'text-emerald-400 hover:text-emerald-300'
                    }`}
                  >
                    <Sparkles className="w-3 h-3" />
                    <span>المواليد</span>
                  </button>
                  <button
                    onClick={() => setCountdownTab('other')}
                    className={`px-2.5 py-1 rounded-lg font-medium transition-all flex items-center gap-1 ${
                      countdownTab === 'other'
                        ? 'bg-sky-600 text-white font-bold shadow-sm'
                        : 'text-sky-400 hover:text-sky-300'
                    }`}
                  >
                    <CalendarDays className="w-3 h-3" />
                    <span>الحدث القادم (الوقائع العامة)</span>
                  </button>
                </div>
              </div>

              {/* Cards Display Section */}
              <div className="space-y-4">
                {/* 14 Infallibles Cards */}
                {(countdownCategory === 'infallibles' || countdownCategory === 'all') && (
                  <div className="space-y-3">
                    {countdownCategory === 'all' && (
                      <div className="flex items-center gap-2 pt-2 border-t border-stone-800/80">
                        <span className="w-2 h-2 rounded-full bg-amber-400" />
                        <span className="text-xs font-bold text-amber-300 font-amiri">
                          مناسبات المعصومين الأربعة عشر (عليهم السلام)
                        </span>
                      </div>
                    )}

                    {countdownTab === 'all' ? (
                      infallibleCardsList.map((item, idx) => {
                        if (item.type === 'shahadah') {
                          return (
                            <ShahadahCountdownCard
                              key="inf-shahadah"
                              nextShahadah={nextShahadah}
                              onNavigateToDay={handleNavigateToDay}
                              isClosest={idx === 0}
                            />
                          );
                        }
                        if (item.type === 'wiladah') {
                          return (
                            <WiladahCountdownCard
                              key="inf-wiladah"
                              nextWiladah={nextWiladah}
                              onNavigateToDay={handleNavigateToDay}
                              isClosest={idx === 0}
                            />
                          );
                        }
                        return (
                          <OtherEventCountdownCard
                            key="inf-other"
                            nextOtherEvent={nextOtherEvent}
                            onNavigateToDay={handleNavigateToDay}
                            isClosest={idx === 0}
                          />
                        );
                      })
                    ) : countdownTab === 'shahadah' ? (
                      <ShahadahCountdownCard
                        nextShahadah={nextShahadah}
                        onNavigateToDay={handleNavigateToDay}
                        isClosest={infallibleCardsList[0]?.type === 'shahadah'}
                      />
                    ) : countdownTab === 'wiladah' ? (
                      <WiladahCountdownCard
                        nextWiladah={nextWiladah}
                        onNavigateToDay={handleNavigateToDay}
                        isClosest={infallibleCardsList[0]?.type === 'wiladah'}
                      />
                    ) : (
                      <OtherEventCountdownCard
                        nextOtherEvent={nextOtherEvent}
                        onNavigateToDay={handleNavigateToDay}
                        isClosest={infallibleCardsList[0]?.type === 'other'}
                      />
                    )}
                  </div>
                )}

                {/* Non-Infallible Personalities Cards */}
                {(countdownCategory === 'non_infallibles' || countdownCategory === 'all') && (
                  <div className="space-y-3">
                    {countdownCategory === 'all' && (
                      <div className="flex items-center gap-2 pt-3 border-t border-stone-800/80">
                        <span className="w-2 h-2 rounded-full bg-purple-400" />
                        <span className="text-xs font-bold text-purple-300 font-amiri">
                          مناسبات الشخصيات الجليلة غير المعصومة والوقائع التاريخية
                        </span>
                      </div>
                    )}

                    {countdownTab === 'all' ? (
                      nonInfallibleCardsList.map((item, idx) => {
                        if (item.type === 'shahadah') {
                          return (
                            <NonInfallibleShahadahCard
                              key="non-shahadah"
                              nextShahadah={nextNonInfallibleShahadah}
                              onNavigateToDay={handleNavigateToDay}
                              isClosest={idx === 0}
                            />
                          );
                        }
                        if (item.type === 'wiladah') {
                          return (
                            <NonInfallibleWiladahCard
                              key="non-wiladah"
                              nextWiladah={nextNonInfallibleWiladah}
                              onNavigateToDay={handleNavigateToDay}
                              isClosest={idx === 0}
                            />
                          );
                        }
                        return (
                          <NonInfallibleOtherEventCard
                            key="non-other"
                            nextOtherEvent={nextNonInfallibleOtherEvent}
                            onNavigateToDay={handleNavigateToDay}
                            isClosest={idx === 0}
                          />
                        );
                      })
                    ) : countdownTab === 'shahadah' ? (
                      <NonInfallibleShahadahCard
                        nextShahadah={nextNonInfallibleShahadah}
                        onNavigateToDay={handleNavigateToDay}
                        isClosest={nonInfallibleCardsList[0]?.type === 'shahadah'}
                      />
                    ) : countdownTab === 'wiladah' ? (
                      <NonInfallibleWiladahCard
                        nextWiladah={nextNonInfallibleWiladah}
                        onNavigateToDay={handleNavigateToDay}
                        isClosest={nonInfallibleCardsList[0]?.type === 'wiladah'}
                      />
                    ) : (
                      <NonInfallibleOtherEventCard
                        nextOtherEvent={nextNonInfallibleOtherEvent}
                        onNavigateToDay={handleNavigateToDay}
                        isClosest={nonInfallibleCardsList[0]?.type === 'other'}
                      />
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Interactive Calendar AI Card */}
            {(activeTab === 'calendar' || typeof window === 'undefined') && (
              <div
                id="banner-calendar-ai"
                className="rounded-2xl bg-gradient-to-r from-cyan-950/70 via-stone-900/90 to-cyan-950/50 border border-cyan-500/40 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-600/20 border border-cyan-500/40 text-cyan-400 flex items-center justify-center shrink-0 shadow-inner">
                    <Moon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="text-sm sm:text-base font-amiri font-bold text-cyan-100">
                        المساعد الذكي: «اسألني حول الأحداث التاريخية والمناسبات الدينية»
                      </h4>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-600/40 font-medium">
                        مستند حصراً لمواقيت الأهلة
                      </span>
                    </div>
                    <p className="text-[11px] text-stone-300 font-tajawal">
                      إجابات فورية دقيقة حول أوائل الشهور، مواصفات الهلال لأفق النجف، والوقائع التاريخية لعام ١٤٤٨ هـ.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setCalendarAIQuestion('');
                    setShowCalendarAI(true);
                  }}
                  id="btn-ask-calendar-ai-banner"
                  className="w-full sm:w-auto px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-stone-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md active:scale-95 shrink-0"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>اسألني الآن</span>
                </button>
              </div>
            )}

            {/* Section 1: Moon Sighting Card (always visible in calendar tab or desktop) */}
            {(activeTab === 'calendar' || typeof window === 'undefined') && (
              <CrescentCard month={currentMonth} />
            )}

            {/* Section 2: Calendar Grid (in calendar tab or desktop) */}
            {(activeTab === 'calendar' || typeof window === 'undefined') && (
              <CalendarGrid
                month={currentMonth}
                selectedHijriDay={selectedHijriDay}
                todayHijriDay={todayInfo.hijriDay}
                isTodayMonth={isViewingTodayMonth}
                onSelectDay={setSelectedHijriDay}
              />
            )}

            {/* Section 3: Events Timeline (in events tab or desktop) */}
            <div className={activeTab === 'events' ? 'block' : 'hidden sm:block'}>
              <EventsList
                month={currentMonth}
                onSelectDay={setSelectedHijriDay}
              />
            </div>

            {/* Section 4: Moon in Scorpio Card (in scorpio tab or desktop) */}
            <div className={activeTab === 'scorpio' ? 'block' : 'hidden sm:block'}>
              <ScorpioCard
                monthName={currentMonth.name}
                timings={currentMonth.scorpioTimings}
              />
            </div>
          </main>
        </>
      )}

      {/* Modals & Dialogs */}
      {selectedHijriDay !== null && (
        <DayDetailsModal
          month={currentMonth}
          dayHijri={selectedHijriDay}
          onClose={() => setSelectedHijriDay(null)}
        />
      )}

      {showIntroModal && (
        <IntroModal onClose={() => setShowIntroModal(false)} />
      )}

      {showScorpioTable && (
        <YearScorpioTable
          onClose={() => setShowScorpioTable(false)}
          onSelectMonth={setSelectedMonthId}
        />
      )}

      {showEventsDir && (
        <YearEventsDirectory
          onClose={() => setShowEventsDir(false)}
          onNavigateToDay={handleNavigateToDay}
        />
      )}

      {showDateConverter && (
        <DateConverter
          onClose={() => setShowDateConverter(false)}
          onNavigateToDay={handleNavigateToDay}
        />
      )}

      {showBooksLibrary && (
        <BooksLibraryModal onClose={() => setShowBooksLibrary(false)} />
      )}

      {showFiqhAI && (
        <FiqhAIAssistantModal
          onClose={() => setShowFiqhAI(false)}
          initialQuestion={fiqhAIQuestion}
        />
      )}

      {showCalendarAI && (
        <CalendarAIAssistantModal
          onClose={() => setShowCalendarAI(false)}
          initialQuestion={calendarAIQuestion}
        />
      )}

      {showFiqhTextLibrary && (
        <FiqhTextLibraryModal
          onClose={() => setShowFiqhTextLibrary(false)}
          onOpenFiqhAI={(q) => {
            setFiqhAIQuestion(q || '');
            setShowFiqhAI(true);
          }}
          initialBookId={selectedLibraryBookId}
        />
      )}

      {/* Footer */}
      <footer className="mt-8 border-t border-stone-900 bg-stone-950 py-6 px-4 text-center text-xs text-stone-500 space-y-2 font-tajawal">
        <p className="text-stone-400 font-amiri text-sm">
          مواقيت الأهلة لعام ١٤٤٨ هـ (2026 – 2027 م) • مكتب سماحة آية الله العظمى السيد السيستاني (دام ظله)
        </p>
        <p className="text-stone-500 text-[11px] max-w-xl mx-auto leading-relaxed">
          وفقاً للحسابات العلمية لأفق مدينة النجف الأشرف. بداية الشهور القمرية تعتمد على ثبوت رؤية الهلال شرعاً.
        </p>
      </footer>
    </div>
  );
}
