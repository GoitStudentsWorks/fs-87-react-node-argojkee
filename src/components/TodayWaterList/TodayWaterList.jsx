import { useState } from 'react';
import { useSelector } from 'react-redux';
import { FaPlus } from 'react-icons/fa6';

import { DrinkElement } from './DrinkElement';
import {
  AddTodayWaterBtn,
  EmptyTxt,
  H2,
  ListUl,
} from './TodayWaterList.styled';
import { Modal } from 'components/Modal/Modal';
import { AddForm } from 'components/AddForm/AddForm';
import { getDrinks } from '../../redux/water/waterSelectors';

export function TodayWaterList() {
  const [isShowAddModal, setIsShowAddModal] = useState(false);
  const drinks = useSelector(getDrinks);

  return (
    <>
      <H2>Today</H2>

      <ListUl>
        {drinks?.length ? (
          drinks.map(({ _id, ml, time }) => (
            <DrinkElement
              key={_id}
              id={_id}
              ml={ml}
              time={time}
              color="#cfdaf5aa"
            />
          ))
        ) : (
          <EmptyTxt>List is empty.</EmptyTxt>
        )}
      </ListUl>

      <AddTodayWaterBtn onClick={() => setIsShowAddModal(true)}>
        <FaPlus />
        add water
      </AddTodayWaterBtn>

      {isShowAddModal && (
        <Modal
          closeModal={() => setIsShowAddModal(false)}
          children={<AddForm closeAddForm={() => setIsShowAddModal(false)} />}
        />
      )}
    </>
  );
}
