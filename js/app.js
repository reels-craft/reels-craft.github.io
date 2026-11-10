/* =====================================================================
   Hassan Mohamed portfolio — js/app.js
   Sections:  1 helpers · 2 text/i18n · 3 hero · 4 carousel · 5 player
              6 page effects · 7 start
   Data lives in data/site.js, data/projects.js, data/i18n.js
   ===================================================================== */
(() => {
  "use strict";
  /* ---------- 1. helpers ---------- */
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const S = window.SITE, P = window.PROJECTS || [], T = window.I18N;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const store = {                       // localStorage can throw (private mode) — never crash
    get: (k) => { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: (k, v) => { try { localStorage.setItem(k, v); } catch (e) {} }
  };
  let lang = document.documentElement.lang === "ar" ? "ar" : "en";
  const t = (k) => T[lang][k];
  const L = (o) => (o && (o[lang] || o.en)) || "";
  const clamp = (n, a, b) => Math.min(b, Math.max(a, n));
  const mmss = (s) => (isFinite(s) && s > 0) ? `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}` : "--:--";
  const tc = (s) => {                    // hero timecode HH:MM:SS:FF
    s = Math.max(0, s || 0);
    const f = (n) => String(Math.floor(n)).padStart(2, "0");
    return `${f(s / 3600)}:${f((s / 60) % 60)}:${f(s % 60)}:${f((s % 1) * 30)}`;
  };
  const TOOLS = [   // name, official page, icon background, icon colour, letters
    ["Adobe Premiere Pro", "https://www.adobe.com/products/premiere.html", "#00005B", "#EA77FF", "Pr"],
    ["Adobe After Effects", "https://www.adobe.com/products/aftereffects.html", "#00005B", "#9999FF", "Ae"]
  ];
  const ICON = {
    play: '<svg viewBox="0 0 24 24"><path d="M7 4.5v15l13-7.5z"/></svg>',
    pause: '<svg viewBox="0 0 24 24"><path d="M6 4h4v16H6zM14 4h4v16h-4z"/></svg>',
    vol: '<svg viewBox="0 0 24 24"><path d="M3 9v6h4l5 4V5L7 9zM16 8a5 5 0 010 8M18.5 5.5a9 9 0 010 13" fill="none" stroke="currentColor" stroke-width="2"/></svg>',
    mute: '<svg viewBox="0 0 24 24"><path d="M3 9v6h4l5 4V5L7 9z"/><path d="M16 9l5 6M21 9l-5 6" stroke="currentColor" stroke-width="2"/></svg>',
    fs: '<svg viewBox="0 0 24 24"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" fill="none" stroke="currentColor" stroke-width="2"/></svg>',
    left: '<svg viewBox="0 0 24 24"><path d="M15 5l-7 7 7 7"/></svg>',
    right: '<svg viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg>'
  };
  const ratioLabel = (r) => ({ "1/1": "1:1", "16/9": "16:9", "9/16": "9:16", "4/5": "4:5" }[r] || r);
  function waLink(extra = "") {
    if (!S.whatsapp) return "#contact";
    const msg = (lang === "ar" ? "مرحبًا حسن، عندي فيديو محتاج مونتاج." : "Hi Hassan, I have a video that needs a cut.") + extra;
    return `https://wa.me/${S.whatsapp}?text=${encodeURIComponent(msg)}`;
  }

  /* ---------- 2. text / language ---------- */
  function applyText() {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.title = `${L(S.name)} · ${S.studio}`;
    $("#lang").textContent = lang === "ar" ? "English" : "العربية";
    $$("[data-i18n]").forEach((el) => { if (typeof t(el.dataset.i18n) === "string") el.textContent = t(el.dataset.i18n); });
    $("#studio").textContent = S.studio;
    $("#hname").textContent = L(S.name);
    $("#role").textContent = L(S.role);
    $("#statN").textContent = S.projects || "";
    $(".portrait img").alt = L(S.name);
    $("#mono").textContent = (L(S.name)[0] || "H");
    soundLabel();

    const words = lang === "ar"
      ? ["مونتاج", "موشن جرافيك", "كابشنز عربية", "ريلز", "مقدمات", "آفتر إفكتس", "بريمير"]
      : ["Montage", "Motion graphics", "Arabic captions", "Reels", "Openers", "After Effects", "Premiere"];
    $("#mq").innerHTML = words.concat(words).map((w) => `<span>${w}</span>`).join("");
    $("#svc").innerHTML = t("svcs").map(([a, b]) => `<li><b>${a}</b><span>${b}</span></li>`).join("");
    $("#faqList").innerHTML = t("faqs").map(([q, a]) => `<details><summary>${q}</summary><p>${a}</p></details>`).join("");

    const links = [];
    if (S.whatsapp) links.push([t("wa"), waLink()]);
    if (S.email) links.push(["Email", `mailto:${S.email}`]);
    if (S.telegram) links.push(["Telegram", S.telegram]);
    if (S.tiktok) links.push(["TikTok", S.tiktok]);
    if (S.instagram) links.push(["Instagram", S.instagram]);
    if (S.youtube) links.push(["YouTube", S.youtube]);
    $("#links").innerHTML = links.map(([n, h]) => `<a class="big" href="${h}" target="_blank" rel="noopener"><span>${n}</span><span aria-hidden="true">↗</span></a>`).join("")
      + (S.phone ? `<p class="phone">${S.phone}</p>` : "");
    const hw = $("#heroWa"); hw.href = waLink();
    if (S.whatsapp) { hw.target = "_blank"; hw.rel = "noopener"; }
    $("#copy").textContent = `© ${new Date().getFullYear()} ${L(S.name)} · ${S.studio} · ${t("rights")}`;
    $("#prev").setAttribute("aria-label", t("prev")); $("#next").setAttribute("aria-label", t("next"));
    $("#close").setAttribute("aria-label", t("close"));
    $("#plBack").textContent = (lang === "ar" ? "→ " : "← ") + t("back");
    $("#plNext").textContent = t("more") + (lang === "ar" ? " ←" : " →");
    $("#plWa").textContent = t("discuss");
    $("#plMute").setAttribute("aria-label", t("mute")); $("#plFs").setAttribute("aria-label", t("fs")); $("#plPlay").setAttribute("aria-label", t("pp"));
    $$(".tools").forEach((el) => (el.innerHTML = TOOLS.map(([n, url, bg, fg, ab]) => `<li><a href="${url}" target="_blank" rel="noopener" aria-label="${n}">
      <svg viewBox="0 0 48 48" aria-hidden="true"><rect width="48" height="48" rx="10" fill="${bg}"/><rect x="1.5" y="1.5" width="45" height="45" rx="8.5" fill="none" stroke="${fg}" stroke-width="1.6"/><text x="24" y="32" text-anchor="middle" font-family="Arial,Helvetica,sans-serif" font-weight="700" font-size="22" fill="${fg}">${ab}</text></svg><span>${n}</span></a></li>`).join("")));
    $("#cmenu").innerHTML = links.map(([n, h]) => `<a href="${h}" target="_blank" rel="noopener">${n}</a>`).join("");
    renderDeck();
    if (isOpen) fillInfo();
  }

  /* ---------- 3. hero showreel ---------- */
  const hero = $("#heroVid"), heroPlay = $("#heroPlay"), soundBtn = $("#sound");
  let heroWanted = !reduce;              // does the visitor want the hero playing?
  let heroVisible = true;
  function soundLabel() { soundBtn.textContent = hero.muted ? t("sound") : t("soundOn"); soundBtn.setAttribute("aria-pressed", String(!hero.muted)); }
  function heroSync() {                  // single place that decides play vs pause
    const go = heroWanted && heroVisible && !isOpen;
    if (go) hero.play().catch(() => { heroPlay.hidden = false; });   // autoplay blocked → show button
    else hero.pause();
  }
  function initHero() {
    hero.addEventListener("play", () => { heroPlay.hidden = true; });
    heroPlay.onclick = () => { heroWanted = true; heroSync(); };
    hero.parentElement.addEventListener("click", (e) => {
      if (e.target.closest("button, .scrub")) return;
      heroWanted = hero.paused; if (!heroWanted) heroPlay.hidden = false; heroSync();
    });
    soundBtn.onclick = () => { hero.muted = !hero.muted; soundLabel(); if (!hero.muted) { heroWanted = true; heroSync(); } };
    hero.addEventListener("timeupdate", () => {
      $("#heroTc").textContent = tc(hero.currentTime);
      if (hero.duration) $("#scrubBar").style.width = `${(hero.currentTime / hero.duration) * 100}%`;
    });
    $("#scrub").addEventListener("click", (e) => {      // #scrub is dir=ltr, so plain left→right maths is correct
      const r = e.currentTarget.getBoundingClientRect();
      if (hero.duration) hero.currentTime = clamp((e.clientX - r.left) / r.width, 0, 1) * hero.duration;
    });
    new IntersectionObserver(([en]) => { heroVisible = en.isIntersecting; heroSync(); }, { threshold: .25 }).observe(hero);
    if (reduce) heroPlay.hidden = false;
    hero.addEventListener("error", () => { heroPlay.hidden = true; }, true);
  }

  /* ---------- 4. carousel (coverflow) ---------- */
  const deck = $("#deck");
  let cur = Math.floor((P.length - 1) / 2);   // start on the middle film
  let cards = [];
  let sectionInView = false;

  function renderDeck() {
    deck.innerHTML = P.map((p, i) => `
      <button class="card" type="button" data-i="${i}" aria-label="${L(p.title)}">
        <img src="${p.poster || ""}" alt="" loading="lazy" draggable="false">
        <span class="pbtn" aria-hidden="true">${ICON.play}</span>
        <span class="cap"><strong>${L(p.title)}</strong><em>${L(p.kind)} · ${ratioLabel(p.ratio)}</em></span>
      </button>`).join("");
    cards = $$(".card", deck);
    cards.forEach((c, i) => {            // poster missing? try the video's first frame, then a plain title card
      const img = $("img", c);
      img.addEventListener("error", () => {
        img.remove();
        const v = document.createElement("video");
        v.muted = true; v.playsInline = true; v.preload = "metadata"; v.src = `${P[i].src}#t=0.6`;
        v.addEventListener("error", () => { v.remove(); const d = document.createElement("span"); d.className = "ph"; d.textContent = L(P[i].title); c.prepend(d); });
        c.prepend(v);
      }, { once: true });
    });
    layout(true);
  }

  function layout(instant) {
    if (!cards.length) return;
    cur = clamp(cur, 0, P.length - 1);
    const w = cards[0].offsetWidth || 300;
    const step = w * 1.08;
    cards.forEach((c, i) => {
      const d = i - cur, a = Math.abs(d);
      const s = a === 0 ? 1 : a === 1 ? .8 : .62;
      if (instant) c.style.transition = "none";
      c.style.transform = `translate(-50%,-50%) translateX(${d * step}px) scale(${s})`;
      c.style.zIndex = String(10 - a);
      c.classList.toggle("on", d === 0);
      c.classList.toggle("far", a > 2);
      c.tabIndex = d === 0 ? 0 : -1;
      c.setAttribute("aria-current", d === 0 ? "true" : "false");
    });
    if (instant) requestAnimationFrame(() => cards.forEach((c) => (c.style.transition = "")));
    $("#prev").disabled = cur === 0; $("#next").disabled = cur === P.length - 1;
    $("#count").innerHTML = `<b>${cur + 1}</b> / ${P.length}`;
  }
  const go = (n) => { cur = clamp(n, 0, P.length - 1); layout(); };

  function initDeck() {
    $("#prev").innerHTML = ICON.left; $("#next").innerHTML = ICON.right;
    $("#prev").onclick = () => go(cur - 1); $("#next").onclick = () => go(cur + 1);
    /* drag / swipe. "dragged" is true only if the pointer really travelled, so a normal click is never lost */
    let x0 = null, dx = 0, dragged = false;
    deck.addEventListener("pointerdown", (e) => { x0 = e.clientX; dx = 0; dragged = false; });
    addEventListener("pointermove", (e) => { if (x0 == null) return; dx = e.clientX - x0; if (Math.abs(dx) > 8) dragged = true; });
    addEventListener("pointerup", () => { if (x0 != null && Math.abs(dx) > 50) go(cur + (dx < 0 ? 1 : -1)); x0 = null; });
    /* click: side card → bring to centre; centre card → open the player */
    deck.addEventListener("click", (e) => {
      const c = e.target.closest(".card"); if (!c || dragged) return;
      const i = +c.dataset.i;
      if (i === cur) openProject(i); else go(i);
    });
    /* keyboard: ← → move the deck while the Work section is on screen and the player is closed */
    new IntersectionObserver(([en]) => (sectionInView = en.isIntersecting), { threshold: .35 }).observe($("#work"));
    addEventListener("keydown", (e) => {
      if (!sectionInView || isOpen || e.altKey || e.ctrlKey || e.metaKey) return;
      if (e.target.closest("input, textarea, details")) return;
      if (e.key === "ArrowRight") { go(cur + 1); e.preventDefault(); }
      else if (e.key === "ArrowLeft") { go(cur - 1); e.preventDefault(); }
      else if (e.key === "Enter" && e.target === document.body) openProject(cur);
    });
    /* trackpad sideways scroll */
    let lock = 0;
    deck.addEventListener("wheel", (e) => {
      if (Math.abs(e.deltaX) < Math.abs(e.deltaY) || Date.now() < lock) return;
      e.preventDefault(); lock = Date.now() + 450; go(cur + (e.deltaX > 0 ? 1 : -1));
    }, { passive: false });
    addEventListener("resize", () => layout(true));
  }

  /* ---------- 5. player (plain overlay <div>, not <dialog>: works in every browser) ---------- */
  const player = $("#player"), pv = $("#pv"), media = $("#plMedia"), seek = $("#plSeek");
  let idx = 0, idleTimer = 0, isOpen = false, lastFocus = null;

  function fillInfo() {
    const p = P[idx];
    $("#plMeta").innerHTML = [p.year, L(p.kind), ratioLabel(p.ratio), (pv.duration || p.dur) ? mmss(pv.duration || p.dur) : ""].filter(Boolean).map((x) => `<span>${x}</span>`).join("");
    $("#plTitle").textContent = L(p.title);
    $("#plBlurb").textContent = L(p.blurb);
    $("#plWa").href = waLink(` (${L(p.title)})`);
    $("#plBack").style.visibility = idx === 0 ? "hidden" : "visible";
    $("#plNext").style.visibility = idx === P.length - 1 ? "hidden" : "visible";
  }
  function setPlaying(on) {
    media.classList.toggle("playing", on);
    $("#plPlay").innerHTML = on ? ICON.pause : ICON.play;
    $("#plBig").innerHTML = ICON.play;
  }
  function setMuteIcon() { $("#plMute").innerHTML = pv.muted ? ICON.mute : ICON.vol; }
  function timeUI() {
    const d = pv.duration || P[idx].dur || 0;               // use the length from projects.js until the real one is known
    $("#plTime").textContent = `${mmss(pv.currentTime)} / ${mmss(d)}`;
    if (d) { const v = (pv.currentTime / d) * 1000; seek.value = v; seek.style.setProperty("--p", `${v / 10}%`); }
  }
  function load(i) {
    idx = clamp(i, 0, P.length - 1);
    const p = P[idx];
    $("#plErr").hidden = true;
    media.classList.add("loading");
    const [rw, rh] = String(p.ratio || "9/16").split("/").map(Number);
    media.style.setProperty("--r", p.ratio || "9/16");
    media.classList.toggle("wide", rw / (rh || 1) > 1.2);   // wide films size by width, tall/square by height
    pv.pause(); pv.removeAttribute("src"); pv.load();        // fully reset the previous film
    pv.poster = p.poster || "";
    pv.src = p.src;
    seek.value = 0; seek.style.setProperty("--p", "0%");
    setPlaying(false); setMuteIcon(); timeUI(); fillInfo();
    const pr = pv.play();
    if (pr && pr.catch) pr.catch(() => setPlaying(false)); // autoplay refused → the big play button stays
  }
  function openProject(i) {
    if (!P[i]) return;
    lastFocus = document.activeElement;
    isOpen = true;
    player.hidden = false;
    document.documentElement.classList.add("lock");
    requestAnimationFrame(() => player.classList.add("open"));
    try { load(i); } catch (e) { console.error("player:", e); }
    heroSync();
    $("#close").focus({ preventScroll: true });
  }
  function closePlayer() {
    if (!isOpen) return;
    isOpen = false;
    player.classList.remove("open");
    pv.pause(); pv.removeAttribute("src"); pv.load();        // stop downloading + free memory
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
    document.documentElement.classList.remove("lock");
    setTimeout(() => { if (!isOpen) player.hidden = true; }, 350);
    cur = idx; layout(); heroSync();                          // deck centres on the film just watched
    if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
  }
  function toggle() { if (pv.paused) { const r = pv.play(); if (r && r.catch) r.catch(() => {}); } else pv.pause(); }
  function fullscreen() {
    if (document.fullscreenElement) return document.exitFullscreen();
    if (media.requestFullscreen) media.requestFullscreen().catch(() => {});
    else if (pv.webkitEnterFullscreen) pv.webkitEnterFullscreen();   // iPhone Safari
  }
  function wake() {
    media.classList.remove("idle"); clearTimeout(idleTimer);
    idleTimer = setTimeout(() => media.classList.add("idle"), 2200);
  }
  function initPlayer() {
    $("#plFs").innerHTML = ICON.fs;
    pv.addEventListener("play", () => { setPlaying(true); wake(); });
    pv.addEventListener("pause", () => setPlaying(false));
    pv.addEventListener("ended", () => { setPlaying(false); media.classList.remove("idle"); });
    pv.addEventListener("timeupdate", timeUI);
    pv.addEventListener("loadedmetadata", () => {
      timeUI(); fillInfo();                                  // refresh the length chip with the real duration
      if (pv.videoWidth && pv.videoHeight) {                 // trust the file, not the data: frame takes the video's real shape
        media.style.setProperty("--r", `${pv.videoWidth} / ${pv.videoHeight}`);
        media.classList.toggle("wide", pv.videoWidth / pv.videoHeight > 1.2);
      }
    });
    pv.addEventListener("loadeddata", () => media.classList.remove("loading"));
    pv.addEventListener("playing", () => media.classList.remove("loading"));
    pv.addEventListener("waiting", () => media.classList.add("loading"));
    pv.addEventListener("volumechange", setMuteIcon);
    pv.addEventListener("error", () => {                     // missing / unsupported file → readable message
      if (!pv.getAttribute("src")) return;
      media.classList.remove("loading");
      $("#plErr").hidden = false; $("#plErr").textContent = `${t("missing")}  (${P[idx].src})`; setPlaying(false);
    });
    $("#plBig").onclick = toggle; $("#plPlay").onclick = toggle; pv.addEventListener("click", toggle);
    $("#plMute").onclick = () => { pv.muted = !pv.muted; };
    $("#plFs").onclick = fullscreen;
    seek.addEventListener("input", () => { if (pv.duration) pv.currentTime = (seek.value / 1000) * pv.duration; timeUI(); });
    media.addEventListener("pointermove", wake);
    $("#plBack").onclick = () => load(idx - 1);
    $("#plNext").onclick = () => load(idx + 1);
    $("#close").onclick = closePlayer;
    player.addEventListener("click", (e) => { if (e.target === player || e.target.classList.contains("shell")) closePlayer(); });
    addEventListener("keydown", (e) => {
      if (!isOpen) return;
      if (e.key === "Escape") { closePlayer(); return; }
      if (e.target === seek && e.key.startsWith("Arrow")) return;      // slider keeps its own arrows
      if (e.key === " " && !e.target.closest("button, a")) { e.preventDefault(); toggle(); }
      else if (e.key === "ArrowRight") load(idx + 1);
      else if (e.key === "ArrowLeft") load(idx - 1);
      else if (e.key.toLowerCase() === "m") pv.muted = !pv.muted;
      else if (e.key.toLowerCase() === "f") fullscreen();
    });
  }

  /* ---------- 6. page effects ---------- */
  function initPage() {
    $("#lang").onclick = () => { lang = lang === "ar" ? "en" : "ar"; store.set("lang", lang); applyText(); };
    /* contact dropdown in the top pill */
    const cb = $("#cbtn"), cm = $("#cmenu");
    const shut = () => { cm.hidden = true; cb.setAttribute("aria-expanded", "false"); };
    cb.onclick = (e) => { e.stopPropagation(); cm.hidden = !cm.hidden; cb.setAttribute("aria-expanded", String(!cm.hidden)); };
    document.addEventListener("click", (e) => { if (!e.target.closest("#cwrap")) shut(); });
    addEventListener("keydown", (e) => { if (e.key === "Escape") shut(); });
    /* nav highlight */
    const links = $$("#nav > a");
    const spy = new IntersectionObserver((es) => es.forEach((en) => {
      if (!en.isIntersecting) return;
      links.forEach((a) => a.getAttribute("href") === `#${en.target.id}` ? a.setAttribute("aria-current", "true") : a.removeAttribute("aria-current"));
    }), { rootMargin: "-40% 0px -50% 0px" });
    links.map((a) => $(a.getAttribute("href"))).filter(Boolean).forEach((s) => spy.observe(s));
    /* reveal sections once */
    document.documentElement.classList.add("js");
    const rv = new IntersectionObserver((es) => es.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); rv.unobserve(en.target); } }), { threshold: .12 });
    $$(".band").forEach((b) => rv.observe(b));
    /* portrait: show the monogram unless the image really loaded */
    const im = $(".portrait img");
    const ok = () => $(".portrait").classList.add("ok");
    if (im.complete && im.naturalWidth) ok(); else im.addEventListener("load", ok, { once: true });
    im.addEventListener("error", () => im.remove(), { once: true });
    /* splash */
    const sp = $("#splash");
    if (reduce) sp.remove();
    else { const out = () => { sp.classList.add("out"); setTimeout(() => sp.remove(), 700); }; sp.addEventListener("click", out); setTimeout(out, 1100); }
  }

  /* ---------- 7. start ---------- */
  initHero(); initPage(); initDeck(); initPlayer();
  applyText();
  heroSync();
})();
