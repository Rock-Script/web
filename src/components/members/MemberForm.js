import { Autocomplete, Box, Button, Container, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCoursesList } from "../../slices/CourseSlice";
import { hide } from "../../slices/DialogSlice";
import { addMember, updateMember } from "../../slices/MemberSlice";
import { getAllRoles } from "../../slices/RoleSlice";


function MemberForm({member}) {
    const dispatch = useDispatch();
    const [form, setForm] = useState({
        first_name: member?.first_name || "",
        last_name: member?.last_name || "",
        address: member?.address || "",
        phone: member?.phone || "",
        role: member?.role || {},
        email: member?.email || ""
    })
    const roleList = useSelector(state => state.role.role_list);

    useEffect(() => {
        dispatch(getAllRoles());
    }, [dispatch])

    const handleClose = () => {
        dispatch(hide());
    }

    const handleSave = () => {
        if (member?._id) {
            dispatch(updateMember({
                ...form,
                _id: member._id
            }));
        } else {
            dispatch(addMember(form));
        }
        dispatch(hide());
    }

    const handleFormChange = (e) => {
        const form_values = {...form}
        setForm({
            ...form_values,
            [e.target.name]: e.target.value
        })
    }

    const handleRoleChange = (event, value) => {
        const form_values = {...form}
        const role = value;
        setTimeout(() => {
            setForm({
                ...form_values,
                role_id: role._id,
                role: role
            })
        }, 10);
    }

    return <Container>
        <TextField fullWidth label="First Name" name="first_name" id="first_name" variant="outlined" margin="dense" value={form.first_name} onChange={(e) => handleFormChange(e)}/>
        <TextField fullWidth label="Last Name"  name="last_name" id="last_name" variant="outlined" margin="dense" value={form.last_name}  onChange={(e) => handleFormChange(e)}/>
        <TextField fullWidth label="Address"  name="address" id="address" variant="outlined" margin="dense" value={form.address}  onChange={(e) => handleFormChange(e)}/>
        <TextField fullWidth label="Phone"  name="phone" id="phone" variant="outlined" margin="dense" value={form.phone}  onChange={(e) => handleFormChange(e)}/>
        <TextField fullWidth label="Email"  name="email" id="email" variant="outlined" margin="dense" value={form.email}  onChange={(e) => handleFormChange(e)}/>
        {roleList?.length > 0 &&
            <Autocomplete
                margin="dense" id="roles" options={roleList || []}
                getOptionLabel={(option) => option.name || ""}
                value={form.role || []}
                onChange={(event, new_value) => handleRoleChange(event, new_value)}
                isOptionEqualToValue={(option, value) => option._id === value._id}
                renderInput={(params) => (
                    <TextField
                    {...params}
                    margin="dense"
                    label="Select role"
                    inputProps={{
                        ...params.inputProps
                    }}
                    />
                )}
                renderOption={(props, option) => (
                    <Box id={option._id}  component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                        {option.name}
                    </Box>
                )}
            ></Autocomplete>
        }
        <div style={{textAlign: "end", paddingTop: '10px'}} margin="dense">
            <Button onClick={handleSave} variant="outlined">Save</Button>&nbsp;&nbsp;
            <Button onClick={handleClose} variant="outlined">Cancel</Button>
        </div>
        
    </Container>
}


export default MemberForm;