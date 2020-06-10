import React from 'react';
import moment from 'moment';

export const getFromNow = timestamp => {
  moment.updateLocale('en', {
    relativeTime: {
      future: 'in %s',
      past: '%s ago',
      s: 'a few seconds',
      ss: '%d seconds',
      m: 'a minute',
      mm: '%d minutes',
      h: 'an hour',
      hh: '%d hours',
      d: 'a day',
      dd: '%d days',
      w: 'a week',
      ww: '%d weeks',
      M: 'a month',
      MM: '%d months',
      y: 'a year',
      yy: '%d years',
    },
  });
  const time = moment.unix(timestamp);
  let fromNow = moment(time).fromNow();

  if (fromNow === 0) {
    fromNow = moment(time, 'LTS').fromNow();
  }
  return fromNow;
};

const FromNow = ({ timestamp, refresh }) => {
  const fromNow = getFromNow(timestamp);
  return <div refresh={refresh}>{fromNow}</div>;
};

export default FromNow;
