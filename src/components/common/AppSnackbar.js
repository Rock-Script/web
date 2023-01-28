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
    return <div>
        <Snackbar open={show} autoHideDuration={6000} onClose={handleClose}>
            {show && <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                {message}
            </Alert>}
        </Snackbar>
    </div>
}

export default AppSnackbar;