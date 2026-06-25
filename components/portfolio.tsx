'use client';

import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code2, Github, Mail, Monitor, Moon, Search, Sparkles, User, X } from 'lucide-react';
import { interests, links, profile, projects, skillGroups, timeline } from '@/lib/data';

const HeroScene = dynamic(() => import('@/components/hero-scene'), { ssr: false });

type GitHubRepo = {
  id: number;
  name: string;
  html_url: string;
  stargazers_count: number;
  language: string | null;
};

type GitHubProfile = {
  public_repos: number;
  followers: number;
  html_url: string;
};

function Window({ title, children, className = '' }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <motion.div whileHover={{ y: -4 }} className={`win-panel ${className}`}>
      <div className="win-title flex items-center justify-between px-2 py-1 font-mono text-xs">
        <span>{title}</span>
        <div className="flex gap-1">
          <span className="win-button px-1">_</span>
          <span className="win-button px-1">□</span>
          <span className="win-button px-1"><X size={10} /></span>
        </div>
      </div>
      <div className="p-4">{children}</div>
    </motion.div>
  );
}

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="reveal mx-auto max-w-7xl px-5 py-24">
      <h2 className="mb-10 text-4xl font-semibold tracking-tight md:text-6xl">{title}</h2>
      {children}
    </section>
  );
}

export function Portfolio() {
  const [palette, setPalette] = useState(false);
  const [githubProfile, setGitHubProfile] = useState<GitHubProfile | null>(null);
  const [githubRepos, setGitHubRepos] = useState<GitHubRepo[]>([]);
  const progress = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.utils.toArray<HTMLElement>('.reveal').forEach((element) => {
      gsap.fromTo(
        element,
        { opacity: 0, y: 70 },
        { opacity: 1, y: 0, duration: 1, scrollTrigger: { trigger: element, start: 'top 82%' } },
      );
    });
    gsap.to(progress.current, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: { trigger: document.body, start: 'top top', end: 'bottom bottom', scrub: 0.2 },
    });
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    async function loadGitHub() {
      try {
        const [profileResponse, reposResponse] = await Promise.all([
          fetch('https://api.github.com/users/pranitdhanade-sys', { signal: controller.signal }),
          fetch('https://api.github.com/users/pranitdhanade-sys/repos?sort=updated&per_page=4', { signal: controller.signal }),
        ]);
        if (!profileResponse.ok || !reposResponse.ok) return;
        setGitHubProfile(await profileResponse.json());
        setGitHubRepos(await reposResponse.json());
      } catch {
        // Static GitHub Pages deployment should remain usable if the public GitHub API is rate limited.
      }
    }
    loadGitHub();
    return () => controller.abort();
  }, []);

  return (
    <main className="noise grid-bg relative min-h-screen">
      <div ref={progress} className="fixed left-0 top-0 z-[80] h-1 w-full origin-left scale-x-0 bg-accent-gradient" />
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(124,58,237,.22),transparent_28%),radial-gradient(circle_at_80%_10%,rgba(6,182,212,.18),transparent_24%)]" />

      <nav className="fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/10 bg-black/60 p-2 backdrop-blur" aria-label="Primary navigation">
        <a href="#home" className="p-3" aria-label="Home"><Monitor size={18} /></a>
        <a href="#projects" className="p-3" aria-label="Projects"><Code2 size={18} /></a>
        <button onClick={() => setPalette(true)} className="p-3" aria-label="Open command palette"><Search size={18} /></button>
        <a href="#contact" className="p-3" aria-label="Contact"><Mail size={18} /></a>
        <button className="p-3" aria-label="Theme toggle"><Moon size={18} /></button>
      </nav>

      {palette && (
        <div className="fixed inset-0 z-[90] grid place-items-start bg-black/50 pt-28 backdrop-blur" onClick={() => setPalette(false)}>
          <div className="mx-auto w-[min(560px,92vw)] rounded-2xl border border-white/10 bg-[#0D0D0D] p-4" onClick={(event) => event.stopPropagation()}>
            <p className="mb-3 font-mono text-sm text-zinc-400">COMMAND.COM — quick links</p>
            {['home', 'about', 'skills', 'projects', 'github', 'contact'].map((item) => (
              <a key={item} href={`#${item}`} onClick={() => setPalette(false)} className="block rounded-lg px-4 py-3 hover:bg-white/10">
                Open {item}
              </a>
            ))}
          </div>
        </div>
      )}

      <header id="home" className="relative mx-auto grid min-h-screen max-w-7xl items-center gap-10 px-5 pt-16 md:grid-cols-[1.1fr_.9fr]">
        <div>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-5 font-mono text-sm text-cyan-300">
            C:\PRANIT\PORTFOLIO.EXE
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-6xl font-semibold tracking-[-.06em] md:text-8xl">
            Building Intelligent Systems.
          </motion.h1>
          <p className="mt-6 max-w-2xl text-xl text-zinc-400">
            Machine Learning Engineer, AI Researcher, and Computer Science Student focused on LLMs, Computer Vision, Multi-Agent Systems, and Deep Learning.
          </p>
          <div className="mt-8 flex gap-3">
            <a className="win-button px-5 py-3 font-mono" href="#projects">View Projects</a>
            <a className="rounded-full border border-white/10 px-5 py-3" href="#contact">Contact Me</a>
          </div>
        </div>
        <Window title="NEURAL_NET.VIZ" className="h-[440px]"><HeroScene /></Window>
      </header>

      <Section id="about" title="About">
        <div className="grid gap-6 md:grid-cols-3">
          <Window title="PROFILE.TXT">
            <User />
            <h3 className="mt-4 text-2xl font-bold">{profile.name}</h3>
            <p>{profile.role}</p>
            <p className="mt-2 font-mono">{profile.location}</p>
          </Window>
          <Window title="EDUCATION.INI" className="md:col-span-2">
            <p className="text-2xl font-semibold">B.Tech Computer Science</p>
            <p>Vishwakarma Institute of Technology — Expected 2029</p>
            <div className="mt-5 flex flex-wrap gap-2">{interests.map((interest) => <span className="rounded-full bg-black px-3 py-1 text-white" key={interest}>{interest}</span>)}</div>
          </Window>
        </div>
      </Section>

      <Section id="skills" title="Skills">
        <div className="grid gap-5 md:grid-cols-2">
          {Object.entries(skillGroups).map(([group, skills]) => (
            <div className="glass rounded-3xl p-6" key={group}>
              <h3 className="mb-4 text-2xl">{group}</h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => <motion.span whileHover={{ scale: 1.08 }} className="win-button px-3 py-2 font-mono text-sm" key={skill}>{skill}<span className="ml-2 text-xs">{80 + (index % 5) * 4}%</span></motion.span>)}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section id="projects" title="Projects Folder">
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <motion.article whileHover={{ rotateX: 2, rotateY: -3 }} className="glass group rounded-3xl p-6" key={project.title}>
              <div className="mb-5 flex items-center gap-3 font-mono text-cyan-300"><Monitor /> {project.folder}</div>
              <h3 className="text-3xl font-semibold">{project.title}</h3>
              <p className="mt-3 text-zinc-400">{project.desc}</p>
              <div className="mt-5 flex flex-wrap gap-2">{project.tech.map((tech) => <span className="rounded-full border border-white/10 px-3 py-1" key={tech}>{tech}</span>)}</div>
              <div className="mt-6 flex gap-3">
                <a className="win-button px-4 py-2" href={project.href}>Live Demo</a>
                <a className="flex items-center gap-2 rounded-full border border-white/10 px-4 py-2" href={project.href}><Github size={16} /> GitHub</a>
              </div>
            </motion.article>
          ))}
        </div>
      </Section>

      <Section id="research" title="Research Graph">
        <div className="relative min-h-[360px] rounded-[2rem] border border-white/10 bg-[#0D0D0D] p-8">
          {interests.map((interest, index) => <motion.div animate={{ y: [0, -12, 0] }} transition={{ repeat: Infinity, duration: 4 + index * 0.2 }} className="absolute rounded-full border border-white/10 bg-black px-4 py-2 shadow-glow" style={{ left: `${10 + (index * 14) % 75}%`, top: `${18 + (index * 23) % 62}%` }} key={interest}>{interest}</motion.div>)}
        </div>
      </Section>

      <Section id="github" title="GitHub & Competitive Profiles">
        <div className="grid gap-4 md:grid-cols-5">{links.map((link) => <a className="win-panel p-5 text-center font-mono" href={link.href} key={link.label}>{link.label}</a>)}</div>
        <div className="mt-6 glass rounded-3xl p-6">
          <Sparkles className="text-purple-400" />
          <p className="mt-3 text-3xl font-semibold">{githubProfile?.public_repos ?? '70+'} repositories, contribution graph, and featured repositories.</p>
          <p className="mt-2 text-zinc-400">Static-export compatible GitHub showcase. Repository cards hydrate from the public GitHub REST API in the browser.</p>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {githubRepos.map((repo) => (
              <a key={repo.id} href={repo.html_url} className="rounded-2xl border border-white/10 bg-black/40 p-4 hover:bg-white/10">
                <span className="font-mono text-cyan-300">{repo.name}</span>
                <span className="mt-2 block text-sm text-zinc-400">{repo.language ?? 'Code'} · ★ {repo.stargazers_count}</span>
              </a>
            ))}
          </div>
        </div>
      </Section>

      <Section id="experience" title="Experience Timeline">
        <div className="border-l border-white/10 pl-6">{timeline.map((item, index) => <div className="mb-8" key={item}><span className="font-mono text-cyan-300">0{index + 1}</span><h3 className="text-2xl">{item}</h3><p className="text-zinc-400">Applied research and engineering work packaged as Win95-era program milestones.</p></div>)}</div>
      </Section>

      <Section id="contact" title="Contact">
        <div className="grid gap-6 md:grid-cols-2">
          <Window title="MAIL.EXE"><p>Email: {profile.email}</p><p>GitHub: {profile.github}</p><p>LinkedIn: {profile.linkedin}</p></Window>
          <form className="glass rounded-3xl p-6"><input className="mb-3 w-full rounded-xl bg-black p-4" placeholder="Name" /><input className="mb-3 w-full rounded-xl bg-black p-4" placeholder="Email" /><textarea className="mb-3 h-32 w-full rounded-xl bg-black p-4" placeholder="Message" /><button className="win-button px-5 py-3">Send Message</button></form>
        </div>
      </Section>
    </main>
  );
}
