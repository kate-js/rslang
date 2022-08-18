import styles from './About.module.css'
import { TeamMember } from './TeamMember';
import image from '../../assets/member-photo.png'

const membersData = [
  { 
    img: image, 
    name: 'Иван Потапов', 
    role: 'Team Lead', 
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. ', 
    link: 'https://github.com/ivnpotapov'},
  { 
    img: image, 
    name: 'Екатерина Вакульская', 
    role: 'Developer', 
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    link: 'https://github.com/kate-js',
  },
  { 
    img: image, 
    name: 'Глеб Сидоренко', 
    role: 'Developer', 
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.', 
    link: 'https://github.com/glsidorenko'},
];

export const About = () => {
  return (
    <div className={styles.about}>
      <h1 className={styles.title}>Над проектом работали</h1>
      <div className={styles.team}>
        {membersData.map((member, index) => {
          return <TeamMember key={index + 1} {...member}/>
        })}
      </div>
    </div>
  )
};
