import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";

import thunk from "redux-thunk";
import apiMiddleware from "./api.middleware";
import createRootReducer from "./reducers";

export const history = createBrowserHistory();

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["DashboardReducer"],
};

const persistedReducer = persistReducer(
  persistConfig,
  createRootReducer(history) // root reducer with router state
);
const store = createStore(
  persistedReducer,
  applyMiddleware(thunk, apiMiddleware, routerMiddleware(history))
);

export const persistor = persistStore(store);
export default store;
