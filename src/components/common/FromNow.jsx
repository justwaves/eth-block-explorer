import React from 'react';
import moment from 'moment';

const getFromNow = timestamp => {
  moment.updateLocale('en', {
    relativeTime: {
      future: 'in %s',
      past: '%s ago',
      s: '1sec',
      ss: '%dsecs',
      m: '1minute',
      mm: '%dminutes',
      h: '1hour',
      hh: '%dhours',
      d: '1day',
      dd: '%ddays',
      M: '1month',
      MM: '%dmonths',
      y: '1year',
      yy: '%dyears',
    },
  });
  const time = moment.unix(timestamp);
  let fromNow = moment(time, 'YYYY-MM-DD').fromNow();

  if (fromNow === 0) {
    fromNow = moment(time, 'LTS').fromNow();
  }
  return fromNow;
};

const FromNow = ({ timestamp }) => {
  const fromNow = getFromNow(timestamp);
  return <>{fromNow}</>;
};

export default FromNow;
