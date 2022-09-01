import styles from './Modal.module.css';

type Props = {
  setIsModalVisible: (flag: boolean) => void;
  children: React.ReactNode;
};

export const Modal = ({ children, setIsModalVisible }: Props) => {
  const handelCloseClick = () => {
    setIsModalVisible(false);
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        {/* <span className={styles.modalClose} onClick={handelCloseClick}>
          X
        </span> */}
        {children}
      </div>
    </div>
  );
};
