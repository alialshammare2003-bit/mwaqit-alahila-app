import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  Send,
  Sparkles,
  Calendar,
  Bot,
  User,
  Copy,
  Check,
  RotateCcw,
  Loader2,
  Moon,
  ShieldCheck,
  Compass,
} from 'lucide-react';

interface CalendarMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  sourceCitation?: string;
  timestamp: string;
}

interface CalendarAIAssistantModalProps {
  onClose: () => void;
  initialQuestion?: string;
}

const SAMPLE_QUESTIONS = [
  'كم كان عمر النبي (ص) حين تزوج السيدة خديجة (ع) وفي أي عام ويوم؟',
  'ما هي مواصفات وتفاصيل هلال شهر رمضان المبارك 1448 هـ في النجف الأشرف؟',
  'ما هي أبرز وقائع ومناسبات شهر محرم الحرام لعام 1448 هـ؟',
  'متى يحل عيد الغدير الأغر لعام 1448 هـ وأي يوم يوافق ميلادياً؟',
  'ما هي فترات مكوث القمر في برج العقرب لشهر صفر 1448 هـ؟',
  'متى تصادف ولادة النبي الأعظم (ص) والإمام الصادق (ع) في ربيع الأول؟',
  'متى تبدأ أيام شهادة الصديقة الطاهرة فاطمة الزهراء (ع) في جمادى؟',
];

export const CalendarAIAssistantModal: React.FC<CalendarAIAssistantModalProps> = ({
  onClose,
  initialQuestion,
}) => {
  const [messages, setMessages] = useState<CalendarMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: `أهلاً بكم في «المساعد الذكي: اسألني حول الأحداث التاريخية والمناسبات الدينية ومواقيت الأهلة لعام 1448 هـ».\n\nإجاباتي مستندة حصراً إلى حسابات مواقيت الأهلة لأفق النجف الأشرف، وتفاصيل التقويم الهجري لعام 1448 هـ (2026 - 2027 م)، وموسوعة الوقائع التاريخية لأهل البيت (ع) وأوقات برج العقرب المعتمدة في التطبيق.\n\nتفضلوا بطرح أي سؤال حول مواقيت الهلال، التواريخ المقابلة، أو المناسبات الدينية.`,
      sourceCitation: 'مواقيت الأهلة لعام 1448 هـ — أفق النجف الأشرف',
      timestamp: new Date().toLocaleTimeString('ar-IQ', { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const [inputQuestion, setInputQuestion] = useState(initialQuestion || '');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSend = async (questionText: string) => {
    const q = questionText.trim();
    if (!q || isLoading) return;

    const userMsg: CalendarMessage = {
      id: 'usr-' + Date.now(),
      sender: 'user',
      text: q,
      timestamp: new Date().toLocaleTimeString('ar-IQ', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuestion('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/calendar-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: q,
          context: messages
            .slice(-4)
            .map((m) => `${m.sender === 'user' ? 'المستخدم' : 'المساعد'}: ${m.text}`)
            .join('\n\n'),
        }),
      });

      let data: any = {};
      try {
        data = await response.json();
      } catch (jsonErr) {
        // response might not be json
      }

      if (!response.ok && !data.answer) {
        throw new Error(data.error || 'تعذر استرجاع بيانات التقويم حالياً');
      }

      const botMsg: CalendarMessage = {
        id: 'bot-' + Date.now(),
        sender: 'assistant',
        text: data.answer || 'لم يتم العثور على إجابة محددة.',
        sourceCitation: data.source || 'تقويم مواقيت الأهلة 1448 هـ',
        timestamp: new Date().toLocaleTimeString('ar-IQ', { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err: any) {
      const errorMsg: CalendarMessage = {
        id: 'err-' + Date.now(),
        sender: 'assistant',
        text: 'حدث ضغط لحظي أثناء استرجاع بيانات التقويم والأهلة. يمكنكم الاطلاع المباشر على جدول الشهور وبرج العقرب عبر التطبيق أو إعادة إرسال السؤال.',
        timestamp: new Date().toLocaleTimeString('ar-IQ', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleReset = () => {
    setMessages([
      {
        id: 'welcome-reset',
        sender: 'assistant',
        text: 'تم بدء جلسة جديدة. تفضلوا بالسؤال عن أي هلال أو مناسبة تاريخية أو حساب فلكي لعام 1448 هـ.',
        timestamp: new Date().toLocaleTimeString('ar-IQ', { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md overflow-hidden animate-fadeIn">
      <div
        id="calendar-ai-modal"
        className="relative w-full max-w-3xl bg-stone-950 border border-cyan-500/40 rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col h-[90vh] max-h-[780px] overflow-hidden"
      >
        {/* Cyan Top Line */}
        <div className="h-1 bg-gradient-to-r from-cyan-600 via-cyan-400 to-cyan-600 shrink-0" />

        {/* Modal Header */}
        <div className="px-4 sm:px-6 py-3.5 bg-gradient-to-b from-stone-900 to-stone-950 border-b border-stone-800 flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-10 h-10 rounded-2xl bg-cyan-600/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shrink-0 shadow-inner">
              <Moon className="w-5 h-5" />
            </div>
            <div className="truncate">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-base sm:text-lg font-amiri font-bold text-cyan-100">
                  اسألني حول الأحداث التاريخية والمناسبات الدينية
                </h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-950/80 text-cyan-300 border border-cyan-600/40 font-medium">
                  مستند حصراً لمواقيت الأهلة ١٤٤٨ هـ
                </span>
              </div>
              <p className="text-xs text-stone-400 font-tajawal truncate">
                مواقيت أفق النجف الأشرف، المناسبات، والتواريخ المقابلة لعام 1448 هـ
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={handleReset}
              className="p-2 text-stone-400 hover:text-stone-200 bg-stone-900 hover:bg-stone-800 rounded-xl border border-stone-800 transition-all"
              title="محادثة جديدة"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-stone-400 hover:text-white bg-stone-900 hover:bg-stone-800 rounded-xl border border-stone-800 transition-all"
              title="إغلاق"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Informational Ribbon */}
        <div className="px-4 py-2 bg-cyan-950/40 border-b border-cyan-800/30 flex items-center gap-2 text-xs text-cyan-300/90 font-tajawal shrink-0">
          <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
          <span className="leading-snug">
            تنبيه: كافة الإجابات مستندة حصراً ودقة تامة إلى بيانات مواقيت الأهلة والتقويم الهجري لعام 1448 هـ لأفق النجف الأشرف.
          </span>
        </div>

        {/* Chat Messages Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 max-w-[92%] sm:max-w-[85%] ${
                msg.sender === 'user' ? 'mr-auto flex-row-reverse' : 'ml-auto'
              }`}
            >
              {/* Avatar Icon */}
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-1 ${
                  msg.sender === 'user'
                    ? 'bg-cyan-600 text-stone-950 font-bold'
                    : 'bg-stone-800 text-cyan-400 border border-stone-700'
                }`}
              >
                {msg.sender === 'user' ? (
                  <User className="w-4 h-4" />
                ) : (
                  <Bot className="w-4 h-4" />
                )}
              </div>

              {/* Message Bubble */}
              <div
                className={`rounded-2xl p-3.5 sm:p-4 text-xs sm:text-sm font-tajawal leading-relaxed space-y-2.5 ${
                  msg.sender === 'user'
                    ? 'bg-cyan-600 text-stone-950 font-medium rounded-tr-none shadow-md'
                    : 'bg-stone-900/90 border border-stone-800 text-stone-100 rounded-tl-none shadow-lg'
                }`}
              >
                <div className="whitespace-pre-wrap">{msg.text}</div>

                {/* Footer */}
                <div
                  className={`flex items-center justify-between gap-3 pt-2 text-[10px] border-t ${
                    msg.sender === 'user'
                      ? 'border-cyan-700/40 text-stone-900'
                      : 'border-stone-800 text-stone-400'
                  }`}
                >
                  <span className="font-mono">{msg.timestamp}</span>

                  {msg.sender === 'assistant' && (
                    <button
                      onClick={() => handleCopy(msg.text, msg.id)}
                      className="hover:text-cyan-300 flex items-center gap-1 transition-colors"
                      title="نسخ الجواب"
                    >
                      {copiedId === msg.id ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-400">تم النسخ</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>نسخ الجواب</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3 max-w-[85%] ml-auto">
              <div className="w-8 h-8 rounded-xl bg-stone-800 text-cyan-400 border border-stone-700 flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4 animate-pulse" />
              </div>
              <div className="rounded-2xl rounded-tl-none p-4 bg-stone-900 border border-stone-800 text-stone-300 text-xs flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-cyan-400" />
                <span>جارٍ فحص بيانات مواقيت الأهلة والتقويم لعام 1448 هـ...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Sample Questions Pills */}
        {messages.length <= 2 && (
          <div className="px-4 py-2 bg-stone-950/80 border-t border-stone-900 shrink-0">
            <div className="text-[11px] text-stone-400 mb-1.5 flex items-center gap-1 font-tajawal">
              <Sparkles className="w-3 h-3 text-cyan-400" />
              <span>أسئلة شائعة حول أهلة ومناسبات العام:</span>
            </div>
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
              {SAMPLE_QUESTIONS.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(q)}
                  className="px-2.5 py-1 rounded-lg bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-cyan-200 border border-stone-800 whitespace-nowrap text-[11px] font-tajawal transition-all"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input Form */}
        <div className="p-3 sm:p-4 bg-stone-900/90 border-t border-stone-800 shrink-0">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(inputQuestion);
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              id="input-calendar-question"
              value={inputQuestion}
              onChange={(e) => setInputQuestion(e.target.value)}
              placeholder="اكتب استفسارك حول هلال أي شهر أو مناسبة دينية لعام 1448 هـ..."
              disabled={isLoading}
              className="flex-1 px-4 py-2.5 bg-stone-950 border border-stone-800 rounded-xl text-xs sm:text-sm text-stone-100 placeholder-stone-500 focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/40 font-tajawal transition-all disabled:opacity-50"
            />

            <button
              type="submit"
              disabled={!inputQuestion.trim() || isLoading}
              id="btn-send-calendar-question"
              className="px-4 py-2.5 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-40 text-stone-950 font-bold rounded-xl text-xs sm:text-sm flex items-center gap-1.5 transition-all shadow-md active:scale-95 shrink-0"
            >
              <span>إرسال</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
