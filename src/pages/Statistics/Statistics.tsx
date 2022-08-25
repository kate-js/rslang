import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { incremented, decremented, setCounter } from '../../store/testToolkitSlice';
import { TState } from '../../store/store';

export const Statistics = () => {
  const counter = useSelector((state: TState) => state.testToolkit.value);
  const dispatch = useDispatch();

  const increment = useCallback(() => dispatch(incremented()), []);
  const decrement = useCallback(() => dispatch(decremented()), []);
  const asyncDecrement = useCallback(async () => {
    setTimeout(() => dispatch(decremented()), 1500);
  }, []);
  const asyncSetCounter = useCallback(async () => {
    setTimeout(() => dispatch(setCounter(5)), 1500);
  }, []);

  return (
    <div>
      <p>{counter}</p>
      <button onClick={increment}>increment</button>
      <button onClick={decrement}>decrement</button>
      <button onClick={asyncDecrement}>asyncDecrement</button>
      <button onClick={asyncSetCounter}>asyncSetCounter</button>
    </div>
  );
};
