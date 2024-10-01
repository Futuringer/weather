import cn from 'classnames';
import styles from './chartBlock.module.scss';
import { ChartControllers } from '../ChartControllers/ChartControllers';
import { ChartWindow } from '../ChartWindow/ChartWindow';
import { ThemeContext } from '../../utils/contexts/ThemeContexts';
import { useContext } from 'react';

export const ChartBlock = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <section className={styles.container}>
      <div className={cn(styles.chart, { [styles.night]: theme === 'night' })}>
        <ChartControllers />
        <ChartWindow />
      </div>
    </section>
  );
};
