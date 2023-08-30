export const getCurrentMonth = () => new Date().getMonth();

export const getPreviousMonthDays = (
  activeYear: number,
  activeMonth: number
) => {
  const date = new Date(activeYear, activeMonth, 1);
  const firstDayofMonth = date.getDay();
  const lastDayOfLastMonth = new Date(activeYear, activeMonth, 0).getDate();

  let lastMonthDays = Array();
  for (let i = firstDayofMonth; i > 0; i--) {
    lastMonthDays = [...lastMonthDays, lastDayOfLastMonth - i + 1];
  }

  return lastMonthDays;
};

export const getCurrentMonthDays = (
  activeYear: number,
  activeMonth: number
) => {
  const lastDayOfCurrentMonth = new Date(activeYear, activeMonth + 1, 0).getDate();
  console.log(lastDayOfCurrentMonth, activeYear, activeMonth)

  let daysArray = Array();
  for (let i = 1; i < lastDayOfCurrentMonth + 1; i++) {
    daysArray = [...daysArray, i];
  }
  return daysArray;
};

export const isSameData = (date1: string, date2: string) => {
  return (
    new Date(date1).getFullYear() === new Date(date2).getFullYear() &&
    new Date(date1).getDate() === new Date(date2).getDate() &&
    new Date(date1).getMonth() === new Date(date2).getMonth()
  );
};

export const getISOData = (
  day: number,
  month: number,
  year: number
): string => {
  return new Date(Date.UTC(year, month, day, 0, 0, 0)).toISOString();
};

export const getNormalizedDataForPath = (
  day: number,
  month: number,
  year: number
): string => {
  const normalizedMonth = month < 10 ? '0' + month : month;
  const normalizedDay = day < 10 ? '0' + day : day;
  return year + '-' + normalizedMonth + '-' + normalizedDay;
};

export const getNormalizedData = (month: number, year: number): string => {
  const normalizedMonth = month < 10 ? '0' + month : month;
  return normalizedMonth + ',' + year;
};
