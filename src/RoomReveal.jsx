import { useState } from 'react';

export default function RoomReveal() {
  const [split, setSplit] = useState(48);
  return (
    <section className="room-reveal section" id="transformation" aria-labelledby="reveal-title">
      <div className="section-heading page-grid">
        <p className="eyebrow">The power of the final layer</p>
        <div><h2 id="reveal-title">Same room.<br /><em>A different feeling.</em></h2><p>Slide between a bare window and a considered finish. See how one layer changes the room’s visual atmosphere.</p></div>
      </div>
      <figure className="room-reveal__figure">
        <div className="room-reveal__stage" style={{ '--split': `${split}%` }}>
          <img src="/assets/daman-room-after.webp" alt="Generated concept: the room with layered sheer and opaque curtains" width="1672" height="941" loading="lazy" />
          <img className="room-reveal__before" src="/assets/daman-room-before.webp" alt="Generated concept: the matching room with a bare window" width="1672" height="941" loading="lazy" />
          <span className={`room-reveal__label room-reveal__label--before${split === 0 ? ' room-reveal__label--inactive' : ''}`} aria-hidden="true">Before · The bare window</span>
          <span className={`room-reveal__label room-reveal__label--after${split === 100 ? ' room-reveal__label--inactive' : ''}`} aria-hidden="true">After · The considered finish</span>
          <span className="room-reveal__divider" aria-hidden="true"><span>‹ ›</span></span>
          <input className="room-reveal__slider" type="range" min="0" max="100" value={split} aria-label="Compare bare and furnished window concepts" aria-valuetext={`${split} percent bare window and ${100 - split} percent furnished window visible`} aria-describedby="reveal-note" onChange={event => setSplit(Number(event.target.value))} />
        </div>
        <figcaption id="reveal-note"><span>Drag to reveal · Or use arrow keys</span><span>AI-generated concept visualisation — not a Daman client project or a performance test.</span></figcaption>
      </figure>
      <div className="room-reveal__actions"><button type="button" aria-pressed={split === 100} onClick={() => setSplit(100)}>See the bare window</button><button type="button" aria-pressed={split === 0} onClick={() => setSplit(0)}>See the finished room</button></div>
    </section>
  );
}
