import { TOTAL_TABLE,  INDEX_SELECTED, DATA_SELECTED} from "../../constants/ActionType";



const initialState = {
    status : "",
    totals : 0,
    dataSelected : {},
    indexSelected : 0
    
};
  
  function tableReducer(state = initialState, action) {
    switch(action.type){
        case TOTAL_TABLE : 
        return {
            ...state,
            totals : action.payload.totals
            
        }
        case DATA_SELECTED : 
        return {
            ...state,
            dataSelected : action.payload.dataSelected
        };
        case INDEX_SELECTED : 
        return {
            ...state,
            indexSelected : action.payload.indexSelected
        }
    }
    return state;
};
  
export default tableReducer;