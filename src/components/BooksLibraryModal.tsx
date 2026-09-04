import React, { useState, useMemo } from 'react';
import {
  X,
  Search,
  BookOpen,
  Download,
  Copy,
  Check,
  ExternalLink,
  BookMarked,
  Layers,
  Sparkles,
  Maximize2,
  Minimize2,
  Library,
  Tag,
} from 'lucide-react';
import { BOOKS_DATA, BookItem } from '../data/booksData';

interface BooksLibraryModalProps {
  onClose: () => void;
  initialCategory?: string;
}

export const BooksLibraryModal: React.FC<BooksLibraryModalProps> = ({ onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeBookForReading, setActiveBookForReading] = useState<BookItem | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isPdfFullScreen, setIsPdfFullScreen] = useState(false);

  // Category counts
  const categoryCounts = useMemo(() => {
    return {
      all: BOOKS_DATA.length,
      fatwa: BOOKS_DATA.filter((b) => b.category === 'fatwa').length,
      simplified: BOOKS_DATA.filter((b) => b.category === 'simplified').length,
      hajj: BOOKS_DATA.filter((b) => b.category === 'hajj').length,
      crescent_fasting: BOOKS_DATA.filter((b) => b.category === 'crescent_fasting').length,
    };
  }, []);

  // Filtered books
  const filteredBooks = useMemo(() => {
    return BOOKS_DATA.filter((book) => {
      const matchesCategory =
        selectedCategory === 'all' || book.category === selectedCategory;

      if (!matchesCategory) return false;

      if (!searchQuery.trim()) return true;

      const query = searchQuery.trim().toLowerCase();
      const titleMatch = book.title.toLowerCase().includes(query);
      const subtitleMatch = book.subtitle?.toLowerCase().includes(query) || false;
      const descMatch = book.description.toLowerCase().includes(query);
      const topicsMatch = book.topics.some((t) => t.toLowerCase().includes(query));

      return titleMatch || subtitleMatch || descMatch || topicsMatch;
    });
  }, [selectedCategory, searchQuery]);

  const handleCopyLink = async (book: BookItem) => {
    try {
      await navigator.clipboard.writeText(book.pdfUrl);
      setCopiedId(book.id);
      setTimeout(() => {
        setCopiedId(null);
      }, 2200);
    } catch {
      // Fallback
      setCopiedId(book.id);
      setTimeout(() => setCopiedId(null), 2200);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto animate-fadeIn">
      {/* Container Dialog */}
      <div
        id="books-library-dialog"
        className="relative w-full max-w-5xl bg-stone-950 border border-amber-600/30 rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden my-auto"
      >
        {/* Top Decorative Amber Line */}
        <div className="h-1.5 bg-gradient-to-r from-amber-600 via-amber-400 to-amber-600 shrink-0" />

        {/* Modal Header */}
        <div className="px-4 sm:px-6 pt-5 pb-4 bg-gradient-to-b from-stone-900/90 to-stone-950 border-b border-stone-800/80 flex items-start justify-between gap-4 shrink-0">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/60 border border-amber-600/30 text-amber-300 text-xs font-medium">
              <Library className="w-3.5 h-3.5 text-amber-400" />
              <span>مكتبة المؤلفات الفقهية الرسمية</span>
              <span className="w-1 h-1 rounded-full bg-amber-400" />
              <span className="font-bold">١٣ كتاباً معتمداً (PDF)</span>
            </div>

            <h2 className="text-xl sm:text-2xl md:text-3xl font-amiri font-bold text-amber-100 flex items-center gap-2">
              <span>مؤلفات مكتب سماحة السيد السيستاني (دام ظله)</span>
            </h2>

            <p className="text-xs sm:text-sm text-stone-400 font-tajawal max-w-2xl leading-relaxed">
              تصفح وحمل الرسائل العملية والكتب الفتوائية ومناسك الحج وأحكام رؤية الهلال الصادرة رسمياً عن مكتب سماحة المرجع الديني الأعلى بالنجف الأشرف بصيغة PDF عالية الدقة.
            </p>
          </div>

          <button
            onClick={onClose}
            id="btn-close-books-library"
            className="p-2 text-stone-400 hover:text-white bg-stone-900/80 hover:bg-stone-800 rounded-xl border border-stone-700/60 transition-all shrink-0"
            title="إغلاق المكتبة"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="px-4 sm:px-6 py-3.5 bg-stone-900/60 border-b border-stone-800/80 space-y-3 shrink-0">
          {/* Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 text-stone-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              id="input-search-books"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث في عناوين الكتب، الأبواب الفقهية، أو الموضوعات (مثل: الصوم، الهلال، الخمس، الحج، البيع)..."
              className="w-full pr-10 pl-10 py-2 sm:py-2.5 bg-stone-950 border border-stone-800 rounded-xl text-xs sm:text-sm text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/40 font-tajawal transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-200 p-1"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 text-xs no-scrollbar">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-all flex items-center gap-1.5 ${
                selectedCategory === 'all'
                  ? 'bg-amber-600 text-stone-950 font-bold shadow-sm'
                  : 'bg-stone-800/80 text-stone-300 hover:text-stone-100 hover:bg-stone-700/60'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>جميع المؤلفات ({categoryCounts.all})</span>
            </button>

            <button
              onClick={() => setSelectedCategory('fatwa')}
              className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-all flex items-center gap-1.5 ${
                selectedCategory === 'fatwa'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50 font-bold'
                  : 'bg-stone-800/80 text-stone-300 hover:text-stone-100 hover:bg-stone-700/60'
              }`}
            >
              <BookMarked className="w-3.5 h-3.5" />
              <span>الرسائل العملية الكبرى ({categoryCounts.fatwa})</span>
            </button>

            <button
              onClick={() => setSelectedCategory('simplified')}
              className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-all flex items-center gap-1.5 ${
                selectedCategory === 'simplified'
                  ? 'bg-teal-500/20 text-teal-300 border border-teal-500/50 font-bold'
                  : 'bg-stone-800/80 text-stone-300 hover:text-stone-100 hover:bg-stone-700/60'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>الفقه الميسر والتعليمي ({categoryCounts.simplified})</span>
            </button>

            <button
              onClick={() => setSelectedCategory('hajj')}
              className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-all flex items-center gap-1.5 ${
                selectedCategory === 'hajj'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 font-bold'
                  : 'bg-stone-800/80 text-stone-300 hover:text-stone-100 hover:bg-stone-700/60'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>الحج والعمرة ({categoryCounts.hajj})</span>
            </button>

            <button
              onClick={() => setSelectedCategory('crescent_fasting')}
              className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-all flex items-center gap-1.5 ${
                selectedCategory === 'crescent_fasting'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 font-bold'
                  : 'bg-stone-800/80 text-stone-300 hover:text-stone-100 hover:bg-stone-700/60'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>الأهلة والصيام ({categoryCounts.crescent_fasting})</span>
            </button>
          </div>
        </div>

        {/* Books List / Grid Container */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {filteredBooks.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <BookOpen className="w-12 h-12 text-stone-600 mx-auto stroke-1" />
              <p className="text-stone-300 font-medium font-amiri text-lg">
                لم يتم العثور على مؤلفات مطابقة لبحثك
              </p>
              <p className="text-stone-500 text-xs font-tajawal">
                جرّب البحث بكلمة أخرى أو تصفية تصنيف مختلف
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="text-amber-400 text-xs underline font-medium"
              >
                عرض كافة الكتب (١٣)
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredBooks.map((book) => {
                const isCopied = copiedId === book.id;

                return (
                  <div
                    key={book.id}
                    id={`book-card-${book.id}`}
                    className={`relative rounded-2xl bg-gradient-to-br from-stone-900/90 to-stone-950 border ${book.coverColor.border} p-4 sm:p-5 flex flex-col justify-between transition-all hover:border-amber-500/50 hover:shadow-xl hover:shadow-amber-950/20 group`}
                  >
                    {/* Top Info Bar */}
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between gap-2 flex-wrap text-xs">
                        <span
                          className={`px-2.5 py-0.5 rounded-full ${book.coverColor.badgeBg} ${book.coverColor.badgeText} font-medium border border-current/20 flex items-center gap-1`}
                        >
                          <BookMarked className="w-3 h-3" />
                          <span>{book.categoryLabel}</span>
                        </span>

                        {book.edition && (
                          <span className="text-[11px] text-stone-400 font-tajawal bg-stone-950/80 px-2 py-0.5 rounded-md border border-stone-800">
                            {book.edition}
                          </span>
                        )}
                      </div>

                      {/* Title & Subtitle */}
                      <div>
                        <h3 className="text-lg sm:text-xl font-amiri font-bold text-stone-100 group-hover:text-amber-300 transition-colors leading-snug">
                          {book.title}
                        </h3>
                        {book.subtitle && (
                          <p className="text-xs text-amber-400/90 font-medium font-tajawal mt-0.5">
                            {book.subtitle}
                          </p>
                        )}
                      </div>

                      {/* Author */}
                      <p className="text-[11px] text-stone-400 font-tajawal">
                        {book.author}
                      </p>

                      {/* Description */}
                      <p className="text-xs text-stone-300 font-tajawal leading-relaxed line-clamp-3">
                        {book.description}
                      </p>

                      {/* Topic Pills */}
                      <div className="flex items-center gap-1.5 flex-wrap pt-1">
                        <Tag className="w-3 h-3 text-stone-500 shrink-0" />
                        {book.topics.slice(0, 4).map((topic, i) => (
                          <span
                            key={i}
                            className="text-[10px] px-2 py-0.5 rounded-md bg-stone-950 text-stone-400 border border-stone-800 font-tajawal"
                          >
                            {topic}
                          </span>
                        ))}
                        {book.topics.length > 4 && (
                          <span className="text-[10px] text-stone-500 font-tajawal">
                            +{book.topics.length - 4} أبواب
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Bottom Action Buttons */}
                    <div className="pt-4 mt-3 border-t border-stone-800/80 flex items-center justify-between gap-2 flex-wrap">
                      <div className="flex items-center gap-2">
                        {/* Read in App button */}
                        <button
                          onClick={() => setActiveBookForReading(book)}
                          id={`btn-read-${book.id}`}
                          className="px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm active:scale-95"
                        >
                          <BookOpen className="w-3.5 h-3.5" />
                          <span>تصفح الكتاب</span>
                        </button>

                        {/* Direct Download button */}
                        <a
                          href={book.pdfUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          id={`btn-download-${book.id}`}
                          className="px-3 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-amber-200 text-xs font-medium border border-stone-700 transition-all flex items-center gap-1.5 active:scale-95"
                        >
                          <Download className="w-3.5 h-3.5 text-amber-400" />
                          <span>تحميل PDF</span>
                        </a>
                      </div>

                      {/* Copy Link button */}
                      <button
                        onClick={() => handleCopyLink(book)}
                        id={`btn-copy-${book.id}`}
                        className={`p-1.5 rounded-lg border transition-all flex items-center gap-1 text-xs ${
                          isCopied
                            ? 'bg-emerald-950/80 text-emerald-300 border-emerald-600/40'
                            : 'bg-stone-900/90 text-stone-400 hover:text-stone-200 border-stone-800 hover:border-stone-700'
                        }`}
                        title="نسخ الرابط المباشر للملف"
                      >
                        {isCopied ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-[11px] font-medium font-tajawal">تم النسخ</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span className="text-[11px] font-tajawal">نسخ الرابط</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer Note */}
        <div className="px-4 sm:px-6 py-3 bg-stone-950 border-t border-stone-900 text-center text-xs text-stone-500 font-tajawal shrink-0 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>
            المصدر الرسمي: الموقع الإلكتروني لمكتب سماحة السيد السيستاني (دام ظله) — النجف الأشرف
          </span>
          <span className="text-amber-500/80 font-amiri">
            روابط مباشرة لملفات الـ PDF المعتمدة
          </span>
        </div>
      </div>

      {/* Embedded PDF Viewer Modal */}
      {activeBookForReading && (
        <div
          id="pdf-reader-overlay"
          className={`fixed inset-0 z-60 bg-black/95 flex flex-col transition-all duration-300 ${
            isPdfFullScreen ? 'p-0' : 'p-2 sm:p-5'
          }`}
        >
          {/* Reader Header */}
          <div className="px-4 py-3 bg-stone-950 border-b border-stone-800 text-stone-100 flex items-center justify-between gap-3 shrink-0">
            <div className="flex items-center gap-2 overflow-hidden">
              <BookOpen className="w-5 h-5 text-amber-400 shrink-0" />
              <div className="truncate">
                <h4 className="text-sm sm:text-base font-amiri font-bold text-amber-100 truncate">
                  {activeBookForReading.title}
                </h4>
                <p className="text-xs text-stone-400 truncate">
                  {activeBookForReading.subtitle || activeBookForReading.categoryLabel}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {/* Open in new window */}
              <a
                href={activeBookForReading.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-stone-200 text-xs border border-stone-700 transition-all"
              >
                <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline">نافذة جديدة</span>
              </a>

              {/* Fullscreen toggle */}
              <button
                onClick={() => setIsPdfFullScreen(!isPdfFullScreen)}
                className="p-2 text-stone-400 hover:text-white bg-stone-900 hover:bg-stone-800 rounded-lg border border-stone-700 transition-all"
                title={isPdfFullScreen ? 'تصغير' : 'ملء الشاشة'}
              >
                {isPdfFullScreen ? (
                  <Minimize2 className="w-4 h-4" />
                ) : (
                  <Maximize2 className="w-4 h-4" />
                )}
              </button>

              {/* Close Reader */}
              <button
                onClick={() => {
                  setActiveBookForReading(null);
                  setIsPdfFullScreen(false);
                }}
                className="p-2 text-stone-400 hover:text-white bg-stone-900 hover:bg-rose-900/40 rounded-lg border border-stone-700 transition-all"
                title="إغلاق القارئ"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Reader Body (iframe with direct fallback) */}
          <div className="flex-1 relative bg-stone-900 flex flex-col">
            <iframe
              src={`https://docs.google.com/viewer?url=${encodeURIComponent(
                activeBookForReading.pdfUrl
              )}&embedded=true`}
              title={activeBookForReading.title}
              className="w-full h-full border-0 flex-1"
            />

            {/* Quick Fallback Ribbon */}
            <div className="bg-stone-950/90 py-2 px-4 border-t border-stone-800 text-center text-xs text-stone-400 flex items-center justify-between gap-2">
              <span className="truncate">
                إذا تأخر تحميل المعاينة في المتصفح، يمكنك الفتح المباشر أو التحميل:
              </span>
              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={activeBookForReading.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-400 hover:text-amber-300 font-bold underline text-xs"
                >
                  فتح ملف الـ PDF مباشرة
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
