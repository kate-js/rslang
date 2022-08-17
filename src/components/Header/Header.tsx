import Logo from './assets/Logo.png';
import { Navbar } from './Navbar/Navbar';
import header from './Header.module.css';

export const Header = () => {
  return (
    <header>
      <img src={Logo} alt="Logo" className={header.logo} />
      <Navbar />
    </header>
  );
};
