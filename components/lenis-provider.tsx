'use client';
import Lenis from 'lenis';
import { useEffect } from 'react';
export function LenisProvider({ children }: { children: React.ReactNode }) { useEffect(() => { const lenis = new Lenis({ lerp: .08, smoothWheel: true }); let raf = (time: number) => { lenis.raf(time); requestAnimationFrame(raf); }; requestAnimationFrame(raf); return () => lenis.destroy(); }, []); return children; }
