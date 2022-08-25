import styles from './Modal.module.css';

type Props = {
  children: React.ReactNode;
  visible: boolean;
};

export const Modal = ({ children, visible }: Props) => {
  const rootClasses = [styles.modal];

  if (visible) {
    rootClasses.push(styles.active);
  }

  return (
    <div className={rootClasses.join(' ')}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};
