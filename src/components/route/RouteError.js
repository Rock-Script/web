import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";


function RouteError() {
    const navigate = useNavigate();
    const handleReload = () => {
        navigate('/');
    }
    return <h1>
        <Typography>
            Sorry of incovinience caused, something went wrong
        </Typography>
        <Button onClick={handleReload}>Reload</Button>
    </h1>
}


export default RouteError;