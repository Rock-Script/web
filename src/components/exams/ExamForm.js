import { Autocomplete, Box, Button, Grid, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getCoursesList } from "../../slices/CourseSlice";
import { hide } from "../../slices/DialogSlice";
import { addExam, clearExam, getExam, publishExam, updateExam } from "../../slices/ExamSlice";
import QuestionForm from "./QuestionForm";


function ExamForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const [showQuestionForm, setShowQuestionForm] = useState(false);
    const courseList = useSelector(state => state.course.list);
    const exam = useSelector(state => state.exam.exam);
    const [form, setForm] = useState({
        name: exam?.name || "",
        course_id: exam?.course_id || "",
        course: exam?.course || null
    })
    const handleClose = () => {
        navigate('/dashboard/exams');
    }

    const clearForm = () => {
        setForm({
            name: "",
            course_id: "",
            course: null
        })
    }

    useEffect(() => {
        return () => {
            clearForm();
            dispatch(clearExam());
        };
      }, []);

    useEffect(() => {
        dispatch(getCoursesList());
    }, [dispatch])

    useEffect(() => {
        if (params.exam_id === "new") {
            clearForm();
            dispatch(clearExam());
        } else {
            dispatch(getExam(params.exam_id));
        }
    }, [params])

    useEffect(() => {
        setForm({
            name: exam?.name || "",
            course_id: exam?.course_id || "",
            course: exam?.course || null
        });
    }, [exam])

    const handleSave = () => {
        if (exam?._id) {
            dispatch(updateExam({
                ...form,
                _id: exam._id
            }));
        } else {
            dispatch(addExam(form)).then((action) => {
                navigate('/dashboard/exams/' + action.payload._id);
            });
        }
    }

    const handlePublish = () => {
        dispatch(publishExam({_id: exam._id}));
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
        setTimeout(() => {
            setForm({
                ...form_values,
                course_id: course?._id,
                course: course
            })
        }, 10);
    }

    const handleAddQuestion = () => {
        setShowQuestionForm(true);
    }

    const postQuestionSave = (q) => {
        exam.questions.push(q);
        setShowQuestionForm(false);
    }

    return <>
        <Grid container m={2}>
            <Grid item xs={3} p={1}>
                <TextField fullWidth label="Name" name="name" id="name" variant="outlined" margin="dense" value={form.name} onChange={(e) => handleFormChange(e)}/>
                {courseList?.length > 0 &&
                    <Autocomplete
                        margin="dense" id="courses" options={courseList || []}
                        getOptionLabel={(option) => option.name || ""}
                        value={form.course || null}
                        onInputChange={(event, new_value) => handleCourseChange(event, new_value)}
                        isOptionEqualToValue={(option, value) => option._id === value._id}
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
                }
                <TextField fullWidth label="Weightage" name="weightage" id="weightage" variant="outlined" margin="dense" value={exam?.weightage || 0} disabled/>
                <TextField fullWidth label="Version" name="version" id="version" variant="outlined" margin="dense" value={exam?.version || 0} disabled/>
                <div style={{textAlign: "end", paddingTop: '10px'}} margin="dense">
                    <Button onClick={handleSave} variant="outlined">Save</Button>&nbsp;&nbsp;
                    {exam?._id && <>
                        <Button onClick={handlePublish} variant="outlined">Publish</Button>&nbsp;&nbsp;
                    </>}
                    <Button onClick={handleClose} variant="outlined">Cancel</Button>
                </div>
            </Grid>
            
            <Grid item xs={9} p={1}>
                {exam?.questions?.map((question, index) => {
                    return <QuestionForm key={`question_${index}_${exam._id}_${question._id}`} exam={exam} question={question} index={index}></QuestionForm>
                })}
                {showQuestionForm && <QuestionForm exam={exam} index={exam?.questions?.length || 0} postQuestionSave={(q) => postQuestionSave(q)}></QuestionForm>}
                <Button onClick={() => handleAddQuestion()}>Add Question</Button>
            </Grid>
        </Grid>
    </>
}


export default ExamForm;