import { useDispatch, useSelector } from 'react-redux';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Grid, Stack, Button, TextField, Link, Typography } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { login } from '../../../slices/AuthSlice';
import { useEffect, useState } from 'react';

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);
    const [form, setForm] = useState({
        email: "",
        password: ""
    })

    useEffect(() => {
        if (user) {
            navigate('/dashboard')
        }
    }, [user]);

    const handleRegister = () => {
        navigate('/register');
    }

    const handleForgotPassword = () => {
        navigate('/forgot-password');
    }

    const handleLogin = () => {
        dispatch(login(form));
    }

    const handleFormChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
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
                            <TextField name="email" id="email" label="Email" variant="outlined" value={form.email} onChange={handleFormChange}/>
                            <TextField name="password" id="password" label="Password" variant="outlined" type="password" value={form.password} onChange={handleFormChange}/>
                            <Button variant="contained" onClick={() => handleLogin()}>Login</Button>
                            <Grid container>
                                <Grid item xs={6}>
                                    <Link href="#" onClick={() => handleRegister()}>Register</Link>
                                </Grid>
                                <Grid item xs={6}>
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