export class DateDiff {
  private date1: Date;
  private date2: Date;
  private differenceInMs: number;

  constructor(date1: Date, date2: Date) {
    this.date1 = date1;
    this.date2 = date2;
    this.differenceInMs = Math.abs(date2.getTime() - date1.getTime());
  }

  years(): number {
    const yearsDiff = this.differenceInMs / (1000 * 60 * 60 * 24 * 365.25); // 365.25 to account for leap years
    return parseFloat(yearsDiff.toFixed(1));
  }

  months(): number {
    const monthsDiff = this.differenceInMs / (1000 * 60 * 60 * 24 * 30.44); // Average days in a month (30.44)
    return Math.floor(monthsDiff);
  }

  days(): number {
    const daysDiff = this.differenceInMs / (1000 * 60 * 60 * 24);
    return Math.floor(daysDiff);
  }

  weeks(): number {
    const weeksDiff = this.differenceInMs / (1000 * 60 * 60 * 24 * 7);
    return parseFloat(weeksDiff.toFixed(1));
  }

  hours(): number {
    const hoursDiff = this.differenceInMs / (1000 * 60 * 60);
    return Math.floor(hoursDiff);
  }

  minutes(): number {
    const minutesDiff = this.differenceInMs / (1000 * 60);
    return Math.floor(minutesDiff);
  }

  seconds(): number {
    const secondsDiff = this.differenceInMs / 1000;
    return Math.floor(secondsDiff);
  }
}
