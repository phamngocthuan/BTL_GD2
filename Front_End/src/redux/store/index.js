import { createStore } from "redux";
import rootReducer from "../reducers/index";
import { addArticle } from "../action/index";


const store = createStore(rootReducer);
store.subscribe(() => console.log('Look ma, Redux!!', store.getState()));

store.dispatch( addArticle({ title: 'React Redux Tutorial for Beginners', id: 1 }) );

export default store;