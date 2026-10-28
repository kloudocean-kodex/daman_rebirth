import BrandMark from './BrandMark';
import ProjectImage from './ProjectImage';
import ProjectFilm from './ProjectFilm';
import SheerColourStudio from './SheerColourStudio';

const collections = {
  '/sheer-curtains/': {
    eyebrow: 'The sheer collection', title: <>Light, softened.<br /><em>Every fold, considered.</em></>,
    description: 'Full-height sheers. An even S-fold rhythm. A softer way to live with the light.',
    image: 'sheers-living', alt: 'White full-height sheer curtains framing a furnished living room in supplied Daman project photography',
    service: 'Sheer Curtains', intro: <>A continuous wave.<br /><em>A room at ease.</em></>,
    introCopy: 'The beauty of S-fold is in its rhythm: a sequence of smooth waves, held by the heading and track, flowing from ceiling to hem. These photographs show the real fabric, real fullness and real room.',
    features: [
      ['The heading', 'Evenly spaced carriers and a compatible track guide the wave. Fabric weight and fullness shape the final drape.'],
      ['The full drop', 'A high track and a considered floor clearance give the curtain a clean, uninterrupted line.'],
      ['The second layer', 'Pair a sheer with a blockout blind or curtain when you need stronger light control and evening privacy.'],
    ],
    gallery: [['sfold-detail', 'The wave, close up', 'Even S-fold waves from heading to hem in a real supplied curtain photograph'], ['sheers-panorama', 'A complete living space', 'Full-height sheers wrapping a furnished living and dining room'], ['sheers-bedroom-warm', 'A softer bedroom', 'Full-height sheers in a warm bedroom with wall lights']],
    film: 'sheers-project', filmLabel: 'S-fold sheers, in the room',
    notes: [['Are sheers private at night?', 'Privacy depends on the weave and the light on either side. Sheers alone generally do not provide night-time privacy when the room is lit; discuss a separate blockout layer.'], ['How do I choose the colour?', 'View fabric samples in your room, during the day and with your evening lighting. Our colour preview is a starting point for the conversation.'], ['Can the curtain follow a corner?', 'A shaped or joined track can be specified for some spaces. We assess the corner, fixing points, curtain stack and available track options at the measure.']],
    related: '/blockout-blinds/', relatedName: 'Explore blockout blinds',
  },
  '/blockout-blinds/': {
    eyebrow: 'The blockout collection', title: <>A quieter room.<br /><em>On your terms.</em></>,
    description: 'A clean flat panel. A considered fit. Blockout blinds for bedrooms, living spaces and everyday privacy.',
    image: 'blockout-room', alt: 'Supplied Daman photograph of lowered blockout roller blinds in a timber-floored room',
    service: 'Blockout Blinds', intro: <>Shade with purpose.<br /><em>Finish with care.</em></>,
    introCopy: 'A blockout fabric reduces light passing through the panel. The finished result also depends on where the blind sits, its coverage, and the gaps around the window. We begin with the room and how you want to use it.',
    features: [
      ['The fabric', 'An opaque blockout layer for stronger light control and privacy, with colour and texture selected from physical samples.'],
      ['The fit', 'Recess or face fitting changes the coverage. Ask about overlap and edge gaps before choosing the finished specification.'],
      ['The pairing', 'A blockout roller behind a sheer gives you two distinct layers: diffused daylight and a more private retreat.'],
    ],
    gallery: [['blockout-bedroom', 'A simple bedroom finish', 'A lowered neutral blockout roller blind in supplied room photography'], ['blockout-office', 'Control across a wider window', 'Three lowered grey roller blinds across an office window'], ['roller-layering', 'Two layers of light', 'Light-filtering roller blinds facing an internal courtyard']],
    film: 'blockout-project', filmLabel: 'Roller blinds, in the room',
    notes: [['Does blockout mean a completely dark room?', 'Blockout describes the fabric, not a guarantee of zero light in the room. Light may enter around the sides, top and bottom. Discuss fitting, coverage and any additional light-management details.'], ['Can I combine blinds and sheers?', 'Yes, a separate sheer and blockout blind can give you independent control. The available depth, track position and access to controls need to be assessed together.'], ['What happens at the measure?', 'We discuss the room, privacy and light needs, show available samples and review fitting options. The final specification is confirmed for your windows.']],
    related: '/sheer-curtains/', relatedName: 'Explore sheer curtains',
  },
};

function Steps() {
  return <section className="project-steps section"><p className="eyebrow">From an idea to your room</p><div>{[['01', 'Consider', 'Tell us about your room, your light and the way you live.'], ['02', 'Select', 'Explore physical fabrics, colours, tracks and fitting details.'], ['03', 'Resolve', 'Confirm the measure and specification, then bring the finish together.']].map(([number, title, copy]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{copy}</p></article>)}</div></section>;
}

export default function CollectionPage({ path }) {
  const page = collections[path];
  return <>
    <section className="collection-hero" aria-labelledby="collection-page-title"><div className="collection-hero__copy"><nav className="breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span><span>{page.service}</span></nav><p className="eyebrow">{page.eyebrow}</p><h1 id="collection-page-title">{page.title}</h1><p className="collection-hero__description">{page.description}</p><a href="#contact" data-service={page.service} className="editorial-link">Plan your {page.service.toLowerCase()} <span aria-hidden="true">↗</span></a><span className="collection-hero__signature">Daman Group · Melbourne</span></div><figure><ProjectImage name={page.image} priority alt={page.alt} sizes="(max-width: 900px) 100vw, 57vw" /><figcaption>From the Daman project collection</figcaption></figure></section>
    <section className="collection-intro section"><div><p className="eyebrow">Beauty in the detail</p><h2>{page.intro}</h2><p>{page.introCopy}</p></div><div className="collection-features">{page.features.map(([title, copy], index) => <article key={title}><span>0{index + 1}</span><div><h3>{title}</h3><p>{copy}</p></div></article>)}</div></section>
    <section className="project-gallery section" aria-labelledby="project-gallery-title"><div className="project-gallery__heading"><p className="eyebrow">Real rooms. Considered finishes.</p><h2 id="project-gallery-title">The details<br /><em>make the difference.</em></h2></div><div className="project-gallery__grid">{page.gallery.map(([name, title, alt]) => <figure key={name}><ProjectImage name={name} alt={alt} sizes="(max-width: 760px) 100vw, 33vw" /><figcaption>{title}</figcaption></figure>)}</div></section>
    <section className="project-motion section"><div><p className="eyebrow">A closer look</p><h2>A real room.<br /><em>In its own light.</em></h2><p>See the installation from another angle. Original project footage, presented in its natural portrait frame.</p><a className="editorial-link" href="#contact" data-service={page.service}>Talk about your space <span aria-hidden="true">↗</span></a></div><ProjectFilm name={page.film} label={page.filmLabel} /></section>
    {path === '/sheer-curtains/' && <SheerColourStudio compact />}
    <section className="collection-questions section"><div><p className="eyebrow">Before you choose</p><h2>A little clarity.<br /><em>A better finish.</em></h2></div><div>{page.notes.map(([question, answer]) => <article key={question}><h3>{question}</h3><p>{answer}</p></article>)}</div></section>
    <Steps /><div className="collection-related"><a href={page.related}>{page.relatedName}<span aria-hidden="true">↗</span></a></div>
  </>;
}

export function AboutPage() {
  return <>
    <section className="collection-hero about-hero" aria-labelledby="about-page-title"><div className="collection-hero__copy"><nav className="breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span><span>About Daman</span></nav><p className="eyebrow">Daman Group · Epping, Melbourne</p><h1 id="about-page-title">A home, resolved.<br /><em>A personal approach.</em></h1><p className="collection-hero__description">Window furnishings and home details, considered around the people who live with them.</p><a className="editorial-link" href="#contact">Meet your next finish <span aria-hidden="true">↗</span></a></div><figure><ProjectImage name="sheers-panorama" priority sizes="(max-width: 900px) 100vw, 57vw" alt="Supplied project photograph of sheers surrounding a furnished living and dining room" /><figcaption>From the Daman project collection</figcaption></figure></section>
    <section className="about-story section"><BrandMark className="about-story__mark" /><div><p className="eyebrow">The Daman point of view</p><h2>Practical by nature.<br /><em>Beautiful by consideration.</em></h2><p>Based in Epping, Daman Group helps Melbourne homes bring light, privacy and the final layer into balance. Our work spans sheer curtains, curtains, blinds, plantation shutters, security doors and fly screens.</p><p>We begin with a conversation about the room. We consider the fabric, the heading, the measure and the way each detail meets the space. The aim is simple: a finish that feels right, every day.</p><a href="/#collection" className="editorial-link">Discover the collections <span aria-hidden="true">↗</span></a></div></section>
    <Steps /><section className="about-visit section"><div><p className="eyebrow">Begin locally</p><h2>Let’s talk<br /><em>about your room.</em></h2></div><div><p>134 Gateway Boulevard<br />Epping, Victoria</p><p>Call ahead to arrange a conversation about your project.</p><a className="editorial-link" href="tel:+61433300390">0433 300 390 <span aria-hidden="true">↗</span></a></div></section>
  </>;
}
