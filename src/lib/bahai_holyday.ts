export enum BahaiHolyDayEnum {
  // Naw-Ruz
  NAW_RUZ,

  // 1st day of Ridvan
  RIDVAN1ST,

  // 9th day of Ridvan
  RIDVAN9TH,

  // 12th day of Ridvan
  RIDVAN12TH,

  // Declaration of the Bab
  DECLARATION_OF_THE_BAB,

  // Ascension of Baha'u'llah
  ASCENSION_OF_BAHAULLAH,

  // Martyrdom of the Bab
  MARTYRDOM_OF_THE_BAB,

  // Birth of the Bab
  BIRTH_OF_THE_BAB,

  // Birth of Baha'u'llah
  BIRTH_OF_BAHAULLAH,

  // Day of the Covenant (not a holy day)
  DAY_OF_THE_COVENANT,

  // Ascension of Abdu'l-Baha (not a holy day)
  ASCENSION_OF_ABDUL_BAHA,

  // Not a Holyday
  NONE,
}

class BahaiHolyDay {
  readonly dayOfYear: number;
  readonly type: BahaiHolyDayEnum;

  constructor(dayOfYear: number, type: BahaiHolyDayEnum) {
    this.dayOfYear = dayOfYear;
    this.type = type;
  };

  getDayOfTheYear(dayOfYearBirthOfBab: number): number {
    if (this.type == BahaiHolyDayEnum.BIRTH_OF_THE_BAB) {
      return dayOfYearBirthOfBab ?? this.dayOfYear;
    } else if (this.type == BahaiHolyDayEnum.BIRTH_OF_BAHAULLAH &&
      dayOfYearBirthOfBab) {
      return dayOfYearBirthOfBab + 1;
    }
    return this.dayOfYear;
  }
}

export const bahaiHolyDays: BahaiHolyDay[] = [
  // Naw-Ruz
  new BahaiHolyDay(1, BahaiHolyDayEnum.NAW_RUZ),

  // 1st day of Ridvan
  new BahaiHolyDay(32, BahaiHolyDayEnum.RIDVAN1ST),

  // 9th day of Ridvan
  new BahaiHolyDay(40, BahaiHolyDayEnum.RIDVAN9TH),

  // 12th day of Ridvan
  new BahaiHolyDay(43, BahaiHolyDayEnum.RIDVAN12TH),

  // Decleration of the Bab
  new BahaiHolyDay(65, BahaiHolyDayEnum.DECLARATION_OF_THE_BAB),

  // Ascension of Baha'u'llah
  new BahaiHolyDay(70, BahaiHolyDayEnum.ASCENSION_OF_BAHAULLAH),

  // Martyrdom of the Bab
  new BahaiHolyDay(112, BahaiHolyDayEnum.MARTYRDOM_OF_THE_BAB),

  // Birth of the Bab
  new BahaiHolyDay(214, BahaiHolyDayEnum.BIRTH_OF_THE_BAB),

  // Birth of Baha'u'llah
  new BahaiHolyDay(237, BahaiHolyDayEnum.BIRTH_OF_BAHAULLAH),

  // Day of the Covenant (not a holy day)
  new BahaiHolyDay(251, BahaiHolyDayEnum.DAY_OF_THE_COVENANT),

  // Ascension of Abdu'l-Baha (not a holy day)
  new BahaiHolyDay(253, BahaiHolyDayEnum.ASCENSION_OF_ABDUL_BAHA),
];
