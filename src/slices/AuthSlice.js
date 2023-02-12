import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AuthAPI from "../services/AuthAPI";
import { show } from "./SnackbarSlice";
import AlertSeverities from "../constants/AlertSeverities";

export const login = createAsyncThunk("auth/login", async(payload, thunkAPI) => {
    const data = await AuthAPI.login(payload);
    if (data.status === 200) {
        thunkAPI.dispatch(show({
            message: data.message,
            severity: AlertSeverities.SUCCESS
        }));
    }
    return data?.data || {}
});

export const register = createAsyncThunk("auth/register", async(payload, thunkAPI) => {
    const data = await AuthAPI.register(payload);
    if (data.status === 200) {
        thunkAPI.dispatch(show({
            message: data.message,
            severity: AlertSeverities.SUCCESS
        }));
    } else {
        thunkAPI.dispatch(show({
            message: data.message,
            severity: AlertSeverities.ERROR
        }));
    }
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
        }
    },
    reducers: {
    }
});

export const { clearRole } = AuthSlice.actions;

export default AuthSlice.reducer;