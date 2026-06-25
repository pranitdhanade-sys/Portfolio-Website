'use client';
import { ThemeProvider } from 'next-themes';
import { LenisProvider } from '@/components/lenis-provider';
export function Providers({ children }: { children: React.ReactNode }) { return <ThemeProvider attribute="class" defaultTheme="dark"><LenisProvider>{children}</LenisProvider></ThemeProvider>; }
