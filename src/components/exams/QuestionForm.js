import { Box, Button, FormControl, IconButton, InputAdornment, InputLabel, MenuItem, Paper, Select, Stack, TextField, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addQuestion, deleteQuestion, updateQuestion } from "../../slices/QuestionSlice";
import QuestionTypes, { QuestionTypeValues } from "../../constants/QuestionTypes";


function QuestionForm({exam, question, index}) {
    const dispatch = useDispatch();

    const [form, setForm] = useState({
        _id: question?._id || null,
        name: question?.name || "",
        type: question?.type || "",
        options: question?.options || []
    });

    const handleFormChange = (e) => {
        const form_values = {...form}
        let options = [];
        if (e.target.value === QuestionTypeValues.SINGLE_SELECT 
            || e.target.value === QuestionTypeValues.MULTI_SELECT) {
                options = ["", ""];
        };
        setForm({
            ...form_values,
            [e.target.name]: e.target.value,
            options
        })
    }

    const handleQuestionTypeChange = (e) => {
        handleFormChange(e);
    }

    const handleSaveQuestion = () => {
        if (form?._id) {
            dispatch(updateQuestion({
                _id: form._id,
                ...form,
                exam_id: exam?._id
            })).then((action) => {
                setForm(action.payload);
            })
        } else {
            dispatch(addQuestion({
                ...form,
                exam_id: exam?._id
            })).then((action) => {
                setForm(action.payload);
            })
        }
    }

    const handleAddOption = () => {
        const form_values = {...form}
        setForm({
            ...form_values,
            options: [...(form_values.options || []), ""]
        })
    }

    const handleOptionChange = (e, index) => {
        let {options} = form;
        const new_options = [...options]
        new_options[index] = e.target.value;
        setForm({
            ...form,
            options: new_options
        })
    }

    const handleDeleteOption = (index) => {
        let {options} = form;
        const new_options = [...options]
        new_options.splice(index, 1);
        setForm({
            ...form,
            options: new_options
        })
    }

    const handleDeleteQuestion = (question) => {
        dispatch(deleteQuestion({
            ...question,
            exam_id: exam._id
        }));
    }

    return <Box m={2} p={1}>
        {/* {JSON.stringify(form)} */}
        <TextField fullWidth label="Statement" name="name" id="name" 
            variant="outlined" margin="dense" value={form.name} onChange={(e) => handleFormChange(e)}
            InputProps={{
                startAdornment:(
                    <InputAdornment position="start">
                        <Box sx={{ bgcolor: 'info.main', color: 'info.contrastText' }} p={1}>{index+1}</Box>
                  </InputAdornment>  
                )
            }}
        />
        
        <Box mt={2} sx={{display: 'flex', alignItems: 'flex-start'}}>
            <FormControl>
                <InputLabel id="demo-simple-select-label">Question Type</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    autoWidth
                    sx={{minWidth: '150px'}}
                    label="Question Type"
                    value={form?.type}
                    onChange={(e) => handleQuestionTypeChange(e)}
                    name="type"
                >
                    {QuestionTypes.map(question_type => {
                        return <MenuItem key={question_type} value={question_type.value}>{question_type.label}</MenuItem>
                    })}
                </Select>
            </FormControl>
        </Box>

        {(form?.type === QuestionTypeValues.SINGLE_SELECT
            || form?.type === QuestionTypeValues.MULTI_SELECT) && 
            <Stack mt={2} spacing={2} sx={{display: 'row', alignItems: 'flex-start'}}>
                {form?.options?.map((option, index) => {
                    return <TextField placeholder={`Option ${index+1}`} label={`Option ${index+1}`} 
                        value={option} mt={1} onChange={e => handleOptionChange(e, index)}
                        InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton aria-label="save" onClick={() => handleDeleteOption(index)}>
                                    <DeleteIcon sx={{ color: "warning.main"}}/>
                                </IconButton>
                              </InputAdornment>
                            )
                        }}
                        ></TextField>
                })}
                <Button variant="text" onClick={() => handleAddOption()}>Add option</Button>
            </Stack >
        }

        <Box mt={2}  sx={{ display: 'flex', flexDirection: 'row-reverse', p: 1, m: 1, bgcolor: 'background.paper' }}>
            <Button variant="contained" size="small" onClick={() => handleDeleteQuestion(question)} sx={{ml: 1}}>Delete question</Button>
            <Button variant="contained" size="small" onClick={() => handleSaveQuestion()}>Save question</Button>
        </Box>
    </Box>
}

export default QuestionForm;