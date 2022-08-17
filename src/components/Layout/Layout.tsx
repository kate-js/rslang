import { Footer } from '../Footer/Footer';
import { Header } from '../Header/Header';

export const Layout = (props: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <main>{props.children}</main>
      <Footer />
    </>
  );
};
