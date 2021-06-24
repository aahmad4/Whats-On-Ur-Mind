import { createState } from '@hookstate/core';

const userDetailsFromStorage = localStorage.getItem('userDetails')
  ? JSON.parse(localStorage.getItem('userDetails'))
  : null;

const store = createState({
  userDetails: userDetailsFromStorage,
});

export default store;
