import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AuthAPI from "../services/AuthAPI";
import ConfigAPI from '../services/ConfigAPI';
import CourseAPI from "../services/CourseAPI";
import RoleAPI from "../services/RoleAPI";
import InstituteAPI from "../services/InstituteAPI";
import { loginWithRefreshToken } from "./AuthSlice";

export const getMicroservices = createAsyncThunk("config/getMicroservices", async(payload, thunkAPI) => {
    const data = await ConfigAPI.getMicroservices();
    setTimeout(() => {
        if (localStorage.getItem('refresh_token')) {
            thunkAPI.dispatch(loginWithRefreshToken());
        }
    })
    return data.data || {};
});

const DialogSlice = createSlice({
    name: 'config',
    initialState: {
        microservices: null
    },
    extraReducers: {
        [getMicroservices.fulfilled](store, action) {
            store.microservices = action.payload;
            AuthAPI.base_url = store.microservices.auth;
            CourseAPI.base_url = store.microservices.exams;
            RoleAPI.base_url = store.microservices.auth;
            InstituteAPI.base_url = store.microservices.institute;
        }
    }
});

export const { show, hide } = DialogSlice.actions;

export default DialogSlice.reducer;