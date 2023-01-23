import { configureStore } from "@reduxjs/toolkit";
import DialogSlice from "../slices/DialogSlice";
import MemberSlice from "../slices/MemberSlice";
import CourseSlice from "../slices/CourseSlice";

const store = configureStore({
    reducer: {
        dialog: DialogSlice,
        member: MemberSlice,
        course: CourseSlice
    }
});

export default store;