
import { combineReducers } from 'redux';
import homepageReducer from './homepageReducer'
import tableReducer from './tableReducer'
import modalReducer from './modalReducer'
import filterReducer from './filterReducer'
import tabPaneReducer from './tabPaneReducer'


  
  const rootReducer = combineReducers({
    homepage : homepageReducer,
    table : tableReducer,
    modal : modalReducer,
    filter : filterReducer,
    tabpane : tabPaneReducer
  })
  export default rootReducer;