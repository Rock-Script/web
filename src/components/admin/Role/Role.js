import { Button } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { show } from "../../../slices/DialogSlice";
import { getAllPrivileges } from "../../../slices/RoleSlice";
import RoleForm from "./RoleForm";
import RoleList from "./RoleList";

function Role() {
    const dispatch = useDispatch();
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
        <Box align="right" m={1}>
            <Button onClick={() => handleAddRole()}>Add role</Button>
        </Box>
        <Box m={1}>
            <RoleList></RoleList>
        </Box>
    </>
}

export default Role;