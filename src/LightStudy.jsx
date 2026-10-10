import { useState } from 'react';

export default function LightStudy() {
  const [daylight, setDaylight] = useState(64);
  return (
    <section className="light-study" aria-labelledby="light-study-title">
      <div className="light-study__scene" style={{ '--shade-opacity': (100 - daylight) / 145, '--light-opacity': daylight / 220, '--light-angle': `${-22 + daylight / 7}deg` }}>
        <img src="/assets/daman-blinds.webp" alt="An illustrative linen blind filtering sunlight in a contemporary living room" loading="lazy" />
        <div className="light-study__shade" /><div className="light-study__rays" />
        <span className="light-study__scene-label">A study in light · Illustrative mood, not product performance</span>
      </div>
      <div className="light-study__copy">
        <p className="eyebrow">Light, on your terms</p>
        <h2 id="light-study-title">Let the light<br /><em>take direction.</em></h2>
        <p>The same room. A different mood. Explore the feeling of filtered daylight, then talk to us about the right blind, curtain or shutter for your space.</p>
        <div className="light-study__control">
          <label htmlFor="daylight">Find your balance <span>{daylight}% daylight mood</span></label>
          <input id="daylight" type="range" min="0" max="100" value={daylight} aria-valuetext={`${daylight} percent daylight mood; illustrative only`} onChange={event => setDaylight(Number(event.target.value))} />
          <div className="light-study__range-labels"><span>A quiet retreat</span><span>Open to the day</span></div>
        </div>
        <a className="light-study__link" href="#contact">Find the right finish <span aria-hidden="true">↗</span></a>
      </div>
    </section>
  );
}
