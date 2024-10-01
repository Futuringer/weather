import styles from './Layout.module.scss';
import { Outlet } from 'react-router-dom';

export const Layout = () => {
  return (
    <main className={styles.main}>
      <Outlet />
    </main>
  );
};
