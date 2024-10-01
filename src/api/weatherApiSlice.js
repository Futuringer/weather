import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { CHART_TYPES } from '../utils/consts';

// TODO доработать логику подгрузки только недостающих дней
export const fetchWeather = createAsyncThunk('weather/fetchWeather', async (_, { getState }) => {
  const { weather } = getState();
  const { start, end } = weather.config.date;
  const response = await fetch(
    `https://archive-api.open-meteo.com/v1/era5?latitude=52.52&longitude=13.41&start_date=${start}&end_date=${end}&daily=temperature_2m_max,temperature_2m_min,relative_humidity_2m_max,relative_humidity_2m_min&timezone=Europe/Berlin`
  );
  return await response.json();
});

const weatherSlice = createSlice({
  name: 'weather',
  initialState: {
    config: {
      currentChart: CHART_TYPES.line.type,
      date: {
        start: '2021-01-01',
        end: '2021-02-31',
      },
    },
    data: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    setCurrentChart(state, action) {
      state.config.currentChart = action.payload;
    },
    setStartDate(state, action) {
      state.config.date.start = action.payload;
    },
    setEndDate(state, action) {
      state.config.date.end = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setCurrentChart, setStartDate, setEndDate } = weatherSlice.actions;

export default weatherSlice.reducer;
