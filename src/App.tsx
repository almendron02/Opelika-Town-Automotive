import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight, ArrowUpRight, BatteryCharging, CarFront, Check, Clock3, Fan, Gauge, MapPin, Menu, Phone, Settings, ShieldCheck, Star, Wrench, X, Zap } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";

const PHONE = "tel:+13347376636";
const DIRECTIONS = "https://www.google.com/maps/dir/?api=1&destination=Opelika+Town+Automotive+3403+Pepperell+Pkwy+Opelika+AL+36801";
const REVIEWS = "https://www.google.com/maps/place/Opelika+Town+Automotive/";

const services: { name: string; detail: string; icon: ReactNode }[] = [
  { name: "Engine diagnostics", detail: "Find the cause before replacing parts.", icon: <Gauge /> },
  { name: "General repair", detail: "Practical repairs for everyday vehicles.", icon: <Wrench /> },
  { name: "Brakes & safety", detail: "Inspection, service, and repair.", icon: <ShieldCheck /> },
  { name: "A/C service", detail: "Diagnosis and repair for Alabama heat.", icon: <Fan /> },
  { name: "Electrical", detail: "Starting, charging, and electrical faults.", icon: <Zap /> },
  { name: "Battery service", detail: "Testing and replacement when needed.", icon: <BatteryCharging /> },
  { name: "Steering & suspension", detail: "Restore control, comfort, and stability.", icon: <CarFront /> },
  { name: "Transmission repair", detail: "Diagnosis and mechanical service.", icon: <Settings /> },
];

const reviews = [
  { name: "Abraham White", quote: "From the very first phone call, Jack changed that. He made the whole process feel lighter. No pressure, no games — just straightforward help.", service: "A/C service" },
  { name: "Chris Nam", quote: "If I didn’t live 2 hours away I’d take all of my cars to them. They’re quick and the work is top tier.", service: "Truck repair" },
  { name: "Brian Uzomba", quote: "They were very helpful and polite and were able to get my vehicle evaluated and fixed the same day. The prices were fair.", service: "General repair" },
];

function Stars({ label = "5 out of 5 stars" }: { label?: string }) {
  return <span className="stars" role="img" aria-label={label}>{Array.from({ length: 5 }, (_, i) => <Star key={i} aria-hidden="true" />)}</span>;
}

function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => { const fn = () => setScrolled(scrollY > 24); fn(); addEventListener("scroll", fn, { passive: true }); return () => removeEventListener("scroll", fn); }, []);
  useEffect(() => { const fn = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false); addEventListener("keydown", fn); return () => removeEventListener("keydown", fn); }, []);
  const links = [["Services", "#services"], ["Reviews", "#reviews"], ["Shop info", "#visit"]];
  return <>
    <nav className={`site-nav ${scrolled || open ? "is-solid" : ""}`} aria-label="Main navigation">
      <a className="brand" href="#home"><span className="brand-mark">OTA</span><span>Opelika Town<br />Automotive</span></a>
      <div className="desktop-nav">{links.map(([label, href]) => <a key={href} href={href}>{label}</a>)}<a className="nav-call" href={PHONE}><Phone /> Call the shop</a></div>
      <button className="menu-button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? "Close menu" : "Open menu"}>{open ? <X /> : <Menu />}</button>
    </nav>
    <AnimatePresence>{open && <motion.div id="mobile-menu" className="mobile-menu" initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
      {links.map(([label, href], i) => <a key={href} href={href} onClick={() => setOpen(false)}><span>0{i + 1}</span>{label}</a>)}
      <a className="mobile-call" href={PHONE}><Phone /> (334) 737-6636</a>
    </motion.div>}</AnimatePresence>
  </>;
}

function ReviewCard({ review, featured = false }: { review: typeof reviews[number]; featured?: boolean }) {
  return <article className={`review-card ${featured ? "featured" : ""}`}><Stars /><blockquote>“{review.quote}”</blockquote><footer>
    <span className="review-initials" aria-hidden="true">{review.name.split(" ").map(p => p[0]).join("")}</span>
    <span><strong>{review.name}</strong><small>Google review · {review.service}</small></span>
  </footer></article>;
}

export default function App() {
  const reduce = useReducedMotion();
  const reveal = reduce ? {} : { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-80px" }, transition: { duration: .65 } };
  return <div className="site-shell"><Nav /><main>
    <section id="home" className="hero"><div className="hero-grid" aria-hidden="true" />
      <motion.div className="hero-copy" initial={reduce ? false : { opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8 }}>
        <p className="eyebrow"><span /> Local auto repair · Opelika, Alabama</p><h1>Your car.<br /><em>Done right.</em></h1>
        <p className="hero-lede">Straight answers, experienced hands, and repair work that gets you back on the road.</p>
        <div className="hero-actions"><a className="button button-primary" href={PHONE}><Phone /> Call for service</a><a className="button button-ghost" href={DIRECTIONS} target="_blank" rel="noreferrer">Get directions <ArrowUpRight /></a></div>
        <a className="rating-line" href={REVIEWS} target="_blank" rel="noreferrer"><Stars label="4.7 out of 5 stars" /><strong>4.7</strong><span>from 82 Google reviews</span><ArrowRight /></a>
      </motion.div>
      <motion.div className="hero-visual" initial={reduce ? false : { opacity: 0, scale: .96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .9, delay: .12 }}>
        <img src="/images/opelika-shop.webp" alt="Opelika Town Automotive shop exterior" width="900" height="674" fetchPriority="high" />
        <div className="hero-stamp"><span>Open</span><strong>Mon–Fri</strong><small>8:00–5:30</small></div><div className="hero-caption"><span>3403 Pepperell Pkwy</span><span>Opelika, AL 36801</span></div>
      </motion.div>
    </section>
    <section className="trust-strip"><span><Check /> Fair, clear estimates</span><span><Check /> Helpful local team</span><span><Check /> Work customers recommend</span></section>

    <section id="services" className="services section-pad"><motion.div className="section-heading" {...reveal}>
      <p className="eyebrow"><span /> What we work on</p><h2>Repair without<br />the runaround.</h2><p>Call the shop with what you’re hearing, feeling, or seeing. The team will help you decide the next step.</p>
    </motion.div><div className="service-list">{services.map((s, i) => <motion.article key={s.name} className="service-row" {...reveal}>
      <span className="service-number">{String(i + 1).padStart(2, "0")}</span><span className="service-icon">{s.icon}</span><div><h3>{s.name}</h3><p>{s.detail}</p></div><a href={PHONE} aria-label={`Call about ${s.name}`}><ArrowUpRight /></a>
    </motion.article>)}</div></section>

    <section className="shop-story section-pad"><motion.div className="story-image" {...reveal}><img src="/images/engine-service.webp" alt="Engine being serviced in an automotive shop" width="900" height="900" loading="lazy" decoding="async" /><span className="image-index">01 / 02</span></motion.div>
      <motion.div className="story-copy" {...reveal}><p className="eyebrow light"><span /> The shop approach</p><h2>Listen first.<br />Then fix it.</h2><p>Car trouble already costs time and attention. Opelika Town Automotive keeps the conversation direct: bring in the vehicle, let the team look it over, and hear the estimate before the work moves forward.</p>
        <div className="story-points"><span><strong>01</strong>Explain what you’re experiencing</span><span><strong>02</strong>Get the vehicle evaluated</span><span><strong>03</strong>Review the repair and estimate</span></div>
      </motion.div></section>

    <section id="reviews" className="reviews section-pad"><motion.div className="reviews-heading" {...reveal}><div><p className="eyebrow"><span /> Five-star Google reviews</p><h2>Ask the people<br />who drove away.</h2></div><div className="review-score"><strong>4.7</strong><Stars label="4.7 out of 5 stars" /><span>82 Google reviews</span></div></motion.div>
      <div className="reviews-grid"><ReviewCard review={reviews[0]} featured /><ReviewCard review={reviews[1]} /><ReviewCard review={reviews[2]} /></div><a className="text-link" href={REVIEWS} target="_blank" rel="noreferrer">Read all reviews on Google <ArrowUpRight /></a>
    </section>

    <section id="visit" className="visit section-pad"><div className="visit-heading"><p className="eyebrow light"><span /> Bring it by</p><h2>Let’s get you<br />back on the road.</h2></div><div className="visit-details">
      <div><Clock3 /><span><small>Hours</small><strong>Monday–Friday</strong><p>8:00 AM–5:30 PM</p></span></div><div><MapPin /><span><small>Shop</small><strong>3403 Pepperell Pkwy</strong><p>Opelika, AL 36801</p></span></div><div><Phone /><span><small>Phone</small><strong>(334) 737-6636</strong><p>Call to discuss your vehicle</p></span></div>
    </div><div className="visit-actions"><a className="button button-red" href={PHONE}><Phone /> Call the shop</a><a className="button button-dark-outline" href={DIRECTIONS} target="_blank" rel="noreferrer">Get directions <ArrowUpRight /></a></div></section>
  </main><footer className="footer"><div className="footer-brand"><span className="brand-mark">OTA</span><strong>Opelika Town<br />Automotive</strong></div><div><small>Call</small><a href={PHONE}>(334) 737-6636</a></div><div><small>Visit</small><a href={DIRECTIONS} target="_blank" rel="noreferrer">3403 Pepperell Pkwy<br />Opelika, AL 36801</a></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Opelika Town Automotive</span><span>Website by <a href="https://formawebsite.com" target="_blank" rel="noreferrer">Forma</a></span></div></footer></div>;
}
