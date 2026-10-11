import { useEffect, useRef, useState } from 'react';

export default function HeroVideo() {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const [motionAllowed, setMotionAllowed] = useState(false);
  const [inView, setInView] = useState(false);
  const [seenHero, setSeenHero] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const [wantsPlay, setWantsPlay] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [hasFrame, setHasFrame] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const connection = navigator.connection;
    const updatePreferences = () => {
      setMotionAllowed(!motionPreference.matches && !connection?.saveData && !['slow-2g', '2g', '3g'].includes(connection?.effectiveType));
    };
    const updateVisibility = () => setPageVisible(!document.hidden);
    updatePreferences();
    updateVisibility();
    motionPreference.addEventListener('change', updatePreferences);
    connection?.addEventListener('change', updatePreferences);
    document.addEventListener('visibilitychange', updateVisibility);
    const observer = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting);
      if (entry.isIntersecting) setSeenHero(true);
    }, { threshold: 0 });
    observer.observe(containerRef.current);
    return () => {
      motionPreference.removeEventListener('change', updatePreferences);
      connection?.removeEventListener('change', updatePreferences);
      document.removeEventListener('visibilitychange', updateVisibility);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.defaultMuted = true;
    video.volume = 0;
    if (motionAllowed && inView && pageVisible && wantsPlay && !failed) {
      video.play().catch(() => setPlaying(false));
    } else {
      video.pause();
    }
  }, [motionAllowed, seenHero, inView, pageVisible, wantsPlay, failed]);

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
        <img className="hero__poster" src="/assets/daman-showreel-poster.jpg" alt="Sunlit contemporary living room with sheer curtains; illustrative concept imagery" width="1280" height="720" fetchPriority="high" decoding="async" />
        {motionAllowed && seenHero && !failed && (
          <video
            ref={videoRef}
            id="hero-film"
            className={`hero__video ${hasFrame ? 'hero__video--ready' : ''}`}
            src={import.meta.env.DEV ? '/assets/daman-showreel-web.mp4' : '/media/showreel-20261011'}
            poster="/assets/daman-showreel-poster.jpg"
            muted
            playsInline
            loop
            preload="none"
            aria-hidden="true"
            tabIndex={-1}
            onLoadStart={() => setHasFrame(false)}
            onPlaying={() => { setHasFrame(true); setPlaying(true); }}
            onPause={() => setPlaying(false)}
            onVolumeChange={event => { if (!event.currentTarget.muted) event.currentTarget.muted = true; if (event.currentTarget.volume !== 0) event.currentTarget.volume = 0; }}
            onError={() => { setFailed(true); setPlaying(false); }}
          />
        )}
      </div>
      {motionAllowed && seenHero && !failed && (
        <p className="hero__film-caption" aria-hidden="true"><span>The Daman film</span>Six considered details</p>
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
