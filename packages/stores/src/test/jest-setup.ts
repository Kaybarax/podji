// noinspection ES6ConvertVarToLetConst

import '@testing-library/jest-dom';
import { queryClient } from '../queryClient';

// Reset the QueryClient before each test
beforeEach(() => {
  // Clear the QueryClient to avoid test interference
  queryClient.clear();
});

// Configure React 18's act environment
// Adds the property to the global object
declare global {
  // eslint-disable-next-line no-var
  var IS_REACT_ACT_ENVIRONMENT: boolean;
}

global.IS_REACT_ACT_ENVIRONMENT = true;
