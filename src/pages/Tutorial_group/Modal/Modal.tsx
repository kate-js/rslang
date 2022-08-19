import styles from './Modal.module.css';

type Props = {
  modal: boolean;
  setModal: (item: boolean) => void;
};

export const Modal = ({ modal, setModal }: Props) => {
  const rootClasses = [styles.Modal];

  if (modal) {
    rootClasses.push(styles.active);
  }

  return (
    <div className={rootClasses.join(' ')} onClick={() => setModal(false)}>
      <div className={styles.ModalContent} onClick={(e) => e.stopPropagation()}>
        Word
      </div>
    </div>
  );
};
