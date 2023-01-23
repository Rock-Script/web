import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import CourseAPI from "../services/CourseAPI";

export const getCourses = createAsyncThunk("course/getCourses", async(payload, thunkAPI) => {
    const data = await CourseAPI.getAll(payload);
    return data?.data || [];
});

export const getCourse = createAsyncThunk("course/getCourse", async(course_id, thunkAPI) => {
    const data = await CourseAPI.get(course_id);
    return data?.data || [];
});

export const addCourse = createAsyncThunk("course/addCourse", async(payload, thunkAPI) => {
    const data = await CourseAPI.add(payload);
    thunkAPI.dispatch(getCourses());
    return data?.data || [];
});

export const updateCourse = createAsyncThunk("course/updateCourse", async(payload, thunkAPI) => {
    const data = await CourseAPI.update(payload);
    thunkAPI.dispatch(getCourses());
    return data?.data || [];
});

const CourseSlice = createSlice({
    name: 'course',
    initialState: {
        list: [],
        course: null
    },
    extraReducers: {
        [getCourses.fulfilled](state, action) {
            state.list = action.payload;
        },
        [getCourse.fulfilled](state, action) {
            state.course = action.payload;
        }
    }
});

// export const { show, hide } = MemberSlice.actions;

export default CourseSlice.reducer;