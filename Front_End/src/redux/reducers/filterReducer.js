import {ADD_FILTER , REMOVE_FILTER, UPDATE_FILTER, ADD_DATE_FILTER, REMOVE_DATE_FILTER} from "../../constants/ActionType";



const initialState = {
    
        FieldNames : ["ProductCode", "ContractName", 
        "CodeRequired", "CodeProjectSales", 
        "NameProjectSales", 
        "NumberContract", "CreatedDate", 
        "PackageProductCode","Money","ContactName", "ContactEmailAddress", "ContactPhoneNumber","ModifiedBy"],
        Requests  : [
           
        ]
    
    
  };
/**
 * Store Filter
 * @param {*} state 
 * @param {*} action 
 * @returns 
 * @author pnthuan(19/5/2021)
 */
  
function filterReducer(state = initialState, action) {
    switch(action.type){
        case ADD_FILTER : 
            return {
                ...state , Requests : [...state.Requests, action.payload.data]
            }
        case REMOVE_FILTER : 
            var arr = state.Requests.filter((item) => item.key != action.payload.data.key )
            return {
                ...state, Requests : [...arr]
            }
        case UPDATE_FILTER : 
            var arr = state.Requests.map((item) => item.key === action.payload.data.key ? {...item, ...action.payload.data} : item );
            return {
                ...state, Requests : [...arr]
            }
        case ADD_DATE_FILTER :
            var reqDate = action.payload.data;
            var arr = state.Requests.filter((item) => item.key !== "CreatedDate" && item.key !== "ModifiedDate"  ) 
            console.log(arr)
            return {
                ...state, Requests : [...arr, ...reqDate]
            }
    }
    return state;
};
  
  export default filterReducer;