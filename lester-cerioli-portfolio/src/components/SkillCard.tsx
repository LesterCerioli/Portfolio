import React from 'react';
import styles from './SkillCard.module.css'; // Import CSS module

interface SkillCardProps {
  skillName: string;
  description?: string; // Optional description prop
}

const SkillCard: React.FC<SkillCardProps> = ({ skillName, description }) => {
  return (
    <div className={styles.card}>
      <div className={styles.iconPlaceholder}>[Icon]</div>
      <h3>{skillName}</h3>
      {description && <p className={styles.description}>{description}</p>}
    </div>
  );
};

export default SkillCard;
