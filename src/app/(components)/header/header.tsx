'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './header.module.scss';

const Header = () => {
  const pathname = usePathname();

  return (
    <div className={styles.header}>
      {pathname === '/' ? (
        <Link href="/create">Create new task</Link>
      ) : (
        <Link href="/">Go To Calendar</Link>
      )}
    </div>
  );
};
export default Header;
