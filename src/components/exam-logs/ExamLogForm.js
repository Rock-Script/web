import { Button } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import EXAM_LOG_STATUS from "../../constants/ExamLogStatus";
import { addExamLog, getExamLog, submitExamLog } from "../../slices/ExamLogSlice";
import LogQuestionForm from "./LogQuestionForm";


function ExamLogForm() {
    const params = useParams();
    const dispatch = useDispatch();
    const exam_log = useSelector(state => state.exam_log.exam_log);

    useEffect(() => {
        if (params.exam_id && !params.exam_log_id) {
            dispatch(addExamLog({exam_id: params.exam_id}));
        } else if (params.exam_log_id) {
            dispatch(getExamLog({exam_log_id: params.exam_log_id}));
        }
    }, [params])

    const handleSubmit = () => {
        dispatch(submitExamLog({exam_log_id: params.exam_log_id}));
    }

    return <>
        {/* {JSON.stringify(exam_log?.status)} */}
        {/* <h1>ExamLogForm - {params.exam_id}</h1> */}
        {exam_log?.questions?.map((question, index) => {
            return <LogQuestionForm key={`question_${index}_${exam_log._id}_${question._id}`} exam_log={exam_log} question={question} index={index}></LogQuestionForm>
        })}
        <Box m={2}>
            {params.exam_log_id && exam_log?.status !== EXAM_LOG_STATUS.COMPLETED &&
                <Button sx={{width: '100%'}} variant="contained" onClick={() => handleSubmit()}>Submit</Button>
            }
        </Box>
    </>
}


export default ExamLogForm;