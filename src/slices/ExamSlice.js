import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ExamAPI from "../services/ExamAPI ";

export const getExams = createAsyncThunk("exam/getExams", async(payload, thunkAPI) => {
    const data = await ExamAPI.getAll(payload);
    return data?.data || [];
});

export const getExam = createAsyncThunk("exam/getExam", async(exam_id, thunkAPI) => {
    const data = await ExamAPI.get(exam_id);
    return data?.data || [];
});

export const addExam = createAsyncThunk("exam/addExam", async(payload, thunkAPI) => {
    console.log('exam slice get exams')
    const data = await ExamAPI.add(payload);
    return data?.data || [];
});

export const updateExam = createAsyncThunk("exam/updateExam", async(payload, thunkAPI) => {
    const data = await ExamAPI.update(payload);
    return data?.data || [];
});

export const publishExam = createAsyncThunk("exam/publishExam", async(payload, thunkAPI) => {
    const data = await ExamAPI.publish(payload);
    return data?.data || [];
});

const ExamSlice = createSlice({
    name: 'exam',
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
        },
        [publishExam.fulfilled](state, action) {
            state.exam = action.payload;
        }
    },
    reducers: {
        clearExam(state, action) {
            state.exam = null;
        }
    }
});

export const { clearExam } = ExamSlice.actions;

export default ExamSlice.reducer;