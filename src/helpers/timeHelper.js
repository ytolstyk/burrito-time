export const timeHelper = {
  count(now, stamp) {
    let elapsed = now - stamp;

    if (elapsed < 0) {
      elapsed = 0;
    }

    let milliseconds = Math.floor(elapsed % 1000);
    let seconds = Math.floor((elapsed % (1000 * 60)) / 1000);
    let minutes = Math.floor((elapsed % (1000 * 60 * 60)) / (1000 * 60));
    let hours = Math.floor((elapsed % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const days = Math.floor(elapsed / (1000 * 60 * 60 * 24));

    hours = timeHelper.alwaysTwoDigits(hours);
    minutes = timeHelper.alwaysTwoDigits(minutes);
    seconds = timeHelper.alwaysTwoDigits(seconds);
    milliseconds = timeHelper.alwaysThreeDigits(milliseconds);
    const dayOrDays = days === 1 ? 'day' : 'days';

    return `${days} ${dayOrDays}, ${hours}:${minutes}:${seconds}.${milliseconds}`;
  },

  alwaysTwoDigits(num) {
    return num < 10 ? `0${num}` : num;
  },

  alwaysThreeDigits(num) {
    if (num < 10) {
      return `00${num}`;
    }

    if (num < 100) {
      return `0${num}`;
    }

    return num;
  },
};
