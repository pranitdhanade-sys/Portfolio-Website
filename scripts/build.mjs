import { cp, mkdir, rm, stat } from 'node:fs/promises';

await rm('dist', { recursive: true, force: true });
await mkdir('dist', { recursive: true });
await cp('index.html', 'dist/index.html');
await cp('src', 'dist/src', { recursive: true });
try {
  await stat('public');
  await cp('public', 'dist', { recursive: true });
} catch {
  // No optional public assets directory is required for this static site.
}
console.log('Static site exported to dist/');
