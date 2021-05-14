import {ADD_FILTER , REMOVE_FILTER, UPDATE_FILTER} from "../../constants/ActionType";



const initialState = {
    
        FieldNames : ["ProductCode", "ContractName", 
        "CodeRequired", "CodeProjectSales", 
        "NameProjectSales", 
        "NumberContract", "CreatedDate", 
        "PackageProductCode"],
        Requests  : [
           
        ]
    
    
  };
  
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
    }
    return state;
};
  
  export default filterReducer;