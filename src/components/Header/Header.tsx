import Logo from './assets/header-logo.png';
import { Navbar } from './Navbar/Navbar';
import Auth from './Auth/Auth';
import header from './Header.module.css';

export const Header = () => {
  return (
    <header>
      <img src={Logo} alt="Logo" className={header.logo} />
      <Navbar />
      <Auth />
    </header>
  );
};
