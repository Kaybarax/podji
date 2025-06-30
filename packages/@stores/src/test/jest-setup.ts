import '@testing-library/jest-dom';
import React from 'react';
import { queryClient } from '../queryClient';

// Reset the QueryClient before each test
beforeEach(() => {
  // Clear the QueryClient to avoid test interference
  queryClient.clear();
});

// Configure React 18's act environment
// Add the property to the global object
declare global {
  var IS_REACT_ACT_ENVIRONMENT: boolean;
}

global.IS_REACT_ACT_ENVIRONMENT = true;
