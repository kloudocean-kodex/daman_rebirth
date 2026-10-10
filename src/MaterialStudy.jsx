import { useState } from 'react';

const tones = [
  { name: 'Oat', colour: '#d4c2a5', note: 'A warm, pale starting point. Pair gentle woven texture with timber and stone.' },
  { name: 'Mushroom', colour: '#a89a86', note: 'A quiet mid-tone. Think soft drape, matte finishes and layered neutrals.' },
  { name: 'Olive', colour: '#646449', note: 'An earthy accent. A deeper textile tone brings natural colour into a restrained room.' },
  { name: 'Espresso', colour: '#4c3c32', note: 'A grounded dark tone. Use it as a considered counterpoint to lighter walls and sheers.' },
  { name: 'Ink', colour: '#353c40', note: 'A cool, architectural contrast. Balance the depth with warm materials and natural light.' },
];

const folds = [
  { name: 'Curtain waves', type: 'wave', copy: 'S-fold headings create a continuous vertical wave. The heading and track guide the rhythm; fullness and fabric change the final drape.' },
  { name: 'Roller blinds', type: 'roller', copy: 'A roller blind is a flat fabric panel that rolls onto a tube. It does not gather into Roman folds or curtain pleats.' },
  { name: 'Roman folds', type: 'roman', copy: 'Roman blinds gather upwards into horizontal folds. Soft unbattened styles can scallop; structured styles form a more tailored stack.' },
];

function FoldMark({ type }) {
  return (
    <svg viewBox="0 0 76 80" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
      {type === 'wave' && <><path d="M8 8c6-8 12 8 18 0s12 8 18 0 12 8 18 0M14 8v63M26 8v63M38 8v63M50 8v63M62 8v63" /><path d="M8 71c6-8 12 8 18 0s12 8 18 0 12 8 18 0" /></>}
      {type === 'roller' && <><rect x="10" y="6" width="56" height="7" rx="3.5" /><path d="M13 13v56h50V13M12 69h52M68 12v46" /></>}
      {type === 'roman' && <><path d="M12 8h52v34H12ZM12 42q26 15 52 0M12 42v11q26 15 52 0V42M12 53v11q26 15 52 0V53" /><path d="M12 20h52" strokeOpacity=".25" /></>}
    </svg>
  );
}

export default function MaterialStudy() {
  const [selectedTone, setSelectedTone] = useState(tones[0]);

  return (
    <section className="material-study" id="materials" aria-labelledby="materials-title">
      <figure className="material-study__image">
        <img src="/assets/daman-textile-palette.webp" alt="Generated editorial study of flax-toned sheers, mushroom and olive woven curtain waves, with textile and bronze finish samples" width="1440" height="960" loading="lazy" decoding="async" />
        <figcaption>Original concept study · Not a product catalogue</figcaption>
      </figure>
      <div className="material-study__copy">
        <p className="eyebrow">Material notes</p>
        <h2 id="materials-title">Texture first.<br /><em>Colour, considered.</em></h2>
        <p>Quiet woven surfaces. Deeper earth tones. The smallest material decision can change the whole conversation of a room.</p>
        <div className="material-study__swatches" role="group" aria-label="Explore colour inspiration">
          {tones.map((tone) => <button type="button" key={tone.name} aria-pressed={selectedTone.name === tone.name} onClick={() => setSelectedTone(tone)}><span style={{ '--swatch-colour': tone.colour }} /><span>{tone.name}</span></button>)}
        </div>
        <p className="material-study__tone" aria-live="polite"><strong>{selectedTone.name}</strong> {selectedTone.note}</p>
        <details className="material-study__folds">
          <summary>The shape of a finish <span aria-hidden="true">+</span></summary>
          <div>{folds.map((fold) => <article key={fold.type}><FoldMark type={fold.type} /><div><h3>{fold.name}</h3><p>{fold.copy}</p></div></article>)}</div>
        </details>
        <p className="material-study__disclaimer">Design inspiration, not a confirmed Daman range. Ask about available fabrics, headings and blind styles. Always judge colour from a physical sample in your room.</p>
        <a className="material-study__link" href="#contact">Find the right finish for your home <span aria-hidden="true">↗</span></a>
      </div>
    </section>
  );
}
