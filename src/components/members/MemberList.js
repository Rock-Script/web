import { useDispatch, useSelector } from "react-redux";
import AppTable from "../common/AppTable";
import { getMembers } from '../../slices/MemberSlice';
import { useEffect } from "react";
import { TableCell } from "@mui/material";

const columns = [
    { label: 'First Name', field: 'first_name', type: 'string' },
    { label: 'Last Name', field: 'last_name', type: 'string' },
    { label: 'Courses', field: 'courses', type: 'string',
        render: (row) => {
            return <TableCell>
                {row.courses.map(c => c.name).join(", ")}
            </TableCell>
        }
    },
    { label: 'Email', field: 'email', type: 'string' },
    { label: 'Phone', field: 'phone', type: 'string' },
]

function MemberList() {
    const dispatch = useDispatch();
    const memberList = useSelector(state => state.member.list);

    useEffect(() => {
        dispatch(getMembers());
    }, [dispatch])

    return <>
        <AppTable columns={columns} data={memberList}></AppTable>
    </>
}

export default MemberList;