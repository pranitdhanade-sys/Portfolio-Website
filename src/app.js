const h = React.createElement;
const { profile, links, projects, skills, interests, timeline } = window.PORTFOLIO_DATA;

function Window({ title, children, className = '' }) {
  return h('section', { className: `window ${className}` },
    h('div', { className: 'title-bar' },
      h('span', null, title),
      h('span', { className: 'controls', 'aria-hidden': 'true' }, h('b', null, '_'), h('b', null, '□'), h('b', null, '×')),
    ),
    h('div', { className: 'window-body' }, children),
  );
}

function Folder({ label, children }) {
  return h('div', { className: 'folder-card' }, h('div', { className: 'folder-icon' }, h('span')), h('h3', null, label), children);
}

function NeuralCanvas() {
  const dots = Array.from({ length: 22 }, (_, index) => ({ id: index, x: 12 + ((index * 37) % 76), y: 14 + ((index * 53) % 70), delay: `${(index % 7) * 0.22}s` }));
  return h('div', { className: 'neural-scene', 'aria-label': 'Animated neural network visualization' },
    h('svg', { viewBox: '0 0 100 100', role: 'img' },
      dots.map((dot, index) => {
        const next = dots[(index * 5 + 3) % dots.length];
        return h('line', { key: `line-${dot.id}`, x1: dot.x, y1: dot.y, x2: next.x, y2: next.y });
      }),
      dots.map((dot) => h('circle', { key: dot.id, cx: dot.x, cy: dot.y, r: '1.4', style: { animationDelay: dot.delay } })),
    ),
  );
}

function GitHubShowcase() {
  const [repos, setRepos] = React.useState([]);
  const [repoCount, setRepoCount] = React.useState('70+');

  React.useEffect(() => {
    const controller = new AbortController();
    async function load() {
      try {
        const [userResponse, reposResponse] = await Promise.all([
          fetch('https://api.github.com/users/pranitdhanade-sys', { signal: controller.signal }),
          fetch('https://api.github.com/users/pranitdhanade-sys/repos?sort=updated&per_page=4', { signal: controller.signal }),
        ]);
        if (!userResponse.ok || !reposResponse.ok) return;
        const user = await userResponse.json();
        const latestRepos = await reposResponse.json();
        setRepoCount(user.public_repos || '70+');
        setRepos(latestRepos);
      } catch {
        // Keep the static page usable if GitHub rate-limits anonymous API calls.
      }
    }
    load();
    return () => controller.abort();
  }, []);

  return h(Window, { title: 'GITHUB.EXE', className: 'wide-window' },
    h('div', { className: 'stats-row' }, h('strong', null, repoCount), h('span', null, 'Repositories'), h('strong', null, 'AI/ML'), h('span', null, 'Primary Focus'), h('strong', null, 'Static'), h('span', null, 'GitHub Pages Ready')),
    h('div', { className: 'repo-grid' }, repos.map((repo) => h('a', { className: 'repo-card', href: repo.html_url, key: repo.id }, h('span', null, repo.name), h('small', null, `${repo.language || 'Code'} · ★ ${repo.stargazers_count}`)))),
  );
}

function App() {
  return h('main', null,
    h('div', { className: 'desktop-grid' }),
    h('header', { className: 'hero', id: 'home' },
      h('div', { className: 'hero-copy' },
        h('p', { className: 'boot-line' }, 'C:\\PRANIT\\PORTFOLIO.EXE'),
        h('h1', null, 'Building Intelligent Systems.'),
        h('p', { className: 'lede' }, `${profile.title} focused on LLMs, Computer Vision, Multi-Agent Systems, and Deep Learning.`),
        h('div', { className: 'hero-actions' }, h('a', { className: 'win-button primary', href: '#projects' }, 'View Projects'), h('a', { className: 'win-button', href: '#contact' }, 'Contact Me')),
      ),
      h(Window, { title: 'NEURAL_NET.VIZ', className: 'hero-window' }, h(NeuralCanvas)),
    ),
    h('nav', { className: 'taskbar', 'aria-label': 'Portfolio sections' }, ['Start', 'About', 'Projects', 'Profiles', 'Contact'].map((item) => h('a', { href: `#${item === 'Start' ? 'home' : item.toLowerCase()}`, key: item }, item))),
    h('section', { className: 'section', id: 'about' }, h(Window, { title: 'ABOUT.TXT', className: 'wide-window' }, h('div', { className: 'two-column' }, h('div', null, h('p', { className: 'eyebrow' }, 'Machine Learning Engineer • AI Researcher'), h('h2', null, profile.name), h('p', null, profile.education), h('p', null, profile.location)), h('div', { className: 'interest-cloud' }, interests.map((item) => h('span', { key: item }, item))))),
    h('section', { className: 'section', id: 'skills' }, h('h2', { className: 'section-title' }, 'Skills Directory'), h('div', { className: 'card-grid' }, skills.map(([group, items]) => h(Folder, { key: group, label: group }, items.map((item) => h('span', { className: 'skill-chip', key: item }, item)))))),
    h('section', { className: 'section', id: 'projects' }, h('h2', { className: 'section-title' }, 'Projects Folder'), h('div', { className: 'project-grid' }, projects.map(([name, file, description, stack]) => h(Window, { title: file, key: name }, h('h3', null, name), h('p', null, description), h('div', { className: 'stack-list' }, stack.map((item) => h('span', { key: item }, item))), h('div', { className: 'button-row' }, h('a', { href: profile.github }, 'GitHub'), h('a', { href: '#contact' }, 'Ask Me')))))),
    h('section', { className: 'section', id: 'research' }, h('h2', { className: 'section-title' }, 'Research Graph'), h('div', { className: 'research-map' }, interests.map((item, index) => h('span', { style: { '--x': `${8 + (index * 14) % 76}%`, '--y': `${15 + (index * 23) % 62}%` }, key: item }, item)))),
    h('section', { className: 'section', id: 'profiles' }, h('h2', { className: 'section-title' }, 'Coding Profiles'), h('div', { className: 'profile-links' }, links.map(([label, href]) => h('a', { className: 'win-button', href, key: label }, label))), h(GitHubShowcase)),
    h('section', { className: 'section', id: 'experience' }, h('h2', { className: 'section-title' }, 'Experience Timeline'), h('ol', { className: 'timeline' }, timeline.map((item, index) => h('li', { key: item }, h('span', null, `0${index + 1}`), h('strong', null, item), h('p', null, 'Research and engineering milestone packaged as a Windows 95 program card.'))))),
    h('section', { className: 'section', id: 'contact' }, h(Window, { title: 'CONTACT.INI', className: 'wide-window' }, h('div', { className: 'two-column' }, h('div', null, h('h2', null, "Let's build."), h('p', null, 'Email: ', h('a', { href: `mailto:${profile.email}` }, profile.email)), h('p', null, 'GitHub: ', h('a', { href: profile.github }, profile.github)), h('p', null, 'LinkedIn: ', h('a', { href: profile.linkedin }, profile.linkedin))), h('form', { action: `mailto:${profile.email}`, method: 'post', encType: 'text/plain' }, h('input', { name: 'name', placeholder: 'Name' }), h('input', { name: 'email', placeholder: 'Email', type: 'email' }), h('textarea', { name: 'message', placeholder: 'Message' }), h('button', { className: 'win-button primary', type: 'submit' }, 'Send Message'))))),
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(h(App));
