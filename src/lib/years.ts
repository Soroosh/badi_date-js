class YearSpecifics {
  readonly year: number;
  readonly leapday: boolean;
  readonly nawRuzOnMarch21: boolean;
  readonly birthOfBab: number;

  constructor(year: number,
    birthOfBab: number,
    leapday: boolean,
    nawRuzOnMarch21: boolean) {
    this.year = year;
    this.leapday = leapday;
    this.birthOfBab = birthOfBab;
    this.nawRuzOnMarch21 = nawRuzOnMarch21;
  };

  static createNawRuzOn21Year(year: number,
    birthOfBab: number): YearSpecifics {
    return new YearSpecifics(year, birthOfBab, false, true);
  }

  static createYearNotLeap(year: number,
    birthOfBab: number): YearSpecifics {
    return new YearSpecifics(year, birthOfBab, false, false);
  }

  static createLeapYear(year: number,
    birthOfBab: number): YearSpecifics {
    return new YearSpecifics(year, birthOfBab, true, false);
  }
}

export const yearSpecifics = new Map<number, YearSpecifics>([
  [172, YearSpecifics.createNawRuzOn21Year(172, 238)],
  [173, YearSpecifics.createYearNotLeap(173, 227)],
  [174, YearSpecifics.createLeapYear(174, 216)],
  [175, YearSpecifics.createNawRuzOn21Year(175, 234)],
  [176, YearSpecifics.createNawRuzOn21Year(176, 223)],
  [177, YearSpecifics.createYearNotLeap(177, 213)],
  [178, YearSpecifics.createLeapYear(178, 232)],
  [179, YearSpecifics.createNawRuzOn21Year(179, 220)],
  [180, YearSpecifics.createNawRuzOn21Year(180, 210)],
  [181, YearSpecifics.createYearNotLeap(181, 228)],
  [182, YearSpecifics.createLeapYear(182, 217)],
  [183, YearSpecifics.createNawRuzOn21Year(183, 235)],
  [184, YearSpecifics.createNawRuzOn21Year(184, 224)],
  [185, YearSpecifics.createYearNotLeap(185, 214)],
  [186, YearSpecifics.createYearNotLeap(186, 233)],
  [187, YearSpecifics.createLeapYear(187, 223)],
  [188, YearSpecifics.createNawRuzOn21Year(188, 211)],
  [189, YearSpecifics.createYearNotLeap(189, 230)],
  [190, YearSpecifics.createYearNotLeap(190, 238)],
  [191, YearSpecifics.createLeapYear(191, 238)],
  [192, YearSpecifics.createNawRuzOn21Year(192, 226)],
  [193, YearSpecifics.createYearNotLeap(193, 215)],
  [194, YearSpecifics.createYearNotLeap(194, 234)],
  [195, YearSpecifics.createLeapYear(195, 224)],
  [196, YearSpecifics.createNawRuzOn21Year(196, 213)],
  [197, YearSpecifics.createYearNotLeap(197, 232)],
  [198, YearSpecifics.createYearNotLeap(198, 221)],
  [199, YearSpecifics.createLeapYear(199, 210)],
  [200, YearSpecifics.createNawRuzOn21Year(200, 228)],
  [201, YearSpecifics.createYearNotLeap(201, 217)],
  [202, YearSpecifics.createYearNotLeap(202, 236)],
  [203, YearSpecifics.createLeapYear(203, 225)],
  [204, YearSpecifics.createNawRuzOn21Year(204, 214)],
  [205, YearSpecifics.createYearNotLeap(205, 233)],
  [206, YearSpecifics.createYearNotLeap(206, 223)],
  [207, YearSpecifics.createLeapYear(207, 212)],
  [208, YearSpecifics.createNawRuzOn21Year(208, 230)],
  [209, YearSpecifics.createYearNotLeap(209, 219)],
  [210, YearSpecifics.createYearNotLeap(210, 237)],
  [211, YearSpecifics.createLeapYear(211, 227)],
  [212, YearSpecifics.createNawRuzOn21Year(212, 215)],
  [213, YearSpecifics.createYearNotLeap(213, 234)],
  [214, YearSpecifics.createYearNotLeap(214, 224)],
  [215, YearSpecifics.createYearNotLeap(215, 213)],
  [216, YearSpecifics.createLeapYear(216, 232)],
  [217, YearSpecifics.createYearNotLeap(217, 220)],
  [218, YearSpecifics.createYearNotLeap(218, 209)],
  [219, YearSpecifics.createYearNotLeap(219, 228)],
  [220, YearSpecifics.createLeapYear(220, 218)],
  [221, YearSpecifics.createYearNotLeap(221, 236)],
]);
