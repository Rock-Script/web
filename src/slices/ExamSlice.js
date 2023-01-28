import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ExamAPI from "../services/ExamAPI ";

export const getExams = createAsyncThunk("member/getExams", async(payload, thunkAPI) => {
    console.log('member slice get members')
    const data = await ExamAPI.getAll();
    return data?.data || [];
});

export const getExam = createAsyncThunk("member/getExam", async(exam_id, thunkAPI) => {
    const data = await ExamAPI.get(exam_id);
    return data?.data || [];
});

export const addExam = createAsyncThunk("member/addExam", async(payload, thunkAPI) => {
    console.log('member slice get members')
    const data = await ExamAPI.add(payload);
    return data?.data || [];
});

export const updateExam = createAsyncThunk("member/updateExam", async(payload, thunkAPI) => {
    console.log('member slice get members')
    const data = await ExamAPI.update(payload);
    return data?.data || [];
});

const ExamSlice = createSlice({
    name: 'member',
    initialState: {
        list: [],
        exam: null
    },
    extraReducers: {
        [getExams.fulfilled](state, action) {
            state.list = action.payload;
        },
        [getExam.fulfilled](state, action) {
            state.exam = action.payload;
        }
    }
});

// export const { show, hide } = ExamSlice.actions;

export default ExamSlice.reducer;