import { useDispatch, useSelector } from "react-redux";
import AppTable from "../common/AppTable";
import { getExams } from '../../slices/ExamSlice';
import { useEffect } from "react";
import { Typography } from "@mui/material";

const columns = [
    { label: 'Name', field: 'name', type: 'string', render: () => {} }
]

function ExamList() {
    const dispatch = useDispatch();
    const examList = useSelector(state => state.exam.list);

    useEffect(() => {
        console.log('exam useeffect')
        dispatch(getExams());
    }, [])

    if (!examList || examList?.length === 0) {
        return <Typography variant="h6">No exam added</Typography>
    }

    return <>
        {examList?.length > 0 && 
            <AppTable columns={columns} data={examList}></AppTable>
        }
    </>
}

export default ExamList;