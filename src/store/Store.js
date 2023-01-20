import { configureStore } from "@reduxjs/toolkit";
import DialogSlice from "../slices/DialogSlice";
import MemberSlice from "../slices/MemberSlice";

const store = configureStore({
    reducer: {
        dialog: DialogSlice,
        member: MemberSlice
    }
});

export default store;