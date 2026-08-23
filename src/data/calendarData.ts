import { HijriMonthData } from '../types';

export const INTRO_TEXT = {
  ayah: {
    text: "هُوَ الَّذِي جَعَلَ الشَّمْسَ ضِيَاءً وَالْقَمَرَ نُوراً وَقَدَّرَهُ مَنَازِلَ لِتَعْلَمُوا عَدَدَ السِّنِينَ وَالْحِسَابَ مَا خَلَقَ اللَّهُ ذَلِكَ إِلَّا بِالْحَقِّ يُفَصِّلُ الآيَاتِ لِقَوْمٍ يَعْلَمُونَ",
    surah: "سورة يونس (الآية 5)"
  },
  openingStatement: `الحمد لله رب العالمين، والصلاة والسلام على أشرف خلقه محمد وآله الطيبين الطاهرين.

وبعد، يسر مكتب سماحة السيد السيستاني (دام ظله) أن يقدم للمؤمنين الكرام التقويم السنوي الخاص بمعرفة أوائل الشهور القمرية للعام الهجري (1448 هـ) وفقاً لأفق مدينة النجف الأشرف وطبقاً للحسابات العلمية الخاصة بحركة القمر، سائلين الباري (جل شأنه) أن يجعله عام خير وبركة وسعادة ونصر للمسلمين كافة.

علماً أن هذه الحسابات لا تمثل رأي المرجعية الدينية، بل هي مجرد توقعات فلكية حيث أن بداية الشهور القمرية تعتمد على ثبوت رؤية الهلال شرعاً.

لذا نأمل من المؤمنين كافة رصد أهلة الشهور وفقاً للبيانات المذكورة في هذا الكراس وإعلامنا بالرؤية إن أمكن ذلك، وأن لا ينسونا من صالح الدعوات.`,
  methodology: [
    {
      num: "أولاً",
      title: "التقويم السنوي العام",
      desc: "يضم التقويم السنوي العام موضحاً فيه أيام الأسبوع حسب الشهور الهجرية القمرية وما يقابلها من التاريخ للعام (2026 - 2027) الميلادي."
    },
    {
      num: "ثانياً",
      title: "التوقعات الفلكية للهلال",
      desc: "يوضح التوقعات الخاصة لوضعية الهلال في بداية الشهور القمرية للعام الهجري 1448 بموجب الحسابات الفلكية الدقيقة وحسب أفق مدينة النجف الأشرف، وتتضمن: عمر الهلال منذ لحظة الاقتران المركزي حتى لحظة غروب الشمس، ارتفاع الهلال لحظة غروب الشمس في الليلة الأولى، مدة بقاء الهلال بعد الغروب، ونسبة القسم المنار من قرص القمر."
    },
    {
      num: "ثالثاً",
      title: "حالة الشهر التام (30 يوماً)",
      desc: "في حالة كون الشهر تاماً (30) يوماً يتم بيان وضعية الهلال في الليلة السابقة أيضاً لمقارنة إمكانية الرؤية."
    },
    {
      num: "رابعاً",
      title: "الوقائع التاريخية والإسلامية",
      desc: "بيان أهم الوقائع والأحداث الفلكية والتاريخية الإسلامية الواقعة في كل شهر."
    },
    {
      num: "خامساً",
      title: "الخسوف والكسوف والقبلة",
      desc: "بيان مواقيت خسوف القمر وكسوف الشمس وتعيين القبلة بمراقبة الشمس."
    },
    {
      num: "سادساً",
      title: "دخول القمر برج العقرب",
      desc: "بيان وقت دخول وخروج القمر من برج العقرب، فقد روي عن أبي عبد الله الصادق (عليه السلام) أنه قال: (من سافر أو تزوج والقمر في العقرب لم يرَ الحسنى)."
    }
  ]
};

export const MONTHS_DATA: HijriMonthData[] = [
  // 1. المحرم الحرام 1448
  {
    id: 1,
    name: "المحرم",
    nameWithPrefix: "المحرم الحرام",
    yearHijri: 1448,
    gregorianMonthsSpan: "حزيران / تموز 2026م",
    startDayOfWeek: 4, // الأربعاء 1 المحرم = 17 حزيران 2026
    totalDays: 29, // 29 يوماً حتى 15 تموز (حيث توقع صفر في مساء 29 المحرم = 15 تموز)
    crescentPrimary: {
      dateHijri: "30 ذي الحجة 1447 هـ",
      dateGregorian: "16 حزيران 2026 م",
      sunsetTime: "7:12 م",
      ageHours: 37,
      ageMinutes: 18,
      altitudeDegrees: 18,
      altitudeMinutes: 28,
      durationHours: 1,
      durationMinutes: 41,
      illuminatedPercentage: 3.71,
      statusText: "يُتوقع أن يُرى الهلال مرتفعاً واضحاً جداً",
      isPrimary: true
    },
    crescentPreviousNight: {
      dateHijri: "29 ذي الحجة 1447 هـ",
      dateGregorian: "15 حزيران 2026 م",
      sunsetTime: "7:11 م",
      ageHours: 13,
      ageMinutes: 17,
      altitudeDegrees: 7,
      altitudeMinutes: 23,
      durationHours: 0,
      durationMinutes: 47,
      illuminatedPercentage: 0.62,
      statusText: "لا يُتوقع التمكن من رؤية الهلال بالعين المجردة",
      isPrimary: false
    },
    scorpioTimings: [
      {
        entryDay: "الأربعاء",
        entryDateGregorian: "24 حزيران 2026 م",
        entryTime: "9:44",
        entryPeriod: "صباحاً",
        exitDay: "الجمعة",
        exitDateGregorian: "26 حزيران 2026 م",
        exitTime: "9:41",
        exitPeriod: "مساءً"
      }
    ],
    events: [
      { day: 1, title: "رأس السنة الهجرية", description: "اليوم الأول من بداية السنة الهجرية 1448 هـ", type: "general" },
      { day: 1, title: "حصار شعب أبي طالب", description: "بداية المحاصرة للنبي الأكرم (صلى الله عليه وآله) في شعب أبي طالب", yearHijriOrPre: "سنة 3 قبل الهجرة", type: "historical" },
      { day: 2, title: "ورود كربلاء المقدسة", description: "ورود الإمام الحسين بن علي بن أبي طالب (عليه السلام) أرض كربلاء", yearHijriOrPre: "سنة 61 هـ", type: "historical" },
      { day: 3, title: "ورود عمر بن سعد", description: "ورود عمر بن سعد مع جيشه أرض كربلاء", yearHijriOrPre: "سنة 61 هـ", type: "historical" },
      { day: 10, title: "عاشوراء الإمام الحسين (ع)", description: "واقعة الطف الخالدة واستشهاد الإمام الحسين وأهل بيته وأصحابه (عليهم السلام)", yearHijriOrPre: "سنة 61 هـ", type: "shahadah", isFourteenInfallibles: true, infallibleName: "الإمام الحسين (ع)" },
      { day: 12, title: "دخول سبايا أهل البيت الكوفة", description: "دخول سبايا أهل البيت (عليهم السلام) إلى الكوفة", yearHijriOrPre: "سنة 61 هـ", type: "historical" },
      { day: 13, title: "دفن شهداء الطف", description: "دفن أجساد شهداء واقعة الطف الطاهرة (عليهم السلام)", yearHijriOrPre: "سنة 61 هـ", type: "historical" },
      { day: 19, title: "خروج السبايا إلى الشام", description: "خروج سبايا أهل البيت (عليهم السلام) من الكوفة إلى الشام", yearHijriOrPre: "سنة 61 هـ", type: "historical" },
      { day: 22, title: "وصول أمير المؤمنين إلى صفين", description: "وصول الإمام أمير المؤمنين (عليه السلام) إلى صفين", yearHijriOrPre: "سنة 37 هـ", type: "historical" },
      { day: 23, title: "تفجير الروضة العسكرية", description: "الاعتداء الأثيم بتفجير حرم الإمامين العسكريين (عليهما السلام) في سامراء", yearHijriOrPre: "سنة 1427 هـ", type: "historical" },
      { day: 25, title: "شهادة الإمام السجاد (ع)", description: "شهادة الإمام علي بن الحسين زين العابدين (عليه السلام) بالمدينة المنورة", yearHijriOrPre: "سنة 95 هـ", type: "shahadah", isFourteenInfallibles: true, infallibleName: "الإمام علي السجاد (ع)" },
      { day: 26, title: "شهادة علي الخير", description: "شهادة علي بن الحسن المثلث (علي الخير) (رضوان الله عليه)", yearHijriOrPre: "سنة 146 هـ", type: "shahadah" },
      { day: 28, title: "وفاة حذيفة بن اليمان", description: "وفاة الصحابي الجليل حذيفة بن اليمان (رضوان الله عليه)", yearHijriOrPre: "سنة 36 هـ", type: "historical" },
      { day: 28, title: "إحضار الإمام الجواد إلى بغداد", description: "إحضار الإمام محمد بن علي الجواد (عليه السلام) من المدينة المنورة إلى بغداد", yearHijriOrPre: "سنة 220 هـ", type: "historical" }
    ],
    grid: [
      { hijri: 1, gregorianDay: 17, gregorianMonth: "حزيران", dayOfWeek: "الأربعاء" },
      { hijri: 2, gregorianDay: 18, gregorianMonth: "حزيران", dayOfWeek: "الخميس" },
      { hijri: 3, gregorianDay: 19, gregorianMonth: "حزيران", dayOfWeek: "الجمعة" },
      { hijri: 4, gregorianDay: 20, gregorianMonth: "حزيران", dayOfWeek: "السبت" },
      { hijri: 5, gregorianDay: 21, gregorianMonth: "حزيران", dayOfWeek: "الأحد" },
      { hijri: 6, gregorianDay: 22, gregorianMonth: "حزيران", dayOfWeek: "الإثنين" },
      { hijri: 7, gregorianDay: 23, gregorianMonth: "حزيران", dayOfWeek: "الثلاثاء" },
      { hijri: 8, gregorianDay: 24, gregorianMonth: "حزيران", dayOfWeek: "الأربعاء" },
      { hijri: 9, gregorianDay: 25, gregorianMonth: "حزيران", dayOfWeek: "الخميس" },
      { hijri: 10, gregorianDay: 26, gregorianMonth: "حزيران", dayOfWeek: "الجمعة" },
      { hijri: 11, gregorianDay: 27, gregorianMonth: "حزيران", dayOfWeek: "السبت" },
      { hijri: 12, gregorianDay: 28, gregorianMonth: "حزيران", dayOfWeek: "الأحد" },
      { hijri: 13, gregorianDay: 29, gregorianMonth: "حزيران", dayOfWeek: "الإثنين" },
      { hijri: 14, gregorianDay: 30, gregorianMonth: "حزيران", dayOfWeek: "الثلاثاء" },
      { hijri: 15, gregorianDay: 1, gregorianMonth: "تموز", dayOfWeek: "الأربعاء" },
      { hijri: 16, gregorianDay: 2, gregorianMonth: "تموز", dayOfWeek: "الخميس" },
      { hijri: 17, gregorianDay: 3, gregorianMonth: "تموز", dayOfWeek: "الجمعة" },
      { hijri: 18, gregorianDay: 4, gregorianMonth: "تموز", dayOfWeek: "السبت" },
      { hijri: 19, gregorianDay: 5, gregorianMonth: "تموز", dayOfWeek: "الأحد" },
      { hijri: 20, gregorianDay: 6, gregorianMonth: "تموز", dayOfWeek: "الإثنين" },
      { hijri: 21, gregorianDay: 7, gregorianMonth: "تموز", dayOfWeek: "الثلاثاء" },
      { hijri: 22, gregorianDay: 8, gregorianMonth: "تموز", dayOfWeek: "الأربعاء" },
      { hijri: 23, gregorianDay: 9, gregorianMonth: "تموز", dayOfWeek: "الخميس" },
      { hijri: 24, gregorianDay: 10, gregorianMonth: "تموز", dayOfWeek: "الجمعة" },
      { hijri: 25, gregorianDay: 11, gregorianMonth: "تموز", dayOfWeek: "السبت" },
      { hijri: 26, gregorianDay: 12, gregorianMonth: "تموز", dayOfWeek: "الأحد" },
      { hijri: 27, gregorianDay: 13, gregorianMonth: "تموز", dayOfWeek: "الإثنين" },
      { hijri: 28, gregorianDay: 14, gregorianMonth: "تموز", dayOfWeek: "الثلاثاء" },
      { hijri: 29, gregorianDay: 15, gregorianMonth: "تموز", dayOfWeek: "الأربعاء" }
    ]
  },

  // 2. صفر 1448
  {
    id: 2,
    name: "صفر",
    nameWithPrefix: "صفر الخير",
    yearHijri: 1448,
    gregorianMonthsSpan: "تموز / آب 2026م",
    startDayOfWeek: 5, // الخميس 1 صفر = 16 تموز 2026
    totalDays: 30, // 30 يوماً حتى 14 آب
    crescentPrimary: {
      dateHijri: "29 المحرم الحرام 1448 هـ",
      dateGregorian: "15 تموز 2026 م",
      sunsetTime: "7:11 م",
      ageHours: 30,
      ageMinutes: 26,
      altitudeDegrees: 11,
      altitudeMinutes: 23,
      durationHours: 1,
      durationMinutes: 1,
      illuminatedPercentage: 2.28,
      statusText: "يُتوقع أن يُرى الهلال مرتفعاً واضحاً",
      isPrimary: true
    },
    scorpioTimings: [
      {
        entryDay: "الثلاثاء",
        entryDateGregorian: "21 تموز 2026 م",
        entryTime: "4:35",
        entryPeriod: "مساءً",
        exitDay: "الجمعة",
        exitDateGregorian: "24 تموز 2026 م",
        exitTime: "4:07",
        exitPeriod: "صباحاً"
      }
    ],
    events: [
      { day: 1, title: "واقعة صفين", description: "بدء واقعة صفين سنة 37 هـ", yearHijriOrPre: "سنة 37 هـ", type: "historical" },
      { day: 1, title: "دخول السبايا إلى الشام", description: "دخول سبايا آل البيت (عليهم السلام) إلى بلاد الشام", yearHijriOrPre: "سنة 61 هـ", type: "historical" },
      { day: 2, title: "شهادة زيد بن علي (ع)", description: "شهادة زيد بن علي بن الحسين (عليهما السلام)", yearHijriOrPre: "سنة 121 هـ", type: "shahadah" },
      { day: 5, title: "شهادة السيدة رقية (ع)", description: "شهادة السيدة رقية بنت الإمام الحسين (عليهما السلام) في دمشق", yearHijriOrPre: "سنة 61 هـ", type: "shahadah" },
      { day: 7, title: "شهادة الإمام الحسن المجتبى (ع)", description: "شهادة الإمام الحسن بن علي بن أبي طالب (عليه السلام) بالسم", yearHijriOrPre: "سنة 50 هـ", type: "shahadah", isFourteenInfallibles: true, infallibleName: "الإمام الحسن المجتبى (ع)" },
      { day: 8, title: "وفاة سلمان الفارسي", description: "وفاة الصحابي الجليل سلمان الفارسي (المحمدي) (رضوان الله عليه)", yearHijriOrPre: "سنة 35 هـ", type: "historical" },
      { day: 9, title: "شهادة عمار بن ياسر", description: "شهادة الصحابي الجليل عمار بن ياسر (رضوان الله عليه) في معركة صفين", yearHijriOrPre: "سنة 37 هـ", type: "shahadah" },
      { day: 9, title: "واقعة النهروان", description: "واقعة النهروان وقتال الخوارج", yearHijriOrPre: "سنة 38 هـ", type: "historical" },
      { day: 14, title: "شهادة محمد بن أبي بكر", description: "شهادة محمد بن أبي بكر (رضوان الله عليه) في مصر", yearHijriOrPre: "سنة 38 هـ", type: "shahadah" },
      { day: 17, title: "شهادة الإمام الرضا (ع)", description: "شهادة الإمام علي بن موسى الرضا (عليه السلام) (على رواية)", yearHijriOrPre: "سنة 203 هـ", type: "shahadah", isFourteenInfallibles: true, infallibleName: "الإمام علي الرضا (ع)" },
      { day: 20, title: "أربعينية الإمام الحسين (ع)", description: "ورود السبايا وجابر بن عبد الله الأنصاري إلى أرض كربلاء (زيارة الأربعين)", yearHijriOrPre: "سنة 61 هـ", type: "eid" },
      { day: 28, title: "رحلة النبي الأعظم (ص)", description: "وفاة خاتم الأنبياء والمرسلين نبي الرحمة محمد (صلى الله عليه وآله)", yearHijriOrPre: "سنة 11 هـ", type: "shahadah", isFourteenInfallibles: true, infallibleName: "النبي محمد (ص)" }
    ],
    grid: [
      { hijri: 1, gregorianDay: 16, gregorianMonth: "تموز", dayOfWeek: "الخميس" },
      { hijri: 2, gregorianDay: 17, gregorianMonth: "تموز", dayOfWeek: "الجمعة" },
      { hijri: 3, gregorianDay: 18, gregorianMonth: "تموز", dayOfWeek: "السبت" },
      { hijri: 4, gregorianDay: 19, gregorianMonth: "تموز", dayOfWeek: "الأحد" },
      { hijri: 5, gregorianDay: 20, gregorianMonth: "تموز", dayOfWeek: "الإثنين" },
      { hijri: 6, gregorianDay: 21, gregorianMonth: "تموز", dayOfWeek: "الثلاثاء" },
      { hijri: 7, gregorianDay: 22, gregorianMonth: "تموز", dayOfWeek: "الأربعاء" },
      { hijri: 8, gregorianDay: 23, gregorianMonth: "تموز", dayOfWeek: "الخميس" },
      { hijri: 9, gregorianDay: 24, gregorianMonth: "تموز", dayOfWeek: "الجمعة" },
      { hijri: 10, gregorianDay: 25, gregorianMonth: "تموز", dayOfWeek: "السبت" },
      { hijri: 11, gregorianDay: 26, gregorianMonth: "تموز", dayOfWeek: "الأحد" },
      { hijri: 12, gregorianDay: 27, gregorianMonth: "تموز", dayOfWeek: "الإثنين" },
      { hijri: 13, gregorianDay: 28, gregorianMonth: "تموز", dayOfWeek: "الثلاثاء" },
      { hijri: 14, gregorianDay: 29, gregorianMonth: "تموز", dayOfWeek: "الأربعاء" },
      { hijri: 15, gregorianDay: 30, gregorianMonth: "تموز", dayOfWeek: "الخميس" },
      { hijri: 16, gregorianDay: 31, gregorianMonth: "تموز", dayOfWeek: "الجمعة" },
      { hijri: 17, gregorianDay: 1, gregorianMonth: "آب", dayOfWeek: "السبت" },
      { hijri: 18, gregorianDay: 2, gregorianMonth: "آب", dayOfWeek: "الأحد" },
      { hijri: 19, gregorianDay: 3, gregorianMonth: "آب", dayOfWeek: "الإثنين" },
      { hijri: 20, gregorianDay: 4, gregorianMonth: "آب", dayOfWeek: "الثلاثاء" },
      { hijri: 21, gregorianDay: 5, gregorianMonth: "آب", dayOfWeek: "الأربعاء" },
      { hijri: 22, gregorianDay: 6, gregorianMonth: "آب", dayOfWeek: "الخميس" },
      { hijri: 23, gregorianDay: 7, gregorianMonth: "آب", dayOfWeek: "الجمعة" },
      { hijri: 24, gregorianDay: 8, gregorianMonth: "آب", dayOfWeek: "السبت" },
      { hijri: 25, gregorianDay: 9, gregorianMonth: "آب", dayOfWeek: "الأحد" },
      { hijri: 26, gregorianDay: 10, gregorianMonth: "آب", dayOfWeek: "الإثنين" },
      { hijri: 27, gregorianDay: 11, gregorianMonth: "آب", dayOfWeek: "الثلاثاء" },
      { hijri: 28, gregorianDay: 12, gregorianMonth: "آب", dayOfWeek: "الأربعاء" },
      { hijri: 29, gregorianDay: 13, gregorianMonth: "آب", dayOfWeek: "الخميس" },
      { hijri: 30, gregorianDay: 14, gregorianMonth: "آب", dayOfWeek: "الجمعة" }
    ]
  },

  // 3. ربيع الأول 1448
  {
    id: 3,
    name: "ربيع الأول",
    nameWithPrefix: "ربيع الأول",
    yearHijri: 1448,
    gregorianMonthsSpan: "آب / أيلول 2026م",
    startDayOfWeek: 0, // السبت 1 ربيع الأول = 15 آب 2026
    totalDays: 29,
    crescentPrimary: {
      dateHijri: "30 صفر 1448 هـ",
      dateGregorian: "14 آب 2026 م",
      sunsetTime: "6:48 م",
      ageHours: 46,
      ageMinutes: 10,
      altitudeDegrees: 12,
      altitudeMinutes: 3,
      durationHours: 1,
      durationMinutes: 0,
      illuminatedPercentage: 4.38,
      statusText: "يُتوقع أن يُرى الهلال مرتفعاً واضحاً",
      isPrimary: true
    },
    crescentPreviousNight: {
      dateHijri: "29 صفر 1448 هـ",
      dateGregorian: "13 آب 2026 م",
      sunsetTime: "6:49 م",
      ageHours: 22,
      ageMinutes: 11,
      altitudeDegrees: 5,
      altitudeMinutes: 33,
      durationHours: 0,
      durationMinutes: 28,
      illuminatedPercentage: 1.08,
      statusText: "لا يُتوقع التمكن من رؤية الهلال بالعين المجردة",
      isPrimary: false
    },
    scorpioTimings: [
      {
        entryDay: "الثلاثاء",
        entryDateGregorian: "18 آب 2026 م",
        entryTime: "0:47",
        entryPeriod: "بعد منتصف الليل",
        exitDay: "الخميس",
        exitDateGregorian: "20 آب 2026 م",
        exitTime: "11:30",
        exitPeriod: "صباحاً"
      }
    ],
    events: [
      { day: 1, title: "ليلة المبيت والهجرة النبوية", description: "مبيت الإمام أمير المؤمنين علي (ع) في فراش النبي (ص) وهجرة النبي إلى المدينة", yearHijriOrPre: "سنة 1 هـ", type: "historical" },
      { day: 3, title: "إحراق الكعبة بالمنجنيق", description: "إحراق الكعبة المشرفة بالمنجنيق بأمر حصين بن نمير قائد جيش يزيد", yearHijriOrPre: "سنة 64 هـ", type: "historical" },
      { day: 4, title: "خروج النبي من غار ثور", description: "خروج النبي (صلى الله عليه وآله) من غار ثور متوجهاً إلى المدينة المنورة", yearHijriOrPre: "السنة الأولى من الهجرة", type: "historical" },
      { day: 5, title: "وفاة السيدة سكينة (ع)", description: "وفاة السيدة سكينة بنت الإمام الحسين (عليهما السلام)", yearHijriOrPre: "سنة 117 هـ", type: "historical" },
      { day: 8, title: "شهادة الإمام العسكري وبدء الإمامة", description: "شهادة الإمام الحسن العسكري (ع) وبداية إمامة بقية الله الأعظم الحجة بن الحسن (عج) على رواية", yearHijriOrPre: "سنة 260 هـ", type: "shahadah", isFourteenInfallibles: true, infallibleName: "الإمام الحسن العسكري (ع)" },
      { day: 10, title: "وفاة عبد المطلب", description: "وفاة عبد المطلب جد النبي الأكرم (ص) في السنة الثامنة من ولادته", yearHijriOrPre: "سنة 45 قبل الهجرة", type: "historical" },
      { day: 10, title: "زواج الرسول من خديجة", description: "زواج الرسول الأكرم (ص) من خديجة الكبرى (ع) وهو في سن الخامسة والعشرين", yearHijriOrPre: "سنة 28 قبل الهجرة", type: "eid" },
      { day: 12, title: "ميلاد النبي (على رواية)", description: "ولادة النبي الأكرم (صلى الله عليه وآله) على رواية / ودخول النبي المدينة", yearHijriOrPre: "السنة الأولى للهجرة", type: "wiladah", isFourteenInfallibles: true, infallibleName: "النبي محمد (ص)" },
      { day: 17, title: "المولد النبوي الشريف ومولد الصادق (ع)", description: "ولادة سيد الرسل محمد (ص) (53 ق.هـ) وولادة الإمام جعفر بن محمد الصادق (ع) (سنة 83 هـ)", yearHijriOrPre: "53 ق.هـ / 83 هـ", type: "wiladah", isFourteenInfallibles: true, infallibleName: "النبي محمد (ص) والإمام الصادق (ع)" },
      { day: 22, title: "غزوة بني النضير", description: "غزوة بني النضير في السنة الرابعة للهجرة", yearHijriOrPre: "سنة 4 هـ", type: "ghazwah" },
      { day: 25, title: "استشهاد سعيد بن جبير", description: "استشهاد سعيد بن جبير (رضوان الله عليه) على يد الحجاج", yearHijriOrPre: "سنة 95 هـ", type: "shahadah" },
      { day: 26, title: "صلح الإمام الحسن (ع)", description: "إبرام معاهدة الصلح بين الإمام الحسن بن علي (ع) ومعاوية", yearHijriOrPre: "سنة 41 هـ", type: "historical" }
    ],
    grid: [
      { hijri: 1, gregorianDay: 15, gregorianMonth: "آب", dayOfWeek: "السبت" },
      { hijri: 2, gregorianDay: 16, gregorianMonth: "آب", dayOfWeek: "الأحد" },
      { hijri: 3, gregorianDay: 17, gregorianMonth: "آب", dayOfWeek: "الإثنين" },
      { hijri: 4, gregorianDay: 18, gregorianMonth: "آب", dayOfWeek: "الثلاثاء" },
      { hijri: 5, gregorianDay: 19, gregorianMonth: "آب", dayOfWeek: "الأربعاء" },
      { hijri: 6, gregorianDay: 20, gregorianMonth: "آب", dayOfWeek: "الخميس" },
      { hijri: 7, gregorianDay: 21, gregorianMonth: "آب", dayOfWeek: "الجمعة" },
      { hijri: 8, gregorianDay: 22, gregorianMonth: "آب", dayOfWeek: "السبت" },
      { hijri: 9, gregorianDay: 23, gregorianMonth: "آب", dayOfWeek: "الأحد" },
      { hijri: 10, gregorianDay: 24, gregorianMonth: "آب", dayOfWeek: "الإثنين" },
      { hijri: 11, gregorianDay: 25, gregorianMonth: "آب", dayOfWeek: "الثلاثاء" },
      { hijri: 12, gregorianDay: 26, gregorianMonth: "آب", dayOfWeek: "الأربعاء" },
      { hijri: 13, gregorianDay: 27, gregorianMonth: "آب", dayOfWeek: "الخميس" },
      { hijri: 14, gregorianDay: 28, gregorianMonth: "آب", dayOfWeek: "الجمعة" },
      { hijri: 15, gregorianDay: 29, gregorianMonth: "آب", dayOfWeek: "السبت" },
      { hijri: 16, gregorianDay: 30, gregorianMonth: "آب", dayOfWeek: "الأحد" },
      { hijri: 17, gregorianDay: 31, gregorianMonth: "آب", dayOfWeek: "الإثنين" },
      { hijri: 18, gregorianDay: 1, gregorianMonth: "أيلول", dayOfWeek: "الثلاثاء" },
      { hijri: 19, gregorianDay: 2, gregorianMonth: "أيلول", dayOfWeek: "الأربعاء" },
      { hijri: 20, gregorianDay: 3, gregorianMonth: "أيلول", dayOfWeek: "الخميس" },
      { hijri: 21, gregorianDay: 4, gregorianMonth: "أيلول", dayOfWeek: "الجمعة" },
      { hijri: 22, gregorianDay: 5, gregorianMonth: "أيلول", dayOfWeek: "السبت" },
      { hijri: 23, gregorianDay: 6, gregorianMonth: "أيلول", dayOfWeek: "الأحد" },
      { hijri: 24, gregorianDay: 7, gregorianMonth: "أيلول", dayOfWeek: "الإثنين" },
      { hijri: 25, gregorianDay: 8, gregorianMonth: "أيلول", dayOfWeek: "الثلاثاء" },
      { hijri: 26, gregorianDay: 9, gregorianMonth: "أيلول", dayOfWeek: "الأربعاء" },
      { hijri: 27, gregorianDay: 10, gregorianMonth: "أيلول", dayOfWeek: "الخميس" },
      { hijri: 28, gregorianDay: 11, gregorianMonth: "أيلول", dayOfWeek: "الجمعة" },
      { hijri: 29, gregorianDay: 12, gregorianMonth: "أيلول", dayOfWeek: "السبت" }
    ]
  },

  // 4. ربيع الآخر 1448
  {
    id: 4,
    name: "ربيع الآخر",
    nameWithPrefix: "ربيع الآخر (ربيع الثاني)",
    yearHijri: 1448,
    gregorianMonthsSpan: "أيلول / تشرين الأول 2026م",
    startDayOfWeek: 1, // الأحد 1 ربيع الآخر = 13 أيلول 2026
    totalDays: 30,
    crescentPrimary: {
      dateHijri: "29 ربيع الأول 1448 هـ",
      dateGregorian: "12 أيلول 2026 م",
      sunsetTime: "6:12 م",
      ageHours: 35,
      ageMinutes: 46,
      altitudeDegrees: 6,
      altitudeMinutes: 6,
      durationHours: 0,
      durationMinutes: 30,
      illuminatedPercentage: 2.36,
      statusText: "يُتوقع التمكن من رؤية الهلال بالعين المجردة في حالة صفاء الجو تماماً",
      isPrimary: true
    },
    scorpioTimings: [
      {
        entryDay: "الإثنين",
        entryDateGregorian: "14 أيلول 2026 م",
        entryTime: "9:45",
        entryPeriod: "صباحاً",
        exitDay: "الأربعاء",
        exitDateGregorian: "16 أيلول 2026 م",
        exitTime: "07:41",
        exitPeriod: "مساءً"
      },
      {
        entryDay: "الأحد",
        entryDateGregorian: "11 تشرين الأول 2026 م",
        entryTime: "6:22",
        entryPeriod: "مساءً",
        exitDay: "الأربعاء",
        exitDateGregorian: "14 تشرين الأول 2026 م",
        exitTime: "03:59",
        exitPeriod: "صباحاً",
        note: "يمتد إلى بداية جمادى الأولى"
      }
    ],
    events: [
      { day: 8, title: "شهادة الزهراء (ع) - الرواية الأولى", description: "شهادة سيدة نساء العالمين فاطمة الزهراء (عليها السلام) على رواية 40 يوماً", yearHijriOrPre: "سنة 11 هـ", type: "shahadah", isFourteenInfallibles: true, infallibleName: "السيدة فاطمة الزهراء (ع)" },
      { day: 10, title: "ولادة الإمام الحسن العسكري (ع)", description: "ولادة الإمام الحسن العسكري (عليه السلام) (على رواية)", yearHijriOrPre: "سنة 232 هـ", type: "wiladah", isFourteenInfallibles: true, infallibleName: "الإمام الحسن العسكري (ع)" },
      { day: 10, title: "وفاة السيدة فاطمة المعصومة (ع)", description: "وفاة السيدة المعصومة بنت الإمام موسى الكاظم (عليهما السلام) بقم المقدسة", yearHijriOrPre: "سنة 201 هـ", type: "historical" },
      { day: 14, title: "خروج المختار الثقفي", description: "خروج المختار الثقفي (رضوان الله عليه) في الكوفة للأخذ بثأر شهداء كربلاء", yearHijriOrPre: "سنة 66 هـ", type: "historical" }
    ],
    grid: [
      { hijri: 1, gregorianDay: 13, gregorianMonth: "أيلول", dayOfWeek: "الأحد" },
      { hijri: 2, gregorianDay: 14, gregorianMonth: "أيلول", dayOfWeek: "الإثنين" },
      { hijri: 3, gregorianDay: 15, gregorianMonth: "أيلول", dayOfWeek: "الثلاثاء" },
      { hijri: 4, gregorianDay: 16, gregorianMonth: "أيلول", dayOfWeek: "الأربعاء" },
      { hijri: 5, gregorianDay: 17, gregorianMonth: "أيلول", dayOfWeek: "الخميس" },
      { hijri: 6, gregorianDay: 18, gregorianMonth: "أيلول", dayOfWeek: "الجمعة" },
      { hijri: 7, gregorianDay: 19, gregorianMonth: "أيلول", dayOfWeek: "السبت" },
      { hijri: 8, gregorianDay: 20, gregorianMonth: "أيلول", dayOfWeek: "الأحد" },
      { hijri: 9, gregorianDay: 21, gregorianMonth: "أيلول", dayOfWeek: "الإثنين" },
      { hijri: 10, gregorianDay: 22, gregorianMonth: "أيلول", dayOfWeek: "الثلاثاء" },
      { hijri: 11, gregorianDay: 23, gregorianMonth: "أيلول", dayOfWeek: "الأربعاء" },
      { hijri: 12, gregorianDay: 24, gregorianMonth: "أيلول", dayOfWeek: "الخميس" },
      { hijri: 13, gregorianDay: 25, gregorianMonth: "أيلول", dayOfWeek: "الجمعة" },
      { hijri: 14, gregorianDay: 26, gregorianMonth: "أيلول", dayOfWeek: "السبت" },
      { hijri: 15, gregorianDay: 27, gregorianMonth: "أيلول", dayOfWeek: "الأحد" },
      { hijri: 16, gregorianDay: 28, gregorianMonth: "أيلول", dayOfWeek: "الإثنين" },
      { hijri: 17, gregorianDay: 29, gregorianMonth: "أيلول", dayOfWeek: "الثلاثاء" },
      { hijri: 18, gregorianDay: 30, gregorianMonth: "أيلول", dayOfWeek: "الأربعاء" },
      { hijri: 19, gregorianDay: 1, gregorianMonth: "تشرين الأول", dayOfWeek: "الخميس" },
      { hijri: 20, gregorianDay: 2, gregorianMonth: "تشرين الأول", dayOfWeek: "الجمعة" },
      { hijri: 21, gregorianDay: 3, gregorianMonth: "تشرين الأول", dayOfWeek: "السبت" },
      { hijri: 22, gregorianDay: 4, gregorianMonth: "تشرين الأول", dayOfWeek: "الأحد" },
      { hijri: 23, gregorianDay: 5, gregorianMonth: "تشرين الأول", dayOfWeek: "الإثنين" },
      { hijri: 24, gregorianDay: 6, gregorianMonth: "تشرين الأول", dayOfWeek: "الثلاثاء" },
      { hijri: 25, gregorianDay: 7, gregorianMonth: "تشرين الأول", dayOfWeek: "الأربعاء" },
      { hijri: 26, gregorianDay: 8, gregorianMonth: "تشرين الأول", dayOfWeek: "الخميس" },
      { hijri: 27, gregorianDay: 9, gregorianMonth: "تشرين الأول", dayOfWeek: "الجمعة" },
      { hijri: 28, gregorianDay: 10, gregorianMonth: "تشرين الأول", dayOfWeek: "السبت" },
      { hijri: 29, gregorianDay: 11, gregorianMonth: "تشرين الأول", dayOfWeek: "الأحد" },
      { hijri: 30, gregorianDay: 12, gregorianMonth: "تشرين الأول", dayOfWeek: "الإثنين" }
    ]
  },

  // 5. جمادى الأولى 1448
  {
    id: 5,
    name: "جمادى الأولى",
    nameWithPrefix: "جمادى الأولى",
    yearHijri: 1448,
    gregorianMonthsSpan: "تشرين الأول / تشرين الثاني 2026م",
    startDayOfWeek: 2, // الثلاثاء 1 جمادى الأولى = 13 تشرين الأول 2026
    totalDays: 30,
    crescentPrimary: {
      dateHijri: "30 ربيع الآخر 1448 هـ",
      dateGregorian: "12 تشرين الأول 2026 م",
      sunsetTime: "5:33 م",
      ageHours: 46,
      ageMinutes: 43,
      altitudeDegrees: 7,
      altitudeMinutes: 18,
      durationHours: 0,
      durationMinutes: 41,
      illuminatedPercentage: 3.36,
      statusText: "يُتوقع أن يُرى الهلال واضحاً جداً",
      isPrimary: true
    },
    crescentPreviousNight: {
      dateHijri: "29 ربيع الآخر 1448 هـ",
      dateGregorian: "11 تشرين الأول 2026 م",
      sunsetTime: "5:34 م",
      ageHours: 22,
      ageMinutes: 44,
      altitudeDegrees: 1,
      altitudeMinutes: 35,
      durationHours: 0,
      durationMinutes: 10,
      illuminatedPercentage: 1.05,
      statusText: "لا يُتوقع التمكن من رؤية الهلال بالعين المجردة",
      isPrimary: false
    },
    scorpioTimings: [
      {
        entryDay: "الأحد",
        entryDateGregorian: "11 تشرين الأول 2026 م",
        entryTime: "6:22",
        entryPeriod: "مساءً",
        exitDay: "الأربعاء",
        exitDateGregorian: "14 تشرين الأول 2026 م",
        exitTime: "03:59",
        exitPeriod: "صباحاً"
      },
      {
        entryDay: "الأحد",
        entryDateGregorian: "8 تشرين الثاني 2026 م",
        entryTime: "1:41",
        entryPeriod: "صباحاً",
        exitDay: "الثلاثاء",
        exitDateGregorian: "10 تشرين الثاني 2026 م",
        exitTime: "11:36",
        exitPeriod: "صباحاً"
      }
    ],
    events: [
      { day: 5, title: "ولادة السيدة زينب الكبرى (ع)", description: "ولادة بطلة كربلاء السيدة زينب بنت أمير المؤمنين (عليهما السلام)", yearHijriOrPre: "سنة 5 هـ", type: "wiladah" },
      { day: 6, title: "حرب مؤتة واستشهاد جعفر الطيار", description: "حرب مؤتة واستشهاد جعفر بن أبي طالب وزيد بن حارثة (عليهما السلام)", yearHijriOrPre: "سنة 8 هـ", type: "shahadah" },
      { day: 10, title: "واقعة الجمل", description: "واقعة الجمل بالبصرة", yearHijriOrPre: "سنة 36 هـ", type: "historical" },
      { day: 13, title: "شهادة الزهراء (ع) - الرواية الثانية (75 يوماً)", description: "شهادة سيدة نساء العالمين فاطمة الزهراء (عليها السلام) على رواية 75 يوماً", yearHijriOrPre: "سنة 11 هـ", type: "shahadah", isFourteenInfallibles: true, infallibleName: "السيدة فاطمة الزهراء (ع)" },
      { day: 15, title: "فتح البصرة", description: "فتح البصرة على يد الإمام أمير المؤمنين (عليه السلام)", yearHijriOrPre: "سنة 36 هـ", type: "historical" },
      { day: 19, title: "شهادة زيد بن صوحان", description: "شهادة زيد بن صوحان (رضوان الله عليه) في حرب الجمل", yearHijriOrPre: "سنة 36 هـ", type: "shahadah" },
      { day: 22, title: "وفاة القاسم بن الكاظم (ع)", description: "وفاة القاسم بن الإمام موسى الكاظم (عليهما السلام) على رواية", yearHijriOrPre: "سنة 192 هـ", type: "historical" },
      { day: 27, title: "تجدد تفجير منارتي سامراء", description: "تجدد الاعتداء الآثم على مرقد العسكريين بتفجير المأذنتين الشريفتين", yearHijriOrPre: "سنة 1428 هـ", type: "historical" },
      { day: 30, title: "وفاة السفير الثاني محمد بن عثمان", description: "وفاة محمد بن عثمان بن سعيد الخلاني (رضوان الله عليه) السفير الثاني للإمام المهدي (عج)", yearHijriOrPre: "سنة 304 هـ", type: "historical" }
    ],
    grid: [
      { hijri: 1, gregorianDay: 13, gregorianMonth: "تشرين الأول", dayOfWeek: "الثلاثاء" },
      { hijri: 2, gregorianDay: 14, gregorianMonth: "تشرين الأول", dayOfWeek: "الأربعاء" },
      { hijri: 3, gregorianDay: 15, gregorianMonth: "تشرين الأول", dayOfWeek: "الخميس" },
      { hijri: 4, gregorianDay: 16, gregorianMonth: "تشرين الأول", dayOfWeek: "الجمعة" },
      { hijri: 5, gregorianDay: 17, gregorianMonth: "تشرين الأول", dayOfWeek: "السبت" },
      { hijri: 6, gregorianDay: 18, gregorianMonth: "تشرين الأول", dayOfWeek: "الأحد" },
      { hijri: 7, gregorianDay: 19, gregorianMonth: "تشرين الأول", dayOfWeek: "الإثنين" },
      { hijri: 8, gregorianDay: 20, gregorianMonth: "تشرين الأول", dayOfWeek: "الثلاثاء" },
      { hijri: 9, gregorianDay: 21, gregorianMonth: "تشرين الأول", dayOfWeek: "الأربعاء" },
      { hijri: 10, gregorianDay: 22, gregorianMonth: "تشرين الأول", dayOfWeek: "الخميس" },
      { hijri: 11, gregorianDay: 23, gregorianMonth: "تشرين الأول", dayOfWeek: "الجمعة" },
      { hijri: 12, gregorianDay: 24, gregorianMonth: "تشرين الأول", dayOfWeek: "السبت" },
      { hijri: 13, gregorianDay: 25, gregorianMonth: "تشرين الأول", dayOfWeek: "الأحد" },
      { hijri: 14, gregorianDay: 26, gregorianMonth: "تشرين الأول", dayOfWeek: "الإثنين" },
      { hijri: 15, gregorianDay: 27, gregorianMonth: "تشرين الأول", dayOfWeek: "الثلاثاء" },
      { hijri: 16, gregorianDay: 28, gregorianMonth: "تشرين الأول", dayOfWeek: "الأربعاء" },
      { hijri: 17, gregorianDay: 29, gregorianMonth: "تشرين الأول", dayOfWeek: "الخميس" },
      { hijri: 18, gregorianDay: 30, gregorianMonth: "تشرين الأول", dayOfWeek: "الجمعة" },
      { hijri: 19, gregorianDay: 31, gregorianMonth: "تشرين الأول", dayOfWeek: "السبت" },
      { hijri: 20, gregorianDay: 1, gregorianMonth: "تشرين الثاني", dayOfWeek: "الأحد" },
      { hijri: 21, gregorianDay: 2, gregorianMonth: "تشرين الثاني", dayOfWeek: "الإثنين" },
      { hijri: 22, gregorianDay: 3, gregorianMonth: "تشرين الثاني", dayOfWeek: "الثلاثاء" },
      { hijri: 23, gregorianDay: 4, gregorianMonth: "تشرين الثاني", dayOfWeek: "الأربعاء" },
      { hijri: 24, gregorianDay: 5, gregorianMonth: "تشرين الثاني", dayOfWeek: "الخميس" },
      { hijri: 25, gregorianDay: 6, gregorianMonth: "تشرين الثاني", dayOfWeek: "الجمعة" },
      { hijri: 26, gregorianDay: 7, gregorianMonth: "تشرين الثاني", dayOfWeek: "السبت" },
      { hijri: 27, gregorianDay: 8, gregorianMonth: "تشرين الثاني", dayOfWeek: "الأحد" },
      { hijri: 28, gregorianDay: 9, gregorianMonth: "تشرين الثاني", dayOfWeek: "الإثنين" },
      { hijri: 29, gregorianDay: 10, gregorianMonth: "تشرين الثاني", dayOfWeek: "الثلاثاء" },
      { hijri: 30, gregorianDay: 11, gregorianMonth: "تشرين الثاني", dayOfWeek: "الأربعاء" }
    ]
  },

  // 6. جمادى الآخرة 1448
  {
    id: 6,
    name: "جمادى الآخرة",
    nameWithPrefix: "جمادى الآخرة (جمادى الثانية)",
    yearHijri: 1448,
    gregorianMonthsSpan: "تشرين الثاني / كانون الأول 2026م",
    startDayOfWeek: 3, // الخميس 1 جمادى الآخرة = 12 تشرين الثاني 2026
    totalDays: 29,
    crescentPrimary: {
      dateHijri: "30 جمادى الأولى 1448 هـ",
      dateGregorian: "11 تشرين الثاني 2026 م",
      sunsetTime: "5:05 م",
      ageHours: 55,
      ageMinutes: 3,
      altitudeDegrees: 10,
      altitudeMinutes: 55,
      durationHours: 1,
      durationMinutes: 10,
      illuminatedPercentage: 3.98,
      statusText: "يُتوقع أن يُرى الهلال مرتفعاً واضحاً جداً",
      isPrimary: true
    },
    crescentPreviousNight: {
      dateHijri: "29 جمادى الأولى 1448 هـ",
      dateGregorian: "10 تشرين الثاني 2026 م",
      sunsetTime: "5:06 م",
      ageHours: 31,
      ageMinutes: 4,
      altitudeDegrees: 4,
      altitudeMinutes: 3,
      durationHours: 0,
      durationMinutes: 23,
      illuminatedPercentage: 1.42,
      statusText: "لا يُتوقع التمكن من رؤية الهلال بالعين المجردة",
      isPrimary: false
    },
    scorpioTimings: [
      {
        entryDay: "السبت",
        entryDateGregorian: "5 كانون الأول 2026 م",
        entryTime: "7:36",
        entryPeriod: "صباحاً",
        exitDay: "الإثنين",
        exitDateGregorian: "7 كانون الأول 2026 م",
        exitTime: "06:06",
        exitPeriod: "مساءً"
      }
    ],
    events: [
      { day: 3, title: "شهادة الزهراء (ع) - الرواية الثالثة (95 يوماً)", description: "شهادة سيدة نساء العالمين فاطمة الزهراء (عليها السلام) على الرواية المشهورة", yearHijriOrPre: "سنة 11 هـ", type: "shahadah", isFourteenInfallibles: true, infallibleName: "السيدة فاطمة الزهراء (ع)" },
      { day: 13, title: "وفاة أم البنين (ع)", description: "وفاة أم البنين السيدة فاطمة الكلابية والدة العباس وإخوته (عليهم السلام)", yearHijriOrPre: "سنة 64 هـ", type: "historical" },
      { day: 19, title: "زواج عبد الله وآمنة", description: "زواج عبد الله بن عبد المطلب وآمنة بنت وهب والدي النبي الأكرم (ص)", type: "eid" },
      { day: 20, title: "ولادة الصديقة الزهراء (ع)", description: "ولادة سيدة نساء العالمين السيدة فاطمة الزهراء (عليها السلام)", yearHijriOrPre: "سنة 8 قبل الهجرة", type: "wiladah", isFourteenInfallibles: true, infallibleName: "السيدة فاطمة الزهراء (ع)" },
      { day: 21, title: "رجوع أمير المؤمنين من الجمل", description: "رجوع الإمام أمير المؤمنين (عليه السلام) من حرب الجمل", yearHijriOrPre: "سنة 36 هـ", type: "historical" },
      { day: 21, title: "وفاة السيدة أم كلثوم (ع)", description: "وفاة السيدة أم كلثوم بنت الإمام أمير المؤمنين (عليهما السلام)", yearHijriOrPre: "سنة 61 هـ", type: "historical" },
      { day: 29, title: "وفاة السيد محمد سبع الدجيل", description: "وفاة السيد محمد بن الإمام علي الهادي (عليهما السلام) سبع الدجيل", yearHijriOrPre: "سنة 252 هـ", type: "historical" }
    ],
    grid: [
      { hijri: 1, gregorianDay: 12, gregorianMonth: "تشرين الثاني", dayOfWeek: "الخميس" },
      { hijri: 2, gregorianDay: 13, gregorianMonth: "تشرين الثاني", dayOfWeek: "الجمعة" },
      { hijri: 3, gregorianDay: 14, gregorianMonth: "تشرين الثاني", dayOfWeek: "السبت" },
      { hijri: 4, gregorianDay: 15, gregorianMonth: "تشرين الثاني", dayOfWeek: "الأحد" },
      { hijri: 5, gregorianDay: 16, gregorianMonth: "تشرين الثاني", dayOfWeek: "الإثنين" },
      { hijri: 6, gregorianDay: 17, gregorianMonth: "تشرين الثاني", dayOfWeek: "الثلاثاء" },
      { hijri: 7, gregorianDay: 18, gregorianMonth: "تشرين الثاني", dayOfWeek: "الأربعاء" },
      { hijri: 8, gregorianDay: 19, gregorianMonth: "تشرين الثاني", dayOfWeek: "الخميس" },
      { hijri: 9, gregorianDay: 20, gregorianMonth: "تشرين الثاني", dayOfWeek: "الجمعة" },
      { hijri: 10, gregorianDay: 21, gregorianMonth: "تشرين الثاني", dayOfWeek: "السبت" },
      { hijri: 11, gregorianDay: 22, gregorianMonth: "تشرين الثاني", dayOfWeek: "الأحد" },
      { hijri: 12, gregorianDay: 23, gregorianMonth: "تشرين الثاني", dayOfWeek: "الإثنين" },
      { hijri: 13, gregorianDay: 24, gregorianMonth: "تشرين الثاني", dayOfWeek: "الثلاثاء" },
      { hijri: 14, gregorianDay: 25, gregorianMonth: "تشرين الثاني", dayOfWeek: "الأربعاء" },
      { hijri: 15, gregorianDay: 26, gregorianMonth: "تشرين الثاني", dayOfWeek: "الخميس" },
      { hijri: 16, gregorianDay: 27, gregorianMonth: "تشرين الثاني", dayOfWeek: "الجمعة" },
      { hijri: 17, gregorianDay: 28, gregorianMonth: "تشرين الثاني", dayOfWeek: "السبت" },
      { hijri: 18, gregorianDay: 29, gregorianMonth: "تشرين الثاني", dayOfWeek: "الأحد" },
      { hijri: 19, gregorianDay: 30, gregorianMonth: "تشرين الثاني", dayOfWeek: "الإثنين" },
      { hijri: 20, gregorianDay: 1, gregorianMonth: "كانون الأول", dayOfWeek: "الثلاثاء" },
      { hijri: 21, gregorianDay: 2, gregorianMonth: "كانون الأول", dayOfWeek: "الأربعاء" },
      { hijri: 22, gregorianDay: 3, gregorianMonth: "كانون الأول", dayOfWeek: "الخميس" },
      { hijri: 23, gregorianDay: 4, gregorianMonth: "كانون الأول", dayOfWeek: "الجمعة" },
      { hijri: 24, gregorianDay: 5, gregorianMonth: "كانون الأول", dayOfWeek: "السبت" },
      { hijri: 25, gregorianDay: 6, gregorianMonth: "كانون الأول", dayOfWeek: "الأحد" },
      { hijri: 26, gregorianDay: 7, gregorianMonth: "كانون الأول", dayOfWeek: "الإثنين" },
      { hijri: 27, gregorianDay: 8, gregorianMonth: "كانون الأول", dayOfWeek: "الثلاثاء" },
      { hijri: 28, gregorianDay: 9, gregorianMonth: "كانون الأول", dayOfWeek: "الأربعاء" },
      { hijri: 29, gregorianDay: 10, gregorianMonth: "كانون الأول", dayOfWeek: "الخميس" }
    ]
  },

  // 7. رجب 1448
  {
    id: 7,
    name: "رجب",
    nameWithPrefix: "رجب الأصب",
    yearHijri: 1448,
    gregorianMonthsSpan: "كانون الأول 2026م / كانون الثاني 2027م",
    startDayOfWeek: 6, // الجمعة 1 رجب = 11 كانون الأول 2026
    totalDays: 30,
    crescentPrimary: {
      dateHijri: "29 جمادى الآخرة 1448 هـ",
      dateGregorian: "10 كانون الأول 2026 م",
      sunsetTime: "4:59 م",
      ageHours: 37,
      ageMinutes: 6,
      altitudeDegrees: 8,
      altitudeMinutes: 42,
      durationHours: 0,
      durationMinutes: 55,
      illuminatedPercentage: 1.73,
      statusText: "يُتوقع أن يُرى الهلال واضحاً",
      isPrimary: true
    },
    scorpioTimings: [
      {
        entryDay: "الجمعة",
        entryDateGregorian: "1 كانون الثاني 2027 م",
        entryTime: "1:17",
        entryPeriod: "مساءً",
        exitDay: "الأحد",
        exitDateGregorian: "3 كانون الثاني 2027 م",
        exitTime: "11:57",
        exitPeriod: "مساءً"
      }
    ],
    events: [
      { day: 1, title: "ولادة الإمام محمد الباقر (ع)", description: "ولادة باقر علوم الأولين والآخرين الإمام محمد بن علي الباقر (ع) على رواية", yearHijriOrPre: "سنة 57 هـ", type: "wiladah", isFourteenInfallibles: true, infallibleName: "الإمام محمد الباقر (ع)" },
      { day: 2, title: "ولادة الإمام علي الهادي (ع)", description: "ولادة الإمام علي بن محمد الهادي (عليهما السلام)", yearHijriOrPre: "سنة 212 هـ", type: "wiladah", isFourteenInfallibles: true, infallibleName: "الإمام علي الهادي (ع)" },
      { day: 3, title: "غزوة تبوك", description: "غزوة تبوك", yearHijriOrPre: "سنة 9 هـ", type: "ghazwah" },
      { day: 3, title: "شهادة الإمام علي الهادي (ع)", description: "شهادة الإمام علي بن محمد الهادي (عليهما السلام) بسامراء", yearHijriOrPre: "سنة 254 هـ", type: "shahadah", isFourteenInfallibles: true, infallibleName: "الإمام علي الهادي (ع)" },
      { day: 10, title: "ولادة الإمام محمد الجواد (ع)", description: "ولادة باب المراد الإمام محمد بن علي الجواد (عليه السلام)", yearHijriOrPre: "سنة 195 هـ", type: "wiladah", isFourteenInfallibles: true, infallibleName: "الإمام محمد الجواد (ع)" },
      { day: 11, title: "وصول أمير المؤمنين الكوفة", description: "وصول الإمام أمير المؤمنين (ع) إلى الكوفة بعد حرب الجمل", yearHijriOrPre: "سنة 36 هـ", type: "historical" },
      { day: 12, title: "دخول أمير المؤمنين الكوفة مقراً", description: "دخول الإمام أمير المؤمنين (ع) الكوفة واتخاذها مقراً للخلافة", yearHijriOrPre: "سنة 36 هـ", type: "historical" },
      { day: 13, title: "ولادة الإمام أمير المؤمنين (ع)", description: "ولادة أسد الله الغالب الإمام أمير المؤمنين علي بن أبي طالب في جوف الكعبة", yearHijriOrPre: "سنة 23 قبل الهجرة", type: "wiladah", isFourteenInfallibles: true, infallibleName: "الإمام علي بن أبي طالب (ع)" },
      { day: 15, title: "تحويل القبلة ووفاة السيدة زينب", description: "تحويل القبلة إلى الكعبة (2 هـ) / وفاة السيدة زينب الحوراء (ع) (62 هـ) على رواية", yearHijriOrPre: "2 هـ / 62 هـ", type: "historical" },
      { day: 18, title: "وفاة إبراهيم بن الرسول", description: "وفاة إبراهيم بن الرسول الأكرم محمد (صلى الله عليه وآله)", yearHijriOrPre: "سنة 10 هـ", type: "historical" },
      { day: 24, title: "فتح خيبر ورجوع جعفر", description: "فتح خيبر على يد الإمام علي (ع) وعودة جعفر بن أبي طالب (ع) من الحبشة", yearHijriOrPre: "سنة 7 هـ", type: "ghazwah" },
      { day: 25, title: "شهادة الإمام الكاظم (ع)", description: "شهادة باب الحوائج الإمام موسى بن جعفر الكاظم (عليهما السلام) مسموماً في سجن بغداد", yearHijriOrPre: "سنة 183 هـ", type: "shahadah", isFourteenInfallibles: true, infallibleName: "الإمام موسى الكاظم (ع)" },
      { day: 26, title: "وفاة أبي طالب (ع)", description: "وفاة مؤمن قريش وناصر النبي أبو طالب عم النبي الأكرم (ص) على رواية", yearHijriOrPre: "سنة 3 قبل الهجرة", type: "historical" },
      { day: 27, title: "المبعث النبوي الشريف", description: "المبعث النبوي الشريف والإسراء والمعراج", yearHijriOrPre: "سنة 13 قبل الهجرة", type: "eid" },
      { day: 28, title: "خروج الحسين (ع) إلى مكة", description: "خروج الإمام الحسين (عليه السلام) من المدينة المنورة إلى مكة المكرمة", yearHijriOrPre: "سنة 60 هـ", type: "historical" }
    ],
    grid: [
      { hijri: 1, gregorianDay: 11, gregorianMonth: "كانون الأول", dayOfWeek: "الجمعة" },
      { hijri: 2, gregorianDay: 12, gregorianMonth: "كانون الأول", dayOfWeek: "السبت" },
      { hijri: 3, gregorianDay: 13, gregorianMonth: "كانون الأول", dayOfWeek: "الأحد" },
      { hijri: 4, gregorianDay: 14, gregorianMonth: "كانون الأول", dayOfWeek: "الإثنين" },
      { hijri: 5, gregorianDay: 15, gregorianMonth: "كانون الأول", dayOfWeek: "الثلاثاء" },
      { hijri: 6, gregorianDay: 16, gregorianMonth: "كانون الأول", dayOfWeek: "الأربعاء" },
      { hijri: 7, gregorianDay: 17, gregorianMonth: "كانون الأول", dayOfWeek: "الخميس" },
      { hijri: 8, gregorianDay: 18, gregorianMonth: "كانون الأول", dayOfWeek: "الجمعة" },
      { hijri: 9, gregorianDay: 19, gregorianMonth: "كانون الأول", dayOfWeek: "السبت" },
      { hijri: 10, gregorianDay: 20, gregorianMonth: "كانون الأول", dayOfWeek: "الأحد" },
      { hijri: 11, gregorianDay: 21, gregorianMonth: "كانون الأول", dayOfWeek: "الإثنين" },
      { hijri: 12, gregorianDay: 22, gregorianMonth: "كانون الأول", dayOfWeek: "الثلاثاء" },
      { hijri: 13, gregorianDay: 23, gregorianMonth: "كانون الأول", dayOfWeek: "الأربعاء" },
      { hijri: 14, gregorianDay: 24, gregorianMonth: "كانون الأول", dayOfWeek: "الخميس" },
      { hijri: 15, gregorianDay: 25, gregorianMonth: "كانون الأول", dayOfWeek: "الجمعة" },
      { hijri: 16, gregorianDay: 26, gregorianMonth: "كانون الأول", dayOfWeek: "السبت" },
      { hijri: 17, gregorianDay: 27, gregorianMonth: "كانون الأول", dayOfWeek: "الأحد" },
      { hijri: 18, gregorianDay: 28, gregorianMonth: "كانون الأول", dayOfWeek: "الإثنين" },
      { hijri: 19, gregorianDay: 29, gregorianMonth: "كانون الأول", dayOfWeek: "الثلاثاء" },
      { hijri: 20, gregorianDay: 30, gregorianMonth: "كانون الأول", dayOfWeek: "الأربعاء" },
      { hijri: 21, gregorianDay: 31, gregorianMonth: "كانون الأول", dayOfWeek: "الخميس" },
      { hijri: 22, gregorianDay: 1, gregorianMonth: "كانون الثاني", dayOfWeek: "الجمعة" },
      { hijri: 23, gregorianDay: 2, gregorianMonth: "كانون الثاني", dayOfWeek: "السبت" },
      { hijri: 24, gregorianDay: 3, gregorianMonth: "كانون الثاني", dayOfWeek: "الأحد" },
      { hijri: 25, gregorianDay: 4, gregorianMonth: "كانون الثاني", dayOfWeek: "الإثنين" },
      { hijri: 26, gregorianDay: 5, gregorianMonth: "كانون الثاني", dayOfWeek: "الثلاثاء" },
      { hijri: 27, gregorianDay: 6, gregorianMonth: "كانون الثاني", dayOfWeek: "الأربعاء" },
      { hijri: 28, gregorianDay: 7, gregorianMonth: "كانون الثاني", dayOfWeek: "الخميس" },
      { hijri: 29, gregorianDay: 8, gregorianMonth: "كانون الثاني", dayOfWeek: "الجمعة" },
      { hijri: 30, gregorianDay: 9, gregorianMonth: "كانون الثاني", dayOfWeek: "السبت" }
    ]
  },

  // 8. شعبان 1448
  {
    id: 8,
    name: "شعبان",
    nameWithPrefix: "شعبان المعظم",
    yearHijri: 1448,
    gregorianMonthsSpan: "كانون الثاني / شباط 2027م",
    startDayOfWeek: 1, // الأحد 1 شعبان = 10 كانون الثاني 2027
    totalDays: 30,
    crescentPrimary: {
      dateHijri: "30 رجب 1448 هـ",
      dateGregorian: "9 كانون الثاني 2027 م",
      sunsetTime: "5:16 م",
      ageHours: 41,
      ageMinutes: 52,
      altitudeDegrees: 14,
      altitudeMinutes: 31,
      durationHours: 1,
      durationMinutes: 24,
      illuminatedPercentage: 2.09,
      statusText: "يُتوقع التمكن من رؤية الهلال مرتفعاً واضحاً جداً",
      isPrimary: true
    },
    crescentPreviousNight: {
      dateHijri: "29 رجب 1448 هـ",
      dateGregorian: "8 كانون الثاني 2027 م",
      sunsetTime: "5:15 م",
      ageHours: 17,
      ageMinutes: 51,
      altitudeDegrees: 4,
      altitudeMinutes: 32,
      durationHours: 0,
      durationMinutes: 27,
      illuminatedPercentage: 0.41,
      statusText: "لا يُتوقع التمكن من رؤية الهلال بالعين المجردة",
      isPrimary: false
    },
    scorpioTimings: [
      {
        entryDay: "الخميس",
        entryDateGregorian: "28 كانون الثاني 2027 م",
        entryTime: "8:22",
        entryPeriod: "مساءً",
        exitDay: "الأحد",
        exitDateGregorian: "31 كانون الثاني 2027 م",
        exitTime: "6:13",
        exitPeriod: "صباحاً"
      }
    ],
    events: [
      { day: 3, title: "ولادة الإمام الحسين (ع)", description: "ولادة سبط النبي الأكرم سيد الشهداء الإمام الحسين بن علي (ع) / ودخوله مكة المكرمة", yearHijriOrPre: "4 هـ / 60 هـ", type: "wiladah", isFourteenInfallibles: true, infallibleName: "الإمام الحسين (ع)" },
      { day: 4, title: "ولادة أبي الفضل العباس (ع)", description: "ولادة قمر بني هاشم العباس بن علي بن أبي طالب (عليهما السلام)", yearHijriOrPre: "سنة 26 هـ", type: "wiladah" },
      { day: 5, title: "ولادة الإمام السجاد (ع)", description: "ولادة زين العابدين الإمام علي بن الحسين (عليهما السلام)", yearHijriOrPre: "سنة 38 هـ", type: "wiladah", isFourteenInfallibles: true, infallibleName: "الإمام علي السجاد (ع)" },
      { day: 11, title: "ولادة علي الأكبر (ع)", description: "ولادة شبيه رسول الله علي بن الحسين الأكبر (عليهما السلام)", yearHijriOrPre: "سنة 33 هـ", type: "wiladah" },
      { day: 12, title: "وفاة السفير الثالث الحسين بن روح", description: "وفاة الشيخ الحسين بن روح النوبختي (رض) السفير الثالث للإمام المهدي (عج)", yearHijriOrPre: "سنة 326 هـ", type: "historical" },
      { day: 15, title: "ولادة الإمام المهدي المنتظر (عج)", description: "ولادة بقية الله الأعظم الحجة بن الحسن العسكري (عج) (ليلة النصف من شعبان)", yearHijriOrPre: "سنة 255 هـ", type: "wiladah", isFourteenInfallibles: true, infallibleName: "الإمام المهدي المنتظر (عج)" },
      { day: 15, title: "وفاة السفير الرابع وبدء الغيبة الكبرى", description: "وفاة علي بن محمد السمري (رض) السفير الرابع وبدء الغيبة الكبرى", yearHijriOrPre: "سنة 329 هـ", type: "historical" },
      { day: 19, title: "غزوة بني المصطلق", description: "غزوة بني المصطلق في السنة الخامسة للهجرة", yearHijriOrPre: "سنة 5 هـ", type: "ghazwah" }
    ],
    grid: [
      { hijri: 1, gregorianDay: 10, gregorianMonth: "كانون الثاني", dayOfWeek: "الأحد" },
      { hijri: 2, gregorianDay: 11, gregorianMonth: "كانون الثاني", dayOfWeek: "الإثنين" },
      { hijri: 3, gregorianDay: 12, gregorianMonth: "كانون الثاني", dayOfWeek: "الثلاثاء" },
      { hijri: 4, gregorianDay: 13, gregorianMonth: "كانون الثاني", dayOfWeek: "الأربعاء" },
      { hijri: 5, gregorianDay: 14, gregorianMonth: "كانون الثاني", dayOfWeek: "الخميس" },
      { hijri: 6, gregorianDay: 15, gregorianMonth: "كانون الثاني", dayOfWeek: "الجمعة" },
      { hijri: 7, gregorianDay: 16, gregorianMonth: "كانون الثاني", dayOfWeek: "السبت" },
      { hijri: 8, gregorianDay: 17, gregorianMonth: "كانون الثاني", dayOfWeek: "الأحد" },
      { hijri: 9, gregorianDay: 18, gregorianMonth: "كانون الثاني", dayOfWeek: "الإثنين" },
      { hijri: 10, gregorianDay: 19, gregorianMonth: "كانون الثاني", dayOfWeek: "الثلاثاء" },
      { hijri: 11, gregorianDay: 20, gregorianMonth: "كانون الثاني", dayOfWeek: "الأربعاء" },
      { hijri: 12, gregorianDay: 21, gregorianMonth: "كانون الثاني", dayOfWeek: "الخميس" },
      { hijri: 13, gregorianDay: 22, gregorianMonth: "كانون الثاني", dayOfWeek: "الجمعة" },
      { hijri: 14, gregorianDay: 23, gregorianMonth: "كانون الثاني", dayOfWeek: "السبت" },
      { hijri: 15, gregorianDay: 24, gregorianMonth: "كانون الثاني", dayOfWeek: "الأحد" },
      { hijri: 16, gregorianDay: 25, gregorianMonth: "كانون الثاني", dayOfWeek: "الإثنين" },
      { hijri: 17, gregorianDay: 26, gregorianMonth: "كانون الثاني", dayOfWeek: "الثلاثاء" },
      { hijri: 18, gregorianDay: 27, gregorianMonth: "كانون الثاني", dayOfWeek: "الأربعاء" },
      { hijri: 19, gregorianDay: 28, gregorianMonth: "كانون الثاني", dayOfWeek: "الخميس" },
      { hijri: 20, gregorianDay: 29, gregorianMonth: "كانون الثاني", dayOfWeek: "الجمعة" },
      { hijri: 21, gregorianDay: 30, gregorianMonth: "كانون الثاني", dayOfWeek: "السبت" },
      { hijri: 22, gregorianDay: 31, gregorianMonth: "كانون الثاني", dayOfWeek: "الأحد" },
      { hijri: 23, gregorianDay: 1, gregorianMonth: "شباط", dayOfWeek: "الإثنين" },
      { hijri: 24, gregorianDay: 2, gregorianMonth: "شباط", dayOfWeek: "الثلاثاء" },
      { hijri: 25, gregorianDay: 3, gregorianMonth: "شباط", dayOfWeek: "الأربعاء" },
      { hijri: 26, gregorianDay: 4, gregorianMonth: "شباط", dayOfWeek: "الخميس" },
      { hijri: 27, gregorianDay: 5, gregorianMonth: "شباط", dayOfWeek: "الجمعة" },
      { hijri: 28, gregorianDay: 6, gregorianMonth: "شباط", dayOfWeek: "السبت" },
      { hijri: 29, gregorianDay: 7, gregorianMonth: "شباط", dayOfWeek: "الأحد" },
      { hijri: 30, gregorianDay: 8, gregorianMonth: "شباط", dayOfWeek: "الإثنين" }
    ]
  },

  // 9. شهر رمضان المبارك 1448
  {
    id: 9,
    name: "شهر رمضان",
    nameWithPrefix: "شهر رمضان المبارك",
    yearHijri: 1448,
    gregorianMonthsSpan: "شباط / آذار 2027م",
    startDayOfWeek: 2, // الثلاثاء 1 رمضان = 9 شباط 2027
    totalDays: 29,
    crescentPrimary: {
      dateHijri: "30 شعبان 1448 هـ",
      dateGregorian: "8 شباط 2027 م",
      sunsetTime: "5:42 م",
      ageHours: 46,
      ageMinutes: 46,
      altitudeDegrees: 19,
      altitudeMinutes: 48,
      durationHours: 1,
      durationMinutes: 41,
      illuminatedPercentage: 2.86,
      statusText: "يُتوقع أن يُرى الهلال واضحاً",
      isPrimary: true
    },
    crescentPreviousNight: {
      dateHijri: "29 شعبان 1448 هـ",
      dateGregorian: "7 شباط 2027 م",
      sunsetTime: "5:42 م",
      ageHours: 22,
      ageMinutes: 46,
      altitudeDegrees: 8,
      altitudeMinutes: 43,
      durationHours: 0,
      durationMinutes: 45,
      illuminatedPercentage: 0.66,
      statusText: "لا يُتوقع التمكن من رؤية الهلال بالعين المجردة",
      isPrimary: false
    },
    scorpioTimings: [
      {
        entryDay: "الخميس",
        entryDateGregorian: "25 شباط 2027 م",
        entryTime: "5:25",
        entryPeriod: "صباحاً",
        exitDay: "السبت",
        exitDateGregorian: "27 شباط 2027 م",
        exitTime: "1:52",
        exitPeriod: "مساءً"
      }
    ],
    events: [
      { day: 1, title: "وفاة السفير الأول عثمان بن سعيد", description: "وفاة عثمان بن سعيد العمري (رضوان الله عليه) النائب الأول للإمام المهدي (عج)", yearHijriOrPre: "سنة 267 هـ", type: "historical" },
      { day: 2, title: "تولي الإمام الرضا ولاية العهد", description: "تولي الإمام علي بن موسى الرضا (ع) ولاية عهد المأمون العباسي على رواية", yearHijriOrPre: "سنة 201 هـ", type: "historical" },
      { day: 3, title: "غزوة تبوك", description: "غزوة تبوك", yearHijriOrPre: "سنة 9 هـ", type: "ghazwah" },
      { day: 6, title: "بيعة الإمام الرضا (ع)", description: "بيعة الناس للإمام الرضا (عليه السلام) على رواية", yearHijriOrPre: "سنة 201 هـ", type: "historical" },
      { day: 8, title: "خروج النبي لبدر الكبرى", description: "خروج النبي الأكرم (ص) لغزوة بدر الكبرى", yearHijriOrPre: "سنة 2 هـ", type: "ghazwah" },
      { day: 10, title: "وفاة أم المؤمنين خديجة (ع)", description: "وفاة الصديقة خديجة الكبرى (عليها السلام) أم المؤمنين وكافلة النبي", yearHijriOrPre: "سنة 3 قبل الهجرة", type: "shahadah" },
      { day: 12, title: "المؤاخاة بين المهاجرين والأنصار", description: "المؤاخاة بين المهاجرين والأنصار في المدينة المنورة ومؤاخاة علي (ع) للنبي (ص)", yearHijriOrPre: "السنة الأولى للهجرة", type: "historical" },
      { day: 14, title: "مقتل المختار الثقفي", description: "مقتل المختار الثقفي (رضوان الله عليه)", yearHijriOrPre: "سنة 67 هـ", type: "historical" },
      { day: 15, title: "ولادة الإمام الحسن المجتبى (ع)", description: "ولادة كريم أهل البيت سبط النبي الأكرم الإمام الحسن بن علي (عليهما السلام)", yearHijriOrPre: "سنة 3 هـ", type: "wiladah", isFourteenInfallibles: true, infallibleName: "الإمام الحسن المجتبى (ع)" },
      { day: 15, title: "خروج مسلم بن عقيل إلى الكوفة", description: "خروج مسلم بن عقيل (عليه السلام) رسولاً عن الإمام الحسين (ع) إلى أهل الكوفة", yearHijriOrPre: "سنة 60 هـ", type: "historical" },
      { day: 17, title: "معراج النبي ومعركة بدر الكبرى", description: "عروج النبي (ص) إلى السماء / معركة بدر الكبرى وانتصار المسلمين", yearHijriOrPre: "سنة 2 هـ", type: "eid" },
      { day: 19, title: "جرح الإمام أمير المؤمنين (ع)", description: "ضربة الغدر ليلة التاسع عشر وجرح الإمام أمير المؤمنين علي (ع) في محراب مسجد الكوفة (ليلة القدر الأولى)", yearHijriOrPre: "سنة 40 هـ", type: "shahadah" },
      { day: 20, title: "فتح مكة المكرمة", description: "فتح مكة المكرمة وتطهير الكعبة من الأصنام", yearHijriOrPre: "سنة 8 هـ", type: "eid" },
      { day: 21, title: "شهادة الإمام أمير المؤمنين (ع)", description: "شهادة أسد الله الغالب الإمام علي بن أبي طالب (عليه السلام) (ليلة القدر الثانية)", yearHijriOrPre: "سنة 40 هـ", type: "shahadah", isFourteenInfallibles: true, infallibleName: "الإمام علي بن أبي طالب (ع)" },
      { day: 23, title: "ليلة القدر المباركة (ليلة الجهني)", description: "ليلة الثالث والعشرين من شهر رمضان المبارك وهي أرجى ليالي القدر المباركة", type: "eid" }
    ],
    grid: [
      { hijri: 1, gregorianDay: 9, gregorianMonth: "شباط", dayOfWeek: "الثلاثاء" },
      { hijri: 2, gregorianDay: 10, gregorianMonth: "شباط", dayOfWeek: "الأربعاء" },
      { hijri: 3, gregorianDay: 11, gregorianMonth: "شباط", dayOfWeek: "الخميس" },
      { hijri: 4, gregorianDay: 12, gregorianMonth: "شباط", dayOfWeek: "الجمعة" },
      { hijri: 5, gregorianDay: 13, gregorianMonth: "شباط", dayOfWeek: "السبت" },
      { hijri: 6, gregorianDay: 14, gregorianMonth: "شباط", dayOfWeek: "الأحد" },
      { hijri: 7, gregorianDay: 15, gregorianMonth: "شباط", dayOfWeek: "الإثنين" },
      { hijri: 8, gregorianDay: 16, gregorianMonth: "شباط", dayOfWeek: "الثلاثاء" },
      { hijri: 9, gregorianDay: 17, gregorianMonth: "شباط", dayOfWeek: "الأربعاء" },
      { hijri: 10, gregorianDay: 18, gregorianMonth: "شباط", dayOfWeek: "الخميس" },
      { hijri: 11, gregorianDay: 19, gregorianMonth: "شباط", dayOfWeek: "الجمعة" },
      { hijri: 12, gregorianDay: 20, gregorianMonth: "شباط", dayOfWeek: "السبت" },
      { hijri: 13, gregorianDay: 21, gregorianMonth: "شباط", dayOfWeek: "الأحد" },
      { hijri: 14, gregorianDay: 22, gregorianMonth: "شباط", dayOfWeek: "الإثنين" },
      { hijri: 15, gregorianDay: 23, gregorianMonth: "شباط", dayOfWeek: "الثلاثاء" },
      { hijri: 16, gregorianDay: 24, gregorianMonth: "شباط", dayOfWeek: "الأربعاء" },
      { hijri: 17, gregorianDay: 25, gregorianMonth: "شباط", dayOfWeek: "الخميس" },
      { hijri: 18, gregorianDay: 26, gregorianMonth: "شباط", dayOfWeek: "الجمعة" },
      { hijri: 19, gregorianDay: 27, gregorianMonth: "شباط", dayOfWeek: "السبت" },
      { hijri: 20, gregorianDay: 28, gregorianMonth: "شباط", dayOfWeek: "الأحد" },
      { hijri: 21, gregorianDay: 1, gregorianMonth: "آذار", dayOfWeek: "الإثنين" },
      { hijri: 22, gregorianDay: 2, gregorianMonth: "آذار", dayOfWeek: "الثلاثاء" },
      { hijri: 23, gregorianDay: 3, gregorianMonth: "آذار", dayOfWeek: "الأربعاء" },
      { hijri: 24, gregorianDay: 4, gregorianMonth: "آذار", dayOfWeek: "الخميس" },
      { hijri: 25, gregorianDay: 5, gregorianMonth: "آذار", dayOfWeek: "الجمعة" },
      { hijri: 26, gregorianDay: 6, gregorianMonth: "آذار", dayOfWeek: "السبت" },
      { hijri: 27, gregorianDay: 7, gregorianMonth: "آذار", dayOfWeek: "الأحد" },
      { hijri: 28, gregorianDay: 8, gregorianMonth: "آذار", dayOfWeek: "الإثنين" },
      { hijri: 29, gregorianDay: 9, gregorianMonth: "آذار", dayOfWeek: "الثلاثاء" }
    ]
  },

  // 10. شوال 1448
  {
    id: 10,
    name: "شوال",
    nameWithPrefix: "شوال المكرم",
    yearHijri: 1448,
    gregorianMonthsSpan: "آذار / نيسان 2027م",
    startDayOfWeek: 3, // الأربعاء 1 شوال = 10 آذار 2027 (عيد الفطر)
    totalDays: 30,
    crescentPrimary: {
      dateHijri: "29 رمضان 1448 هـ",
      dateGregorian: "9 آذار 2027 م",
      sunsetTime: "6:06 م",
      ageHours: 29,
      ageMinutes: 36,
      altitudeDegrees: 13,
      altitudeMinutes: 10,
      durationHours: 1,
      durationMinutes: 5,
      illuminatedPercentage: 1.40,
      statusText: "يُتوقع أن يُرى الهلال واضحاً مرتفعاً",
      isPrimary: true
    },
    scorpioTimings: [
      {
        entryDay: "الأربعاء",
        entryDateGregorian: "24 آذار 2027 م",
        entryTime: "3:19",
        entryPeriod: "مساءً",
        exitDay: "الجمعة",
        exitDateGregorian: "26 آذار 2027 م",
        exitTime: "10:43",
        exitPeriod: "مساءً"
      }
    ],
    events: [
      { day: 1, title: "عيد الفطر المبارك", description: "اليوم الأول من شهر شوال وهو عيد الفطر المبارك", type: "eid" },
      { day: 3, title: "معركة الخندق (الأحزاب)", description: "معركة الخندق (الأحزاب) وقتل عمرو بن عبد ود على يد علي (ع) على رواية", yearHijriOrPre: "سنة 5 هـ", type: "ghazwah" },
      { day: 4, title: "غزوة حنين", description: "غزوة حنين على رواية", yearHijriOrPre: "سنة 8 هـ", type: "ghazwah" },
      { day: 5, title: "توجه أمير المؤمنين إلى صفين", description: "توجه الإمام أمير المؤمنين (عليه السلام) إلى صفين", yearHijriOrPre: "سنة 36 هـ", type: "historical" },
      { day: 8, title: "يوم البقيع العالمي", description: "هدم قبور وأضرحة أئمة أهل البيت والصحابة في البقيع الغرقد", yearHijriOrPre: "سنة 1344 هـ", type: "shahadah" },
      { day: 15, title: "وفاة السيد عبد العظيم الحسني", description: "وفاة السيد عبد العظيم الحسني (رضوان الله عليه) المدفون بالري", yearHijriOrPre: "سنة 252 هـ", type: "historical" },
      { day: 15, title: "معركة أحد وشهادة حمزة (ع)", description: "معركة أحد وشهادة أسد الله حمزة بن عبد المطلب سيد الشهداء (عليه السلام)", yearHijriOrPre: "سنة 3 هـ", type: "shahadah" },
      { day: 15, title: "معجزة رد الشمس", description: "رد الشمس للإمام أمير المؤمنين (ع) بالمدينة المنورة بمسجد الفضيخ (مسجد رد الشمس)", yearHijriOrPre: "سنة 3 هـ", type: "eid" },
      { day: 15, title: "غزوة بني قينقاع", description: "غزوة بني قينقاع", yearHijriOrPre: "سنة 2 هـ", type: "ghazwah" },
      { day: 17, title: "غزوة بني سليم", description: "غزوة بني سليم", yearHijriOrPre: "سنة 2 هـ", type: "ghazwah" },
      { day: 25, title: "شهادة الإمام جعفر الصادق (ع)", description: "شهادة رئيس المذهب الجعفري الإمام جعفر بن محمد الصادق (عليهما السلام)", yearHijriOrPre: "سنة 148 هـ", type: "shahadah", isFourteenInfallibles: true, infallibleName: "الإمام جعفر الصادق (ع)" },
      { day: 27, title: "خروج النبي إلى الطائف", description: "خروج النبي الأكرم (صلى الله عليه وآله) إلى الطائف لدعوتهم إلى الإسلام", type: "historical" }
    ],
    grid: [
      { hijri: 1, gregorianDay: 10, gregorianMonth: "آذار", dayOfWeek: "الأربعاء" },
      { hijri: 2, gregorianDay: 11, gregorianMonth: "آذار", dayOfWeek: "الخميس" },
      { hijri: 3, gregorianDay: 12, gregorianMonth: "آذار", dayOfWeek: "الجمعة" },
      { hijri: 4, gregorianDay: 13, gregorianMonth: "آذار", dayOfWeek: "السبت" },
      { hijri: 5, gregorianDay: 14, gregorianMonth: "آذار", dayOfWeek: "الأحد" },
      { hijri: 6, gregorianDay: 15, gregorianMonth: "آذار", dayOfWeek: "الإثنين" },
      { hijri: 7, gregorianDay: 16, gregorianMonth: "آذار", dayOfWeek: "الثلاثاء" },
      { hijri: 8, gregorianDay: 17, gregorianMonth: "آذار", dayOfWeek: "الأربعاء" },
      { hijri: 9, gregorianDay: 18, gregorianMonth: "آذار", dayOfWeek: "الخميس" },
      { hijri: 10, gregorianDay: 19, gregorianMonth: "آذار", dayOfWeek: "الجمعة" },
      { hijri: 11, gregorianDay: 20, gregorianMonth: "آذار", dayOfWeek: "السبت" },
      { hijri: 12, gregorianDay: 21, gregorianMonth: "آذار", dayOfWeek: "الأحد" },
      { hijri: 13, gregorianDay: 22, gregorianMonth: "آذار", dayOfWeek: "الإثنين" },
      { hijri: 14, gregorianDay: 23, gregorianMonth: "آذار", dayOfWeek: "الثلاثاء" },
      { hijri: 15, gregorianDay: 24, gregorianMonth: "آذار", dayOfWeek: "الأربعاء" },
      { hijri: 16, gregorianDay: 25, gregorianMonth: "آذار", dayOfWeek: "الخميس" },
      { hijri: 17, gregorianDay: 26, gregorianMonth: "آذار", dayOfWeek: "الجمعة" },
      { hijri: 18, gregorianDay: 27, gregorianMonth: "آذار", dayOfWeek: "السبت" },
      { hijri: 19, gregorianDay: 28, gregorianMonth: "آذار", dayOfWeek: "الأحد" },
      { hijri: 20, gregorianDay: 29, gregorianMonth: "آذار", dayOfWeek: "الإثنين" },
      { hijri: 21, gregorianDay: 30, gregorianMonth: "آذار", dayOfWeek: "الثلاثاء" },
      { hijri: 22, gregorianDay: 31, gregorianMonth: "آذار", dayOfWeek: "الأربعاء" },
      { hijri: 23, gregorianDay: 1, gregorianMonth: "نيسان", dayOfWeek: "الخميس" },
      { hijri: 24, gregorianDay: 2, gregorianMonth: "نيسان", dayOfWeek: "الجمعة" },
      { hijri: 25, gregorianDay: 3, gregorianMonth: "نيسان", dayOfWeek: "السبت" },
      { hijri: 26, gregorianDay: 4, gregorianMonth: "نيسان", dayOfWeek: "الأحد" },
      { hijri: 27, gregorianDay: 5, gregorianMonth: "نيسان", dayOfWeek: "الإثنين" },
      { hijri: 28, gregorianDay: 6, gregorianMonth: "نيسان", dayOfWeek: "الثلاثاء" },
      { hijri: 29, gregorianDay: 7, gregorianMonth: "نيسان", dayOfWeek: "الأربعاء" },
      { hijri: 30, gregorianDay: 8, gregorianMonth: "نيسان", dayOfWeek: "الخميس" }
    ]
  },

  // 11. ذو القعدة 1448
  {
    id: 11,
    name: "ذو القعدة",
    nameWithPrefix: "ذو القعدة الحرام",
    yearHijri: 1448,
    gregorianMonthsSpan: "نيسان / أيار 2027م",
    startDayOfWeek: 6, // الجمعة 1 ذو القعدة = 9 نيسان 2027
    totalDays: 29,
    crescentPrimary: {
      dateHijri: "30 شوال 1448 هـ",
      dateGregorian: "8 نيسان 2027 م",
      sunsetTime: "6:26 م",
      ageHours: 39,
      ageMinutes: 32,
      altitudeDegrees: 19,
      altitudeMinutes: 38,
      durationHours: 1,
      durationMinutes: 42,
      illuminatedPercentage: 3.04,
      statusText: "يُتوقع أن يُرى الهلال مرتفعاً واضحاً جداً",
      isPrimary: true
    },
    crescentPreviousNight: {
      dateHijri: "29 شوال 1448 هـ",
      dateGregorian: "7 نيسان 2027 م",
      sunsetTime: "6:25 م",
      ageHours: 15,
      ageMinutes: 31,
      altitudeDegrees: 7,
      altitudeMinutes: 34,
      durationHours: 0,
      durationMinutes: 37,
      illuminatedPercentage: 0.58,
      statusText: "لا يُتوقع التمكن من رؤية الهلال بالعين المجردة",
      isPrimary: false
    },
    scorpioTimings: [
      {
        entryDay: "الأربعاء",
        entryDateGregorian: "21 نيسان 2027 م",
        entryTime: "00:21",
        entryPeriod: "بعد منتصف الليل",
        exitDay: "الجمعة",
        exitDateGregorian: "23 نيسان 2027 م",
        exitTime: "7:37",
        exitPeriod: "صباحاً"
      }
    ],
    events: [
      { day: 1, title: "ولادة السيدة فاطمة المعصومة (ع)", description: "ولادة كريمة أهل البيت السيدة فاطمة المعصومة (عليها السلام) على رواية", yearHijriOrPre: "سنة 173 هـ", type: "wiladah" },
      { day: 5, title: "تجديد بناء الكعبة المعظمة", description: "تجديد بناء الكعبة المشرفة على يد إبراهيم الخليل وولده إسماعيل (عليهما السلام)", type: "historical" },
      { day: 9, title: "رسالة مسلم بن عقيل للحسين (ع)", description: "إرسال مسلم بن عقيل (ع) رسالته إلى الإمام الحسين (ع) عن أحوال الكوفة", yearHijriOrPre: "سنة 60 هـ", type: "historical" },
      { day: 11, title: "ولادة الإمام علي بن موسى الرضا (ع)", description: "ولادة شمس الشموس وأنيس النفوس الإمام علي بن موسى الرضا (عليه السلام)", yearHijriOrPre: "سنة 148 هـ", type: "wiladah", isFourteenInfallibles: true, infallibleName: "الإمام علي الرضا (ع)" },
      { day: 23, title: "غزوة بني قريظة", description: "غزوة بني قريظة", yearHijriOrPre: "سنة 5 هـ", type: "ghazwah" },
      { day: 25, title: "يوم دحو الأرض", description: "يوم دحو الأرض وبسطها من تحت الكعبة المشرفة / خروج النبي لحجة الوداع (10 هـ) / خروج الإمام الرضا لخراسان (200 هـ)", yearHijriOrPre: "10 هـ / 200 هـ", type: "eid" },
      { day: 29, title: "شهادة الإمام محمد الجواد (ع)", description: "شهادة تاسع أئمة الهدى الإمام محمد بن علي الجواد (عليه السلام) ببغداد", yearHijriOrPre: "سنة 220 هـ", type: "shahadah", isFourteenInfallibles: true, infallibleName: "الإمام محمد الجواد (ع)" }
    ],
    grid: [
      { hijri: 1, gregorianDay: 9, gregorianMonth: "نيسان", dayOfWeek: "الجمعة" },
      { hijri: 2, gregorianDay: 10, gregorianMonth: "نيسان", dayOfWeek: "السبت" },
      { hijri: 3, gregorianDay: 11, gregorianMonth: "نيسان", dayOfWeek: "الأحد" },
      { hijri: 4, gregorianDay: 12, gregorianMonth: "نيسان", dayOfWeek: "الإثنين" },
      { hijri: 5, gregorianDay: 13, gregorianMonth: "نيسان", dayOfWeek: "الثلاثاء" },
      { hijri: 6, gregorianDay: 14, gregorianMonth: "نيسان", dayOfWeek: "الأربعاء" },
      { hijri: 7, gregorianDay: 15, gregorianMonth: "نيسان", dayOfWeek: "الخميس" },
      { hijri: 8, gregorianDay: 16, gregorianMonth: "نيسان", dayOfWeek: "الجمعة" },
      { hijri: 9, gregorianDay: 17, gregorianMonth: "نيسان", dayOfWeek: "السبت" },
      { hijri: 10, gregorianDay: 18, gregorianMonth: "نيسان", dayOfWeek: "الأحد" },
      { hijri: 11, gregorianDay: 19, gregorianMonth: "نيسان", dayOfWeek: "الإثنين" },
      { hijri: 12, gregorianDay: 20, gregorianMonth: "نيسان", dayOfWeek: "الثلاثاء" },
      { hijri: 13, gregorianDay: 21, gregorianMonth: "نيسان", dayOfWeek: "الأربعاء" },
      { hijri: 14, gregorianDay: 22, gregorianMonth: "نيسان", dayOfWeek: "الخميس" },
      { hijri: 15, gregorianDay: 23, gregorianMonth: "نيسان", dayOfWeek: "الجمعة" },
      { hijri: 16, gregorianDay: 24, gregorianMonth: "نيسان", dayOfWeek: "السبت" },
      { hijri: 17, gregorianDay: 25, gregorianMonth: "نيسان", dayOfWeek: "الأحد" },
      { hijri: 18, gregorianDay: 26, gregorianMonth: "نيسان", dayOfWeek: "الإثنين" },
      { hijri: 19, gregorianDay: 27, gregorianMonth: "نيسان", dayOfWeek: "الثلاثاء" },
      { hijri: 20, gregorianDay: 28, gregorianMonth: "نيسان", dayOfWeek: "الأربعاء" },
      { hijri: 21, gregorianDay: 29, gregorianMonth: "نيسان", dayOfWeek: "الخميس" },
      { hijri: 22, gregorianDay: 30, gregorianMonth: "نيسان", dayOfWeek: "الجمعة" },
      { hijri: 23, gregorianDay: 1, gregorianMonth: "أيار", dayOfWeek: "السبت" },
      { hijri: 24, gregorianDay: 2, gregorianMonth: "أيار", dayOfWeek: "الأحد" },
      { hijri: 25, gregorianDay: 3, gregorianMonth: "أيار", dayOfWeek: "الإثنين" },
      { hijri: 26, gregorianDay: 4, gregorianMonth: "أيار", dayOfWeek: "الثلاثاء" },
      { hijri: 27, gregorianDay: 5, gregorianMonth: "أيار", dayOfWeek: "الأربعاء" },
      { hijri: 28, gregorianDay: 6, gregorianMonth: "أيار", dayOfWeek: "الخميس" },
      { hijri: 29, gregorianDay: 7, gregorianMonth: "أيار", dayOfWeek: "الجمعة" }
    ]
  },

  // 12. ذو الحجة 1448
  {
    id: 12,
    name: "ذو الحجة",
    nameWithPrefix: "ذو الحجة الحرام",
    yearHijri: 1448,
    gregorianMonthsSpan: "أيار / حزيران 2027م",
    startDayOfWeek: 0, // السبت 1 ذو الحجة = 8 أيار 2027
    totalDays: 29,
    crescentPrimary: {
      dateHijri: "29 ذي القعدة 1448 هـ",
      dateGregorian: "7 أيار 2027 م",
      sunsetTime: "6:47 م",
      ageHours: 28,
      ageMinutes: 47,
      altitudeDegrees: 14,
      altitudeMinutes: 56,
      durationHours: 1,
      durationMinutes: 22,
      illuminatedPercentage: 1.96,
      statusText: "يُتوقع أن يُرى الهلال بالعين المجردة مرتفعاً واضحاً",
      isPrimary: true
    },
    scorpioTimings: [
      {
        entryDay: "الثلاثاء",
        entryDateGregorian: "18 أيار 2027 م",
        entryTime: "7:37",
        entryPeriod: "صباحاً",
        exitDay: "الخميس",
        exitDateGregorian: "20 أيار 2027 م",
        exitTime: "3:27",
        exitPeriod: "مساءً"
      }
    ],
    events: [
      { day: 1, title: "زواج النورين (ع)", description: "زواج الإمام أمير المؤمنين علي (ع) من سيدة نساء العالمين فاطمة الزهراء (ع)", yearHijriOrPre: "سنة 2 هـ", type: "eid" },
      { day: 3, title: "دخول النبي مكة لحجة الوداع", description: "دخول النبي الأكرم (صلى الله عليه وآله) مكة في حجة الوداع", yearHijriOrPre: "سنة 10 هـ", type: "historical" },
      { day: 4, title: "سجن الإمام الكاظم (ع)", description: "سجن الإمام موسى بن جعفر الكاظم (عليه السلام)", yearHijriOrPre: "سنة 179 هـ", type: "historical" },
      { day: 7, title: "شهادة الإمام محمد الباقر (ع)", description: "شهادة باقر علوم الأولين والآخرين الإمام محمد بن علي الباقر (عليهما السلام)", yearHijriOrPre: "سنة 114 هـ", type: "shahadah", isFourteenInfallibles: true, infallibleName: "الإمام محمد الباقر (ع)" },
      { day: 8, title: "يوم التروية وخروج الحسين (ع)", description: "يوم التروية وخروج الإمام الحسين بن علي (ع) من مكة قاصداً الكوفة وكربلاء", yearHijriOrPre: "سنة 60 هـ", type: "historical" },
      { day: 9, title: "يوم عرفة وشهادة مسلم وهاني", description: "يوم عرفة المبارك / شهادة سفير الحسين مسلم بن عقيل والصحابي هاني بن عروة بالكوفة", yearHijriOrPre: "سنة 60 هـ", type: "shahadah" },
      { day: 10, title: "عيد الأضحى المبارك", description: "عيد الأضحى المبارك وأداء مناسك الحج في منى", type: "eid" },
      { day: 11, title: "رمي الكعبة بالمنجنيق", description: "رمي الحجاج بن يوسف الثقفي الكعبة المشرفة بالمنجنيق", yearHijriOrPre: "سنة 73 هـ", type: "historical" },
      { day: 14, title: "نحلة فدك للزهراء (ع)", description: "نحلة النبي الأكرم (ص) أرض فدك لفاطمة الزهراء (ع) على رواية", yearHijriOrPre: "سنة 7 هـ", type: "historical" },
      { day: 18, title: "عيد الغدير الأغر", description: "عيد الله الأكبر يوم تنصيب الإمام علي بن أبي طالب (ع) ولياً وخليفة للمؤمنين بغدير خم", yearHijriOrPre: "سنة 10 هـ", type: "eid" },
      { day: 19, title: "بيعة المسلمين لأمير المؤمنين", description: "بيعة المسلمين الإمام أمير المؤمنين علي بن أبي طالب (ع) بالخلافة", yearHijriOrPre: "سنة 35 هـ", type: "eid" },
      { day: 22, title: "شهادة ميثم التمار", description: "شهادة الصحابي المخلص ميثم التمار (رضوان الله عليه)", yearHijriOrPre: "سنة 60 هـ", type: "shahadah" },
      { day: 23, title: "شهادة طفلي مسلم بن عقيل", description: "شهادة طفلي مسلم بن عقيل (محمد وإبراهيم) (عليهما السلام)", yearHijriOrPre: "سنة 62 هـ", type: "shahadah" },
      { day: 24, title: "يوم المباهلة والتصدق بالخاتم", description: "خروج النبي (ص) بأهل بيته (ع) لمباهلة نصارى نجران / وتصدق أمير المؤمنين (ع) بالخاتم", yearHijriOrPre: "سنة 10 هـ", type: "eid" },
      { day: 25, title: "نزول سورة (هل أتى)", description: "نزول سورة الإنسان (هل أتى) في فضل أهل البيت (عليهم السلام) بعد إطعامهم المسكين واليتيم والأسير", type: "eid" },
      { day: 27, title: "وفاة علي العريضي", description: "وفاة علي بن جعفر الصادق (ع) الملقب بـ (العُريضي)", yearHijriOrPre: "سنة 210 هـ", type: "historical" },
      { day: 28, title: "واقعة الحرة", description: "وقعة الحرة المؤلمة واستباحة جيش يزيد للمدينة المنورة", yearHijriOrPre: "سنة 63 هـ", type: "historical" }
    ],
    grid: [
      { hijri: 1, gregorianDay: 8, gregorianMonth: "أيار", dayOfWeek: "السبت" },
      { hijri: 2, gregorianDay: 9, gregorianMonth: "أيار", dayOfWeek: "الأحد" },
      { hijri: 3, gregorianDay: 10, gregorianMonth: "أيار", dayOfWeek: "الإثنين" },
      { hijri: 4, gregorianDay: 11, gregorianMonth: "أيار", dayOfWeek: "الثلاثاء" },
      { hijri: 5, gregorianDay: 12, gregorianMonth: "أيار", dayOfWeek: "الأربعاء" },
      { hijri: 6, gregorianDay: 13, gregorianMonth: "أيار", dayOfWeek: "الخميس" },
      { hijri: 7, gregorianDay: 14, gregorianMonth: "أيار", dayOfWeek: "الجمعة" },
      { hijri: 8, gregorianDay: 15, gregorianMonth: "أيار", dayOfWeek: "السبت" },
      { hijri: 9, gregorianDay: 16, gregorianMonth: "أيار", dayOfWeek: "الأحد" },
      { hijri: 10, gregorianDay: 17, gregorianMonth: "أيار", dayOfWeek: "الإثنين" },
      { hijri: 11, gregorianDay: 18, gregorianMonth: "أيار", dayOfWeek: "الثلاثاء" },
      { hijri: 12, gregorianDay: 19, gregorianMonth: "أيار", dayOfWeek: "الأربعاء" },
      { hijri: 13, gregorianDay: 20, gregorianMonth: "أيار", dayOfWeek: "الخميس" },
      { hijri: 14, gregorianDay: 21, gregorianMonth: "أيار", dayOfWeek: "الجمعة" },
      { hijri: 15, gregorianDay: 22, gregorianMonth: "أيار", dayOfWeek: "السبت" },
      { hijri: 16, gregorianDay: 23, gregorianMonth: "أيار", dayOfWeek: "الأحد" },
      { hijri: 17, gregorianDay: 24, gregorianMonth: "أيار", dayOfWeek: "الإثنين" },
      { hijri: 18, gregorianDay: 25, gregorianMonth: "أيار", dayOfWeek: "الثلاثاء" },
      { hijri: 19, gregorianDay: 26, gregorianMonth: "أيار", dayOfWeek: "الأربعاء" },
      { hijri: 20, gregorianDay: 27, gregorianMonth: "أيار", dayOfWeek: "الخميس" },
      { hijri: 21, gregorianDay: 28, gregorianMonth: "أيار", dayOfWeek: "الجمعة" },
      { hijri: 22, gregorianDay: 29, gregorianMonth: "أيار", dayOfWeek: "السبت" },
      { hijri: 23, gregorianDay: 30, gregorianMonth: "أيار", dayOfWeek: "الأحد" },
      { hijri: 24, gregorianDay: 31, gregorianMonth: "أيار", dayOfWeek: "الإثنين" },
      { hijri: 25, gregorianDay: 1, gregorianMonth: "حزيران", dayOfWeek: "الثلاثاء" },
      { hijri: 26, gregorianDay: 2, gregorianMonth: "حزيران", dayOfWeek: "الأربعاء" },
      { hijri: 27, gregorianDay: 3, gregorianMonth: "حزيران", dayOfWeek: "الخميس" },
      { hijri: 28, gregorianDay: 4, gregorianMonth: "حزيران", dayOfWeek: "الجمعة" },
      { hijri: 29, gregorianDay: 5, gregorianMonth: "حزيران", dayOfWeek: "السبت" }
    ]
  }
];

export const WEEKDAYS_NAMES = [
  "السبت",
  "الأحد",
  "الإثنين",
  "الثلاثاء",
  "الأربعاء",
  "الخميس",
  "الجمعة"
];
