import { BadiDate } from '../lib/badi_date';
import { BahaiHolyDayEnum, bahaiHolyDays } from '../lib/bahai_holyday';

describe('throws errors', () => {
    it('Throws for invalid day and month', () => {
        expect(() => new BadiDate(1, -1, 1, false, null, null)).toThrow('-1 month - Month must be in the range [0-19]');
        expect(() => new BadiDate(1, 20, 1, false, null, null)).toThrow('20 month - Month must be in the range [0-19]');
        expect(() => new BadiDate(1, 1, 0, false, null, null)).toThrow('0 day - Day must be in the range [1-19]');
        expect(() => new BadiDate(1, 1, 20, false, null, null)).toThrow('20 day - Day must be in the range [1-19]');
        expect(() => new BadiDate(1, 1, 4, true, null, null)).toThrow('1 month - Please set month to 0 or set AyyamIHa false');
    });

    it('Throws unsupported years', () => {
        expect(() =>
            new BadiDate(222, 1, 1, false, null, null)).toThrow('Years greater than 221 are not supported yet');
        expect(() => BadiDate.fromDate(new Date(2065, 2, 22), null, null)).toThrow('Dates after 2064-03-19 are not supported yet.');
    });
});

describe('date today', () => {
    const badiDate = new BadiDate(177, 16, 6, false, null, null);
    it('year, month, day', () => {
        const expected = new Date(2021, 0, 4);
        expect(badiDate.getEndDate().getFullYear()).toBe(expected.getFullYear());
        expect(badiDate.getEndDate().getMonth()).toBe(expected.getMonth());
        expect(badiDate.getEndDate().getDate()).toBe(expected.getDate());
    });

    it('after sunset', () => {
        const expected = new Date(2021, 0, 3);
        expect(badiDate.getStartDate().getFullYear()).toBe(expected.getFullYear());
        expect(badiDate.getStartDate().getMonth()).toBe(expected.getMonth());
        expect(badiDate.getStartDate().getDate()).toBe(expected.getDate());
    });

    it('year in Vahid, Vahid, Kull-i-shay', () => {
        expect(badiDate.getKullIShay()).toBe(1);
        expect(badiDate.getVahid()).toBe(10);
        expect(badiDate.getYearInVahid()).toBe(6);
    });

    it('feast, fast, Ayyam-i-ha, Holy day', () => {
        expect(badiDate.isAyyamIHa()).toBe(false);
        expect(badiDate.isFeastDay()).toBe(false);
        expect(badiDate.isPeriodOfFast()).toBe(false);
        expect(badiDate.getHolyDay()).toBe(BahaiHolyDayEnum.NONE);
    });

    it('next feast, next holy day, day of the year', () => {
        expect(
            badiDate.getNextHolyDate()).toEqual(new BadiDate(178, 1, 1, false, null, null));
        expect(badiDate.getNextFeast()).toEqual(new BadiDate(177, 17, 1, false, null, null));
        expect(badiDate.getDayOfYear()).toBe(291);
    });

    it('last AyyamIHa day', () => {
        expect(badiDate.getLastAyyamIHaDayOfYear().getEndDate())
            .toEqual(new Date(2021, 1, 28, 18));
        expect(badiDate.getLastAyyamIHaDayOfYear().getStartDate())
            .toEqual(new Date(2021, 1, 27, 18));
    });
});

describe('naw ruz', () => {
    for (let i = 170; i < 179; i++) {
        it('naw ruz in gregorian date for the year ' + i, () => {
            const date = new BadiDate(i, 1, 1, false, null, null);
            expect(date.getHolyDay()).toBe(BahaiHolyDayEnum.NAW_RUZ);
            expect(date.getStartDate().getMonth()).toBe(2);
            expect(date.getStartDate().getFullYear()).toBe(i + 1843);
            if (i < 173 || [175, 176].includes(i)) {
                expect(date.getEndDate().getDate()).toBe(21);
                expect(BadiDate.getDayOfNawRuz(i)).toBe(21);
            } else {
                expect(date.getEndDate().getDate()).toBe(20);
                expect(BadiDate.getDayOfNawRuz(i)).toBe(20);
            }
        });
    }
});

describe('feasts and holy days', () => {
    const badiDate = new BadiDate(177, 19, 1, false, null, null);
    it('calculates the feasts', () => {
        expect(badiDate.getEndDate()).toEqual(new Date(2021, 2, 1, 18));
        let date = badiDate.getNextFeast();
        expect(date.getEndDate()).toEqual(new Date(2021, 2, 20, 18));
        date = date.getNextFeast();
        expect(date.getEndDate()).toEqual(new Date(2021, 3, 8, 18));
        date = date.getNextFeast();
        expect(date.getEndDate()).toEqual(new Date(2021, 3, 27, 18));
        date = date.getNextFeast();
        expect(date.getEndDate()).toEqual(new Date(2021, 4, 16, 18));
        date = date.getNextFeast();
        expect(date.getEndDate()).toEqual(new Date(2021, 5, 4, 18));
        date = date.getNextFeast();
        expect(date.getEndDate()).toEqual(new Date(2021, 5, 23, 18));
        date = date.getNextFeast();
        expect(date.getEndDate()).toEqual(new Date(2021, 6, 12, 18));
        date = date.getNextFeast();
        expect(date.getEndDate()).toEqual(new Date(2021, 6, 31, 18));
        date = date.getNextFeast();
        expect(date.getEndDate()).toEqual(new Date(2021, 7, 19, 18));
        date = date.getNextFeast();
        expect(date.getEndDate()).toEqual(new Date(2021, 8, 7, 18));
        date = date.getNextFeast();
        expect(date.getEndDate()).toEqual(new Date(2021, 8, 26, 18));
        date = date.getNextFeast();
        expect(date.getEndDate()).toEqual(new Date(2021, 9, 15, 18));
        date = date.getNextFeast();
        expect(date.getEndDate()).toEqual(new Date(2021, 10, 3, 18));
        date = date.getNextFeast();
        expect(date.getEndDate()).toEqual(new Date(2021, 10, 22, 18));
        date = date.getNextFeast();
        expect(date.getEndDate()).toEqual(new Date(2021, 11, 11, 18));
        date = date.getNextFeast();
        expect(date.getEndDate()).toEqual(new Date(2021, 11, 30, 18));
        date = date.getNextFeast();
        expect(date.getEndDate()).toEqual(new Date(2022, 0, 18, 18));
        date = date.getNextFeast();
        expect(date.getEndDate()).toEqual(new Date(2022, 1, 6, 18));
        date = date.getNextFeast();
        expect(date.getEndDate()).toEqual(new Date(2022, 2, 2, 18));
        date = date.getNextFeast();
        expect(date.getEndDate()).toEqual(new Date(2022, 2, 21, 18));
    });

    it('calculates the holy days', () => {
        let date = badiDate.getNextHolyDate();
        expect(date.getEndDate()).toEqual(new Date(2021, 2, 20, 18));
        expect(date.getHolyDay()).toBe(BahaiHolyDayEnum.NAW_RUZ);

        date = date.getNextHolyDate();
        expect(date.getEndDate()).toEqual(new Date(2021, 3, 20, 18));
        expect(date.getHolyDay()).toBe(BahaiHolyDayEnum.RIDVAN1ST);

        date = date.getNextHolyDate();
        expect(date.getEndDate()).toEqual(new Date(2021, 3, 28, 18));
        expect(date.getHolyDay()).toBe(BahaiHolyDayEnum.RIDVAN9TH);

        date = date.getNextHolyDate();
        expect(date.getEndDate()).toEqual(new Date(2021, 4, 1, 18));
        expect(date.getHolyDay()).toBe(BahaiHolyDayEnum.RIDVAN12TH);

        date = date.getNextHolyDate();
        expect(date.getEndDate()).toEqual(new Date(2021, 4, 23, 18));
        expect(date.getHolyDay()).toBe(BahaiHolyDayEnum.DECLARATION_OF_THE_BAB);

        date = date.getNextHolyDate();
        expect(date.getEndDate()).toEqual(new Date(2021, 4, 28, 18));
        expect(date.getHolyDay()).toBe(BahaiHolyDayEnum.ASCENSION_OF_BAHAULLAH);

        date = date.getNextHolyDate();
        expect(date.getEndDate()).toEqual(new Date(2021, 6, 9, 18));
        expect(date.getHolyDay()).toBe(BahaiHolyDayEnum.MARTYRDOM_OF_THE_BAB);

        date = date.getNextHolyDate();
        expect(date.getEndDate()).toEqual(new Date(2021, 10, 6, 18));
        expect(date.getHolyDay()).toBe(BahaiHolyDayEnum.BIRTH_OF_THE_BAB);

        date = date.getNextHolyDate();
        expect(date.getEndDate()).toEqual(new Date(2021, 10, 7, 18));
        expect(date.getHolyDay()).toBe(BahaiHolyDayEnum.BIRTH_OF_BAHAULLAH);

        date = date.getNextHolyDate();
        expect(date.getEndDate()).toEqual(new Date(2021, 10, 25, 18));
        expect(date.getHolyDay()).toBe(BahaiHolyDayEnum.DAY_OF_THE_COVENANT);

        date = date.getNextHolyDate();
        expect(date.getEndDate()).toEqual(new Date(2021, 10, 27, 18));
        expect(date.getHolyDay()).toBe(BahaiHolyDayEnum.ASCENSION_OF_ABDUL_BAHA);
    });
});

describe('corner cases', () => {
    it('round trip naw ruz', () => {
        let date = new Date(2021, 2, 19, 20);
        let badiDate = BadiDate.fromDate(date, null, null);
        expect(badiDate.getStartDate()).toEqual(new Date(2021, 2, 19, 18));
        expect(badiDate.getEndDate()).toEqual(new Date(2021, 2, 20, 18));
        expect(badiDate.month).toBe(1);
        expect(badiDate.day).toBe(1);
        expect(badiDate.year).toBe(178);

        date = new Date(2021, 2, 19, 16);
        badiDate = BadiDate.fromDate(date, null, null);
        expect(badiDate.getStartDate()).toEqual(new Date(2021, 2, 18, 18));
        expect(badiDate.getEndDate()).toEqual(new Date(2021, 2, 19, 18));
        expect(badiDate.month).toBe(19);
        expect(badiDate.day).toBe(19);
        expect(badiDate.year).toBe(177);

        date = new Date(2021, 2, 20, 16);
        badiDate = BadiDate.fromDate(date, null, null);
        expect(badiDate.getStartDate()).toEqual(new Date(2021, 2, 19, 18));
        expect(badiDate.getEndDate()).toEqual(new Date(2021, 2, 20, 18));
        expect(badiDate.month).toBe(1);
        expect(badiDate.day).toBe(1);
        expect(badiDate.year).toBe(178);
    });

    it('new years eve', () => {
        let date = new Date(2020, 11, 31, 16);
        let badiDate = BadiDate.fromDate(date, null, null);
        expect(badiDate.getStartDate()).toEqual(new Date(2020, 11, 30, 18));
        expect(badiDate.getEndDate()).toEqual(new Date(2020, 11, 31, 18));
        expect(badiDate.day).toBe(2);
        expect(badiDate.month).toBe(16);
        expect(badiDate.year).toBe(177);

        date = new Date(2020, 11, 31, 20);
        badiDate = BadiDate.fromDate(date, null, null);
        expect(badiDate.getStartDate()).toEqual(new Date(2020, 11, 31, 18));
        expect(badiDate.getEndDate()).toEqual(new Date(2021, 0, 1, 18));
        expect(badiDate.day).toBe(3);
        expect(badiDate.month).toBe(16);
        expect(badiDate.year).toBe(177);

        date = new Date(2021, 0, 1, 16);
        badiDate = BadiDate.fromDate(date, null, null);
        expect(badiDate.getStartDate()).toEqual(new Date(2020, 11, 31, 18));
        expect(badiDate.getEndDate()).toEqual(new Date(2021, 0, 1, 18));
        expect(badiDate.day).toBe(3);
        expect(badiDate.month).toBe(16);
        expect(badiDate.year).toBe(177);
    });

    it('leap day', () => {
        let date = new Date(2020, 1, 29);
        let badiDate = BadiDate.fromDate(date, null, null);
        expect(badiDate.year).toBe(176);
        expect(badiDate.month).toBe(0);
        expect(badiDate.isAyyamIHa()).toBe(true);
        expect(badiDate.isPeriodOfFast()).toBe(false);
        expect(badiDate.day).toBe(4);

        date = new Date(2020, 2, 1);
        badiDate = BadiDate.fromDate(date, null, null);
        expect(badiDate.isAyyamIHa()).toBe(false);
        expect(badiDate.isPeriodOfFast()).toBe(true);
        expect(badiDate.day).toBe(1);

        date = new Date(2021, 1, 28);
        badiDate = BadiDate.fromDate(date, null, null);
        expect(badiDate.isAyyamIHa()).toBe(true);
        expect(badiDate.isPeriodOfFast()).toBe(false);
        expect(badiDate.day).toBe(4);

        date = new Date(2021, 2, 1);
        badiDate = BadiDate.fromDate(date, null, null);
        expect(badiDate.isAyyamIHa()).toBe(false);
        expect(badiDate.isPeriodOfFast()).toBe(true);
        expect(badiDate.day).toBe(1);

        
        date = new Date(2022, 2, 1);
        badiDate = BadiDate.fromDate(date, null, null);
        expect(badiDate.isAyyamIHa()).toBe(true);
        expect(badiDate.isPeriodOfFast()).toBe(false);
        expect(badiDate.day).toBe(5);

        date = new Date(2022, 2, 2);
        badiDate = BadiDate.fromDate(date, null, null);
        expect(badiDate.isAyyamIHa()).toBe(false);
        expect(badiDate.isPeriodOfFast()).toBe(true);
        expect(badiDate.day).toBe(1);

        
        date = new Date(2004, 2, 1);
        badiDate = BadiDate.fromDate(date, null, null);
        expect(badiDate.isAyyamIHa()).toBe(true);
        expect(badiDate.isPeriodOfFast()).toBe(false);
        expect(badiDate.day).toBe(5);
    });
});

describe("sunset calculation", () => {
    it("handles pols and nonsense values", () => {
        const expected = new Date(2021, 0, 17, 18);
        expect(new BadiDate(177, 17, 1, false, null, null).getStartDate()).
            toEqual(expected);
        expect(
            new BadiDate(177, 17, 1, false, 53.6, null).getStartDate())
            .toEqual(expected);
        expect(
            new BadiDate(177, 17, 1, false, null, 10.0).getStartDate())
            .toEqual(expected);
        expect(
            new BadiDate(
                177,
                17,
                1,
                false,
                53.6,
                190.0,
            )
                .getStartDate())
            .toEqual(expected);
        expect(
            new BadiDate(
                177,
                17,
                1,
                false,
                53.6,
                -190.0)
                .getStartDate())
            .toEqual(expected);
        expect(
            new BadiDate(
                177, 17, 1, false, 66.6, 10.0)
                .getStartDate())
            .toEqual(expected);
        expect(
            new BadiDate(
                177,
                17,
                1,
                false,
                -66.6,
                10.0
            )
                .getStartDate())
            .toEqual(expected);
    });

    // This test only works if your local time is CET or CEST
    it("calculates sunset", () => {
        const expected = new Date(Date.UTC(2021, 0, 17, 15, 34, 40, 947));
        expect(
            new BadiDate(177, 17, 1, false, 53.6, 10.0)
                .getStartDate())
            .toEqual(expected);
    });

    // This test only works if your local time is CET or CEST
    it("handles daylight saving", () => {
        const expected = new Date(Date.UTC(2021, 5, 23, 19, 55));
        const received = new BadiDate(178, 6, 1, false, 53.6, 10.0)
            .getEndDate();
        expect(received.getFullYear()).toBe(expected.getFullYear());
        expect(received.getMonth()).toBe(expected.getMonth());
        expect(received.getUTCDate()).toBe(expected.getUTCDate());
        expect(received.getUTCHours()).toBe(expected.getUTCHours());
        expect(received.getUTCMinutes()).toBe(expected.getUTCMinutes());
    });

    it("handles sunset on next Gregorian day", () => {
        const expected = new Date(Date.UTC(2021, 5, 23, 22, 18));
        const received = new BadiDate(178, 6, 1, false, 64.6, 8.0)
            .getEndDate();
        expect(received.getFullYear()).toBe(expected.getFullYear());
        expect(received.getMonth()).toBe(expected.getMonth());
        expect(received.getUTCDate()).toBe(expected.getUTCDate());
        expect(received.getUTCHours()).toBe(expected.getUTCHours());
        expect(received.getUTCMinutes()).toBe(expected.getUTCMinutes());
    });
});
