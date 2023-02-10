import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addExamLog, getExamLog, postExam } from "../../slices/ExamLogSlice";
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

    return <>
        {/* {JSON.stringify(exam_log)} */}
        {/* <h1>ExamLogForm - {params.exam_id}</h1> */}
        {exam_log?.questions?.map((question, index) => {
            return <LogQuestionForm key={`question_${index}_${exam_log._id}_${question._id}`} exam_log={exam_log} question={question} index={index}></LogQuestionForm>
        })}
    </>
}


export default ExamLogForm;