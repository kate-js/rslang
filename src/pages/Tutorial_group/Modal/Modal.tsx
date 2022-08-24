import { IResponse } from '../../../utils/constants';
import styles from './Modal.module.css';
import ReactAudioPlayer from 'react-audio-player';

type Props = {
  modal: boolean;
  setModal: (item: boolean) => void;
  word: IResponse;
};

export const Modal = ({ modal, setModal, word }: Props) => {
  const rootClasses = [styles.Modal];
  console.log(word);
  if (modal) {
    rootClasses.push(styles.active);
  }

  return (
    <div className={rootClasses.join(' ')} onClick={() => setModal(false)}>
      <div className={styles.ModalContent} onClick={(e) => e.stopPropagation()}>
        <p>{word.word}</p>
        <p>{word.transcription}</p>
        <p>{word.wordTranslate}</p>
        <p>{word.textExample}</p>
        <p>{word.textExampleTranslate}</p>
        <ReactAudioPlayer
          src={`https://react-learnwords-example.herokuapp.com/${word.audioExample}`}
          autoPlay
          controls
        />
        <p>{word.textMeaning}</p>
        <p>{word.textMeaningTranslate}</p>
        <img src={`https://react-learnwords-example.herokuapp.com/${word.image}`} alt="" />
        <ReactAudioPlayer
          src={`https://react-learnwords-example.herokuapp.com/${word.audioMeaning}`}
          autoPlay
          controls
        />
      </div>
    </div>
  );
};
