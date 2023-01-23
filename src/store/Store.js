import { configureStore } from "@reduxjs/toolkit";
import DialogSlice from "../slices/DialogSlice";
import MemberSlice from "../slices/MemberSlice";
import CourseSlice from "../slices/CourseSlice";
import ExamSlice from "../slices/ExamSlice";

const store = configureStore({
    reducer: {
        dialog: DialogSlice,
        member: MemberSlice,
        course: CourseSlice,
        exam: ExamSlice
    }
});

export default store;