import React, { useState } from 'react';
import styles from './Auth.module.css';
import ModalNav from '../ModalNav/ModalNav';
import ModalSignin from '../ModalSignin/ModalSignin';
import ModalSignup from '../ModalSignup/ModalSignup';

const Auth = () => {
  const [isModalNavOpen, setIsModalNavOpen] = useState(false);
  const [isModalSigninOpen, setIsModalSigninOpen] = useState(false);
  const [isModalSignupOpen, setIsModalSignupOpen] = useState(false);

  const handleBurgerClick = () => {
    setIsModalNavOpen(true);
  };

  const handleModalNavCloseClick = () => {
    setIsModalNavOpen(false);
  };

  const handleSigninClick = () => {
    setIsModalSigninOpen(true);
  };

  const handleModalSigninCloseClick = () => {
    setIsModalSigninOpen(false);
  };
  const handleSignupClick = () => {
    setIsModalSignupOpen(true);
  };

  const handleModalSignupCloseClick = () => {
    setIsModalSignupOpen(false);
  };

  return (
    <div className={styles.wrap}>
      <button onClick={handleSigninClick} type="button" className={styles.button}>
        Sign In
      </button>
      <button onClick={handleSignupClick} type="button" className={styles.button}>
        Sign Up
      </button>
      <div className={styles.burger} onClick={handleBurgerClick}>
        <div className={styles.burger_item}></div>
        <div className={styles.burger_item}></div>
        <div className={styles.burger_item}></div>
      </div>
      {isModalNavOpen ? <ModalNav onClose={handleModalNavCloseClick} /> : ''}
      {isModalSigninOpen ? <ModalSignin onClose={handleModalSigninCloseClick} /> : ''}
      {isModalSignupOpen ? <ModalSignup onClose={handleModalSignupCloseClick} /> : ''}
    </div>
  );
};

export default Auth;
