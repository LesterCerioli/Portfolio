import React from 'react';
import { GetStaticProps } from 'next';
import fsPromises from 'fs/promises';
import path from 'path';
import SkillCard from '../components/SkillCard';
import styles from '../styles/SkillsPage.module.css'; // Existing styles for the container

interface SkillsPageTranslations {
  portfolioTitle: string;       // For Layout via _app.tsx
  skillsPageTitle: string;      // For Layout via _app.tsx & page content
  viewInEnglish: string;        // For Layout via _app.tsx
  viewInPortuguese: string;     // For Layout via _app.tsx
  navHome: string;              // For Layout via _app.tsx
  navServices: string;          // For Layout via _app.tsx
  navSkills: string;            // For Layout via _app.tsx
  navContact: string;           // For Layout via _app.tsx
  footerRights: string;         // For Layout via _app.tsx
  stanfordUniversity: string;   // For Layout via _app.tsx

  techSkillsIntro: string;
  frontendSkills: string;
  backendSkills: string;
  devopsSkills: string;
  blockchainSkills: string; // Title for the Blockchain category
  blockchainSkillsDetail: string; // Description for the Blockchain skill card

  skillNextJs: string;
  skillAngular: string;
  skillReactJs: string;
  skillNodeJs: string;
  skillGo: string;
  skillPython: string;
  skillRuby: string;
  skillDotNet: string;
  skillAWS: string;
  skillAzure: string;
  skillKubernetes: string;
  skillTerraform: string;
}

interface SkillsPageProps {
  translations: SkillsPageTranslations;
}

const SkillsPage: React.FC<SkillsPageProps> = ({ translations }) => {
  const frontend = [translations.skillNextJs, translations.skillAngular, translations.skillReactJs];
  const backend = [translations.skillNodeJs, translations.skillGo, translations.skillPython, translations.skillRuby, translations.skillDotNet];
  const devops = [translations.skillAWS, translations.skillAzure, translations.skillKubernetes, translations.skillTerraform];

  return (
    <div>
      <p>{translations.techSkillsIntro}</p>

      <h2>{translations.frontendSkills}</h2>
      <div className={styles.skillsContainer}>
        {frontend.map((skill) => (
          <SkillCard key={skill} skillName={skill} />
        ))}
      </div>

      <h2>{translations.backendSkills}</h2>
      <div className={styles.skillsContainer}>
        {backend.map((skill) => (
          <SkillCard key={skill} skillName={skill} />
        ))}
      </div>

      <h2>{translations.devopsSkills}</h2>
      <div className={styles.skillsContainer}>
        {devops.map((skill) => (
          <SkillCard key={skill} skillName={skill} />
        ))}
      </div>
      
      <h2>{translations.blockchainSkills}</h2>
      <div className={styles.skillsContainer}>
        <SkillCard 
          key={translations.blockchainSkills} 
          skillName={translations.blockchainSkills} 
          description={translations.blockchainSkillsDetail} 
        />
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const filePath = path.join(process.cwd(), `public/locales/${locale}/common.json`);
  const jsonData = await fsPromises.readFile(filePath);
  const objectData = JSON.parse(jsonData.toString()) as SkillsPageTranslations;

  return {
    props: {
      translations: objectData,
    },
  };
};

SkillsPage.displayName = 'SkillsPage';

export default SkillsPage;
