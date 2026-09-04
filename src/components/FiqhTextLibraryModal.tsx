import React, { useState, useMemo } from 'react';
import {
  X,
  Search,
  BookOpen,
  Copy,
  Check,
  Bot,
  Layers,
  Sparkles,
  BookMarked,
  Filter,
  Bookmark,
  ChevronRight,
  Share2,
  FileText,
  Tag,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import { FIQH_BOOKS_DATA, FiqhBook, FiqhRuling, FiqhChapter } from '../data/fiqhLibraryData';

interface FiqhTextLibraryModalProps {
  onClose: () => void;
  onOpenFiqhAI: (question?: string) => void;
  initialBookId?: string;
}

export const FiqhTextLibraryModal: React.FC<FiqhTextLibraryModalProps> = ({
  onClose,
  onOpenFiqhAI,
  initialBookId,
}) => {
  const [selectedBookId, setSelectedBookId] = useState<string>(
    initialBookId || FIQH_BOOKS_DATA[0].id
  );
  const [selectedChapterId, setSelectedChapterId] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('large');

  // Currently selected book
  const currentBook = useMemo(() => {
    return (
      FIQH_BOOKS_DATA.find((b) => b.id === selectedBookId) || FIQH_BOOKS_DATA[0]
    );
  }, [selectedBookId]);

  // Filtered books list according to category and search
  const filteredBooksList = useMemo(() => {
    return FIQH_BOOKS_DATA.filter((b) => {
      if (selectedCategory !== 'all' && b.category !== selectedCategory) {
        return false;
      }
      return true;
    });
  }, [selectedCategory]);

  // All rulings inside current book (or filtered by chapter and search)
  const displayedRulings = useMemo(() => {
    let list: FiqhRuling[] = [];

    if (searchQuery.trim()) {
      // Global or book search
      const q = searchQuery.trim().toLowerCase();
      // If searching, search across all books or current book
      const targetBooks = selectedCategory === 'all' 
        ? FIQH_BOOKS_DATA 
        : FIQH_BOOKS_DATA.filter(b => b.category === selectedCategory);

      for (const book of targetBooks) {
        for (const chap of book.chapters) {
          for (const ruling of chap.rulings) {
            const matchTitle = ruling.title.toLowerCase().includes(q);
            const matchText = ruling.text.toLowerCase().includes(q);
            const matchNumber = ruling.rulingNumber?.toLowerCase().includes(q) || false;
            const matchTag = ruling.tags.some((t) => t.toLowerCase().includes(q));
            if (matchTitle || matchText || matchNumber || matchTag) {
              list.push(ruling);
            }
          }
        }
      }
      return list;
    }

    // Normal chapter filter
    for (const chap of currentBook.chapters) {
      if (selectedChapterId === 'all' || chap.id === selectedChapterId) {
        list.push(...chap.rulings);
      }
    }
    return list;
  }, [currentBook, selectedChapterId, searchQuery, selectedCategory]);

  const handleCopyRuling = async (ruling: FiqhRuling) => {
    const textToCopy = `«${ruling.title}»\n${ruling.rulingNumber ? ruling.rulingNumber + ': ' : ''}${ruling.text}\n\nالمصدر: ${ruling.bookTitle}، الباب: ${ruling.chapter}، ص ${ruling.pageNumber}\n(مكتب سماحة آية الله العظمى السيد السيستاني دام ظله)`;
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopiedId(ruling.id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      setCopiedId(ruling.id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const textClasses = {
    normal: 'text-xs sm:text-sm leading-relaxed',
    large: 'text-sm sm:text-base leading-loose',
    xlarge: 'text-base sm:text-lg leading-loose',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md overflow-hidden animate-fadeIn">
      {/* Modal Container */}
      <div
        id="fiqh-text-library-dialog"
        className="relative w-full max-w-6xl bg-stone-950 border border-amber-500/40 rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col h-[93vh] max-h-[860px] overflow-hidden"
      >
        {/* Golden Top Accent */}
        <div className="h-1 bg-gradient-to-r from-amber-600 via-amber-400 to-amber-600 shrink-0" />

        {/* Modal Header */}
        <div className="px-4 sm:px-6 py-3.5 bg-gradient-to-b from-stone-900 to-stone-950 border-b border-stone-800 flex items-center justify-between gap-3 shrink-0">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-950/80 border border-amber-600/40 text-amber-300 text-xs font-medium flex items-center gap-1">
                <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                <span>المكتبة الفقهية النصية الشاملة</span>
              </span>
              <span className="text-xs text-stone-400 font-tajawal hidden sm:inline">
                ١٥ مؤلفاً معتمداً • نصوص ومباحث محققة ومبوبة
              </span>
            </div>
            <h2 className="text-lg sm:text-2xl font-amiri font-bold text-amber-100">
              نصوص وفتاوى مكتب سماحة السيد السيستاني (دام ظله)
            </h2>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Ask Fiqh AI button */}
            <button
              onClick={() => onOpenFiqhAI()}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-700 to-amber-600 hover:from-amber-600 hover:to-amber-500 text-stone-950 text-xs font-bold transition-all shadow-md active:scale-95"
            >
              <Bot className="w-4 h-4" />
              <span>اسألني سؤال فقهي</span>
            </button>

            {/* Close modal */}
            <button
              onClick={onClose}
              className="p-2 text-stone-400 hover:text-white bg-stone-900 hover:bg-stone-800 rounded-xl border border-stone-800 transition-all"
              title="إغلاق المكتبة"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Top Control Ribbon: Search & Font Sizer */}
        <div className="px-4 sm:px-6 py-2.5 bg-stone-900/80 border-b border-stone-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 shrink-0">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-stone-400 absolute right-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              id="input-search-fiqh-texts"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث في نصوص المسائل الفقهية، الأبواب، وأرقام الصفحات (مثل: مسألة، الهلال، الصوم، الخمس، البيع، لا ضرر، المشتق)..."
              className="w-full pr-9 pl-8 py-1.5 sm:py-2 bg-stone-950 border border-stone-800 rounded-xl text-xs sm:text-sm text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-500/60 font-tajawal transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute left-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-200"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Quick AI button on mobile + Font Resizer */}
          <div className="flex items-center justify-between sm:justify-end gap-2 shrink-0">
            <button
              onClick={() => onOpenFiqhAI()}
              className="sm:hidden flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-amber-600 text-stone-950 text-xs font-bold"
            >
              <Bot className="w-3.5 h-3.5" />
              <span>اسأل المساعد الفقهي</span>
            </button>

            <div className="flex items-center gap-1 bg-stone-950 p-1 rounded-xl border border-stone-800 text-xs">
              <span className="text-[11px] text-stone-400 px-1 font-tajawal">الخط:</span>
              <button
                onClick={() => setFontSize('normal')}
                className={`px-2 py-0.5 rounded-md ${
                  fontSize === 'normal' ? 'bg-amber-600 text-stone-950 font-bold' : 'text-stone-400'
                }`}
              >
                عادي
              </button>
              <button
                onClick={() => setFontSize('large')}
                className={`px-2 py-0.5 rounded-md ${
                  fontSize === 'large' ? 'bg-amber-600 text-stone-950 font-bold' : 'text-stone-400'
                }`}
              >
                متوسط
              </button>
              <button
                onClick={() => setFontSize('xlarge')}
                className={`px-2 py-0.5 rounded-md ${
                  fontSize === 'xlarge' ? 'bg-amber-600 text-stone-950 font-bold' : 'text-stone-400'
                }`}
              >
                كبير
              </button>
            </div>
          </div>
        </div>

        {/* Main Split Body */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* Sidebar: Books Navigator (15 Books) */}
          <div className="w-full md:w-80 lg:w-96 bg-stone-950/95 border-b md:border-b-0 md:border-l border-stone-800/90 flex flex-col shrink-0 max-h-48 md:max-h-full overflow-hidden">
            {/* Category selector */}
            <div className="p-2.5 border-b border-stone-800/80 flex items-center gap-1 overflow-x-auto no-scrollbar text-xs">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-2.5 py-1 rounded-lg whitespace-nowrap text-[11px] font-medium transition-all ${
                  selectedCategory === 'all'
                    ? 'bg-amber-600 text-stone-950 font-bold'
                    : 'bg-stone-900 text-stone-300 hover:bg-stone-800'
                }`}
              >
                الكل (١٥)
              </button>
              <button
                onClick={() => setSelectedCategory('fatwa')}
                className={`px-2.5 py-1 rounded-lg whitespace-nowrap text-[11px] font-medium transition-all ${
                  selectedCategory === 'fatwa'
                    ? 'bg-amber-600 text-stone-950 font-bold'
                    : 'bg-stone-900 text-stone-300 hover:bg-stone-800'
                }`}
              >
                الرسائل الكبرى (٦)
              </button>
              <button
                onClick={() => setSelectedCategory('simplified')}
                className={`px-2.5 py-1 rounded-lg whitespace-nowrap text-[11px] font-medium transition-all ${
                  selectedCategory === 'simplified'
                    ? 'bg-teal-600 text-stone-950 font-bold'
                    : 'bg-stone-900 text-stone-300 hover:bg-stone-800'
                }`}
              >
                الميسر (٣)
              </button>
              <button
                onClick={() => setSelectedCategory('hajj')}
                className={`px-2.5 py-1 rounded-lg whitespace-nowrap text-[11px] font-medium transition-all ${
                  selectedCategory === 'hajj'
                    ? 'bg-emerald-600 text-stone-950 font-bold'
                    : 'bg-stone-900 text-stone-300 hover:bg-stone-800'
                }`}
              >
                الحج (٢)
              </button>
              <button
                onClick={() => setSelectedCategory('crescent_fasting')}
                className={`px-2.5 py-1 rounded-lg whitespace-nowrap text-[11px] font-medium transition-all ${
                  selectedCategory === 'crescent_fasting'
                    ? 'bg-cyan-600 text-stone-950 font-bold'
                    : 'bg-stone-900 text-stone-300 hover:bg-stone-800'
                }`}
              >
                الأهلة والصوم (٢)
              </button>
              <button
                onClick={() => setSelectedCategory('usul_and_qawaid')}
                className={`px-2.5 py-1 rounded-lg whitespace-nowrap text-[11px] font-medium transition-all ${
                  selectedCategory === 'usul_and_qawaid'
                    ? 'bg-amber-500 text-stone-950 font-bold'
                    : 'bg-stone-900 text-stone-300 hover:bg-stone-800'
                }`}
              >
                الأصول والقواعد (٢)
              </button>
            </div>

            {/* Book list items */}
            <div className="flex-1 overflow-y-auto p-2 space-y-1.5">
              {filteredBooksList.map((book) => {
                const isSelected = book.id === selectedBookId;
                return (
                  <button
                    key={book.id}
                    onClick={() => {
                      setSelectedBookId(book.id);
                      setSelectedChapterId('all');
                      setSearchQuery('');
                    }}
                    className={`w-full text-right p-2.5 rounded-xl transition-all flex items-start gap-2.5 border ${
                      isSelected
                        ? 'bg-stone-900 border-amber-500/60 shadow-md ring-1 ring-amber-500/20'
                        : 'bg-stone-950/60 border-stone-800/80 hover:bg-stone-900/60 text-stone-300 hover:border-stone-700'
                    }`}
                  >
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold ${
                        isSelected
                          ? 'bg-amber-600 text-stone-950 font-bold'
                          : 'bg-stone-900 text-amber-400 border border-stone-800'
                      }`}
                    >
                      <BookMarked className="w-3.5 h-3.5" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <span
                          className={`text-xs font-amiri font-bold truncate ${
                            isSelected ? 'text-amber-200' : 'text-stone-200'
                          }`}
                        >
                          {book.title}
                        </span>
                      </div>
                      <p className="text-[10px] text-stone-400 font-tajawal truncate">
                        {book.subtitle}
                      </p>
                      <div className="flex items-center gap-2 text-[9px] text-stone-500 pt-1">
                        <span>{book.edition}</span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Area: Book Chapters & Rulings Reader */}
          <div className="flex-1 flex flex-col bg-stone-900/50 overflow-hidden">
            {/* Active Book Info & Chapter Pills Ribbon */}
            {!searchQuery && (
              <div className="p-3 sm:p-4 bg-stone-950/80 border-b border-stone-800/80 shrink-0 space-y-2.5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="text-base sm:text-lg font-amiri font-bold text-amber-100 flex items-center gap-2">
                      <span>{currentBook.title}</span>
                      <span className="text-[11px] px-2 py-0.5 rounded bg-amber-950/80 text-amber-300 font-tajawal">
                        {currentBook.categoryLabel}
                      </span>
                    </h3>
                    <p className="text-xs text-stone-400 font-tajawal">
                      {currentBook.summary}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 flex-wrap">
                    <button
                      onClick={() =>
                        onOpenFiqhAI(
                          `ما هي أهم الأحكام الواردة في كتاب: «${currentBook.title}»؟`
                        )
                      }
                      className="self-start sm:self-auto flex items-center gap-1 px-2.5 py-1 rounded-lg bg-stone-900 hover:bg-stone-800 text-amber-300 text-xs border border-amber-600/30 transition-all shrink-0"
                    >
                      <Bot className="w-3.5 h-3.5 text-amber-400" />
                      <span>اسأل الذكاء الفقهي عن هذا الكتاب</span>
                    </button>

                    {currentBook.pdfFallbackUrl && (
                      <a
                        href={currentBook.pdfFallbackUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="self-start sm:self-auto flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-stone-900 hover:bg-stone-800 text-amber-300 text-xs border border-amber-600/30 hover:border-amber-500/60 transition-all shrink-0"
                        title="فتح أو تحميل النسخة الأصلية المصورة (PDF)"
                      >
                        <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
                        <span>النسخة المصورة (PDF)</span>
                      </a>
                    )}
                  </div>
                </div>

                {/* Chapter Pills */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
                  <button
                    onClick={() => setSelectedChapterId('all')}
                    className={`px-3 py-1 rounded-lg font-medium whitespace-nowrap transition-all ${
                      selectedChapterId === 'all'
                        ? 'bg-amber-600 text-stone-950 font-bold'
                        : 'bg-stone-900 text-stone-300 hover:bg-stone-800 border border-stone-800'
                    }`}
                  >
                    جميع الأبواب
                  </button>

                  {currentBook.chapters.map((chap) => (
                    <button
                      key={chap.id}
                      onClick={() => setSelectedChapterId(chap.id)}
                      className={`px-3 py-1 rounded-lg font-medium whitespace-nowrap transition-all ${
                        selectedChapterId === chap.id
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/60 font-bold'
                          : 'bg-stone-900 text-stone-300 hover:bg-stone-800 border border-stone-800'
                      }`}
                    >
                      {chap.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Rulings / Text Cards View */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
              {searchQuery && (
                <div className="p-2.5 rounded-xl bg-amber-950/40 border border-amber-600/30 text-xs text-amber-300 flex items-center justify-between gap-2">
                  <span>
                    نتائج البحث عن: «{searchQuery}» — تم العثور على {displayedRulings.length} مسألة محققة
                  </span>
                  <button
                    onClick={() => setSearchQuery('')}
                    className="text-stone-400 hover:text-stone-200 underline text-xs"
                  >
                    مسح البحث
                  </button>
                </div>
              )}

              {displayedRulings.length === 0 ? (
                <div className="text-center py-16 space-y-3">
                  <BookOpen className="w-12 h-12 text-stone-600 mx-auto stroke-1" />
                  <p className="text-stone-300 font-medium font-amiri text-lg">
                    لم يتم العثور على نصوص مطابقة
                  </p>
                  <p className="text-stone-500 text-xs font-tajawal">
                    جرّب البحث بكلمات أخرى أو اختر كتاباً آخر من القائمة الجانبية
                  </p>
                </div>
              ) : (
                displayedRulings.map((ruling) => {
                  const isCopied = copiedId === ruling.id;

                  return (
                    <div
                      key={ruling.id}
                      id={`ruling-card-${ruling.id}`}
                      className="rounded-2xl bg-gradient-to-b from-stone-950 to-stone-900 border border-stone-800 hover:border-amber-600/40 p-4 sm:p-5 space-y-3 transition-all shadow-md group"
                    >
                      {/* Top Header of Ruling */}
                      <div className="flex items-center justify-between gap-2 flex-wrap text-xs">
                        <div className="flex items-center gap-2">
                          {ruling.rulingNumber && (
                            <span className="px-2.5 py-0.5 rounded-lg bg-amber-600 text-stone-950 font-bold font-amiri text-sm shadow-sm">
                              {ruling.rulingNumber}
                            </span>
                          )}
                          <span className="text-amber-400/90 font-medium font-tajawal text-xs">
                            {ruling.chapter}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 text-[11px] text-stone-400 font-tajawal">
                          <span className="bg-stone-900 px-2 py-0.5 rounded border border-stone-800">
                            ص {ruling.pageNumber}
                          </span>
                          <span className="text-stone-500">•</span>
                          <span>{ruling.bookTitle}</span>
                        </div>
                      </div>

                      {/* Ruling Title */}
                      <h4 className="text-base sm:text-lg font-amiri font-bold text-amber-100 group-hover:text-amber-300 transition-colors">
                        {ruling.title}
                      </h4>

                      {/* Exact Ruling Text */}
                      <div
                        className={`font-amiri text-stone-200 border-r-2 border-amber-600/60 pr-3.5 text-justify ${textClasses[fontSize]}`}
                      >
                        {ruling.text}
                      </div>

                      {/* Footer: Tags & Actions */}
                      <div className="pt-2 border-t border-stone-800/80 flex items-center justify-between gap-2 flex-wrap">
                        {/* Topic Tags */}
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <Tag className="w-3 h-3 text-stone-500" />
                          {ruling.tags.map((tag, i) => (
                            <span
                              key={i}
                              className="text-[10px] px-2 py-0.5 rounded bg-stone-900 text-stone-400 border border-stone-800 font-tajawal"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Action buttons */}
                        <div className="flex items-center gap-1.5">
                          {/* Copy button */}
                          <button
                            onClick={() => handleCopyRuling(ruling)}
                            className={`px-2.5 py-1 rounded-lg border transition-all flex items-center gap-1 text-xs font-tajawal ${
                              isCopied
                                ? 'bg-emerald-950/80 text-emerald-300 border-emerald-600/40'
                                : 'bg-stone-900 text-stone-300 hover:text-white border-stone-800 hover:border-stone-700'
                            }`}
                            title="نسخ المسأن وتوثيق المصدر"
                          >
                            {isCopied ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-emerald-400" />
                                <span className="text-[11px]">تم النسخ والتوثيق</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5" />
                                <span className="text-[11px]">نسخ المسألة</span>
                              </>
                            )}
                          </button>

                          {/* Ask AI about this ruling */}
                          <button
                            onClick={() =>
                              onOpenFiqhAI(
                                `ما هو حكم المسألة الفقهية: «${ruling.title}»؟ نرجو الشرح والتفصيل مع ذكر المصدر.`
                              )
                            }
                            className="px-2.5 py-1 rounded-lg bg-amber-950/60 hover:bg-amber-900/80 text-amber-300 border border-amber-600/40 text-xs font-tajawal flex items-center gap-1 transition-all"
                            title="سؤال المساعد الذكي عن هذه المسألة"
                          >
                            <Bot className="w-3.5 h-3.5 text-amber-400" />
                            <span className="text-[11px] hidden sm:inline">سؤال المساعد</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Bottom Citation & Status */}
            <div className="px-4 sm:px-6 py-2.5 bg-stone-950 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-stone-400 font-tajawal shrink-0">
              <span className="truncate">
                المصدر المعتمد: نصوص رسمية صادرة عن مكتب سماحة آية الله العظمى السيد السيستاني (دام ظله) — النجف الأشرف
              </span>
              <button
                onClick={() => onOpenFiqhAI()}
                className="text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 text-xs"
              >
                <Bot className="w-3.5 h-3.5" />
                <span>طرح سؤال فقهي على المساعد الذكي</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
