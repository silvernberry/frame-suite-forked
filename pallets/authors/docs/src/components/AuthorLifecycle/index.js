import React, { useEffect, useRef } from 'react';
import styles from './styles.module.css';

const heroMascotImg = require('@site/static/img/title-mascots/tm-lifecycle.png').default;

const stageImg1 = require('@site/static/img/lifecycle/cm-lifecycle-1.png').default;
const stageImg2 = require('@site/static/img/lifecycle/cm-lifecycle-2.png').default;
const stageImg3 = require('@site/static/img/lifecycle/cm-lifecycle-3.png').default;
const stageImg4 = require('@site/static/img/lifecycle/cm-lifecycle-4.png').default;
const stageImg5 = require('@site/static/img/lifecycle/cm-lifecycle-5.png').default;
const stageImg6 = require('@site/static/img/lifecycle/cm-lifecycle-6.png').default;
const stageImg7 = require('@site/static/img/lifecycle/cm-lifecycle-7.png').default;

const ShieldIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 2l8 4v5c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-4z" />
    <path d="M9.5 12l2 2 3.5-4" />
  </svg>
);

const LoopIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 12a9 9 0 1 0 3-6.7M3 4v5h5" />
  </svg>
);

const FLOW_STEPS = [
  {
    title: 'Enroll', subtitle: null,
    desc: 'Author registers and locks collateral to join the network.',
    caption: "Registration and collateral - this is where every author's story begins.",
    image: stageImg1,
    c1: 'var(--pa-trust)', c2: 'var(--pa-trust-deep)',
  },
  {
    title: 'Probation', subtitle: null,
    desc: 'New authors start in probation - monitored before being trusted with permanence.',
    caption: "New authors are on my watch list until they've proven themselves.",
    image: stageImg2,
    c1: 'var(--amber)', c2: 'var(--amber-deep)',
  },
  {
    title: 'Eligible', subtitle: null,
    desc: 'Once probation elapses and no risk is outstanding, the author becomes eligible for permanence.',
    caption: "Probation cleared, no risk outstanding - you're in good standing now.",
    image: stageImg3,
    c1: 'var(--lifecycle)', c2: 'var(--lifecycle-deep)',
  },
  {
    title: 'Elected', subtitle: null,
    desc: 'Selected by the network through the pluggable election process.',
    caption: "The network picked you. I don't decide who wins - I just track it.",
    image: stageImg4,
    c1: 'var(--pa-trust)', c2: 'var(--pa-trust-deep)',
  },
  {
    title: 'Active Author', subtitle: null,
    desc: 'Promoted to permanent status - full role responsibilities and network access.',
    caption: "Full access, full responsibility. You're official now.",
    image: stageImg5,
    c1: 'var(--active)', c2: 'var(--active-deep)',
  },
  {
    title: 'Rewards / Penalties', subtitle: null,
    desc: 'Good behavior is rewarded. Misbehavior is penalized.',
    caption: "I keep score. Good work pays off - bad behavior doesn't.",
    image: stageImg6,
    c1: 'var(--penalty)', c2: 'var(--penalty-deep)',
    loopNote: 'Enough risk sends an Active author back to Probation (step 2)',
  },
  {
    title: 'Resign', subtitle: null,
    desc: 'Once idle and free of pending penalties. Collateral is released; pending rewards are unaffected.',
    caption: "Ready to go? I'll make sure everything's settled first.",
    image: stageImg7,
    c1: 'var(--slate-mid)', c2: 'var(--slate-deep)',
  },
];

export default function AuthorLifecycle() {
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
            <span className={styles.eyebrow}>Author Lifecycle</span>
            <h2 className={styles.title}>
              Every Author goes through a <span className={styles.accent}>Well-defined Journey.</span>
            </h2>
            <p className={styles.desc}>
              From enrollment to resignation, an author's status moves through a small, strict
              state machine - enforced on-chain at every step.
            </p>
          </div>
          <div className={styles.mascotWrap}>
            <div className={styles.mascot}>
              <img src={heroMascotImg} alt="Brand mascot, a raccoon in a blue hoodie" />
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
                style={{ '--c1': step.c1, '--c2': step.c2 }}
                onClick={() => jumpToStep(i)}
                onKeyDown={(e) => handleKeyDown(e, i)}
              >
                <span className={styles.listNum}>{i + 1}</span>
                <div className={styles.listBody}>
                  <h4>
                    {step.title} {step.subtitle && <small>{step.subtitle}</small>}
                  </h4>
                  <p>{step.desc}</p>
                  {step.loopNote && (
                    <span className={styles.loopNote}>
                      <LoopIcon />
                      {step.loopNote}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.callout}>
          <ShieldIcon className={styles.calloutIcon} />
          <p className={styles.calloutText}>
            Probation exists because locking collateral alone doesn't prove reliability.{' '}
            <b>Security starts before permanence.</b>
          </p>
        </div>
      </div>
    </section>
  );
}