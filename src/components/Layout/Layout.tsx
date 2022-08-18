import styles from './Layout.module.css';
import { Footer } from '../Footer/Footer';
import { Header } from '../Header/Header';

type Props = {
  children: React.ReactNode;
};

export const Layout = ({ children }: Props) => {
  return (
    <div className={styles.wrapper}>
      <Header />
      <main className={styles.main}>{children}</main>
      <Footer />
    </div>
  );
};
