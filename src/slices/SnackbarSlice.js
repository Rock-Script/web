import { createSlice } from "@reduxjs/toolkit";

const SnackbarSlice = createSlice({
    name: 'snackbar',
    initialState: {
        show: false,
        message: null,
        severity: null
    },
    reducers: {
        show(state, action) {
            state.show = true;
            state.message = action.payload.message;
            state.severity = action.payload.severity;
        },
        hide(state) {
            state.show = false;
            state.message = null;
            state.severity = null;
        }
    }
});

export const { show, hide } = SnackbarSlice.actions;

export default SnackbarSlice.reducer;