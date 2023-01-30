import { Snackbar, Alert } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { hide } from "../../slices/SnackbarSlice";


function AppSnackbar() {
    const dispatch = useDispatch();
    const show = useSelector(state => state.snackbar.show);
    const message = useSelector(state => state.snackbar.message);
    const severity = useSelector(state => state.snackbar.severity);

    const handleClose = () => {
        dispatch(hide());
    }

    if (!show) return null;
    return <Snackbar open={show} autoHideDuration={4000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={severity || null} sx={{ width: '100%' }}>
                {message || ""}
            </Alert>
        </Snackbar>;
}

export default AppSnackbar;