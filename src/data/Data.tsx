import A1 from '../pages/Tutorial/assets/A1.png';
import A2 from '../pages/Tutorial/assets/A2.png';
import C1 from '../pages/Tutorial/assets/C1.png';
import C2 from '../pages/Tutorial/assets/C2.png';
import B1 from '../pages/Tutorial/assets/B1.png';
import B2 from '../pages/Tutorial/assets/B2.png';
import { cardTutorial } from '../utils/constants';
import image from '../assets/member-photo.png';

export const fontPageTutorial: cardTutorial[] = [
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
  }
];

export const membersData = [
  {
    img: image,
    name: 'Иван Потапов',
    role: 'Team Lead',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. ',
    link: 'https://github.com/ivnpotapov'
  },
  {
    img: image,
    name: 'Екатерина Вакульская',
    role: 'Developer',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    link: 'https://github.com/kate-js'
  },
  {
    img: image,
    name: 'Глеб Сидоренко',
    role: 'Developer',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    link: 'https://github.com/glsidorenko'
  }
];
