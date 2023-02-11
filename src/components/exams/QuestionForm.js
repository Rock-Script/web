import { Box, Button, Checkbox, FormControl, FormControlLabel, FormLabel, Grid, IconButton, InputAdornment, InputLabel, MenuItem, Paper, Radio, RadioGroup, Select, Stack, TextField, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addQuestion, deleteQuestion, updateQuestion } from "../../slices/QuestionSlice";
import QuestionTypes, { QuestionTypeValues } from "../../constants/QuestionTypes";
import { isArray } from 'lodash';


function QuestionForm({exam, question, index, postQuestionSave}) {
    const dispatch = useDispatch();

    const [form, setForm] = useState({
        _id: question?._id || null,
        name: question?.name || "",
        type: question?.type || "",
        options: question?.options || [],
        answer: question?.answer || null,
        weightage: question?.weightage || 0
    });

    const handleFormChange = (e, type) => {
        const form_values = {...form}
        let options = form_values.options || [];
        if (e.target.value === QuestionTypeValues.SINGLE_SELECT 
            || e.target.value === QuestionTypeValues.MULTI_SELECT) {
                options = ["", ""];
        };

        const new_form = {
            ...form_values,
            [e.target.name]: e.target.value,
            options
        };
        if (e.target.name === "answer") {
            let new_answer = form_values.answer ? [...form_values.answer] : [];
            if (type === "checkbox") {
                if (e.target.checked) {
                    new_answer.push(e.target.value)
                } else {
                    new_answer.splice(new_answer.indexOf(e.target.value), 1);
                }
            } else {
                new_answer = e.target.value;
            }
            new_form.answer = new_answer;
        }
        setForm(new_form)
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
                postQuestionSave(action.payload)
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
        <Grid container>
            <Grid item xs={10}>
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
            </Grid>
            <Grid item xs={2} pl={1}>
                <TextField fullWidth label="Weightage" name="weightage" id="weightage" type="number"
                    variant="outlined" margin="dense" value={form.weightage} onChange={(e) => handleFormChange(e)}
                />
            </Grid>
        </Grid>
        
        <Grid container>
            <Grid item xs={6}>
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
                            {QuestionTypes.map((question_type, index) => {
                                return <MenuItem key={`question_type_${index}_${exam?._id}_${question?._id}`} 
                                    value={question_type.value}>{question_type.label}</MenuItem>
                            })}
                        </Select>
                    </FormControl>
                </Box>

                {(form?.type === QuestionTypeValues.SINGLE_SELECT
                    || form?.type === QuestionTypeValues.MULTI_SELECT) && 
                    <Stack mt={2} spacing={2} sx={{display: 'row', alignItems: 'flex-start'}}>
                        {form?.options?.map((option, index) => {
                            return <TextField placeholder={`Option ${index+1}`} label={`Option ${index+1}`} 
                                key={`option_${index}_${exam?._id}_${question?._id}`}
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
            </Grid>
            <Grid item xs={6}>
                <Box sx={{ p: 2, border: '1px dashed grey' }} mt={1}>
                    <Typography color="info.main" variant="h6">Answer</Typography>
                    {(form.type === QuestionTypeValues.TEXT) &&
                        <TextField fullWidth label="Text answer" name="answer" id="answer" type="text"
                            variant="outlined" margin="dense" value={form.answer} onChange={(e) => handleFormChange(e)}
                        />
                    }
                    {(form.type === QuestionTypeValues.NUMBER) &&
                        <TextField fullWidth label="Numeric answer" name="answer" id="answer" type="number"
                            variant="outlined" margin="dense" value={form.answer} onChange={(e) => handleFormChange(e)}
                        />
                    }
                    {(form.type === QuestionTypeValues.SINGLE_SELECT) &&
                        <FormControl>
                            <FormLabel id="demo-radio-buttons-group-label">Single select answer</FormLabel>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                name="answer"
                                value={form.answer}
                                onChange={e => handleFormChange(e)}
                            >
                            {form?.options?.map((option, index) => {
                                return <FormControlLabel value={option} control={<Radio />} label={option} />
                            })}
                            </RadioGroup>
                        </FormControl>
                    }
                    {(form.type === QuestionTypeValues.MULTI_SELECT) &&
                        <FormControl>
                            <FormLabel id="demo-radio-buttons-group-label">Multi select answer</FormLabel>
                            {form?.options?.map((option, index) => {
                                let checked = false;
                                if (isArray(form.answer) && (form.answer || []).indexOf(option) > -1) checked = true;
                                return <FormControlLabel checked={checked} name="answer" value={option} control={<Checkbox />} label={option} 
                                    onChange={e => handleFormChange(e, 'checkbox')}
                                />
                            })}
                        </FormControl>
                    }
                </Box>
            </Grid>
        </Grid>

        <Box mt={2}  sx={{ display: 'flex', flexDirection: 'row-reverse', p: 1, m: 1, bgcolor: 'background.paper' }}>
            <Button variant="contained" size="small" onClick={() => handleDeleteQuestion(question)} sx={{ml: 1}}>Delete question</Button>
            <Button variant="contained" size="small" onClick={() => handleSaveQuestion()}>Save question</Button>
        </Box>
    </Box>
}

export default QuestionForm;