import React, { useState, useMemo } from 'react';
import {
  BookOpen,
  Search,
  Sparkles,
  Library,
  Scale,
  ShieldCheck,
  ChevronLeft,
  ChevronDown,
  Copy,
  Check,
  ExternalLink,
  HelpCircle,
  FileText,
  Compass,
  Bookmark,
  Send,
  Loader2,
} from 'lucide-react';
import { FIQH_BOOKS_DATA, FiqhBook, FiqhRuling } from '../data/fiqhLibraryData';

interface FiqhSectionViewProps {
  onOpenFiqhAI: (initialQuestion?: string) => void;
  onOpenFullTextLibrary: (bookId?: string) => void;
}

const FIQH_PORTALS = [
  { id: 'all', title: 'كافة الأبواب', icon: '📚' },
  { id: 'ibadat', title: 'العبادات والصلاة والطهارة', icon: '🕌', query: 'أحكام الصلاة والطهارة والشكوك' },
  { id: 'sawm', title: 'الصوم والمفطرات وشهر رمضان', icon: '🍵', query: 'المفطرات وبخاخ الربو وكفارة الصوم' },
  { id: 'hilal', title: 'فقه الأهلة والمراصد والرؤية', icon: '🌙', query: 'ثبوت الهلال بالمراصد واختلاف الأفق' },
  { id: 'hajj', title: 'مناسك الحج والعمرة والزيارة', icon: '🕋', query: 'شروط الاستطاعة وأعمال عمرة التمتع' },
  { id: 'muamalat', title: 'المعاملات والتجارة والبنوك', icon: '⚖️', query: 'الربا والقروض والمعاملات البنكية' },
  { id: 'nikah', title: 'الأسرة والنكاح والطلاق', icon: '💍', query: 'أحكام عقد النكاح والمهر والعدة' },
  { id: 'khums', title: 'الخمس والزكاة والحقوق', icon: '💰', query: 'حساب رأس السنة الخمسية والمؤونة' },
  { id: 'mughtaribin', title: 'فقه المغتربين والمسائل المعاصرة', icon: '🌍', query: 'اللحوم في بلاد الغرب والتذكية والمهجر' },
  { id: 'usul', title: 'الأصول والقواعد الفقهية', icon: '📜', query: 'قاعدة لا ضرر ونظرية الحكم السلطاني والمعنى الحرفي والمشتق' },
];

const SAMPLE_FATWA_QUESTIONS = [
  'ما هو حكم استعمال بخاخ الربو للصائم في نهار شهر رمضان؟',
  'هل يثبت الهلال شرعاً بالرؤية عبر التلسكوبات والمراصد الفلكية المقربة؟',
  'ما هو مفاد قاعدة «لا ضرر ولا ضرار» ونظرية الحكم السلطاني لسماحة السيد؟',
  'متى تجب صلاة القصر على المسافر وما هو حد الترخص والمسافة الشرعية؟',
  'ما هي شروط ثبوت الخمس في الفائض من مؤونة السنة؟',
  'ما هو مبنى سماحة السيد السيستاني في المعنى الحرفي في كتاب الرافد؟',
];

export const FiqhSectionView: React.FC<FiqhSectionViewProps> = ({
  onOpenFiqhAI,
  onOpenFullTextLibrary,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activePortal, setActivePortal] = useState('all');
  const [copiedRulingId, setCopiedRulingId] = useState<string | null>(null);
  const [quickQuestionInput, setQuickQuestionInput] = useState('');

  // Filtered books based on portal and search
  const filteredBooks = useMemo(() => {
    return FIQH_BOOKS_DATA.filter((book) => {
      // Filter by portal category if not all
      if (activePortal === 'hajj' && book.category !== 'hajj') return false;
      if (activePortal === 'sawm' && book.category !== 'crescent_fasting' && book.id !== 'menhaj-1') return false;
      if (activePortal === 'hilal' && book.id !== 'hilal-qa') return false;
      if (activePortal === 'usul' && book.category !== 'usul_and_qawaid') return false;

      if (!searchQuery.trim()) return true;

      const q = searchQuery.trim().toLowerCase();
      const matchTitle = book.title.toLowerCase().includes(q);
      const matchSubtitle = book.subtitle.toLowerCase().includes(q);
      const matchSummary = book.summary.toLowerCase().includes(q);
      const matchRulings = book.chapters.some((ch) =>
        ch.rulings.some(
          (r) =>
            r.title.toLowerCase().includes(q) ||
            r.text.toLowerCase().includes(q) ||
            (r.rulingNumber && r.rulingNumber.includes(q))
        )
      );

      return matchTitle || matchSubtitle || matchSummary || matchRulings;
    });
  }, [activePortal, searchQuery]);

  const handleCopyRuling = async (ruling: FiqhRuling) => {
    const textToCopy = `«${ruling.title}»\n${ruling.rulingNumber ? ruling.rulingNumber + ': ' : ''}${ruling.text}\n\nالمصدر: ${ruling.bookTitle}، ص ${ruling.pageNumber}\n(مكتب سماحة السيد السيستاني دام ظله)`;
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopiedRulingId(ruling.id);
      setTimeout(() => setCopiedRulingId(null), 2000);
    } catch {
      setCopiedRulingId(ruling.id);
      setTimeout(() => setCopiedRulingId(null), 2000);
    }
  };

  const handleQuickQuestionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickQuestionInput.trim()) return;
    onOpenFiqhAI(quickQuestionInput.trim());
    setQuickQuestionInput('');
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 sm:space-y-8 animate-fadeIn">
      {/* ============================================================
          1. GRAND SEMINARY HERO BANNER (الواجهة الفقهية الحوزوية الكبرى)
         ============================================================ */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-emerald-950/95 via-stone-900/95 to-emerald-950/90 border-2 border-amber-500/40 p-5 sm:p-7 text-stone-100 shadow-[0_15px_40px_rgba(3,43,31,0.4)]">
        {/* Subtle Islamic corner embellishment */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-bl-full pointer-events-none blur-2xl" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-emerald-500/15 rounded-tr-full pointer-events-none blur-2xl" />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-5">
          <div className="space-y-2.5 text-center md:text-right">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/80 border border-emerald-400/40 text-amber-300 text-xs font-scheherazade font-bold shadow-inner">
              <Library className="w-4 h-4 text-amber-400" />
              <span>المكتبة الفقهية النصية الشاملة • ١٥ مؤلفاً معتمداً</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-scheherazade font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-300 to-amber-100 tracking-wide">
              القسم الفقهي والأحكام الشرعية
            </h2>

            <p className="text-xs sm:text-sm text-emerald-100/90 font-amiri max-w-2xl leading-relaxed">
              الموسوعة الفقهية الصادرة عن مكتب سماحة آية الله العظمى السيد علي الحسيني السيستاني (دام ظله) بالنجف الأشرف. تضم المتون الكاملة لمنهاج الصالحين بأجزائه الثلاثة، والمسائل المنتخبة، والعروة الوثقى، ومناسك الحج، وفقه الأهلة، وبحوث «قاعدة لا ضرر» و«الرافد في علم الأصول».
            </p>
          </div>

          {/* Quick Launch Action Button */}
          <div className="flex flex-col sm:flex-row md:flex-col gap-2.5 shrink-0 w-full md:w-auto">
            <button
              onClick={() => onOpenFiqhAI()}
              id="btn-fiqh-section-hero-ai"
              className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-scheherazade font-bold text-sm sm:text-base flex items-center justify-center gap-2 transition-all shadow-lg active:scale-95 ring-2 ring-amber-300/60"
            >
              <Sparkles className="w-4 h-4 text-stone-950" />
              <span>اسأل المساعد الفقهي الذكي</span>
            </button>

            <button
              onClick={() => onOpenFullTextLibrary()}
              id="btn-fiqh-section-hero-reader"
              className="px-5 py-2.5 rounded-2xl bg-emerald-900/70 hover:bg-emerald-800/80 border border-emerald-400/40 text-emerald-200 font-scheherazade font-bold text-sm flex items-center justify-center gap-2 transition-all active:scale-95 shadow-md"
            >
              <BookOpen className="w-4 h-4 text-amber-400" />
              <span>فتح المتصفح النصي للكتب</span>
            </button>
          </div>
        </div>
      </div>

      {/* ============================================================
          2. EMBEDDED QUICK FIQH AI INTERACTIVE CONSOLE
         ============================================================ */}
      <div className="rounded-2xl bg-gradient-to-br from-stone-900 via-emerald-950/40 to-stone-900 border border-emerald-600/30 p-4 sm:p-5 shadow-lg space-y-3">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-400/40 text-amber-300 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-scheherazade font-bold text-amber-200">
                طرح مسألة فقهية أو أصولية مباشرة (مستندة للمصادر الـ ١٥ حصراً)
              </h3>
              <p className="text-[11px] text-stone-400 font-tajawal">
                احصل على الجواب الفقهي الموثق مع ذكر الكتاب ورقم الصفحة والمسألة فوراً.
              </p>
            </div>
          </div>
          <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500/40 font-bold">
            دقة فتوائية معتمدة
          </span>
        </div>

        {/* Input Form */}
        <form onSubmit={handleQuickQuestionSubmit} className="relative flex items-center">
          <input
            type="text"
            value={quickQuestionInput}
            onChange={(e) => setQuickQuestionInput(e.target.value)}
            placeholder="اكتب مسألتك الشرعية هنا (مثال: ما هو حكم الشك في ركعات الصلاة الرباعية؟)..."
            className="w-full bg-stone-950/90 border border-emerald-700/50 rounded-xl py-3 pr-4 pl-24 text-xs sm:text-sm text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/50 font-amiri"
          />
          <button
            type="submit"
            disabled={!quickQuestionInput.trim()}
            className="absolute left-1.5 px-4 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 disabled:opacity-50 text-stone-950 font-bold text-xs flex items-center gap-1.5 transition-all active:scale-95"
          >
            <span>إرسال</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>

        {/* Suggested Quick Questions Pills */}
        <div className="pt-1">
          <span className="text-[11px] text-stone-400 font-scheherazade block mb-1.5">
            مسائل شائعة يمكنك النقر عليها للاستفتاء الفوري:
          </span>
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            {SAMPLE_FATWA_QUESTIONS.map((q, idx) => (
              <button
                key={idx}
                onClick={() => onOpenFiqhAI(q)}
                className="px-2.5 py-1 rounded-lg bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-700/40 text-emerald-200 text-[11px] whitespace-nowrap transition-all font-amiri hover:text-amber-200"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ============================================================
          3. THE 8 MAJOR JURISPRUDENTIAL GATES (أبواب الفقه الكبرى)
         ============================================================ */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-base sm:text-lg font-scheherazade font-bold text-emerald-200 flex items-center gap-2">
            <Scale className="w-4 h-4 text-amber-400" />
            <span>أبواب الفقه الإسلامي وموضوعات الرسائل العملية</span>
          </h3>
          <span className="text-xs text-stone-400 font-tajawal">
            اختر الباب لعرض كتبه ومسائله
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
          {FIQH_PORTALS.map((portal) => (
            <button
              key={portal.id}
              onClick={() => {
                setActivePortal(portal.id);
                if (portal.query && portal.id !== 'all') {
                  setSearchQuery('');
                }
              }}
              className={`p-3 rounded-xl border text-right transition-all flex flex-col justify-between ${
                activePortal === portal.id
                  ? 'bg-emerald-900/90 border-amber-400 text-amber-200 shadow-md ring-1 ring-amber-400/40'
                  : 'bg-stone-900/70 hover:bg-emerald-950/60 border-stone-800 hover:border-emerald-700/50 text-stone-300'
              }`}
            >
              <div className="flex items-center justify-between gap-1 mb-1">
                <span className="text-lg">{portal.icon}</span>
                {activePortal === portal.id && (
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                )}
              </div>
              <span className="text-xs sm:text-sm font-scheherazade font-bold line-clamp-1">
                {portal.title}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* ============================================================
          4. SEARCH INPUT ACROSS 13 CANONICAL TEXTUAL BOOKS
         ============================================================ */}
      <div className="flex items-center gap-2 p-1.5 bg-stone-900/90 border border-emerald-600/40 rounded-2xl shadow-inner">
        <div className="px-3 text-emerald-400">
          <Search className="w-5 h-5" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="ابحث نصياً في متون المؤلفات الـ ١٣ (مثل: صلاة المسافر، بخاخ الربو، تطويق الهلال، الخمس، رأس السنة)..."
          className="w-full bg-transparent text-xs sm:text-sm text-stone-100 placeholder-stone-500 focus:outline-none font-amiri py-1.5"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="px-2.5 py-1 text-xs text-stone-400 hover:text-stone-200 rounded-lg"
          >
            مسح
          </button>
        )}
      </div>

      {/* ============================================================
          5. THE 13 CANONICAL BOOKS SHELF (المكتبة الفقهية الـ ١٣)
         ============================================================ */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <Library className="w-4 h-4 text-amber-400" />
            <h3 className="text-base sm:text-lg font-scheherazade font-bold text-amber-200">
              المؤلفات والرسائل الفقهية الـ ١٣ لسماحة السيد السيستاني
            </h3>
            <span className="px-2 py-0.5 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-300 text-[11px] font-bold">
              {filteredBooks.length} مؤلف
            </span>
          </div>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredBooks.map((book) => (
            <div
              key={book.id}
              className="rounded-2xl bg-gradient-to-br from-stone-900 via-emerald-950/30 to-stone-950 border border-emerald-700/40 hover:border-amber-500/50 p-4 sm:p-5 flex flex-col justify-between gap-3.5 transition-all shadow-md hover:shadow-emerald-950/50 group"
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <span className="px-2.5 py-0.5 rounded-md bg-emerald-950 border border-emerald-500/40 text-amber-300 text-[11px] font-bold font-scheherazade">
                    {book.categoryLabel}
                  </span>
                  <span className="text-[10px] text-stone-400 font-tajawal">
                    {book.edition}
                  </span>
                </div>

                <div>
                  <h4 className="text-base sm:text-lg font-scheherazade font-bold text-stone-100 group-hover:text-amber-200 transition-colors">
                    {book.title}
                  </h4>
                  <p className="text-xs text-emerald-300/90 font-amiri line-clamp-1 mt-0.5">
                    {book.subtitle}
                  </p>
                </div>

                <p className="text-xs text-stone-300/80 font-tajawal line-clamp-2 leading-relaxed">
                  {book.summary}
                </p>
              </div>

              {/* Rulings samples if present */}
              {book.chapters.length > 0 && (
                <div className="p-2.5 rounded-xl bg-stone-950/80 border border-emerald-900/60 text-[11px] space-y-1.5">
                  <div className="flex items-center justify-between text-stone-400 font-tajawal">
                    <span>نماذج من أبواب الكتاب:</span>
                    <span className="text-emerald-400 font-bold">{book.totalChapters} أبواب مفصلة</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {book.chapters.slice(0, 3).map((ch) => (
                      <span
                        key={ch.id}
                        className="px-2 py-0.5 rounded bg-stone-900 text-stone-300 text-[10px] font-amiri"
                      >
                        {ch.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-2 border-t border-emerald-900/40">
                <button
                  onClick={() => onOpenFullTextLibrary(book.id)}
                  className="flex-1 py-2 rounded-xl bg-emerald-900/60 hover:bg-emerald-800 text-emerald-100 text-xs font-scheherazade font-bold flex items-center justify-center gap-1.5 border border-emerald-500/40 transition-all active:scale-95"
                >
                  <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                  <span>تصفح وقراءة المتن</span>
                </button>

                <button
                  onClick={() => onOpenFiqhAI(`ما هي أهم المسائل في كتاب: ${book.title}؟`)}
                  className="px-3 py-2 rounded-xl bg-amber-600/20 hover:bg-amber-600/30 text-amber-300 text-xs font-bold flex items-center justify-center gap-1 border border-amber-500/40 transition-all active:scale-95"
                  title="استفتِ الذكاء الاصطناعي حول هذا الكتاب"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>استفتاء</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ============================================================
          6. SPOTLIGHT: فقه رؤية الهلال والمراصد عند سماحة السيد السيستاني
         ============================================================ */}
      <div className="rounded-2xl bg-gradient-to-br from-emerald-950/90 via-stone-900 to-emerald-950/70 border-2 border-emerald-500/40 p-4 sm:p-6 space-y-3.5 shadow-xl">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-400/40 text-amber-300 flex items-center justify-center">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-scheherazade font-bold text-amber-200">
              فقه رؤية الهلال والمراصد الفلكية في فتاوى السيد السيستاني
            </h3>
            <p className="text-[11px] text-stone-400 font-tajawal">
              مستخرجة من كتاب: «مسائل وردود حول رؤية الهلال» الطبعة المعتمدة
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm font-amiri">
          <div className="p-3 rounded-xl bg-stone-950/70 border border-emerald-700/40 space-y-1">
            <span className="font-bold text-amber-300 font-scheherazade block">
              ١. هل تكفي الحسابات والتوقعات الفلكية في ثبوت الهلال؟
            </span>
            <p className="text-stone-300 text-xs leading-relaxed">
              «لا عبرة بالتوقعات الفلكية في إثبات بداية الشهر ما لم توجب الاطمئنان بحصول الرؤية بالعين المجردة؛ فالمعيار الشرعي هو إمكانية الرؤية الحسية لا مجرد ولادة الهلال فلكياً».
            </p>
          </div>

          <div className="p-3 rounded-xl bg-stone-950/70 border border-emerald-700/40 space-y-1">
            <span className="font-bold text-amber-300 font-scheherazade block">
              ٢. حكم الرؤية بالتلسكوبات والمراصد المقربة
            </span>
            <p className="text-stone-300 text-xs leading-relaxed">
              «لا يكفي ثبوت الرؤية بالتلسكوب أو الآلات المقربة وحدها إذا لم يكن الهلال قابلاً للرؤية بالعين المجردة الاعتيادية في ذلك الأفق».
            </p>
          </div>

          <div className="p-3 rounded-xl bg-stone-950/70 border border-emerald-700/40 space-y-1">
            <span className="font-bold text-amber-300 font-scheherazade block">
              ٣. حكم تطويق الهلال (هل يدل على ليلتين؟)
            </span>
            <p className="text-stone-300 text-xs leading-relaxed">
              «تطويق الهلال (ظهور النور محيطاً بالقرص الخافت) ليس دليلاً شرعياً على أنه لليلة الثانية، بل يُعتبر ليلة الرؤية فقط».
            </p>
          </div>

          <div className="p-3 rounded-xl bg-stone-950/70 border border-emerald-700/40 space-y-1">
            <span className="font-bold text-amber-300 font-scheherazade block">
              ٤. حكم صيام يوم الشك في آخر شعبان
            </span>
            <p className="text-stone-300 text-xs leading-relaxed">
              «يوم الشك يُبنى على أنه متمم لشعبان؛ ولا يجوز صيامه بنية أنه من رمضان، بل يُصام بنية الاستحباب أو قضاء ما في الذمة، فإن ثبت لاحقاً أجزأ عنه».
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
