import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ModalSignin.module.css';

interface IProps {
  onClose: () => void;
}

const ModalSignin = (props: IProps) => {
  return (
    <div className={styles.modal}>
      <nav className={styles.wrap}>
        <span className={styles.close} onClick={props.onClose}>
          X
        </span>
        <h2 className={styles.title}>Sign In</h2>
        <form className={styles.form} name="signin">
          <div className={styles.input_item}>
            <label className={styles.input_label}>E-mail</label>
            <input
              required
              placeholder="Email"
              className={styles.input}
              name="email"
              type="email"
            />
          </div>
          <div className={styles.input_item}>
            <label className={styles.input_label}>Password</label>
            <input
              required
              placeholder="Password"
              className={styles.input}
              name="password"
              type="password"
            />
          </div>
        </form>

        <div className={styles.control_wrap}>
          <button type="submit" className={styles.button} aria-label="Sign In">
            Sign In
          </button>
          <div className={styles.text_container}>
            <p className={styles.text}>Ещё не зарегистрированы?</p>
            <p className={styles.text_link}>Регистрация</p>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default ModalSignin;
