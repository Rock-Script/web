import { Box, Button, Checkbox, FormControl, FormControlLabel, FormLabel, Grid, IconButton, InputAdornment, InputLabel, MenuItem, Paper, Radio, RadioGroup, Select, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateQuestion } from "../../slices/QuestionSlice";
import { QuestionTypeValues } from "../../constants/QuestionTypes";
import { isArray } from 'lodash';
import { saveAnswer } from "../../slices/ExamLogSlice";


function LogQuestionForm({exam_log, question, index}) {
    const dispatch = useDispatch();

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
            <Grid item>
                <Typography variant="subtitle1" align="left" pl={1} mt={0.5}>
                    {question?.name}
                </Typography>
            </Grid>
        </Grid>
        
        <Box mt={2}  sx={{ display: 'flex', flexDirection: 'row', p: 1, m: 1, bgcolor: 'background.paper' }}>
            {(form.type === QuestionTypeValues.TEXT) &&
                <TextField fullWidth label="Text answer" name="answer" id="answer" type="text"
                    variant="outlined" margin="dense" value={form.user_answer} onChange={(e) => handleFormChange(e)}
                />
            }
            {(form.type === QuestionTypeValues.NUMBER) &&
                <TextField fullWidth label="Numeric answer" name="answer" id="answer" type="number"
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

        <Box mt={2}  sx={{ display: 'flex', flexDirection: 'row', p: 1, m: 1, bgcolor: 'background.paper' }}>
            <Button variant="contained" size="small" onClick={() => handleSaveAnswer()}>Save answer</Button>
        </Box>
    </Box>
}

export default LogQuestionForm;