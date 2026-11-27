import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import CONFIG from './config';
import CERT_ICONS from './certIcons';
import s from './cinematic.module.css';

// ── helpers ─────────────────────────────────────────────────
const clamp01 = (v) => (v < 0 ? 0 : v > 1 ? 1 : v);
const ease = (v) => 1 - Math.pow(1 - clamp01(v), 3); // easeOutCubic
const range = (t, a, b) => clamp01((t - a) / (b - a));

// piecewise-linear keyframes [{t, [key]}]
function keyframe(frames, t, key) {
  if (t <= frames[0].t) return frames[0][key];
  for (let i = 1; i < frames.length; i++) {
    const a = frames[i - 1];
    const b = frames[i];
    if (t <= b.t) {
      const p = b.t === a.t ? 1 : (t - a.t) / (b.t - a.t);
      const sm = p * p * (3 - 2 * p); // smoothstep between keys
      return a[key] + (b[key] - a[key]) * sm;
    }
  }
  return frames[frames.length - 1][key];
}

// Still mode (no film yet): how the photo moves over the same timeline.
const STILL = [
  { t: 0, x: 0, s: 0.9 }, { t: 7.6, x: 0, s: 1 }, { t: 14.6, x: 0, s: 1.75 },
  { t: 21, x: 0, s: 1 }, { t: 30, x: 0, s: 1 }, { t: 36, x: -0.17, s: 1 },
  { t: 46, x: -0.17, s: 1 },
];
const STILL_FRAME = { x: 0.17, y: 0.05, w: 0.32, h: 0.93 };

function buildTimeline(vh, mobile) {
  let y = 0;
  const segs = CONFIG.segments.map((seg) => {
    const len = (mobile && seg.mh != null ? seg.mh : seg.h) * vh;
    const out = { ...seg, y0: y, y1: y + len };
    y += len;
    return out;
  });
  return { segs, total: y };
}

function CertIcon({ name }) {
  const ic = CERT_ICONS[name];
  if (!ic) return null;
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      {ic.fill && <path d={ic.fill} fill="currentColor" />}
      {ic.stroke && <path d={ic.stroke} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" />}
    </svg>
  );
}

// Point this history entry at /#work, so the browser back button from a
// project page lands on the Work section instead of the top of the film.
function rememberSection() {
  const url = `${window.location.pathname}#work`;
  window.history.replaceState({ ...window.history.state, as: url, url: '/' }, '', url);
}

function sample(timeline, y) {
  const { segs } = timeline;
  let t = segs[segs.length - 1].t[1];
  const holds = {};
  for (const seg of segs) {
    const p = clamp01((y - seg.y0) / (seg.y1 - seg.y0));
    if (seg.id) holds[seg.id] = p;
    if (y >= seg.y0 && y < seg.y1) t = seg.t[0] + (seg.t[1] - seg.t[0]) * p;
  }
  if (y < 0) t = segs[0].t[0];
  return { t, holds };
}

const NAV = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Work' },
  { id: 'skills', label: 'Skills' },
  { id: 'resume', label: 'Résumé' },
  { id: 'contact', label: 'Contact' },
];

export default function CinematicPortfolio() {
  const rootRef = useRef(null);
  const videoRef = useRef(null);
  const spacerRef = useRef(null);
  const tlRef = useRef(null);
  const [mode, setMode] = useState('loading'); // loading | film | still
  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);
  const [debug, setDebug] = useState(false);
  const { name, about, work, skills, resume, contact } = CONFIG;

  // ── load the film (whole file → blob URL) or fall back to still mode ──
  useEffect(() => {
    setDebug(/[?&]debug/.test(window.location.search));
    const prevBg = document.body.style.background;
    document.body.style.background = '#000';
    document.documentElement.style.scrollBehavior = 'auto';

    let cancelled = false;
    let blobUrl = null;
    const mobile = window.matchMedia('(max-width: 760px)').matches;
    const sources = mobile ? [CONFIG.film.mobile, CONFIG.film.desktop] : [CONFIG.film.desktop];

    async function fetchWithProgress(url) {
      const res = await fetch(url);
      const type = res.headers.get('content-type') || '';
      if (!res.ok || !type.includes('video')) throw new Error('missing');
      const total = Number(res.headers.get('content-length')) || 0;
      if (!res.body || !total) return res.blob();
      const reader = res.body.getReader();
      const chunks = [];
      let got = 0;
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        chunks.push(value);
        got += value.length;
        if (!cancelled) setProgress(got / total);
      }
      return new Blob(chunks, { type: 'video/mp4' });
    }

    function waitForVideo(video) {
      return new Promise((resolve) => {
        const done = () => resolve();
        video.addEventListener('loadeddata', done, { once: true });
        setTimeout(done, 15000);
      });
    }

    (async () => {
      for (const url of sources) {
        try {
          const blob = await fetchWithProgress(url);
          if (cancelled) return;
          blobUrl = URL.createObjectURL(blob);
          const video = videoRef.current;
          video.src = blobUrl;
          video.load();
          await waitForVideo(video);
          if (cancelled) return;
          setMode('film');
          setProgress(1);
          setTimeout(() => !cancelled && setReady(true), 350);
          return;
        } catch (e) {
          // try the next source, or a plain src as a last resort
        }
      }
      if (cancelled) return;
      // No film yet → still mode with the cut-out photo
      const img = new Image();
      img.onload = img.onerror = () => {
        if (cancelled) return;
        setMode('still');
        setProgress(1);
        setTimeout(() => !cancelled && setReady(true), 350);
      };
      img.src = CONFIG.film.stillImage;
    })();

    return () => {
      cancelled = true;
      if (blobUrl) URL.revokeObjectURL(blobUrl);
      document.body.style.background = prevBg;
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);

  // ── iOS: unlock seeking on first touch ──
  useEffect(() => {
    const unlock = () => {
      const v = videoRef.current;
      if (v && v.src) {
        const p = v.play();
        if (p && p.then) p.then(() => v.pause()).catch(() => {});
      }
    };
    window.addEventListener('touchstart', unlock, { once: true, passive: true });
    return () => window.removeEventListener('touchstart', unlock);
  }, []);

  // ── the scroll → film loop ──
  useEffect(() => {
    if (mode === 'loading') return undefined;
    const root = rootRef.current;
    const video = videoRef.current;
    const q = (sel) => Array.from(root.querySelectorAll(sel));
    const secs = {};
    q('[data-sec]').forEach((el) => { secs[el.dataset.sec] = el; });
    const cards = q('[data-card]');
    const chips = q('[data-chip]');
    const certs = q('[data-cert]');
    const paper = root.querySelector('[data-paper]');
    const frames = q('[data-frame]');
    const film = root.querySelector('[data-film]');
    const still = root.querySelector('[data-still]');
    const shade = root.querySelector('[data-shade]');
    const bar = root.querySelector('[data-bar]');
    const hint = root.querySelector('[data-hint]');
    const dbg = root.querySelector('[data-debug]');
    const navBtns = q('[data-nav]');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let vh = window.innerHeight;
    let vw = window.innerWidth;
    let mobile = vw <= 760;
    const layout = () => {
      // ignore height-only changes on mobile (URL bar show/hide)
      if (window.innerWidth === vw && tlRef.current && mobile) return;
      vw = window.innerWidth;
      vh = window.innerHeight;
      mobile = vw <= 760;
      tlRef.current = buildTimeline(vh, mobile);
      spacerRef.current.style.height = `${tlRef.current.total + vh}px`;
    };
    tlRef.current = null;
    layout();
    window.addEventListener('resize', layout);

    // coming back from a project page (/#work) → start at that hold
    const hashId = window.location.hash.slice(1);
    const hashSeg = hashId && tlRef.current.segs.find((x) => x.id === hashId);
    if (hashSeg) {
      const at = hashId === 'work' ? 0.6 : 0.4;
      window.scrollTo(0, hashSeg.y0 + (hashSeg.y1 - hashSeg.y0) * at);
      const clean = window.location.pathname + window.location.search;
      window.history.replaceState({ ...window.history.state, as: clean }, '', clean);
    }

    let smoothY = window.scrollY;
    let raf;
    const { windows, fade } = CONFIG;

    const tick = () => {
      const tl = tlRef.current;
      const targetY = window.scrollY;
      smoothY += (targetY - smoothY) * (reduce ? 1 : 0.16);
      if (Math.abs(targetY - smoothY) < 0.3) smoothY = targetY;
      const { t, holds } = sample(tl, smoothY);

      // film playhead
      if (mode === 'film' && video.readyState >= 1) {
        // sections past the end of the film (clips not made yet) hold the last frame
        const vt = video.duration ? Math.min(t, video.duration - 0.05) : t;
        if (Math.abs(video.currentTime - vt) > 0.02 && !video.seeking) video.currentTime = vt;
      }

      // film placement
      if (mobile) {
        film.style.setProperty('--f', keyframe(CONFIG.mobileFocus, t, 'f').toFixed(4));
      } else {
        film.style.setProperty('--sx', `${keyframe(CONFIG.shiftX, t, 'x').toFixed(3)}vw`);
      }
      if (still) {
        still.style.setProperty('--stx', `${(keyframe(STILL, t, 'x') * 100).toFixed(3)}%`);
        still.style.setProperty('--sts', keyframe(STILL, t, 's').toFixed(4));
      }

      // sections
      let maxOp = 0;
      Object.keys(secs).forEach((id) => {
        const [a, b] = windows[id];
        const op = clamp01((t - a) / fade) * clamp01((b - t) / fade);
        const el = secs[id];
        el.style.opacity = op.toFixed(3);
        el.style.visibility = op > 0.01 ? 'visible' : 'hidden';
        el.style.pointerEvents = op > 0.6 ? 'auto' : 'none';
        el.style.setProperty('--in', op.toFixed(3));
        if (op > maxOp && id !== 'contact') maxOp = op;
        if (id === 'contact') maxOp = Math.max(maxOp, op);
      });
      shade.style.opacity = maxOp.toFixed(3);

      // work: cards fly out of the laptop during the work hold
      const wp = holds.work || 0;
      cards.forEach((el, i) => {
        const p = ease((wp * 1.9 - i * (0.55 / Math.max(cards.length - 1, 1))) / 0.45);
        el.style.setProperty('--p', p.toFixed(4));
      });

      // skills: chips pop one by one while walking past
      const [sa] = windows.skills;
      const sEnd = CONFIG.segments.find((x) => x.id === 'skills').t[0];
      const step = (sEnd - sa - 0.6) / Math.max(chips.length, 1);
      chips.forEach((el, i) => {
        el.style.setProperty('--p', ease((t - (sa + 0.3 + i * step)) / 0.6).toFixed(4));
      });

      // certifications: badges land one by one during the skills hold
      const cp = holds.skills || 0;
      certs.forEach((el, i) => {
        el.style.setProperty('--p', ease((cp * 2.2 - i * 0.18) / 0.4).toFixed(4));
      });

      // résumé: paper drops as the hands come down
      paper.style.setProperty('--p', ease(range(t, ...CONFIG.resumeDrop)).toFixed(4));

      // contact: frame is drawn while waving
      const fp = ease(range(t, ...CONFIG.contactDraw));
      frames.forEach((el) => {
        // non-scaling stroke dashes are measured in screen px → use the on-screen perimeter
        const r = el.getBoundingClientRect();
        const len = 2 * (r.width + r.height) + 4;
        el.style.strokeDasharray = `${len.toFixed(1)} ${len.toFixed(1)}`;
        el.style.strokeDashoffset = (len * (1 - fp)).toFixed(1);
        el.style.opacity = fp > 0.01 ? '1' : '0';
      });

      // chrome
      bar.style.transform = `scaleX(${clamp01(smoothY / tl.total).toFixed(4)})`;
      hint.style.opacity = (1 - clamp01(smoothY / (vh * 0.4))).toFixed(3);
      let active = 'home';
      tl.segs.forEach((seg) => { if (seg.id && smoothY >= seg.y0 - vh * 0.6) active = seg.id; });
      if (active === 'intro') active = 'home';
      navBtns.forEach((b) => b.classList.toggle(s.active, b.dataset.nav === active));
      if (dbg) dbg.textContent = `t ${t.toFixed(2)}s · y ${Math.round(smoothY)} · ${active}`;

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', layout);
    };
  }, [mode]);

  const goTo = (id) => {
    const tl = tlRef.current;
    if (!tl) return;
    if (id === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const seg = tl.segs.find((x) => x.id === (id === 'home' ? 'intro' : id));
    const at = id === 'work' ? 0.6 : 0.4;
    window.scrollTo({ top: seg.y0 + (seg.y1 - seg.y0) * at, behavior: 'smooth' });
  };

  const fr = CONFIG.contactFrame;
  const frm = CONFIG.contactFrameMobile;

  return (
    <div ref={rootRef} className={s.root} style={{ '--accent': CONFIG.accent }}>
      {/* loader */}
      <div className={`${s.loader} ${ready ? s.loaderDone : ''}`} aria-hidden={ready}>
        <div className={s.loaderName}>{name.first} {name.last}</div>
        <div className={s.loaderTrack}><div className={s.loaderBar} style={{ transform: `scaleX(${progress})` }} /></div>
        <div className={s.loaderPct}>{Math.round(progress * 100)}%</div>
      </div>

      {/* film stage */}
      <div className={s.stage} aria-hidden="true">
        <div className={s.film} data-film>
          <video
            ref={videoRef}
            className={s.video}
            muted
            playsInline
            preload="auto"
            poster={mode === 'film' ? CONFIG.film.poster : undefined}
            style={{ display: mode === 'still' ? 'none' : 'block' }}
          />
          {mode === 'still' && (
            <div className={s.stillWrap}>
              <div className={s.spot} />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={CONFIG.film.stillImage} alt="" className={s.still} data-still />
              <div className={s.stillFloor} />
            </div>
          )}
          <svg className={s.frameSvg} viewBox="0 0 1000 1000" preserveAspectRatio="none">
            {[mode === 'still' ? STILL_FRAME : fr, mode === 'still' ? STILL_FRAME : frm].map((r, i) => (
              <rect
                key={i}
                data-frame
                className={i === 0 ? s.frameDesk : `${s.frameMob} ${mode === 'still' ? s.hidden : ''}`}
                x={r.x * 1000} y={r.y * 1000} width={r.w * 1000} height={r.h * 1000}
                rx="14"
                vectorEffect="non-scaling-stroke"
              />
            ))}
          </svg>
        </div>
      </div>

      <div className={s.shade} data-shade />

      {/* top bar */}
      <header className={s.top}>
        <button type="button" className={s.brand} onClick={() => goTo('top')}>{name.first} {name.last}</button>
        <nav className={s.nav}>
          {NAV.map((n) => (
            <button type="button" key={n.id} data-nav={n.id} onClick={() => goTo(n.id)}>{n.label}</button>
          ))}
        </nav>
        <div className={s.progress}><div data-bar /></div>
      </header>

      {/* sections */}
      <main className={s.overlay}>
        <section className={`${s.sec} ${s.intro}`} data-sec="intro">
          <p className={s.hi}>Hi, I&apos;m</p>
          <h1 className={s.name}><span>{name.first}</span><span className={s.accent}>{name.last}</span></h1>
          <p className={s.role}>{CONFIG.role}</p>
          <p className={s.status}><i />{CONFIG.status}</p>
        </section>

        <section className={`${s.sec} ${s.about}`} data-sec="about">
          <p className={s.eyebrow}>{about.eyebrow}</p>
          <h2 className={s.h2}>{about.title}</h2>
          <p className={s.body}>{about.body}</p>
          <div className={s.stats}>
            {about.stats.map((st) => (
              <div key={st.label}><b>{st.value}</b><span>{st.label}</span></div>
            ))}
          </div>
        </section>

        <section className={`${s.sec} ${s.work}`} data-sec="work">
          <p className={s.eyebrow}>{work.eyebrow}</p>
          <div className={s.cards}>
            {work.projects.map((pr) => (
              <article key={pr.title} className={s.card} data-card>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={pr.image} alt="" loading="lazy" />
                <div>
                  <h3>
                    <Link href={`/work/${pr.slug}`}>
                      <a className={s.cardLink} onClick={rememberSection}>{pr.title}</a>
                    </Link>
                  </h3>
                  <p>{pr.tech}</p>
                </div>
                <svg className={s.chev} viewBox="0 0 24 24" aria-hidden="true"><path d="m9 6 6 6-6 6" /></svg>
              </article>
            ))}
          </div>
        </section>

        <section className={`${s.sec} ${s.skills}`} data-sec="skills">
          <p className={s.eyebrow}>{skills.eyebrow}</p>
          <h2 className={s.h2}>{skills.title}</h2>
          <ul className={s.chips}>
            {skills.list.map((sk) => <li key={sk} data-chip>{sk}</li>)}
          </ul>
          <p className={s.certTitle}>{skills.certTitle}</p>
          <ul className={s.certs}>
            {skills.certifications.map((c) => (
              <li key={c.name} data-cert>
                <a href={c.url || skills.certsPage} target="_blank" rel="noreferrer" className={s.certLink}>
                  <span className={s.certIcon}><CertIcon name={c.icon} /></span>
                  <span className={s.certText}>{c.name}</span>
                  <svg className={s.certArrow} viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8" /></svg>
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section className={`${s.sec} ${s.resume}`} data-sec="resume">
          <div className={s.paper} data-paper>
            <p className={s.eyebrow}>{resume.eyebrow}</p>
            <h3>Experience</h3>
            {resume.experience.map((x) => <p key={x.title}><b>{x.title}</b><span>{x.meta}</span></p>)}
            <h3>Education</h3>
            {resume.education.map((x) => <p key={x.title}><b>{x.title}</b><span>{x.meta}</span></p>)}
            <a className={s.dl} href={resume.file} download="Christy_Choi_CV.pdf">Download CV ↓</a>
          </div>
        </section>

        <section className={`${s.sec} ${s.contact}`} data-sec="contact">
          <div className={s.glass}>
            <p className={s.eyebrow}>{contact.eyebrow}</p>
            <h2 className={s.h2big}>{contact.title[0]}<br /><span className={s.accent}>{contact.title[1]}</span></h2>
            <a className={s.mail} href={`mailto:${contact.email}`}>{contact.email}</a>
            <div className={s.socials}>
              {contact.links.map((l) => <a key={l.label} href={l.href} target="_blank" rel="noreferrer">{l.label} ↗</a>)}
            </div>
          </div>
        </section>
      </main>

      <div className={s.hint} data-hint>Scroll to begin <span>↓</span></div>
      {debug && mode === 'still' && <div className={s.badge}>Preview · still mode</div>}
      {debug && <div className={s.debug} data-debug />}

      <div ref={spacerRef} className={s.spacer} />
    </div>
  );
}
