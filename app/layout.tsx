import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/providers';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });

export const metadata: Metadata = {
  metadataBase: new URL('https://pranitdhanade-sys.github.io/Portfolio-Website/'),
  title: 'Pranit Dhanade — Machine Learning Engineer & AI Researcher',
  description: 'Windows 95-inspired portfolio for Pranit Dhanade, focused on LLMs, computer vision, multi-agent systems, deep learning, and competitive programming.',
  keywords: ['Pranit Dhanade', 'Machine Learning Engineer', 'AI Researcher', 'LLM', 'Computer Vision', 'Pune'],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Pranit Dhanade — Building Intelligent Systems',
    description: 'Premium Win95-inspired AI/ML portfolio.',
    type: 'website',
    url: 'https://pranitdhanade-sys.github.io/Portfolio-Website/',
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${mono.variable} bg-background text-[#FAFAFA] antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
