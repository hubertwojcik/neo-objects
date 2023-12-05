import dayjs from 'dayjs';
import { useState } from 'react';

export const useChangeDate = () => {
  const [date, setDate] = useState(dayjs().format('YYYY-MM-DD'));

  const incrementDate = () => {
    setDate((currentDate) =>
      dayjs(currentDate).add(1, 'day').format('YYYY-MM-DD'),
    );
  };

  const decrementDate = () => {
    setDate((currentDate) =>
      dayjs(currentDate).subtract(1, 'day').format('YYYY-MM-DD'),
    );
  };

  return { date, incrementDate, decrementDate };
};
