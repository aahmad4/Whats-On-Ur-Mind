import { hookstate } from '@hookstate/core';

const userDetailsFromStorage = localStorage.getItem('userDetails')
  ? JSON.parse(localStorage.getItem('userDetails'))
  : null;

const store = hookstate({
  userDetails: userDetailsFromStorage,
});

export default store;
