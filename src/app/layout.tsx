import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '@/theme';
import { SEO_CONFIG } from '@/config/company.en';
import { I18nProvider } from '@/i18n/I18nProvider';
import NeuralBackground from '@/components/background/NeuralBackground';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://inzaiq.com'),
  title: 'InzaiQ – Innovation in Automation and SaaS for digital businesses',
  description: 'InzaiQ provides AI-powered SaaS for automation and content generation to optimize processes and online sales.',
  keywords: SEO_CONFIG.keywords,
  authors: [{ name: SEO_CONFIG.author }],
  openGraph: {
    title: SEO_CONFIG.title,
    description: SEO_CONFIG.description,
    url: SEO_CONFIG.url,
    siteName: 'InzaiQ LLC',
    images: [
      {
        url: '/inzaiq-logo.png',
        width: 1200,
        height: 630,
        alt: 'InzaiQ - Where innovation takes shape',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: SEO_CONFIG.title,
    description: SEO_CONFIG.description,
    images: ['/inzaiq-logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased text-white bg-black">
        <AppRouterCacheProvider>
          <I18nProvider>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <NeuralBackground />
              <div className="relative z-10 selection:bg-cyan-500 selection:text-black">
                {children}
              </div>
            </ThemeProvider>
          </I18nProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
