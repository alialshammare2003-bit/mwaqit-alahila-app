import React, { useState, useEffect } from 'react';
import {
  Calendar as CalendarIcon,
  CheckCircle2,
  AlertCircle,
  X,
  Plus,
  Trash2,
  RefreshCw,
  ExternalLink,
  ShieldCheck,
  Sparkles,
  CalendarCheck,
} from 'lucide-react';
import {
  createCalendarEvent,
  listCalendarEvents,
  deleteCalendarEvent,
  GoogleCalendarItem,
} from '../services/calendarService';
import { MONTHS_DATA } from '../data/calendarData';

interface GoogleCalendarSyncModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: any | null;
  onRequireAuth: () => void;
}

interface PredefinedOccasion {
  id: string;
  title: string;
  dateStr: string; // YYYY-MM-DD
  hijriDate: string;
  category: 'crescent' | 'wiladah' | 'shahadah' | 'eid' | 'historical';
  description: string;
}

// Helper to generate ISO YYYY-MM-DD from calendar grid item
const GREG_MONTH_MAP: Record<string, string> = {
  'كانون الثاني': '01',
  'شباط': '02',
  'آذار': '03',
  'نيسان': '04',
  'أيار': '05',
  'حزيران': '06',
  'تموز': '07',
  'آب': '08',
  'أيلول': '09',
  'تشرين الأول': '10',
  'تشرين الثاني': '11',
  'كانون الأول': '12',
};

function getIsoDate(day: number, monthName: string, monthId: number): string {
  const is2027 =
    monthName === 'كانون الثاني' ||
    monthName === 'شباط' ||
    monthName === 'آذار' ||
    monthName === 'نيسان' ||
    monthName === 'أيار' ||
    (monthName === 'حزيران' && monthId === 12);
  const year = is2027 ? '2027' : '2026';
  const mon = GREG_MONTH_MAP[monthName] || '01';
  const padDay = String(day).padStart(2, '0');
  return `${year}-${mon}-${padDay}`;
}

export const GoogleCalendarSyncModal: React.FC<GoogleCalendarSyncModalProps> = ({
  isOpen,
  onClose,
  user,
  onRequireAuth,
}) => {
  const [activeTab, setActiveTab] = useState<'available' | 'synced'>('available');
  const [syncedEvents, setSyncedEvents] = useState<GoogleCalendarItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [syncingId, setSyncingId] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Destructive / Mutating Confirmation Dialog State (Mandatory requirement per Workspace skill)
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    title: string;
    description: string;
    actionType: 'create_single' | 'create_all' | 'delete_single';
    payload?: any;
  }>({
    isOpen: false,
    title: '',
    description: '',
    actionType: 'create_single',
  });

  // Extract major occasions for 1448 H
  const availableOccasions: PredefinedOccasion[] = React.useMemo(() => {
    const list: PredefinedOccasion[] = [];

    MONTHS_DATA.forEach((m) => {
      // 1. Crescent sighting & 1st of month
      const firstDayGrid = m.grid.find((g) => g.hijri === 1) || m.grid[0];
      const startIso = firstDayGrid
        ? getIsoDate(firstDayGrid.gregorianDay, firstDayGrid.gregorianMonth, m.id)
        : '2026-06-17';

      list.push({
        id: `crescent_${m.id}`,
        title: `غرة شهر ${m.name} ١٤٤٨ هـ (أفق النجف)`,
        dateStr: startIso,
        hijriDate: `١ ${m.name} ١٤٤٨ هـ`,
        category: 'crescent',
        description: `أول أيام شهر ${m.name} لعام 1448 هـ وفق الحسابات الفلكية لمكتب سماحة السيد السيستاني (دام ظله) - أفق النجف الأشرف. مكث الهلال: ${m.crescentPrimary.durationMinutes} دقيقة. نسبة الإضاءة: ${m.crescentPrimary.illuminatedPercentage}%.`,
      });

      // 2. Events inside month
      m.events.forEach((ev, idx) => {
        const gridItem = m.grid.find((g) => g.hijri === ev.day);
        const evDateStr = gridItem
          ? getIsoDate(gridItem.gregorianDay, gridItem.gregorianMonth, m.id)
          : startIso;

        let cat: 'wiladah' | 'shahadah' | 'eid' | 'historical' = 'historical';
        if (ev.type === 'shahadah') cat = 'shahadah';
        else if (ev.type === 'wiladah') cat = 'wiladah';
        else if (ev.type === 'eid') cat = 'eid';

        list.push({
          id: `ev_${m.id}_${idx}`,
          title: `${ev.title} (${ev.day} ${m.name})`,
          dateStr: evDateStr,
          hijriDate: `${ev.day} ${m.name} ١٤٤٨ هـ`,
          category: cat,
          description: `${ev.title}\nالتاريخ الهجري: ${ev.day} ${m.name} 1448 هـ\nالتقويم الإسلامي الفلكي المعتمد لأفق النجف الأشرف.`,
        });
      });
    });

    return list;
  }, []);

  // Fetch synced events when user is logged in
  const fetchEvents = async () => {
    if (!user) return;
    setIsLoading(true);
    setStatusMessage(null);
    try {
      const items = await listCalendarEvents();
      setSyncedEvents(items);
    } catch (err: any) {
      console.warn('Calendar fetch notice:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && user) {
      fetchEvents();
    }
  }, [isOpen, user]);

  // Handle single event creation confirmation
  const requestSyncSingle = (occ: PredefinedOccasion) => {
    if (!user) {
      onRequireAuth();
      return;
    }
    setConfirmModal({
      isOpen: true,
      title: 'تأكيد إضافة المناسبة إلى تقويم Google',
      description: `هل ترغب في إضافة "${occ.title}" بتاريخ ${occ.dateStr} م (${occ.hijriDate}) إلى تقويم Google الأساسي الخاص بك؟`,
      actionType: 'create_single',
      payload: occ,
    });
  };

  // Handle bulk sync confirmation
  const requestSyncAll = () => {
    if (!user) {
      onRequireAuth();
      return;
    }
    setConfirmModal({
      isOpen: true,
      title: 'تأكيد المزامنة الشاملة لجميع المناسبات',
      description: `هل ترغب في مزامنة أبرز مناسبات وأهلة عام 1448 هـ (${Math.min(
        availableOccasions.length,
        30
      )} مناسبة) مع تقويم Google الخاص بك؟`,
      actionType: 'create_all',
    });
  };

  // Handle delete confirmation
  const requestDelete = (item: GoogleCalendarItem) => {
    setConfirmModal({
      isOpen: true,
      title: 'تأكيد حذف الحدث من تقويم Google',
      description: `هل أنت متأكد من رغبتك في حذف "${item.summary}" من تقويم Google؟ لا يمكن التراجع عن هذا الإجراء.`,
      actionType: 'delete_single',
      payload: item,
    });
  };

  // Execute confirmed action
  const handleConfirmAction = async () => {
    const { actionType, payload } = confirmModal;
    setConfirmModal({ ...confirmModal, isOpen: false });

    if (actionType === 'create_single' && payload) {
      const occ = payload as PredefinedOccasion;
      setSyncingId(occ.id);
      try {
        await createCalendarEvent({
          summary: occ.title,
          description: occ.description,
          startDate: occ.dateStr,
        });
        setStatusMessage({
          type: 'success',
          text: `تمت إضافة "${occ.title}" إلى تقويم Google بنجاح.`,
        });
        fetchEvents();
      } catch (err: any) {
        setStatusMessage({
          type: 'error',
          text: err.message || 'فشل في إضافة الحدث.',
        });
      } finally {
        setSyncingId(null);
      }
    } else if (actionType === 'create_all') {
      setIsLoading(true);
      let successCount = 0;
      try {
        for (const occ of availableOccasions.slice(0, 30)) {
          await createCalendarEvent({
            summary: occ.title,
            description: occ.description,
            startDate: occ.dateStr,
          });
          successCount++;
        }
        setStatusMessage({
          type: 'success',
          text: `تمت مزامنة ${successCount} مناسبة بنجاح مع تقويم Google!`,
        });
        fetchEvents();
      } catch (err: any) {
        setStatusMessage({
          type: 'error',
          text: `تمت مزامنة ${successCount} مناسبة، ثم حدث خطأ: ${err.message}`,
        });
      } finally {
        setIsLoading(false);
      }
    } else if (actionType === 'delete_single' && payload) {
      const item = payload as GoogleCalendarItem;
      setIsLoading(true);
      try {
        await deleteCalendarEvent(item.id);
        setStatusMessage({
          type: 'success',
          text: `تم حذف "${item.summary}" من تقويم Google بنجاح.`,
        });
        fetchEvents();
      } catch (err: any) {
        setStatusMessage({
          type: 'error',
          text: err.message || 'فشل في حذف الحدث.',
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md animate-fade-in text-stone-100">
      <div className="bg-stone-950 border border-amber-600/40 rounded-3xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl relative">
        
        {/* Header */}
        <div className="px-5 py-4 bg-gradient-to-r from-stone-950 via-amber-950/60 to-stone-950 border-b border-amber-700/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <CalendarIcon className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-amber-200 font-amiri flex items-center gap-2">
                <span>مزامنة المناسبات مع تقويم Google</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-950 border border-amber-500/30 text-amber-300 font-sans">
                  Google Calendar
                </span>
              </h2>
              <p className="text-xs text-stone-400 font-tajawal">
                أضف أوائل الشهور ومناسبات أهل البيت (ع) لعام 1448 هـ إلى تطبيق التقويم في هاتفك
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-stone-900/80 hover:bg-stone-800 text-stone-300 hover:text-white border border-stone-800 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Status Message Alert */}
        {statusMessage && (
          <div
            className={`px-4 py-2.5 text-xs flex items-center justify-between border-b ${
              statusMessage.type === 'success'
                ? 'bg-emerald-950/70 border-emerald-600/40 text-emerald-200'
                : 'bg-rose-950/70 border-rose-600/40 text-rose-200'
            }`}
          >
            <div className="flex items-center gap-2">
              {statusMessage.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              )}
              <span>{statusMessage.text}</span>
            </div>
            <button
              onClick={() => setStatusMessage(null)}
              className="text-stone-400 hover:text-white text-xs px-1"
            >
              ✕
            </button>
          </div>
        )}

        {/* Not Logged In Banner */}
        {!user && (
          <div className="p-4 bg-amber-950/40 border-b border-amber-600/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2.5 text-amber-200">
              <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0" />
              <span>يتطلب مزامنة المناسبات تسجيل الدخول الاختياري بحساب Google الخاص بك لمنح الصلاحية مع تقويمك.</span>
            </div>
            <button
              onClick={onRequireAuth}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-xs shadow-md transition-all active:scale-95 whitespace-nowrap"
            >
              تسجيل الدخول بحساب Google
            </button>
          </div>
        )}

        {/* Tabs and Bulk Action Ribbon */}
        <div className="px-4 sm:px-5 py-2.5 bg-stone-900/60 border-b border-stone-850 flex items-center justify-between flex-wrap gap-2 text-xs">
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setActiveTab('available')}
              className={`px-3 py-1.5 rounded-xl font-medium transition-all ${
                activeTab === 'available'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              المناسبات المتاحة للعام ({availableOccasions.length})
            </button>

            {user && (
              <button
                onClick={() => {
                  setActiveTab('synced');
                  fetchEvents();
                }}
                className={`px-3 py-1.5 rounded-xl font-medium transition-all ${
                  activeTab === 'synced'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                أحداث تقويمك ({syncedEvents.length})
              </button>
            )}
          </div>

          {user && activeTab === 'available' && (
            <button
              onClick={requestSyncAll}
              disabled={isLoading}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-600/90 hover:bg-amber-500 text-stone-950 font-bold text-xs shadow-sm transition-all active:scale-95 disabled:opacity-50"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>مزامنة أبرز المناسبات للتقويم</span>
            </button>
          )}

          {user && activeTab === 'synced' && (
            <button
              onClick={fetchEvents}
              disabled={isLoading}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs transition-all"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
              <span>تحديث القائمة</span>
            </button>
          )}
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-2.5">
          {activeTab === 'available' ? (
            <div className="space-y-2">
              {availableOccasions.map((occ) => {
                const isSyncing = syncingId === occ.id;
                return (
                  <div
                    key={occ.id}
                    className="p-3 rounded-2xl bg-stone-900/80 border border-stone-800/90 hover:border-amber-600/30 transition-all flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="flex items-start gap-2.5">
                      <div
                        className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                          occ.category === 'crescent'
                            ? 'bg-amber-500/20 text-amber-400'
                            : occ.category === 'shahadah'
                            ? 'bg-rose-500/20 text-rose-400'
                            : occ.category === 'eid'
                            ? 'bg-emerald-500/20 text-emerald-400'
                            : 'bg-indigo-500/20 text-indigo-400'
                        }`}
                      >
                        <CalendarCheck className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold text-stone-100 font-amiri text-sm">{occ.title}</div>
                        <div className="text-[11px] text-stone-400 flex items-center gap-2 mt-0.5">
                          <span className="text-amber-300">{occ.hijriDate}</span>
                          <span>•</span>
                          <span className="text-stone-400 font-mono">{occ.dateStr} م</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => requestSyncSingle(occ)}
                      disabled={isSyncing || isLoading}
                      className="px-3 py-1.5 rounded-xl bg-stone-800 hover:bg-amber-600 hover:text-stone-950 text-amber-200 border border-amber-600/20 text-xs font-medium transition-all active:scale-95 flex items-center gap-1.5 shrink-0"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>{isSyncing ? 'جارٍ الإضافة...' : 'إضافة للتقويم'}</span>
                    </button>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="space-y-2">
              {syncedEvents.length === 0 ? (
                <div className="text-center py-12 text-stone-500 text-xs">
                  <CalendarIcon className="w-10 h-10 mx-auto text-stone-600 mb-2 opacity-50" />
                  <p>لا توجد أحداث مسترجعة حالياً من تقويم Google الأساسي.</p>
                </div>
              ) : (
                syncedEvents.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 rounded-2xl bg-stone-900/80 border border-stone-800 flex items-center justify-between gap-3 text-xs"
                  >
                    <div>
                      <div className="font-bold text-stone-200 font-amiri text-sm">{item.summary}</div>
                      <div className="text-[11px] text-stone-400 mt-0.5">
                        التاريخ:{' '}
                        <span className="font-mono text-amber-300">
                          {item.start?.date || item.start?.dateTime?.split('T')[0] || 'مستمر'}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {item.htmlLink && (
                        <a
                          href={item.htmlLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 transition-all"
                          title="فتح في Google Calendar"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                      <button
                        onClick={() => requestDelete(item)}
                        className="p-2 rounded-xl bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 border border-rose-600/30 transition-all"
                        title="حذف من التقويم"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 bg-stone-950 border-t border-stone-850 flex items-center justify-between text-[11px] text-stone-400">
          <span>يتم الحفظ المباشر في حساب Google Calendar الخاص بك.</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 font-medium transition-all"
          >
            إغلاق
          </button>
        </div>

        {/* Mandatory Explicit User Confirmation Dialog for Destructive & Mutating Operations */}
        {confirmModal.isOpen && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-fade-in">
            <div className="bg-stone-900 border border-amber-500/50 rounded-3xl p-5 max-w-md w-full shadow-2xl text-stone-100 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
                  <AlertCircle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold font-amiri text-base text-amber-200">
                    {confirmModal.title}
                  </h3>
                  <p className="text-xs text-stone-400">طلب تأكيد من المستخدم</p>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed bg-stone-950/60 p-3 rounded-2xl border border-stone-800">
                {confirmModal.description}
              </p>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  onClick={() => setConfirmModal({ ...confirmModal, isOpen: false })}
                  className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-medium transition-all"
                >
                  إلغاء
                </button>
                <button
                  onClick={handleConfirmAction}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 text-xs font-bold shadow-md transition-all active:scale-95"
                >
                  موافق وتأكيد التنفيذ
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
