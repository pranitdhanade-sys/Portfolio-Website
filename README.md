# Portfolio-Website

A Windows 95-inspired personal portfolio for Pranit Dhanade, rebuilt as a static React frontend for GitHub Pages.

## Stack

- React frontend
- Tiny Node.js build script that copies static files to `dist/`
- Plain CSS only
- No Tailwind CSS
- No Next.js server/runtime

## Deployment target

<https://pranitdhanade-sys.github.io/Portfolio-Website/>

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```

The production build is emitted to `dist/` and deployed by `.github/workflows/deploy.yml`.
