import './globals.scss';
import { Inter } from 'next/font/google';
import styles from './layout.module.scss';
import Header from './(components)/header/header';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="color-scheme" content="dark" />
      </head>
      <body suppressHydrationWarning={true} className={inter.className}>
        <div className={styles.grid}>
          <div className={styles.header}>
            <Header />
          </div>
          <div className={styles.main}>{children}</div>
        </div>
      </body>
    </html>
  );
}
