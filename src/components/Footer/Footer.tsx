import GitHub from '../../assets/GitHub.png';
import RSSchool from './assets/rss-logo.svg';
import footer from './Footer.module.css';

export const Footer = () => {
  return (
    <footer>
      <p>@2022 RSLang</p>
      <div className={footer.gitHub_link}>
        <a href="https://github.com/ivnpotapov">
          <img src={GitHub} alt="Logo GitHub" className={footer.github} />
          <p>ivnpotapov</p>
        </a>
        <a href="https://github.com/kate-js">
          <img src={GitHub} alt="Logo GitHub" className={footer.github} />
          <p>kate-js</p>
        </a>
        <a href="https://github.com/glsidorenko">
          <img src={GitHub} alt="Logo GitHub" className={footer.github} />
          <p>glsidorenko</p>
        </a>
      </div>
      <a href="https://rs.school/">
        <img src={RSSchool} alt="Logo RSSchool" className={footer.rss_school} />
      </a>
    </footer>
  );
};
