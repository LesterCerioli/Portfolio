import React from 'react';
import { GetStaticProps } from 'next';
import fsPromises from 'fs/promises';
import path from 'path';
import ServiceItem from '../components/ServiceItem';
import styles from '../styles/ServicesPage.module.css'; // Import ServicesPage styles

interface ServicesPageTranslations {
  portfolioTitle: string;       // For Layout via _app.tsx
  servicesPageTitle: string;    // For Layout via _app.tsx & page content
  viewInEnglish: string;        // For Layout via _app.tsx
  viewInPortuguese: string;     // For Layout via _app.tsx
  navHome: string;              // For Layout via _app.tsx
  navServices: string;          // For Layout via _app.tsx
  navSkills: string;            // For Layout via _app.tsx
  navContact: string;           // For Layout via _app.tsx
  footerRights: string;         // For Layout via _app.tsx
  stanfordUniversity: string;   // For Layout via _app.tsx

  lucasTechnologyServices: string;
  servicesIntro: string;
  medicalAppsTitle: string;
  medicalAppsDesc: string;
  outsourcingTitle: string;
  outsourcingDesc: string;
  blockchainSolutionsTitle: string;
  blockchainSolutionsDesc: string;
}

interface ServicesPageProps {
  translations: ServicesPageTranslations;
}

const ServicesPage: React.FC<ServicesPageProps> = ({ translations }) => {
  return (
    <div>
      {/* The main page H1 (servicesPageTitle) is handled by Layout */}
      <h2 className={styles.pageTitle}>{translations.lucasTechnologyServices}</h2>
      <p className={styles.servicesIntro}>{translations.servicesIntro}</p>
      
      <div className={styles.servicesContainer}>
        <ServiceItem 
          title={translations.medicalAppsTitle} 
          description={translations.medicalAppsDesc} 
        />
        <ServiceItem 
          title={translations.outsourcingTitle} 
          description={translations.outsourcingDesc} 
        />
        <ServiceItem 
          title={translations.blockchainSolutionsTitle} 
          description={translations.blockchainSolutionsDesc} 
        />
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const filePath = path.join(process.cwd(), `public/locales/${locale}/common.json`);
  const jsonData = await fsPromises.readFile(filePath);
  const objectData = JSON.parse(jsonData.toString()) as ServicesPageTranslations;

  return {
    props: {
      translations: objectData,
    },
  };
};

ServicesPage.displayName = 'ServicesPage'; // For _app.tsx logic

export default ServicesPage;
