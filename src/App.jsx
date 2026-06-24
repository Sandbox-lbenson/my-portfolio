import { useEffect, useMemo, useState } from 'react';
import { Icon } from '@iconify/react';
import { AnimatePresence, motion, MotionConfig, useReducedMotion } from 'framer-motion';
import {
  Link,
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';
import { projects, skills } from './data/projects';

const navItems = [
  { label: 'About', target: 'about' },
  { label: 'Skills', target: 'skills' },
  { label: 'Work', target: 'work' },
  { label: 'Notes', path: '/blog' },
  { label: 'Resume', path: '/resume' },
  { label: 'Contact', target: 'contact', cta: true },
];

const socials = [
  {
    label: 'GitHub',
    href: 'https://github.com/tm-LBenson',
    icon: 'mdi:github',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/tm-lewis-benson/',
    icon: 'mdi:linkedin',
  },
  {
    label: 'Email',
    href: 'mailto:tm.lewisbenson@gmail.com',
    icon: 'mdi:email-outline',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0 },
};

const revealContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.96, y: 18 },
  show: { opacity: 1, scale: 1, y: 0 },
};

const heroSignals = [
  { label: 'IAM', icon: 'mdi:shield-key-outline', x: 68, y: 25, delay: 0 },
  { label: 'SSO', icon: 'mdi:key-chain', x: 86, y: 39, delay: 0.28 },
  { label: 'AD', icon: 'mdi:server-network', x: 63, y: 58, delay: 0.48 },
  { label: 'API', icon: 'mdi:api', x: 82, y: 70, delay: 0.18 },
];

const heroStats = [
  {
    label: 'IAM',
    detail: 'RapidIdentity escalations',
    icon: 'mdi:shield-key-outline',
  },
  {
    label: 'SaaS',
    detail: 'Sold production app',
    icon: 'mdi:rocket-launch-outline',
  },
  {
    label: 'Labs',
    detail: 'Hyper-V, AD, Azure',
    icon: 'mdi:server-network',
  },
];

function Monogram({ size = 44 }) {
  return (
    <svg
      className="monogram"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        d="M12 2C6.476 2 2 6.476 2 12C2 17.524 6.476 22 12 22C17.524 22 22 17.524 22 12C22 6.476 17.524 2 12 2Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path d="M5 5V19H12V17H7V5Z" fill="currentColor" />
      <path
        d="M13 5.75H17C18.6569 5.75 20 7.09315 20 8.75C20 10.4069 18.6569 11.75 17 11.75H13V5.75Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M13 12.25H17C18.6569 12.25 20 13.5931 20 15.25C20 16.9069 18.6569 18.25 17 18.25H13V12.25Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function LoadingSplash({ onDone }) {
  useEffect(() => {
    const timer = window.setTimeout(onDone, 1350);
    return () => window.clearTimeout(timer);
  }, [onDone]);

  return (
    <motion.div
      className="loading-splash"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.55 }}
    >
      <motion.div
        initial={{ scale: 0.82, opacity: 0 }}
        animate={{ scale: 1, opacity: 1, rotate: [0, 0, -2, 2, 0] }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
        className="loading-splash__mark"
      >
        <Monogram size={86} />
      </motion.div>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.45 }}
      >
        Building useful systems.
      </motion.p>
    </motion.div>
  );
}

function useHomeNav() {
  const navigate = useNavigate();
  const location = useLocation();

  return (target) => {
    if (!target) return;

    const scroll = () => {
      document.getElementById(target)?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    };

    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: target } });
      return;
    }

    scroll();
  };
}

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const navigateHome = useHomeNav();
  const location = useLocation();

  useEffect(() => {
    let lastY = window.scrollY;

    const handleScroll = () => {
      const currentY = window.scrollY;
      setIsHidden(currentY > 140 && currentY > lastY);
      lastY = currentY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('menu-open', isOpen);
    return () => document.body.classList.remove('menu-open');
  }, [isOpen]);

  const handleNav = (item) => {
    setIsOpen(false);
    if (item.target) {
      navigateHome(item.target);
    }
  };

  return (
    <motion.header
      className={`site-header${isHidden ? ' is-hidden' : ''}`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <Link className="brand" to="/" aria-label="Lewis Benson home">
        <Monogram />
        <span>Lewis Benson</span>
      </Link>

      <nav className="desktop-nav" aria-label="Primary navigation">
        {navItems.map((item) =>
          item.path ? (
            <Link
              key={item.label}
              className={`nav-link${location.pathname === item.path ? ' active' : ''}`}
              to={item.path}
            >
              {item.label}
            </Link>
          ) : (
            <button
              key={item.label}
              className={`nav-link${item.cta ? ' nav-link--cta' : ''}`}
              type="button"
              onClick={() => handleNav(item)}
            >
              {item.label}
            </button>
          ),
        )}
      </nav>

      <button
        className="icon-button mobile-menu-button"
        type="button"
        aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
      >
        <Icon icon={isOpen ? 'mdi:close' : 'mdi:menu'} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.nav
            className="mobile-nav-panel"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            aria-label="Mobile navigation"
          >
            {navItems.map((item) =>
              item.path ? (
                <Link
                  key={item.label}
                  className="mobile-nav-panel__link"
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ) : (
                <button
                  key={item.label}
                  className="mobile-nav-panel__link"
                  type="button"
                  onClick={() => handleNav(item)}
                >
                  {item.label}
                </button>
              ),
            )}
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

function SectionHeading({ eyebrow, title, children }) {
  return (
    <motion.div
      className="section-heading"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-90px' }}
      variants={revealContainer}
    >
      <motion.p variants={fadeUp}>{eyebrow}</motion.p>
      <motion.h2 variants={fadeUp}>{title}</motion.h2>
      {children && <motion.span variants={fadeUp}>{children}</motion.span>}
    </motion.div>
  );
}

function HeroBackdrop() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="hero__media" aria-hidden="true">
      <div className="hero__portrait-light" />
      <motion.div
        className="hero__trace hero__trace--one"
        animate={shouldReduceMotion ? undefined : { x: ['-18%', '18%', '-18%'] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="hero__trace hero__trace--two"
        animate={shouldReduceMotion ? undefined : { x: ['14%', '-16%', '14%'] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="hero__signal-map"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.7 }}
      >
        {heroSignals.map((signal) => (
          <motion.span
            className="hero-signal"
            key={signal.label}
            style={{
              '--signal-x': `${signal.x}%`,
              '--signal-y': `${signal.y}%`,
            }}
            animate={
              shouldReduceMotion
                ? undefined
                : {
                    y: [0, -7, 0],
                    opacity: [0.78, 1, 0.78],
                  }
            }
            transition={{
              delay: signal.delay,
              duration: 3.8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <Icon icon={signal.icon} />
            <small>{signal.label}</small>
          </motion.span>
        ))}
      </motion.div>
      <motion.div
        className="hero__scan"
        animate={shouldReduceMotion ? undefined : { y: ['-18%', '118%'] }}
        transition={{ duration: 4.8, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  );
}

function Hero() {
  const navigateHome = useHomeNav();

  return (
    <section className="hero" aria-labelledby="hero-title">
      <HeroBackdrop />
      <motion.div
        className="hero__content"
        initial="hidden"
        animate="show"
        variants={revealContainer}
      >
        <motion.p variants={fadeUp} className="eyebrow">
          Enterprise identity engineer and software builder
        </motion.p>
        <motion.h1 variants={fadeUp} id="hero-title">
          Lewis Benson
        </motion.h1>
        <motion.p variants={fadeUp} className="hero__lede">
          I build production tools, identity automations, and support workflows
          that turn messy operational problems into systems people can trust.
        </motion.p>
        <motion.div variants={fadeUp} className="hero__actions">
          <button type="button" className="button button--primary" onClick={() => navigateHome('work')}>
            <Icon icon="mdi:briefcase-outline" />
            Case studies
          </button>
          <Link className="button button--ghost" to="/resume">
            <Icon icon="mdi:file-document-outline" />
            Resume
          </Link>
        </motion.div>
        <motion.div variants={fadeUp} className="hero__stats" aria-label="Career highlights">
          {heroStats.map((stat) => (
            <motion.span
              key={stat.label}
              variants={scaleIn}
              whileHover={{ y: -4 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            >
              <Icon icon={stat.icon} />
              <strong>{stat.label}</strong>
              {stat.detail}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

function About() {
  return (
    <section className="section about" id="about">
      <SectionHeading eyebrow="About" title="Support depth, builder instincts">
        I work where software, infrastructure, and customer impact meet.
      </SectionHeading>
      <motion.div
        className="about__grid"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-100px' }}
        variants={revealContainer}
      >
        <motion.div className="about__copy" variants={scaleIn}>
          <p>
            My day-to-day work is enterprise identity engineering: escalations,
            IAM, SSO, provisioning, directory sync, automation, log analysis,
            issue reproduction, and clear customer communication.
          </p>
          <p>
            I also build software when a problem deserves a tool. Northstar VSS
            became production software for fleet operations. Big-Log Viewer
            solved a real multi-gigabyte log inspection problem. nvimwiz turns a
            developer onboarding pain point into a guided TUI.
          </p>
        </motion.div>
        <motion.div className="about__portrait" variants={scaleIn}>
          <img src="/selfie.png" alt="Lewis Benson" />
        </motion.div>
      </motion.div>
    </section>
  );
}

function Skills() {
  return (
    <section className="section skills" id="skills">
      <SectionHeading eyebrow="Skills" title="Tools I reach for">
        Practical skills across identity platforms, application code, and
        infrastructure.
      </SectionHeading>
      <div className="skills__grid">
        {skills.map((skillGroup) => (
          <motion.div
            className="skill-group"
            key={skillGroup.group}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.45 }}
          >
            <h3>{skillGroup.group}</h3>
            <ul>
              {skillGroup.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ project, index }) {
  const shouldReduceMotion = useReducedMotion();
  const [cardMotion, setCardMotion] = useState({
    rotateX: 0,
    rotateY: 0,
    glowX: '50%',
    glowY: '50%',
    mediaX: '0px',
    mediaY: '0px',
  });

  const handlePointerMove = (event) => {
    if (shouldReduceMotion || event.pointerType === 'touch') return;

    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    setCardMotion({
      rotateX: (0.5 - y) * 7,
      rotateY: (x - 0.5) * 8,
      glowX: `${x * 100}%`,
      glowY: `${y * 100}%`,
      mediaX: `${(x - 0.5) * -12}px`,
      mediaY: `${(y - 0.5) * -10}px`,
    });
  };

  const resetCardMotion = () => {
    setCardMotion({
      rotateX: 0,
      rotateY: 0,
      glowX: '50%',
      glowY: '50%',
      mediaX: '0px',
      mediaY: '0px',
    });
  };

  return (
    <motion.article
      className="project-card"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.45, delay: Math.min(index * 0.05, 0.2) }}
    >
      <motion.div
        className="project-card__surface"
        onPointerMove={handlePointerMove}
        onPointerLeave={resetCardMotion}
        animate={
          shouldReduceMotion
            ? undefined
            : {
                rotateX: cardMotion.rotateX,
                rotateY: cardMotion.rotateY,
              }
        }
        style={{
          '--glow-x': cardMotion.glowX,
          '--glow-y': cardMotion.glowY,
          '--media-x': cardMotion.mediaX,
          '--media-y': cardMotion.mediaY,
        }}
        transition={{ type: 'spring', stiffness: 260, damping: 24 }}
      >
        <Link to={`/projects/${project.slug}`} className="project-card__link">
          <div className="project-card__image">
            <img src={project.image} alt="" loading="lazy" />
            {project.logo && <img className="project-card__logo" src={project.logo} alt="" loading="lazy" />}
          </div>
          <div className="project-card__content">
            <p>{project.type}</p>
            <h3>{project.name}</h3>
            <span>{project.summary}</span>
            <ul>
              {project.tags.slice(0, 4).map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          </div>
        </Link>
        <div className="project-card__actions">
          <Link className="text-link" to={`/projects/${project.slug}`}>
            <Icon icon="mdi:book-open-page-variant-outline" />
            Read note
          </Link>
          {project.githubUrl && (
            <a className="text-link" href={project.githubUrl} target="_blank" rel="noreferrer">
              <Icon icon="mdi:github" />
              Code
            </a>
          )}
          {project.websiteUrl && (
            <a className="text-link" href={project.websiteUrl} target="_blank" rel="noreferrer">
              <Icon icon="mdi:open-in-new" />
              Site
            </a>
          )}
        </div>
      </motion.div>
    </motion.article>
  );
}

function Projects() {
  return (
    <section className="section work" id="work">
      <SectionHeading eyebrow="Selected work" title="Case studies worth talking about">
        Production apps, internal problem-solvers, and lab work that show how I
        approach messy technical problems.
      </SectionHeading>
      <div className="projects-grid">
        {projects.map((project, index) => (
          <ProjectCard key={project.slug} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}

function Experience() {
  const rows = [
    {
      title: 'Enterprise Engineer / Service Engineer',
      org: 'Jamf / Identity Automation - RapidIdentity',
      date: 'Jan 2025 - Present',
      detail:
        'Escalation-level IAM support, customer troubleshooting, automation work, root-cause analysis, and product/engineering handoffs.',
    },
    {
      title: 'Founder / Software Engineer',
      org: 'Vet Stack Solutions LLC',
      date: 'Jun 2023 - Present',
      detail:
        'Built and sold a dispatch platform for route planning, driver packets, scheduling, and daily transportation coordination.',
    },
    {
      title: 'DevOps Contractor / Instructor',
      org: 'CodeX Academy',
      date: 'Apr 2023 - Present',
      detail:
        'AWS infrastructure, deployment workflows, AI demo support, and mentoring in full-stack development fundamentals.',
    },
  ];

  return (
    <section className="section experience">
      <SectionHeading eyebrow="Experience" title="Where the work shows up" />
      <motion.div
        className="timeline"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-100px' }}
        variants={revealContainer}
      >
        {rows.map((row) => (
          <motion.article className="timeline__item" key={`${row.title}-${row.org}`} variants={scaleIn}>
            <p>{row.date}</p>
            <h3>{row.title}</h3>
            <span>{row.org}</span>
            <p>{row.detail}</p>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}

function Contact() {
  return (
    <section className="section contact" id="contact">
      <SectionHeading eyebrow="Contact" title="Let us talk shop">
        Identity platforms, support engineering, production apps, developer
        tools, or the careful art of making a log file behave.
      </SectionHeading>
      <motion.div
        className="contact__actions"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-100px' }}
        variants={revealContainer}
      >
        {socials.map((social) => (
          <motion.a className="button button--ghost" href={social.href} key={social.label} variants={scaleIn}>
            <Icon icon={social.icon} />
            {social.label}
          </motion.a>
        ))}
      </motion.div>
    </section>
  );
}

function HomePage() {
  const location = useLocation();

  useEffect(() => {
    document.title = 'Lewis Benson | Enterprise Identity Engineer';
  }, []);

  useEffect(() => {
    if (!location.state?.scrollTo) return;
    window.setTimeout(() => {
      document.getElementById(location.state.scrollTo)?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }, 80);
  }, [location.state]);

  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Contact />
    </>
  );
}

function NotesPage() {
  useEffect(() => {
    document.title = 'Project Notes | Lewis Benson';
  }, []);

  return (
    <main className="page-shell">
      <SectionHeading eyebrow="Engineering notes" title="Project writeups">
        Short case-study pages about what made each project technically
        interesting.
      </SectionHeading>
      <div className="notes-list">
        {projects.map((project) => (
          <Link className="note-row" to={`/projects/${project.slug}`} key={project.slug}>
            <span>{project.type}</span>
            <strong>{project.caseStudy.headline}</strong>
            <Icon icon="mdi:arrow-right" />
          </Link>
        ))}
      </div>
    </main>
  );
}

function ResumePage() {
  useEffect(() => {
    document.title = 'Resume | Lewis Benson';
  }, []);

  return (
    <main className="page-shell resume-page">
      <SectionHeading eyebrow="Resume" title="Enterprise support engineer with builder range">
        Current PDF refreshed from the support and identity-focused resume.
      </SectionHeading>
      <div className="resume-layout">
        <aside className="resume-summary">
          <h3>Current focus</h3>
          <p>
            RapidIdentity escalations, IAM, SSO, provisioning, directory sync,
            automation, logs, code-level debugging, AWS infrastructure, and
            customer-facing root-cause communication.
          </p>
          <a className="button button--primary" href="/resume.pdf" target="_blank" rel="noreferrer">
            <Icon icon="mdi:download-outline" />
            Open PDF
          </a>
        </aside>
        <object className="resume-frame" data="/resume.pdf" type="application/pdf">
          <p>
            Your browser cannot display the PDF inline. Use the Open PDF button
            to view it.
          </p>
        </object>
      </div>
    </main>
  );
}

function ProjectPage() {
  const { slug } = useParams();
  const project = useMemo(() => projects.find((item) => item.slug === slug), [slug]);

  useEffect(() => {
    document.title = project ? `${project.name} | Lewis Benson` : 'Project not found';
  }, [project]);

  if (!project) {
    return (
      <main className="page-shell">
        <SectionHeading eyebrow="Missing" title="Project not found" />
        <Link className="button button--primary" to="/">
          <Icon icon="mdi:arrow-left" />
          Back home
        </Link>
      </main>
    );
  }

  return (
    <main className="case-study-page">
      <section className="case-hero">
        <div className="case-hero__copy">
          <p className="eyebrow">{project.type}</p>
          <h1>{project.name}</h1>
          <p>{project.impact}</p>
          <div className="case-hero__actions">
            {project.websiteUrl && (
              <a className="button button--primary" href={project.websiteUrl} target="_blank" rel="noreferrer">
                <Icon icon="mdi:open-in-new" />
                Visit site
              </a>
            )}
            {project.githubUrl && (
              <a className="button button--ghost" href={project.githubUrl} target="_blank" rel="noreferrer">
                <Icon icon="mdi:github" />
                View code
              </a>
            )}
          </div>
        </div>
        <div className="case-hero__image">
          <img src={project.image} alt="" />
          {project.logo && <img className="case-hero__logo" src={project.logo} alt="" />}
        </div>
      </section>

      <section className="case-study-body">
        <div className="case-study-body__meta">
          <span>{project.role}</span>
          <span>{project.year}</span>
          <ul>
            {project.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        </div>

        <article className="case-study-body__article">
          <h2>{project.caseStudy.headline}</h2>
          <h3>Challenge</h3>
          <p>{project.caseStudy.challenge}</p>
          <h3>Constraints</h3>
          <p>{project.caseStudy.constraints}</p>
          <h3>Solution</h3>
          <p>{project.caseStudy.solution}</p>
          <h3>Outcome</h3>
          <p>{project.caseStudy.outcome}</p>
          <h3>Highlights</h3>
          <ul>
            {project.highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
        </article>
      </section>

      <nav className="case-nav" aria-label="Project navigation">
        <Link className="button button--ghost" to="/#work">
          <Icon icon="mdi:arrow-left" />
          Back to work
        </Link>
        <Link className="button button--primary" to="/blog">
          <Icon icon="mdi:book-open-page-variant-outline" />
          All notes
        </Link>
      </nav>
    </main>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <Monogram size={34} />
      <p>Designed and built by Lewis Benson.</p>
      <div>
        {socials.map((social) => (
          <a key={social.label} href={social.href} aria-label={social.label}>
            <Icon icon={social.icon} />
          </a>
        ))}
      </div>
    </footer>
  );
}

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      window.setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 80);
    } else {
      window.scrollTo({ top: 0, left: 0 });
    }
  }, [location.pathname, location.hash]);

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence>{showSplash && <LoadingSplash onDone={() => setShowSplash(false)} />}</AnimatePresence>
      <Header />
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.22 }}
        >
          <Routes location={location}>
            <Route path="/" element={<HomePage />} />
            <Route path="/blog" element={<NotesPage />} />
            <Route path="/resume" element={<ResumePage />} />
            <Route path="/projects/:slug" element={<ProjectPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
      <Footer />
    </MotionConfig>
  );
}

export default App;
