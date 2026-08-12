"use client"

/* =========================================================================================
   GIRUM MARKETING & PROMOTION — Single-page premium portfolio
   -----------------------------------------------------------------------------------------
   HOW TO EDIT:
   • All editable content lives in the `content` object directly below.
   • Replace logo, mottos, services, skills, projects, team, contact + social links there.
   • Colors are driven by design tokens in app/globals.css (change them once, everywhere
     updates automatically): --background, --primary, --gold (accent), --emerald, --muted...
   • Sections are separated with clear "SECTION" banner comments further down.
   ========================================================================================= */

import { useEffect, useMemo, useRef, useState } from "react"
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion"
import {
  Menu,
  X,
  ArrowUpRight,
  ArrowRight,
  ArrowUp,
  Target,
  Eye,
  Gem,
  Sparkles,
  Megaphone,
  Share2,
  Search,
  Lightbulb,
  PenTool,
  FileText,
  Video,
  BarChart3,
  Globe2,
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
} from "lucide-react"

/* =========================================================================================
   EDITABLE CONTENT
   ========================================================================================= */
const logo = "/images/logo-2.jpg"

const content = {
  brand: {
    name: "Girum",
    full: "Welcome to Girum Marketing",
    tagline: "Marketing & Promotion",
    motto: "Building Brands That Matter",
    // Replace placeholder logo by dropping a file in /public and setting logoSrc.
    logoSrc: "", // e.g. "/logo.png"
    email: "hello@girummarketing.com",
    phone: "+251 900 000 000",
    address: "Bole Road, Addis Ababa, Ethiopia",
    year: new Date().getFullYear(),
  },

  // Nav order also defines scroll-spy order
  nav: [
    { label: "Home", id: "home" },
    { label: "About", id: "about" },
    { label: "Services", id: "services" },
    { label: "Skills", id: "skills" },
    { label: "Projects", id: "projects" },
    { label: "Team", id: "team" },
    { label: "Contact", id: "contact" },
  ],

  // Hero mottos — fade in/out automatically, one at a time
  mottos: [
    "Growing Brands Digitally",
    "Creativity Meets Strategy",
    "Your Growth, Our Mission",
    "Marketing That Delivers Results",
    "Building Brands That Matter",
  ],

  about: {
    kicker: "Who We Are",
    heading: "A creative studio engineering measurable growth.",
    story:
      "We’re Girums, your creative marketing partners. At Girum we are genuinely invested in your long-term business growth. We do this by pairing creativity with the most up-to-date marketing strategies and by building Social media campaigns that can keep driving revenue for years to come.",
    pillars: [
      {
        icon: "target",
        title: "Our Mission",
        text: "To help brands grow with clarity — combining data-driven strategy and bold creativity that moves people to act.",
      },
      {
        icon: "eye",
        title: "Our Vision",
        text: "To become the most trusted growth partner for the region's most ambitious brands and creators.",
      },
      {
        icon: "gem",
        title: "Our Values",
        text: "Craft over noise. Transparency over hype. Results over vanity metrics. Partnership over transactions.",
      },
    ],
    stats: [
      { value: "120+", label: "Projects Delivered" },
      { value: "40+", label: "Happy Clients" },
      { value: "8x", label: "Avg. ROAS" },
      { value: "6yrs", label: "In The Game" },
    ],
  },

  services: {
    kicker: "What We Do",
    heading: "Full-funnel marketing, end to end.",
    items: [
      { icon: "megaphone", title: "Digital Marketing", text: "Integrated campaigns that connect the entire customer journey." },
      { icon: "share", title: "Social Media Management", text: "Always-on content, community, and growth across platforms." },
      { icon: "search", title: "SEO", text: "Technical, on-page, and content SEO that compounds over time." },
      { icon: "lightbulb", title: "Brand Strategy", text: "Positioning, messaging, and identity that set you apart." },
      { icon: "pen", title: "Graphic Design", text: "Scroll-stopping visuals with a consistent brand system." },
      { icon: "file", title: "Content Marketing", text: "Stories and assets that build authority and trust." },
      { icon: "video", title: "Video Marketing", text: "Short-form and cinematic video that converts." },
      { icon: "target", title: "Campaign Management", text: "Planning, execution, and optimization from brief to report." },
      { icon: "facebook", title: "Facebook Ads", text: "Precision targeting and creative testing for Meta." },
      { icon: "chrome", title: "Google Ads", text: "Search, display, and shopping campaigns that scale." },
      { icon: "mail", title: "Email Marketing", text: "Lifecycle flows and newsletters that drive repeat revenue." },
      { icon: "chart", title: "Analytics", text: "Dashboards and insights that turn data into decisions." },
    ] as { icon: IconKey; title: string; text: string }[],
  },

  skills: {
    kicker: "Our Toolkit",
    heading: "Battle-tested tools & disciplines.",
    items: [
      "Facebook Ads",
      "Google Ads",
      "Meta Business Suite",
      "SEO",
      "Google Analytics",
      "Photoshop",
      "Illustrator",
      "Canva",
      "Premiere Pro",
      "CapCut",
      "Copywriting",
      "Marketing Strategy",
      "Branding",
      "Video Editing",
    ],
  },

  projects: {
    kicker: "Selected Work",
    heading: "Brands we've helped grow.",
    // Replace screenshot (leave empty for gradient placeholder), name, category, url later.
    items: [
      {
        name: "Lumen Coffee Co.",
        category: "Brand & Social",
        description: "A full rebrand and social launch that tripled engagement in three months.",
        url: "https://example.com",
        image: "/images/khilx.jpg",
      },
      {
        name: "Verde Wellness",
        category: "SEO & Content",
        description: "Content engine and technical SEO driving 4x organic traffic year over year.",
        url: "https://example.com",
        image: "",
      },
      {
        name: "Atlas Fintech",
        category: "Paid Media",
        description: "Performance campaigns across Meta & Google delivering 8x return on ad spend.",
        url: "https://example.com",
        image: "",
      },
      {
        name: "Nova Fashion House",
        category: "Video & Campaign",
        description: "A cinematic seasonal campaign that sold out the collection in ten days.",
        url: "https://example.com",
        image: "",
      },
      {
        name: "Peak Real Estate",
        category: "Lead Generation",
        description: "Landing pages and funnels that cut cost-per-lead by more than half.",
        url: "https://example.com",
        image: "",
      },
      {
        name: "Sundial Hospitality",
        category: "Full Service",
        description: "End-to-end marketing partnership powering three new venue launches.",
        url: "https://example.com",
        image: "",
      },
    ],
    // Featured video — replace with a real MP4 (poster optional) or set embedUrl for an iframe.
    video: {
      kicker: "Showreel",
      heading: "See the work in motion.",
      // If videoSrc is provided, an HTML5 <video> is used. Otherwise embedUrl is used.
      videoSrc: "",
      poster: "",
      embedUrl: "https://www.youtube.com/embed/ScMzIvxBSi4",
    },
  },

  team: {
    kicker: "The People",
    heading: "Strategists, creatives & growth nerds.",
    members: [
      
      {
        name: "Bezawit Eshetu",
        role: "Strategy Develper",
        bio: "Leads brand and visual identity with an editorial eye.",
        image: "/images/bezawit.jpg",
        socials: { instagram: "#", linkedin: "#", x: "#" },
      },
      {
        name: "Natnael Tilahun",
        role: "Creative Director",
        bio: "Growth strategist obsessed with turning insight into revenue.",
        image: "/images/gir.jpg",
        socials: { instagram: "#", linkedin: "#", x: "#" },
      },
      
      {
        name: "Tibebu",
        role: "Video & Motion Lead",
        bio: "Scales campaigns across Meta and Google without waste.",
        image: "",
        socials: { instagram: "#", linkedin: "#", x: "#" },
      },
      {
        name: "Dawit Awel",
        role: "Ad Specialist",
        bio: "Builds always-on content engines that people love to follow.",
        image: "",
        socials: { instagram: "#", linkedin: "#", x: "#" },
      },
    ],
  },

  contact: {
    kicker: "Let's Talk",
    heading: "Start your growth story.",
    text: "Tell us about your brand and goals — we'll get back within one business day.",
  },

  // Social links used in contact + footer
  socials: [
    { label: "Instagram", href: "#", icon: "instagram" },
    { label: "Facebook", href: "#", icon: "facebook" },
    { label: "TikTok", href: "#", icon: "tiktok" },
    { label: "LinkedIn", href: "#", icon: "linkedin" },
    { label: "Telegram", href: "#", icon: "telegram" },
    { label: "X", href: "#", icon: "x" },
  ] as { label: string; href: string; icon: SocialKey }[],
}

/* =========================================================================================
   ICON MAPS (Lucide + a couple of inline brand marks)
   ========================================================================================= */
type IconKey =
  | "target" | "eye" | "gem" | "megaphone" | "share" | "search"
  | "lightbulb" | "pen" | "file" | "video" | "chart" | "facebook"
  | "chrome" | "mail"

// Inline Facebook mark (kept out of Lucide since this build lacks it)
function FacebookMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className ?? "h-6 w-6"} aria-hidden="true">
      <path d="M13.5 21v-8.2h2.7l.4-3.2h-3.1V7.5c0-.9.3-1.6 1.6-1.6h1.7V3.1C16.4 3 15.5 3 14.6 3c-2.4 0-4.1 1.5-4.1 4.2v2.4H7.8v3.2h2.7V21h3z" />
    </svg>
  )
}

const iconMap: Record<IconKey, React.ComponentType<{ className?: string }>> = {
  target: Target, eye: Eye, gem: Gem, megaphone: Megaphone, share: Share2,
  search: Search, lightbulb: Lightbulb, pen: PenTool, file: FileText,
  video: Video, chart: BarChart3, facebook: FacebookMark, chrome: Globe2, mail: Mail,
}

type SocialKey = "instagram" | "facebook" | "tiktok" | "linkedin" | "telegram" | "x"

// Small inline SVGs for brands Lucide doesn't ship (TikTok, Telegram, X)
function SocialIcon({ name, className }: { name: SocialKey; className?: string }) {
  const cls = className ?? "h-5 w-5"
  switch (name) {
    case "instagram":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cls} aria-hidden="true">
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
        </svg>
      )
    case "facebook":
      return <FacebookMark className={cls} />
    case "linkedin":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={cls} aria-hidden="true">
          <path d="M6.94 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM3.2 8.4h3.5V21H3.2V8.4zM9 8.4h3.35v1.7h.05c.47-.85 1.6-1.75 3.3-1.75 3.53 0 4.18 2.2 4.18 5.05V21h-3.5v-5.6c0-1.33-.02-3.05-1.9-3.05-1.9 0-2.2 1.45-2.2 2.95V21H9V8.4z" />
        </svg>
      )
    case "tiktok":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={cls} aria-hidden="true">
          <path d="M16.5 3c.3 2.1 1.5 3.6 3.5 3.9v2.6c-1.3.1-2.5-.2-3.5-.8v5.6c0 3.4-2.6 5.7-5.8 5.7-3 0-5.2-2.2-5.2-5 0-2.9 2.3-5 5.4-5 .3 0 .5 0 .8.1v2.8c-.3-.1-.5-.1-.8-.1-1.3 0-2.4 1-2.4 2.3 0 1.3 1 2.2 2.3 2.2 1.4 0 2.4-1 2.4-2.7V3h3.1z" />
        </svg>
      )
    case "telegram":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={cls} aria-hidden="true">
          <path d="M21.9 4.3l-3.1 14.7c-.2 1-.9 1.3-1.8.8l-4.9-3.6-2.4 2.3c-.3.3-.5.5-1 .5l.3-4.9L18 6.3c.4-.3-.1-.5-.6-.2L6.7 12.9l-4.7-1.5c-1-.3-1-1 .2-1.5l18.4-7.1c.9-.3 1.6.2 1.3 1.5z" />
        </svg>
      )
    case "x":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={cls} aria-hidden="true">
          <path d="M18.9 2H22l-7 8 8.2 12h-6.4l-5-7.3L6 22H3l7.5-8.6L2.5 2H9l4.5 6.6L18.9 2zm-1.1 18h1.7L7.3 3.8H5.5L17.8 20z" />
        </svg>
      )
    default:
      return null
  }
}

/* =========================================================================================
   ANIMATION PRESETS (reused across sections)
   ========================================================================================= */
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0 },
}
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}
const viewportOnce = { once: true, amount: 0.2 } as const

/* Small helper: a section reveal wrapper */
function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* Reusable kicker label */
function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.25em] text-yellow-400 drop-shadow-[0_0_8px_currentColor] brightness-150">
      <span className="h-px w-6 bg-yellow-400" aria-hidden="true" />
      {children}
    </span>
  )
}

/* =========================================================================================
   PAGE
   ========================================================================================= */
export default function Page() {
  const prefersReduced = useReducedMotion()

  /* --- Loading transition ------------------------------------------------------------ */
  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 900)
    return () => clearTimeout(t)
  }, [])

  /* --- Nav state: scrolled (glass), active section, mobile drawer -------------------- */
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState("home")
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Scroll-spy via IntersectionObserver
  useEffect(() => {
    const ids = content.nav.map((n) => n.id)
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] },
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  // Lock body scroll when drawer open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [menuOpen])

  const scrollTo = (id: string) => {
    setMenuOpen(false)
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: prefersReduced ? "auto" : "smooth" })
  }

  return (
    <>
      {/* ============================ LOADING TRANSITION ============================ */}
      <AnimatePresence>
        {!loaded && (
          <motion.div
            key="loader"
            className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center gap-4"
            >
              <span className="font-serif text-3xl font-semibold tracking-tight text-foreground">
                {content.brand.name}
                <span className="text-accent">.</span>
              </span>
              <div className="h-px w-24 overflow-hidden bg-border">
                <motion.div
                  className="h-full bg-accent"
                  initial={{ x: "-100%" }}
                  animate={{ x: "0%" }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ============================ NAVIGATION ============================ */}
      <Navbar
        scrolled={scrolled}
        active={active}
        onNavigate={scrollTo}
        onOpenMenu={() => setMenuOpen(true)}
      />

      {/* Mobile slide-in drawer */}
      <MobileDrawer
        open={menuOpen}
        active={active}
        onClose={() => setMenuOpen(false)}
        onNavigate={scrollTo}
      />

      <main>
        {/* ============================ SECTION: HERO ============================ */}
        <Hero prefersReduced={!!prefersReduced} onNavigate={scrollTo} />

        {/* ============================ SECTION: ABOUT ============================ */}
        <About />

        {/* ============================ SECTION: SERVICES ============================ */}
        <Services />

        {/* ============================ SECTION: SKILLS ============================ */}
        <Skills />

        {/* ============================ SECTION: PROJECTS + VIDEO ============================ */}
        <Projects />

        {/* ============================ SECTION: TEAM ============================ */}
        <Team />

        {/* ============================ SECTION: CONTACT ============================ */}
        <Contact />
      </main>

      {/* ============================ FOOTER ============================ */}
      <Footer onNavigate={scrollTo} />
    </>
  )
}

/* =========================================================================================
   NAVBAR
   ========================================================================================= */
function Navbar({
  scrolled,
  active,
  onNavigate,
  onOpenMenu,
}: {
  scrolled: boolean
  active: string
  onNavigate: (id: string) => void
  onOpenMenu: () => void
}) {
  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "border-b border-border bg-background/60 backdrop-blur-xl supports-[backdrop-filter]:bg-background/50"
          : "border-b border-transparent bg-transparent",
      ].join(" ")}
    >
      <nav
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8 md:h-20"
        aria-label="Primary"
      >
        {/* Brand */}
        <button
          onClick={() => onNavigate("home")}
          className="group flex items-center gap-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <span className="font-serif text-xl font-semibold tracking-tight text-foreground md:text-2xl">
            {content.brand.name}
            <span className="text-accent">.</span>
          </span>
        </button>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 lg:flex">
          {content.nav.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => onNavigate(item.id)}
                aria-current={active === item.id ? "true" : undefined}
                className={[
                  "relative rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
                  active === item.id
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                ].join(" ")}
              >
                {item.label}
                {active === item.id && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 -z-10 rounded-full bg-secondary"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden lg:block">
          <button
            onClick={() => onNavigate("contact")}
            className="group inline-flex items-center gap-1.5 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-transform duration-300 hover:-translate-y-0.5"
          >
            Get in Touch
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={onOpenMenu}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent lg:hidden"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>
      </nav>
    </header>
  )
}

/* =========================================================================================
   MOBILE DRAWER (animated slide-in, hamburger -> X, click-outside + item close)
   ========================================================================================= */
function MobileDrawer({
  open,
  active,
  onClose,
  onNavigate,
}: {
  open: boolean
  active: string
  onClose: () => void
  onNavigate: (id: string) => void
}) {
  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          {/* Backdrop (click outside to close) */}
          <motion.button
            aria-label="Close menu"
            className="absolute inset-0 h-full w-full bg-background/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />

          {/* Drawer panel */}
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="absolute right-0 top-0 flex h-full w-[82%] max-w-sm flex-col border-l border-border bg-card/95 backdrop-blur-xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 32 }}
          >
            <div className="flex items-center justify-between px-6 py-5">
              <span className="font-serif text-xl font-semibold text-foreground">
                {content.brand.name}
                <span className="text-accent">.</span>
              </span>
              <button
                onClick={onClose}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="flex flex-1 flex-col gap-1 px-4 py-4" aria-label="Mobile">
              {content.nav.map((item, i) => (
                <motion.button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 + i * 0.05 }}
                  className={[
                    "flex items-center justify-between rounded-xl px-4 py-3.5 text-left text-lg font-medium transition-colors",
                    active === item.id
                      ? "bg-secondary text-foreground"
                      : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground",
                  ].join(" ")}
                >
                  {item.label}
                  <ArrowRight className="h-4 w-4 opacity-60" />
                </motion.button>
              ))}
            </nav>

            <div className="border-t border-border px-6 py-6">
              <button
                onClick={() => onNavigate("contact")}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground"
              >
                Get in Touch <ArrowUpRight className="h-4 w-4" />
              </button>
              <p className="mt-4 text-center text-xs text-muted-foreground">
                {content.brand.email}
              </p>
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  )
}

/* =========================================================================================
   HERO
   ========================================================================================= */
function Hero({
  prefersReduced,
  onNavigate,
}: {
  prefersReduced: boolean
  onNavigate: (id: string) => void
}) {
  // Rotating services
  const whatWeDo = [
    "Social Media Marketing",
    "Digital Marketing",
    "Brand Strategy",
    "Content Marketing",
    "Performance Marketing",
  ]
  const [i, setI] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % whatWeDo.length), 3200)
    return () => clearInterval(t)
  }, [])

  // Subtle parallax on the logo/blobs as user scrolls the hero
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
  const yLogo = useTransform(scrollYProgress, [0, 1], [0, prefersReduced ? 0 : 90])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <section
      id="home"
      ref={ref}
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-5 pt-16 sm:px-8 bg-background"
    >
      {/* --- Layer 1: dark base background with no golden gradient --- */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-background" aria-hidden="true" />

      {/* --- Layer 2: one oversized logo watermark, brighter visibility --- */}
      <motion.div
        style={{ y: yLogo }}
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 0.35, scale: 0.90 }}
        transition={{ delay: 0.35, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute inset-0 z-[1] flex select-none items-center justify-center overflow-hidden"
        aria-hidden="true"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logo}
          alt=""
          className="h-full w-full object-contain scale-[1.7] md:scale-100 opacity-90 blur-[0.5px] mix-blend-screen brightness-125 [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_70%)]"
        />
      </motion.div>

      {/* --- Layer 3: subtle background depth blobs --- */}
      <div className="pointer-events-none absolute inset-0 z-[2] overflow-hidden" aria-hidden="true">
        <div className="girum-blob absolute -left-24 top-10 h-72 w-72 rounded-full bg-[color-mix(in_oklch,var(--primary)_15%,transparent)] blur-[90px] sm:h-96 sm:w-96" />
        <div className="girum-blob-slow absolute -right-24 top-1/3 h-72 w-72 rounded-full bg-[color-mix(in_oklch,var(--primary)_10%,transparent)] blur-[90px] sm:h-[26rem] sm:w-[26rem]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,color-mix(in_oklch,var(--foreground)_4%,transparent)_1px,transparent_1px),linear-gradient(to_bottom,color-mix(in_oklch,var(--foreground)_4%,transparent)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      </div>

      {/* --- Layer 4: hero content --- */}
      <motion.div style={{ opacity }} className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center justify-center px-4 md:items-start">
        
        {/* Massive Rotating Text (Replaces all fluff) */}
        <h1 className="text-center font-sans text-[3.5rem] font-extrabold leading-[1.05] tracking-tight text-foreground sm:text-[5.5rem] md:text-left md:text-[6.5rem] lg:text-[7.5rem]">
          We are{" "}
          <span>
            <AnimatePresence mode="wait">
              <motion.span
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="inline-block text-[#F9B52A]"
              >
                {whatWeDo[i]}
              </motion.span>
            </AnimatePresence>
          </span>
        </h1>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-12 flex flex-col items-center gap-4 sm:flex-row md:items-start"
        >
          <RippleButton
            onClick={() => onNavigate("projects")}
            className="w-full text-base sm:text-sm py-4 sm:py-3.5 bg-accent text-accent-foreground sm:w-auto"
          >
            View Our Work <ArrowUpRight className="h-4 w-4" />
          </RippleButton>
          <RippleButton
            onClick={() => onNavigate("contact")}
            className="w-full text-base sm:text-sm py-4 sm:py-3.5 border border-border bg-transparent text-foreground hover:bg-secondary sm:w-auto"
          >
            Contact Us
          </RippleButton>
        </motion.div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        style={{ opacity }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2"
        aria-hidden="true"
      >
        <div className="flex h-10 w-6 items-start justify-center rounded-full border border-border p-1.5">
          <motion.span
            className="h-2 w-1 rounded-full bg-accent"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  )
}

/* Premium button with click ripple */
function RippleButton({
  children,
  className,
  onClick,
}: {
  children: React.ReactNode
  className?: string
  onClick?: () => void
}) {
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([])
  const handle = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const id = Date.now()
    setRipples((r) => [...r, { id, x: e.clientX - rect.left, y: e.clientY - rect.top }])
    setTimeout(() => setRipples((r) => r.filter((x) => x.id !== id)), 650)
    onClick?.()
  }
  return (
    <button
      onClick={handle}
      className={[
        "relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-7 py-3.5 text-sm font-semibold transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className ?? "",
      ].join(" ")}
    >
      {ripples.map((r) => (
        <span
          key={r.id}
          className="pointer-events-none absolute h-2 w-2 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full bg-current/30"
          style={{ left: r.x, top: r.y }}
        />
      ))}
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
    </button>
  )
}

/* Shared section heading block */
function SectionHead({
  kicker,
  heading,
  className,
}: {
  kicker: string
  heading: string
  className?: string
}) {
  return (
    <Reveal className={["max-w-2xl", className ?? ""].join(" ")}>
      <Kicker>{kicker}</Kicker>
      <h2 className="mt-4 text-balance font-serif text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl md:text-5xl">
        {heading}
      </h2>
    </Reveal>
  )
}

/* =========================================================================================
   ABOUT
   ========================================================================================= */
function About() {
  const { about } = content
  return (
    <section id="about" className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 md:py-32">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Left: text */}
        <div>
          <SectionHead kicker={about.kicker} heading={about.heading} />
          <Reveal delay={0.1}>
            <p className="mt-6 text-pretty leading-relaxed text-muted-foreground">
              {about.story}
            </p>
          </Reveal>

          {/* Pillars */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="mt-10 grid gap-4 sm:grid-cols-3"
          >
            {about.pillars.map((p) => {
              const Icon = iconMap[p.icon as IconKey]
              return (
                <motion.div
                  key={p.title}
                  variants={fadeUp}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="rounded-2xl border border-border bg-card p-5 transition-colors hover:border-accent/40"
                >
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-accent-foreground shadow-[0_0_12px_currentColor] transition-colors duration-300">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-serif text-lg font-semibold text-foreground">
                    {p.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{p.text}</p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>

        {/* Right: illustration placeholder + stats */}
        <Reveal delay={0.15}>
          <div className="relative">
            {/* Illustration placeholder */}
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl border border-border bg-card sm:aspect-square">
              <div className="girum-gradient-pan absolute inset-0 bg-[radial-gradient(50%_50%_at_30%_20%,color-mix(in_oklch,var(--gold)_28%,transparent),transparent_70%),radial-gradient(50%_50%_at_80%_80%,color-mix(in_oklch,var(--emerald)_26%,transparent),transparent_70%)]" />
              <div className="girum-blob-slow absolute right-6 top-8 h-40 w-40 rounded-full bg-[color-mix(in_oklch,var(--gold)_40%,transparent)] blur-3xl" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="rounded-full border border-border bg-background/40 px-4 py-2 text-xs uppercase tracking-[0.25em] text-muted-foreground backdrop-blur-sm">
                  Illustration
                </span>
              </div>
            </div>

            {/* Floating stats card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ delay: 0.25, duration: 0.6 }}
              className="mt-4 grid grid-cols-2 gap-3 sm:absolute sm:-bottom-8 sm:-left-8 sm:mt-0 sm:w-[68%] sm:grid-cols-2 sm:rounded-2xl sm:border sm:border-border sm:bg-card/90 sm:p-5 sm:backdrop-blur-xl"
            >
              {about.stats.map((s) => (
                <div key={s.label} className="rounded-2xl border border-border bg-card p-4 sm:border-0 sm:bg-transparent sm:p-0">
                  <div className="font-serif text-2xl font-semibold text-foreground sm:text-3xl">
                    {s.value}
                  </div>
                  <div className="mt-0.5 text-xs text-muted-foreground">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* =========================================================================================
   SERVICES
   ========================================================================================= */
function Services() {
  const { services } = content
  return (
    <section id="services" className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 md:py-32">
      <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <SectionHead kicker={services.kicker} heading={services.heading} />
        <Reveal delay={0.1}>
          <p className="max-w-sm text-pretty text-sm leading-relaxed text-muted-foreground">
            One partner for the whole funnel — strategy, creative, media, and measurement working
            as a single system.
          </p>
        </Reveal>
      </div>

      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {services.items.map((s) => {
          const Icon = iconMap[s.icon]
          return (
            <motion.article
              key={s.title}
              variants={fadeUp}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-accent/50 hover:shadow-[0_20px_50px_-20px_color-mix(in_oklch,var(--gold)_40%,transparent)]"
            >
              {/* hover sheen */}
              <div className="pointer-events-none absolute inset-0 opacity-100 transition-opacity duration-300">
                <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-accent/20 blur-2xl" />
              </div>
              <span className="relative inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-accent-foreground shadow-[0_0_12px_currentColor] transition-colors duration-300">
                <Icon className="h-6 w-6" />
              </span>
              <h3 className="relative mt-5 font-serif text-xl font-semibold text-foreground">
                {s.title}
              </h3>
              <p className="relative mt-2 text-sm leading-relaxed text-muted-foreground">
                {s.text}
              </p>
            </motion.article>
          )
        })}
      </motion.div>
    </section>
  )
}

/* =========================================================================================
   SKILLS — animated pills/cards (no boring progress bars)
   ========================================================================================= */
function Skills() {
  const { skills } = content
  return (
    <section id="skills" className="relative overflow-hidden py-24 md:py-32">
      {/* faint background accent */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute left-1/2 top-0 h-64 w-[70%] -translate-x-1/2 rounded-full bg-[color-mix(in_oklch,var(--emerald)_10%,transparent)] blur-[100px]" />
      </div>

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="flex justify-center">
            <Kicker>{skills.kicker}</Kicker>
          </div>
          <Reveal>
            <h2 className="mt-4 text-balance font-serif text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl md:text-5xl">
              {skills.heading}
            </h2>
          </Reveal>
        </div>

        <motion.ul
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-14 flex flex-wrap justify-center gap-3"
        >
          {skills.items.map((skill) => (
            <motion.li
              key={skill}
              variants={{
                hidden: { opacity: 0, scale: 0.85, y: 14 },
                show: { opacity: 1, scale: 1, y: 0 },
              }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4 }}
              className="group inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-3 text-sm font-medium text-foreground transition-colors hover:border-accent/60 hover:bg-accent/10"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-accent transition-transform duration-300 group-hover:scale-150" />
              {skill}
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}

/* =========================================================================================
   PROJECTS + FEATURED VIDEO
   ========================================================================================= */
function Projects() {
  const { projects } = content
  return (
    <section id="projects" className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 md:py-32">
      <SectionHead kicker={projects.kicker} heading={projects.heading} />

      {/* Grid: 3 / 2 / 1 columns */}
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {projects.items.map((p) => (
          <motion.article
            key={p.name}
            variants={fadeUp}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="group relative min-h-[25rem] overflow-hidden rounded-3xl border border-border bg-card transition-all duration-300 hover:-translate-y-2 hover:border-accent/50 hover:shadow-[0_30px_60px_-30px_rgba(0,0,0,0.7)]"
          >
            {/* Full-bleed brand image / editable gradient fallback */}
            <div className="absolute inset-0 overflow-hidden">
              {p.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={p.image || "/placeholder.svg"}
                  alt={`${p.name} website screenshot`}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                <div className="absolute inset-0 bg-[radial-gradient(80%_70%_at_25%_10%,color-mix(in_oklch,var(--gold)_34%,transparent),transparent_65%),radial-gradient(70%_80%_at_85%_90%,color-mix(in_oklch,var(--emerald)_28%,transparent),transparent_65%),linear-gradient(135deg,var(--card),var(--background))]">
                  <div className="girum-gradient-pan absolute inset-0 opacity-70" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-serif text-3xl font-semibold tracking-tight text-foreground/25 transition-transform duration-700 group-hover:scale-105">
                      {p.name}
                    </span>
                  </div>
                </div>
              )}
              {/* Ensures every text layer remains readable over any future image */}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/45 to-background/5 transition-opacity duration-500 group-hover:from-background/95 group-hover:via-background/55" />
            </div>

            {/* Overlay content */}
            <div className="relative flex min-h-[25rem] flex-col justify-between p-6 sm:p-7">
              <span className="self-start rounded-full border border-foreground/20 bg-background/45 px-3 py-1 text-[11px] font-medium text-foreground/85 backdrop-blur-md">
                {p.category}
              </span>
              <div>
                <h3 className="font-serif text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                  {p.name}
                </h3>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-foreground/75">
                  {p.description}
                </p>
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-accent transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  Visit Website
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </div>
          </motion.article>
        ))}
      </motion.div>

      {/* ---------- Featured video ---------- */}
      <div className="mt-24">
        <div className="mx-auto max-w-2xl text-center">
          <div className="flex justify-center">
            <Kicker>{projects.video.kicker}</Kicker>
          </div>
          <Reveal>
            <h3 className="mt-4 text-balance font-serif text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              {projects.video.heading}
            </h3>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="relative mx-auto mt-10 aspect-video w-full max-w-4xl overflow-hidden rounded-3xl border border-border bg-card shadow-[0_40px_80px_-40px_rgba(0,0,0,0.8)]">
            {projects.video.videoSrc ? (
              <video
                className="h-full w-full object-cover"
                controls
                playsInline
                preload="none"
                poster={projects.video.poster || undefined}
              >
                <source src={projects.video.videoSrc} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <iframe
                className="h-full w-full"
                src={projects.video.embedUrl}
                title="Featured showreel"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* =========================================================================================
   TEAM
   ========================================================================================= */
function Team() {
  const { team } = content
  return (
    <section id="team" className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 md:py-32">
      <div className="mx-auto max-w-2xl text-center">
        <div className="flex justify-center">
          <Kicker>{team.kicker}</Kicker>
        </div>
        <Reveal>
          <h2 className="mt-4 text-balance font-serif text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl md:text-5xl">
            {team.heading}
          </h2>
        </Reveal>
      </div>

      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
      >
        {team.members.map((m) => (
          <motion.article
            key={m.name}
            variants={fadeUp}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="group overflow-hidden rounded-3xl border border-border bg-card transition-all duration-300 hover:-translate-y-2 hover:border-accent/40"
          >
            {/* Photo placeholder */}
            <div className="relative aspect-[4/5] w-full overflow-hidden">
              {m.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={m.image || "/placeholder.svg"}
                  alt={m.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(70%_70%_at_50%_20%,color-mix(in_oklch,var(--gold)_16%,transparent),transparent_70%)]">
                  <span className="flex h-20 w-20 items-center justify-center rounded-full border border-border bg-background/40 font-serif text-2xl font-semibold text-foreground/70 backdrop-blur-sm">
                    {m.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>
              )}
              {/* social overlay */}
              <div className="absolute inset-x-0 bottom-0 flex translate-y-0 items-center justify-center gap-2 bg-gradient-to-t from-background/90 to-transparent p-4 opacity-100 transition-all duration-300">
                {Object.entries(m.socials).map(([key, href]) => (
                  <a
                    key={key}
                    href={href}
                    aria-label={`${m.name} on ${key}`}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                  >
                    <SocialIcon name={key as SocialKey} className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>

            <div className="p-5">
              <h3 className="font-serif text-lg font-semibold text-foreground">{m.name}</h3>
              <p className="text-sm font-medium text-accent">{m.role}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{m.bio}</p>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </section>
  )
}

/* =========================================================================================
   CONTACT (info + form with validation)
   ========================================================================================= */
function Contact() {
  const { contact, brand, socials } = content

  const [form, setForm] = useState({ name: "", email: "", company: "", phone: "", message: "" })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [sent, setSent] = useState(false)

  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.name.trim()) e.name = "Please enter your name."
    if (!form.email.trim()) e.email = "Please enter your email."
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email."
    if (!form.message.trim()) e.message = "Tell us a little about your project."
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const onSubmit = (ev: React.FormEvent) => {
    ev.preventDefault()
    if (!validate()) return
    // Wire this up to your backend / email service later.
    setSent(true)
    setForm({ name: "", email: "", company: "", phone: "", message: "" })
    setTimeout(() => setSent(false), 4000)
  }

  const fields = useMemo(
    () =>
      [
        { name: "name", label: "Name", type: "text", required: true, span: 1 },
        { name: "email", label: "Email", type: "email", required: true, span: 1 },
        { name: "company", label: "Company", type: "text", required: false, span: 1 },
        { name: "phone", label: "Phone", type: "tel", required: false, span: 1 },
      ] as const,
    [],
  )

  const infoItems = [
    { icon: Mail, label: "Email", value: brand.email, href: `mailto:${brand.email}` },
    { icon: Phone, label: "Phone", value: brand.phone, href: `tel:${brand.phone.replace(/\s/g, "")}` },
    { icon: MapPin, label: "Office", value: brand.address, href: undefined },
  ]

  return (
    <section id="contact" className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 md:py-32">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Left: info */}
        <div>
          <SectionHead kicker={contact.kicker} heading={contact.heading} />
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-md text-pretty leading-relaxed text-muted-foreground">
              {contact.text}
            </p>
          </Reveal>

          <div className="mt-10 space-y-4">
            {infoItems.map((item) => {
              const Icon = item.icon
              const inner = (
                <>
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-muted-foreground">
                      {item.label}
                    </div>
                    <div className="text-sm font-medium text-foreground">{item.value}</div>
                  </div>
                </>
              )
              return (
                <Reveal key={item.label} delay={0.15}>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4 transition-colors hover:border-accent/40"
                    >
                      {inner}
                    </a>
                  ) : (
                    <div className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4">
                      {inner}
                    </div>
                  )}
                </Reveal>
              )
            })}
          </div>

          {/* Social buttons */}
          <Reveal delay={0.2}>
            <div className="mt-8 flex flex-wrap gap-2.5">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card text-foreground transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:bg-accent hover:text-accent-foreground"
                >
                  <SocialIcon name={s.icon} />
                </a>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Right: form */}
        <Reveal delay={0.15}>
          <form
            onSubmit={onSubmit}
            noValidate
            className="rounded-3xl border border-border bg-card p-6 sm:p-8"
          >
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {fields.map((f) => (
                <div key={f.name} className={f.name === "company" || f.name === "phone" ? "" : ""}>
                  <label htmlFor={f.name} className="mb-1.5 block text-sm font-medium text-foreground">
                    {f.label}
                    {f.required && <span className="text-accent"> *</span>}
                  </label>
                  <input
                    id={f.name}
                    name={f.name}
                    type={f.type}
                    value={form[f.name as keyof typeof form]}
                    onChange={(e) => setForm((v) => ({ ...v, [f.name]: e.target.value }))}
                    aria-invalid={!!errors[f.name]}
                    aria-describedby={errors[f.name] ? `${f.name}-error` : undefined}
                    className={[
                      "w-full rounded-xl border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 transition-colors focus:outline-none focus:ring-2",
                      errors[f.name]
                        ? "border-destructive focus:ring-destructive/50"
                        : "border-border focus:border-accent focus:ring-accent/40",
                    ].join(" ")}
                    placeholder={f.label}
                  />
                  {errors[f.name] && (
                    <p id={`${f.name}-error`} className="mt-1.5 text-xs text-destructive">
                      {errors[f.name]}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* Message */}
            <div className="mt-5">
              <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-foreground">
                Message<span className="text-accent"> *</span>
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={form.message}
                onChange={(e) => setForm((v) => ({ ...v, message: e.target.value }))}
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? "message-error" : undefined}
                className={[
                  "w-full resize-none rounded-xl border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 transition-colors focus:outline-none focus:ring-2",
                  errors.message
                    ? "border-destructive focus:ring-destructive/50"
                    : "border-border focus:border-accent focus:ring-accent/40",
                ].join(" ")}
                placeholder="Tell us about your brand and goals…"
              />
              {errors.message && (
                <p id="message-error" className="mt-1.5 text-xs text-destructive">
                  {errors.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-accent-foreground transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              {sent ? (
                <>
                  Message Sent <CheckCircle2 className="h-4 w-4" />
                </>
              ) : (
                <>
                  Send Message
                  <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </>
              )}
            </button>

            <AnimatePresence>
              {sent && (
                <motion.p
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-3 text-center text-sm text-emerald"
                >
                  Thanks — we&apos;ll be in touch within one business day.
                </motion.p>
              )}
            </AnimatePresence>
          </form>
        </Reveal>
      </div>
    </section>
  )
}

/* =========================================================================================
   FOOTER
   ========================================================================================= */
function Footer({ onNavigate }: { onNavigate: (id: string) => void }) {
  const { brand, nav, socials } = content
  const toTop = () => window.scrollTo({ top: 0, behavior: "smooth" })

  return (
    <footer className="relative border-t border-border">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <span className="font-serif text-2xl font-semibold tracking-tight text-foreground">
              {brand.name}
              <span className="text-accent">.</span>
            </span>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              {brand.motto}. A premium digital marketing agency built for ambitious brands.
            </p>
            <div className="mt-6 flex flex-wrap gap-2.5">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-accent hover:bg-accent hover:text-accent-foreground"
                >
                  <SocialIcon name={s.icon} className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-2.5">
              {nav.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => onNavigate(item.id)}
                    className="text-sm text-muted-foreground transition-colors hover:text-accent"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Get in Touch
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
              <li>
                <a href={`mailto:${brand.email}`} className="transition-colors hover:text-accent">
                  {brand.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${brand.phone.replace(/\s/g, "")}`}
                  className="transition-colors hover:text-accent"
                >
                  {brand.phone}
                </a>
              </li>
              <li>{brand.address}</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © {brand.year} {brand.full}. All rights reserved.
          </p>
          <button
            onClick={toTop}
            className="group inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs font-medium text-muted-foreground transition-colors hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            Back to top
            <ArrowUp className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </footer>
  )
}