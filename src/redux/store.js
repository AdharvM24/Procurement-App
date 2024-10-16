import { createStore, combineReducers } from "redux";
import itemsReducer from "./reducer";

const rootReducer = combineReducers({
  items: itemsReducer,
});

const store = createStore(rootReducer);

export default store;
