const formatNumber = (number) => {
  if (number <= 9) return `0${number}`;
  return number;
};

export const formatDate = (date) => {
  const tempDate = new Date(date);
  const formattedDate = `${formatNumber(tempDate.getDate())}/${formatNumber(
    tempDate.getMonth() + 1
  )}/${tempDate.getFullYear()}, ${formatNumber(
    tempDate.getHours()
  )}:${formatNumber(tempDate.getMinutes())}`;
  return formattedDate;
};
