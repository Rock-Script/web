import { useDispatch, useSelector } from "react-redux";
import AppTable from "../common/AppTable";
import { getMembers } from '../../slices/MemberSlice';
import { useEffect } from "react";
import { Button, TableCell } from "@mui/material";
import { show } from "../../slices/DialogSlice";
import MemberForm from "./MemberForm";

function getColumns(handleEdit) {
    return [
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
        { label: 'Actions', field: 'actions', type: 'string', render: (row) => {
            return <TableCell>
                <Button key={`edit_${row._id}`} mt={2} onClick={() => handleEdit(row)}>Edit</Button>
            </TableCell>
        } },
    ]
}

function MemberList() {
    const dispatch = useDispatch();
    const memberList = useSelector(state => state.member.list);

    useEffect(() => {
        dispatch(getMembers());
    }, [dispatch])

    const handleEditMember = (member) => {
        dispatch(show({
            content: <MemberForm member={member}></MemberForm>,
            title: 'Update member'
        }))
    }

    return <>
        <AppTable columns={getColumns(handleEditMember)} data={memberList}></AppTable>
    </>
}

export default MemberList;