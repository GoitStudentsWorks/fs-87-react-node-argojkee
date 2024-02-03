import { useEffect } from 'react';
import { WaterStatsContainer } from './DaysGeneralStats.styled';
import { TfiClose } from 'react-icons/tfi';
import { getMonthsArr } from '../helpers/getMonthsArr';

const DaysGeneralStats = ({
  setModalVisible,
  top,
  left,
  selectedMonth,
  statistic,
}) => {
  useEffect(() => {
    function handleClickOutside(event) {
      if (!event.target.closest('[data-modal-container]')) {
        setModalVisible(false);
      }
    }
    function onEsc({ code }) {
      if (code !== 'Escape') {
        return;
      }
      setModalVisible(false);
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', onEsc);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', onEsc);
    };
  }, [setModalVisible]);

  const closeModal = () => {
    setModalVisible(false);
  };
  // console.log('statistic in modal', statistic [selectedMonth.day-1])
  console.log('span1', statistic[selectedMonth.day - 1].norm / 1000);
  console.log('span2', statistic[selectedMonth.day - 1].percent);
  console.log('span3', statistic[selectedMonth.day - 1].drinks);

  return (
    <WaterStatsContainer data-modal-container $top={top} $left={left}>
      <div>
        <p>
          {selectedMonth.day},{' '}
          {getMonthsArr(selectedMonth.year)[selectedMonth.month].name}
        </p>
        <button onClick={closeModal}>
          <TfiClose />
        </button>
      </div>
      <p>
        Daily norma:{' '}
        <span>{statistic[selectedMonth.day - 1].norm / 1000}L</span>
      </p>
      <p>
        Fulfillment of the daily norm:{' '}
        <span>{statistic[selectedMonth.day - 1].percent}%</span>
      </p>
      <p>
        How many servings of water:{' '}
        <span>{statistic[selectedMonth.day - 1].drinks}</span>
      </p>
    </WaterStatsContainer>
  );
};

export default DaysGeneralStats;
