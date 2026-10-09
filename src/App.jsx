import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, Sun, Droplets, PenTool, Phone, Mail, MapPin } from 'lucide-react';
import './index.css';

const collections = [
  {
    id: 1,
    title: 'Sheer Curtains',
    desc: 'Ethereal elegance that filters natural light while maintaining your privacy.',
    image: '/assets/hero.jpg', // Re-using hero or separate sheer image
  },
  {
    id: 2,
    title: 'Plantation Shutters',
    desc: 'Timeless architectural details in premium PVC and Basswood finishes.',
    image: '/assets/shutters.jpg',
  },
  {
    id: 3,
    title: 'Modern Blinds',
    desc: 'Sleek, minimalist control over your environment with motorized options.',
    image: '/assets/blinds.jpg',
  },
  {
    id: 4,
    title: 'Security Doors',
    desc: 'Uncompromising safety meets sophisticated modern entrance design.',
    image: '/assets/doors.jpg',
  }
];

function App() {
  const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  };

  return (
    <div className="app-wrapper">
      {/* HEADER */}
      <header className="header">
        <div className="container header-content">
          <div className="logo">DAMAN</div>
          <nav className="nav-links">
            <a href="#collections">Collections</a>
            <a href="#about">Philosophy</a>
            <a href="#contact">Contact</a>
          </nav>
          <button className="cta-button">Request Consultation</button>
        </div>
      </header>

      {/* HERO */}
      <section className="hero">
        <div className="container hero-grid">
          <motion.div 
            className="hero-text"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <h1>Elevate Your Living Space.</h1>
            <p>
              Discover uncompromising quality in window coverings and security solutions. 
              Designed for the modern Australian home, crafted with precision in Epping, Victoria.
            </p>
            <button className="cta-button">Explore Collections</button>
          </motion.div>
          <motion.div 
            className="hero-image-wrapper"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2 }}
          >
            <img src="/assets/hero.jpg" alt="Luxurious Living Room" className="hero-image" />
          </motion.div>
        </div>
      </section>

      {/* COLLECTIONS */}
      <section id="collections" className="collections section-padding">
        <div className="container">
          <motion.div className="section-header" {...fadeInUp}>
            <span className="section-subtitle">Our Expertise</span>
            <h2 className="section-title">The Curated Collection</h2>
          </motion.div>
          
          <div className="collection-grid">
            {collections.map((item, index) => (
              <motion.div 
                className="collection-card" 
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <img src={item.image} alt={item.title} className="collection-img" />
                <div className="collection-content">
                  <h3 className="collection-title">{item.title}</h3>
                  <p className="collection-desc">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT / PHILOSOPHY */}
      <section id="about" className="section-padding">
        <div className="container about">
          <motion.div className="about-text" {...fadeInUp}>
            <span className="section-subtitle">Our Philosophy</span>
            <h2 className="section-title">Uncompromising Craftsmanship</h2>
            <p>
              At Daman Group, we believe that the details define the space. For years, we have been 
              transforming Australian homes with premium window furnishings and security solutions that 
              balance aesthetic brilliance with functional perfection.
            </p>
            <p>
              Based in Epping, Victoria, our team works closely with homeowners and architects to 
              deliver tailored solutions that elevate every room they touch.
            </p>
            
            <div className="about-features">
              <div className="feature">
                <Sun className="feature-icon" size={28} />
                <div>
                  <h4>Light Control</h4>
                  <p>Master the natural light in your home.</p>
                </div>
              </div>
              <div className="feature">
                <Shield className="feature-icon" size={28} />
                <div>
                  <h4>Security</h4>
                  <p>Peace of mind without compromising style.</p>
                </div>
              </div>
              <div className="feature">
                <PenTool className="feature-icon" size={28} />
                <div>
                  <h4>Custom Design</h4>
                  <p>Tailored precisely to your specifications.</p>
                </div>
              </div>
              <div className="feature">
                <Droplets className="feature-icon" size={28} />
                <div>
                  <h4>Premium Materials</h4>
                  <p>Sourced for longevity and luxury.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="contact" className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <h3>DAMAN GROUP</h3>
              <p>Premium window furnishings and security solutions for the modern Australian home.</p>
            </div>
            <div className="footer-links">
              <h4>Contact Us</h4>
              <ul>
                <li><Phone size={16} style={{marginRight: '8px'}}/> 0433 300 390</li>
                <li><Mail size={16} style={{marginRight: '8px'}}/> info@damangroup.com.au</li>
                <li><MapPin size={16} style={{marginRight: '8px'}}/> Epping, Victoria, Australia</li>
              </ul>
            </div>
            <div className="footer-links">
              <h4>Connect</h4>
              <ul>
                <li><a href="#">Instagram</a></li>
                <li><a href="#">Facebook</a></li>
                <li><a href="#">LinkedIn</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} Daman Group Pty Ltd. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
