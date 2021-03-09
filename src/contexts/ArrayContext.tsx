import React, { useState } from 'react';

import { generateArrayOfLength } from 'utils';

type State = {
  array: number[];
  arrayLength: number;
};

type Actions = {
  generateNewArray: () => void;
  changeArrayLength: (arg0: number) => void;
  replaceArray: (args0: number[]) => void;
};

const ArrayStateContext = React.createContext<State | undefined>(undefined);
const ArrayActionsContext = React.createContext<Actions | undefined>(undefined);

const INITIAL_LENGTH = 300;
const INITIAL_ARRAY = generateArrayOfLength(INITIAL_LENGTH);

const ArrayProvider: React.FC = ({ children }) => {
  // The length is used for generating new arrays
  const [arrayLength, setArrayLength] = useState(INITIAL_LENGTH);
  const [array, setArray] = useState(INITIAL_ARRAY);

  const generateArray = (n: number) => setArray(generateArrayOfLength(n));

  const changeArrayLength = (n: number) => {
    setArrayLength(n);
    generateArray(n);
  };

  const generateNewArray = () => generateArray(arrayLength);
  const replaceArray = (arr: number[]) => {
    // Replaces the array with a custom one
    setArray(arr);
    setArrayLength(arr.length);
  };

  return (
    <ArrayStateContext.Provider value={{ array, arrayLength }}>
      <ArrayActionsContext.Provider
        value={{ changeArrayLength, generateNewArray, replaceArray }}
      >
        {children}
      </ArrayActionsContext.Provider>
    </ArrayStateContext.Provider>
  );
};

const useArrayState = () => {
  const context = React.useContext(ArrayStateContext);
  if (context === undefined) {
    throw new Error('useArrayState must be used within a ArrayProvider');
  }

  return context;
};

const useArrayActions = () => {
  const context = React.useContext(ArrayActionsContext);
  if (context === undefined) {
    throw new Error('useArrayActions must be used within a ArrayProvider');
  }

  return context;
};

export { useArrayState, useArrayActions, ArrayProvider };
