import { Grid, Stack, Paper } from "@mui/material";
import { styled } from '@mui/material/styles';
import { Box } from "@mui/system";

import CourseDetails from "../courses/CourseDetails";
import Courses from "../courses/Courses";
import ExamList from "./ExamList";

function Exams() {

    return <>
        <Grid container>
            <Grid item xs={3}>
                <Courses></Courses>
            </Grid>
            <Grid item xs={9}>
                <CourseDetails></CourseDetails>
                <Box mt={2}>
                    <ExamList></ExamList>
                </Box>
            </Grid>
        </Grid>
    </>
}


export default Exams;