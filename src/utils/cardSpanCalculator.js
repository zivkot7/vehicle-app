export const cardSpanCalculator = (totalItems, itemsInRow) => {
  const span = 12 / Math.min(totalItems, itemsInRow);
  return span;
};
