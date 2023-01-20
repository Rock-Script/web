import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import MemberAPI from "../services/MemberAPI";

export const getMembers = createAsyncThunk("member/getMembers", async(payload, thunkAPI) => {
    console.log('member slice get members')
    const data = await MemberAPI.getAll();
    return data?.data || [];
});

export const addMember = createAsyncThunk("member/addMember", async(payload, thunkAPI) => {
    console.log('member slice get members')
    const data = await MemberAPI.add(payload);
    thunkAPI.dispatch(getMembers());
    return data?.data || [];
});

export const updateMember = createAsyncThunk("member/updateMember", async(payload, thunkAPI) => {
    console.log('member slice get members')
    const data = await MemberAPI.update(payload);
    thunkAPI.dispatch(getMembers());
    return data?.data || [];
});

const MemberSlice = createSlice({
    name: 'member',
    initialState: {
        list: []
    },
    extraReducers: {
        [getMembers.fulfilled](state, action) {
            state.list = action.payload;
        }
    }
});

// export const { show, hide } = MemberSlice.actions;

export default MemberSlice.reducer;