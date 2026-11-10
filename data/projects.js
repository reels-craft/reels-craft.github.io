/* ---------------------------------------------------------------
   YOUR WORK. One block = one card in the carousel.
   To add a film: copy a whole { ... } block, change the values.
   id      unique short name (no spaces, never repeat)
   title / kind / blurb   { en: "...", ar: "..." }
   ratio   shape of the VIDEO: "9/16" vertical, "1/1" square, "16/9" wide, "4/5"
           (only used for the label; the player reads the real shape from the file)
   dur     OPTIONAL length in seconds. Leave it out: the site reads the real length from the video.
   src     path to the video file (put files in assets/videos/)
   poster  OPTIONAL cover image (assets/img/). If empty, the site uses the video's first frame.
   Order here = order in the carousel (left to right). The carousel opens on the middle film (3rd of 6).
   --------------------------------------------------------------- */
window.PROJECTS = [
  {
    id: "farm-supervision",
    title: { en: "Case exam or full farm supervision?", ar: "كشف حالة أم إشراف كامل للمزرعة؟" },
    kind: { en: "Medical reel", ar: "ريل طبي" },
    ratio: "9/16", year: 2026,
    src: "assets/videos/client-video-2.mp4",
    poster: "",
    blurb: {
      en: "Edited a reel for Dr. Mohamed Eid, a poultry disease specialist, about the difference between a case examination and full farm supervision. I turned complex medical information into a fast, clear reel with strong pacing and motion graphics in After Effects, designed to grab attention from the very first second.",
      ar: "مونتاج ريل للدكتور محمد عيد، أخصائي أمراض الدواجن، عن الفرق بين كشف الحالة والإشراف الكامل للمزرعة. حوّلت معلومة طبية معقدة لريل سريع وواضح، بإيقاع قوي وموشن جرافيك في After Effects وجعلته يلفت الانتباه من أول ثانية."
    }
  },
  {
    id: "recurring-disease",
    title: { en: "The disease that returns every cycle", ar: "المرض الذي يعود في كل دورة" },
    kind: { en: "Medical reel", ar: "ريل طبي" },
    ratio: "9/16", year: 2026,
    src: "assets/videos/client-video-4.mp4",
    poster: "",
    blurb: {
      en: "Edited a reel for Dr. Mohamed Eid, a poultry disease specialist, about the disease that keeps coming back in every fattening cycle at the same time. I turned a complex medical idea into a fast, clear reel with strong pacing and motion graphics in After Effects, designed to grab attention from the very first second.",
      ar: "مونتاج ريل للدكتور محمد عيد، أخصائي أمراض الدواجن، عن المرض الذي يرجع في كل دورة تسمين وفي نفس التوقيت. حوّلت فكرة طبية معقدة لريل سريع وواضح، بإيقاع قوي وموشن جرافيك في After Effects يلفت الانتباه من أول ثانية."
    }
  },
  {
    id: "time-management",
    title: { en: "Organize your day, reach your goals", ar: "نظّم يومك وحقّق أهدافك" },
    kind: { en: "Educational reel", ar: "ريل تعليمي" },
    ratio: "9/16", year: 2026,
    src: "assets/videos/client-video-1.mp4",
    poster: "",
    blurb: {
      en: "Edited a reel for an engineer about time management and how to organize your day to get more done and reach your goals. I turned a practical message into a fast, impactful reel with strong pacing and motion graphics in After Effects, designed to grab attention from the very first second.",
      ar: "مونتاج ريل لمهندس، عن أهمية تنظيم الوقت وإزاي ترتب يومك عشان تنجز أكتر وتوصل لأهدافك. حوّلت نصيحة عملية لريل سريع ومؤثر، بإيقاع قوي وموشن جرافيك في After Effects يلفت الانتباه من أول ثانية."
    }
  },
  {
    id: "compare-yourself",
    title: { en: "Compare yourself to your past self", ar: "قارن نفسك بنفسك لا بالناس" },
    kind: { en: "Motivational reel", ar: "ريل تحفيزي" },
    ratio: "9/16", year: 2026,
    src: "assets/videos/client-video-3.mp4",
    poster: "",
    blurb: {
      en: "Edited a reel for an engineer about comparing yourself to your past self instead of to others, because comparing with people kills your motivation and ambition. I turned a motivational message into a fast, impactful reel with strong pacing and motion graphics in After Effects, designed to grab attention from the very first second.",
      ar: "مونتاج ريل لمهندس، عن فكرة إنك تقارن نفسك بنفسك مش بالناس، لأن المقارنة بالآخرين بتكسر الحماس والطموح. حوّلت رسالة تحفيزية لريل سريع ومؤثر، بإيقاع قوي وموشن جرافيك في After Effects يلفت الانتباه من أول ثانية."
    }
  },
  {
    id: "chatgpt-explainer",
    title: { en: "ChatGPT, explained", ar: "ChatGPT ببساطة" },
    kind: { en: "Motion graphics", ar: "موشن جرافيك" },
    ratio: "16/9", year: 2026,
    src: "assets/videos/video-5.mp4",
    poster: "",
    blurb: {
      en: "A motion graphics video about ChatGPT, handled from concept to final delivery. I broke the topic into short, clear scenes with animated visuals in After Effects that explain each point without complexity. I synced the pacing and transitions to the audio to keep viewers watching until the end, using clean, consistent colors and typography for a professional look that hooks from the first second.",
      ar: "موشن جرافيك عن ChatGPT، اشتغلت عليه من الفكرة للتنفيذ النهائي. بسّطت الموضوع في مشاهد قصيرة وواضحة، ورسومات متحركة في After Effects بتشرح كل نقطة بصريًا من غير تعقيد. ضبطت الإيقاع مع الصوت والانتقالات بين المشاهد عشان المشاهد يفضل متابع للآخر، واخترت ألوان وخطوط بسيطة ومتناسقة تدّي الفيديو شكل احترافي يلفت الانتباه من أول ثانية."
    }
  },
  {
    id: "showreel",
    title: { en: "Hassan Mohamed — Showreel", ar: "حسن محمد — شو ريل" },
    kind: { en: "Showreel", ar: "شو ريل" },
    ratio: "16/9", year: 2026,
    src: "assets/videos/intro.mp4",
    poster: "assets/img/intro-poster.jpg",
    blurb: {
      en: "Showreel of Hassan Mohamed, video editor. A collection of my work: medical and educational reels, plus motivational content, with strong pacing and After Effects motion graphics that hook viewers from the first second. Have an idea you want to bring to life? Let's work together.",
      ar: "شو ريل حسن محمد، فيديو إيديتور. مجموعة من أشغالي في المونتاج: ريلز طبية وتعليمية، ومحتوى تحفيزي، بإيقاع قوي وموشن جرافيك في After Effects يشدّ المشاهد من أول ثانية. عندك فكرة أو محتوى عايز يوصل للناس بنفس القوة؟ ابعتلي وخلينا نشتغل سوا."
    }
  }
];
