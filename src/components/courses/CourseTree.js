import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import AppTree from "../common/AppTree";
import { getCoursesTree } from "../../slices/CourseSlice";
import { useNavigate } from "react-router-dom";

function CourseTree() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const courseTree = useSelector(state => state.course.tree);

    useEffect(() => {
        dispatch(getCoursesTree({ is_tree_view: true }));
    }, [])

    const handleItemClick = (_id) => {
        navigate('/dashboard/exams/course/' + _id)
    }
    return <>
        <AppTree data={courseTree} handleItemClick={handleItemClick}></AppTree>
    </>
}

export default CourseTree;