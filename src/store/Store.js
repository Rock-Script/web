import { configureStore } from "@reduxjs/toolkit";
import DialogSlice from "../slices/DialogSlice";
import MemberSlice from "../slices/MemberSlice";
import CourseSlice from "../slices/CourseSlice";
import ExamSlice from "../slices/ExamSlice";
import SnackbarSlice from "../slices/SnackbarSlice";

const store = configureStore({
    reducer: {
        dialog: DialogSlice,
        snackbar: SnackbarSlice,
        member: MemberSlice,
        course: CourseSlice,
        exam: ExamSlice
    }
});

export default store;