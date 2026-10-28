import { useEffect, useState } from 'react';
import BrandMark from './BrandMark';

const sessionKey = 'daman-brand-intro-v1';

function shouldShowIntro() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
  try {
    return !sessionStorage.getItem(sessionKey);
  } catch {
    return true;
  }
}

export default function BrandIntro() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setVisible(shouldShowIntro()));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const dismiss = () => setVisible(false);
    const dismissOnKey = event => {
      if (event.key === 'Escape' || event.key === 'Tab') dismiss();
    };
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const dismissForMotion = () => { if (motionPreference.matches) dismiss(); };
    const timeout = window.setTimeout(dismiss, 1400);
    const poster = document.querySelector('.hero__poster');
    let active = true;
    Promise.allSettled([
      poster?.decode?.() ?? Promise.resolve(),
      document.fonts?.ready ?? Promise.resolve(),
    ]).then(() => { if (active) dismiss(); });
    try { sessionStorage.setItem(sessionKey, 'seen'); } catch {}
    window.addEventListener('keydown', dismissOnKey);
    window.addEventListener('pointerdown', dismiss, { once: true });
    motionPreference.addEventListener('change', dismissForMotion);
    return () => {
      active = false;
      window.clearTimeout(timeout);
      window.removeEventListener('keydown', dismissOnKey);
      window.removeEventListener('pointerdown', dismiss);
      motionPreference.removeEventListener('change', dismissForMotion);
    };
  }, [visible]);

  return (
    <div className={`brand-intro ${visible ? '' : 'brand-intro--dismissed'}`} aria-hidden={!visible}>
      <div className="brand-intro__identity">
        <BrandMark className="brand-intro__mark" />
        <p className="brand-intro__name">DAMAN<span>GROUP</span></p>
        <span className="brand-intro__rule" />
        <p className="brand-intro__note" role="status">A considered welcome.</p>
      </div>
    </div>
  );
}
