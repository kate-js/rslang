import A1 from './assets/a1.png';
import A2 from './assets/a2.png';
import C1 from './assets/c1.png';
import C2 from './assets/c2.png';
import B1 from './assets/b1.png';
import B2 from './assets/b2.png';
import Hard from './assets/hard.png';
import { cardTutorial } from '../utils/constants';
import image from '../assets/member-photo.png';
import imgIvan from './assets/ivan.jpg';
import imgKate from './assets/kate.jpg';

export const Description: cardTutorial[] = [
  {
    id: 1,
    name: 'A1',
    bigName: 'A1. Уровень Beginner (Начальный)',
    url: A1,
    description:
      'Начало. Не фильм с ДиКаприо, конечно, но тоже очень увлекательно. Самые ходовые и простые слова, которые точно пригодятся в повседневном общении. Сможете сказать пару фраз о себе, об интересах, задать встречные вопросы и уж точно всегда спросить дорогу. Научитесь воспринимать на слух короткие предложения с элементарной лексикой. Можно будет писать открытки и заполнять анкеты!'
  },
  {
    id: 2,
    name: 'A2',
    bigName: 'A2. Уровень Elementary (Базовый)',
    url: A2,
    description:
      'Пройдёте - соберёте слова, которые помогут в небольшом простом диалоге в типичной ситуации (в магазине, при знакомстве с людьми), вы без проблем расскажете о предпочтениях в музыке, еде. Будете улавливать на слух самые простые и наиболее часто употребляемые слова и фразы. До среднего осталось совсем немного.'
  },
  {
    id: 3,
    name: 'B1',
    bigName: 'B1. Уровень Intermediate (Средний)',
    url: B1,
    description:
      'Если вы хотите более подробно описывать события или опыт, выражать свое мнение, подкрепляя его примерами - вам сюда. Отличный набор слов для использования в спонтанных диалогах. Будете читать тексты без специальной тематики (письма, статьи), понимать основную идею текста, несмотря на наличие 10% незнакомой лексики. Пройдя этот уровень, вы сможете расслабиться и понять, что также прошли и точку невозврата. :) А всё потому, что учить слова стало проще, а стремление - выше.'
  },
  {
    id: 4,
    name: 'B2',
    bigName: 'B2. Уровень Upper-Intermediate (Выше среднего)',
    url: B2,
    description:
      'Ощущаете прилив энергии, что “всё возможно!” и уже строите планы по использованию английского за рубежом? Вы достигли неплохих результатов. Пройдёте этот уровень и пробьете барьер неуверенности в общениии с носителями языка, сможете реагировать во всех типичных ситуациях; выражать, развивать и подверждать точку зрения, а если захотите - даже напишите сочинение.'
  },
  {
    id: 5,
    name: 'C1',
    bigName: 'C1. Уровень Advanced (Продвинутый)',
    url: C1,
    description:
      'Финиш уже близко. Слова этого уровня помогут вам наполнить речь сложными грамматическими структурами, синонимами. Коммуникация с носитлями не составит труда. Читать станет легко, писать - тоже.'
  },
  {
    id: 6,
    name: 'C2',
    bigName: 'C2. Уровень Proficiency (Владение в совершенстве)',
    url: C2,
    description:
      'Итак, finishная. Сложнее этих слов только подъемы с утра. Но вы справитесь. Бонусом будет прекрасное понимание и владение темой разговора без подготовки (включая узкоориентированные темы), свободное выражение мнения, чтение без услилий. Давно мечтали поговорить о медицине, астрологии или юриспруденции? Теперь это не будет проблемой.'
  },
  {
    id: 7,
    name: 'Hard Words',
    bigName: 'Hard Words - это ваш выбор!',
    url: Hard,
    description: 'Отмечайте сложные слова в данный раздел и учите в любое время.'
  }
];

export const membersData = [
  {
    img: imgIvan,
    name: 'Иван Потапов',
    role: 'Team Lead',
    description: 'Реализовал авторизацию, игру спринт.',
    link: 'https://github.com/ivnpotapov'
  },
  {
    img: imgKate,
    name: 'Екатерина Вакульская',
    role: 'Developer',
    description: 'Реализовала разделы учебник, главную страницу, страницу статистики.',
    link: 'https://github.com/kate-js'
  },
  {
    img: image,
    name: 'Глеб Сидоренко',
    role: 'Developer',
    description: 'Реализовал раздел о команде, страницу выбора игры, игру аудиовызов.',
    link: 'https://github.com/glsidorenko'
  }
];

export const UNITS = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27,
  28, 29, 30
];

export const LEVELS = {
  A1: 0,
  A2: 1,
  B1: 2,
  B2: 3,
  C1: 4,
  C2: 5,
  'HARD WORDS': 6
};

export const LEVELS_main = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'HARD WORDS'];

export const Statistics_title = ['Audio', 'Sprint', 'Words'];

export const Statistics = [
  {
    optional: {
      sprint: {
        learnNewWordPerDay: [
          {
            date: '05/09/2022',
            counter: 30
          }
        ],
        percentRigth: {
          right: 6,
          wrong: 4
        },
        longestStrick: 4
      },
      audio: {
        learnNewWordPerDay: [
          {
            date: '05/09/2022',
            counter: 13
          }
        ],
        percentRigth: {
          right: 6,
          wrong: 3
        },
        longestStrick: 8
      },
      total: {
        learnNewWordPerDay: [
          {
            date: '05/09/2022',
            counter: 3
          }
        ],
        percentRigth: {
          right: 34,
          wrong: 44
        },
        longestStrick: 7
      }
    }
  }
];
