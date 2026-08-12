import React, { useEffect, useRef } from 'react';
import styles from './styles.module.css';

const mascotImg = require('@site/static/img/title-mascots/tm-elect.png').default;

const stageImg1 = require('@site/static/img/lifecycle/cm-lifecycle-1.png').default;
const stageImg2 = require('@site/static/img/lifecycle/cm-lifecycle-1.png').default;
const stageImg3 = require('@site/static/img/lifecycle/cm-lifecycle-1.png').default;
const stageImg4 = require('@site/static/img/lifecycle/cm-lifecycle-1.png').default;
const stageImg5 = require('@site/static/img/lifecycle/cm-lifecycle-1.png').default;

const BulbIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M9 18h6M10 22h4M12 2a6 6 0 0 0-4 10.5c.6.5 1 1.3 1 2.1V15h6v-.4c0-.8.4-1.6 1-2.1A6 6 0 0 0 12 2z" />
  </svg>
);

const FlatIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
    <path d="M4 20V10M12 20V4M20 20v-7" />
  </svg>
);
const FairIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);
const QuadraticIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 19h16M4 19V5" /><path d="M4 19C7 12 9 8 14 6.5S21 5 21 5" />
  </svg>
);
const CappedIcon = () => (
  <svg viewBox="0 0 24 24" fill="#fff" aria-hidden="true">
    <path d="M12 2l7 3v6c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V5l7-3z" />
  </svg>
);
const ThresholdIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 4h16l-6 9v6l-4 2v-8L4 4z" />
  </svg>
);
const PuzzleIcon = () => (
  <svg viewBox="0 0 24 24" fill="#fff" aria-hidden="true">
    <path d="M20.5 11H19V7.5C19 6.12 17.88 5 16.5 5H13V3.5C13 2.12 11.88 1 10.5 1S8 2.12 8 3.5V5H4.5C3.13 5 2 6.13 2 7.5v3.68h1.5c1.19 0 2.16.97 2.16 2.16s-.97 2.16-2.16 2.16H2v3.68C2 20.87 3.13 22 4.5 22h3.68v-1.5c0-1.19.97-2.16 2.16-2.16s2.16.97 2.16 2.16V22h3.68c1.37 0 2.5-1.13 2.5-2.5V16h1.5c1.38 0 2.5-1.12 2.5-2.5S21.88 11 20.5 11z" />
  </svg>
);
const PlusIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="var(--pa-trust)" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
    <path d="M12 5v14M5 12h14" />
  </svg>
);

const LightningIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" />
  </svg>
);
const UnlinkIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M9 15L15 9M10 6l.6-.6a4 4 0 0 1 5.7 5.7L15.6 12M14 18l-.6.6a4 4 0 0 1-5.7-5.7L8.4 12" />
  </svg>
);
const SlidersIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 6h10M4 12h6M4 18h10M17 5v3M17 8a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM13 17v3M13 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
  </svg>
);
const EyeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
  </svg>
);


const FLOW_STEPS = [
  {
    title: 'Candidates', subtitle: 'with backing',
    desc: 'Supporters stake collateral behind the candidates they back.',
    caption: "Candidates line up their backing before I even get involved.",
    image: stageImg1,
  },
  {
    title: 'Election Requested', subtitle: 'by duty pallet',
    desc: 'Any duty pallet triggers an election when it needs authors.',
    caption: 'A duty pallet just tapped me on the shoulder - time to run this.',
    image: stageImg2,
  },
  {
    title: 'Election Plugin', subtitle: 'processes election',
    desc: 'Loads the configured model, runs election logic, and returns the selected authors.',
    caption: 'This is home base. I load whatever model your governance configured.',
    image: stageImg3,
  },
  {
    title: 'Selected Authors', subtitle: null,
    desc: 'Selected authors become eligible for network duties.',
    caption: "And... selected! These authors are ready to work.",
    image: stageImg4,
  },
  {
    title: 'Used by Duty Pallets', subtitle: null,
    desc: 'Other pallets use the elected authors for their responsibilities.',
    caption: "My job's done here - other pallets take it from here.",
    image: stageImg5,
  },
];

const MODELS = [
  { icon: <FlatIcon />, title: 'Flat (Aggregated)', desc: 'All backing is aggregated per author into one influence weight.', c1: '#3f9df0', c2: '#0a3d91' },
  { icon: <FairIcon />, title: 'Fair (Individual)', desc: 'Every backing is its own weight - every contribution counts.', c1: '#6ece78', c2: '#168036' },
  { icon: <QuadraticIcon />, title: 'Quadratic', desc: 'Reduces the influence of large backings to favor decentralization.', c1: '#ffcb6b', c2: '#c2760a'  },
  { icon: <CappedIcon />, title: 'Capped', desc: 'Applies an upper limit so no single backing can dominate.', c1: '#d783d4', c2: '#e151bf'  },
  { icon: <ThresholdIcon />, title: 'Threshold', desc: 'Only backings above a minimum threshold are counted.', c1: '#97a4ce', c2: '#180a91'  },
  { icon: <PuzzleIcon />, title: 'Custom', desc: 'Build and plug in your own election logic.', c1: '#c48af0', c2: '#7020b0'  },
];

const BAND_ITEMS = [
  { icon: <LightningIcon />, title: 'On-Demand', desc: 'Elections run only when a duty pallet needs them.' },
  { icon: <UnlinkIcon />, title: 'Decoupled', desc: 'Election logic lives here. Duty pallets stay simple and focused.' },
  { icon: <SlidersIcon />, title: 'Flexible', desc: 'Swap models anytime via configuration, not code.' },
  { icon: <EyeIcon />, title: 'Transparent', desc: 'Deterministic, verifiable, and auditable.' },
  { icon: <PuzzleIcon />, title: 'Extensible', desc: 'Add new models without changing existing pallets.' },
];

export default function ElectingAuthors() {
  const stepRefs = useRef([]);
  const captionRef = useRef(null);
  const imageRef = useRef(null);
  const captionTimerRef = useRef(null);
  const imageTimerRef = useRef(null);
  const activeIndexRef = useRef(null);

  useEffect(() => {
    const steps = stepRefs.current.filter(Boolean);
    if (!steps.length) return;

    const defaultCaption = captionRef.current ? captionRef.current.textContent : '';

    function setCaption(text) {
      const el = captionRef.current;
      if (!el || el.textContent === text) return;
      if (captionTimerRef.current) window.clearTimeout(captionTimerRef.current);
      el.style.opacity = '0';
      captionTimerRef.current = window.setTimeout(() => {
        el.textContent = text;
        el.style.opacity = '1';
        captionTimerRef.current = null;
      }, 180);
    }

    function setImage(src) {
      const el = imageRef.current;
      if (!el || !src || el.getAttribute('src') === src) return;
      if (imageTimerRef.current) window.clearTimeout(imageTimerRef.current);
      el.style.opacity = '0';
      imageTimerRef.current = window.setTimeout(() => {
        el.setAttribute('src', src);
        el.style.opacity = '1';
        imageTimerRef.current = null;
      }, 180);
    }

    function activateStep(step, index) {
      if (activeIndexRef.current === index) return;
      activeIndexRef.current = index;
      steps.forEach((s) => s.classList.remove(styles.featured));
      step.classList.add(styles.featured);
      const data = FLOW_STEPS[index];
      setCaption((data && data.caption) || defaultCaption);
      if (data && data.image) setImage(data.image);
    }

    function updateFromScroll() {
      const center = window.innerHeight / 2;
      let closestIndex = null;
      let closestDist = Infinity;
      steps.forEach((step, i) => {
        const rect = step.getBoundingClientRect();
        const stepCenter = rect.top + rect.height / 2;
        const dist = Math.abs(stepCenter - center);
        if (dist < closestDist) {
          closestDist = dist;
          closestIndex = i;
        }
      });
      if (closestIndex !== null) activateStep(steps[closestIndex], closestIndex);
    }

    let ticking = false;
    function onScrollOrResize() {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        updateFromScroll();
        ticking = false;
      });
    }

    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize);

    updateFromScroll();

    return () => {
      window.removeEventListener('scroll', onScrollOrResize);
      window.removeEventListener('resize', onScrollOrResize);
      if (captionTimerRef.current) window.clearTimeout(captionTimerRef.current);
      if (imageTimerRef.current) window.clearTimeout(imageTimerRef.current);
    };
  }, []);

  function jumpToStep(index) {
    const step = stepRefs.current[index];
    if (step) step.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  function handleKeyDown(e, index) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      jumpToStep(index);
    }
  }

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.hero}>
          <div className={styles.heroCopy}>
            <span className={styles.eyebrow}>Electing Authors</span>
            <h2 className={styles.title}>The Network Chooses its Authors.</h2>
            <p className={styles.desc}>
              When any duty pallet needs authors, it triggers an election. The election
              plugin - configured here - processes candidates and returns the selected authors.
            </p>
          </div>
          <div className={styles.mascotWrap}>
            <div className={styles.mascot}>
              <img src={mascotImg} alt="Brand mascot, a raccoon in a blue hoodie" />
            </div>
          </div>
        </div>

        <div className={styles.flowSplit}>
          <div className={styles.flowMascotCol}>
            <div className={styles.flowMascotSticky}>
              <div className={styles.flowMascotPanel}>
                <img ref={imageRef} src={FLOW_STEPS[0].image} alt="" />
              </div>
              <p className={styles.flowMascotCaption} ref={captionRef}>
                {FLOW_STEPS[0].caption}
              </p>
            </div>
          </div>

          <div className={styles.flowStepsCard}>
            {FLOW_STEPS.map((step, i) => (
              <div
                key={step.title}
                ref={(el) => (stepRefs.current[i] = el)}
                className={styles.flowListStep}
                role="button"
                tabIndex={0}
                aria-label={`Jump to step ${i + 1}`}
                onClick={() => jumpToStep(i)}
                onKeyDown={(e) => handleKeyDown(e, i)}
              >
                <span className={styles.listNum}>{i + 1}</span>
                <div className={styles.listBody}>
                  <h4>
                    {step.title} {step.subtitle && <small>{step.subtitle}</small>}
                  </h4>
                  <p>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.callout}>
          <BulbIcon className={styles.calloutIcon} />
          <p className={styles.calloutText}>
            Elections are processed <b>when required</b> by any duty pallet. The election
            plugin is configured here.
          </p>
        </div>

        <div className={styles.divider}>
          <span className={styles.line}></span>
          <span>Lots of Election Models - Fully Pluggable &amp; Customizable</span>
          <span className={`${styles.line} ${styles.r}`}></span>
        </div>

        <div className={styles.modelGrid}>
          {MODELS.map((m) => (
            <div className={styles.modelCard} key={m.title}>
              <span className={styles.badge} style={{ '--c1': m.c1, '--c2': m.c2 }}>{m.icon}</span>
              <h4>{m.title}</h4>
              <p>{m.desc}</p>
            </div>
          ))}
          <div className={`${styles.modelCard} ${styles.capstone} ${styles.span2}`}>
            <span className={styles.badge}><PlusIcon /></span>
            <div>
              <h4>Your Model, Your Rules</h4>
              <p>Fully customizable for your governance and economics - and many more.</p>
            </div>
          </div>
        </div>

        <div className={styles.band}>
          {BAND_ITEMS.map((b) => (
            <div className={styles.bandItem} key={b.title}>
              <span className={styles.bandIcon}>{b.icon}</span>
              <h4 className={styles.bandTitle}>{b.title}</h4>
              <p className={styles.bandDesc}>{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}