import { 
    SET_DATA_TAB_PANE
} from "../../constants/ActionType";



const initialState = {
    dataTabPane : {}
    
};
  
  function tabPaneReducer(state = initialState, action) {
    switch(action.type){
        case SET_DATA_TAB_PANE : 
        return {
            ...state , dataTabPane : action.payload.data
        }
    } 
    return state;
};
  
export default tabPaneReducer;

