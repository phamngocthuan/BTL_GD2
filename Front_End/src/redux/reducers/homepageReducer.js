import { ADD_ARTICLE, DATASHOW } from "../../constants/ActionType";

/**
 * Store trạng thái homepage
 */


const initialState = {
    articles: [], 
    dataShow : {
        codeRequired : '',
        codeProjectSales : '',
        nameProjectSales : '',
        numberContract : '',
        productCode : '',
        createdDate : '',
        packageProductCode : '',
    }
  };
  
function homeReducer(state = initialState, action) {
    switch(action.type){
        case ADD_ARTICLE : 
            return {
                ...state , articles : [...state.articles, action.payload]
            }
        case DATASHOW : 
            return {
            ...state, dataShow : {...action.payload}
            }

    }
    return state;
};
  
  export default homeReducer;