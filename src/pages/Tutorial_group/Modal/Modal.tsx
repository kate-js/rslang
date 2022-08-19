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
        <p>само слово</p>
        <p>транскрипция</p>
        <p>перевод</p>
        <p>предложение с объяснением значения слова, перевод предложения</p>
        <p>предложение с примером использования изучаемого слова, перевод предложения</p>
        <p>картинка-ассоциация к изучаемому слову</p>
        <p>
          иконка аудио, при клике по которой последовательно звучит произношение изучаемого слова,
          произношение предложения с объяснением его значения, произношение предложения с примером
          его использования
        </p>
      </div>
    </div>
  );
};
