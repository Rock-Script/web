import { createSlice } from "@reduxjs/toolkit";

const DialogSlice = createSlice({
    name: 'dialog',
    initialState: {
        show: false,
        content: null,
        title: null
    },
    reducers: {
        show(state, action) {
            state.show = true;
            state.content = action.payload.content;
            state.title = action.payload.title;
        },
        hide(state) {
            state.show = false;
            state.content = null;
            state.title = null;
        }
    }
});

export const { show, hide } = DialogSlice.actions;

export default DialogSlice.reducer;