import React from 'react';
import { GetStaticProps } from 'next';
import styles from '../styles/HomePage.module.css'; // Import HomePage styles
import fsPromises from 'fs/promises';
import path from 'path';

interface HomePageTranslations {
  portfolioTitle: string;   // For Layout via _app.tsx
  homePageTitle: string;    // For Layout via _app.tsx & page content
  viewInEnglish: string;    // For Layout via _app.tsx
  viewInPortuguese: string; // For Layout via _app.tsx
  navHome: string;          // For Layout via _app.tsx
  navServices: string;      // For Layout via _app.tsx
  navSkills: string;        // For Layout via _app.tsx
  navContact: string;       // For Layout via _app.tsx
  footerRights: string;     // For Layout via _app.tsx
  stanfordUniversity: string; // For Layout via _app.tsx

  fullName: string;
  jobTitles: string;
  experienceSummary: string;
  welcomeMessage: string; // Already existed, ensure it's still there
}

interface HomePageProps {
  translations: HomePageTranslations;
}

const HomePage: React.FC<HomePageProps> = ({ translations }) => {
  return (
    <div className={styles.heroSection}>
      {/* The actual <h1> for the page (e.g., "Home") is typically in Layout via pageTitle */}
      {/* This h2 acts as the main heading for the content of this specific page */}
      <h2 className={styles.fullName}>{translations.fullName}</h2>
      <p className={styles.jobTitles}>{translations.jobTitles}</p>
      <p className={styles.experienceSummary}>{translations.experienceSummary}</p>
      <p className={styles.welcomeMessage}>{translations.welcomeMessage}</p>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const filePath = path.join(process.cwd(), `public/locales/${locale}/common.json`);
  const jsonData = await fsPromises.readFile(filePath);
  const objectData = JSON.parse(jsonData.toString()) as HomePageTranslations;

  return {
    props: {
      translations: objectData,
    },
  };
};

HomePage.displayName = 'HomePage'; // For _app.tsx logic

export default HomePage;
