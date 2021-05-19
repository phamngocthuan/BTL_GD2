import { ISSHOW_MODAL, TITLE_MODAL, METHOD_MODAL, DATA_MODAL } from "../../constants/ActionType";



const initialState = {
    isShow : false,
    title : "",
    method : "Add",
    data : {
        codeRequired : '',
        codeProjectSales : '',
        nameProjectSales : '',
        numberContract : '',
        productCode : '',
        createdDate : '',
        packageProductCode : '',
    }
    
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
            let emptyData = {
                codeRequired : '',
                codeProjectSales : '',
                nameProjectSales : '',
                numberContract : '',
                productCode : '',
                createdDate : '',
                packageProductCode : '',
            }
            if(action.payload.method === "Add" ){
                return {
                    ...state, method : action.payload.method, data : {
                        codeRequired : '',
                        codeProjectSales : '',
                        nameProjectSales : '',
                        numberContract : '',
                        productCode : '',
                        createdDate : '',
                        packageProductCode : '',
                    }
                }
            } else 
            return {
                ...state, 
                method : action.payload.method
            }
        case DATA_MODAL : 
        return {
            ...state, data : action.payload.data
        }

    }
    return state;
};
  
  export default modalReducer;