
import { ADD_ARTICLE, DATASHOW ,  TOTAL_TABLE,
    STATUS_TABLE,
    DATA_SELECTED,
    INDEX_SELECTED,
    ISSHOW_MODAL, TITLE_MODAL, METHOD_MODAL, DATA_MODAL, ADD_FILTER, UPDATE_FILTER, REMOVE_FILTER
    

}
 from "../../constants/ActionType";


function addArticle(payload) {
    return { type: ADD_ARTICLE, payload }
};

function setDataShow(payload){
    return {type : DATASHOW, payload }
}
function setShowModal(payload){
    return {type : ISSHOW_MODAL, payload }
}
function setTitleModal(payload){
    return {type : TITLE_MODAL, payload }
}
function setMethodModal(payload){
    return {type : METHOD_MODAL, payload }
}
function setTotalTable(payload){
    return {type : TOTAL_TABLE, payload }
}
function setStatusTable(payload){
    return {type : STATUS_TABLE, payload }
}
function setDataSelectedTable(payload){
    return {type : DATA_SELECTED, payload }
}
function setIndexSelectedTable(payload){
    return {type : INDEX_SELECTED, payload }
}
function setDataModal(payload){
    return {type : DATA_MODAL, payload }
}
function setFilter(payload){
    return {type : ADD_FILTER, payload }
}
function removeFilter(payload){
    return {type : REMOVE_FILTER, payload }
}
function updateFilter(payload){
    return {type : UPDATE_FILTER, payload }
}

export {addArticle, setDataShow,  setTotalTable , setStatusTable ,
    setDataSelectedTable, setIndexSelectedTable, setShowModal, setTitleModal, 
    setMethodModal, setDataModal, setFilter, removeFilter, updateFilter

}