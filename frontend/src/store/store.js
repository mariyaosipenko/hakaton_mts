import { combineReducers, configureStore } from "@reduxjs/toolkit";
import videoPlayerReducer from "./reducers/VideoPlayerSlice";

const rootReducer = combineReducers({
    videoPlayerReducer,
});

export const setupStore = () => {
    return configureStore({ reducer: rootReducer });
};
