import { Avatar, Box, Button, Card, CardHeader, Grid, IconButton, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getCourse } from "../../slices/CourseSlice";
import EditIcon from '@mui/icons-material/Edit';
import CourseForm from './CourseForm';
import { show } from "../../slices/DialogSlice";
import StringUtils from "../../utils/StringUtils";
import ExamForm from "../exams/ExamForm";

function CourseDetails({course_id}) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();

    const course = useSelector(state => state.course.course);

    useEffect(() => {
        console.log('Course details use effects', params);
        if (params.course_id) dispatch(getCourse(params.course_id));
    }, [params])

    const handleEdit = () => {
        dispatch(show({
            content: <CourseForm course={course}></CourseForm>,
            title: 'Update course'
        }))
    }

    const handleAddExam = () => {
        navigate('/dashboard/exams/new');
    }

    return <>
        <Card sx={{ minWidth: 345 }}>
            <CardHeader
                style={{width: 'auto'}}
                avatar={<Avatar>{StringUtils.getInitials(course?.name)}</Avatar>}
                title={course?.name}
                subheader={course?.parent?.name}
                action={
                    <Box>
                        <IconButton aria-label="edit_course" onClick={() => handleEdit()}>
                            <EditIcon/>
                        </IconButton>
                        <Button onClick={() => handleAddExam()}>Add Exam</Button>
                    </Box>
                  }
            ></CardHeader>
        </Card>
    </>
}


export default CourseDetails;