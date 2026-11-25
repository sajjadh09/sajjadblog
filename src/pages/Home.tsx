import React, { useEffect, useMemo, useRef, useState } from 'react';
import emailjs from 'emailjs-com';
import {
  Code2, Monitor, PenLine, Github, ArrowUpRight, Moon, Sun, Menu, X,
  Send, CheckCircle, AlertCircle, ChevronDown, Bot, Store, Globe,
} from 'lucide-react';
import { projects, blogPosts } from '../data';
import '../portfolio.css';

const GITHUB = 'https://github.com/sajjadh09';

const roles = [
  {
    id: 'engineer',
    tab: 'Software Engineer',
    icon: Code2,
    title: 'Software Engineer',
    lede:
      'Software Engineering student at FUT Minna building web apps, AI tools and online shops. I work in React, TypeScript and Python, and I ship everything live on Vercel.',
    cta: { label: 'View GitHub', href: GITHUB, external: true },
  },
  {
    id: 'web',
    tab: 'Web Developer',
    icon: Monitor,
    title: 'Web Developer',
    lede:
      'I build fast websites and online shops for Nigerian businesses that still sell only on WhatsApp and Instagram: a proper catalogue, cart, Paystack checkout and an owner dashboard.',
    cta: { label: 'See client work', href: '#projects', external: false },
  },
  {
    id: 'writer',
    tab: 'Writer',
    icon: PenLine,
    title: 'Tech Writer',
    lede:
      'I write about Python, AI and modern web development for beginners and business owners, plus articles and books on Islamic themes.',
    cta: { label: 'Read articles', href: '#articles', external: false },
  },
];

const stack = [
  'javascript', 'typescript', 'python', 'react', 'next.js', 'vite', 'tailwind css',
  'html/css', 'node.js', 'git', 'vercel', 'paystack', 'gemini api', 'wordpress',
];

const filters = ['All', 'Web app', 'Client demo', 'AI'] as const;

function useTyped(text: string, speed = 55) {
  const [out, setOut] = useState('');
  useEffect(() => {
    setOut('');
    let i = 0;
    const t = setInterval(() => {
      i += 1;
      setOut(text.slice(0, i));
      if (i >= text.length) clearInterval(t);
    }, speed);
    return () => clearInterval(t);
  }, [text, speed]);
  return out;
}

export default function Home() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [role, setRole] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hideNav, setHideNav] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [filter, setFilter] = useState<(typeof filters)[number]>('All');
  const [openPost, setOpenPost] = useState<number | null>(null);
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'err'>('idle');
  const heroRef = useRef<HTMLElement>(null);

  const current = roles[role];
  const typed = useTyped(current.title);

  // theme
  useEffect(() => {
    const saved = (localStorage.getItem('pf-theme') as 'light' | 'dark') ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    setTheme(saved);
  }, []);
  useEffect(() => {
    document.documentElement.dataset.pf = theme;
    localStorage.setItem('pf-theme', theme);
  }, [theme]);

  // floating nav: hide on scroll down, show on scroll up + progress bar
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? y / max : 0);
      setScrolled(y > 10);
      setHideNav(y > 160 && y > last && !menuOpen);
      last = y;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [menuOpen]);

  // float-in on scroll
  useEffect(() => {
    const els = document.querySelectorAll('.pf-reveal');
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.setAttribute('data-in', ''); io.unobserve(e.target); }
      }),
      { threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [filter]);

  // come back to the same spot after opening a project page
  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    const saved = sessionStorage.getItem('pf-scroll');
    if (!saved) return;
    sessionStorage.removeItem('pf-scroll');
    const { title, offset } = JSON.parse(saved) as { title: string; offset: number };
    document.querySelectorAll('.pf-reveal').forEach((el) => el.setAttribute('data-in', ''));
    const jump = () => {
      const card = document.querySelector<HTMLElement>(`[data-project="${CSS.escape(title)}"]`);
      if (card) window.scrollTo({ top: card.getBoundingClientRect().top + window.scrollY - Math.max(offset, 90), behavior: 'instant' as ScrollBehavior });
    };
    requestAnimationFrame(jump);
    setTimeout(jump, 1200); // after the typed headline settles
  }, []);
  const rememberSpot = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const card = e.currentTarget.closest<HTMLElement>('[data-project]');
    if (card) sessionStorage.setItem('pf-scroll', JSON.stringify({ title: card.dataset.project, offset: card.getBoundingClientRect().top }));
  };

  // pointer glow in hero
  const onHeroMove = (e: React.MouseEvent) => {
    const r = heroRef.current?.getBoundingClientRect();
    if (!r) return;
    heroRef.current!.style.setProperty('--mx', `${e.clientX - r.left}px`);
    heroRef.current!.style.setProperty('--my', `${e.clientY - r.top}px`);
  };

  const shown = useMemo(
    () => (filter === 'All' ? projects : projects.filter((p) => p.kind === filter)),
    [filter],
  );
  const liveCount = projects.filter((p) => p.demoLink?.startsWith('http')).length;

  const go = (href: string) => {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const d = new FormData(form);
    setStatus('sending');
    emailjs
      .send('service_3hmh0hd', 'template_kzw4u89', {
        contact_form_name: d.get('name'),
        contact_form_email: d.get('email'),
        contact_form_subject: d.get('subject'),
        contact_form_message: d.get('message'),
      }, 'tQg-ORHKROt-NGZdR')
      .then(() => { setStatus('ok'); form.reset(); setTimeout(() => setStatus('idle'), 5000); })
      .catch(() => { setStatus('err'); setTimeout(() => setStatus('idle'), 5000); });
  };

  const nav = [
    ['About', '#about'], ['Projects', '#projects'], ['Articles', '#articles'],
    ['Services', '#services'], ['Contact', '#contact'],
  ];

  return (
    <div className="pf">
      <div className="pf-progress" style={{ transform: `scaleX(${progress})` }} />

      {/* floating header */}
      <header className={`pf-header ${hideNav ? 'is-hidden' : ''} ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="pf-header-in">
          <a href="#top" className="pf-logo" onClick={(e) => { e.preventDefault(); go('#top'); }}>
            Sajjad <span className="pf-badge">Dev</span>
          </a>
          <nav className="pf-nav">
            {nav.map(([label, href]) => (
              <a key={href} href={href} onClick={(e) => { e.preventDefault(); go(href); }}>{label}</a>
            ))}
          </nav>
          <div className="pf-header-actions">
            <button
              className={`pf-switch ${theme === 'dark' ? 'on' : ''}`}
              aria-label="Toggle dark mode"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              <span>{theme === 'dark' ? <Moon size={13} /> : <Sun size={13} />}</span>
            </button>
            <button className="pf-icon-btn pf-burger" aria-label="Menu" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="pf-mobile-nav">
            {nav.map(([label, href]) => (
              <a key={href} href={href} onClick={(e) => { e.preventDefault(); go(href); }}>{label}</a>
            ))}
            <a href={GITHUB} target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={14} /></a>
          </div>
        )}
      </header>

      <main id="top">
        {/* hero */}
        <section className="pf-hero" ref={heroRef} onMouseMove={onHeroMove}>
          <div className="pf-glow" aria-hidden />
          <div className="pf-wrap">
            <div className="pf-tabs" role="tablist">
              {roles.map((r, i) => {
                const Icon = r.icon;
                return (
                  <button
                    key={r.id}
                    role="tab"
                    aria-selected={i === role}
                    className={i === role ? 'active' : ''}
                    onClick={() => setRole(i)}
                  >
                    <Icon size={16} /> {r.tab}
                  </button>
                );
              })}
            </div>

            <div className="pf-hero-grid">
              <div key={current.id} className="pf-hero-copy">
                <current.icon size={30} strokeWidth={2.2} className="pf-hero-icon" />
                <h1>
                  {typed}
                  <span className="pf-caret" aria-hidden>_</span>
                </h1>
                <p className="pf-lede">{current.lede}</p>
                <div className="pf-btns">
                  {current.cta.external ? (
                    <a className="pf-btn pf-btn-dark" href={current.cta.href} target="_blank" rel="noreferrer">
                      <Github size={17} /> {current.cta.label}
                    </a>
                  ) : (
                    <a className="pf-btn pf-btn-dark" href={current.cta.href}
                      onClick={(e) => { e.preventDefault(); go(current.cta.href); }}>
                      {current.cta.label}
                    </a>
                  )}
                  <a className="pf-btn pf-btn-ghost" href="#contact" onClick={(e) => { e.preventDefault(); go('#contact'); }}>
                    Say hello
                  </a>
                </div>
              </div>

              {/* floating terminal */}
              <div className="pf-terminal-float">
                <div className="pf-terminal">
                  <div className="pf-term-bar">
                    <span className="dots"><i /><i /><i /></span>
                    <span>~/sajjad</span>
                    <span className="muted">zsh</span>
                  </div>
                  <div className="pf-term-body">
                    <p><b>$</b> whoami</p>
                    <p className="out">Sajjad Hassan, SWE student @ FUT Minna</p>
                    <p><b>$</b> cat location.txt</p>
                    <p className="out">Abuja, Nigeria 🇳🇬</p>
                    <p><b>$</b> ls ./stack</p>
                    <p className="out stack">{stack.map((s) => <span key={s}>{s}</span>)}</p>
                    <p><b>$</b> status</p>
                    <p className="out"><span className="pf-live-dot" /> open to freelance work</p>
                    <p><b>$</b> <span className="pf-block-caret" /></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* floating marquee */}
        <div className="pf-marquee" aria-hidden>
          <div className="pf-marquee-track">
            {[...stack, ...stack].map((s, i) => (
              <span key={i}><b>{'</>'}</b> {s}</span>
            ))}
          </div>
        </div>

        {/* stats */}
        <section className="pf-wrap pf-stats pf-reveal">
          <div><b>{projects.length}</b><span>Projects on GitHub</span></div>
          <div><b>{liveCount}</b><span>Live sites</span></div>
          <div><b>{blogPosts.length}</b><span>Articles</span></div>
          <div><b>300L</b><span>Software Engineering</span></div>
        </section>

        {/* about */}
        <section id="about" className="pf-section pf-wrap">
          <div className="pf-head pf-reveal">
            <span className="pf-kicker">01 / about</span>
            <h2>Code that helps real businesses.</h2>
          </div>
          <div className="pf-about">
            <div className="pf-reveal">
              <p>
                I'm Sajjad, a Software Engineering student at the Federal University of Technology, Minna.
                I build responsive websites, React apps and Python AI tools, and I help local businesses
                in Abuja go digital with online shops that actually take orders.
              </p>
              <p>
                When I'm not coding, I'm writing: tutorials on Python and the modern web, and pieces on Islamic themes.
              </p>
            </div>
            <ul className="pf-now pf-reveal">
              <li><Store size={18} /><div><b>Building</b><span>Online shops for Abuja food and fashion brands</span></div></li>
              <li><Bot size={18} /><div><b>Exploring</b><span>AI tools with Python and the Gemini API</span></div></li>
              <li><Globe size={18} /><div><b>Shipping</b><span>Everything live on Vercel, source on GitHub</span></div></li>
            </ul>
          </div>
        </section>

        {/* projects */}
        <section id="projects" className="pf-section pf-wrap">
          <div className="pf-head pf-reveal">
            <span className="pf-kicker">02 / projects</span>
            <h2>Things I've built.</h2>
            <a className="pf-more" href={GITHUB} target="_blank" rel="noreferrer">All repos <ArrowUpRight size={15} /></a>
          </div>
          <div className="pf-chips pf-reveal">
            {filters.map((f) => (
              <button key={f} className={f === filter ? 'on' : ''} onClick={() => setFilter(f)}>{f}</button>
            ))}
          </div>
          <div className="pf-grid">
            {shown.map((p) => (
              <article key={p.title} data-project={p.title} className="pf-card pf-reveal">
                <div className="pf-card-top">
                  <span className="pf-kind">{p.kind}</span>
                  <span className={`pf-status s-${p.status.toLowerCase()}`}>{p.status}</span>
                </div>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
                <div className="pf-tags">{p.tech.map((t) => <span key={t}>{t}</span>)}</div>
                <div className="pf-card-links">
                  {p.link && (
                    <a href={p.link} target="_blank" rel="noreferrer"><Github size={15} /> Source</a>
                  )}
                  {p.demoLink && (
                    <a href={p.demoLink} target={p.demoLink.startsWith('http') ? '_blank' : undefined} rel="noreferrer"
                      onClick={p.demoLink.startsWith('http') ? undefined : rememberSpot}>
                      <ArrowUpRight size={15} /> Live
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* articles */}
        <section id="articles" className="pf-section pf-wrap">
          <div className="pf-head pf-reveal">
            <span className="pf-kicker">03 / writing</span>
            <h2>Articles.</h2>
          </div>
          <div className="pf-posts">
            {blogPosts.map((post, i) => (
              <div key={post.title} className={`pf-post pf-reveal ${openPost === i ? 'open' : ''}`}>
                <button className="pf-post-row" onClick={() => setOpenPost(openPost === i ? null : i)}>
                  <span className="pf-post-date">{post.date}</span>
                  <span className="pf-post-title">
                    <b>{post.title}</b>
                    <small>{post.excerpt}</small>
                  </span>
                  <ChevronDown size={18} className="pf-chev" />
                </button>
                {openPost === i && (
                  <div className="pf-article" dangerouslySetInnerHTML={{ __html: post.content }} />
                )}
              </div>
            ))}
          </div>
        </section>

        {/* services */}
        <section id="services" className="pf-section pf-wrap">
          <div className="pf-head pf-reveal">
            <span className="pf-kicker">04 / services</span>
            <h2>What I can build for you.</h2>
          </div>
          <div className="pf-services">
            {[
              { icon: Store, t: 'Business websites and shops', d: 'A catalogue, cart and checkout your customers can use without sending you a DM first.' },
              { icon: Bot, t: 'AI and automation', d: 'Python bots and small AI tools that save your business time on repeat work.' },
              { icon: Monitor, t: 'Web apps', d: 'Dashboards, booking and ticketing apps built in React and TypeScript.' },
            ].map(({ icon: Icon, t, d }) => (
              <div key={t} className="pf-service pf-reveal">
                <Icon size={22} />
                <h3>{t}</h3>
                <p>{d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* contact */}
        <section id="contact" className="pf-section pf-wrap">
          <div className="pf-contact pf-reveal">
            <div>
              <span className="pf-kicker">05 / contact</span>
              <h2>Let's build something.</h2>
              <p className="pf-lede">Have a business that needs a website, or a project idea? Send a message and I'll reply soon.</p>
              <a className="pf-btn pf-btn-ghost" href={GITHUB} target="_blank" rel="noreferrer"><Github size={17} /> github.com/sajjadh09</a>
            </div>
            <form className="pf-form" onSubmit={submit}>
              {status === 'ok' && <div className="pf-alert ok"><CheckCircle size={18} /> Message sent. I'll get back to you soon.</div>}
              {status === 'err' && <div className="pf-alert err"><AlertCircle size={18} /> Something went wrong. Please try again.</div>}
              <div className="pf-row">
                <input name="name" placeholder="Your name" required disabled={status === 'sending'} />
                <input name="email" type="email" placeholder="Your email" required disabled={status === 'sending'} />
              </div>
              <input name="subject" placeholder="What's it about?" required disabled={status === 'sending'} />
              <textarea name="message" rows={5} placeholder="Tell me about your project..." required disabled={status === 'sending'} />
              <button className="pf-btn pf-btn-dark" type="submit" disabled={status === 'sending'}>
                <Send size={16} /> {status === 'sending' ? 'Sending...' : 'Send message'}
              </button>
            </form>
          </div>
        </section>
      </main>

      <footer className="pf-footer">
        <div className="pf-wrap">
          <span>© {new Date().getFullYear()} Sajjad Hassan</span>
          <span className="muted">Built with React and Vite. Hosted on Vercel.</span>
        </div>
      </footer>
    </div>
  );
}
