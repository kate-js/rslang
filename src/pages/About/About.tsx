import { membersData } from '../../data/Data';
import styles from './About.module.css';
import { TeamMember } from './TeamMember';

export const About = () => {
  return (
    <div className={styles.about}>
      <h1 className={styles.title}>Над проектом работали</h1>
      <div className={styles.team}>
        {membersData.map((member, index) => {
          return <TeamMember key={index + 1} {...member} />;
        })}
      </div>
    </div>
  );
};
