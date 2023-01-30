import { useDispatch, useSelector } from "react-redux";
import AppTable from "../common/AppTable";
import { getExams } from '../../slices/ExamSlice';
import { useEffect } from "react";
import { Button, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

function getColumns(handleEditExam) {
    return [
        { label: 'Name', field: 'name', type: 'string' },
        { label: 'Actions', field: 'actions', type: 'string', render: (row) => {
            return <Button key={`edit_${row._id}`} mt={2} onClick={() => handleEditExam(row)}>Edit</Button>
        } },
    ]
}

function ExamList() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const examList = useSelector(state => state.exam.list);

    useEffect(() => {
        console.log("params ===> ", params);
        const payload = {};
        if (params.course_id) payload.course_ids = [ params.course_id ];
        dispatch(getExams(payload));
    }, [dispatch, params]);

    const handleEditExam = (exam) => {
        navigate('/dashboard/exams/' + exam._id);
    }

    if (!examList || examList?.length === 0) {
        return <Typography variant="h6">No exam added</Typography>
    }

    return <>
        {examList?.length > 0 && 
            <AppTable columns={getColumns(handleEditExam)} data={examList}></AppTable>
        }
    </>
}

export default ExamList;