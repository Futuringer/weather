import React from 'react';
import styles from './SignupForm.module.scss';
import { EntranceForm } from '../EntranceForm/EntranceForm';
import { useNavigate } from 'react-router-dom';

export const SignupForm = () => {
  const navigate = useNavigate();
  const [registrationState, setRegistrationState] = React.useState(null);
  const title =
    registrationState === 'success'
      ? 'Вы успешно зарегистрированы'
      : registrationState === 'error'
      ? 'Пользователь с таким именем уже существует'
      : 'Зарегистрироваться';

  const handleSubmit = (values) => {
    const { username, password } = values;
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const existingUser = users.find((user) => user.username === username);

    if (existingUser) {
      setRegistrationState('error');
      return;
    }
    // Создаем нового пользователя и добавляем его в масиив пользователей в localStorage
    const newUser = {
      username,
      password,
    };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    setRegistrationState('success');

    setTimeout(() => {
      navigate('/login');
    }, 1500);
  };

  return (
    <div className={styles.container}>
      <EntranceForm
        onSubmit={handleSubmit}
        title={title}
        link={'/login'}
        linkText={'Войти'}
        state={registrationState}
      />
    </div>
  );
};
