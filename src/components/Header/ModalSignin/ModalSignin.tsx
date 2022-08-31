import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styles from './ModalSignin.module.css';
// import { api } from '../../../utils/Api';
import { apiUsers } from '../../../api/apiUsers';
import { setIsLogined, setCurrentUser } from '../../../store/authSlice';

interface IProps {
  onClose: () => void;
}

const ModalSignin = (props: IProps) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handelEmailChange = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    setEmail(target.value);
  };

  const handelPasswordChange = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    setPassword(target.value);
  };

  const handelSigninSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await apiUsers.signin({ email, password });
      dispatch(setCurrentUser(res));
      dispatch(setIsLogined(true));
      localStorage.setItem('currentUser', JSON.stringify(res));
      props.onClose();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.modal}>
      <nav className={styles.wrap}>
        <span className={styles.close} onClick={props.onClose}>
          X
        </span>
        <h2 className={styles.title}>Sign In</h2>
        <form className={styles.form} onSubmit={handelSigninSubmit} name="signin">
          <div className={styles.input_item}>
            <label className={styles.input_label}>E-mail</label>
            <input
              defaultValue={email}
              onChange={handelEmailChange}
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
              defaultValue={password}
              onChange={handelPasswordChange}
              required
              placeholder="Password"
              className={styles.input}
              name="password"
              type="password"
            />
          </div>
          <button type="submit" className={styles.button} aria-label="Sign In">
            Sign In
          </button>
        </form>
      </nav>
    </div>
  );
};

export default ModalSignin;
