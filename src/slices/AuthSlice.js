import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AuthAPI from "../services/AuthAPI";
import { show } from "./SnackbarSlice";
import AlertSeverities from "../constants/AlertSeverities";

export const login = createAsyncThunk("auth/login", async(payload, thunkAPI) => {
    const data = await AuthAPI.login(payload);
    localStorage.setItem('access_token', data.data.access_token);
    localStorage.setItem('refresh_token', data.data.refresh_token);
    return data?.data || {}
});

export const loginWithRefreshToken = createAsyncThunk("auth/loginWithRefreshToken", async(payload, thunkAPI) => {
    const data = await AuthAPI.loginWithRefreshToken({
        refresh_token: localStorage.getItem('refresh_token')
    });
    localStorage.setItem('access_token', data.data.access_token);
    localStorage.setItem('refresh_token', data.data.refresh_token);
    return data?.data || {}
});

export const register = createAsyncThunk("auth/register", async(payload, thunkAPI) => {
    const data = await AuthAPI.register(payload);
    return data?.data || {}
});

const AuthSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null
    },
    extraReducers: {
        [login.fulfilled](state, action) {
            state.user = action.payload;
        },
        [loginWithRefreshToken.fulfilled](state, action) {
            state.user = action.payload;
        }
    },
    reducers: {
        clearUser(state) {
            state.user = null;
        }
    }
});

export const { clearUser } = AuthSlice.actions;

export default AuthSlice.reducer;