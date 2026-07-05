import {
  ArrowUpRight,
  Code2,
  Zap,
  Sparkles,
  Palette,
  MessageSquare,
  PenTool,
  Rocket,
  LifeBuoy,
  Mail,
  Github,
  Linkedin,
  Instagram,
} from "lucide-react";

import OrqelixLogo from "./assets/orqelix.png";
import RitikPhoto from "./assets/ritik.jpeg";
import SidhanshuPhoto from "./assets/sidhanshu.jpeg";
import ShopImage from "./assets/shop.jpg";
import MissingImage from "./assets/missing.jpg";
import LinuxImage from "./assets/linux.jpg";

import {
  SiPython,
  SiOpencv,
  SiPytorch,
  SiPostgresql,
  SiLinux,
  SiReact,
  SiFlutter,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiNodedotjs,
} from "react-icons/si";

import { TbBrain } from "react-icons/tb";
import { motion } from "framer-motion";
import { QEmblem } from "./components/QEmblem";


const technologies = [
  { name: "Python", icon: SiPython, color: "#3776AB" },
  { name: "OpenCV", icon: SiOpencv, color: "#5C3EE8" },
  { name: "YOLOv8", icon: TbBrain, color: "#2563EB" },
  { name: "PyTorch", icon: SiPytorch, color: "#EE4C2C" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#336791" },
  { name: "Linux", icon: SiLinux, color: "#FCC624" },
  { name: "React", icon: SiReact, color: "#61DAFB" },
  { name: "Flutter", icon: SiFlutter, color: "#02569B" },
  { name: "Next.js", icon: SiNextdotjs, color: "#FFFFFF" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
  { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
];

export default function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Nav */}
      <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 py-4">
          <a href="#home" className="flex items-center gap-3">
  <img
    src={OrqelixLogo}
    alt="Orqelix Logo"
    className="h-12 w-auto object-contain"
  />

  <span className="font-[Sora] text-2xl font-bold tracking-tight">
    Orqelix
  </span>
</a>
          <nav className="hidden items-center gap-8 text-sm font-medium text-ink-muted md:flex">
            {["Home", "About", "Services", "Projects", "Process", "Contact"].map((l) => (
              <a key={l} href={`#${l.toLowerCase()}`} className="transition hover:text-foreground">
                {l}
              </a>
            ))}
          </nav>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-brand-foreground shadow-elegant transition hover:opacity-90"
          >
            Let's Work Together <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </header>
      {/* Hero */}
      <section id="home" className="bg-hero relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 md:px-6 pt-12 md:pt-14 pb-10 md:grid-cols-2">
          <div>
            <div className="mb-5 flex flex-wrap items-center gap-2 text-xs font-semibold tracking-widest text-brand">
              <span>AI SOLUTIONS</span>
              <span className="h-1 w-1 rounded-full bg-brand" />
              <span>SOFTWARE DEVELOPMENT</span>
              <span className="h-1 w-1 rounded-full bg-brand" />
              <span>DIGITAL INNOVATION</span>
            </div>
            <h1 className="font-[Sora] text-5xl font-bold leading-[1.05] tracking-tight md:text-6xl">
              We Build Digital Experiences <br />
              That Drive <span className="text-brand-gradient">Real Results.</span>
            </h1>
            <p className="mt-6 max-w-full md:max-w-lg text-base leading-relaxed text-ink-muted">
              Helping businesses and individuals with modern software solutions, automated workflows and stunning digital products.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-brand-foreground shadow-elegant transition hover:opacity-90"
              >
                View My Work <ArrowUpRight className="h-4 w-4" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-6 py-3 text-sm font-semibold transition hover:bg-surface-alt"
              >
                Let's Talk <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Animated Q emblem */}
          <motion.div
  className="
relative
flex
items-center
justify-center
mt-8
md:mt-0
md:-translate-y-10
"
  initial={{ opacity: 0, scale: 0.9 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
>
            <motion.div
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <QEmblem
    height={window.innerWidth < 768 ? 280 : 500}
/>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About + Services */}
      <section id="about" className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-10 md:grid-cols-[1fr_2fr]">
          <div>
            <div className="mb-3 text-xs font-bold tracking-widest text-brand">• ABOUT US</div>
            <h2 className="font-[Sora] text-3xl font-bold md:text-4xl">
              Crafting Solutions <br />With <span className="text-brand-gradient">Purpose.</span>
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-ink-muted">
              We a passionate developer and problem solver who turns ideas into powerful digital products. From concept to deployment, We deliver solutions that are fast, scalable, and built to make an impact.
            </p>
            <a
  href="https://www.instagram.com/orqelix.tech/"
  target="_blank"
  rel="noopener noreferrer"
  className="mt-6 inline-flex rounded-full border border-border px-5 py-2.5 text-sm font-semibold transition-all duration-300 hover:bg-surface-alt hover:-translate-y-1"
>
  Know More About Us →
</a>
          </div>

          <div>
            <div className="mb-6 text-xs font-bold tracking-widest text-brand">• WHAT WE DO</div>
            <div id="services" className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { icon: Code2, title: "Web Development", desc: "Modern, responsive and high performance websites." },
                { icon: Zap, title: "Automation", desc: "Automate workflows and save valuable time." },
                { icon: Sparkles, title: "Custom Solutions", desc: "Tailored solutions for your unique business needs." },
                { icon: Palette, title: "UI/UX Design", desc: "Clean, intuitive and conversion focused designs." },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="group rounded-2xl border border-border bg-surface p-5 shadow-card transition hover:-translate-y-1 hover:shadow-elegant">
                  <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-soft text-brand">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-[Sora] text-base font-bold">{title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-ink-muted">{desc}</p>
                  <a
  href="https://www.instagram.com/orqelix.tech/"
  target="_blank"
  rel="noopener noreferrer"
  className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-brand transition-all duration-300 hover:gap-2"
>
  Explore →
</a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-3 text-center text-xs font-bold tracking-widest text-brand">• FEATURED WORK</div>
        <h2 className="text-center font-[Sora] text-3xl font-bold md:text-4xl">
          Recent <span className="text-brand-gradient">Projects</span>
        </h2>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
  {
    tag: "Desktop App",
    title: "TEFLX Shop Management System",
    desc: "Complete shop management solution with billing, inventory, and reporting.",
    stack: ["Flutter", "Python", "SQLite"],
    github: "https://github.com/TEFLX/Teflx-shop-management",
    image: ShopImage,
  },
  {
    tag: "AI / Machine Learning",
    title: "Missing Component Detection",
    desc: "AI-powered system to detect missing components with high accuracy.",
    stack: ["YOLOv8", "Python", "OpenCV"],
    github: "https://github.com/TEFLX/Missing-componet-detection",
    image: MissingImage,
  },
  {
    tag: "Linux Tool",
    title: "Linux GUI Installer",
    desc: "Linux application installer with GUI and terminal logs.",
    stack: ["Bash", "Python", "GTK"],
    github: "https://github.com/TEFLX/LINUX-APPLICATION-GUI-INSTALLER-WITH-TERMINAL-LOG",
    image: LinuxImage,
  },
].map((p) => (
            <article key={p.title} className="group overflow-hidden rounded-3xl border border-border bg-[oklch(0.15_0.04_265)] text-white shadow-card transition hover:-translate-y-1 hover:shadow-elegant">
              <div className="relative h-52 overflow-hidden">
  <img
    src={p.image}
    alt={p.title}
    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
  />

  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

  <span className="absolute left-4 top-4 rounded-full bg-white/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-white backdrop-blur-md">
    {p.tag}
  </span>
</div>
              <div className="p-6">
                <h3 className="font-[Sora] text-lg font-bold">{p.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-white/60">{p.desc}</p>
                <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-2">
                    {p.stack.map((s) => (
                      <span key={s} className="rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-semibold">
                        {s}
                      </span>
                    ))}
                  </div>
                  <a
  href={p.github}
  target="_blank"
  rel="noopener noreferrer"
  className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand text-brand-foreground transition-all duration-300 hover:scale-110 hover:rotate-12"
>
  <ArrowUpRight className="h-4 w-4" />
</a>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 text-center">
  <a
    href="https://github.com/ORQELIX"
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-brand-foreground shadow-elegant transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
  >
    View All Projects
    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
  </a>
</div>
      </section>

      {/* Process */}
      <section id="process" className="bg-surface-alt py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-3 text-center text-xs font-bold tracking-widest text-brand">• OUR PROCESS</div>
          <h2 className="text-center font-[Sora] text-3xl font-bold md:text-4xl">
            A Simple, Effective <span className="text-brand-gradient">Process</span>
          </h2>

          <div className="relative mt-14 grid gap-8 md:grid-cols-5">
            {[
              { n: "01", icon: MessageSquare, title: "Understand", desc: "We listen, research and understand your goals." },
              { n: "02", icon: PenTool, title: "Plan", desc: "We plan the best approach and create a roadmap." },
              { n: "03", icon: Code2, title: "Build", desc: "We build with clean code and modern technologies." },
              { n: "04", icon: Rocket, title: "Deploy", desc: "We test thoroughly and deliver with confidence." },
              { n: "05", icon: LifeBuoy, title: "Support", desc: "We provide ongoing support and improvements." },
            ].map(({ n, icon: Icon, title, desc }) => (
              <div key={n} className="text-center">
                <div className="mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-surface shadow-card">
                  <Icon className="h-6 w-6 text-brand" />
                </div>
                <div className="text-xs font-bold text-brand">{n}</div>
                <div className="mt-1 font-[Sora] font-bold">{title}</div>
                <p className="mt-2 text-xs leading-relaxed text-ink-muted">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

{/* Tech Stack */}
<section className="mx-auto max-w-7xl px-6 py-20">
  <div className="mb-3 text-center text-xs font-bold tracking-widest text-brand">
    • TECHNOLOGY STACK
  </div>

  <h2 className="text-center font-[Sora] text-3xl font-bold md:text-4xl">
    Technologies <span className="text-brand-gradient">We Work With</span>
  </h2>

  <p className="mx-auto mt-4 max-w-2xl text-center text-ink-muted">
    Leveraging modern technologies to build intelligent software,
    AI-powered solutions, scalable web platforms, mobile applications,
    and business automation.
  </p>

  <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
    {technologies.map(({ name, icon: Icon, color }) => (
      <div
        key={name}
        className="group flex flex-col items-center gap-4 rounded-2xl border border-border bg-surface p-6 shadow-card transition-all duration-300 hover:-translate-y-2 hover:border-brand hover:shadow-elegant"
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand/5 transition-all duration-300 group-hover:bg-brand/10 group-hover:scale-110">
          <Icon
            size={42}
            style={{ color }}
            className="transition-transform duration-300 group-hover:rotate-6"
          />
        </div>

        <span className="text-center text-sm font-semibold">
          {name}
        </span>
      </div>
    ))}
  </div>
</section>

      {/* Team */}
<section className="bg-surface-alt py-20">
  <div className="mx-auto max-w-7xl px-6">
    <div className="mb-3 text-center text-xs font-bold tracking-widest text-brand">
      • OUR TEAM
    </div>

    <h2 className="text-center font-[Sora] text-3xl font-bold md:text-4xl">
      Meet the People Behind{" "}
      <span className="text-brand-gradient">Orqelix</span>
    </h2>

    <p className="mx-auto mt-4 max-w-2xl text-center text-sm leading-7 text-ink-muted">
      A passionate founding team dedicated to building innovative software,
      AI-powered solutions, and digital products that create real business
      impact.
    </p>

    <div className="mt-14 grid gap-8 md:grid-cols-2">

      {/* Founder */}
      <div className="rounded-3xl border border-border bg-surface p-8 shadow-card transition duration-300 hover:-translate-y-2 hover:shadow-elegant">
        <img
          src={RitikPhoto}
          alt="Ritik Kashyap"
          className="h-24 w-24 rounded-full object-cover ring-4 ring-brand/20"
        />

        <h3 className="mt-6 font-[Sora] text-2xl font-bold">
          Ritik Kashyap
        </h3>

        <p className="mt-1 font-semibold text-brand">
          Engineer
        </p>

        <p className="mt-5 text-sm leading-7 text-ink-muted">
          Leads Orqelix with a passion for innovation, delivering AI-driven solutions, modern web platforms, custom applications, and digital products that help businesses grow and adapt in a rapidly evolving world.
        </p>

        <a
          href="https://www.linkedin.com/in/ritik-kashyap-290688146/"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 font-medium text-brand transition hover:gap-3"
        >
          <Linkedin className="h-5 w-5" />
          Connect on LinkedIn
        </a>
      </div>

      {/* Co-Founder */}
      <div className="rounded-3xl border border-border bg-surface p-8 shadow-card transition duration-300 hover:-translate-y-2 hover:shadow-elegant">
        <img
          src={SidhanshuPhoto}
          alt="Sidhanshu"
          className="h-24 w-24 rounded-full object-cover ring-4 ring-brand/20"
        />

        <h3 className="mt-6 font-[Sora] text-2xl font-bold">
          Sidhanshu
        </h3>

        <p className="mt-1 font-semibold text-brand">
          Developer
        </p>

        <p className="mt-5 text-sm leading-7 text-ink-muted">
          Co-leads Orqelix by combining technology, creativity, and strategic thinking to build reliable digital solutions, foster strong client partnerships, and drive sustainable business growth.
        </p>

        <a
          href="https://www.linkedin.com/in/sidhanshu783"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 font-medium text-brand transition hover:gap-3"
        >
          <Linkedin className="h-5 w-5" />
          Connect on LinkedIn
        </a>
      </div>

    </div>
  </div>
</section>

      {/* CTA */}
      <section id="contact" className="mx-auto max-w-7xl px-6 pt-20 pb-8">
        
        <div
  className="
    relative
    overflow-hidden
    rounded-3xl
    bg-gradient-to-br
    from-[#162A72]
    via-[#1B3FA8]
    to-[#081126]
    md:bg-[#09112d]
    p-10
    text-white
    shadow-elegant
    md:p-14
  "
>
        {/* Core white glow */}
<div className="absolute left-[20px] top-1/2 h-[380px] w-[380px] -translate-y-1/2 rounded-full bg-white opacity-30 md:opacity-70 blur-[70px]"
/>
          {/* White glow behind logo */}
<div
  className="absolute left-[-220px] top-1/2
             h-[900px] w-[900px]
             -translate-y-1/2
             rounded-full
             bg-white
             opacity-35 md:opacity-90
             blur-[170px]"
/>
{/* Blue transition */}
<div
  className="absolute left-[260px] top-1/2
             h-[700px] w-[700px]
             -translate-y-1/2
             rounded-full
             bg-blue-500/10 md:bg-blue-500/20
             blur-[150px]"
/>
{/* Accent glow on top-right */}
<div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-indigo-500/30 blur-[140px]" />
<div className="absolute inset-0 bg-gradient-to-r
from-white/10
via-blue-500/10
to-[#09112d]" />

          <div className="relative grid items-start gap-8 md:grid-cols-[1fr_1.2fr]">
           <div className="flex items-start justify-center mt-8 md:-mt-20 ">
            <QEmblem
    height={window.innerWidth < 768 ? 280 : 500}
/>
            </div>
            <div className="mt-20">
              <div className="text-xs font-bold tracking-widest text-brand-soft">LET'S BUILD SOMETHING AMAZING</div>
              <h2 className="mt-3 font-[Sora] text-3xl font-bold md:text-4xl">Have a Project in Mind?</h2>
              <p className="mt-3 text-sm text-white/70">
                From concept to deployment, we build intelligent software, AI-powered solutions, and scalable digital products that help businesses grow with confidence.
              </p>
              <a href="mailto:orqelix@gmail.com" className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-brand-foreground">
                Get In Touch <ArrowUpRight className="h-4 w-4" />
              </a>
              <div className="mt-8 flex flex-wrap items-center gap-10 text-sm">
                <div className="flex items-center gap-2"><Mail className="h-4 w-4 text-brand-soft" /> orqelix@gmail.com</div>
                <div className="flex items-center gap-2"><Linkedin className="h-4 w-4 text-brand-soft" />Orqelix</div>
                <div className="flex items-center gap-2"><Github className="h-4 w-4 text-brand-soft" /> ORQELIX</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
<footer className="border-t border-border">

  <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-4">

    {/* Company */}
    <div>
      <div className="flex items-center gap-3">

        <img
          src={OrqelixLogo}
          alt="Orqelix Logo"
          className="h-12 w-auto object-contain"
        />

        <span className="font-[Sora] text-xl font-bold">
          ORQELIX
        </span>

      </div>

      <p className="mt-4 text-sm leading-6 text-ink-muted">
        Building innovative software, AI-powered solutions, web applications,
        and digital experiences that help businesses grow.
      </p>

      <div className="mt-5 flex gap-4 text-ink-muted">

        <a
          href="https://github.com/ORQELIX"
          target="_blank"
          rel="noopener noreferrer"
          className="transition hover:text-brand"
        >
          <Github className="h-5 w-5" />
        </a>

        <a
          href="https://www.linkedin.com/company/orqelix"
          target="_blank"
          rel="noopener noreferrer"
          className="transition hover:text-brand"
        >
          <Linkedin className="h-5 w-5" />
        </a>

        <a
          href="https://www.instagram.com/orqelix.tech/"
          target="_blank"
          rel="noopener noreferrer"
          className="transition hover:text-brand"
        >
          <Instagram className="h-5 w-5" />
        </a>

      </div>
    </div>

    {/* Quick Links */}
    <div>
      <h3 className="font-[Sora] font-bold">
        Quick Links
      </h3>

      <ul className="mt-4 space-y-2 text-sm text-ink-muted">

        <li><a href="#home" className="transition hover:text-brand">Home</a></li>

        <li><a href="#about" className="transition hover:text-brand">About</a></li>

        <li><a href="#services" className="transition hover:text-brand">Services</a></li>

        <li><a href="#projects" className="transition hover:text-brand">Projects</a></li>

        <li><a href="#contact" className="transition hover:text-brand">Contact</a></li>

      </ul>
    </div>

    {/* Services */}
    <div>

      <h3 className="font-[Sora] font-bold">
        Services
      </h3>

      <ul className="mt-4 space-y-2 text-sm text-ink-muted">

        <li><a href="#services" className="transition hover:text-brand">Web Development</a></li>

        <li><a href="#services" className="transition hover:text-brand">Mobile Applications</a></li>

        <li><a href="#services" className="transition hover:text-brand">Desktop Applications</a></li>

        <li><a href="#services" className="transition hover:text-brand">Automation</a></li>

        <li><a href="#services" className="transition hover:text-brand">Custom Solutions</a></li>

        <li><a href="#services" className="transition hover:text-brand">UI / UX Design</a></li>

      </ul>

    </div>

    {/* Contact */}
    <div>

      <h3 className="font-[Sora] font-bold">
        Let's Connect
      </h3>

      <ul className="mt-4 space-y-3 text-sm text-ink-muted">

        <li>
          <a
            href="mailto:orqelix@gmail.com"
            className="transition hover:text-brand"
          >
            orqelix@gmail.com
          </a>
        </li>

        <li>
          <a
            href="https://www.linkedin.com/company/orqelix"
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-brand"
          >
            LinkedIn
          </a>
        </li>

        <li>
          <a
            href="https://github.com/ORQELIX"
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-brand"
          >
            GitHub
          </a>
        </li>

        <li>
          <a
            href="https://www.instagram.com/orqelix.tech/"
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-brand"
          >
            Instagram
          </a>
        </li>

      </ul>

    </div>

  </div>

  {/* Bottom Footer */}

  <div className="border-t border-border">

    <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-5 text-xs text-ink-muted md:flex-row">

      <p>
        © 2026 ORQELIX. All rights reserved.
      </p>

      <p>
        Designed & Developed with ❤️ by ORQELIX
      </p>

    </div>

  </div>

</footer>
    </div>
  );
}
