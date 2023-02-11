import { useDispatch, useSelector } from "react-redux";
import AppTable from "../common/AppTable";
import { getExams } from '../../slices/ExamSlice';
import { addExamLog } from '../../slices/ExamLogSlice';
import { useEffect } from "react";
import { Button, TableCell, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { show } from "../../slices/DialogSlice";
import ExamLogList from "../exam-logs/ExamLogList";

function getColumns(handleEditExam, handleSolveExam, handleLogExam) {
    return [
        { label: 'Name', field: 'name', type: 'string' },
        { label: 'Actions', field: 'actions', type: 'string', render: (row) => {
            return <TableCell>
                <Button key={`edit_${row._id}`} mt={2} onClick={() => handleEditExam(row)}>Edit</Button>
                <Button key={`edit_${row._id}`} mt={2} onClick={() => handleSolveExam(row)}>Solve</Button>
                <Button key={`edit_${row._id}`} mt={2} onClick={() => handleLogExam(row)}>Logs</Button>
            </TableCell>
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

    const handleSolveExam = (exam) => {
        dispatch(addExamLog({ exam_id: exam._id})).then((data) => {
            navigate('/dashboard/exam-log/' + data.payload._id);
        });    
    }

    const handleLogExam = (exam) => {
        dispatch(show({
            content: <ExamLogList></ExamLogList>,
            title: 'Exam logs'
        }))
    }


    if (!examList || examList?.length === 0) {
        return <Typography variant="h6">No exam added</Typography>
    }

    return <>
        {examList?.length > 0 && 
            <AppTable columns={getColumns(handleEditExam, handleSolveExam, handleLogExam)} data={examList}></AppTable>
        }
    </>
}

export default ExamList;