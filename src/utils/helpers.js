/**
 * Рассчитывает скользящую среднюю для заданных данных.
 *
 * @param {number[]} data - Исходный массив
 * @param {number} step - Сколько точек будет объединено для создания скользящей
 * @returns {(number|null)[]} - Массив усредненных значений, для первых нескольких будет null, пока не накопилось данных для формирования средней
 */
export const calculateMovingAverage = (data, step) => {
  const movingAverage = [];
  for (let i = 0; i < data.length; i++) {
    if (i < step - 1) {
      movingAverage.push(null);
    } else {
      const windowData = data.slice(i - step + 1, i + 1);
      const average = windowData.reduce((sum, value) => sum + value, 0) / step;
      movingAverage.push(average);
    }
  }
  return movingAverage;
};
