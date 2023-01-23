import { Autocomplete, Button, Container, TextField } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hide } from "../../slices/DialogSlice";
import { addCourse, updateCourse } from "../../slices/CourseSlice";
import { Box } from "@mui/system";


function MemberForm({course}) {
    const dispatch = useDispatch();
    const courseList = useSelector(state => state.course.list);
    const [form, setForm] = useState({
        name: course?.name || "",
        parent_id: course?.parent_id || "",
        parent: course?.parent || {}
    })
    const handleClose = () => {
        dispatch(hide());
    }

    const handleSave = () => {
        if (course?._id) {
            dispatch(updateCourse({
                ...form,
                _id: course._id
            }));
        } else {
            dispatch(addCourse(form));
        }
        dispatch(hide());
    }

    const handleFormChange = (e) => {
        const form_values = {...form}
        setForm({
            ...form_values,
            [e.target.name]: e.target.value
        })
    }

    const handleParentChange = (event, value) => {
        const form_values = {...form}
        const parent = courseList.find(c => c.name === value);
        setForm({
            ...form_values,
            parent_id: parent?._id,
            parent: parent
        })
    }

    return <Container>
        <TextField fullWidth label="Name" name="name" id="name" 
            variant="outlined" margin="dense" value={form.name} 
            onChange={(e) => handleFormChange(e)}/>
        <Autocomplete
            margin="dense" id="courses" sx={{ minWidth: 300 }} options={courseList}
            getOptionLabel={(option) => option.name}
            value={form.parent}
            onInputChange={(event, new_value) => handleParentChange(event, new_value)}
            renderInput={(params) => (
                <TextField
                  {...params}
                  margin="dense"
                  label="Select parent"
                  inputProps={{
                    ...params.inputProps
                  }}
                />
              )}
            renderOption={(props, option) => (
                <Box id={option._id}  component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                    {option.name}
                </Box>
            )}
        ></Autocomplete>
        <div style={{textAlign: "end", paddingTop: '10px'}} margin="dense">
            <Button onClick={handleSave} variant="outlined">Save</Button>&nbsp;&nbsp;
            <Button onClick={handleClose} variant="outlined">Cancel</Button>
        </div>
        
    </Container>
}


export default MemberForm;