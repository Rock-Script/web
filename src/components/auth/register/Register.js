import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Grid, Stack, Button, TextField, Link, Typography } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { register } from '../../../slices/AuthSlice';
import { show } from '../../../slices/SnackbarSlice';
import AlertServerities from '../../../constants/AlertSeverities';
import { useState } from 'react';

function Register() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [form, setForm] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        phone: "",
        confirm_password: ""
    })

    const handleLogin = () => {
        navigate("/login")
    }

    const handleForgotPassword = () => {
        navigate('/forgot-password');
    }

    const handleRegister = () => {
        if (form.password !== "" & form.password === form.confirm_password) {
            dispatch(register(form))
        } else {
            dispatch(show({
                message: "Invalid password / confirm password",
                severity: AlertServerities.ERROR
            }))
        }
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
                            <Typography variant="h5" component="h5">Register</Typography>
                            <TextField name="first_name" id="first_name" label="First Name" variant="outlined" type="text" onChange={handleFormChange} value={form.first_name} />
                            <TextField name="last_name" id="last_name" label="Last Name" variant="outlined" type="text" onChange={handleFormChange} value={form.last_name} />
                            <TextField name="email" id="email" label="Email" variant="outlined" onChange={handleFormChange} value={form.email} />
                            <TextField name="phone" id="phone" label="Phone" variant="outlined" onChange={handleFormChange} value={form.phone} />
                            <TextField name="password" id="password" label="Password" variant="outlined" type="password" onChange={handleFormChange} value={form.password} />
                            <TextField name="confirm_password" id="confirm_password" label="Confirm Password" variant="outlined" type="password" onChange={handleFormChange} value={form.confirm_password}/>
                            <Button variant="contained" onClick={() => handleRegister()}>Register</Button>
                            <Grid container>
                                <Grid item xs={6}>
                                    <Link href="#" onClick={() => handleLogin()}>Login</Link>
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

export default Register;