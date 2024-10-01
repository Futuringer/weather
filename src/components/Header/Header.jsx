import styles from './header.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../api/authApiSlice';
import { useNavigate } from 'react-router-dom';

export const Header = () => {
  const navigate = useNavigate();
  const username = useSelector((state) => state.auth.username);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  return (
    <header className={styles.header}>
      <button type="button" onClick={handleLogout} className={styles.button}>
        Выход
      </button>
      <div className={styles.avatar} />
      <span className={styles.username}>{username}</span>
    </header>
  );
};
