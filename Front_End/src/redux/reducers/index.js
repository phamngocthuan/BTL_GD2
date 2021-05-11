import { ADD_ARTICLE, DATASHOW } from "../../constants/ActionType";



const initialState = {
    articles: [], 
    dataShow : {
        codeRequired : 'a',
        codeProjectSales : 'a',
        nameProjectSales : 'a',
        numberContract : 'a',
        productCode : 'a',
        createdDate : 'a',
        packageProductCode : 'a',
    },
    rowSelected : {
        
    }
  };
  
  function rootReducer(state = initialState, action) {
      switch(action.type){
          case ADD_ARTICLE : 
            return {
                ...state , articles : [...state.articles, action.payload]
            }
          case DATASHOW : 
            return {
                ...state , dataShow : {...action.payload}
            }
      }
    return state;
  };
  
  export default rootReducer;