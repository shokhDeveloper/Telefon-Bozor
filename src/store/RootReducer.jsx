import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { Reducer } from "./Reducer";
import { PostsReducer } from "./Reducer";
export const RootReducer = combineReducers({
    PostsReducer
})