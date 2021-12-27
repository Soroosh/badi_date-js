import SunCalc = require('suncalc');
import { BahaiHolyDayEnum, bahaiHolyDays } from './bahai_holyday';
import { yearSpecifics } from './years';


type nullableNumber = number | null;

const LAST_YEAR_SUPPORTED = 221;
const DAY_IN_MILLISECONDS = 86400000;
const YEAR_ONE_IN_GREGORIAN = 1844;
const YEAR_ZERO_IN_GREGORIAN = YEAR_ONE_IN_GREGORIAN -1;

// A Badi Date
export class BadiDate {
  readonly day: number;

  // The month number with Baha = 1, ... Ayyam'i'Ha = 19, and Ala = 20
  _monthIntern = -1;

  // The month number with Ayyam'i'Ha = 0 and Baha = 1, ... Ala = 19
  readonly month: number;

  // The full year of the Badi Calendar with 2020 AC = 177 BE
  readonly year: number;

  // longitude value of degree coordinates for sunset calculation in the range [-180,180]
  readonly longitude: nullableNumber;

  // latitude value of degree coordinates for sunset calculation in the range [-90,90]
  readonly latitude: nullableNumber;

  // day of the badi year
  readonly dayOfYear: number;

  // Badi date
  // for now only for the years up to LAST_YEAR_SUPPORTED
  // Dates before the year 172 are calculated according to the Baha'i Calendar
  // used in western countries.
  // parameters:
  // day int in range [1-19]
  // month int in range [0-19]
  // year int
  // longitude and latitude double for sunset calculation
  // ayyamIHa bool
  // For Ayyam'i'Ha set month to 0 or leave it empty and set ayyamIHa to true
  constructor(
    year: number,
    month: number,
    day: number,
    ayyamIHa: boolean,
    latitude: nullableNumber,
    longitude: nullableNumber) {
    this.year = year;
    this.month = month;
    this.day = day;
    this.latitude = latitude;
    this.longitude = longitude;
    if (day < 1 || day > 19) {
      throw new Error(day + ' day - Day must be in the range [1-19]');
    }
    if (month < 0 || month > 19) {
      throw new Error(month + ' month - Month must be in the range [0-19]');
    }
    if (month !== 0 && ayyamIHa) {
      throw new Error(month + ' month - Please set month to 0 or set AyyamIHa false');
    }
    if (year > LAST_YEAR_SUPPORTED) {
      throw new Error(
        'Years greater than '+ LAST_YEAR_SUPPORTED + ' are not supported yet');
    }
    this._monthIntern = month === 0
      ? 19
      : month === 19
        ? 20
        : month;

    this.dayOfYear = this.getDayOfYear();    
  }

  // The year in the Vahid. A value in the range from [1-19]
  getYearInVahid(): number {
    return this.year % 19 === 0 ? 19 : this.year % 19;
  }

  // Vahid = 19 years
  getVahid(): number {
    return Math.floor((this.year / 19)) + 1;
  }

  // Kull'i'shay = 19 Vahids = 361 years
  getKullIShay(): number {
    return Math.floor((this.year / 361)) + 1;
  }

  // Number of Ayyam'i'ha days the year has
  // For years < 172: use only for January 1st to before Naw-Ruz
  static _getNumberAyyamIHaDays(year: number): number {
    const yearSpecific = yearSpecifics.get(year);
    if (yearSpecific == null) {
      const gregYear = year + YEAR_ONE_IN_GREGORIAN;
      const isLeapYear =
        gregYear % 4 === 0 && gregYear % 100 !== 0 || gregYear % 400 === 0;
      return isLeapYear ? 5 : 4;
    }
    return yearSpecific.leapday ? 5 : 4;
  }

  static getDayOfNawRuz(year: number): number {
    const yearSpecific = yearSpecifics.get(year);
    if (yearSpecific == null) {
      return 21;
    }
    return yearSpecific.nawRuzOnMarch21 ? 21 : 20;
  }

  // the day of the year with Naw Ruz = 1
  getDayOfYear(): number {
    if (this._monthIntern === 20) {
      return 342 + BadiDate._getNumberAyyamIHaDays(this.year) + this.day;
    }
    return (this._monthIntern - 1) * 19 + this.day;
  }

  // Is the date in the period of fast
  isPeriodOfFast(): boolean {
    return this.month === 19;
  }

  // is the date an Ayyam'i'Ha day
  isAyyamIHa(): boolean {
    return this.month === 0;
  }

  // is the date a feast date
  isFeastDay(): boolean {
    return this.day === 1 && !this.isAyyamIHa;
  }

  static _calculateSunSet(date: Date,
    longitude: nullableNumber, latitude: nullableNumber): Date {
    const fallback = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 18);
    // return 6pm if no location or if in the poles
    if (latitude == null ||
      longitude == null ||
      latitude > 66.0 ||
      latitude < -66.0 ||
      Math.abs(longitude) > 180.0) {
      return fallback;
    }
    const sunCalcTimes = SunCalc.getTimes(date,
      latitude, longitude);
    return sunCalcTimes.sunset ?? fallback;
  }

  getNawRuzDate(): Date {
    return new Date(Date.UTC(this.year + YEAR_ZERO_IN_GREGORIAN, 2, BadiDate.getDayOfNawRuz(this.year)));
  }

  // Start Date
  getStartDate(): Date {
    const date =  this.getNawRuzDate();
    date.setUTCDate(date.getUTCDate() + this.dayOfYear - 2);
    return BadiDate._calculateSunSet(date, this.longitude, this.latitude);
  }

  // End Date
  getEndDate(): Date {
    const date =  this.getNawRuzDate();
    date.setUTCDate(date.getUTCDate() + this.dayOfYear - 1);
    return BadiDate._calculateSunSet(date, this.longitude, this.latitude);
  }

  static _fromYearAndDayOfYear(
    year: number,
    doy: number,
    longitude: nullableNumber,
    latitude: nullableNumber): BadiDate {
    if (doy < 1 || doy > 366) {
      throw Error(
        doy + ' doy, Day of year must be in the range [1-366]');
    }
    const month = Math.ceil(doy / 19);
    const day = doy - (month - 1) * 19;
    const numberOfAyyamIHaDays = BadiDate._getNumberAyyamIHaDays(year);
    if (month < 19) {
      return new BadiDate(
        year,
        month,
        day,
        false,
        longitude,
        latitude);
    } else if (month === 19 && day <= numberOfAyyamIHaDays) {
      return new BadiDate(
        year,
        0,
        day,
        true,
        longitude,
        latitude);
    }
    const alaDay = doy - 342 - numberOfAyyamIHaDays;
    return new BadiDate(
      year,
      19,
      alaDay,
      false,
      longitude,
      latitude);
  }

  // BadiDate from a DateTime object
  // Optional parameter double longitude, latitude for the sunset time
  static fromDate(dateTime: Date,
    longitude: nullableNumber, latitude: nullableNumber): BadiDate {
    if (dateTime > new Date(2065, 2, 19)) {
      throw Error('Dates after 2064-03-19 are not supported yet.');
    }
    const isAfterSunset = dateTime > BadiDate._calculateSunSet(dateTime,
      longitude, latitude);
    const date = dateTime;  
    if (isAfterSunset) date.setDate(dateTime.getDate() + 1);
    const badiYear = date.getFullYear() - YEAR_ZERO_IN_GREGORIAN;
    const isBeforeNawRuz =
      date < new Date(date.getFullYear(), 2, BadiDate.getDayOfNawRuz(badiYear));
    const adaptedBadiYear = isBeforeNawRuz ? badiYear-1 : badiYear;
    const lastNawRuz = isBeforeNawRuz 
      ? new Date(date.getFullYear() - 1, 2, BadiDate.getDayOfNawRuz(adaptedBadiYear))
      : new Date(date.getFullYear(), 2, BadiDate.getDayOfNawRuz(adaptedBadiYear));
    const doy = Math.floor((date.getTime() - lastNawRuz.getTime())/DAY_IN_MILLISECONDS);
    // +1 because naw ruz has a doy of 1 but a difference of 0
    return BadiDate._fromYearAndDayOfYear(
        adaptedBadiYear,
        doy + 1,
        longitude,
        latitude);
  }

  // If the BadiDate is a Baha'i Holy day the Holy date else BahaiHolyDayEnum.NONE
  getHolyDay(): BahaiHolyDayEnum {
    const birthOfBab = yearSpecifics.get(this.year)?.birthOfBab ?? 214;
    return bahaiHolyDays
      .find(
        (holyDay) =>
          holyDay?.getDayOfTheYear(birthOfBab) ==
          this.dayOfYear)
      ?.type ?? BahaiHolyDayEnum.NONE;
  }

  // The BadiDate of the next feast
  getNextFeast(): BadiDate {
    if (this.month === 19) {
      return new BadiDate(
        this.year + 1,
        1,
        1,
        false,
        this.longitude,
        this.latitude);
    }
    return new BadiDate(
      this.year,
      this.month + 1,
      1,
      false,
      this.longitude,
      this.latitude);
  }

  // The BadiDate of the next Holy day
  getNextHolyDate(): BadiDate {
    const birthOfBab = yearSpecifics.get(this.year)?.birthOfBab ?? 0;
    const doy = bahaiHolyDays
      .find(
        (holyDay) =>
          (holyDay?.getDayOfTheYear(birthOfBab) ??
            0) >
          this.dayOfYear)
      ?.getDayOfTheYear(birthOfBab);
    if (doy == null) {
      return BadiDate._fromYearAndDayOfYear(
        this.year + 1,
        1,
        this.longitude,
        this.latitude);
    }
    return BadiDate._fromYearAndDayOfYear(
      this.year,
      doy,
      this.longitude,
      this.latitude);
  }

  // return the last Ayyam'i'Ha day of that Badi year
  getLastAyyamIHaDayOfYear(): BadiDate {
    const firstAla = new BadiDate(
      this.year,
      19,
      1,
      false,
      this.longitude,
      this.latitude);
    return BadiDate._fromYearAndDayOfYear(
      this.year,
      firstAla.dayOfYear - 1,
      this.longitude,
      this.latitude);
  }
}
