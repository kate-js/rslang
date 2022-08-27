import styles from './Modal.module.css';
import ReactAudioPlayer from 'react-audio-player';
import { IModal } from '../../../utils/constants';
import { EApiParametrs } from '../../../utils/Api';

export const Modal = ({ modal, setModal, word }: IModal) => {
  const rootClasses = [styles.Modal];
  if (modal) {
    rootClasses.push(styles.active);
  }

  return (
    <div className={rootClasses.join(' ')} onClick={() => setModal(false)}>
      <div className={styles.ModalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modal_main}>
          <h1>{word?.word}</h1>
          <p>{word?.transcription}</p>
          <h3>{word?.wordTranslate}</h3>
          {word?.image ? <img src={`${EApiParametrs.baseUrl}/${word?.image}`} alt="" /> : null}
        </div>
        <div className={styles.modal_examples}>
          <div className={styles.modal_example}>
            <p>{word?.textExample}</p>
            <p>{word?.textExampleTranslate}</p>
            {word?.audioExample ? (
              <ReactAudioPlayer src={`${EApiParametrs.baseUrl}/${word?.audioExample}`} controls />
            ) : null}
          </div>
          <div className={styles.modal_example}>
            <p>{word?.textMeaning}</p>
            <p>{word?.textMeaningTranslate}</p>
            {word?.audioMeaning ? (
              <ReactAudioPlayer src={`${EApiParametrs.baseUrl}/${word?.audioMeaning}`} controls />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};
