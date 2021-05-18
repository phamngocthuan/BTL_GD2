import { TOTAL_TABLE,  INDEX_SELECTED, DATA_SELECTED, STATUS_TABLE, RESET_INDEX_SELECTED, 

    RESET_DATA_SELECTED, LOAD_DATA, LOADING, REMOVE_RECORD_TABLE
} from "../../constants/ActionType";



const initialState = {
    status : "",
    totals : 0,
    dataSelected :[],
    indexSelected : [],
    loadData : false,
    loading : false
    
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
        var arr = state.dataSelected.filter((item) => item.codeRequired === action.payload.data.codeRequired)
        if(arr.length == 0) {
            return {
                ...state,
                dataSelected : [...state.dataSelected, action.payload.data]
            }
        }else{
            return {
                ...state
            };
        }
            
        case INDEX_SELECTED : 
        var arr = state.indexSelected.filter((item) => item === action.payload.indexSelected);
        if(arr.length == 0){
            return {
                ...state,
                indexSelected : [...state.indexSelected, action.payload.indexSelected]
            }
        }else{
            return {
                ...state
            };
        }
        case STATUS_TABLE : 
        return {
            ...state, 
            status : action.payload.status
        }
        case RESET_INDEX_SELECTED : 
        return {
            ...state,
            indexSelected : []
        }
        case RESET_DATA_SELECTED : 
        return {
            ...state,
            dataSelected : []
        }
        case LOAD_DATA : 

        return{
            ...state,
            loadData : action.payload.loadData
        }
        case LOADING : 
        return {
            ...state,
            loading : action.payload.loading
        }
        case REMOVE_RECORD_TABLE : 
        var arr = state.dataSelected.filter((item)  => item.codeRequired !== action.payload.data.codeRequired)
        return {
            ...state,
            dataSelected : [...arr]
        }
    }
    return state;
};
  
export default tableReducer;

