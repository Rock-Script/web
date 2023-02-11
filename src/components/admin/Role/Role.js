import { Button } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { show } from "../../../slices/DialogSlice";
import { getAllPrivileges } from "../../../slices/RoleSlice";
import RoleForm from "./RoleForm";

function Role() {
    const dispatch = useDispatch();
    const privileges = useSelector(state => state.role.previleges_list);
    useEffect(() => {
        dispatch(getAllPrivileges());
    }, []);

    const handleAddRole = () => {
        dispatch(show({
            title: "Add role",
            content: <RoleForm></RoleForm>
        }))
    }

    return <>
        Roles {privileges?.length}
        <Box align="right">
            <Button onClick={() => handleAddRole()}>Add role</Button>
        </Box>
    </>
}

export default Role;