import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addExamLog, postExam } from "../../slices/ExamLogSlice";
import LogQuestionForm from "./LogQuestionForm";


function ExamLogForm() {
    const params = useParams();
    const dispatch = useDispatch();
    const exam = useSelector(state => state.exam.exam);

    useEffect(() => {
        if (params.exam_id && !params.exam_log_id) {
            dispatch(addExamLog({exam_id: params.exam_id}));
        }
    }, [params])

    return <>
        {JSON.stringify(exam)}
        <h1>ExamLogForm - {params.exam_id}</h1>
        {exam?.published_questions?.map((question, index) => {
            return <LogQuestionForm key={`question_${index}_${exam._id}_${question._id}`} exam={exam} question={question} index={index}></LogQuestionForm>
        })}
    </>
}


export default ExamLogForm;