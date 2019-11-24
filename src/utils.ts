export const getRandomColor = () => {
  const colors = [
    '#ab0d86',
    '#ffe107',
    '#47fcba',
    '#f03580',
    '#26bdff',
    '#ff9900'
  ];
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
};
