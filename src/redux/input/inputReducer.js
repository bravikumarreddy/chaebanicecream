import { defaultThemeName } from '../../Components/Themes';
import { UPDATE_DATE, UPDATE_MESSAGE, UPDATE_THEME } from './inputTypes';

const initialState = {
  date: new Date(),
  theme: defaultThemeName,
  message: ""
}
 const inputReducer = (state = initialState, action) => {

  switch (action.type) {
    case UPDATE_DATE:
      return {
        ...state,
        date: action.payload,
      };
    case UPDATE_MESSAGE:
      return {
        ...state,
        message: action.payload,
      };
    case UPDATE_THEME:
      return {
        ...state,
        theme: action.payload,
      };
    default:
      return state
  }

 }

export default inputReducer;