import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styles from './ModalSignup.module.css';
// import { api } from '../../../utils/Api';
import { apiUsers } from '../../../api/apiUsers';
import { setIsLogined, setCurrentUser } from '../../../store/authSlice';
interface IProps {
  onClose: () => void;
  openSignin: () => void;
}

const ModalSignup = (props: IProps) => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handelUsernameChange = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    setUsername(target.value);
  };

  const handelEmailChange = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    setEmail(target.value);
  };

  const handelPasswordChange = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    setPassword(target.value);
  };

  const handelSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newUser = { name: username, email, password };
    try {
      await apiUsers.createNewUser(newUser);
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
        <h2 className={styles.title}>Sign Up</h2>
        <form className={styles.form} onSubmit={handelSignupSubmit} name="signup">
          <div className={styles.input_item}>
            <label className={styles.input_label}>Name</label>
            <input
              defaultValue={username}
              onChange={handelUsernameChange}
              required
              placeholder="Name"
              className={styles.input}
              name="username"
              type="text"
            />
          </div>
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
          <button type="submit" className={styles.button} aria-label="Sign Up">
            Sign Up
          </button>
        </form>
      </nav>
    </div>
  );
};

export default ModalSignup;
