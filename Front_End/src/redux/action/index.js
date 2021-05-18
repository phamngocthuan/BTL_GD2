
import { ADD_ARTICLE, DATASHOW ,  TOTAL_TABLE,
    STATUS_TABLE,
    DATA_SELECTED,
    INDEX_SELECTED,
    ISSHOW_MODAL, TITLE_MODAL, METHOD_MODAL,
     DATA_MODAL, ADD_FILTER, UPDATE_FILTER, REMOVE_FILTER,
     REMOVE_DATE_FILTER,
     ADD_DATE_FILTER,
     RESET_INDEX_SELECTED,
     RESET_DATA_SELECTED,
     LOAD_DATA,SET_DATA_TAB_PANE,
     LOADING,REMOVE_RECORD_TABLE

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
function addDateFilter(payload){
    return {type :ADD_DATE_FILTER, payload }
}
function removeDateFilter(payload){
    return {type : REMOVE_DATE_FILTER, payload}
}
function resetDataSelected(payload){
    return {type : RESET_DATA_SELECTED, payload}
}
function resetIndexSelected(payload){
    return {type : RESET_INDEX_SELECTED, payload}
}
function setLoadData(payload){
    return {type : LOAD_DATA, payload}
}
function setLoading(payload){
    return {type : LOADING, payload}
}

function  removeRecordTable(payload) {
    return {type : REMOVE_RECORD_TABLE, payload}
}
function setDataTabPane(payload){
    return {type: SET_DATA_TAB_PANE, payload}
}
export {addArticle, setDataShow,  setTotalTable , setStatusTable ,setLoadData,
    setDataSelectedTable, setIndexSelectedTable, setShowModal, setTitleModal, 
    setMethodModal, setDataModal, setFilter, removeFilter, updateFilter,
    addDateFilter, removeDateFilter, resetDataSelected, resetIndexSelected,setDataTabPane,
    setLoading, removeRecordTable

}