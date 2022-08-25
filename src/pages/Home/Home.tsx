import style from './Home.module.css';
// import Image from './assets/Main.png';

export const Home = () => {
  return (
    <div className={style.main}>
      <div className={style.main_info}>
        <h1>Английский язык</h1>
        <p>
          Изучение английского языка имеет ряд преимуществ. Во-первых, хорошо знать, по крайней
          мере, один иностранный язык. Во-вторых, английский язык довольно понятный для восприятия и
          мелодичный. И, наконец, он дает возможность путешествовать и общаться с людьми разных
          национальностей, и быть уверенным, что тебя поняли.
        </p>
      </div>
      {/* <img src={Image} alt="image with people" className={style.main_image} /> */}
    </div>
  );
};
