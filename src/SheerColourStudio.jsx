import { useState } from 'react';
import ProjectImage from './ProjectImage';
import { sheerColours as colours, sheerCurtainMask } from './sheer-colours';

export default function SheerColourStudio({ compact = false }) {
  const [selected, setSelected] = useState(colours[0]);
  return (
    <section className={`sheer-studio section${compact ? ' sheer-studio--compact' : ''}`} id="transformation" tabIndex={-1} aria-labelledby="reveal-title">
      <div className="section-heading page-grid"><p className="eyebrow">The colour atelier</p><div><h2 id="reveal-title">Same room.<br /><em>A different feeling.</em></h2><p>Eight considered directions. Explore colour on a real curtain installation, with the original S-fold rhythm preserved.</p></div></div>
      <div className="sheer-studio__layout">
        <figure className="sheer-studio__figure">
          <div className="sheer-studio__scene" id="sheer-colour-preview" data-colour={selected.name}>
            <ProjectImage name="sheers-full-height" sizes="(max-width: 900px) 100vw, 70vw" alt={`${selected.name} colour preview on full-height S-fold sheers in a real supplied Daman room photograph`} />
            <svg className="sheer-studio__tint" viewBox="0 0 1600 1200" aria-hidden="true"><path d={sheerCurtainMask} fill={selected.fill} fillOpacity={selected.opacity} /></svg>
            <span className="sheer-studio__badge">Real room · Colour preview</span>
          </div>
          <figcaption>Colour is digitally simulated on the supplied photograph. Fabric, transparency and colour vary in person; choose from physical samples.</figcaption>
        </figure>
        <div className="sheer-studio__palette">
          <p className="eyebrow">A palette for your space</p><h3>Find your<br /><em>quiet signature.</em></h3>
          <div className="sheer-studio__swatches" role="group" aria-label="Preview sheer curtain colours">{colours.map(colour => <button type="button" key={colour.name} aria-pressed={selected.name === colour.name} aria-controls="sheer-colour-preview sheer-colour-note" onClick={() => setSelected(colour)}><span style={{ background: colour.fill }} /><span>{colour.name}</span></button>)}</div>
          <p className="sheer-studio__selection" id="sheer-colour-note" aria-live="polite"><strong>{selected.name}</strong>{selected.note}</p>
          <a className="editorial-link" href="#contact" data-service={`Sheer Curtains — ${selected.name}`}>Discuss this direction <span aria-hidden="true">↗</span></a>
        </div>
      </div>
    </section>
  );
}
