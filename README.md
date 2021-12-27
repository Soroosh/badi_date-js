# badi_date

A library to convert Date to Badi date and back.

## Install

```
$ npm install badi_date
```

## Usage Example

```js
const date1 = BadiDate(day: 1, month: 1, year: 178);
const date2 = BadiDate.fromDate(new Date());

const start = date1.startDateTime;
const end = date1.endDateTime;
const holyDay = date1.holyDay;
const isPeriodOfFast = date2.isPeriodOfFast;
const ayyamIHa = date2.isAyyamIHa;
const nextHolyDay = date2.nextHolyDate;

```
