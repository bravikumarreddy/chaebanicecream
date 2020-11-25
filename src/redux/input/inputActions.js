import { UPDATE_DATE,UPDATE_MESSAGE,UPDATE_THEME } from './inputTypes';

export const updateDate = (date) => {
  return {
    type: UPDATE_DATE,
    payload: date,
  }
}

export const updateTheme = (theme) => {
  return {
    type: UPDATE_THEME,
    payload:theme
  }
}

export const updateMessage = (message) => {
  return {
    type: UPDATE_MESSAGE,
    payload : message
  };
};