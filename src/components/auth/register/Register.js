import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Grid, Stack, Button, TextField, Link, Typography } from '@mui/material';
import { useNavigate } from "react-router-dom";

function Register() {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate("/login")
    }

    const handleForgotPassword = () => {
        navigate('/forgot-password');
    }

    return <>
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: '100vh' }}
        >
            <Grid item xs={3}>
                <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                        <Stack spacing={2}>
                            <Typography variant="h5" component="h5">Register</Typography>
                            <TextField id="first_name" label="First Name" variant="outlined" type="text"/>
                            <TextField id="last_name" label="Last Name" variant="outlined" type="text"/>
                            <TextField id="email" label="Email" variant="outlined" />
                            <TextField id="password" label="Password" variant="outlined" type="password"/>
                            <TextField id="password" label="Confirm Password" variant="outlined" type="password"/>
                            <Button variant="contained">Register</Button>
                            <Grid container>
                                <Grid xs={6}>
                                    <Link href="#" onClick={() => handleLogin()}>Login</Link>
                                </Grid>
                                <Grid xs={6}>
                                    <Link href="#" onClick={() => handleForgotPassword()}>Forgot password</Link>
                                </Grid>
                            </Grid>
                        </Stack>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    </>
}

export default Register;