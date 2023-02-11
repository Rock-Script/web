import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import RoleAPI from "../services/RoleAPI";
import { show } from "./SnackbarSlice";
import AlertSeverities from "../constants/AlertSeverities";

export const getAllPrivileges = createAsyncThunk("role/getAllPrivileges", async(payload, thunkAPI) => {
    const data = await RoleAPI.getAllPrivileges();
    return data?.data || [];
});

export const addRole = createAsyncThunk("role/addRole", async(payload, thunkAPI) => {
    const data = await RoleAPI.addRole(payload);
    if (data.status === 201) {
        thunkAPI.dispatch(show({
            message: data.message,
            severity: AlertSeverities.SUCCESS
        }))
    }
    return data?.data || {}
})

const RoleSlice = createSlice({
    name: 'role',
    initialState: {
        previleges_list: [],
        role: null
    },
    extraReducers: {
        [getAllPrivileges.fulfilled](state, action) {
            state.previleges_list = action.payload;
        },
        [addRole.fulfilled](state, action) {
            state.role = action.payload;
        }
    },
    reducers: {
        clearRole(state, action) {
            state.role = null;
        }
    }
});

export const { clearRole } = RoleSlice.actions;

export default RoleSlice.reducer;