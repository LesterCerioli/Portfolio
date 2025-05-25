import React from 'react';
import { GetStaticProps } from 'next';
import styles from '../styles/ContactPage.module.css'; // Import ContactPage styles
import fsPromises from 'fs/promises';
import path from 'path';

interface ContactPageTranslations {
  contactPageTitle: string; // Used by _app.tsx for Layout
  portfolioTitle: string;   // Used by _app.tsx for Layout
  viewInEnglish: string;    // Used by _app.tsx for Layout
  viewInPortuguese: string; // Used by _app.tsx for Layout
  contactWhatsAppTitle: string;
  contactLinkedInTitle: string;
  linkedInButtonText: string;
  contactPageInfo: string;
  // Add other keys if your common.json has more and they are needed
}

interface ContactPageProps {
  translations: ContactPageTranslations;
}

const ContactPage: React.FC<ContactPageProps> = ({ translations }) => {
  // The main page H1 (contactPageTitle) is handled by Layout
  return (
    <div className={styles.contactPage}>
      <p className={styles.contactInfo}>{translations.contactPageInfo}</p>

      <section className={styles.contactSection}>
        <h2>{translations.contactWhatsAppTitle}</h2>
        <p>
          <a href="https://wa.me/5521964108815" target="_blank" rel="noopener noreferrer">
            +55 21 964108815
          </a>
        </p>
      </section>

      <section className={styles.contactSection}>
        <h2>{translations.contactLinkedInTitle}</h2>
        <a href="https://www.linkedin.com/in/lester-cerioli-83300a81/" target="_blank" rel="noopener noreferrer" className={styles.contactButton}>
          <button>{translations.linkedInButtonText}</button>
        </a>
      </section>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const filePath = path.join(process.cwd(), `public/locales/${locale}/common.json`);
  const jsonData = await fsPromises.readFile(filePath);
  const objectData = JSON.parse(jsonData.toString()) as ContactPageTranslations;
  return {
    props: {
      translations: objectData,
    },
  };
};

// Set displayName for _app.tsx logic
ContactPage.displayName = 'ContactPage';

export default ContactPage;
