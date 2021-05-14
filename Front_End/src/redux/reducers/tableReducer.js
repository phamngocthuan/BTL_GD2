import { TOTAL_TABLE,  INDEX_SELECTED, DATA_SELECTED} from "../../constants/ActionType";



const initialState = {
    status : "",
    totals : 0,
    dataSelected :{
        codeRequired : '',
        codeProjectSales : '',
        nameProjectSales : '',
        numberContract : '',
        productCode : '',
        createdDate : '',
        packageProductCode : '',
    },
    indexSelected : -1
    
};
  
  function tableReducer(state = initialState, action) {
    switch(action.type){
        case TOTAL_TABLE : 
        return {
            ...state,
            totals : action.payload.totals,
            status : action.payload.status
        }
        case DATA_SELECTED : 
        return {
            ...state,
            dataSelected : action.payload.data
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

// data modal : data submit data
// data selected : data de binding data