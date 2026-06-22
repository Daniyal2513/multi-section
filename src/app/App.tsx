import { useState, useEffect, useRef } from "react";
import {
  Phone,
  Shield,
  Star,
  CheckCircle,
  Menu,
  X,
  ArrowRight,
  Wrench,
  Flame,
  Droplets,
  Building2,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Mail,
  Clock,
  Award,
  Users,
  ThumbsUp,
} from "lucide-react";

// ─── constants ───────────────────────────────────────────────────────────────

const PHONE = "(740) 810-1652";
const LICENSE = "34603";
const LOGO_SRC = "/ronjon+name+no+backround.webp";

const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Commercial", href: "#commercial" },
  { label: "Service Area", href: "#area" },
  { label: "About Us", href: "#about" },
  { label: "Project Gallery", href: "#gallery" },
];

const TRUST_BADGES = [
  { icon: Users, label: "Family Owned", sub: "& Operated" },
  { icon: Shield, label: "Licensed", sub: "& Insured" },
  { icon: Award, label: "Warranty", sub: "Guarantee" },
  { icon: Clock, label: "Emergency", sub: "Service Available" },
  { icon: Star, label: "4.9★ Google Rated", sub: "84+ Reviews" },
];

const SERVICES = [
  {
    icon: Flame,
    title: "Water Heater & Tankless Systems",
    desc: "Expert installation, repair, and replacement of traditional and tankless water heaters for maximum efficiency and comfort.",
  },
  {
    icon: Wrench,
    title: "Kitchen & Bath Remodels",
    desc: "Rough-in plumbing, fixture upgrades, and full remodel support — done right the first time with clean, code-compliant work.",
  },
  {
    icon: Droplets,
    title: "Sump Pumps & Battery Backups",
    desc: "Protect your basement from flooding with professional sump pump installation and reliable battery backup systems.",
  },
  {
    icon: Building2,
    title: "Commercial Plumbing",
    desc: "Full-service commercial plumbing for new construction, tenant fit-outs, and ongoing maintenance contracts.",
    id: "commercial",
  },
];

const REVIEWS = [
  {
    name: "Kathy Warden",
    stars: 5,
    text: "RonJon showed up the same day and had our water heater replaced in just a few hours. Ron was incredibly polite and explained everything. Honest pricing — no surprises on the invoice. Highly recommend!",
    date: "March 2024",
  },
  {
    name: "Andrea Hitchman",
    stars: 5,
    text: "We had a main stack issue in our basement that two other plumbers couldn't figure out. John diagnosed it immediately and had it fixed by end of day. Professional, clean, and fair. This is our plumber for life.",
    date: "January 2024",
  },
  {
    name: "Mike Castillo",
    stars: 5,
    text: "Andrew did a fantastic job on our kitchen rough-in during our remodel. The work was clean, the communication was great throughout the project, and he finished ahead of schedule. Five stars.",
    date: "November 2023",
  },
  {
    name: "Susan Peralta",
    stars: 5,
    text: "Called for an emergency leak on a Sunday — they actually answered and showed up within 90 minutes. Fair weekend rates, zero attitude. That kind of service is rare these days.",
    date: "October 2023",
  },
];

const GALLERY_TABS = [
  {
    label: "Tankless Upgrades",
    before: "https://images.unsplash.com/photo-1676210134188-4c05dd172f89?w=700&h=500&fit=crop&auto=format",
    after: "https://images.unsplash.com/photo-1761353855019-05f2f3ed9c43?w=700&h=500&fit=crop&auto=format",
    beforeAlt: "Old traditional water heater installation",
    afterAlt: "Clean tankless water heater install by RonJon Plumbing",
  },
  {
    label: "Basement Stack Replacements",
    before: "https://images.unsplash.com/photo-1768321918210-a775e4c88f08?w=700&h=500&fit=crop&auto=format",
    after: "https://images.unsplash.com/photo-1676210133055-eab6ef033ce3?w=700&h=500&fit=crop&auto=format",
    beforeAlt: "Old deteriorated main stack pipes",
    afterAlt: "New clean basement main stack installation",
  },
];

const SERVICE_AREAS = [
  "Columbus", "Centerburg", "Westerville", "Delaware",
  "Sunbury", "Mount Vernon", "Galena", "Powell",
  "Lewis Center", "Johnstown", "Newark", "Granville",
];

// ─── sub-components ───────────────────────────────────────────────────────────

function Logo({ className = "" }: { className?: string }) {
  const [err, setErr] = useState(false);
  return err ? (
    <span className={`font-display font-extrabold text-xl tracking-tight text-[#1A1A1A] ${className}`}>
      <span className="text-[#38B6FF]">Ron</span>Jon
    </span>
  ) : (
    <img
      src={LOGO_SRC}
      alt="RonJon Plumbing logo"
      onError={() => setErr(true)}
      className={`h-12 w-auto object-contain ${className}`}
    />
  );
}

function StarRow({ count = 5 }: { count?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
      ))}
    </div>
  );
}

function BlueCTA({
  children,
  href,
  onClick,
  className = "",
  size = "md",
}: {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };
  const base = `inline-flex items-center gap-2 font-semibold rounded-lg bg-[#38B6FF] text-white transition-all duration-200 hover:bg-[#1da8f5] active:bg-[#0d99e6] active:scale-[0.98] shadow-sm hover:shadow-md ${sizes[size]} ${className}`;
  if (href)
    return (
      <a href={href} className={base}>
        {children}
      </a>
    );
  return (
    <button onClick={onClick} className={base}>
      {children}
    </button>
  );
}

function GhostCTA({
  children,
  href,
  className = "",
}: {
  children: React.ReactNode;
  href?: string;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={`inline-flex items-center gap-2 font-semibold rounded-lg border-2 border-white text-white px-8 py-4 text-lg transition-all duration-200 hover:bg-white/10 active:bg-white/20 ${className}`}
    >
      {children}
    </a>
  );
}

// ─── sections ─────────────────────────────────────────────────────────────────

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md" : "bg-white/95 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a href="#" className="flex-shrink-0">
            <Logo />
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="px-4 py-2 text-sm font-medium text-[#1A1A1A] hover:text-[#38B6FF] rounded-md transition-colors duration-150"
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden lg:block">
            <BlueCTA href={`tel:${PHONE.replace(/\D/g, "")}`} size="md">
              <Phone className="w-4 h-4" />
              Call Now: {PHONE}
            </BlueCTA>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2 rounded-md text-[#1A1A1A]"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="lg:hidden bg-white border-t border-gray-100 px-4 pb-4">
          {NAV_LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block py-3 text-sm font-medium text-[#1A1A1A] border-b border-gray-50 hover:text-[#38B6FF]"
            >
              {l.label}
            </a>
          ))}
          <BlueCTA href={`tel:${PHONE.replace(/\D/g, "")}`} size="sm" className="mt-4 w-full justify-center">
            <Phone className="w-4 h-4" />
            Call Now: {PHONE}
          </BlueCTA>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-16 lg:pt-20">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1768321916292-ade0ca9c091d?w=1600&h=900&fit=crop&auto=format"
          alt="Professional plumbing work"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A1A]/92 via-[#1A1A1A]/65 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-[54px] py-[128px] mx-[58px] my-[0px]">
        <div className="max-w-xl">

          {/* Eyebrow */}
          <div className="flex items-center gap-2 mb-7">
            <MapPin className="w-3.5 h-3.5 text-[#38B6FF]" />
            <span className="text-[#38B6FF] text-sm font-semibold tracking-wide">
              Serving Central Ohio Since 2003
            </span>
          </div>

          {/* Heading */}
          <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold text-white leading-[1.1] mb-6">
            Central Ohio&apos;s Trusted
            <span className="block text-[#38B6FF] mt-1">Family-Owned Plumbers</span>
            <span className="block mt-1">for Over 20 Years</span>
          </h1>

          {/* Divider */}
          <div className="w-12 h-0.5 bg-[#38B6FF] mb-6" />

          {/* Subheadline */}
          <p className="text-base text-white/75 font-light leading-relaxed mb-10">
            Honest communication, transparent pricing, and quality workmanship
            for your home or business. Serving Centerburg, Columbus, and
            surrounding areas.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-start gap-3">
            <BlueCTA href="#contact" size="lg">
              Schedule Us Today!
            </BlueCTA>
            <GhostCTA href="#commercial">
              Commercial Services
              <ArrowRight className="w-4 h-4" />
            </GhostCTA>
          </div>

          {/* Rating strip */}
          <div className="mt-10 flex items-center gap-3 border-t border-white/10 pt-8">
            <StarRow />
            <span className="text-white font-bold text-sm">4.9</span>
            <span className="text-white/40 text-sm">·</span>
            <span className="text-white/60 text-sm font-light">84+ Google Reviews</span>
          </div>

        </div>
      </div>
    </section>
  );
}

function TrustBadges() {
  return (
    <section className="bg-[#1A1A1A] py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-4">
          {TRUST_BADGES.map(({ icon: Icon, label, sub }) => (
            <div
              key={label}
              className="flex flex-col items-center text-center gap-2 py-2"
            >
              <div className="w-11 h-11 rounded-full bg-[#38B6FF]/15 flex items-center justify-center">
                <Icon className="w-5 h-5 text-[#38B6FF]" />
              </div>
              <div>
                <p className="text-white font-semibold text-sm leading-tight">{label}</p>
                <p className="text-[#737373] text-xs">{sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="py-20 lg:py-28 bg-[#F9F9F9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-[#38B6FF] font-semibold text-sm uppercase tracking-widest mb-3">
            What We Do
          </p>
          <h2 className="font-display text-3xl lg:text-4xl font-extrabold text-[#1A1A1A] mb-4">
            Our Plumbing Services
          </h2>
          <p className="text-[#737373] text-lg font-light max-w-xl mx-auto">
            From routine repairs to full commercial installs — every job gets
            our family&apos;s full commitment.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map(({ icon: Icon, title, desc, id }) => (
            <div
              key={title}
              id={id}
              className="bg-white rounded-2xl p-7 border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
            >
              <div className="w-14 h-14 rounded-xl bg-[#38B6FF]/10 flex items-center justify-center mb-5 group-hover:bg-[#38B6FF]/20 transition-colors duration-300">
                <Icon className="w-7 h-7 text-[#38B6FF]" />
              </div>
              <h3 className="font-display text-[#1A1A1A] font-bold text-lg leading-snug mb-3">
                {title}
              </h3>
              <p className="text-[#737373] text-sm font-light leading-relaxed mb-5">
                {desc}
              </p>
              <a
                href="#contact"
                className="inline-flex items-center gap-1 text-[#38B6FF] text-sm font-semibold hover:gap-2 transition-all duration-150"
              >
                Learn More <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="py-20 lg:py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          {/* Image column */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[4/3] bg-gray-200">
              <img
                src="https://images.unsplash.com/photo-1676210134188-4c05dd172f89?w=700&h=525&fit=crop&auto=format"
                alt="RonJon Plumbing family team at work"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/30 to-transparent" />
            </div>
            {/* Floating stat card */}
            <div className="absolute -bottom-6 -right-4 lg:-right-8 bg-[#38B6FF] text-white rounded-xl p-5 shadow-xl">
              <p className="font-display text-4xl font-extrabold leading-none">20+</p>
              <p className="text-white/90 text-sm font-medium mt-1">Years Serving<br />Central Ohio</p>
            </div>
          </div>

          {/* Text column */}
          <div className="lg:pl-4">
            <p className="text-[#38B6FF] font-semibold text-sm uppercase tracking-widest mb-4">
              Our Story
            </p>
            <h2 className="font-display text-3xl lg:text-4xl font-extrabold text-[#1A1A1A] leading-tight mb-6">
              A Family Legacy Built on Integrity
            </h2>
            <p className="text-[#737373] text-base font-light leading-relaxed mb-5">
              What started as Ron&apos;s one-man operation over two decades ago has
              grown into a tight-knit family company. Today, Ron works alongside
              his sons John and Andrew — each trained from the ground up to uphold
              the same standard: do it right, explain why, and never pad a bill.
            </p>
            <p className="text-[#737373] text-base font-light leading-relaxed mb-8">
              That commitment to transparency is why we still get calls from
              customers who hired us in 2004. Local families trust us with their
              biggest investments because they know our name is on every job — not
              just a faceless logo.
            </p>

            <div className="grid grid-cols-2 gap-5 mb-10">
              {[
                { icon: CheckCircle, label: "Transparent Pricing" },
                { icon: CheckCircle, label: "No Upsell Pressure" },
                { icon: CheckCircle, label: "Clean Job Sites" },
                { icon: CheckCircle, label: "Punctual & Professional" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-3">
                  <Icon className="w-5 h-5 text-[#38B6FF] flex-shrink-0" />
                  <span className="text-[#1A1A1A] text-sm font-medium">{label}</span>
                </div>
              ))}
            </div>

            <BlueCTA href="#contact" size="lg">
              Get a Free Estimate
              <ArrowRight className="w-5 h-5" />
            </BlueCTA>
          </div>
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  const [activeTab, setActiveTab] = useState(0);
  const [slider, setSlider] = useState(50);
  const [dragging, setDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const pct = Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100));
    setSlider(pct);
  };

  return (
    <section id="gallery" className="py-20 lg:py-28 bg-[#F9F9F9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-[#38B6FF] font-semibold text-sm uppercase tracking-widest mb-3">
            Project Gallery
          </p>
          <h2 className="font-display text-3xl lg:text-4xl font-extrabold text-[#1A1A1A] mb-4">
            Before &amp; After Showcase
          </h2>
          <p className="text-[#737373] text-lg font-light max-w-xl mx-auto">
            Drag the slider to compare real RonJon projects — no stock footage,
            no staged sets.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 justify-center mb-10 flex-wrap">
          {GALLERY_TABS.map((t, i) => (
            <button
              key={t.label}
              onClick={() => { setActiveTab(i); setSlider(50); }}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold border transition-all duration-200 ${
                activeTab === i
                  ? "bg-[#38B6FF] text-white border-[#38B6FF] shadow-sm"
                  : "bg-white text-[#737373] border-gray-200 hover:border-[#38B6FF] hover:text-[#38B6FF]"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Slider */}
        <div className="max-w-3xl mx-auto">
          <div
            ref={containerRef}
            className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-gray-300 select-none cursor-col-resize shadow-xl"
            onMouseDown={(e) => { setDragging(true); handleMove(e.clientX); }}
            onMouseMove={(e) => dragging && handleMove(e.clientX)}
            onMouseUp={() => setDragging(false)}
            onMouseLeave={() => setDragging(false)}
            onTouchMove={(e) => handleMove(e.touches[0].clientX)}
          >
            {/* After (full width behind) */}
            <img
              src={GALLERY_TABS[activeTab].after}
              alt={GALLERY_TABS[activeTab].afterAlt}
              className="absolute inset-0 w-full h-full object-cover"
              draggable={false}
            />
            {/* Before (clipped) */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${slider}%` }}
            >
              <img
                src={GALLERY_TABS[activeTab].before}
                alt={GALLERY_TABS[activeTab].beforeAlt}
                className="absolute inset-0 w-full h-full object-cover"
                style={{ width: `${10000 / slider}%`, maxWidth: "none" }}
                draggable={false}
              />
            </div>
            {/* Divider */}
            <div
              className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg pointer-events-none"
              style={{ left: `${slider}%` }}
            />
            {/* Handle */}
            <div
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white shadow-xl flex items-center justify-center pointer-events-none"
              style={{ left: `${slider}%` }}
            >
              <div className="flex gap-0.5">
                <ChevronLeft className="w-3 h-3 text-[#38B6FF]" />
                <ChevronRight className="w-3 h-3 text-[#38B6FF]" />
              </div>
            </div>
            {/* Labels */}
            <div className="absolute bottom-4 left-4 bg-black/60 text-white text-xs font-semibold px-3 py-1 rounded-full">
              Before
            </div>
            <div className="absolute bottom-4 right-4 bg-[#38B6FF] text-white text-xs font-semibold px-3 py-1 rounded-full">
              After
            </div>
          </div>
          <p className="text-center text-[#737373] text-sm mt-4 font-light">
            Drag to compare &mdash; {GALLERY_TABS[activeTab].label}
          </p>
        </div>
      </div>
    </section>
  );
}

function Reviews() {
  const [index, setIndex] = useState(0);
  const visible = 1;

  const prev = () => setIndex((i) => (i - 1 + REVIEWS.length) % REVIEWS.length);
  const next = () => setIndex((i) => (i + 1) % REVIEWS.length);

  return (
    <section className="py-20 lg:py-28 bg-[#1A1A1A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="flex flex-col items-center">
              <StarRow />
              <span className="text-white font-extrabold text-5xl mt-1">4.9</span>
              <span className="text-[#737373] text-sm">84+ Google Reviews</span>
            </div>
          </div>
          <h2 className="font-display text-3xl lg:text-4xl font-extrabold text-white mb-3">
            What Our Customers Say
          </h2>
        </div>

        <div className="relative max-w-2xl mx-auto">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 lg:p-10 min-h-[220px]">
            <StarRow count={REVIEWS[index].stars} />
            <p className="text-white/90 text-lg font-light leading-relaxed mt-5 mb-8">
              &ldquo;{REVIEWS[index].text}&rdquo;
            </p>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-semibold">{REVIEWS[index].name}</p>
                <p className="text-[#737373] text-sm">{REVIEWS[index].date}</p>
              </div>
              <div className="flex items-center gap-1 text-[#737373] text-xs">
                <ThumbsUp className="w-3.5 h-3.5" />
                Google Verified
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:border-[#38B6FF] hover:text-[#38B6FF] transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex gap-2">
              {REVIEWS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className={`rounded-full transition-all duration-200 ${
                    i === index ? "w-6 h-2 bg-[#38B6FF]" : "w-2 h-2 bg-white/30 hover:bg-white/50"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:border-[#38B6FF] hover:text-[#38B6FF] transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactForm() {
  const [form, setForm] = useState({
    firstName: "", lastName: "", phone: "", email: "", message: "",
  });
  const [sent, setSent] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section id="contact" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left copy */}
          <div>
            <p className="text-[#38B6FF] font-semibold text-sm uppercase tracking-widest mb-4">
              Get In Touch
            </p>
            <h2 className="font-display text-3xl lg:text-4xl font-extrabold text-[#1A1A1A] leading-tight mb-6">
              Need a Quick Estimate?
              <span className="block text-[#737373] font-light text-2xl mt-2">
                Contact Central Ohio&apos;s Experts Today.
              </span>
            </h2>
            <p className="text-[#737373] font-light leading-relaxed mb-8 text-base">
              Whether it&apos;s a minor repair or a full commercial project, we
              respond fast and show up on time. Give us a call or fill out the
              form — we&apos;ll get back to you same day.
            </p>

            <div className="space-y-5">
              <a
                href={`tel:${PHONE.replace(/\D/g, "")}`}
                className="flex items-center gap-4 group"
              >
                <div className="w-12 h-12 rounded-full bg-[#38B6FF]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#38B6FF]/20 transition-colors">
                  <Phone className="w-5 h-5 text-[#38B6FF]" />
                </div>
                <div>
                  <p className="text-[#737373] text-xs uppercase tracking-wider font-semibold">Phone</p>
                  <p className="text-[#1A1A1A] font-bold text-lg">{PHONE}</p>
                </div>
              </a>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#38B6FF]/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-[#38B6FF]" />
                </div>
                <div>
                  <p className="text-[#737373] text-xs uppercase tracking-wider font-semibold">Email</p>
                  <p className="text-[#1A1A1A] font-medium">info@ronjonplumbing.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#38B6FF]/10 flex items-center justify-center flex-shrink-0">
                  <Shield className="w-5 h-5 text-[#38B6FF]" />
                </div>
                <div>
                  <p className="text-[#737373] text-xs uppercase tracking-wider font-semibold">License No.</p>
                  <p className="text-[#1A1A1A] font-medium">{LICENSE}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-[#F9F9F9] rounded-2xl p-8 lg:p-10 border border-gray-100">
            {sent ? (
              <div className="text-center py-10">
                <CheckCircle className="w-16 h-16 text-[#38B6FF] mx-auto mb-4" />
                <h3 className="font-display text-2xl font-bold text-[#1A1A1A] mb-2">Message Sent!</h3>
                <p className="text-[#737373] font-light">
                  We&apos;ll be in touch within a few hours. Thanks for reaching out!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#737373] uppercase tracking-wider mb-1.5">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={form.firstName}
                      onChange={handleChange}
                      required
                      placeholder="Ron"
                      className="w-full rounded-xl bg-white border border-gray-200 px-4 py-3 text-sm text-[#1A1A1A] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#38B6FF]/40 focus:border-[#38B6FF] transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#737373] uppercase tracking-wider mb-1.5">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={form.lastName}
                      onChange={handleChange}
                      required
                      placeholder="Smith"
                      className="w-full rounded-xl bg-white border border-gray-200 px-4 py-3 text-sm text-[#1A1A1A] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#38B6FF]/40 focus:border-[#38B6FF] transition"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#737373] uppercase tracking-wider mb-1.5">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    required
                    placeholder="(740) 555-0100"
                    className="w-full rounded-xl bg-white border border-gray-200 px-4 py-3 text-sm text-[#1A1A1A] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#38B6FF]/40 focus:border-[#38B6FF] transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#737373] uppercase tracking-wider mb-1.5">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="you@example.com"
                    className="w-full rounded-xl bg-white border border-gray-200 px-4 py-3 text-sm text-[#1A1A1A] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#38B6FF]/40 focus:border-[#38B6FF] transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#737373] uppercase tracking-wider mb-1.5">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    placeholder="Describe your plumbing issue or project..."
                    className="w-full rounded-xl bg-white border border-gray-200 px-4 py-3 text-sm text-[#1A1A1A] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#38B6FF]/40 focus:border-[#38B6FF] transition resize-none"
                  />
                </div>
                <BlueCTA size="md" className="w-full justify-center">
                  Send Message
                  <ArrowRight className="w-4 h-4" />
                </BlueCTA>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function ServiceAreaBanner() {
  return (
    <section id="area" className="py-16 bg-[#38B6FF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-display text-2xl lg:text-3xl font-extrabold text-white mb-3">
          Proudly Serving Central Ohio
        </h2>
        <p className="text-white/80 font-light mb-10 text-base">
          From Centerburg to Columbus — if you&apos;re within our service area, we&apos;re there.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {SERVICE_AREAS.map((area) => (
            <span
              key={area}
              className="bg-white/20 text-white font-medium text-sm px-4 py-2 rounded-full border border-white/30"
            >
              {area}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[#1A1A1A] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Logo className="brightness-0 invert mb-4" />
            <p className="text-[#737373] text-sm font-light leading-relaxed mb-4">
              Family-owned plumbing serving Central Ohio with honesty,
              craftsmanship, and real accountability since 2003.
            </p>
            <p className="text-[#737373] text-xs">License No. {LICENSE}</p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-5">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {NAV_LINKS.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-[#737373] text-sm hover:text-[#38B6FF] transition-colors font-light"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Areas */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-5">
              Service Areas
            </h4>
            <ul className="space-y-3">
              {SERVICE_AREAS.slice(0, 6).map((area) => (
                <li key={area} className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#38B6FF] flex-shrink-0" />
                  <span className="text-[#737373] text-sm font-light">{area}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-5">
              Contact
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href={`tel:${PHONE.replace(/\D/g, "")}`}
                  className="flex items-center gap-2 text-[#737373] hover:text-[#38B6FF] transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#38B6FF]" />
                  <span className="font-light text-sm">{PHONE}</span>
                </a>
              </li>
              <li className="flex items-center gap-2 text-[#737373]">
                <Mail className="w-4 h-4 text-[#38B6FF]" />
                <span className="font-light text-sm">info@ronjonplumbing.com</span>
              </li>
              <li className="flex items-center gap-2 text-[#737373]">
                <Clock className="w-4 h-4 text-[#38B6FF]" />
                <span className="font-light text-sm">Mon–Fri 7am–6pm<br />Emergency 24/7</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#737373] text-xs font-light">
            &copy; {new Date().getFullYear()} RonJon Plumbing. All rights reserved. License No. {LICENSE}
          </p>
          <div className="flex items-center gap-2 text-[#737373] text-xs">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            4.9 · 84+ Google Reviews · Central Ohio&apos;s Family Plumber
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── app ─────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <div className="font-body antialiased">
      <Navbar />
      <Hero />
      <TrustBadges />
      <Services />
      <About />
      <Gallery />
      <Reviews />
      <ContactForm />
      <ServiceAreaBanner />
      <Footer />
    </div>
  );
}
