import { Button, Checkbox, FormControl, FormControlLabel, FormLabel, Grid, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hide } from "../../../slices/DialogSlice";
import { addRole, updateRole } from "../../../slices/RoleSlice";


function RoleForm({role}) {
    const dispatch = useDispatch();
    const privileges = useSelector(state => state.role.privilege_list);
    const [form, setForm] = useState({
        name: role?.name || "",
        privileges: role?.privileges || []
    });

    const handleFormChange = (e) => {
        const form_values = {...form};

        const new_form = {
            ...form_values,
            [e.target.name]: e.target.value
        };
        
        if (e.target.name === "privileges") {
            const new_privileges = [ ...(form_values.privileges || []) ];
            if (new_privileges.indexOf(e.target.value) > -1) {
                new_privileges.splice(new_privileges.indexOf(e.target.value), 1);
            } else {
                new_privileges.push(e.target.value);
            }
            new_form[e.target.name] = new_privileges;
        }
        
        setForm(new_form)
    }

    const handleClose = () => {
        dispatch(hide());
    }


    const handleSave = () => {
        if (role?._id) {
            dispatch(updateRole({
                role_id: role?._id,
                ...form
            }))
        } else {
            dispatch(addRole(form));
        }
    }

    return <Box>
        {/* {JSON.stringify(form)} */}
        <TextField fullWidth label="Role name" name="name" id="name" 
            variant="outlined" margin="dense" value={form.name} onChange={(e) => handleFormChange(e)}
        />

        <FormControl>
            <Grid container>
            {privileges?.map((privilege, index) => {
                let checked = form.privileges.indexOf(privilege._id) > -1;
                return <Grid item xs={3}> 
                    <FormControlLabel key={privilege._id} checked={checked} name="privileges" value={privilege._id} control={<Checkbox />} label={privilege.name} 
                        onChange={e => handleFormChange(e)}
                    />
                </Grid>
            })}
            </Grid>
        </FormControl>
        <div style={{textAlign: "end", paddingTop: '10px'}} margin="dense">
            <Button onClick={handleSave} variant="outlined">Save</Button>&nbsp;&nbsp;
            <Button onClick={handleClose} variant="outlined">Cancel</Button>
        </div>
    </Box>
}

export default RoleForm;