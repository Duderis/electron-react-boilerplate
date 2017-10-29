import Constants from '../constants/tabs';

export const switchTab = tab => ({
  tab,
  type: Constants.SWITCH_TAB
});

export const addTab = tab => ({
  tab,
  type: Constants.ADD_TAB
});

export const removeTab = tab => ({
  tab,
  type: Constants.REMOVE_TAB
});
