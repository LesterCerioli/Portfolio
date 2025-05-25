import React from 'react';
import { AppProps } from 'next/app';
import Layout from '../components/Layout';
import '../styles/globals.css';

// Define a type for the expected structure of translations in pageProps
// This should ideally include all keys from common.json that Layout or pages might need.
interface PageTranslations {
  portfolioTitle?: string;
  homePageTitle?: string;
  servicesPageTitle?: string;
  skillsPageTitle?: string;
  contactPageTitle?: string;
  viewInEnglish?: string;
  viewInPortuguese?: string;
  navHome?: string;
  navServices?: string;
  navSkills?: string;
  navContact?: string;
  footerRights?: string;
  stanfordUniversity?: string;
  // Add any other common keys that pages might pass up
}

interface MyAppProps extends AppProps {
  pageProps: {
    translations?: PageTranslations;
    // Other pageProps can also exist
    [key: string]: any;
  };
}

const MyApp: React.FC<MyAppProps> = ({ Component, pageProps }) => {
  const translations = pageProps.translations || {};

  // Determine the pageTitle based on the component being rendered
  let pageTitle = translations.portfolioTitle || "Portfolio"; // Default to portfolio title
  if (Component.displayName === 'HomePage' && translations.homePageTitle) {
    pageTitle = translations.homePageTitle;
  } else if (Component.displayName === 'ServicesPage' && translations.servicesPageTitle) {
    pageTitle = translations.servicesPageTitle;
  } else if (Component.displayName === 'SkillsPage' && translations.skillsPageTitle) {
    pageTitle = translations.skillsPageTitle;
  } else if (Component.displayName === 'ContactPage' && translations.contactPageTitle) {
    pageTitle = translations.contactPageTitle;
  }
  
  // Ensure default values if translations are not fully loaded or missing for some props
  const portfolioTitle = translations.portfolioTitle || "Lester Cerioli Portfolio";
  const viewInEnglish = translations.viewInEnglish || "View in English";
  const viewInPortuguese = translations.viewInPortuguese || "Ver em Português";
  const navHome = translations.navHome || "Home";
  const navServices = translations.navServices || "Services";
  const navSkills = translations.navSkills || "Skills";
  const navContact = translations.navContact || "Contact";
  const footerRights = translations.footerRights || "© 2024 Lester Cerioli. All rights reserved.";
  const stanfordUniversity = translations.stanfordUniversity || "Stanford University";

  return (
    <Layout
      pageTitle={pageTitle}
      portfolioTitle={portfolioTitle}
      viewInEnglish={viewInEnglish}
      viewInPortuguese={viewInPortuguese}
      navHome={navHome}
      navServices={navServices}
      navSkills={navSkills}
      navContact={navContact}
      footerRights={footerRights}
      stanfordUniversity={stanfordUniversity}
    >
      <Component {...pageProps} />
    </Layout>
  );
};

export default MyApp;
