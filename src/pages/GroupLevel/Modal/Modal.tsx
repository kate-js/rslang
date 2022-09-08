import styles from './Modal.module.css';
// import AudioPlayer from 'react-audio-player';
import buttonStyles from '../../../components/UI/Button/Button.module.css';
import Hard from '../assets/hard-word.png';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { TState } from '../../../store/store';
import { IModal } from '../../../utils/constants';
import { api, EApiParametrs } from '../../../utils/Api';
import AudioImage from '../../Audio/assets/audio.png';
import ReactAudioPlayer from 'react-audio-player';

function fixComponent<T>(component: T): T {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (component as any).default ?? component;
}
export const AudioPlayer = fixComponent(ReactAudioPlayer);

export const Modal = ({ modal, setModal, word, changeModal }: IModal) => {
  const token = useSelector((state: TState) => state.auth.currentUser.token);
  const userId = useSelector((state: TState) => state.auth.currentUser.userId);
  const isLodined = useSelector((state: TState) => state.auth.isLogined);
  const [hard, setHard] = useState<boolean>();
  const [learn, setLearn] = useState<boolean>();
  const [audio, setAudio] = useState<boolean>();

  useEffect(() => {
    if (word) {
      const getHard = word ? word.userWord?.difficulty === 'hard' : false;
      setHard(getHard);
      const getLearn = word ? word.userWord?.optional?.learningWord : false;
      setLearn(getLearn);
    }
  }, [changeModal]);

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
      const meta = word?.userWord || {};
      await api.changeHardWord({ userId, token, wordId, meta });
      console.error(error);
    }
    setHard(true);
    setLearn(false);
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
      const meta = word?.userWord || {};
      await api.changeLearningWord({ userId, token, wordId, meta });
    }
    setLearn(true);
    setHard(false);
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

  const music = [
    `${EApiParametrs.baseUrl}/${word?.audio}`,
    `${EApiParametrs.baseUrl}/${word?.audioExample}`,
    `${EApiParametrs.baseUrl}/${word?.audioMeaning}`
  ];

  const [currentSong, setCurrentSong] = useState(0);
  const song = music[currentSong];

  return (
    <div className={rootClasses.join(' ')} onClick={() => setModal(false)}>
      <div className={styles.ModalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modal_main}>
          <div className={styles.modal_title}>
            <h1>{word?.word}</h1>
            <p>{word?.transcription}</p>
            <h3>{word?.wordTranslate}</h3>
            <div>
              {hard ? <img src={Hard} alt="mark-hard-word" className={styles.hard_word} /> : null}
              <img src={AudioImage} onClick={() => setAudio(!audio)} className={styles.hard_word} />
              {audio ? (
                <AudioPlayer
                  autoPlay
                  src={song}
                  onPlay={() => console.log('playing')}
                  onEnded={() => setCurrentSong((i) => i + 1)}
                />
              ) : null}
            </div>
          </div>
          {word?.image ? <img src={`${EApiParametrs.baseUrl}/${word?.image}`} alt="" /> : null}
        </div>
        <div>
          <div className={styles.modal_examples}>
            <div className={styles.modal_example}>
              <p dangerouslySetInnerHTML={{ __html: word?.textExample as string }} />
              <p>{word?.textExampleTranslate}</p>
            </div>
            <div className={styles.modal_example}>
              <p dangerouslySetInnerHTML={{ __html: word?.textMeaning as string }} />
              <p>{word?.textMeaningTranslate}</p>
            </div>
          </div>
        </div>
        {isLodined ? (
          <div>
            {hard ? (
              <button onClick={deleteHardWord} className={buttonStyles.button}>
                Удалить из сложного
              </button>
            ) : (
              <button onClick={sendHardWord} className={buttonStyles.button}>
                Добавить в сложные
              </button>
            )}
            {learn ? (
              <button onClick={deleteLearningWord} className={buttonStyles.button}>
                Удалить из изученного
              </button>
            ) : (
              <button onClick={addLearnWord} className={buttonStyles.button}>
                Пометить как изученное
              </button>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
};
