import { useDispatch, useSelector } from "react-redux";
import AppTable from "../common/AppTable";
import { getMembers } from '../../slices/MemberSlice';
import { useEffect } from "react";

const columns = [
    { label: 'First Name', field: 'first_name', type: 'string', render: () => {} },
    { label: 'Last Name', field: 'last_name', type: 'string', render: () => {} },
    { label: 'Email', field: 'email', type: 'string', render: () => {} },
    { label: 'Phone', field: 'phone', type: 'string', render: () => {} },
]

function MemberList() {
    const dispatch = useDispatch();
    const memberList = useSelector(state => state.member.list);

    useEffect(() => {
        console.log('members useeffect')
        dispatch(getMembers());
    }, [])

    return <>
        <AppTable columns={columns} data={memberList}></AppTable>
    </>
}

export default MemberList;