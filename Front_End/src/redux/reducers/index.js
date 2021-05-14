
import { combineReducers } from 'redux';
import homepageReducer from './homepageReducer'
import tableReducer from './tableReducer'
import modalReducer from './modalReducer'
import filterReducer from './filterReducer'

// const initialState = {
//     articles: [], 
//     dataShow : {
//         codeRequired : 'a',
//         codeProjectSales : 'a',
//         nameProjectSales : 'a',
//         numberContract : 'a',
//         productCode : 'a',
//         createdDate : 'a',
//         packageProductCode : 'a',
//     },
//     rowSelected : {
        
//     },
//     modal : {
//       isShow : false,
//       title : "",
//       method : "ADD"
//     },
//     table : {
//       status : "",
//       totals : 0,
//       dataSelected : [],
//       indexSelected : []
//     }
//   };
  
//   function rootReducer(state = initialState, action) {
//       switch(action.type){
//           case ADD_ARTICLE : 
//             return {
//                 ...state , articles : [...state.articles, action.payload]
//             }
//           case DATASHOW : 
//             return {
//               ...state, dataShow : {...action.payload}
//             }
//           case MODAL : 
//           return {
//             ...state, modal : {
//               isShow : action.payload.isShow,
//               title : action.payload.title,
//               method : action.payload.method
//             }
//           }
//           case TABLE : 
//           return {
//             ...state, 
//             table : {
//               status : action.payload.status,
//               totals : action.payload.totals
//             }
//           }
//       }
//     return state;
//   };
  
  const rootReducer = combineReducers({
    homepage : homepageReducer,
    table : tableReducer,
    modal : modalReducer,
    filter : filterReducer
  })
  export default rootReducer;