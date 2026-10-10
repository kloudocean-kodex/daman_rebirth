import { useEffect, useRef, useState } from 'react';

const chapters = ['Sheer curtains', 'Blinds', 'Plantation shutters', 'Curtains', 'Security doors', 'Fly screens'];

export default function HeroVideo() {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const [motionAllowed, setMotionAllowed] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [inView, setInView] = useState(false);
  const [seenHero, setSeenHero] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const [wantsPlay, setWantsPlay] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [hasFrame, setHasFrame] = useState(false);
  const [failed, setFailed] = useState(false);
  const [chapter, setChapter] = useState(0);

  useEffect(() => {
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const mobilePreference = window.matchMedia('(max-width: 760px)');
    const connection = navigator.connection;
    const updatePreferences = () => {
      setMotionAllowed(!motionPreference.matches && !connection?.saveData);
      setMobile(mobilePreference.matches);
    };
    const updateVisibility = () => setPageVisible(!document.hidden);
    updatePreferences();
    updateVisibility();
    motionPreference.addEventListener('change', updatePreferences);
    mobilePreference.addEventListener('change', updatePreferences);
    connection?.addEventListener('change', updatePreferences);
    document.addEventListener('visibilitychange', updateVisibility);
    const observer = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting);
      if (entry.isIntersecting) setSeenHero(true);
    }, { threshold: 0 });
    observer.observe(containerRef.current);
    return () => {
      motionPreference.removeEventListener('change', updatePreferences);
      mobilePreference.removeEventListener('change', updatePreferences);
      connection?.removeEventListener('change', updatePreferences);
      document.removeEventListener('visibilitychange', updateVisibility);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (motionAllowed && inView && pageVisible && wantsPlay && !failed) {
      video.play().catch(() => setPlaying(false));
    } else {
      video.pause();
    }
  }, [motionAllowed, mobile, inView, pageVisible, wantsPlay, failed]);

  const togglePlayback = () => {
    if (playing) {
      setWantsPlay(false);
      videoRef.current?.pause();
    } else {
      setWantsPlay(true);
      videoRef.current?.play().catch(() => setPlaying(false));
    }
  };

  return (
    <>
      <div className="hero__media" ref={containerRef}>
        <picture>
          <source media="(max-width: 760px)" srcSet="/assets/daman-hero-mobile-poster.jpg" />
          <img className="hero__poster" src="/assets/daman-hero-desktop-poster.jpg" alt="Sunlit contemporary living room with sheer curtains; illustrative concept imagery" width="1600" height="900" fetchPriority="high" />
        </picture>
        {motionAllowed && seenHero && !failed && (
          <video
            key={mobile ? 'mobile' : 'desktop'}
            ref={videoRef}
            id="hero-film"
            className={`hero__video ${hasFrame ? 'hero__video--ready' : ''}`}
            src={`/assets/daman-hero-${mobile ? 'mobile' : 'desktop'}.mp4`}
            poster={`/assets/daman-hero-${mobile ? 'mobile' : 'desktop'}-poster.jpg`}
            muted
            playsInline
            loop
            preload="none"
            aria-hidden="true"
            tabIndex={-1}
            onLoadStart={() => setHasFrame(false)}
            onTimeUpdate={event => setChapter(event.currentTarget.currentTime >= 24.5 ? 0 : Math.min(5, Math.floor(Math.max(0, event.currentTarget.currentTime - 0.5) / 4)))}
            onPlaying={() => { setHasFrame(true); setPlaying(true); }}
            onPause={() => setPlaying(false)}
            onError={() => { setFailed(true); setPlaying(false); }}
          />
        )}
      </div>
      {motionAllowed && seenHero && !failed && (
        <p className="hero__film-caption" aria-hidden="true"><span>0{chapter + 1} / 06</span>{chapters[chapter]}</p>
      )}
      {motionAllowed && seenHero && !failed && (
        <button className="hero__motion-toggle" type="button" onClick={togglePlayback} aria-controls="hero-film" aria-label={playing ? 'Pause background video' : 'Play background video'}>
          <svg viewBox="0 0 20 20" aria-hidden="true">{playing ? <path d="M7 5v10M13 5v10" fill="none" stroke="currentColor" strokeWidth="1.5" /> : <path d="m7 4 9 6-9 6Z" fill="currentColor" />}</svg>
          <span>{playing ? 'Pause film' : 'Play film'}</span>
        </button>
      )}
    </>
  );
}
