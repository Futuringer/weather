import React from 'react';
import styles from './unauthError.module.scss';
import { Link } from 'react-router-dom';

export const UnauthError = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.text}>
          <h1 className={styles.title}>403</h1>
          <span className={styles.description}>Отказано в доступе</span>
        </div>
        <Link to={'/signup'} className={styles.link}>
          Зарегистрироваться
        </Link>
      </div>
    </div>
  );
};
