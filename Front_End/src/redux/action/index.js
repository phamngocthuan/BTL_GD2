
import { ADD_ARTICLE, DATASHOW } from "../../constants/ActionType";


function addArticle(payload) {
    return { type: ADD_ARTICLE, payload }
};

function setDataShow(payload){
    return {type : DATASHOW, payload }
}

export {addArticle, setDataShow}