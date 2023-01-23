import { Grid, Stack, Paper } from "@mui/material";
import { styled } from '@mui/material/styles';

import CourseDetails from "../courses/CourseDetails";
import Courses from "../courses/Courses";

function Exams() {

    return <>
        <Grid container>
            <Grid xs={3}>
                <Courses></Courses>
            </Grid>
            <Grid xs={9}>
                <CourseDetails></CourseDetails>
                <h1>Exams</h1>
            </Grid>
        </Grid>
    </>
}


export default Exams;