import { useEffect, useRef, useState } from 'react';
import HeroVideo from './HeroVideo';
import LightStudy from './LightStudy';
import SheerColourStudio from './SheerColourStudio';
import ProjectImage from './ProjectImage';
import CollectionPage, { AboutPage } from './CollectionPages';
import MaterialStudy from './MaterialStudy';
import BrandIntro from './BrandIntro';
import BrandMark from './BrandMark';
import './index.css';
import './material-study.css';
import './brand-intro.css';
import './showreel.css';
import './refinements.css';
import './collections.css';

const services = [
  { number: '01', name: 'Sheer Curtains', copy: 'Full-height drape, continuous S-fold waves and light with a softer edge.', project: 'sheers-living', href: '/sheer-curtains/', className: 'service--wide' },
  { number: '02', name: 'Plantation Shutters', copy: 'Architectural control of light, line and atmosphere.', image: '/assets/daman-shutters.webp', className: 'service--portrait' },
  { number: '03', name: 'Blockout Blinds', copy: 'Considered fabric, coverage and privacy, tailored to the way you live.', project: 'blockout-room', href: '/blockout-blinds/', className: 'service--portrait' },
  { number: '04', name: 'Security Doors', copy: 'A composed first impression with everyday reassurance.', image: '/assets/daman-security.webp', className: 'service--wide' },
  { number: '05', name: 'Fly Screens', copy: 'Fresh air without interrupting the view.', image: '/assets/daman-flyscreen.webp', className: 'service--portrait' },
  { number: '06', name: 'Curtains', copy: 'Texture, privacy and a flowing finish, made for your space.', project: 'sheers-kitchen', className: 'service--wide' },
];
const atmospheres = [
  { id: 'light', label: 'Soft light', title: 'Let daylight stay gentle.', copy: 'Full-height sheer curtains soften the whole room, with a continuous wave from heading to hem.', project: 'sheers-panorama', alt: 'Full-height S-fold sheers around a real furnished living room, supplied by Daman' },
  { id: 'retreat', label: 'A quieter retreat', title: 'Make room for quiet.', copy: 'Blockout fabric and a considered fit bring stronger light control to your everyday spaces.', project: 'blockout-room', alt: 'Lowered blockout roller blinds in a supplied Daman room photograph' },
  { id: 'privacy', label: 'Private retreat', title: 'Set the room apart.', copy: 'Shutters bring an architectural rhythm to privacy and light control.', image: '/assets/daman-shutters.webp', alt: 'Plantation shutters in a sunlit contemporary room' },
  { id: 'air', label: 'Open air', title: 'Keep the threshold open.', copy: 'Screen solutions make space for a breeze without interrupting the view.', image: '/assets/daman-flyscreen.webp', alt: 'Fine mesh fly screen opening onto an Australian garden' },
];
const copyrightYear = 2026;

const Arrow = () => <svg viewBox="0 0 22 22" aria-hidden="true"><path d="M3 11h15M12 4l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="1.35" /></svg>;
const Mark = () => <svg viewBox="0 0 64 64" aria-hidden="true"><path d="M10 32h44M32 10v44" fill="none" stroke="currentColor" strokeWidth="1" /><circle cx="32" cy="32" r="13.5" fill="none" stroke="currentColor" strokeWidth="1" /></svg>;

function App({ path = '/' }) {
  const collectionPage = ['/sheer-curtains/', '/blockout-blinds/'].includes(path);
  const isAbout = path === '/about/';
  const isHome = !collectionPage && !isAbout;
  const homeAnchor = hash => isHome ? hash : `/${hash}`;
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileNavigation, setMobileNavigation] = useState(false);
  const menuButtonRef = useRef(null);
  const headerRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  const [activeAtmosphere, setActiveAtmosphere] = useState(atmospheres[0]);
  const [enquiryService, setEnquiryService] = useState(null);

  useEffect(() => {
    const updateHeader = () => setScrolled(window.scrollY > 32);
    const navigationPreference = window.matchMedia('(max-width: 1100px)');
    const updateNavigation = () => {
      setMobileNavigation(navigationPreference.matches);
      if (!navigationPreference.matches) setMenuOpen(false);
    };
    updateHeader();
    updateNavigation();
    window.addEventListener('scroll', updateHeader, { passive: true });
    navigationPreference.addEventListener('change', updateNavigation);
    return () => {
      window.removeEventListener('scroll', updateHeader);
      navigationPreference.removeEventListener('change', updateNavigation);
    };
  }, []);

  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    if (!menuOpen) return;
    const focusFrame = window.requestAnimationFrame(() => {
      const navigation = headerRef.current?.querySelector('nav');
      if (navigation) navigation.scrollTop = 0;
      navigation?.querySelector('a')?.focus({ preventScroll: true });
    });
    const dismissOutside = event => {
      if (!headerRef.current?.contains(event.target)) setMenuOpen(false);
    };
    const dismissForHistory = () => setMenuOpen(false);
    document.addEventListener('pointerdown', dismissOutside);
    window.addEventListener('hashchange', dismissForHistory);
    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.removeEventListener('pointerdown', dismissOutside);
      window.removeEventListener('hashchange', dismissForHistory);
    };
  }, [menuOpen]);

  const handleNavigation = event => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const anchor = event.target.closest('a[href^="#"]');
    if (!anchor) return;
    const destination = document.getElementById(anchor.getAttribute('href').slice(1));
    if (!destination) return;
    setMenuOpen(false);
    if (anchor.getAttribute('href') === '#contact') setEnquiryService(anchor.dataset.service || null);
    destination.focus({ preventScroll: true });
  };

  const enquiryEmail = `mailto:info@damangroup.com.au${enquiryService ? `?subject=${encodeURIComponent(`Enquiry about ${enquiryService} — Daman Group`)}` : ''}`;

  return (
    <div className="site-shell" onClick={handleNavigation}>
      <BrandIntro />
      <a className="skip-link" href="#top">Skip to content</a>
      <header ref={headerRef} className={`site-header ${scrolled ? 'site-header--scrolled' : ''}${!isHome ? ' site-header--interior' : ''}`} onBlur={event => { if (menuOpen && !event.currentTarget.contains(event.relatedTarget)) setMenuOpen(false); }} onKeyDown={(event) => { if (event.key === 'Escape' && menuOpen) { setMenuOpen(false); menuButtonRef.current?.focus(); } }}>
        <a className="wordmark wordmark--branded" href={isHome ? '#top' : '/'} aria-label="Daman Group home"><BrandMark className="wordmark__mark" /><div className="wordmark__type"><span>DAMAN</span><small>GROUP</small></div></a>
        <nav id="main-navigation" className={`desktop-nav ${menuOpen ? 'desktop-nav--open' : ''}`} aria-label="Main navigation" inert={mobileNavigation && !menuOpen ? true : undefined}>
          <a href="/sheer-curtains/" aria-current={path === '/sheer-curtains/' ? 'page' : undefined} onClick={closeMenu}>Sheers</a><a href="/blockout-blinds/" aria-current={path === '/blockout-blinds/' ? 'page' : undefined} onClick={closeMenu}>Blockout blinds</a><a href={homeAnchor('#collection')} onClick={closeMenu}>Collections</a><a href={homeAnchor('#transformation')} onClick={closeMenu}>Colour atelier</a><a href="/about/" aria-current={isAbout ? 'page' : undefined} onClick={closeMenu}>About Daman</a><a href="#contact" onClick={closeMenu}>Contact</a>
        </nav>
        <a className="header-cta" href="#contact" aria-label="Start a conversation"><span className="header-cta__full">Start a conversation</span><span className="header-cta__short" aria-hidden="true">Enquire</span><Arrow /></a>
        <button ref={menuButtonRef} className="menu-toggle" type="button" aria-label="Toggle navigation" aria-controls="main-navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}><i /><i /></button>
      </header>
      <main id="top" tabIndex={-1}>
        {isHome ? <>
        <section className="hero" aria-labelledby="hero-title"><HeroVideo /><div className="hero__veil" /><div className="hero__inner page-grid"><p className="eyebrow hero__eyebrow">Melbourne · Window furnishings & home detail</p><h1 id="hero-title">The feeling<br /><em>of home,</em><br />finished.</h1><div className="hero__bottom"><p>Made-to-measure window furnishings and considered home solutions for spaces with a point of view.</p><a className="round-link" href="#collection" aria-label="Explore the collection"><Arrow /></a></div></div><p className="hero__side-label">Daman Group Pty Ltd</p><a className="hero__scroll" href="#introduction">Scroll to explore <span /></a></section>
        <section className="introduction section page-grid" id="introduction" tabIndex={-1}><p className="eyebrow">A quieter kind of luxury</p><div className="introduction__statement"><p className="display-copy">A beautifully resolved room starts with how it meets the <em>light.</em></p><div className="introduction__detail"><Mark /><p>From the first measure to the final fitting, we make the practical feel considered.</p></div></div></section>
        <SheerColourStudio />
        <section className="edit" id="edit" tabIndex={-1} aria-labelledby="edit-title"><div className="edit__copy"><p className="eyebrow">The Daman edit</p><h2 id="edit-title">Choose the<br /><em>feeling first.</em></h2><p>Every window asks a different question. Start with the atmosphere you want the room to hold.</p><div className="edit__choices" role="group" aria-label="Choose a desired room atmosphere">{atmospheres.map((atmosphere) => <button type="button" aria-pressed={activeAtmosphere.id === atmosphere.id} aria-controls="atmosphere-scene" className={activeAtmosphere.id === atmosphere.id ? 'is-active' : ''} key={atmosphere.id} onClick={() => setActiveAtmosphere(atmosphere)}><span>{atmosphere.label}</span><i /></button>)}</div></div><div className="edit__scene" id="atmosphere-scene" aria-live="polite">{activeAtmosphere.project ? <ProjectImage key={activeAtmosphere.id} name={activeAtmosphere.project} alt={activeAtmosphere.alt} /> : <img key={activeAtmosphere.id} src={activeAtmosphere.image} alt={activeAtmosphere.alt} loading="lazy" decoding="async" />}<div className="edit__scene-copy"><span>{activeAtmosphere.label}</span><h3>{activeAtmosphere.title}</h3><p>{activeAtmosphere.copy}</p></div></div></section>
        <section className="collection section" id="collection" tabIndex={-1} aria-labelledby="collection-title"><div className="section-heading page-grid"><p className="eyebrow">The collection</p><div><h2 id="collection-title">Made for the<br /><em>way you live.</em></h2><p>Layered light. Lasting materials. Tailored details that bring calm, function and character to the everyday.</p></div></div><div className="service-grid">{services.map((service) => <article className={`service-card ${service.className}`} key={service.name}>{service.project ? <ProjectImage name={service.project} alt={`Supplied Daman project photograph — ${service.name}`} /> : <img src={service.image} alt={`Illustrative concept — ${service.name}`} loading="lazy" decoding="async" />}<div className="service-card__shade" /><div className="service-card__copy"><span>{service.number}</span><h3>{service.name}</h3><p>{service.copy}</p><a href={service.href || '#contact'} data-service={service.name} aria-label={service.href ? `Explore ${service.name}` : `Enquire about ${service.name}`}><Arrow /></a></div></article>)}</div></section>
        <LightStudy />
        <MaterialStudy />
        <section className="approach" id="approach" tabIndex={-1} aria-labelledby="approach-title"><div className="approach__image"><img src="/assets/daman-tailoring.webp" alt="Original concept study of fabric, shutter and screen details" loading="lazy" /></div><div className="approach__content"><p className="eyebrow">Our approach</p><h2 id="approach-title">Personal,<br /><em>by design.</em></h2><p className="approach__intro">The right finish does more than dress a window. It changes the way a space performs and feels, from the first light of day to the last.</p><ol><li><span>01</span><div><h3>Listen</h3><p>We begin with the room, your routine and the atmosphere you want to create.</p></div></li><li><span>02</span><div><h3>Specify</h3><p>We help translate that vision into materials and solutions that suit your home.</p></div></li><li><span>03</span><div><h3>Finish</h3><p>Careful installation brings every detail into focus.</p></div></li></ol></div></section>
        <section className="assurance section page-grid" aria-label="Daman Group values"><p className="eyebrow">The Daman standard</p><div className="assurance__grid"><div><span>01</span><h3>Tailored</h3><p>Every solution begins with your space, not a template.</p></div><div><span>02</span><h3>Considered</h3><p>A balance of visual calm, daily function and enduring materials.</p></div><div><span>03</span><h3>Local</h3><p>Personal consultation for homes across Melbourne and beyond.</p></div></div></section>
        </> : isAbout ? <AboutPage /> : <CollectionPage path={path} />}
        <section className="contact" id="contact" tabIndex={-1} aria-labelledby="contact-title"><div className="contact__texture" /><div className="contact__inner page-grid"><p className="eyebrow" aria-live="polite">{enquiryService ? `Let’s talk about ${enquiryService}` : 'Begin with a conversation'}</p><div className="contact__main"><h2 id="contact-title">Let’s make<br />space for <em>beautiful.</em></h2><a className="contact__button" href="tel:+61433300390"><span>0433 300 390</span><Arrow /></a></div><div className="contact__details"><a href={enquiryEmail}>info@damangroup.com.au</a><a className="contact__address" href="https://www.google.com/maps/search/?api=1&query=134+Gateway+Boulevard+Epping+Victoria+Australia" target="_blank" rel="noopener noreferrer">134 Gateway Boulevard<br />Epping, Victoria, Australia <span aria-hidden="true">↗</span></a></div></div></section>
      </main>
      <footer className="footer footer--expanded"><div className="footer__identity"><a className="wordmark wordmark--footer wordmark--branded" href={isHome ? '#top' : '/'} aria-label="Daman Group home"><BrandMark className="wordmark__mark" /><div className="wordmark__type"><span>DAMAN</span><small>GROUP</small></div></a><p>Considered light.<br />Beautifully finished.</p></div><div className="footer__links"><a href="/sheer-curtains/">Sheer curtains</a><a href="/blockout-blinds/">Blockout blinds</a><a href={homeAnchor('#collection')}>All collections</a><a href="/about/">About Daman</a></div><div className="footer__contact"><a className="footer__phone" href="tel:+61433300390">0433 300 390</a><a href={enquiryEmail}>info@damangroup.com.au</a><a href="https://www.google.com/maps/search/?api=1&query=134+Gateway+Boulevard+Epping+Victoria+Australia" target="_blank" rel="noopener noreferrer">134 Gateway Boulevard<br />Epping, Victoria, Australia <span aria-hidden="true">↗</span></a></div><div className="footer__legal"><p>© {copyrightYear} Daman Group Pty Ltd. · ABN 84 634 126 015</p><p>Project photography supplied by Daman. Illustrative films and design studies are labelled.</p></div></footer>
    </div>
  );
}

export default App;
