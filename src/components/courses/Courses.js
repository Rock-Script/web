import { Button, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useDispatch } from 'react-redux';
import { show } from '../../slices/DialogSlice';
import CourseForm from './CourseForm';
import CourseTree from './CourseTree';

function Courses() {
    const dispatch = useDispatch();

    const handleAdd = () => {
        dispatch(show({
            content: <CourseForm></CourseForm>,
            title: 'Add new course'
        }))
    }
    
    return <>
        <Box sx={{ p: 2 }} >
            <Grid container>
                <Grid xs={6}>
                    <Typography align="center" variant="h6" component="h6">
                        Courses
                    </Typography>
                </Grid>
                <Grid xs={6}>
                    <Box display="flex" justifyContent="flex-end">
                        <Button align="right" variant="outlined" onClick={() => handleAdd()}>Add</Button>
                    </Box>
                </Grid>
            </Grid>
        </Box>
        <CourseTree></CourseTree>
    </>
}


export default Courses;