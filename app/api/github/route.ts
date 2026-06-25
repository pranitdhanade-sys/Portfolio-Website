import { NextResponse } from 'next/server';
const USERNAME = process.env.GITHUB_USERNAME ?? 'pranit-dhanade';
export async function GET() {
  const headers: HeadersInit = { Accept: 'application/vnd.github+json' };
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  const [userRes, reposRes] = await Promise.all([
    fetch(`https://api.github.com/users/${USERNAME}`, { headers, next: { revalidate: 3600 } }),
    fetch(`https://api.github.com/users/${USERNAME}/repos?sort=updated&per_page=6`, { headers, next: { revalidate: 3600 } }),
  ]);
  if (!userRes.ok || !reposRes.ok) return NextResponse.json({ error: 'Unable to load GitHub profile' }, { status: 502 });
  const user = await userRes.json();
  const repos = await reposRes.json();
  return NextResponse.json({ user, repos });
}
