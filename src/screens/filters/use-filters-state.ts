import type { NumberRange } from '@/shared/types';
import { useCallback, useReducer } from 'react';

type FilterState = {
  name: string;
  isPotentiallyHazardous: boolean | undefined;
  absoluteMagnitude: NumberRange;
};

type FilterAction =
  | { type: 'SET_NAME'; payload: string }
  | { type: 'SET_HAZARDOUS'; payload: boolean | undefined }
  | { type: 'SET_MAGNITUDE'; payload: [number, number] }
  | { type: 'RESET'; payload: FilterState };

const filterReducer = (
  state: FilterState,
  action: FilterAction,
): FilterState => {
  switch (action.type) {
    case 'SET_NAME':
      return { ...state, name: action.payload };
    case 'SET_HAZARDOUS':
      return { ...state, isPotentiallyHazardous: action.payload };
    case 'SET_MAGNITUDE':
      return { ...state, absoluteMagnitude: action.payload };
    case 'RESET':
      return action.payload;
    default:
      return state;
  }
};

export const useFilterState = (initialState: FilterState) => {
  const [state, dispatch] = useReducer(filterReducer, initialState);

  const setName = useCallback((name: string) => {
    dispatch({ type: 'SET_NAME', payload: name });
  }, []);

  const setIsPotentiallyHazardous = useCallback(
    (isHazardous: boolean | undefined) => {
      dispatch({ type: 'SET_HAZARDOUS', payload: isHazardous });
    },
    [],
  );

  const setAbsoluteMagnitude = useCallback((magnitude: NumberRange) => {
    dispatch({ type: 'SET_MAGNITUDE', payload: magnitude });
  }, []);

  return {
    filterState: state,
    setName,
    setIsPotentiallyHazardous,
    setAbsoluteMagnitude,
  };
};
