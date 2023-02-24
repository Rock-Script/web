import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import InstituteAPI from "../services/InstituteAPI";

export const addInstitute = createAsyncThunk("institute/addInstitute", async(payload, thunkAPI) => {
    const data = await InstituteAPI.add(payload);
    return data?.data || [];
});

export const updateInstitute = createAsyncThunk("institute/updateInstitute", async(payload, thunkAPI) => {
    const data = await InstituteAPI.update(payload);
    return data?.data || [];
});

const InstituteSlice = createSlice({
    name: 'institute',
    initialState: {
        institute: {}
    },
    extraReducers: {

    }
});

export default InstituteSlice.reducer;