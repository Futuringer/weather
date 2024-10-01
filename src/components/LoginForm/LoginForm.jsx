import React from 'react';
import styles from './LoginForm.module.scss';
import { EntranceForm } from '../EntranceForm/EntranceForm';
import { useNavigate } from 'react-router-dom';

export const LoginForm = () => {
  const navigate = useNavigate();
  const [registrationState, setRegistrationState] = React.useState(null);
  const title = registrationState === 'error' ? 'Неверные данные' : 'Войти';

  const handleSubmit = (values) => {
    const { username, password } = values;
    // Ищем пользователя по username в нашем локальном хранилище
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find((user) => user.username === username && user.password === password);

    // Если пользователь найден, добавляем токен и редиректим на главную страницу
    if (user) {
      localStorage.setItem('authToken', JSON.stringify({ username }));
      navigate('/');
    } else {
      setRegistrationState('error');
    }
  };

  return (
    <div className={styles.container}>
      <EntranceForm
        onSubmit={handleSubmit}
        title={title}
        link={'/signup'}
        linkText={'Зарегистрироваться'}
        state={registrationState}
      />
    </div>
  );
};
