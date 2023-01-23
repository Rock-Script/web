import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import CourseAPI from "../services/CourseAPI";

export const getCoursesTree = createAsyncThunk("course/getCoursesTree", async(payload, thunkAPI) => {
    const data = await CourseAPI.getAll(payload);
    return data?.data || [];
});

export const getCoursesList = createAsyncThunk("course/getCoursesList", async(payload, thunkAPI) => {
    const data = await CourseAPI.getAll();
    return data?.data || [];
});

export const getCourse = createAsyncThunk("course/getCourse", async(course_id, thunkAPI) => {
    const data = await CourseAPI.get(course_id);
    return data?.data || [];
});

export const addCourse = createAsyncThunk("course/addCourse", async(payload, thunkAPI) => {
    const data = await CourseAPI.add(payload);
    thunkAPI.dispatch(getCoursesTree({ is_tree_view: true }));
    return data?.data || [];
});

export const updateCourse = createAsyncThunk("course/updateCourse", async(payload, thunkAPI) => {
    const data = await CourseAPI.update(payload);
    thunkAPI.dispatch(getCoursesTree({ is_tree_view: true }));
    thunkAPI.dispatch(getCourse(payload._id));
    return data?.data || [];
});

const CourseSlice = createSlice({
    name: 'course',
    initialState: {
        list: [],
        tree: [],
        course: null
    },
    extraReducers: {
        [getCoursesTree.fulfilled](state, action) {
            state.tree = action.payload;
        },
        [getCoursesList.fulfilled](state, action) {
            state.list = action.payload;
        },
        [getCourse.fulfilled](state, action) {
            state.course = action.payload;
        }
    }
});

// export const { show, hide } = MemberSlice.actions;

export default CourseSlice.reducer;