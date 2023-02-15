import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { verifyEmail } from "../../../slices/AuthSlice";

function EmailVerify() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const microservices = useSelector(state => state.config.microservices);
    const user = useSelector(state => state.auth.user);
    const { search } = useLocation();
    const token = new URLSearchParams(search).get("token");
    const first_name = new URLSearchParams(search).get("first_name");
    const last_name = new URLSearchParams(search).get("last_name");
    let email = new URLSearchParams(search).get("email");
    const _id = new URLSearchParams(search).get("_id"); 

    useEffect(() => {
        if (token && email && _id && microservices?.auth) {
            email = email.replaceAll(" ", "+");
            dispatch(verifyEmail({token, email, _id}));
        }
    }, [token, email, _id, microservices]);

    const handleLogin = () => {
        navigate('/login')
    }
    return <>
        {user?.email_verified && 
            <>
                <Typography>
                    Thank you {first_name} {last_name} for verifying your email. Your email address is verified
                </Typography>

                <Box>
                    <Button onClick={() => handleLogin()}>Login</Button>
                </Box>
            </>
        }
        {!user && <>
            <Typography>
                Please wait while we verify your email.
            </Typography>
        </>}
        
    </>
}
export default EmailVerify;