import styles from './Modal.module.css';
import ReactAudioPlayer from 'react-audio-player';
import { IModal } from '../../../utils/constants';
import { api, EApiParametrs } from '../../../utils/Api';
import { useSelector } from 'react-redux';
import { TState } from '../../../store/store';
import buttonStyles from '../../../components/UI/Button/Button.module.css';
import Hard from '../assets/hard-word.png';

export const Modal = ({ modal, setModal, word, hard, learn, setHard, setLearn }: IModal) => {
  const token = useSelector((state: TState) => state.auth.currentUser.token);
  const userId = useSelector((state: TState) => state.auth.currentUser.userId);
  const isLodined = useSelector((state: TState) => state.auth.isLogined);

  const rootClasses = [styles.Modal];
  if (modal) {
    rootClasses.push(styles.active);
  }

  async function sendHardWord() {
    if (!word) {
      return;
    }
    const wordId = word._id || word.id;
    try {
      await api.addHardWord({ userId, token, wordId });
    } catch (error) {
      await api.changeHardWord({ userId, token, wordId });
      console.error(error);
    }
    setHard(true);
  }

  async function deleteHardWord() {
    if (!word) {
      return;
    }
    try {
      const wordId = word._id || word.id;
      await api.delHardWord({ userId, token, wordId });
    } catch (error) {
      console.error(error);
    }
    setHard(false);
  }

  async function addLearnWord() {
    if (!word) {
      return;
    }
    const wordId = word._id || word.id;
    try {
      await api.addLearningWord({ userId, token, wordId });
    } catch (error) {
      await api.changeLearningWord({ userId, token, wordId });
    }
    setLearn(true);
  }

  async function deleteLearningWord() {
    if (!word) {
      return;
    }
    try {
      const wordId = word._id || word.id;
      await api.deleteLearningWord({ userId, token, wordId });
    } catch (error) {
      console.error(error);
    }
    setLearn(false);
  }

  return (
    <div className={rootClasses.join(' ')} onClick={() => setModal(false)}>
      <div className={styles.ModalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modal_main}>
          <div className={styles.modal_title}>
            <h1>{word?.word}</h1>
            <p>{word?.transcription}</p>
            <h3>{word?.wordTranslate}</h3>
            {hard ? <img src={Hard} alt="mark-hard-word" className={styles.hard_word} /> : null}
          </div>
          {word?.image ? <img src={`${EApiParametrs.baseUrl}/${word?.image}`} alt="" /> : null}
        </div>
        <div>
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
        {isLodined ? (
          <div>
            {!hard ? (
              <button onClick={sendHardWord} className={buttonStyles.button}>
                Добавить в сложные
              </button>
            ) : (
              <button onClick={deleteHardWord} className={buttonStyles.button}>
                Удалить из сложного
              </button>
            )}
            {!learn ? (
              <button onClick={addLearnWord} className={buttonStyles.button}>
                Пометить как изученное
              </button>
            ) : (
              <button onClick={deleteLearningWord} className={buttonStyles.button}>
                Удалить из изученного
              </button>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
};
