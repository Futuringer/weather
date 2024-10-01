import styles from './chartWindow.module.scss';
import { CHART_TYPES } from '../../utils/consts';
import { LineChart } from '../charts/LineChart/LineChart';
import { BarChart } from '../charts/BarChart/BarChart';
import { MovingAvgChart } from '../charts/MovingAvgChart/MovingAvgChart';
import { useSelector } from 'react-redux';
import { useContext, useMemo } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  BarElement,
} from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';
import { ThemeContext } from '../../utils/contexts/ThemeContexts';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  zoomPlugin,
  TimeScale,
  BarElement
);

export const ChartWindow = () => {
  const { theme } = useContext(ThemeContext);
  const {
    time: labels,
    temperature_2m_max: temperature,
    relative_humidity_2m_max: humidity,
  } = useSelector((state) => state.weather.data?.daily || {});

  const status = useSelector((state) => state.weather.status);
  const currentChart = useSelector((state) => state.weather.config.currentChart);

  const dataMessage = useMemo(() => {
    const isDataIncompete = !labels || !temperature || !humidity;

    // Первоначальная загрузка данных
    if (status === 'loading' && isDataIncompete) {
      return 'Loading...';
    }
    // Загрузка прошла, но данные отсутствуют
    if (isDataIncompete) {
      return 'Data is invalid';
    }

    return null;
  }, [labels, status, temperature, humidity]);

  return (
    <>
      {!dataMessage ? (
        <div className={styles.container}>
          {currentChart === CHART_TYPES.line.type ? (
            <LineChart data={{ temperature, humidity }} labels={labels} theme={theme}></LineChart>
          ) : currentChart === CHART_TYPES.bar.type ? (
            <BarChart data={{ temperature, humidity }} labels={labels} theme={theme}></BarChart>
          ) : (
            currentChart === CHART_TYPES.avg.type && (
              <MovingAvgChart data={{ temperature, humidity }} step={3} labels={labels} theme={theme} />
            )
          )}
        </div>
      ) : (
        <div className={styles['empty-data']}>{dataMessage}</div>
      )}
    </>
  );
};
