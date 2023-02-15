import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AuthAPI from "../services/AuthAPI";
import { getAllPrivileges } from "./RoleSlice";

export const login = createAsyncThunk("auth/login", async(payload, thunkAPI) => {
    const data = await AuthAPI.login(payload);
    setTokens(data, thunkAPI.dispatch);
    return data?.data || {}
});

export const loginWithRefreshToken = createAsyncThunk("auth/loginWithRefreshToken", async(payload, thunkAPI) => {
    const data = await AuthAPI.loginWithRefreshToken({
        refresh_token: localStorage.getItem('refresh_token')
    });
    setTokens(data, thunkAPI.dispatch);
    return data?.data || {}
});

export const register = createAsyncThunk("auth/register", async(payload, thunkAPI) => {
    const data = await AuthAPI.register(payload);
    return data?.data || {}
});

export const verifyEmail = createAsyncThunk("auth/verifyEmail", async(payload, thunkAPI) => {
    const data = await AuthAPI.verifyEmail(payload);
    return data?.data || {}
});

const setUser = (state, action) => {
    state.user = action.payload;
    state.member = (action.payload.members || []).find(m => m.institute_id === localStorage.getItem('institute_id'))
    if (state.member && action.payload.members[0]) {
        state.member = action.payload.members[0];
    }
}

const setTokens = (data, dispatch) => {
    localStorage.setItem('access_token', data.data.access_token);
    localStorage.setItem('refresh_token', data.data.refresh_token);
    dispatch(getAllPrivileges());
}

const AuthSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null
    },
    extraReducers: {
        [login.fulfilled](state, action) {
            setUser(state, action); 
        },
        [loginWithRefreshToken.fulfilled](state, action) {
            setUser(state, action);
        },
        [verifyEmail.fulfilled](state, action) {
            setUser(state, action);
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