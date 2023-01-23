import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ExamAPI from "../services/ExamAPI ";

export const getExams = createAsyncThunk("member/getExams", async(payload, thunkAPI) => {
    console.log('member slice get members')
    const data = await ExamAPI.getAll();
    return data?.data || [];
});

export const addExam = createAsyncThunk("member/addExam", async(payload, thunkAPI) => {
    console.log('member slice get members')
    const data = await ExamAPI.add(payload);
    thunkAPI.dispatch(getExams());
    return data?.data || [];
});

export const updateExam = createAsyncThunk("member/updateExam", async(payload, thunkAPI) => {
    console.log('member slice get members')
    const data = await ExamAPI.update(payload);
    thunkAPI.dispatch(getExams());
    return data?.data || [];
});

const ExamSlice = createSlice({
    name: 'member',
    initialState: {
        list: []
    },
    extraReducers: {
        [getExams.fulfilled](state, action) {
            state.list = action.payload;
        }
    }
});

// export const { show, hide } = ExamSlice.actions;

export default ExamSlice.reducer;