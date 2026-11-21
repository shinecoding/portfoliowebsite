// ─────────────────────────────────────────────────────────────
//  All text + film timing for the cinematic portfolio.
//  Edit the text inside the quotes; no other code needs to change.
// ─────────────────────────────────────────────────────────────

import PROJECTS from './projects';

const CONFIG = {
  name: { first: 'Christy', last: 'Choi' },
  role: 'Software Engineer',
  status: 'London · Open to new opportunities',

  accent: '#f2a48f', // rose-gold, matches the rim light in the film

  // Link preview (KakaoTalk, iMessage, Slack). image is public/og.jpg.
  siteUrl: 'https://portfoliowebsite-shinecoding.vercel.app',
  share: {
    description:
      'London · Open to new opportunities. Backend engineer with 3+ years and an MSc in Computer Science.',
    image: '/og.jpg',
  },

  about: {
    eyebrow: '01 — About',
    title: 'I build products end to end, from the UI to the cloud.',
    body:
      'Versatile software engineer with three years of commercial experience, ' +
      'holding an MSc in Computer Science from Queen Mary University of London. ' +
      'My focus is backend development, along with frontend and cloud infrastructure skills. ' +
      'I love solving complex technical challenges and delivering efficient, high quality solutions on time.',
    stats: [
      { value: '3+', label: 'Years as a software engineer' },
      { value: '4', label: 'Certifications incl. AWS SAA' },
      { value: '1', label: 'Startup founded' },
    ],
  },

  work: {
    eyebrow: '02 — Work',
    projects: PROJECTS, // details: components/cinematic/projects.js
  },

  skills: {
    eyebrow: '03 — Skills',
    title: 'Tools I ship with',
    list: [
      'Java', 'Spring', 'Python', 'Django', 'React', 'React Native', 'TypeScript',
      'JavaScript', 'AWS', 'Docker', 'PostgreSQL', 'MySQL', 'MongoDB', 'Terraform',
    ],
    certTitle: 'Certified',
    // icon: aws | github | medal (see certIcons.js)
    // url: the credential link (Credly etc.). Empty → opens certsPage.
    certsPage: 'https://www.linkedin.com/in/christy-choi-dev/details/certifications/',
    certifications: [
      { name: 'AWS Solutions Architect Associate', icon: 'aws', url: 'https://www.credly.com/badges/1fbcbd35-788d-4077-8b04-34a3de40f30e/linked_in_profile' },
      { name: 'AWS Certified Cloud Practitioner', icon: 'aws', url: 'https://www.credly.com/badges/dd9803d2-ee91-4e01-8bb2-1968c2504205/linked_in_profile' },
      { name: 'GitHub Foundations', icon: 'github', url: 'https://www.credly.com/badges/f9848c5f-733b-4b2d-87c6-3b98fd8d1288/linked_in_profile' },
      { name: 'Engineer Information Processing', icon: 'medal', url: 'https://www.linkedin.com/in/christy-choi-dev/details/certifications/' },
    ],
  },

  resume: {
    eyebrow: '04 — Résumé',
    experience: [
      { title: 'SnapQuest', meta: 'Software Engineer · Apr 2026 – Present' },
      { title: 'WareValley', meta: 'Software Engineer · Mar – Sep 2024' },
      { title: 'OrangeShine', meta: 'Software Engineer · Aug – Dec 2023' },
      { title: 'Ugly Stone', meta: 'Software Engineer · Jan 2022 – Jun 2023' },
      { title: 'InterMD', meta: 'Software Engineer · May – Dec 2021' },
    ],
    education: [
      { title: 'MSc Computer Science', meta: 'Queen Mary University of London · Distinction' },
    ],
    file: '/cv.pdf',
  },

  contact: {
    eyebrow: '05 — Contact',
    title: ["Let's build something", 'together.'],
    email: 'christychoi.dev@gmail.com',
    links: [
      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/christy-choi-dev/' },
      { label: 'GitHub', href: 'https://github.com/shinecoding' },
      { label: 'Blog', href: 'https://christychoi.hashnode.dev' },
    ],
  },

  // ── FILM ─────────────────────────────────────────────────────
  // Put the encoded films in public/media/. If they are missing the page
  // runs in "still mode" using stillImage, with the same scroll timeline.
  film: {
    desktop: '/media/film.mp4',
    mobile: '/media/film_mobile.mp4',
    poster: '/media/poster.jpg',
    stillImage: '/me.webp',
    duration: 29.9,
  },

  // Scroll → film time. t:[from,to]; from === to is a HOLD (film pauses).
  // h = how many viewport heights of scrolling the segment takes.
  // After building YOUR film, run `./film/build_film.sh frames`, look at the
  // frames and replace these seconds. Open the site with ?debug to see t live.
  segments: [
    { t: [0, 6.0], h: 1.6 },            // turns around
    { t: [6.0, 6.0], h: 1.0, id: 'intro' },
    { t: [6.0, 15.5], h: 1.8 },         // walks in → close-up
    { t: [15.5, 15.5], h: 1.2, id: 'about' },
    { t: [15.5, 27.0], h: 2.4 },        // pulls back, sits, desk slides in
    { t: [27.0, 27.0], h: 2.0, id: 'work' },
    // clips 5–6 not made yet: the film holds its last frame (29.9 s) from here
    { t: [27.0, 33.0], h: 1.0 },
    { t: [33.0, 33.0], h: 1.2, id: 'skills' },
    { t: [33.0, 36.0], h: 0.6 },
    { t: [36.0, 36.0], h: 1.2, id: 'resume' },
    { t: [36.0, 39.0], h: 0.6 },
    { t: [39.0, 39.0], h: 1.0, id: 'contact' },
  ],

  // When each section is visible (film seconds). fade = fade length in seconds.
  windows: {
    intro: [3.8, 7.2],
    about: [15.0, 16.6],
    work: [25.0, 31.0],
    skills: [31.5, 34.5],
    resume: [34.6, 37.4],
    contact: [37.6, 99],
  },
  fade: 0.5,
  resumeDrop: [34.8, 35.6],
  contactDraw: [38.0, 39.0],

  // Desktop: shift the whole film sideways (vw) over film time.
  shiftX: [
    { t: 0, x: 22 }, { t: 7.2, x: 22 }, { t: 15.5, x: 20 },
    { t: 18.5, x: 0 }, { t: 24, x: -14 }, { t: 39, x: -14 },
  ],
  // Mobile: which horizontal point of the film (0–1) stays centred on screen.
  mobileFocus: [{ t: 0, f: 0.5 }, { t: 39, f: 0.5 }],
  // Contact frame around you, as fractions of the film frame (x, y, w, h).
  contactFrame: { x: 0.36, y: 0.08, w: 0.28, h: 0.6 },
  contactFrameMobile: { x: 0.39, y: 0.08, w: 0.22, h: 0.4 },
};

export default CONFIG;
