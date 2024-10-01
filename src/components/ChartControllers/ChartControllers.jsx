import styles from './chartControllers.module.scss';
import { SELECT_OPTIONS } from '../../utils/consts';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import React, { useContext, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWeather, setStartDate, setEndDate, setCurrentChart } from '../../api/weatherApiSlice';
import Select from 'react-select';
import { ThemeContext } from '../../utils/contexts/ThemeContexts';

export const ChartControllers = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const dispatch = useDispatch();

  const startDate = useSelector((state) => state.weather.config.date.start);
  const endDate = useSelector((state) => state.weather.config.date.end);
  const currentChart = useSelector((state) => state.weather.config.currentChart);

  const currentSelectValue = useMemo(() => {
    return SELECT_OPTIONS.find((option) => option.value === currentChart);
  }, [currentChart]);

  const handleStartDateChange = (date) => {
    if (date) {
      dispatch(setStartDate(date.toISOString().split('T')[0]));
    }
  };
  const handleEndDateChange = (date) => {
    if (date) {
      dispatch(setEndDate(date.toISOString().split('T')[0]));
    }
  };
  const handleChartTypeChange = (selectedOption) => {
    dispatch(setCurrentChart(selectedOption.value));
  };
  const handleThemeChange = () => {
    toggleTheme();
  };

  useEffect(() => {
    dispatch(fetchWeather());
  }, [dispatch, startDate, endDate]);

  return (
    <div className={styles.container}>
      <div className={styles['controls-group']}>
        <DatePicker
          className={styles.datepicker}
          selected={new Date(startDate)}
          onChange={handleStartDateChange}
          dateFormat="yyyy-MM-dd"
          showMonthYearDropdown
        />
        <DatePicker
          className={styles.datepicker}
          selected={new Date(endDate)}
          onChange={handleEndDateChange}
          dateFormat="yyyy-MM-dd"
          showMonthYearDropdown
        />

        <Select
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              borderColor: '#e1e7ec',
            }),
          }}
          options={SELECT_OPTIONS}
          value={currentSelectValue}
          onChange={handleChartTypeChange}
          className={styles.select}
        />
      </div>
      <label className={styles.toggle} aria-label="theme switcher">
        <input type="checkbox" checked={theme === 'night'} onChange={handleThemeChange} />
        <span className={styles.slider}></span>
      </label>
    </div>
  );
};
