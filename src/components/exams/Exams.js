import { Grid, Stack, Paper, Tabs, Tab } from "@mui/material";
import { styled } from '@mui/material/styles';
import { Box } from "@mui/system";
import { useState } from "react";

import CourseDetails from "../courses/CourseDetails";
import Courses from "../courses/Courses";
import ExamList from "./ExamList";
import MemberList from "../members/MemberList";

function Exams() {
    const [value, setValue] = useState(0);

    const handleTabChange = (event, newValue) => {
        setValue(newValue);
    };

    return <>
        <Grid container>
            <Grid item xs={3}>
                <Courses></Courses>
            </Grid>
            <Grid item xs={9}>
                <CourseDetails></CourseDetails>
                <Box mt={2}>
                    <Tabs value={value} onChange={handleTabChange} aria-label="basic tabs example">
                        <Tab label="Exams" value={0}/>
                        <Tab label="Members" value={1}/>
                    </Tabs>
                    <Box>
                        {value === 0 && <ExamList></ExamList>}
                        {value === 1 && <MemberList></MemberList>}
                    </Box>
                </Box>
            </Grid>
        </Grid>
    </>
}


export default Exams;