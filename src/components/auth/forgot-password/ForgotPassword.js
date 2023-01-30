import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Grid, Stack, Button, TextField, Link, Typography } from '@mui/material';
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
    const navigate = useNavigate();

    const handleRegister = () => {
        navigate('/register');
    }

    const handleLogin = () => {
        navigate('/login');
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
                            <Typography variant="h5" component="h5">Forgot Password</Typography>
                            <TextField id="email" label="Email" variant="outlined" />
                            <Button variant="contained">Submit</Button>
                            <Grid container>
                                <Grid item xs={6}>
                                    <Link href="#" onClick={() => handleLogin()}>Login</Link>
                                </Grid>
                                <Grid item xs={6}>
                                    <Link href="#" onClick={() => handleRegister()}>Register</Link>
                                </Grid>
                            </Grid>
                        </Stack>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    </>
}

export default ForgotPassword;