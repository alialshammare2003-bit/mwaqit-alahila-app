import React, { useState, useMemo } from 'react';
import {
  BookOpen,
  Search,
  BookMarked,
  Bot,
  Sparkles,
  Layers,
  FileText,
  Copy,
  Check,
  Tag,
  ArrowRight,
  ShieldCheck,
  ChevronLeft,
  ExternalLink,
} from 'lucide-react';
import { FIQH_BOOKS_DATA, FiqhBook, FiqhRuling } from '../data/fiqhLibraryData';

interface BooksSectionProps {
  onOpenFiqhAI: (initialQuestion?: string) => void;
  onOpenFullTextLibrary: (bookId?: string) => void;
}

export const BooksSection: React.FC<BooksSectionProps> = ({
  onOpenFiqhAI,
  onOpenFullTextLibrary,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Category counts
  const categoryCounts = useMemo(() => {
    return {
      all: FIQH_BOOKS_DATA.length,
      fatwa: FIQH_BOOKS_DATA.filter((b) => b.category === 'fatwa').length,
      simplified: FIQH_BOOKS_DATA.filter((b) => b.category === 'simplified').length,
      hajj: FIQH_BOOKS_DATA.filter((b) => b.category === 'hajj').length,
      crescent_fasting: FIQH_BOOKS_DATA.filter((b) => b.category === 'crescent_fasting').length,
      usul_and_qawaid: FIQH_BOOKS_DATA.filter((b) => b.category === 'usul_and_qawaid').length,
    };
  }, []);

  // Filtered books
  const filteredBooks = useMemo(() => {
    return FIQH_BOOKS_DATA.filter((book) => {
      const matchesCategory =
        selectedCategory === 'all' || book.category === selectedCategory;

      if (!matchesCategory) return false;

      if (!searchQuery.trim()) return true;

      const q = searchQuery.trim().toLowerCase();
      const titleMatch = book.title.toLowerCase().includes(q);
      const subtitleMatch = book.subtitle.toLowerCase().includes(q);
      const summaryMatch = book.summary.toLowerCase().includes(q);
      const rulingsMatch = book.chapters.some((ch) =>
        ch.rulings.some(
          (r) =>
            r.title.toLowerCase().includes(q) ||
            r.text.toLowerCase().includes(q) ||
            (r.rulingNumber && r.rulingNumber.includes(q))
        )
      );

      return titleMatch || subtitleMatch || summaryMatch || rulingsMatch;
    });
  }, [selectedCategory, searchQuery]);

  const handleCopyRuling = async (ruling: FiqhRuling) => {
    const textToCopy = `«${ruling.title}»\n${ruling.rulingNumber ? ruling.rulingNumber + ': ' : ''}${ruling.text}\n\nالمصدر: ${ruling.bookTitle}، ص ${ruling.pageNumber}\n(مكتب سماحة السيد السيستاني دام ظله)`;
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopiedId(ruling.id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      setCopiedId(ruling.id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  return (
    <section
      id="fiqh-books-textual-section"
      className="relative rounded-2xl sm:rounded-3xl bg-stone-950/90 border border-amber-600/30 overflow-hidden shadow-2xl p-4 sm:p-6 space-y-6"
    >
      {/* Golden Top Accent */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-600 via-amber-400 to-amber-600 opacity-90" />

      {/* Section Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-950/80 border border-amber-600/40 text-amber-300 text-xs font-medium flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5 text-amber-400" />
              <span>مكتبة النصوص الفقهية المبوبة</span>
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-stone-900 border border-stone-800 text-stone-300 text-xs font-mono">
              ١٥ مؤلفاً معتمداً
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl lg:text-3xl font-amiri font-bold text-amber-100">
            المكتبة الفقهية والأصولية النصية الشاملة
          </h2>
          <p className="text-xs sm:text-sm text-stone-400 font-tajawal max-w-2xl leading-relaxed">
            نصوص ومسائل فقهية وأصولية محررة ومبوبة بدقة طبقاً للمؤلفات الـ 15 الصادرة عن مكتب سماحة آية الله العظمى السيد علي الحسيني السيستاني (دام ظله) مع إحالة الصفحة والمسألة.
          </p>
        </div>

        {/* Action button: Open full Text library */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onOpenFullTextLibrary()}
            id="btn-open-full-fiqh-library"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-amber-200 border border-amber-600/40 text-xs sm:text-sm font-tajawal font-bold transition-all shadow-md active:scale-95"
          >
            <BookMarked className="w-4 h-4 text-amber-400" />
            <span>تصفح فهرس النصوص الكامل</span>
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* AI Assistant Banner: "اسألني سؤال فقهي" */}
      <div
        id="banner-fiqh-ai"
        className="rounded-2xl bg-gradient-to-r from-amber-950/70 via-stone-900/90 to-amber-950/50 border border-amber-500/50 p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl"
      >
        <div className="flex items-start sm:items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-amber-600 text-stone-950 flex items-center justify-center shrink-0 shadow-lg ring-4 ring-amber-600/20">
            <Bot className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-base sm:text-lg font-amiri font-bold text-amber-100">
                المساعد الذكي: «اسألني سؤال فقهي»
              </h3>
              <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 font-tajawal font-bold">
                مقتصر حصراً على المؤلفات الـ ١٥
              </span>
            </div>
            <p className="text-xs text-stone-300 font-tajawal leading-relaxed">
              اطرح أي سؤال شرعي أو أصولي، وسيقوم المساعد الذكي باستخراج الحكم بدقة متناهية من واقع نصوص الكتب الـ 15 مع ذكر اسم الكتاب ورقم الصفحة والمسألة.
            </p>
          </div>
        </div>

        <button
          onClick={() => onOpenFiqhAI()}
          id="btn-launch-fiqh-ai"
          className="w-full md:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold font-tajawal text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-lg active:scale-95 shrink-0"
        >
          <Sparkles className="w-4 h-4" />
          <span>اسألني سؤال فقهي الآن</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 no-scrollbar text-xs">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium font-tajawal transition-all whitespace-nowrap ${
              selectedCategory === 'all'
                ? 'bg-amber-600 text-stone-950 font-bold shadow-md'
                : 'bg-stone-900 text-stone-300 hover:bg-stone-800 border border-stone-800'
            }`}
          >
            جميع المؤلفات ({categoryCounts.all})
          </button>
          <button
            onClick={() => setSelectedCategory('fatwa')}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium font-tajawal transition-all whitespace-nowrap ${
              selectedCategory === 'fatwa'
                ? 'bg-amber-600 text-stone-950 font-bold shadow-md'
                : 'bg-stone-900 text-stone-300 hover:bg-stone-800 border border-stone-800'
            }`}
          >
            الرسائل الكبرى ({categoryCounts.fatwa})
          </button>
          <button
            onClick={() => setSelectedCategory('simplified')}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium font-tajawal transition-all whitespace-nowrap ${
              selectedCategory === 'simplified'
                ? 'bg-teal-600 text-stone-950 font-bold shadow-md'
                : 'bg-stone-900 text-stone-300 hover:bg-stone-800 border border-stone-800'
            }`}
          >
            الفقه الميسر ({categoryCounts.simplified})
          </button>
          <button
            onClick={() => setSelectedCategory('hajj')}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium font-tajawal transition-all whitespace-nowrap ${
              selectedCategory === 'hajj'
                ? 'bg-emerald-600 text-stone-950 font-bold shadow-md'
                : 'bg-stone-900 text-stone-300 hover:bg-stone-800 border border-stone-800'
            }`}
          >
            الحج والعمرة ({categoryCounts.hajj})
          </button>
          <button
            onClick={() => setSelectedCategory('crescent_fasting')}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium font-tajawal transition-all whitespace-nowrap ${
              selectedCategory === 'crescent_fasting'
                ? 'bg-cyan-600 text-stone-950 font-bold shadow-md'
                : 'bg-stone-900 text-stone-300 hover:bg-stone-800 border border-stone-800'
            }`}
          >
            الأهلة والصوم ({categoryCounts.crescent_fasting})
          </button>
          <button
            onClick={() => setSelectedCategory('usul_and_qawaid')}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium font-tajawal transition-all whitespace-nowrap ${
              selectedCategory === 'usul_and_qawaid'
                ? 'bg-amber-500 text-stone-950 font-bold shadow-md'
                : 'bg-stone-900 text-stone-300 hover:bg-stone-800 border border-stone-800'
            }`}
          >
            الأصول والقواعد ({categoryCounts.usul_and_qawaid})
          </button>
        </div>

        {/* Search Input */}
        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 text-stone-400 absolute right-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            id="search-books-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث في نصوص ومسائل الكتب..."
            className="w-full pr-9 pl-3 py-1.5 bg-stone-900/90 border border-stone-800 rounded-xl text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-amber-500/50 font-tajawal transition-all"
          />
        </div>
      </div>

      {/* Books Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredBooks.map((book) => {
          // Highlight first ruling sample
          const sampleRuling = book.chapters[0]?.rulings[0];
          const isRulingCopied = sampleRuling && copiedId === sampleRuling.id;

          return (
            <div
              key={book.id}
              id={`fiqh-book-card-${book.id}`}
              className="rounded-2xl bg-stone-900/70 border border-stone-800 hover:border-amber-500/50 p-4 sm:p-5 flex flex-col justify-between space-y-4 transition-all duration-200 hover:bg-stone-900/90 shadow-md group"
            >
              {/* Card Top */}
              <div className="space-y-2.5">
                <div className="flex items-start justify-between gap-2">
                  <span className="px-2 py-0.5 rounded-lg bg-amber-950/80 border border-amber-600/30 text-amber-300 text-[11px] font-tajawal font-medium">
                    {book.categoryLabel}
                  </span>
                  <span className="text-[11px] text-stone-400 font-mono">
                    {book.edition}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-amiri font-bold text-amber-100 group-hover:text-amber-300 transition-colors">
                  {book.title}
                </h3>
                <p className="text-xs text-stone-400 font-tajawal line-clamp-2">
                  {book.subtitle}
                </p>
                <p className="text-[11px] text-stone-500 font-tajawal line-clamp-2 leading-relaxed">
                  {book.summary}
                </p>
              </div>

              {/* Sample Extracted Text Section */}
              {sampleRuling && (
                <div className="rounded-xl bg-stone-950/90 border border-stone-800/90 p-3 space-y-2 text-right">
                  <div className="flex items-center justify-between text-[11px] text-amber-400 font-amiri font-bold">
                    <span>{sampleRuling.rulingNumber || 'مسألة محققة'}</span>
                    <span className="text-stone-500 font-tajawal font-normal text-[10px]">
                      ص {sampleRuling.pageNumber}
                    </span>
                  </div>
                  <h5 className="text-xs font-amiri font-bold text-stone-200 line-clamp-1">
                    {sampleRuling.title}
                  </h5>
                  <p className="text-[11px] font-amiri text-stone-300 line-clamp-3 leading-relaxed border-r-2 border-amber-600/50 pr-2">
                    {sampleRuling.text}
                  </p>
                </div>
              )}

              {/* Card Action Buttons */}
              <div className="pt-2 border-t border-stone-800/80 flex items-center gap-2">
                <button
                  onClick={() => onOpenFullTextLibrary(book.id)}
                  className="flex-1 py-2 px-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-amber-200 border border-stone-700 text-xs font-tajawal font-bold flex items-center justify-center gap-1.5 transition-all shadow-sm"
                >
                  <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                  <span>تصفح نصوص الكتاب</span>
                </button>

                <button
                  onClick={() =>
                    onOpenFiqhAI(
                      `ما هي أهم الأحكام الشرعية الواردة في كتاب: «${book.title}»؟ مع ذكر أرقام المسائل والصفحات.`
                    )
                  }
                  className="p-2 rounded-xl bg-amber-950/50 hover:bg-amber-900 text-amber-300 border border-amber-600/40 text-xs transition-all"
                  title="سؤال المساعد الذكي عن هذا الكتاب"
                >
                  <Bot className="w-4 h-4" />
                </button>

                {book.pdfFallbackUrl && (
                  <a
                    href={book.pdfFallbackUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-amber-300 border border-stone-700 hover:border-amber-500/50 text-xs transition-all flex items-center justify-center"
                    title="فتح أو تحميل النسخة الأصلية المصورة (PDF)"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Authority Note */}
      <div className="pt-2 border-t border-stone-900 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-stone-500 font-tajawal text-center sm:text-right">
        <div className="flex items-center gap-1.5 text-stone-400">
          <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
          <span>
            جميع النصوص والمسائل مستخرجة طبقاً للنسخ المحققة المعتمدة الصادرة عن مكتب المرجع الديني الأعلى السيد علي الحسيني السيستاني (دام ظله) — النجف الأشرف.
          </span>
        </div>
      </div>
    </section>
  );
};
