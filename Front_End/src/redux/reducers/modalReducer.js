import { ISSHOW_MODAL, TITLE_MODAL, METHOD_MODAL } from "../../constants/ActionType";



const initialState = {
    isShow : false,
    title : "",
    method : "ADD"
    
  };
  
function modalReducer(state = initialState, action) {
    switch(action.type){

        case ISSHOW_MODAL : 
        return {
            ...state, 
            isShow : action.payload.isShow,
        }
        case TITLE_MODAL : 
        return {
            ...state,
            title : action.payload.title, 
        }
        case METHOD_MODAL : 
        return {
            ...state, 
            method : action.payload.method
        }

    }
    return state;
};
  
  export default modalReducer;