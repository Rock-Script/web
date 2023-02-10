import { Box, Button, Checkbox, FormControl, FormControlLabel, FormLabel, Grid, IconButton, InputAdornment, InputLabel, MenuItem, Paper, Radio, RadioGroup, Select, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateQuestion } from "../../slices/QuestionSlice";
import { QuestionTypeValues } from "../../constants/QuestionTypes";
import { isArray } from 'lodash';


function LogQuestionForm({exam, question, index}) {
    const dispatch = useDispatch();

    const [form, setForm] = useState({
        _id: question?._id || null,
        name: question?.name || "",
        type: question?.type || "",
        options: question?.options || [],
        answer: question?.answer || null
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
            answer: new_answer,
            options
        })
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
        
        <Grid item xs={6} mt={1}>
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
        </Grid>

        <Box mt={2}  sx={{ display: 'flex', flexDirection: 'row-reverse', p: 1, m: 1, bgcolor: 'background.paper' }}>
            <Button variant="contained" size="small" onClick={() => handleSaveQuestion()}>Save question</Button>
        </Box>
    </Box>
}

export default LogQuestionForm;