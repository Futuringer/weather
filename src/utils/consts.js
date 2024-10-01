export const CHART_TYPES = {
  line: {
    label: 'Линейный график',
    type: 'LineChart',
  },
  bar: {
    label: 'Гистограмма',
    type: 'BarChart',
  },
  avg: {
    label: 'График со скользящей',
    type: 'MovingAvgChart',
  },
};

export const SELECT_OPTIONS = Object.keys(CHART_TYPES).map((item) => {
  return { label: CHART_TYPES[item]['label'], value: CHART_TYPES[item]['type'] };
});
