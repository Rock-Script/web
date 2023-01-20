import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Grid, Stack, Button, TextField, Link, Typography } from '@mui/material';
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();

    const handleRegister = () => {
        navigate('/register');
    }

    const handleForgotPassword = () => {
        navigate('/forgot-password');
    }

    const handleLogin = () => {
        navigate('/dashboard');
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
                            <Typography variant="h5" component="h5">Login</Typography>
                            <TextField id="email" label="Email" variant="outlined" />
                            <TextField id="password" label="Password" variant="outlined" type="password"/>
                            <Button variant="contained" onClick={() => handleLogin()}>Login</Button>
                            <Grid container>
                                <Grid xs={6}>
                                    <Link href="#" onClick={() => handleRegister()}>Register</Link>
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

export default Login;