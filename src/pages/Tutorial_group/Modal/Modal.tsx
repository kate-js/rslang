import styles from './Modal.module.css';
import ReactAudioPlayer from 'react-audio-player';
import { IModal } from '../../../utils/constants';

export const Modal = ({ modal, setModal, word }: IModal) => {
  const rootClasses = [styles.Modal];
  if (modal) {
    rootClasses.push(styles.active);
  }

  return (
    <div className={rootClasses.join(' ')} onClick={() => setModal(false)}>
      <div className={styles.ModalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modal_main}>
          <h1>{word.word}</h1>
          <p>{word.transcription}</p>
          <h3>{word.wordTranslate}</h3>
          <img src={`https://react-learnwords-example.herokuapp.com/${word.image}`} alt="" />
        </div>
        <div className={styles.modal_examples}>
          <div className={styles.modal_example}>
            <p>{word.textExample}</p>
            <p>{word.textExampleTranslate}</p>
            <ReactAudioPlayer
              src={`https://react-learnwords-example.herokuapp.com/${word.audioExample}`}
              controls
            />
          </div>
          <div className={styles.modal_example}>
            <p>{word.textMeaning}</p>
            <p>{word.textMeaningTranslate}</p>
            <ReactAudioPlayer
              src={`https://react-learnwords-example.herokuapp.com/${word.audioMeaning}`}
              controls
            />
          </div>
        </div>
      </div>
    </div>
  );
};
