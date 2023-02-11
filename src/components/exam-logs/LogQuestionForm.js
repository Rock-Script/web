import { Box, Button, Checkbox, FormControl, FormControlLabel, FormLabel, Grid, IconButton, InputAdornment, InputLabel, MenuItem, Paper, Radio, RadioGroup, Select, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateQuestion } from "../../slices/QuestionSlice";
import { QuestionTypeValues } from "../../constants/QuestionTypes";
import EXAM_LOG_STATUS from "../../constants/ExamLogStatus";
import { isArray } from 'lodash';
import { saveAnswer } from "../../slices/ExamLogSlice";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Close from '@mui/icons-material/Close';

function LogQuestionForm({exam_log, question, index}) {
    const dispatch = useDispatch();
    const [disabled, setDisable] = useState(exam_log.status === EXAM_LOG_STATUS.COMPLETED)
    const [form, setForm] = useState({
        _id: question?._id || null,
        name: question?.name || "",
        type: question?.type || "",
        options: question?.options || [],
        user_answer: question?.user_answer || null
    });

    const handleFormChange = (e, type) => {
        const form_values = {...form}
        let options = form_values.options || [];
        if (e.target.value === QuestionTypeValues.SINGLE_SELECT 
            || e.target.value === QuestionTypeValues.MULTI_SELECT) {
                options = ["", ""];
        };

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
        setForm({
            ...form_values,
            [e.target.name]: e.target.value,
            user_answer: new_answer,
            options
        })
    }

    const handleSaveAnswer = () => {
        if (form?._id) {
            dispatch(saveAnswer({
                question_id: form._id,
                ...form,
                answer: form.user_answer,
                exam_log_id: exam_log?._id
            })).then((action) => {
                if (action.payload) setForm(action.payload);
            })
        }
    }

    return <Box m={2} p={1}>
        {/* {JSON.stringify(form)} */}
        <Grid container>
            <Grid item>
                <Box sx={{ bgcolor: 'info.main', color: 'info.contrastText', width:'10px' }} p={1}>{index+1}</Box>
            </Grid>
            <Grid item xs={11}>
                <Typography variant="subtitle1" align="left" pl={1} mt={0.5}>
                    {question?.name}
                </Typography>
            </Grid>
            <Grid item>
                <Typography variant="subtitle1" align="right" pl={1} mt={0.5}>
                    {question?.weightage}
                </Typography>
            </Grid>
        </Grid>
        
        <Box mt={2}  sx={{ display: 'flex', flexDirection: 'row', p: 1, m: 1, bgcolor: 'background.paper' }}>
            {(form.type === QuestionTypeValues.TEXT) &&
                <TextField fullWidth label="Text answer" name="answer" id="answer" type="text" disabled={disabled}
                    variant="outlined" margin="dense" value={form.user_answer} onChange={(e) => handleFormChange(e)}
                />
            }
            {(form.type === QuestionTypeValues.NUMBER) &&
                <TextField fullWidth label="Numeric answer" name="answer" id="answer" type="number" disabled={disabled}
                    variant="outlined" margin="dense" value={form.user_answer} onChange={(e) => handleFormChange(e)}
                />
            }
            {(form.type === QuestionTypeValues.SINGLE_SELECT) &&
                <FormControl>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        name="answer"
                        value={form.user_answer}
                        onChange={e => handleFormChange(e)}
                        disabled={disabled}
                    >
                    {form?.options?.map((option, index) => {
                        return <FormControlLabel value={option} control={<Radio disabled={disabled} />} label={option} />
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
                        return <FormControlLabel checked={checked} name="answer" value={option} control={<Checkbox disabled={disabled} />} label={option} 
                            onChange={e => handleFormChange(e, 'checkbox')} disabled={disabled}
                        />
                    })}
                </FormControl>
            }
        </Box>

        <Box mt={2}  sx={{ display: 'flex', flexDirection: 'row', p: 1, m: 1, bgcolor: 'background.paper' }}>
            {!disabled &&<Button variant="contained" size="small" onClick={() => handleSaveAnswer()}>Save answer</Button>}
        </Box>

        {disabled && <>
            {(question.answer === question.user_answer) &&
                <Typography align="left" sx={{color: 'success.main'}}>
                    <CheckCircleOutlineIcon></CheckCircleOutlineIcon> Your answer is correct
                </Typography>
            }
            {(question.answer != question.user_answer) &&
                <Typography align="left" sx={{color: 'error.main'}}>
                    <Close></Close> Your answer is incorrect, correct answer is <b>{question.answer}</b>
                </Typography>
            }
        </>}
    </Box>
}

export default LogQuestionForm;