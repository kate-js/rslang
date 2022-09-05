import { Link, useNavigate } from 'react-router-dom';
import { ERoutes, WordResponse } from '../../../utils/constants';
import { EApiParametrs } from '../../../api/apiConstants';
import styles from './Modal.module.css';
import iconSpeaker from '../assets/speaker.svg';
import React from 'react';

type Props = {
  setIsModalVisible: (flag: boolean) => void;
  answerWrong: WordResponse[];
  answerCorrect: WordResponse[];
};

export const Modal = ({ setIsModalVisible, answerWrong, answerCorrect }: Props) => {
  const handelCloseClick = () => {
    setIsModalVisible(false);
  };

  const navigate = useNavigate();
  const refreshPage = () => {
    setIsModalVisible(false);
    navigate(0);
  };

  const handelWordAudioPlay = (e: React.MouseEvent<HTMLUListElement, MouseEvent>) => {
    let url;
    if (e.target instanceof HTMLImageElement) {
      url = e.target.dataset.url;
      const wordAudio = new Audio(`${EApiParametrs.baseUrl}/${url}`);
      wordAudio.play();
    }
  };

  return (
    <div className={styles.modal}>
      <div className={styles.content}>
        <h2 className={styles.title}>Результаты игры</h2>

        <div className={styles.result_wrap}>
          <div className={styles.wrong_wrap}>
            <div className={styles.section_header}>
              <h3 className={styles.subtitle}>Ошибок</h3>
              <span className={styles.wrong_counter}>
                {answerWrong.length ? answerWrong.length : 0}
              </span>
            </div>
            <ul className={styles.section_content} onClick={handelWordAudioPlay}>
              {answerWrong.map((el) => {
                return (
                  <li key={el.id} className={styles.section_item}>
                    <img
                      className={styles.speaker}
                      src={iconSpeaker}
                      alt="динамик"
                      data-url={el.audio}
                    />
                    <span className={styles.word}>{el.word}</span>
                    <span className={styles.translation}>- {el.wordTranslate}</span>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className={styles.correct_wrap}>
            <div className={styles.section_header}>
              <h3 className={styles.subtitle}>Знаю</h3>
              <span className={styles.correct_counter}>
                {answerCorrect.length ? answerCorrect.length : 0}
              </span>
            </div>
            <ul className={styles.section_content} onClick={handelWordAudioPlay}>
              {answerCorrect.map((el) => {
                return (
                  <li key={el.id} className={styles.section_item}>
                    <img
                      className={styles.speaker}
                      src={iconSpeaker}
                      alt="динамик"
                      data-url={el.audio}
                    />
                    <span className={styles.word}>{el.word}</span>
                    <span className={styles.translation}>- {el.wordTranslate}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className={styles.links_wrap}>
          <Link onClick={handelCloseClick} to={ERoutes.games} className={styles.link}>
            Вернуться к выбору игры
          </Link>
          <Link onClick={refreshPage} className={styles.link} to={''}>
            Продолжить играть
          </Link>
        </div>
      </div>
    </div>
  );
};
