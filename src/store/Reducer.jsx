import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    posts: []
}
export const Reducer = createSlice({
    name: "posts",
    initialState,
    reducers:{
        setPosts(state, action){
            state.posts = action.payload
        }
    }
})
export const PostsAction = Reducer.actions
export const PostsReducer = Reducer.reducer