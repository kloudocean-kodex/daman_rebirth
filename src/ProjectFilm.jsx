import { useEffect, useRef, useState } from 'react';

export default function ProjectFilm({ name, label }) {
  const videoRef = useRef(null);
  const [started, setStarted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    const pauseWhenHidden = () => { if (document.hidden) video?.pause(); };
    document.addEventListener('visibilitychange', pauseWhenHidden);
    const observer = video ? new IntersectionObserver(([entry]) => { if (!entry.isIntersecting) video.pause(); }) : null;
    if (video) observer.observe(video);
    return () => {
      document.removeEventListener('visibilitychange', pauseWhenHidden);
      observer?.disconnect();
    };
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const video = videoRef.current;
    video.muted = true;
    video.volume = 0;
    video.play().catch(() => setPlaying(false));
  }, [started]);

  const play = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.volume = 0;
    video.play().catch(() => setPlaying(false));
  };

  const toggle = () => {
    if (!started) { setStarted(true); return; }
    if (playing) videoRef.current?.pause();
    else play();
  };

  return <figure className="project-film"><div className="project-film__frame"><img src={`/assets/projects/${name}-poster-v1.jpg`} alt={label} width="478" height="850" loading="lazy" />{started && !failed && <video ref={videoRef} src={`/assets/projects/${name}-silent-v1.mp4`} className={ready ? 'is-ready' : ''} muted playsInline preload="none" aria-label={label} onLoadedData={() => setReady(true)} onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onEnded={() => setPlaying(false)} onError={() => { setFailed(true); setPlaying(false); }} />}<button type="button" onClick={toggle} disabled={failed} aria-label={`${playing ? 'Pause' : 'Play'} ${label}`}><span aria-hidden="true">{playing ? 'Ⅱ' : '▷'}</span>{failed ? 'Film unavailable' : playing ? 'Pause film' : 'Play project film'}</button></div><figcaption>{label}<span>Original supplied footage · Silent</span></figcaption></figure>;
}
