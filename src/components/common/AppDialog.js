import { Dialog, DialogContent, DialogTitle, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { hide } from "../../slices/DialogSlice";


function AppDialog() {
    const dispatch = useDispatch();
    const show = useSelector(state => state.dialog.show);
    const content = useSelector(state => state.dialog.content);
    const title = useSelector(state => state.dialog.title);

    const handleClose = () => {
        dispatch(hide());
    }
    return <div>
        <Dialog open={show} onClose={handleClose} maxWidth>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                {content}
            </DialogContent>
        </Dialog>
    </div>
}

export default AppDialog;