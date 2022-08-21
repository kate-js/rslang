import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  initialState,
  setIsModalSignupOpen,
  setIsModalSigninOpen,
  setIsLogined,
  setCurrentUser
} from '../../../store/authSlice';
import { TState } from '../../../store/store';
import styles from './Auth.module.css';
import ModalNav from '../ModalNav/ModalNav';
import ModalSignin from '../ModalSignin/ModalSignin';
import ModalSignup from '../ModalSignup/ModalSignup';

const Auth = () => {
  const dispatch = useDispatch();
  const isModalSignupOpen = useSelector((state: TState) => state.auth.isModalSignupOpen);
  const isModalSigninOpen = useSelector((state: TState) => state.auth.isModalSigninOpen);
  const currentUser = useSelector((state: TState) => state.auth.currentUser);
  const isLogined = useSelector((state: TState) => state.auth.isLogined);

  const [isModalNavOpen, setIsModalNavOpen] = useState(false);

  const handleBurgerClick = () => {
    setIsModalNavOpen(true);
  };

  const handleModalNavCloseClick = () => {
    setIsModalNavOpen(false);
  };

  const handleSignupClick = () => {
    dispatch(setIsModalSignupOpen(true));
  };

  const handleModalSignupCloseClick = () => {
    dispatch(setIsModalSignupOpen(false));
  };

  const handleSigninClick = () => {
    dispatch(setIsModalSigninOpen(true));
  };

  const handleModalSigninCloseClick = () => {
    dispatch(setIsModalSigninOpen(false));
  };

  const handelSignOutClick = () => {
    dispatch(setIsLogined(false));
    dispatch(setCurrentUser(initialState));
  };

  const signinButton = (
    <button onClick={handleSigninClick} type="button" className={styles.button}>
      Sign In
    </button>
  );

  const signupButton = (
    <button onClick={handleSignupClick} type="button" className={styles.button}>
      Sign Up
    </button>
  );

  const signOutButton = (
    <button onClick={handelSignOutClick} type="button" className={styles.button}>
      Выход
    </button>
  );

  const currentUserNameNode = <p>{currentUser.name}</p>;

  return (
    <div className={styles.wrap}>
      {isLogined ? currentUserNameNode : signinButton}
      {isLogined ? signOutButton : signupButton}
      <div className={styles.burger} onClick={handleBurgerClick}>
        <div className={styles.burger_item}></div>
        <div className={styles.burger_item}></div>
        <div className={styles.burger_item}></div>
      </div>
      {isModalNavOpen ? <ModalNav onClose={handleModalNavCloseClick} /> : ''}
      {isModalSigninOpen ? <ModalSignin onClose={handleModalSigninCloseClick} /> : ''}
      {isModalSignupOpen ? (
        <ModalSignup onClose={handleModalSignupCloseClick} openSignin={handleSigninClick} />
      ) : (
        ''
      )}
    </div>
  );
};

export default Auth;
