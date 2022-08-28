import styles from './Layout.module.css';
import { Footer } from '../Footer/Footer';
import { Header } from '../Header/Header';
import { Props } from '../../utils/constants';

export const Layout = ({ children }: Props) => {
  return (
    <div className={styles.wrapper}>
      <Header />
      <main className={styles.main}>{children}</main>
      <Footer />
    </div>
  );
};
