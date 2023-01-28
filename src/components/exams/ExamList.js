import { useDispatch, useSelector } from "react-redux";
import AppTable from "../common/AppTable";
import { getExams } from '../../slices/ExamSlice';
import { useEffect } from "react";
import { Button, Typography } from "@mui/material";
import { show } from "../../slices/DialogSlice";
import ExamForm from "./ExamForm";
import { useNavigate } from "react-router-dom";

function getColumns(handleEditExam) {
    return [
        { label: 'Name', field: 'name', type: 'string' },
        { label: 'Actions', field: 'actions', type: 'string', render: (row) => {
            return <Button mt={2} onClick={() => handleEditExam(row)}>Edit</Button>
        } },
    ]
}

function ExamList() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const examList = useSelector(state => state.exam.list);

    useEffect(() => {
        console.log('exam useeffect')
        dispatch(getExams());
    }, [dispatch]);

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