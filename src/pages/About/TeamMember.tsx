import styles from './About.module.css';
import GitImage from '../../assets/GitHub.png';

type MemberData = {
  img: string;
  name: string;
  role: string;
  description: string;
  link: string;
};

export const TeamMember = ({ img, name, role, description, link }: MemberData) => {
  return (
    <div className={styles.member}>
      <img className={styles.photo} src={img} alt="Member Photo" />
      <p className={styles.name}>{name}</p>
      <p className={styles.role}>{role}</p>
      <p className={styles.description}>{description}</p>
      <a href={link}>
        <img src={GitImage} alt="Github" className={styles.github} />
      </a>
    </div>
  );
};
