import { combineReducers } from "redux";
import userReducer from "./slices/user";
import forecastReducer from "./slices/forecast";
// ----------------------------------------------------------------------

const createNoopStorage = () => ({
  getItem(_key: string) {
    return Promise.resolve(null);
  },
  setItem(_key: string, value: any) {
    return Promise.resolve(value);
  },
  removeItem(_key: string) {
    return Promise.resolve();
  },
});

const storage =
  typeof window !== "undefined"
    ? require("redux-persist/lib/storage").default
    : createNoopStorage();

const rootPersistConfig = {
  key: "root",
  storage,
  keyPrefix: "redux-",
  whitelist: [],
};

const rootReducer = combineReducers({
  user: userReducer,
  forecast: forecastReducer,
});

export { rootPersistConfig, rootReducer };
