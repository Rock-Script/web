import { Button, Checkbox, FormControl, FormControlLabel, FormLabel, Grid, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hide } from "../../../slices/DialogSlice";
import { addRole } from "../../../slices/RoleSlice";


function RoleForm() {
    const dispatch = useDispatch();
    const privileges = useSelector(state => state.role.previleges_list);
    const [form, setForm] = useState({
        name: "",
        previleges: []
    });

    const handleFormChange = (e) => {
        const form_values = {...form};

        const new_form = {
            ...form_values,
            [e.target.name]: e.target.value
        };
        
        if (e.target.name === "previleges") {
            if (form_values.previleges.indexOf(e.target.value) > -1) {
                form_values.previleges.splice(form_values.previleges.indexOf(e.target.value), 1);
            } else {
                form_values.previleges.push(e.target.value);
            }
            new_form[e.target.name] = form_values.previleges;
        }
        
        setForm(new_form)
    }

    const handleClose = () => {
        dispatch(hide());
    }


    const handleSave = () => {
        dispatch(addRole(form));
    }

    return <Box>
        {/* {JSON.stringify(form)} */}
        <TextField fullWidth label="Role name" name="name" id="name" 
            variant="outlined" margin="dense" value={form.name} onChange={(e) => handleFormChange(e)}
        />

        <FormControl>
            <Grid container>
            {privileges?.map((privilege, index) => {
                let checked = form.previleges.indexOf(privilege._id) > -1;
                return <Grid item xs={3}> 
                    <FormControlLabel key={privilege._id} checked={checked} name="previleges" value={privilege._id} control={<Checkbox />} label={privilege.name} 
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