import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import PROJECTS from '../../components/cinematic/projects';
import CONFIG from '../../components/cinematic/config';
import s from '../../components/cinematic/project.module.css';

export async function getStaticPaths() {
  return { paths: PROJECTS.map((p) => ({ params: { slug: p.slug } })), fallback: false };
}

export async function getStaticProps({ params }) {
  return { props: { slug: params.slug } };
}

export default function ProjectPage({ slug }) {
  const i = PROJECTS.findIndex((p) => p.slug === slug);
  const p = PROJECTS[i];
  const next = PROJECTS[(i + 1) % PROJECTS.length];
  const [zoom, setZoom] = useState(null);
  const shots = p.gallery || [];

  useEffect(() => {
    const prev = document.body.style.background;
    document.body.style.background = '#000';
    return () => { document.body.style.background = prev; };
  }, []);

  useEffect(() => {
    setZoom(null);
  }, [slug]);

  useEffect(() => {
    if (zoom === null) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') setZoom(null);
      if (e.key === 'ArrowRight') setZoom((z) => (z + 1) % shots.length);
      if (e.key === 'ArrowLeft') setZoom((z) => (z - 1 + shots.length) % shots.length);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [zoom, shots.length]);

  const cover = p.cover || (shots[0] ? shots[0].src : p.image);

  return (
    <div className={s.root} style={{ '--accent': CONFIG.accent }}>
      <Head>
        <title>{`${p.title} — ${CONFIG.name.first} ${CONFIG.name.last}`}</title>
        <meta name="description" content={p.subtitle} />
      </Head>

      <header className={s.bar}>
        <Link href="/"><a className={s.brand}>{CONFIG.name.first} {CONFIG.name.last}</a></Link>
        <Link href="/#work"><a className={s.back}>← All work</a></Link>
      </header>

      <main className={s.main}>
        <section className={s.hero}>
          <p className={s.eyebrow}>{p.kind} · {p.period}</p>
          <h1 className={s.title}>{p.title}</h1>
          <p className={s.subtitle}>{p.subtitle}</p>
          {p.website && (
            <a className={s.visit} href={p.website} target="_blank" rel="noreferrer">
              {p.website.replace(/^https?:\/\/(www\.)?/, '')} ↗
            </a>
          )}
        </section>

        <button type="button" className={s.cover} onClick={() => shots.length && setZoom(0)} aria-label="View screenshot">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={cover} alt={`${p.title} screenshot`} />
        </button>

        <dl className={s.facts}>
          <div><dt>Type</dt><dd>{p.kind}</dd></div>
          {p.company && <div><dt>{p.kind === 'Bootcamp project' ? 'Programme' : 'Company'}</dt><dd>{p.company}</dd></div>}
          <div><dt>Period</dt><dd>{p.period}</dd></div>
          {p.team && <div><dt>Team</dt><dd>{p.team}</dd></div>}
        </dl>

        <section className={s.block}>
          <h2 className={s.h2}>Overview</h2>
          <div className={s.prose}>
            {p.overview.map((t) => <p key={t}>{t}</p>)}
          </div>
        </section>

        {p.metric && (
          <section className={s.metric}>
            <strong>{p.metric.value}</strong>
            <span>{p.metric.label}</span>
          </section>
        )}

        {p.pipeline && (
          <section className={s.block}>
            <h2 className={s.h2}>How it works</h2>
            <ol className={s.steps}>
              {p.pipeline.map((t, n) => (
                <li key={t}><span className={s.stepNo}>{String(n + 1).padStart(2, '0')}</span>{t}</li>
              ))}
            </ol>
          </section>
        )}

        {p.features && (
          <section className={s.block}>
            <h2 className={s.h2}>Features I built</h2>
            <div className={s.features}>
              {p.features.map((f) => (
                <article key={f.title} className={s.feature}>
                  <h3>{f.title}</h3>
                  <p>{f.body}</p>
                </article>
              ))}
            </div>
          </section>
        )}

        <section className={s.block}>
          <h2 className={s.h2}>My role</h2>
          <ul className={s.list}>
            {p.role.map((t) => <li key={t}>{t}</li>)}
          </ul>
        </section>

        {p.process && (
          <section className={s.block}>
            <h2 className={s.h2}>Process</h2>
            <ol className={s.timeline}>
              {p.process.map((x) => (
                <li key={x.when}><span>{x.when}</span>{x.what}</li>
              ))}
            </ol>
          </section>
        )}

        <section className={s.block}>
          <h2 className={s.h2}>Stack</h2>
          <ul className={s.chips}>
            {p.stack.map((t) => <li key={t}>{t}</li>)}
          </ul>
        </section>

        {shots.length > 1 && (
          <section className={s.block}>
            <h2 className={s.h2}>Screens</h2>
            <div className={s.gallery}>
              {shots.map((g, n) => (
                <figure key={g.src} className={g.tall ? s.tall : undefined}>
                  <button type="button" onClick={() => setZoom(n)} aria-label={`Enlarge: ${g.caption}`}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={g.src} alt={g.caption} loading="lazy" />
                  </button>
                  <figcaption>{g.caption}</figcaption>
                </figure>
              ))}
            </div>
          </section>
        )}

        {p.confidential && (
          <p className={s.note}>
            Built for a company, so the source code is confidential.
          </p>
        )}

        {p.links && (
          <div className={s.links}>
            {p.links.map((l) => (
              <a key={l.href} href={l.href} target="_blank" rel="noreferrer">{l.label} ↗</a>
            ))}
          </div>
        )}

        <nav className={s.next}>
          <span>Next project</span>
          <Link href={`/work/${next.slug}`}><a>{next.title} →</a></Link>
        </nav>
      </main>

      {zoom !== null && shots[zoom] && (
        <div className={s.lightbox} role="dialog" aria-modal="true" onClick={() => setZoom(null)}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={shots[zoom].src} alt={shots[zoom].caption} />
          <p>{shots[zoom].caption}{shots.length > 1 ? ` · ${zoom + 1} / ${shots.length}` : ''}</p>
          <button type="button" className={s.close} aria-label="Close">×</button>
        </div>
      )}
    </div>
  );
}
