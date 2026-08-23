import React, { useState } from 'react';
import {
  BookOpen,
  Compass,
  ShieldAlert,
  Sparkles,
  Moon,
  MapPin,
  Calendar,
  LogIn,
  LogOut,
  User as UserIcon,
} from 'lucide-react';
import { User } from 'firebase/auth';

interface HeaderProps {
  onOpenIntro: () => void;
  onOpenScorpioTable: () => void;
  onOpenEventsDirectory: () => void;
  onOpenDateConverter: () => void;
  onOpenMap: () => void;
  onOpenCalendarSync: () => void;
  user: User | null;
  onSignIn: () => void;
  onSignOut: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenIntro,
  onOpenScorpioTable,
  onOpenEventsDirectory,
  onOpenDateConverter,
  onOpenMap,
  onOpenCalendarSync,
  user,
  onSignIn,
  onSignOut,
}) => {
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <header className="relative overflow-hidden pt-4 pb-4 px-3 sm:px-4 bg-gradient-to-b from-stone-950 via-stone-900/95 to-stone-950 border-b border-amber-900/40 text-stone-100 shadow-2xl">
      {/* Decorative Islamic Top Bar Accent */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-600 via-amber-400 to-amber-600 opacity-90" />

      {/* Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[32rem] h-32 bg-amber-500/10 blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10 space-y-3">
        
        {/* Top bar with Optional Google Auth status */}
        <div className="flex items-center justify-between gap-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/60 border border-amber-600/30 text-amber-300 text-xs sm:text-sm font-medium shadow-inner">
            <Moon className="w-3.5 h-3.5 text-amber-400 fill-amber-400/30" />
            <span>التقويم السنوي لأوائل الشهور القمرية</span>
            <span className="w-1 h-1 rounded-full bg-amber-400"></span>
            <span>أفق النجف الأشرف</span>
          </div>

          {/* User Sign-In / Account status */}
          <div className="relative">
            {user ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-stone-900/90 border border-amber-500/40 hover:border-amber-400 text-xs transition-all shadow-sm"
                >
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user.displayName || 'المستخدم'}
                      referrerPolicy="no-referrer"
                      className="w-5 h-5 rounded-full object-cover border border-amber-400"
                    />
                  ) : (
                    <UserIcon className="w-4 h-4 text-amber-400" />
                  )}
                  <span className="max-w-[100px] truncate text-stone-200 font-medium hidden sm:inline">
                    {user.displayName?.split(' ')[0] || 'حسابي'}
                  </span>
                </button>

                {showUserMenu && (
                  <div className="absolute left-0 top-full mt-1.5 w-56 rounded-2xl bg-stone-950 border border-amber-600/40 shadow-2xl p-2.5 z-50 animate-fade-in text-right">
                    <div className="px-2 py-1.5 border-b border-stone-800">
                      <p className="text-xs font-bold text-amber-200 truncate">{user.displayName || 'مستخدم كريم'}</p>
                      <p className="text-[10px] text-stone-400 truncate font-mono">{user.email}</p>
                    </div>
                    <button
                      onClick={() => {
                        setShowUserMenu(false);
                        onOpenCalendarSync();
                      }}
                      className="w-full text-right px-2 py-1.5 mt-1 rounded-lg hover:bg-stone-900 text-xs text-amber-300 flex items-center justify-between"
                    >
                      <span>مزامنة تقويم Google</span>
                      <Calendar className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        setShowUserMenu(false);
                        onSignOut();
                      }}
                      className="w-full text-right px-2 py-1.5 mt-1 rounded-lg hover:bg-rose-950/40 text-xs text-rose-300 flex items-center justify-between border-t border-stone-850"
                    >
                      <span>تسجيل الخروج</span>
                      <LogOut className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={onSignIn}
                className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-900/90 border border-amber-600/30 hover:border-amber-400 text-amber-200 hover:text-white text-xs font-medium transition-all shadow-sm active:scale-95"
                title="تسجيل الدخول الاختياري بحساب Google لمزامنة التقويم وحفظ الملاحظات"
              >
                <LogIn className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline">تسجيل الدخول (Google)</span>
                <span className="sm:hidden">دخول</span>
              </button>
            )}
          </div>
        </div>

        {/* Main Title Section */}
        <div className="flex flex-col items-center text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-amiri font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-300 to-amber-100 tracking-wide drop-shadow-sm">
            مَـوَاقِيـتُ الأَهِلَّـةِ لِعَـامِ ١٤٤٨ هـ
          </h1>

          <p className="text-xs sm:text-sm text-stone-400 mt-0.5 font-tajawal">
            ( 2026 – 2027 م ) • طبقاً للحسابات العلمية الصادرة عن مكتب سماحة السيد السيستاني (دام ظله)
          </p>
        </div>

        {/* Quick Access Action Pills */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap pt-1">
          <button
            onClick={onOpenMap}
            id="btn-holy-map"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-950/70 hover:bg-amber-900/80 text-amber-300 text-xs sm:text-sm font-medium border border-amber-500/40 active:scale-95 transition-all shadow-sm ring-1 ring-amber-500/20"
          >
            <MapPin className="w-4 h-4 text-amber-400" />
            <span>خريطة العتبات والمراصد</span>
          </button>

          <button
            onClick={onOpenCalendarSync}
            id="btn-calendar-sync"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-950/70 hover:bg-amber-900/80 text-amber-300 text-xs sm:text-sm font-medium border border-amber-500/40 active:scale-95 transition-all shadow-sm ring-1 ring-amber-500/20"
          >
            <Calendar className="w-4 h-4 text-amber-400" />
            <span>مزامنة تقويم Google</span>
          </button>

          <button
            onClick={onOpenIntro}
            id="btn-intro-modal"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-800/90 hover:bg-stone-700 text-amber-200 text-xs sm:text-sm font-medium border border-amber-600/20 active:scale-95 transition-all shadow-sm"
          >
            <BookOpen className="w-4 h-4 text-amber-400" />
            <span>المقدمة والمنهجية</span>
          </button>

          <button
            onClick={onOpenScorpioTable}
            id="btn-scorpio-table"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-800/90 hover:bg-stone-700 text-amber-200 text-xs sm:text-sm font-medium border border-amber-600/20 active:scale-95 transition-all shadow-sm"
          >
            <ShieldAlert className="w-4 h-4 text-rose-400" />
            <span>برج العقرب للعام</span>
          </button>

          <button
            onClick={onOpenEventsDirectory}
            id="btn-events-dir"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-800/90 hover:bg-stone-700 text-amber-200 text-xs sm:text-sm font-medium border border-amber-600/20 active:scale-95 transition-all shadow-sm"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>دليل المناسبات</span>
          </button>

          <button
            onClick={onOpenDateConverter}
            id="btn-date-converter"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-800/90 hover:bg-stone-700 text-amber-200 text-xs sm:text-sm font-medium border border-amber-600/20 active:scale-95 transition-all shadow-sm"
          >
            <Compass className="w-4 h-4 text-cyan-400" />
            <span>تحويل التاريخ</span>
          </button>
        </div>
      </div>
    </header>
  );
};
