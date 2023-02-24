import { Autocomplete, Button, Card, Container, Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { hide } from "../../slices/DialogSlice";
import { addCourse, getCoursesList, updateCourse } from "../../slices/CourseSlice";
import { Box } from "@mui/system";
import { addInstitute, updateInstitute } from "../../slices/InstituteSlice";


function InstituteForm({institute}) {
    const dispatch = useDispatch();
    const [form, setForm] = useState({
        name: institute?.name || "",
        address: institute?.address || ""
    })

    const handleSave = () => {
        if (institute?._id) {
            dispatch(updateInstitute({
                ...form,
                _id: institute._id
            }));
        } else {
            dispatch(addInstitute(form));
        }
    }

    const handleFormChange = (e) => {
        const form_values = {...form}
        setForm({
            ...form_values,
            [e.target.name]: e.target.value
        })
    }

    return <Container>
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: '100vh' }}
        >
            <Grid item xs={6} sx={{ minWidth: 275 }}>
                <Typography align="left" variant="h5" component="h5" pb={1}>Create Institute</Typography>
                <TextField fullWidth label="Name" name="name" id="name" 
                    variant="outlined" margin="dense" value={form.name} 
                    onChange={(e) => handleFormChange(e)}/>
                <TextField fullWidth label="Address" name="address" id="address" 
                    variant="outlined" margin="dense" value={form.address} 
                    onChange={(e) => handleFormChange(e)}/>
                <div style={{textAlign: "end", paddingTop: '10px'}} margin="dense">
                    <Button onClick={handleSave} variant="outlined">Save</Button>&nbsp;&nbsp;
                </div>
            </Grid>
        </Grid>
    </Container>
}


export default InstituteForm;