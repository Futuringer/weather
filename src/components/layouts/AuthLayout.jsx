import styles from './Layout.module.scss';
import { Outlet } from 'react-router-dom';
import { Header } from '../Header/Header';
import { useSelector } from 'react-redux';

export const AuthLayout = () => {
  const username = useSelector((state) => state.auth.username);

  return (
    <>
      {username && <Header></Header>}
      <main className={styles.main}>
        <Outlet />
      </main>
    </>
  );
};
