const timeZonesConst = [
  { timeZone: -43200, utc:	'-12.00' },
  { timeZone: -39600, utc:	'-11.00' },
  { timeZone: -36000, utc:	'-10.00' },
  { timeZone: -34200, utc:	'-09.30' },
  { timeZone: -32400, utc:	'-09.00' },
  { timeZone: -28800, utc:	'-08.00' },
  { timeZone: -25200, utc:	'-07.00' },
  { timeZone: -21600, utc:	'-06.00' },
  { timeZone: -18000, utc:	'-05.00' },
  { timeZone: -16200, utc:	'-4.30'  },
  { timeZone: -14400, utc:	'-4.00'  },
  { timeZone: -12600, utc:	'-3.30'  },
  { timeZone: -10800, utc:	'-3.00'  },
  { timeZone: -7200,	utc: '-2.00'   },
  { timeZone: -3600,	utc: '-1.00'   },
  { timeZone: 0,      utc:	'0'      },
  { timeZone: 3600,   utc: '1.00'    },
  { timeZone: 7200,   utc: '2.00'    },
  { timeZone: 10800,	utc: '3.00'    },
  { timeZone: 12600,	utc: '3.30'    },
  { timeZone: 14400,	utc: '4.00'    },
  { timeZone: 16200,	utc: '4.30'    },
  { timeZone: 18000,	utc: '5.00'    },
  { timeZone: 19800,	utc: '5.30'    },
  { timeZone: 20700,	utc: '5.45'    },
  { timeZone: 21600,	utc: '6.00'    },
  { timeZone: 23400,	utc: '6.30'    },
  { timeZone: 25200,	utc: '7.00'    },
  { timeZone: 28800,	utc: '8.00'    },
  { timeZone: 32400,	utc: '9.00'    },
  { timeZone: 34200,	utc: '9.30'    },
  { timeZone: 36000,	utc: '10.00'   },
  { timeZone: 37800,	utc: '10.30'   },
  { timeZone: 39600,	utc: '11.00'   },
  { timeZone: 41400,	utc: '11.30'   },
  { timeZone: 43200,	utc: '12.00'   },
  { timeZone: 45900,	utc: '12.45'   },
  { timeZone: 46800,	utc: '13.00'   },
  { timeZone: 50400,	utc: '14.00'   }
]

export default function calculateTime(timeZone: number): DayOrNight {
  const date = Date.now() / 1000
  const timeZoneConst = timeZonesConst.find(x => x.timeZone === timeZone)
  if (!timeZoneConst) {
    throw new Error("Timezone is invalid...");
  }

  const currentTimeEpoch = date + timeZoneConst.timeZone
  const timeZoneHours = new Date(currentTimeEpoch).getHours() - 3

  if (timeZoneHours < 6 || timeZoneHours > 17) {
    return DayOrNight.NIGHT
  }
  return DayOrNight.DAY
}

export enum DayOrNight {
  DAY = 'day',
  NIGHT = 'night'
}