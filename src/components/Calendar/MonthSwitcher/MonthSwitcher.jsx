import { useEffect, useState } from 'react';
import { useInitialDate } from './useInitialDate';
import { monthsArr } from './monthsArr';
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl';
import { MonthSwitcherContainer } from './MonthSwitcher.styled';

const MonthSwitcher = ({ changeSelectedMonth }) => {
  const [today] = useInitialDate();
  const [pickedDate, setPickedDate] = useState(today);
  const [registrationDate] = useState({ day: 1, month: 9, year: 2023 });

  useEffect(() => {
    const newCurrentMonth = {
      day: null,
      month: pickedDate.month,
      year: pickedDate.year,
    };
    changeSelectedMonth(newCurrentMonth);
  }, [pickedDate, changeSelectedMonth]);

  const handlePrevMonth = () => {
    pickedDate.month === 0
      ? setPickedDate(prev => ({ ...prev, month: 11, year: prev.year - 1 }))
      : setPickedDate(prev => ({ ...prev, month: prev.month - 1 }));
  };

  const handleNextMonth = () => {
    pickedDate.month === 11
      ? setPickedDate(prev => ({ ...prev, month: 0, year: prev.year + 1 }))
      : setPickedDate(prev => ({ ...prev, month: prev.month + 1 }));
  };

  const isButtonPrevDisabled = () => {
    return (registrationDate.day <= 2 &&
      registrationDate.month === 0 &&
      pickedDate.month === 11 &&
      registrationDate.year === pickedDate.year + 1) ||
      (registrationDate.day <= 2 &&
        registrationDate.month - 1 === pickedDate.month &&
        registrationDate.year === pickedDate.year) ||
      (registrationDate.day > 2 &&
        registrationDate.month === pickedDate.month &&
        registrationDate.year === pickedDate.year)
      ? true
      : false;
  };

  const isButtonNextDisabled = () => {
    return (
      pickedDate.year >= today.year + 5 && pickedDate.month === today.month
    );
  };

  return (
    <MonthSwitcherContainer>
      <button onClick={handlePrevMonth} disabled={isButtonPrevDisabled()}>
        <SlArrowLeft />
      </button>
      <h2>
        {monthsArr[pickedDate.month]} {pickedDate.year}
      </h2>
      <button onClick={handleNextMonth} disabled={isButtonNextDisabled()}>
        <SlArrowRight />
      </button>
    </MonthSwitcherContainer>
  );
};

export default MonthSwitcher;