import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import QuestionAPI from "../services/QuestionAPI";
import { show } from "./SnackbarSlice";
import AlertSeverties from "../constants/AlertSeverities";
import { getExam } from "./ExamSlice";

export const getQuestions = createAsyncThunk("question/getQuestions", async(payload, thunkAPI) => {
    const data = await QuestionAPI.getAll();
    return data?.data || [];
});

export const addQuestion = createAsyncThunk("question/addQuestion", async(payload, thunkAPI) => {
    const data = await QuestionAPI.add(payload.exam_id, payload);
    thunkAPI.dispatch(show({
        message: data.message,
        severity: data.status === 201 ? AlertSeverties.SUCCESS : AlertSeverties.ERROR
    }))
    return data?.data || [];
});

export const updateQuestion = createAsyncThunk("question/updateQuestion", async(payload, thunkAPI) => {
    const data = await QuestionAPI.update(payload);
    thunkAPI.dispatch(show({
        message: data.message,
        severity: data.status === 200 ? AlertSeverties.SUCCESS : AlertSeverties.ERROR
    }))
    return data?.data || [];
});

export const deleteQuestion = createAsyncThunk("question/deleteQuestion", async(payload, thunkAPI) => {
    const data = await QuestionAPI.delete(payload);
    thunkAPI.dispatch(show({
        message: data.message,
        severity: data.status === 200 ? AlertSeverties.SUCCESS : AlertSeverties.ERROR
    }));
    thunkAPI.dispatch(getExam(payload.exam_id));
    return data?.data || [];
});

const QuestionSlice = createSlice({
    name: 'question',
    initialState: {
        list: []
    },
    extraReducers: {
        [getQuestions.fulfilled](state, action) {
            state.list = action.payload;
        }
    }
});

// export const { show, hide } = ExamSlice.actions;

export default QuestionSlice.reducer;