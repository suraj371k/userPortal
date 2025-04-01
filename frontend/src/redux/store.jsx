import { configureStore } from "@reduxjs/toolkit";
import authReducer from './userSlice'
import fileReducer from './fileSlice'

const store = configureStore({
    reducer: {
        auth: authReducer,
        files: fileReducer
    }
})

export default store;