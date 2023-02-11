import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppTable from "../common/AppTable";
import { getExamLogs } from "../../slices/ExamLogSlice";
import { TableCell, Typography } from "@mui/material";
import DateUtils from "../../utils/DateUtils";
import StringUtils from "../../utils/StringUtils";
import EXAM_LOG_STATUS from "../../constants/ExamLogStatus";
import { Box } from "@mui/system";
import AppStats from "../common/AppStats";


function getColumns() {
    return [
        { label: 'Started At', field: 'name', type: 'string',
            render: (row) => {
                return <TableCell>
                    {DateUtils.formatDate(row.created_at)}
                </TableCell>
            }
        },
        {
            label: 'Status', field: 'status', type: 'string',
            render: (row) => {
                return <TableCell>
                    {StringUtils.capitalize(row.status || EXAM_LOG_STATUS.IN_PROGRESS)}
                </TableCell>
            }
        },
        { label: 'Submitted At', field: 'submitted_at', type: 'string',
            render: (row) => {
                return <TableCell>
                    {DateUtils.formatDate(row.submitted_at)}
                </TableCell>
            }
        },
        { label: 'Time taken', field: 'time_taken', type: 'string',
            render: (row) => {
                return <TableCell>
                    {DateUtils.formatMilliseconds(row.time_taken)}
                </TableCell>
            }
        },
        { label: 'Mark obtained', field: 'marks_obtained', type: 'string',
            render: (row) => {
                return <TableCell>
                    {row.marks_obtained} / {row.published_weigthage}
                </TableCell>
            }
        },
        { label: 'Stats', field: 'time_taken', type: 'string',
            render: (row) => {
                return <TableCell>
                    {row.status === EXAM_LOG_STATUS.COMPLETED && row.total_questions > 0 && <>
                        <AppStats label="Total questions" value={row.total_questions || ""}></AppStats>
                        <AppStats label="Correct answers" value={row.correct_answers || 0}></AppStats>
                        <AppStats label="Wrong answers" value={row.wrong_answers || ""}></AppStats>
                        <AppStats label="No answers" value={row.no_answers || ""}></AppStats>
                    </>}
                </TableCell>
            }
        },
    ]
}

function ExamLogList() {
    const dispatch = useDispatch();
    const examLogList = useSelector(state => state.exam_log.exam_log_list);

    useEffect(() => {
        dispatch(getExamLogs());
    }, [dispatch])

    return <Box sx={{width: '100%'}}>
        <AppTable columns={getColumns()} data={examLogList}></AppTable>
    </Box>;

}

export default ExamLogList;