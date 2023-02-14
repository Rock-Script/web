import { Button, Checkbox, Grid, TableCell } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllRoles } from "../../../slices/RoleSlice";
import AppTable from "../../common/AppTable";
import CheckCircle from "@mui/icons-material/CheckCircle"
import { show } from "../../../slices/DialogSlice";
import RoleForm from "./RoleForm";

function getColumns(privileges, handleEditRole) {
    return [
        { label: 'Name', field: 'name', type: 'string' },
        { label: 'privileges',
            render: (row) => {
                return <TableCell>
                    <Grid container>
                    {
                        privileges.map(p => {
                            return <Grid item xs={3}>
                                    <Checkbox checked={row.privileges.indexOf(p._id) > -1} disabled></Checkbox>{p.name}
                                </Grid>
                        })
                    }
                    </Grid>
                </TableCell>
            }
        },
        { label: 'Actions', field: 'actions', type: 'string', render: (row) => {
            return <TableCell>
                <Button key={`edit_${row._id}`} mt={2} onClick={() => handleEditRole(row)}>Edit</Button>
            </TableCell>
        } },
    ]
}

function RoleList() {
    const dispatch = useDispatch();
    const roles = useSelector(state => state.role.role_list);
    const privileges = useSelector(state => state.role.privilege_list);

    useEffect(() => {
        dispatch(getAllRoles());
    }, [dispatch]);

    const handleEditRole = (role) => {
        dispatch(show({
            title: 'Edit role',
            content: <RoleForm role={role}></RoleForm>
        }))
    }

    return <>
        {privileges?.length > 0 && 
            <AppTable columns={getColumns(privileges, handleEditRole)} data={roles}></AppTable>
        }
    </>;
}

export default RoleList;