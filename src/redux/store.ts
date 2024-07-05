// src/store.ts
import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./rootReducer";
import {
  useDispatch as useAppDispatch,
  useSelector as useAppSelector,
  TypedUseSelectorHook,
} from "react-redux";
import { persistStore } from "redux-persist";

const store = configureStore({
  reducer: rootReducer,
});

const persistor = persistStore(store);

const { dispatch } = store;

export type RootState = ReturnType<typeof rootReducer>;
export type Selector<S> = (state: RootState) => S;
export type AppDispatch = typeof store.dispatch;

const useDispatch = () => useAppDispatch<AppDispatch>();

const useSelector: TypedUseSelectorHook<RootState> = useAppSelector;

export { store, persistor, dispatch, useSelector, useDispatch };
