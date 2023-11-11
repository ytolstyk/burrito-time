import moment from "moment";

const oneDayInMilliseconds = 86400000;
export const oneWeekInMilliseconds = oneDayInMilliseconds * 7;
export const oneMonthInMilliseconds = oneDayInMilliseconds * 30;
export const onYearInMilliseconds = oneDayInMilliseconds * 365;

export const timeHelper = {
  count(now: number, stamp: number) {
    let elapsed = now - stamp;

    if (elapsed < 0) {
      elapsed = 0;
    }

    const tenthSeconds = Math.floor(elapsed % (1000) / 100)
    const seconds = timeHelper.alwaysTwoDigits(Math.floor((elapsed % (1000 * 60)) / 1000));
    const minutes = timeHelper.alwaysTwoDigits(Math.floor((elapsed % (1000 * 60 * 60)) / (1000 * 60)));
    const hours = timeHelper.alwaysTwoDigits(Math.floor((elapsed % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    const days = Math.floor(elapsed / (1000 * 60 * 60 * 24));

    const dayOrDays = days === 1 ? "day" : "days";

    return `${days} ${dayOrDays}, ${hours}:${minutes}:${seconds}.${tenthSeconds}`;
  },

  alwaysTwoDigits(num: number) {
    return num < 10 ? `0${num}` : num;
  },

  formatTime(time: string | number | Date) {
    return moment(time).format("MMMM Do YYYY, h:mm:ssa");
  },
};

export function yearWorthOfTimestamps(timestamps: number[]) {
  const now = Date.now();
  // consider using while loop and unshift because these are sorted
  return timestamps.filter((stamp) => now - stamp < onYearInMilliseconds);
}
