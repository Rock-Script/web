import { Button, Container, TextField } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { hide } from "../../slices/DialogSlice";
import { addMember, updateMember } from "../../slices/MemberSlice";


function MemberForm({employee: member}) {
    const dispatch = useDispatch();
    const [form, setForm] = useState({
        first_name: member?.first_name || "",
        last_name: member?.last_name || "",
        address: member?.address || "",
        phone: member?.phone || ""
    })
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

    return <Container>
        <TextField fullWidth label="First Name" name="first_name" id="first_name" variant="outlined" margin="dense" value={form.first_name} onChange={(e) => handleFormChange(e)}/>
        <TextField fullWidth label="Last Name"  name="last_name" id="last_name" variant="outlined" margin="dense" value={form.last_name}  onChange={(e) => handleFormChange(e)}/>
        <TextField fullWidth label="Address"  name="address" id="address" variant="outlined" margin="dense" value={form.address}  onChange={(e) => handleFormChange(e)}/>
        <TextField fullWidth label="Phone"  name="phone" id="phone" variant="outlined" margin="dense" value={form.phone}  onChange={(e) => handleFormChange(e)}/>
        <TextField fullWidth label="Email"  name="email" id="email" variant="outlined" margin="dense" value={form.email}  onChange={(e) => handleFormChange(e)}/>
        <div style={{textAlign: "end", paddingTop: '10px'}} margin="dense">
            <Button onClick={handleSave} variant="outlined">Save</Button>&nbsp;&nbsp;
            <Button onClick={handleClose} variant="outlined">Cancel</Button>
        </div>
        
    </Container>
}


export default MemberForm;