/* ==========================================================================
   Portfolio — Mobengo G'bama Kelly · Interactions
   Vanilla JS, sans dépendance. Respecte prefers-reduced-motion.
   ========================================================================== */
(() => {
  "use strict";

  const D = Object.assign({ projects: [], videos: [], photos: [], contactEmail: "" }, window.PORTFOLIO || {});
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const icon = (id, cls = "ico") => `<svg class="${cls}"><use href="#i-${id}"/></svg>`;

  /* ---------------------------------------------------------------------
     Visuels graphiques des projets (utilisés tant qu'aucune image n'est fournie)
     --------------------------------------------------------------------- */
  const COVERS = {
    menu: `<svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs><radialGradient id="cm" cx="70%" cy="20%" r="80%"><stop offset="0" stop-color="#3a2416"/><stop offset="1" stop-color="#140f0c"/></radialGradient></defs>
      <rect width="800" height="600" fill="url(#cm)"/>
      <g opacity=".08" stroke="#e3b384">${Array.from({ length: 18 }, (_, i) => `<line x1="${i * 48}" y1="0" x2="${i * 48}" y2="600"/>`).join("")}</g>
      <circle cx="610" cy="140" r="120" fill="#c98a55" opacity=".18"/>
      <g transform="translate(290 70) rotate(-6)">
        <rect width="230" height="460" rx="34" fill="#0e0c0b" stroke="#3b302a" stroke-width="3"/>
        <rect x="14" y="16" width="202" height="428" rx="24" fill="#f4ede3"/>
        <text x="115" y="88" text-anchor="middle" font-family="Fraunces, Georgia, serif" font-style="italic" font-size="42" fill="#0e0c0b">Menu</text>
        <rect x="88" y="104" width="54" height="2" fill="#c98a55"/>
        ${[150, 222, 294, 366].map((y, i) => `<g><circle cx="52" cy="${y + 18}" r="20" fill="${["#c98a55", "#8a9a85", "#e3b384", "#2f2a26"][i]}"/><rect x="84" y="${y + 6}" width="${90 - i * 8}" height="9" rx="4" fill="#2f2a26"/><rect x="84" y="${y + 24}" width="70" height="6" rx="3" fill="#b9ad9f"/><rect x="176" y="${y + 6}" width="22" height="9" rx="4" fill="#c98a55"/></g>`).join("")}
      </g>
      <g transform="translate(520 360) rotate(8)" opacity=".95">
        <rect width="170" height="110" rx="18" fill="#181412" stroke="#3b302a"/>
        <text x="22" y="46" font-family="Manrope, sans-serif" font-weight="700" font-size="20" fill="#e3b384">&lt;html&gt;</text>
        <text x="22" y="80" font-family="Manrope, sans-serif" font-weight="700" font-size="20" fill="#f4ede3" opacity=".6">{ css }</text>
      </g>
    </svg>`,
    agri: `<svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs><linearGradient id="ca" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#1d2a1f"/><stop offset="1" stop-color="#0f1410"/></linearGradient></defs>
      <rect width="800" height="600" fill="url(#ca)"/>
      <g fill="none" stroke="#8a9a85" stroke-opacity=".14">${[80, 140, 200, 260].map((r) => `<circle cx="400" cy="300" r="${r}"/>`).join("")}</g>
      <g stroke="#e3b384" stroke-width="2" stroke-dasharray="6 8" opacity=".7">
        <line x1="190" y1="190" x2="400" y2="300"/><line x1="170" y1="420" x2="400" y2="300"/><line x1="260" y1="510" x2="400" y2="300"/>
        <line x1="610" y1="180" x2="400" y2="300"/><line x1="640" y1="400" x2="400" y2="300"/><line x1="540" y1="520" x2="400" y2="300"/>
      </g>
      ${[[190, 190], [170, 420], [260, 510]].map(([x, y]) => `<g><circle cx="${x}" cy="${y}" r="30" fill="#8a9a85"/><path d="M${x - 10} ${y + 8} q10 -26 20 -16 q-4 18 -20 16z" fill="#0f1410"/></g>`).join("")}
      ${[[610, 180], [640, 400], [540, 520]].map(([x, y]) => `<g><circle cx="${x}" cy="${y}" r="30" fill="#c98a55"/><path d="M${x - 14} ${y - 3} h28 l-4 15 h-20z" fill="#0f1410"/><path d="M${x - 9} ${y - 3} l5 -10 M${x + 9} ${y - 3} l-5 -10" stroke="#0f1410" stroke-width="3" stroke-linecap="round"/></g>`).join("")}
      <circle cx="400" cy="300" r="62" fill="#f4ede3"/>
      <text x="400" y="294" text-anchor="middle" font-family="Fraunces, Georgia, serif" font-style="italic" font-size="26" fill="#0e0c0b">Agri</text>
      <text x="400" y="322" text-anchor="middle" font-family="Manrope, sans-serif" font-weight="800" font-size="15" letter-spacing="2" fill="#8f5528">CONNECT</text>
      <text x="120" y="580" font-family="Manrope, sans-serif" font-weight="700" font-size="14" letter-spacing="3" fill="#8a9a85">PRODUCTEURS</text>
      <text x="680" y="580" text-anchor="end" font-family="Manrope, sans-serif" font-weight="700" font-size="14" letter-spacing="3" fill="#e3b384">ACHETEURS</text>
    </svg>`,
    web: `<svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs><linearGradient id="cw" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#221d19"/><stop offset="1" stop-color="#0e0c0b"/></linearGradient></defs>
      <rect width="800" height="600" fill="url(#cw)"/>
      <circle cx="160" cy="480" r="200" fill="#c98a55" opacity=".12"/>
      <g transform="translate(110 110)">
        <rect width="420" height="300" rx="16" fill="#181412" stroke="#3b302a" stroke-width="2"/>
        <rect width="420" height="36" rx="16" fill="#2a231e"/><rect y="20" width="420" height="16" fill="#2a231e"/>
        ${[22, 42, 62].map((x, i) => `<circle cx="${x}" cy="18" r="6" fill="${["#c98a55", "#e3b384", "#8a9a85"][i]}"/>`).join("")}
        <rect x="30" y="66" width="170" height="210" rx="90" fill="#c98a55" opacity=".85"/>
        <text x="226" y="118" font-family="Fraunces, Georgia, serif" font-size="34" fill="#f4ede3">Portfolio</text>
        <rect x="228" y="138" width="150" height="8" rx="4" fill="#5a4e45"/><rect x="228" y="156" width="120" height="8" rx="4" fill="#5a4e45"/>
        <rect x="228" y="190" width="110" height="34" rx="17" fill="#e3b384"/>
      </g>
      <g transform="translate(410 250)">
        <rect width="290" height="260" rx="16" fill="#f4ede3"/>
        <text x="28" y="50" font-family="Fraunces, Georgia, serif" font-style="italic" font-size="26" fill="#0e0c0b">Formulaire</text>
        ${[76, 128].map((y) => `<rect x="28" y="${y}" width="234" height="38" rx="10" fill="#fff" stroke="#d9cfc2"/>`).join("")}
        <rect x="28" y="182" width="234" height="44" rx="22" fill="#0e0c0b"/>
        <rect x="104" y="200" width="82" height="8" rx="4" fill="#e3b384"/>
      </g>
    </svg>`,
    canva: `<svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect width="800" height="600" fill="#f4ede3"/>
      <rect x="0" y="0" width="800" height="600" fill="#ebe1d3" opacity=".6"/>
      <g transform="translate(120 90) rotate(-5)"><rect width="250" height="340" rx="14" fill="#0e0c0b"/><circle cx="125" cy="140" r="72" fill="#c98a55"/><rect x="40" y="248" width="170" height="14" rx="7" fill="#f4ede3"/><rect x="70" y="276" width="110" height="10" rx="5" fill="#8a8077"/></g>
      <g transform="translate(330 150) rotate(4)"><rect width="230" height="300" rx="14" fill="#c98a55"/><text x="115" y="130" text-anchor="middle" font-family="Fraunces, Georgia, serif" font-style="italic" font-size="58" fill="#0e0c0b">Aa</text><rect x="40" y="180" width="150" height="12" rx="6" fill="#0e0c0b"/><rect x="60" y="206" width="110" height="10" rx="5" fill="#0e0c0b" opacity=".5"/><rect x="70" y="240" width="90" height="30" rx="15" fill="#f4ede3"/></g>
      <g transform="translate(520 80) rotate(10)"><rect width="190" height="190" rx="14" fill="#8a9a85"/><path d="M30 150 L80 80 L115 120 L140 95 L170 150Z" fill="#f4ede3" opacity=".9"/><circle cx="140" cy="54" r="18" fill="#e3b384"/></g>
      <g fill="#0e0c0b">${[[600, 420], [640, 440], [680, 420], [720, 440]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="16" fill="${["#0e0c0b", "#c98a55", "#e3b384", "#8a9a85"][(x / 40) % 4 | 0]}"/>`).join("")}</g>
      <text x="600" y="510" font-family="Manrope, sans-serif" font-weight="800" font-size="14" letter-spacing="3" fill="#8f5528">CERTIFIÉE CANVA</text>
    </svg>`
  };
  const coverMarkup = (p) => {
    if (p.screen) {
      // Si le projet a une vidéo, elle se superpose à la capture (survol ou défilement)
      const vid = p.video ? `<video class="device__video" data-src="${esc(p.video)}" muted loop playsinline preload="none" aria-hidden="true" tabindex="-1"></video>` : "";
      return `<div class="device-cover device-cover--${esc(p.cover)}">
        <div class="device"><img src="${esc(p.screen)}" alt="${esc(p.screenAlt || p.title)}" loading="lazy" />${vid}</div>
        ${p.video ? `<span class="device-cover__live" aria-hidden="true">${icon("play")}Aperçu vidéo</span>` : ""}
      </div>`;
    }
    if (p.images && p.images[0]) return `<img src="${esc(p.images[0])}" alt="${esc(p.title)}" loading="lazy" />`;
    return COVERS[p.cover] || COVERS.web;
  };

  /* ---------------------------------------------------------------------
     1. Typographie découpée (hero)
     --------------------------------------------------------------------- */
  let ci = 0;
  $$("[data-split]").forEach((el) => {
    const text = el.textContent;
    el.setAttribute("aria-label", text);
    el.innerHTML = [...text].map((ch) => `<span class="char" aria-hidden="true" style="--ci:${ci++}">${ch === " " ? "&nbsp;" : esc(ch)}</span>`).join("");
  });

  /* ---------------------------------------------------------------------
     2. Préchargeur
     --------------------------------------------------------------------- */
  const start = performance.now();
  const ready = () => {
    const wait = reduce ? 0 : Math.max(0, 1000 - (performance.now() - start));
    setTimeout(() => {
      document.body.classList.remove("is-loading");
      setTimeout(() => document.body.classList.add("is-ready"), 30);
    }, wait);
  };
  if (document.readyState === "complete") ready();
  else window.addEventListener("load", ready, { once: true });
  setTimeout(ready, 3500); // filet de sécurité réseau lent

  /* ---------------------------------------------------------------------
     3. Navigation
     --------------------------------------------------------------------- */
  const nav = $("#nav");
  const burger = $(".nav__burger");
  const menu = $("#menu");
  $$(".menu__links a").forEach((a, i) => a.style.setProperty("--i", i));

  const setMenu = (open) => {
    menu.classList.toggle("is-open", open);
    menu.setAttribute("aria-hidden", String(!open));
    burger.setAttribute("aria-expanded", String(open));
    burger.setAttribute("aria-label", open ? "Fermer le menu" : "Ouvrir le menu");
    document.body.classList.toggle("is-locked", open);
    if (open) setTimeout(() => $(".menu__links a").focus({ preventScroll: true }), 400);
  };
  burger.addEventListener("click", () => setMenu(!menu.classList.contains("is-open")));
  $$("#menu a").forEach((a) => a.addEventListener("click", () => setMenu(false)));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && menu.classList.contains("is-open")) { setMenu(false); burger.focus(); } });

  // Lien actif
  const navLinks = $$(".nav__links a");
  const sectionObs = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      navLinks.forEach((a) => a.classList.toggle("is-active", a.getAttribute("href") === `#${en.target.id}`));
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  $$("main section[id]").forEach((s) => sectionObs.observe(s));

  /* ---------------------------------------------------------------------
     4. Défilement : progression, nav, parallaxe, timeline
     --------------------------------------------------------------------- */
  const progress = $(".scroll-progress");
  const parallaxEls = reduce ? [] : $$("[data-parallax]");
  // Parallaxe interne des images (l'image glisse dans son cadre) — liste enrichie après rendu
  let pimgEls = [];
  const collectPimg = () => { pimgEls = reduce ? [] : $$("[data-pimg]"); };
  const tlLine = $(".timeline__line");
  const timeline = $(".timeline");
  let lastY = window.scrollY;
  let ticking = false;

  const onScroll = () => {
    const y = window.scrollY;
    const vh = window.innerHeight;
    const max = document.documentElement.scrollHeight - vh;
    progress.style.setProperty("--p", max > 0 ? (y / max).toFixed(4) : 0);

    nav.classList.toggle("is-scrolled", y > 30);
    if (!menu.classList.contains("is-open")) nav.classList.toggle("is-hidden", y > lastY && y > 500);
    lastY = y;

    parallaxEls.forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.bottom < -200 || r.top > vh + 200) return;
      const offset = (r.top + r.height / 2 - vh / 2) * parseFloat(el.dataset.parallax);
      el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
    });

    pimgEls.forEach((el) => {
      const box = el.parentElement.getBoundingClientRect();
      if (box.bottom < -100 || box.top > vh + 100) return;
      // -1 (sous l'écran) → +1 (au-dessus) ; l'image est agrandie en CSS pour ne jamais laisser de vide
      const t = Math.max(-1, Math.min(1, (box.top + box.height / 2 - vh / 2) / (vh / 2 + box.height / 2)));
      el.style.setProperty("--py", `${(t * parseFloat(el.dataset.pimg) * 100).toFixed(2)}%`);
    });

    if (timeline) {
      const r = timeline.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (vh * 0.6 - r.top) / r.height));
      tlLine.style.setProperty("--tp", p.toFixed(3));
    }
    ticking = false;
  };
  window.addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
  onScroll();

  /* ---------------------------------------------------------------------
     5. Révélations au défilement
     --------------------------------------------------------------------- */
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) { en.target.classList.add("is-in"); revealObs.unobserve(en.target); }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
  const observeReveals = (root = document) => $$(".reveal:not(.is-in)", root).forEach((el) => revealObs.observe(el));

  /* ---------------------------------------------------------------------
     6. Curseur, effets magnétiques et inclinaison (pointeur fin uniquement)
     --------------------------------------------------------------------- */
  const bindPointerFx = (root = document) => {
    if (!finePointer || reduce) return;
    $$(".magnetic", root).forEach((el) => {
      if (el.dataset.fx) return; el.dataset.fx = "1";
      el.addEventListener("mousemove", (e) => {
        const r = el.getBoundingClientRect();
        el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.22}px, ${(e.clientY - r.top - r.height / 2) * 0.3}px)`;
      });
      el.addEventListener("mouseleave", () => { el.style.transform = ""; });
    });
    $$(".tilt", root).forEach((el) => {
      if (el.dataset.fx) return; el.dataset.fx = "1";
      el.addEventListener("mousemove", (e) => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width; const y = (e.clientY - r.top) / r.height;
        el.style.transform = `rotateX(${(0.5 - y) * 7}deg) rotateY(${(x - 0.5) * 9}deg) translateZ(0)`;
        el.style.setProperty("--mx", `${x * 100}%`); el.style.setProperty("--my", `${y * 100}%`);
      });
      el.addEventListener("mouseleave", () => { el.style.transform = ""; });
    });
  };

  if (finePointer && !reduce) {
    document.body.classList.add("has-cursor");
    const cur = $(".cursor"); const dot = $(".cursor__dot"); const ring = $(".cursor__ring"); const label = $(".cursor__ring em");
    let mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my;
    window.addEventListener("mousemove", (e) => { mx = e.clientX; my = e.clientY; dot.style.transform = `translate(${mx}px, ${my}px)`; cur.classList.remove("is-hidden"); }, { passive: true });
    document.addEventListener("mouseleave", () => cur.classList.add("is-hidden"));
    const loop = () => { rx += (mx - rx) * 0.18; ry += (my - ry) * 0.18; ring.style.transform = `translate(${rx}px, ${ry}px)`; requestAnimationFrame(loop); };
    loop();
    document.addEventListener("mouseover", (e) => {
      const lab = e.target.closest("[data-cursor-label]");
      const hov = e.target.closest("a, button, input, textarea, [role='tab']");
      cur.classList.toggle("is-label", !!lab);
      label.textContent = lab ? lab.dataset.cursorLabel : "";
      cur.classList.toggle("is-hover", !!hov && !lab);
    });
  }

  /* ---------------------------------------------------------------------
     7. Gestion des modales (focus, Échap, verrouillage du défilement)
     --------------------------------------------------------------------- */
  let activeModal = null; let lastFocus = null;
  const focusables = (m) => $$('a[href], button:not([disabled]), input, textarea, iframe, video, [tabindex]:not([tabindex="-1"])', m).filter((el) => el.offsetParent !== null || el === document.activeElement);
  const openModal = (m, trigger) => {
    if (activeModal && activeModal !== m) closeModal(activeModal, true);
    lastFocus = trigger || document.activeElement;
    m.hidden = false; m.classList.remove("is-closing");
    activeModal = m; document.body.classList.add("is-locked");
    setTimeout(() => { const f = $(".modal__close", m); f && f.focus({ preventScroll: true }); }, 50);
  };
  const closeModal = (m = activeModal, instant = false) => {
    if (!m || m.hidden) return;
    m.dispatchEvent(new CustomEvent("modal:close"));
    const done = () => { m.hidden = true; m.classList.remove("is-closing"); };
    if (instant || reduce) done(); else { m.classList.add("is-closing"); setTimeout(done, 340); }
    if (activeModal === m) { activeModal = null; document.body.classList.remove("is-locked"); if (!instant && lastFocus) lastFocus.focus({ preventScroll: true }); }
  };
  $$(".modal").forEach((m) => m.addEventListener("click", (e) => { if (e.target.closest("[data-close]")) closeModal(m); }));
  document.addEventListener("keydown", (e) => {
    if (!activeModal) return;
    if (e.key === "Escape") { e.preventDefault(); closeModal(); return; }
    if (e.key === "Tab") {
      const f = focusables(activeModal); if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  /* ---------------------------------------------------------------------
     8. Visionneuse d'images
     --------------------------------------------------------------------- */
  const lb = $("#lightbox"); const lbImg = $("img", lb); const lbCap = $("figcaption", lb); const lbCount = $(".lb__count", lb);
  const lbPrev = $(".lb__nav--prev", lb), lbNext = $(".lb__nav--next", lb);
  let lbItems = [], lbIndex = 0;
  const lbShow = (i) => {
    lbIndex = (i + lbItems.length) % lbItems.length;
    const it = lbItems[lbIndex];
    lbImg.src = it.src; lbImg.alt = it.alt || ""; lbCap.textContent = it.caption || "";
    if (!reduce) { lb.classList.remove("is-swapping"); void lb.offsetWidth; lb.classList.add("is-swapping"); }
    lbCount.textContent = lbItems.length > 1 ? `${lbIndex + 1} / ${lbItems.length}` : "";
    lbPrev.hidden = lbNext.hidden = lbItems.length < 2;
  };
  const openLightbox = (items, i, trigger) => { lbItems = items; lbShow(i); openModal(lb, trigger); };
  // Liens d'image isolés (À propos, bande « Prise de parole »)
  $$("[data-zoom]").forEach((a) => a.addEventListener("click", (e) => {
    e.preventDefault();
    const img = $("img", a);
    openLightbox([{ src: a.getAttribute("href"), alt: img ? img.alt : a.dataset.caption, caption: a.dataset.caption || "" }], 0, a);
  }));
  lbPrev.addEventListener("click", () => lbShow(lbIndex - 1));
  lbNext.addEventListener("click", () => lbShow(lbIndex + 1));
  document.addEventListener("keydown", (e) => {
    if (activeModal !== lb) return;
    if (e.key === "ArrowLeft") lbShow(lbIndex - 1);
    if (e.key === "ArrowRight") lbShow(lbIndex + 1);
  });
  let touchX = null;
  lb.addEventListener("touchstart", (e) => { touchX = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener("touchend", (e) => {
    if (touchX === null || lbItems.length < 2) return;
    const dx = e.changedTouches[0].clientX - touchX; touchX = null;
    if (Math.abs(dx) > 50) lbShow(lbIndex + (dx < 0 ? 1 : -1));
  });

  /* ---------------------------------------------------------------------
     9. Lecteur vidéo personnalisé
     --------------------------------------------------------------------- */
  const vm = $("#video-modal"); const player = $("#player"); const video = $("video", player);
  const seek = $(".player__seek", player); const tCur = $(".player__time", player); const tDur = $(".player__dur", player);
  const btnPlay = $('[data-act="play"]', player); const btnMute = $('[data-act="mute"]', player); const btnFull = $('[data-act="full"]', player);
  const fmt = (s) => { if (!isFinite(s)) return "0:00"; const m = Math.floor(s / 60); return `${m}:${String(Math.floor(s % 60)).padStart(2, "0")}`; };
  const setIco = (btn, id, lab) => { btn.innerHTML = icon(id); btn.setAttribute("aria-label", lab); };
  const toggle = () => (video.paused ? video.play().catch(() => {}) : video.pause());
  let idleT;
  const wake = () => { player.classList.remove("is-idle"); clearTimeout(idleT); idleT = setTimeout(() => player.classList.add("is-idle"), 2600); };

  video.addEventListener("play", () => { player.classList.add("is-playing"); setIco(btnPlay, "pause", "Pause"); wake(); });
  video.addEventListener("pause", () => { player.classList.remove("is-playing", "is-idle"); setIco(btnPlay, "play", "Lecture"); });
  video.addEventListener("loadedmetadata", () => { tDur.textContent = fmt(video.duration); });
  video.addEventListener("timeupdate", () => {
    const p = video.duration ? (video.currentTime / video.duration) * 1000 : 0;
    seek.value = p; seek.style.setProperty("--sp", `${p / 10}%`); tCur.textContent = fmt(video.currentTime);
  });
  video.addEventListener("ended", () => { video.currentTime = 0; });
  video.addEventListener("click", toggle);
  $(".player__big", player).addEventListener("click", toggle);
  btnPlay.addEventListener("click", toggle);
  seek.addEventListener("input", () => { if (video.duration) video.currentTime = (seek.value / 1000) * video.duration; });
  btnMute.addEventListener("click", () => { video.muted = !video.muted; setIco(btnMute, video.muted ? "mute" : "volume", video.muted ? "Activer le son" : "Couper le son"); });
  btnFull.addEventListener("click", () => {
    if (document.fullscreenElement) document.exitFullscreen();
    else if (player.requestFullscreen) player.requestFullscreen().catch(() => {});
    else if (video.webkitEnterFullscreen) video.webkitEnterFullscreen(); // iPhone
  });
  player.addEventListener("mousemove", wake);
  player.addEventListener("touchstart", wake, { passive: true });
  document.addEventListener("keydown", (e) => {
    if (activeModal !== vm || e.target === seek) return;
    if (e.key === " " || e.key === "k") { e.preventDefault(); toggle(); }
    if (e.key === "ArrowRight") video.currentTime = Math.min(video.duration || 0, video.currentTime + 5);
    if (e.key === "ArrowLeft") video.currentTime = Math.max(0, video.currentTime - 5);
    if (e.key === "m") btnMute.click();
    if (e.key === "f") btnFull.click();
  });
  vm.addEventListener("modal:close", () => { video.pause(); video.removeAttribute("src"); video.load(); });
  const openVideo = (v, trigger) => {
    pauseAllPreviews();
    player.classList.toggle("is-vertical", !!v.vertical);
    video.src = v.src; if (v.poster) video.poster = v.poster; else video.removeAttribute("poster");
    $(".player__title", player).textContent = v.title || "";
    seek.value = 0; seek.style.setProperty("--sp", "0%"); tCur.textContent = "0:00"; tDur.textContent = v.duration || "0:00";
    openModal(vm, trigger);
    video.play().catch(() => {});
  };

  /* ---------------------------------------------------------------------
     9 bis. Aperçus vidéo intégrés (muets, chargés à la demande)
     - se lancent quand ils sont visibles (ou au survol pour les cartes projet
       sur ordinateur), se mettent en pause hors écran ;
     - désactivés si l'utilisateur réduit les animations ou économise ses données.
     --------------------------------------------------------------------- */
  const saveData = !!(navigator.connection && navigator.connection.saveData);
  const previewsOn = !reduce && !saveData;
  const previews = new Set();
  const loadPreview = (v) => { if (!v.src && v.dataset.src) { v.src = v.dataset.src; } };
  const playPreview = (v) => {
    if (!previewsOn || (activeModal === vm)) return;
    loadPreview(v);
    v.play().then(() => v.closest(".is-previewable")?.classList.add("is-playing-preview")).catch(() => {});
  };
  const stopPreview = (v) => { if (!v.paused) v.pause(); v.closest(".is-previewable")?.classList.remove("is-playing-preview"); };
  function pauseAllPreviews() { previews.forEach(stopPreview); }
  const previewObs = new IntersectionObserver((entries) => {
    entries.forEach((en) => { en.isIntersecting ? playPreview(en.target) : stopPreview(en.target); });
  }, { threshold: 0.55 });
  const registerPreviews = (root, { hover = false } = {}) => {
    if (!previewsOn) return;
    $$("video[data-src]", root).forEach((v) => {
      previews.add(v);
      const host = v.closest(".is-previewable");
      if (hover && finePointer && host) {
        host.addEventListener("mouseenter", () => playPreview(v));
        host.addEventListener("mouseleave", () => stopPreview(v));
      } else {
        v.dataset.io = "1";
        previewObs.observe(v);
      }
    });
  };
  document.addEventListener("visibilitychange", () => { if (document.hidden) pauseAllPreviews(); });

  /* ---------------------------------------------------------------------
     10. Réalisations : grille, filtres, fiche détaillée
     --------------------------------------------------------------------- */
  const grid = $("#work-grid");
  const pm = $("#project-modal"); const pmBody = $("#pm-body");
  grid.innerHTML = D.projects.map((p, i) => `
    <article class="project reveal${p.video && p.screen ? " is-previewable" : ""}" data-cat="${esc(p.category)}" data-delay="${i % 2}">
      <div class="project__cover">
        ${coverMarkup(p)}
        <span class="project__tag">${esc(p.categoryLabel)}</span>
        <span class="project__go" aria-hidden="true">${icon("arrow-ur")}</span>
      </div>
      <div class="project__meta">
        <div>
          <h3>${esc(p.title)}</h3>
          <p>${esc(p.summary)}</p>
        </div>
        <span class="project__num">${String(i + 1).padStart(2, "0")}</span>
      </div>
      <button class="project__hit" type="button" data-project="${i}" data-cursor-label="Voir" aria-label="Voir le détail : ${esc(p.title)}"></button>
    </article>`).join("");

  $$(".filter").forEach((btn) => btn.addEventListener("click", () => {
    const f = btn.dataset.filter;
    $$(".filter").forEach((b) => { b.classList.toggle("is-active", b === btn); b.setAttribute("aria-selected", String(b === btn)); });
    $$(".project", grid).forEach((card) => {
      const show = f === "all" || card.dataset.cat === f;
      card.classList.toggle("is-hidden", !show);
      if (show && !reduce) { card.classList.remove("is-entering"); void card.offsetWidth; card.classList.add("is-entering", "is-in"); }
    });
  }));

  const renderProject = (i) => {
    const p = D.projects[i]; const n = D.projects.length;
    const prev = D.projects[(i - 1 + n) % n], next = D.projects[(i + 1) % n];
    const imgs = (p.images || []).map((src, k) => ({ src, alt: src === p.screen && p.screenAlt ? p.screenAlt : `${p.title} — visuel ${k + 1}`, caption: p.title }));
    pmBody.innerHTML = `
      <div class="pm__visual${p.video && p.screen ? " is-previewable" : ""}">${coverMarkup(p)}${imgs.length ? `<button class="pm__zoom" type="button" data-img="0" aria-label="Agrandir le visuel">${icon("expand")}<span>Agrandir</span></button>` : ""}</div>
      <div class="pm__content">
        <p class="eyebrow">${esc(p.categoryLabel)}</p>
        <h2 id="pm-title">${esc(p.title)}</h2>
        <p class="lead">${esc(p.summary)}</p>
        ${p.details && p.details.length ? `<div><p class="pm__label">En détail</p><ul class="pm__list">${p.details.map((d) => `<li>${esc(d)}</li>`).join("")}</ul></div>` : ""}
        ${p.tools && p.tools.length ? `<div><p class="pm__label">Outils & savoir-faire</p><div class="pm__tools">${p.tools.map((t) => `<span>${esc(t)}</span>`).join("")}</div></div>` : ""}
        ${imgs.length ? `<div><p class="pm__label">Galerie du projet</p><div class="pm__gallery">${imgs.map((im, k) => `<button type="button" data-img="${k}" aria-label="Agrandir le visuel ${k + 1}"><img src="${esc(im.src)}" alt="${esc(im.alt)}" loading="lazy" /></button>`).join("")}</div></div>` : ""}
        ${p.video || p.link ? `<div class="hero__actions">
          ${p.video ? `<button class="btn btn--accent" type="button" data-pvideo>${icon("play")}<span>Voir la vidéo</span></button>` : ""}
          ${p.link ? `<a class="btn btn--ghost" href="${esc(p.link)}" target="_blank" rel="noopener"><span>Voir le projet</span>${icon("arrow-ur")}</a>` : ""}
        </div>` : ""}
        ${n > 1 ? `<div class="pm__nav">
          <button type="button" data-goto="${(i - 1 + n) % n}">${icon("left")}<span>${esc(prev.title)}</span></button>
          <button type="button" data-goto="${(i + 1) % n}"><span>${esc(next.title)}</span>${icon("right")}</button>
        </div>` : ""}
      </div>`;
    $$("[data-img]", pmBody).forEach((b) => b.addEventListener("click", () => openLightbox(imgs, +b.dataset.img, b)));
    const pv = $("[data-pvideo]", pmBody); if (pv) pv.addEventListener("click", () => openVideo({ src: p.video, title: p.title, poster: p.videoPoster, vertical: !!p.screen }, pv));
    registerPreviews(pmBody);
    $$("[data-goto]", pmBody).forEach((b) => b.addEventListener("click", () => { renderProject(+b.dataset.goto); $(".modal__panel", pm).scrollTop = 0; }));
  };
  grid.addEventListener("click", (e) => {
    const hit = e.target.closest("[data-project]"); if (!hit) return;
    pauseAllPreviews();
    renderProject(+hit.dataset.project); openModal(pm, hit);
  });
  registerPreviews(grid, { hover: true });
  // Fermeture d'une modale : on coupe les aperçus qu'elle contenait et on relance ceux de la page
  [pm, vm].forEach((m) => m.addEventListener("modal:close", () => {
    $$("video[data-src]", m).forEach(stopPreview);
    setTimeout(() => previews.forEach((v) => {
      if (v.dataset.io && document.contains(v) && !pm.contains(v)) { previewObs.unobserve(v); previewObs.observe(v); }
    }), 400);
  }));

  /* ---------------------------------------------------------------------
     11. Galerie vidéo
     --------------------------------------------------------------------- */
  const vGrid = $("#videos-grid");
  if (D.videos.length) {
    const allVertical = D.videos.every((v) => v.vertical);
    const feature = !allVertical && (D.videos.length === 1 || D.videos.length % 2 === 1);
    const intro = allVertical ? `
      <div class="videos__intro reveal">
        <p class="eyebrow">Projets en mouvement</p>
        <p class="videos__lead">Présentations de projets et démonstrations à l’écran : la vidéo pour montrer, pas seulement raconter.</p>
        <p class="videos__hint">${icon("volume")}<span>Aperçus sans le son — cliquez pour regarder avec le son.</span></p>
        <div class="hero__actions">
          <a class="btn btn--ghost btn--small" href="https://www.tiktok.com/@kellymobengo3" target="_blank" rel="noopener">${icon("tiktok")}<span>TikTok</span></a>
          <a class="btn btn--ghost btn--small" href="https://www.instagram.com/kally19867/" target="_blank" rel="noopener">${icon("instagram")}<span>Instagram</span></a>
        </div>
      </div>` : "";
    vGrid.classList.toggle("videos__grid--reel", allVertical);
    vGrid.innerHTML = intro + D.videos.map((v, i) => `
      <button class="vcard reveal is-previewable ${v.vertical ? "vcard--vertical" : ""} ${feature && i === 0 ? "vcard--feature" : ""}" type="button" data-video="${i}" data-cursor-label="Lire" data-delay="${(i % 3) + (allVertical ? 1 : 0)}" aria-label="Lire la vidéo avec le son : ${esc(v.title || "vidéo")}">
        <span class="vcard__thumb">
          ${v.poster ? `<img src="${esc(v.poster)}" alt="" loading="lazy" />` : ""}
          <video ${v.poster ? "" : `src="${esc(v.src)}#t=0.5" preload="metadata"`} data-src="${esc(v.src)}" muted loop playsinline preload="none" tabindex="-1" aria-hidden="true"></video>
          <span class="vcard__play">${icon("play")}</span>
          ${v.duration ? `<span class="vcard__dur">${esc(v.duration)}</span>` : ""}
          <span class="vcard__live" aria-hidden="true"><i></i>Aperçu</span>
        </span>
        <span class="vcard__body">${v.category ? `<small>${esc(v.category)}</small>` : ""}<span class="vcard__title">${esc(v.title || "")}</span></span>
      </button>`).join("");
    // Halo d'ambiance : l'affiche de la première vidéo, floutée, en fond de section
    const firstPoster = D.videos.find((v) => v.poster);
    if (firstPoster) {
      const amb = document.createElement("div");
      amb.className = "videos__ambient"; amb.setAttribute("aria-hidden", "true");
      amb.innerHTML = `<img src="${esc(firstPoster.poster)}" alt="" loading="lazy" />`;
      $("#videos").prepend(amb);
    }
    vGrid.addEventListener("click", (e) => { const b = e.target.closest("[data-video]"); if (b) openVideo(D.videos[+b.dataset.video], b); });
    registerPreviews(vGrid);
  } else {
    vGrid.innerHTML = `
      <div class="videos__empty reveal">
        <div class="videos__empty-inner">
          <span class="vcard__play" aria-hidden="true">${icon("film")}</span>
          <h3>La sélection vidéo arrive bientôt.</h3>
          <p>Les contenus vidéo de Kelly seront publiés ici prochainement. En attendant, retrouvez-la sur TikTok et Instagram.</p>
          <div class="hero__actions" style="justify-content:center">
            <a class="btn btn--ghost btn--small" href="https://www.tiktok.com/@kellymobengo3" target="_blank" rel="noopener">${icon("tiktok")}<span>TikTok</span></a>
            <a class="btn btn--ghost btn--small" href="https://www.instagram.com/kally19867/" target="_blank" rel="noopener">${icon("instagram")}<span>Instagram</span></a>
          </div>
        </div>
      </div>`;
  }

  /* ---------------------------------------------------------------------
     12. Mon parcours en images (mosaïque éditoriale)
     --------------------------------------------------------------------- */
  const mosaic = $("#mosaic");
  const texts = [
    { cls: "", k: "Basée à", v: "Kinshasa, <em>RDC</em>" },
    { cls: "tile--caramel", k: "Trois langues", v: "Français, anglais <em>&amp;</em> lingala" },
    { cls: "tile--outline", k: "Depuis 2025", v: "Community <em>Manager</em>" }
  ];
  const photoTile = (ph, i) => `
    <a class="tile tile--photo tile--${esc(ph.format || "square")} reveal" data-delay="${i % 3}" href="${esc(ph.src)}" data-photo="${i}" data-cursor-label="Voir" aria-label="Agrandir : ${esc(ph.caption || ph.alt)}">
      <figure><img src="${esc(ph.src)}" alt="${esc(ph.alt)}" loading="lazy" data-pimg="0.05"${ph.position ? ` style="object-position:${esc(ph.position)}"` : ""} /></figure>
      <span class="tile__cap"><span>${esc(ph.caption || "")}</span><b>${String(i + 1).padStart(2, "0")}</b></span>
    </a>`;
  const textTile = (t, d) => `<div class="tile tile--text ${t.cls} reveal" data-delay="${d}"><small>${t.k}</small><strong>${t.v}</strong></div>`;
  const P = D.photos;
  // Répartition en colonnes : chaque photo va dans la colonne la plus courte ;
  // une tuile texte par colonne s'étire pour que toutes les colonnes finissent alignées.
  const ratio = { tall: 4 / 3, square: 1, wide: 0.625 };
  const textAt = { 3: [1, 0, 2], 2: [1, 0, 4] }; // position de chaque tuile texte dans sa colonne (rythme visuel)
  const layoutMosaic = () => {
    const n = window.matchMedia("(max-width: 900px)").matches ? 2 : 3;
    if (mosaic.dataset.cols === String(n)) return;
    mosaic.dataset.cols = n;
    // Hauteur de départ : les tuiles texte (≈ 0,6 largeur) et le décalage de la 2e colonne
    const cols = Array.from({ length: n }, (_, k) => ({ h: texts.filter((_, t) => t % n === k).length * 0.6 + (k === 1 ? 0.15 : 0), items: [] }));
    P.forEach((ph, i) => {
      const c = cols.reduce((a, b) => (b.h < a.h ? b : a));
      c.items.push(photoTile(ph, i)); c.h += ratio[ph.format] || 1;
    });
    texts.forEach((t, k) => {
      const c = cols[k % n];
      c.items.splice(Math.min(textAt[n][k], c.items.length), 0, textTile(t, k % 3));
    });
    mosaic.innerHTML = cols.map((c) => `<div class="mosaic__col">${c.items.join("")}</div>`).join("");
    observeReveals(mosaic); collectPimg(); onScroll();
  };
  layoutMosaic();
  window.matchMedia("(max-width: 900px)").addEventListener("change", layoutMosaic);
  const photoItems = P.map((ph) => ({ src: ph.src, alt: ph.alt, caption: ph.caption }));
  mosaic.addEventListener("click", (e) => { const b = e.target.closest("[data-photo]"); if (b) { e.preventDefault(); openLightbox(photoItems, +b.dataset.photo, b); } });

  /* ---------------------------------------------------------------------
     13. CV : consultation dans le navigateur
     --------------------------------------------------------------------- */
  const cvModal = $("#cv-modal"); const cvFrame = $(".cvm__frame", cvModal);
  const pdfUrl = "assets/docs/CV_Kelly_Mobengo.pdf";
  const noInlinePdf = /Android/i.test(navigator.userAgent); // Chrome Android n'affiche pas les PDF intégrés
  $$("[data-open-cv]").forEach((b) => b.addEventListener("click", () => {
    if (noInlinePdf) { window.open(pdfUrl, "_blank", "noopener"); return; }
    if (!cvFrame.src) cvFrame.src = cvFrame.dataset.src;
    openModal(cvModal, b);
  }));

  /* ---------------------------------------------------------------------
     14. Formulaire de contact (envoi réel via FormSubmit)
     --------------------------------------------------------------------- */
  const form = $("#contact-form");
  const status = $(".form__status", form);
  const submitBtn = $('button[type="submit"]', form);
  const btnLabel = $(".btn__label", submitBtn);
  const rules = {
    name: (v) => v.trim().length >= 2 || "Veuillez indiquer votre nom.",
    email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) || "Veuillez saisir une adresse e-mail valide.",
    subject: (v) => v.trim().length >= 3 || "Veuillez préciser l’objet de votre message.",
    message: (v) => v.trim().length >= 10 || "Votre message doit contenir au moins 10 caractères."
  };
  const validateField = (input) => {
    const rule = rules[input.name]; if (!rule) return true;
    const res = rule(input.value); const field = input.closest(".field");
    field.classList.toggle("is-invalid", res !== true);
    $(".field__err", field).textContent = res === true ? "" : res;
    input.setAttribute("aria-invalid", String(res !== true));
    return res === true;
  };
  $$("input, textarea", form).forEach((el) => el.addEventListener("blur", () => { if (el.value) validateField(el); }));
  $$("input, textarea", form).forEach((el) => el.addEventListener("input", () => { if (el.closest(".field")?.classList.contains("is-invalid")) validateField(el); }));

  const showStatus = (type, html) => {
    status.className = `form__status is-visible is-${type}`;
    status.innerHTML = `${icon(type === "ok" ? "check" : "alert")}<span>${html}</span>`;
  };

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const fields = $$("input[name]:not(.hp), textarea[name]", form);
    const valid = fields.map(validateField).every(Boolean);
    if (!valid) { const bad = $(".is-invalid input, .is-invalid textarea", form); bad && bad.focus(); return; }
    if (form._honey.value) return; // robot

    const data = Object.fromEntries(fields.map((f) => [f.name, f.value.trim()]));
    const fallback = `mailto:${D.contactEmail}?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(`${data.message}\n\n— ${data.name} (${data.email})`)}`;
    const fallbackHtml = `Vous pouvez <a href="${fallback}">envoyer ce message par e-mail</a> ou <a href="https://wa.me/243861056130" target="_blank" rel="noopener">écrire sur WhatsApp</a>.`;

    submitBtn.disabled = true; btnLabel.textContent = "Envoi en cours…";
    status.className = "form__status";
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(D.contactEmail)}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          Nom: data.name, Email: data.email, Objet: data.subject, Message: data.message,
          _replyto: data.email, _subject: `Portfolio — ${data.subject}`, _template: "table", _captcha: "false"
        })
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok && String(json.success) === "true") {
        showStatus("ok", `Merci ${esc(data.name.split(" ")[0])} ! Votre message a bien été envoyé. Kelly vous répondra dès que possible.`);
        form.reset(); $$(".field", form).forEach((f) => f.classList.remove("is-invalid"));
      } else {
        showStatus("err", `Le message n’a pas pu être envoyé${json.message ? ` (${esc(json.message)})` : ""}. ${fallbackHtml}`);
      }
    } catch (err) {
      showStatus("err", `Connexion au service d’envoi impossible. ${fallbackHtml}`);
    } finally {
      submitBtn.disabled = false; btnLabel.textContent = "Envoyer le message";
    }
  });

  /* ---------------------------------------------------------------------
     15. Divers : copie d'e-mail, toast, année
     --------------------------------------------------------------------- */
  const toast = $(".toast"); let toastT;
  const showToast = (msg) => { toast.textContent = msg; toast.classList.add("is-visible"); clearTimeout(toastT); toastT = setTimeout(() => toast.classList.remove("is-visible"), 2400); };
  $$("[data-copy]").forEach((b) => b.addEventListener("click", async () => {
    try { await navigator.clipboard.writeText(b.dataset.copy); showToast("Adresse e-mail copiée"); }
    catch { window.location.href = `mailto:${b.dataset.copy}`; }
  }));
  $("#year").textContent = new Date().getFullYear();

  // Initialisation finale
  observeReveals();
  bindPointerFx();
  collectPimg();
  onScroll();
})();
