/* ---------------------------------------------------------------
   YOUR WORK. One block = one card in the carousel.
   To add a film: copy a whole { ... } block, change the values.
   id      unique short name (no spaces)
   title / kind / blurb   { en: "...", ar: "..." }
   ratio   shape of the VIDEO: "9/16" vertical, "1/1" square, "16/9" wide, "4/5"
   dur     length in seconds (shown until the video reports its real length)
   src     path to the video file (put files in assets/videos/)
   poster  cover image shown on the card (assets/img/). Optional: if missing,
           the site uses the video's first frame.
   Order here = order in the carousel. The middle one opens focused.
   --------------------------------------------------------------- */
window.PROJECTS = [
  {
    id: "eid",
    title: { en: "Dr. Mohamed Eid", ar: "د. محمد عيد" },
    kind: { en: "Social film", ar: "فيديو سوشيال" },
    ratio: "1/1", dur: 37, year: 2026,
    src: "assets/videos/client-video-1.mp4",
    poster: "",
    blurb: {
      en: "A square talking-head edit with animated Arabic captions that follow the voice, framed for the feed.",
      ar: "مونتاج مربع لحوار أمام الكاميرا مع كابشنز عربية متحركة تتبع الصوت، بإطار مناسب للسوشيال."
    }
  },
  {
    id: "eid",
    title: { en: "Dr. Mohamed Eid", ar: "د. محمد عيد" },
    kind: { en: "Social film", ar: "فيديو سوشيال" },
    ratio: "1/1", dur: 37, year: 2026,
    src: "assets/videos/client-video-2.mp4",
    poster: "",
    blurb: {
      en: "A square talking-head edit with animated Arabic captions that follow the voice, framed for the feed.",
      ar: "مونتاج مربع لحوار أمام الكاميرا مع كابشنز عربية متحركة تتبع الصوت، بإطار مناسب للسوشيال."
    }
  },
  {
    id: "eid",
    title: { en: "Dr. Mohamed Eid", ar: "د. محمد عيد" },
    kind: { en: "Social film", ar: "فيديو سوشيال" },
    ratio: "1/1", dur: 37, year: 2026,
    src: "assets/videos/video-5.mp4",
    poster: "",
    blurb: {
      en: "A square talking-head edit with animated Arabic captions that follow the voice, framed for the feed.",
      ar: "مونتاج مربع لحوار أمام الكاميرا مع كابشنز عربية متحركة تتبع الصوت، بإطار مناسب للسوشيال."
    }
  },
  {
    id: "eid",
    title: { en: "Dr. Mohamed Eid", ar: "د. محمد عيد" },
    kind: { en: "Social film", ar: "فيديو سوشيال" },
    ratio: "1/1", dur: 37, year: 2026,
    src: "assets/videos/client-video-3.mp4",
    poster: "",
    blurb: {
      en: "A square talking-head edit with animated Arabic captions that follow the voice, framed for the feed.",
      ar: "مونتاج مربع لحوار أمام الكاميرا مع كابشنز عربية متحركة تتبع الصوت، بإطار مناسب للسوشيال."
    }
  },
  {
    id: "eid",
    title: { en: "Dr. Mohamed Eid", ar: "د. محمد عيد" },
    kind: { en: "Social film", ar: "فيديو سوشيال" },
    ratio: "1/1", dur: 37, year: 2026,
    src: "assets/videos/client-video-4.mp4",
    poster: "",
    blurb: {
      en: "A square talking-head edit with animated Arabic captions that follow the voice, framed for the feed.",
      ar: "مونتاج مربع لحوار أمام الكاميرا مع كابشنز عربية متحركة تتبع الصوت، بإطار مناسب للسوشيال."
    }
  },
  {
    id: "showreel",
    title: { en: "Showreel", ar: "شو ريل" },
    kind: { en: "Opener", ar: "مقدمة" },
    ratio: "16/9", dur: 16, year: 2026,
    src: "assets/videos/intro.mp4",
    poster: "assets/img/intro-poster.jpg",
    blurb: {
      en: "My opener: name card, tools, a quick pass over client work, and a closing contact card.",
      ar: "مقدمتي الشخصية: كارت الاسم والبرامج ولقطات سريعة من أعمال العملاء، وتنتهي ببطاقة التواصل."
    }
  }
  /* Add more blocks here (comma after the previous block). The carousel looks best with 3+ films. */
];
