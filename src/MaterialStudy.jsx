import { useEffect, useRef, useState } from 'react';

const tones = [
  { id: 'oat', name: 'Oat', colour: '#d4c2a5', note: 'A warm, pale starting point. Pair gentle woven texture with timber and stone.' },
  { id: 'mushroom', name: 'Mushroom', colour: '#a89a86', note: 'A quiet mid-tone. Think soft drape, matte finishes and layered neutrals.' },
  { id: 'olive', name: 'Olive', colour: '#646449', note: 'An earthy accent. A deeper textile tone brings natural colour into a restrained room.' },
  { id: 'espresso', name: 'Espresso', colour: '#4c3c32', note: 'A grounded dark tone. Use it as a considered counterpoint to lighter walls and sheers.' },
  { id: 'ink', name: 'Ink', colour: '#353c40', note: 'A cool, architectural contrast. Balance the depth with warm materials and natural light.' },
];

const imageSizes = '(max-width: 760px) 100vw, 52vw';
const imageSource = (tone, width = 1536) => `/assets/daman-tone-${tone.id}-v1-${width}.webp`;
const imageSources = (tone) => [480, 960, 1536].map((width) => `${imageSource(tone, width)} ${width}w`).join(', ');

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
  const [frame, setFrame] = useState({ tone: tones[0], previous: null });
  const [isPreparing, setIsPreparing] = useState(false);
  const [previewFailed, setPreviewFailed] = useState(false);
  const requestRef = useRef(0);

  useEffect(() => () => { requestRef.current += 1; }, []);

  async function selectTone(tone) {
    const request = ++requestRef.current;
    setSelectedTone(tone);
    setPreviewFailed(false);

    if (tone.id === frame.tone.id) {
      setIsPreparing(false);
      return;
    }

    setIsPreparing(true);
    const nextImage = new Image();
    nextImage.sizes = imageSizes;
    nextImage.srcset = imageSources(tone);
    nextImage.src = imageSource(tone);

    try {
      await nextImage.decode();
      if (request !== requestRef.current) return;
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      setFrame((current) => ({ tone, previous: reducedMotion ? null : current.tone }));
    } catch {
      if (request !== requestRef.current) return;
      setPreviewFailed(true);
    }

    setIsPreparing(false);
  }

  return (
    <section className="material-study" id="materials" aria-labelledby="materials-title">
      <figure className="material-study__image" id="material-preview" aria-busy={isPreparing} data-tone={frame.tone.id} data-requested-tone={selectedTone.id}>
        {frame.previous && <img className="material-study__previous" src={imageSource(frame.previous)} srcSet={imageSources(frame.previous)} sizes={imageSizes} alt="" aria-hidden="true" width="1536" height="1024" decoding="async" />}
        <img key={frame.tone.id} className={frame.previous ? 'material-study__current material-study__current--reveal' : 'material-study__current'} src={imageSource(frame.tone)} srcSet={imageSources(frame.tone)} sizes={imageSizes} alt={`AI-generated ${frame.tone.name.toLowerCase()} woven curtains with continuous vertical S-fold waves, a flax sheer and stone and bronze details`} width="1536" height="1024" loading="lazy" decoding="async" onAnimationEnd={() => setFrame((current) => current.tone.id === frame.tone.id ? { ...current, previous: null } : current)} />
        <figcaption><strong>{frame.tone.name} · A textile study</strong><span role="status">{isPreparing ? `Preparing ${selectedTone.name} preview…` : previewFailed ? `Preview unavailable · Showing ${frame.tone.name}. Select a tone to retry.` : 'Original concept · Not a product catalogue'}</span></figcaption>
      </figure>
      <div className="material-study__intro">
        <p className="eyebrow">Material notes</p>
        <h2 id="materials-title">Texture first.<br /><em>Colour, considered.</em></h2>
        <p>Quiet woven surfaces. Deeper earth tones. The smallest material decision can change the whole conversation of a room.</p>
      </div>
      <div className="material-study__choices">
        <p className="material-study__hint" id="tone-help">Select a tone. Discover its mood.</p>
        <div className="material-study__swatches" role="group" aria-label="Explore colour inspiration" aria-describedby="tone-help">
          {tones.map((tone) => <button type="button" key={tone.name} aria-pressed={selectedTone.name === tone.name} aria-controls="material-preview material-preview-note" onClick={() => selectTone(tone)}><span style={{ '--swatch-colour': tone.colour }} /><span>{tone.name}</span></button>)}
        </div>
        <p className="material-study__tone" id="material-preview-note" aria-live="polite"><strong>{selectedTone.name}</strong> {selectedTone.note}</p>
        <div className="material-study__folds">
          <div className="material-study__fold-header"><h3>The shape of a finish</h3><p>Curtain waves · Blind forms</p></div>
          <div className="material-study__fold-content">{folds.map((fold) => <article key={fold.type}><FoldMark type={fold.type} /><div><h4>{fold.name}</h4><p>{fold.copy}</p></div></article>)}</div>
        </div>
        <p className="material-study__disclaimer">Design inspiration, not a confirmed Daman range. Ask about available fabrics, headings and blind styles. Always judge colour from a physical sample in your room.</p>
        <a className="material-study__link" href="#contact">Find the right finish for your home <span aria-hidden="true">↗</span></a>
      </div>
    </section>
  );
}
