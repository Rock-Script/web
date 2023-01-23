import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import AppTree from "../common/AppTree";
import { getCourses } from "../../slices/CourseSlice";
import { useNavigate } from "react-router-dom";

function CourseTree() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const courseList = useSelector(state => state.course.list);

    useEffect(() => {
        dispatch(getCourses({ is_tree_view: true }));
    }, [])

    const handleItemClick = (_id) => {
        navigate('/dashboard/exams/course/' + _id)
    }
    return <>
        <AppTree data={courseList} handleItemClick={handleItemClick}></AppTree>
    </>
}

export default CourseTree;