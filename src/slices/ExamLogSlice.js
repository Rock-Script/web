import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ExamLogAPI from "../services/ExamLogAPI"
import { show } from "./SnackbarSlice";
import AlertSeverties from "../constants/AlertSeverities";

export const addExamLog = createAsyncThunk("exam_log/addExamLog", async(payload, thunkAPI) => {
    const data = await ExamLogAPI.add(payload);
    return data?.data || {};
});

export const getExamLog = createAsyncThunk("exam_log/getExamLog", async(payload, thunkAPI) => {
    const data = await ExamLogAPI.get(payload);
    return data?.data || {};
});

export const getExamLogs = createAsyncThunk("exam_log/getExamLogs", async(payload, thunkAPI) => {
    const data = await ExamLogAPI.list(payload);
    return data?.data || {};
});

export const saveAnswer = createAsyncThunk("exam_log/saveAnswer", async(payload, thunkAPI) => {
    try {
        const data = await ExamLogAPI.saveAnswer(payload);
        thunkAPI.dispatch(show({
            message: data.message,
            severity: data.status === 200 ? AlertSeverties.SUCCESS : AlertSeverties.ERROR
        }))
        return data?.data || {};
    } catch(e){
    }
});

export const submitExamLog = createAsyncThunk("exam_log/submitExamLog", async(payload, thunkAPI) => {
    const data = await ExamLogAPI.submit(payload);
    return data?.data || {};
});

const ExamLogSlice = createSlice({
    name: 'exam_log',
    initialState: {
        exam_log: null,
        exam_log_list: []
    },
    extraReducers: {
        [addExamLog.fulfilled](state, action) {
            state.exam_log = action.payload;
        },
        [getExamLog.fulfilled](state, action) {
            state.exam_log = action.payload;
        },
        [getExamLogs.fulfilled](state, action) {
            state.exam_log_list = action.payload
        },
        [submitExamLog.fulfilled](state, action) {
            state.exam_log = action.payload;
        }
    },
    reducers: {
        clearExam(state, action) {
            state.exam = null;
        }
    }
});

export const { clearExam } = ExamLogSlice.actions;

export default ExamLogSlice.reducer;