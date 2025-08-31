import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Internship Platform',
  description: 'Find your dream internship',
  icons: {
    icon: '/favicon.ico', 
    shortcut: '/shortcut-icon.png',
    apple: '/apple-icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" 
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}