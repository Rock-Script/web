import { configureStore } from "@reduxjs/toolkit";
import DialogSlice from "../slices/DialogSlice";

const store = configureStore({
    reducer: {
        dialog: DialogSlice
    }
});

export default store;