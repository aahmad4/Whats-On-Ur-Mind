import { createState } from '@hookstate/core';

const userDetailsFromStorage = localStorage.getItem('userDetails')
  ? JSON.parse(localStorage.getItem('userDetails'))
  : {};

const store = createState({
  userDetails: userDetailsFromStorage,
  questions: [],
});

export default store;
