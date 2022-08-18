import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './ModalNav.module.css';
import { ERoutes } from '../../../utils/constants';

interface IProps {
  onClose: () => void;
}

const ModalNav = (props: IProps) => {
  const url = useLocation().pathname;

  return (
    <div className={styles.modal}>
      <nav className={styles.wrap}>
        <span className={styles.close} onClick={props.onClose}>
          X
        </span>
        <ul className={styles.link_list}>
          <li
            onClick={props.onClose}
            className={`${styles.link_item} ${url === ERoutes.home ? styles.item_active : ''}`}>
            <Link to={ERoutes.home} className={styles.link}>
              Home
            </Link>
          </li>
          <li
            onClick={props.onClose}
            className={`${styles.link_item} ${url === ERoutes.tutorial ? styles.item_active : ''}`}>
            <Link to={ERoutes.tutorial} className={styles.link}>
              Tutorial
            </Link>
          </li>
          <li
            onClick={props.onClose}
            className={`${styles.link_item} ${
              url === ERoutes.statistics ? styles.item_active : ''
            }`}>
            <Link to={ERoutes.statistics} className={styles.link}>
              Statistics
            </Link>
          </li>
          <li
            onClick={props.onClose}
            className={`${styles.link_item} ${url === ERoutes.games ? styles.item_active : ''}`}>
            <Link to={ERoutes.games} className={styles.link}>
              Games
            </Link>
          </li>
          <li
            onClick={props.onClose}
            className={`${styles.link_item} ${url === ERoutes.about ? styles.item_active : ''}`}>
            <Link to={ERoutes.about} className={styles.link}>
              About us
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default ModalNav;
