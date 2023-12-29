import { getDefaultMiddleware, configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "@redux-saga/core";
import reducer from "./reducer";
import HomeSaga from "./saga";
import { io } from 'socket.io-client';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: reducer,
  middleware: [...getDefaultMiddleware(), sagaMiddleware],
});
sagaMiddleware.run(HomeSaga);


// "undefined" means the URL will be computed from the `window.location` object
//const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:4000';

export const NEXT_PUBLIC_REST_API_ENDPOINT = "https://backend.az808080.com/";

export const socket = io('https://backend.az808080.com/', {
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  reconnectionAttempts: Infinity

});