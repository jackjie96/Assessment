export const uniqueArray = (array) => {
  const seen = new Set();
  return array.filter((item) => {
    const serializedItem = JSON.stringify(item);
    return seen.has(serializedItem) ? false : seen.add(serializedItem);
  });
};
