import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { ThemeProvider } from '@/components/theme-providers';
import { siteConfig } from '@/config/site.config';
import { Toaster } from '@/components/ui/sonner';
import { SessionProvider } from 'next-auth/react';
import { NavBar } from '@/components/global/navbar';
import getUserOrganisation from '@/actions/organisation/get-organisation';
import RedirectHandler from '@/components/global/redirect-handler';
import { OrganisationProvider } from '@/context/org-context';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: { default: siteConfig.name, template: `%s | ${siteConfig.name}` },
  description: siteConfig.description,
  icons: [
    {
      url: '/logo.svg',
      href: '/logo.svg',
    },
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organisation = await getUserOrganisation();

  const shouldRedirect = !!(organisation && organisation?.id === null);

  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <SessionProvider>
            <OrganisationProvider>
              <NavBar />
              {/* Client-side redirect handling */}
              <RedirectHandler shouldRedirect={shouldRedirect} />
              {children}
            </OrganisationProvider>
          </SessionProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
