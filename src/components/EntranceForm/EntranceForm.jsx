import cn from 'classnames';
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from './entranceForm.module.scss';
import { Link } from 'react-router-dom';
import { RegisterAndLoginSchema } from '../../utils/validationShemas';

const validationSchema = RegisterAndLoginSchema(Yup);

export const EntranceForm = ({ onSubmit, title, link, linkText, state }) => {
  return (
    <Formik initialValues={{ username: '', password: '' }} validationSchema={validationSchema} onSubmit={onSubmit}>
      <Form className={cn(styles.form, styles[state])}>
        <h1 className={styles.title}>{title}</h1>
        <div className={styles['input-container']}>
          <label htmlFor="username" className={styles.label}>
            Имя пользователя:
          </label>
          <Field name="username" type="text" className={styles.input} />
          <ErrorMessage name="username" component="div" className={styles['error-message']} />
        </div>
        <div className={styles['input-container']}>
          <label htmlFor="password" className={styles.label}>
            Пароль:
          </label>
          <Field name="password" type="password" className={styles.input} />
          <ErrorMessage name="password" component="div" className={styles['error-message']} />
        </div>
        <button type="submit" className={styles.button}>
          Подтвердить
        </button>
        <Link className={styles.link} to={link}>
          {linkText}
        </Link>
      </Form>
    </Formik>
  );
};
