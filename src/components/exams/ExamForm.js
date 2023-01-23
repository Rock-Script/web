import { Autocomplete, Box, Button, Container, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCoursesList } from "../../slices/CourseSlice";
import { hide } from "../../slices/DialogSlice";
import { addExam, updateExam } from "../../slices/ExamSlice";


function MemberForm({exam}) {
    const dispatch = useDispatch();
    const course = useSelector(state => state.course.course);
    const courseList = useSelector(state => state.course.list);
    const [form, setForm] = useState({
        name: exam?.name || "",
        course_id: exam?.course_id || "",
        course: exam?.parent || {}
    })
    const handleClose = () => {
        dispatch(hide());
    }

    useEffect(() => {
        dispatch(getCoursesList());
    }, [])

    const handleSave = () => {
        if (exam?._id) {
            dispatch(updateExam({
                ...form,
                _id: exam._id
            }));
        } else {
            dispatch(addExam(form));
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

    const handleCourseChange = (event, value) => {
        const form_values = {...form}
        const course = courseList.find(c => c.name === value);
        setForm({
            ...form_values,
            course_id: course?._id,
            course: course
        })
    }

    return <Container>
        <TextField fullWidth label="Name" name="name" id="name" variant="outlined" margin="dense" value={form.name} onChange={(e) => handleFormChange(e)}/>
        <Autocomplete
            margin="dense" id="courses" sx={{ minWidth: 300 }} options={courseList || []}
            getOptionLabel={(option) => option.name}
            value={form.course || course}
            onInputChange={(event, new_value) => handleCourseChange(event, new_value)}
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