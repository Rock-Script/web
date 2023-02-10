import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ExamLogAPI from "../services/ExamLogAPI"

export const addExamLog = createAsyncThunk("exam_log/addExamLog", async(payload, thunkAPI) => {
    const data = await ExamLogAPI.add(payload);
    return data?.data || [];
});

const ExamLogSlice = createSlice({
    name: 'exam_log',
    initialState: {
        exam_log: null
    },
    extraReducers: {
        [addExamLog.fulfilled](state, action) {
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