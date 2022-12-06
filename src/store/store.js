/**
 *
 * @description Redux store
 */

import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import reducer from "../reducers/reducer";
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({ reducer })
);
export const store = createStore(
  persistedReducer,
  window.location.hostname === "localhost"
    ? composeEnhancers(applyMiddleware(thunk))
    : applyMiddleware(thunk)
);
export const persistor = persistStore(store);
