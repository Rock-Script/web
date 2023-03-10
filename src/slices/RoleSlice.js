import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import RoleAPI from "../services/RoleAPI";
import { show } from "./SnackbarSlice";
import { hide } from "./DialogSlice";
import AlertSeverities from "../constants/AlertSeverities";

export const getAllPrivileges = createAsyncThunk("role/getAllPrivileges", async(payload, thunkAPI) => {
    const data = await RoleAPI.getAllPrivileges();
    return data?.data || [];
});

export const getAllRoles = createAsyncThunk("role/getAllRoles", async(payload, thunkAPI) => {
    const data = await RoleAPI.getAllRoles();
    return data?.data || [];
});

export const addRole = createAsyncThunk("role/addRole", async(payload, thunkAPI) => {
    const data = await RoleAPI.addRole(payload);
    if (data.status === 201) {
        thunkAPI.dispatch(show({
            message: data.message,
            severity: AlertSeverities.SUCCESS
        }));
        thunkAPI.dispatch(hide());
        thunkAPI.dispatch(getAllRoles());
    }
    return data?.data || {}
});

export const updateRole = createAsyncThunk("role/updateRole", async(payload, thunkAPI) => {
    const data = await RoleAPI.updateRole(payload);
    if (data.status === 200) {
        thunkAPI.dispatch(show({
            message: data.message,
            severity: AlertSeverities.SUCCESS
        }))
        thunkAPI.dispatch(hide());
        thunkAPI.dispatch(getAllRoles());
    }
    return data?.data || {}
})

const RoleSlice = createSlice({
    name: 'role',
    initialState: {
        privilege_list: [],
        role_list: [],
        role: null
    },
    extraReducers: {
        [getAllPrivileges.fulfilled](state, action) {
            state.privilege_list = action.payload;
            const privilege_id_map = {};
            const privilege_map = {};
            state.privilege_list.forEach(privilege => {
                privilege_id_map[privilege._id] = privilege;
                privilege_map[privilege.privilege] = privilege;
            }); 
            state.privilege_id_map = privilege_id_map;
            state.privilege_map = privilege_map;
        },
        [addRole.fulfilled](state, action) {
            state.role = action.payload;
        },
        [getAllRoles.fulfilled](state, action) {
            state.role_list = action.payload;
        },
        [updateRole.fulfilled](state, action) {
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