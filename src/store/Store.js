import { configureStore } from "@reduxjs/toolkit";
import DialogSlice from "../slices/DialogSlice";
import MemberSlice from "../slices/MemberSlice";
import CourseSlice from "../slices/CourseSlice";
import ExamSlice from "../slices/ExamSlice";
import ExamLogSlice from "../slices/ExamLogSlice";
import SnackbarSlice from "../slices/SnackbarSlice";

const store = configureStore({
    reducer: {
        dialog: DialogSlice,
        snackbar: SnackbarSlice,
        member: MemberSlice,
        course: CourseSlice,
        exam: ExamSlice,
        exam_log: ExamLogSlice
    },
    devTools: true
});

const unsubscribe = store.subscribe((data) =>
  console.log('State after dispatch: ', store.getState(), JSON.stringify(data))
)

export default store;