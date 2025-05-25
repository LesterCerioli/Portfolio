import React, { ReactNode } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './Layout.module.css'; // Create this for specific Layout styling

interface LayoutProps {
  children: ReactNode;
  // Props from page translations, passed via _app.tsx
  pageTitle: string;
  portfolioTitle: string;
  viewInEnglish: string;
  viewInPortuguese: string;
  navHome: string;
  navServices: string;
  navSkills: string;
  navContact: string;
  footerRights: string;
  stanfordUniversity: string; // Added for footer
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  pageTitle, 
  portfolioTitle, 
  viewInEnglish, 
  viewInPortuguese,
  navHome,
  navServices,
  navSkills,
  navContact,
  footerRights,
  stanfordUniversity
}) => {
  const router = useRouter();
  const { pathname, asPath, query, locale } = router;

  const getNavLink = (targetPath: string, linkText: string) => {
    const isActive = pathname === targetPath;
    return (
      <Link href={targetPath} locale={locale} legacyBehavior>
        <a className={isActive ? styles.activeLink : styles.navLink}>{linkText}</a>
      </Link>
    );
  };

  return (
    <div className={styles.layoutContainer}>
      <Head>
        <title>{pageTitle} | {portfolioTitle}</title>
        <meta name="description" content={`${portfolioTitle} - ${pageTitle}`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.portfolioTitleLink}>
            <Link href="/" locale={locale} legacyBehavior><a>{portfolioTitle}</a></Link>
          </h1>
          <nav className={styles.mainNav}>
            {getNavLink('/', navHome)}
            {getNavLink('/services', navServices)}
            {getNavLink('/skills', navSkills)}
            {getNavLink('/contact', navContact)}
          </nav>
          <div className={styles.langSwitcher}>
            <Link href={{ pathname, query }} as={asPath} locale="en" legacyBehavior>
              <button className={locale === 'en' ? styles.activeLangButton : styles.langButton} disabled={locale === 'en'}>
                {locale === 'en' ? `${viewInEnglish} (Current)` : viewInEnglish}
              </button>
            </Link>
            <Link href={{ pathname, query }} as={asPath} locale="pt" legacyBehavior>
              <button className={locale === 'pt' ? styles.activeLangButton : styles.langButton} disabled={locale === 'pt'}>
                {locale === 'pt' ? `${viewInPortuguese} (Atual)` : viewInPortuguese}
              </button>
            </Link>
          </div>
        </div>
      </header>

      <main className={styles.mainContent}>{children}</main>

      <footer className={styles.footer}>
        <p>{stanfordUniversity}</p>
        <p>{footerRights}</p>
      </footer>
    </div>
  );
};

export default Layout;
