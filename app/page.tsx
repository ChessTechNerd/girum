"use client"

import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useScroll, useTransform } from "framer-motion"
import { ArrowDownRight, ArrowRight, ArrowUpRight, Check, Menu, MoveUpRight, X } from "lucide-react"

const navItems = ["Work", "Services", "About", "Insights"]
const services = [
  { number: "01", title: "Brand strategy", text: "Positioning, identity and a point of view that makes your brand unmistakable." },
  { number: "02", title: "Social media", text: "Content systems that make your brand recognizable, relevant and impossible to scroll past." },
  { number: "03", title: "Content creation", text: "Stories, campaigns and visual worlds built to earn attention and hold it." },
  { number: "04", title: "Digital advertising", text: "Performance creative and media that turns the right attention into action." },
  { number: "05", title: "Web experiences", text: "Digital homes that feel as good as the brands they represent." },
]
const projects = [
  { name: "ReadEth", type: "Digital commerce / Brand world", className: "project-readeth", tag: "A new kind of reading" },
  { name: "EthBuy", type: "E-commerce / Digital experience", className: "project-ethbuy", tag: "Built for the everyday" },
]

const reveal = { hidden: { opacity: 0, y: 36 }, visible: { opacity: 1, y: 0 } }
const transition = { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return <motion.div className={className} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.18 }} variants={reveal} transition={{ ...transition, delay }}>{children}</motion.div>
}

function Logo({ light = false }: { light?: boolean }) {
  return <a href="#home" className={`flex items-center gap-3 font-semibold tracking-[-0.04em] ${light ? "text-background" : "text-foreground"}`}><span className="logo-mark" aria-hidden="true">g</span><span className="text-[1.1rem]">girum<span className="text-primary">.</span></span></a>
}

function ButtonLink({ children, href = "#contact", inverse = false }: { children: React.ReactNode; href?: string; inverse?: boolean }) {
  return <a href={href} className={`group inline-flex items-center gap-4 border px-5 py-3 text-[0.7rem] font-semibold uppercase tracking-[0.18em] transition duration-500 ${inverse ? "border-background/20 bg-background text-background hover:bg-primary" : "border-foreground/20 text-foreground hover:border-primary hover:text-primary"}`}><span>{children}</span><ArrowUpRight className="size-4 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" /></a>
}

function FloatingBrowser({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return <div className={`browser-frame ${className}`}><div className="browser-bar"><span /><span /><span /><i>girum / studio</i></div>{children}</div>
}

function Hero({ reduced }: { reduced: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
  const y = useTransform(scrollYProgress, [0, 1], [0, 150])
  const rotate = useTransform(scrollYProgress, [0, 1], [0, -8])
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const handleMove = (event: React.MouseEvent) => { if (reduced) return; const rect = event.currentTarget.getBoundingClientRect(); mx.set((event.clientX - rect.left) / rect.width - 0.5); my.set((event.clientY - rect.top) / rect.height - 0.5) }
  return <section id="home" ref={ref} className="hero-section" onMouseMove={handleMove}>
    <div className="hero-glow" style={{ transform: `translate(${mx.get() * 30}px, ${my.get() * 30}px)` }} />
    <div className="hero-grid" />
    <div className="hero-content page-shell">
      <motion.p className="eyebrow" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ...transition, delay: 0.7 }}><span /> Creative digital agency</motion.p>
      <motion.h1 initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ ...transition, delay: 0.85 }}>We turn<br /><em>attention</em><br />into growth<span className="text-primary">.</span></motion.h1>
      <motion.div className="hero-bottom" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ ...transition, delay: 1.15 }}><p>Strategy, creative and digital experiences built to make ambitious brands impossible to ignore.</p><ButtonLink>Start a project</ButtonLink></motion.div>
    </div>
    <motion.div className="hero-art" style={reduced ? {} : { y, rotate }} aria-hidden="true">
      <div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="hero-sphere" />
      <FloatingBrowser className="browser-back"><div className="mockup-dark"><span className="mockup-kicker">01 / digital culture</span><strong>Make<br />meaning<br />move.</strong><div className="mockup-line" /></div></FloatingBrowser>
      <FloatingBrowser className="browser-front"><div className="mockup-light"><span>ReadEth — 2026</span><strong>Read<br /><i>between</i><br />the lines.</strong><div className="mockup-circle" /></div></FloatingBrowser>
      <div className="floating-word">BUILD<br /><span>BETTER</span></div>
    </motion.div>
    <div className="hero-scroll page-shell"><span>Scroll to explore</span><ArrowDownRight className="size-4" /></div>
  </section>
}

function Marquee() { return <section className="marquee-section"><div className="page-shell marquee-label">Built for ambitious brands</div><div className="marquee-track">{[...Array(2)].flatMap(() => ["Branding", "Social media", "E-commerce", "Content", "Digital campaigns", "Web design", "Performance"]).map((item, i) => <span key={`${item}-${i}`}>{item}<b>✳</b></span>)}</div></section> }

function About() { return <section id="about" className="about-section page-shell"><Reveal className="section-top"><span className="section-index">01 — Who we are</span><span className="section-aside">Girum Marketing & Promotion<br />Addis Ababa / Everywhere</span></Reveal><Reveal><h2>We don&apos;t just<br />make content.<br /><i>We make brands matter.</i></h2></Reveal><div className="about-bottom"><Reveal><p className="large-copy">Girum combines strategy, creativity and digital execution to help businesses build stronger identities, reach the right audiences and grow with intention.</p><a className="text-link" href="#services">More about Girum <ArrowRight className="size-4" /></a></Reveal><Reveal delay={0.15} className="orbital-art"><div className="orbital-glow" /><div className="orbital-ring ring-a" /><div className="orbital-ring ring-b" /><span>clarity<br />× craft<br />× growth</span></Reveal></div></section> }

function Services() { const [active, setActive] = useState(1); return <section id="services" className="services-section"><div className="page-shell"><Reveal className="section-top"><span className="section-index">02 — What we do</span><span className="section-aside">One partner. Every touchpoint.</span></Reveal><Reveal><h2 className="section-heading">The work behind<br /><i>the wow.</i></h2></Reveal><div className="service-list">{services.map((service, index) => <motion.button key={service.number} className={`service-row ${active === index ? "is-active" : ""}`} onMouseEnter={() => setActive(index)} onFocus={() => setActive(index)}><span className="service-number">{service.number}</span><span className="service-title">{service.title}</span><span className="service-copy">{service.text}</span><ArrowUpRight className="service-arrow" /></motion.button>)}</div><div className="service-preview"><div className="preview-meta"><span>Currently exploring</span><strong>{services[active].title}</strong></div><div className={`preview-screen screen-${active}`}><div className="screen-grid" /><span className="screen-label">GIRUM / {services[active].number}</span><strong>{active === 1 ? "Make it" : active === 2 ? "Stories that" : active === 3 ? "Attention is" : active === 4 ? "Digital, but" : "Find your"}<br /><i>{active === 1 ? "recognizable." : active === 2 ? "stay with you." : active === 3 ? "a strategy." : active === 4 ? "more human." : "difference."}</i></strong></div></div></div></section> }

function Work() { return <section id="work" className="work-section page-shell"><Reveal className="section-top"><span className="section-index">03 — Selected work</span><span className="section-aside">A few things we&apos;ve built, shaped and grown.</span></Reveal><Reveal><h2 className="section-heading">Work with<br /><i>weight.</i></h2></Reveal><div className="project-stack">{projects.map((project, index) => <Reveal key={project.name} delay={index * 0.1}><a href="#contact" className="project-case"><div className={`project-visual ${project.className}`}><div className="project-noise" /><span className="project-tag">{project.tag}</span><div className="project-ui"><small>{project.name} / 2026</small><strong>{index === 0 ? <>The future<br /><i>is readable.</i></> : <>Everyday<br /><i>made better.</i></>}</strong><div className="project-ui-line" /></div></div><div className="project-caption"><div><span>{project.type}</span><h3>{project.name}</h3></div><ArrowUpRight /></div></a></Reveal>)}</div></section> }

function Results() { return <section className="results-section"><div className="page-shell"><Reveal><span className="section-index">04 — Proof, not promises</span><h2>Creativity<br /><i>with a purpose.</i></h2></Reveal><div className="result-grid">{[["+248%", "Engagement"], ["3.4M", "Content views"], ["+187%", "Qualified leads"], ["42+", "Projects delivered"]].map(([value, label], i) => <Reveal key={label} delay={i * 0.08}><div className="result"><strong>{value}</strong><span>{label}</span></div></Reveal>)}</div><p className="disclaimer">* Illustrative placeholders — replace with verified Girum results.</p></div></section> }

function Process() { return <section className="process-section page-shell"><Reveal className="section-top"><span className="section-index">05 — How we make it happen</span><span className="section-aside">A clear process for ambitious outcomes.</span></Reveal><Reveal><h2 className="section-heading">From first thought<br />to <i>full flight.</i></h2></Reveal><div className="process-grid">{["Discover", "Strategize", "Create", "Launch", "Optimize"].map((step, i) => <Reveal key={step} delay={i * 0.08}><div className="process-step"><span>0{i + 1}</span><strong>{step}</strong><p>{["Find the signal in the noise.", "Give the idea a direction.", "Make the invisible visible.", "Put it in the world.", "Make what works work harder."][i]}</p></div></Reveal>)}</div></section> }

function Philosophy() { return <section id="insights" className="philosophy-section page-shell"><Reveal><span className="section-index">06 — Our philosophy</span><div className="philosophy-copy"><p>Strategy without creativity<br /><i>is invisible.</i></p><p>Creativity without strategy<br /><i>is decoration.</i></p><strong>We do both<span className="text-primary">.</span></strong></div></Reveal></section> }

function CTA() { return <section id="contact" className="cta-section"><div className="cta-glow" /><div className="page-shell cta-inner"><Reveal><span className="section-index">07 — Make some noise</span><h2>Ready to<br /><i>be remembered?</i></h2><p>Let&apos;s build something people remember.</p><ButtonLink inverse /></Reveal></div></section> }

function Footer() { return <footer className="footer-section page-shell"><div className="footer-top"><Logo /><span>Marketing & Promotion</span></div><div className="footer-grid"><div><span className="footer-label">Find us</span><a href="mailto:hello@girummarketing.com">hello@girummarketing.com</a><a href="#contact">+251 900 000 000</a></div><div><span className="footer-label">Navigate</span>{navItems.map(item => <a href={`#${item.toLowerCase()}`} key={item}>{item}</a>)}</div><div><span className="footer-label">Social</span><a href="#contact">Instagram</a><a href="#contact">LinkedIn</a><a href="#contact">Telegram</a></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Girum Marketing & Promotion</span><span>Addis Ababa / Worldwide</span></div></footer> }

export default function Page() { const reduced = useReducedMotion(); const [menuOpen, setMenuOpen] = useState(false); const [scrolled, setScrolled] = useState(false); useEffect(() => { const onScroll = () => setScrolled(window.scrollY > 30); window.addEventListener("scroll", onScroll, { passive: true }); return () => window.removeEventListener("scroll", onScroll) }, []); useEffect(() => { document.body.style.overflow = menuOpen ? "hidden" : ""; return () => { document.body.style.overflow = "" } }, [menuOpen]); return <><header className={`site-nav ${scrolled ? "is-scrolled" : ""}`}><Logo /><nav>{navItems.map(item => <a href={`#${item.toLowerCase()}`} key={item}>{item}</a>)}<ButtonLink>Start a project</ButtonLink></nav><button className="menu-button" aria-label={menuOpen ? "Close menu" : "Open menu"} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button></header><AnimatePresence>{menuOpen && <motion.div className="mobile-menu" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><Logo light /><div className="mobile-links">{navItems.map((item, i) => <motion.a initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)} key={item}>{item}<ArrowUpRight /></motion.a>)}</div><span className="mobile-note">Girum Marketing & Promotion<br />Addis Ababa / Everywhere</span></motion.div>}</AnimatePresence><main><Hero reduced={!!reduced} /><Marquee /><About /><Services /><Work /><Results /><Process /><Philosophy /><CTA /></main><Footer /></> }
