import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { resendVerificationEmail } from "../../slices/AuthSlice";
import Login from "../auth/login/Login";
import InstituteForm from "../institude/InstituteForm";



function PrivateRoutes(props) {
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);
    const resent_verification_email = useSelector(state => state.auth.resent_verification_email);
    if(!user)  {
        return <Login></Login>
    }

    const handleResendVerificationEmail = () => {
        dispatch(resendVerificationEmail(user));
    }
    
    if (user && !user.email_verified) {
        return <Box m={5}>
            Email address ({user.email}) is not verified, please verify email.
            {!resent_verification_email && 
                <Box>
                    <Button onClick={handleResendVerificationEmail}>Resend verification email</Button>
                </Box>
            }
            {resent_verification_email && 
                <Typography>
                    Please check you email inbox for verification email.
                </Typography>
            }
        </Box>
    }

    if (user && user.members?.length === 0) {
        return <InstituteForm></InstituteForm>
    }

    return <>
        {props.children}
    </>
}

export default PrivateRoutes;