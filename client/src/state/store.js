import { createState } from '@hookstate/core';

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : {};

const store = createState({
  userInfo: userInfoFromStorage,
  questions: [],
});

export default store;
