import { Box, Tab, Tabs } from "@mui/material";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";


function Admin() {
    const navigate = useNavigate();
    const [value, setValue] = useState(0);

    useEffect(() => {
        tabNavigation(value);
    }, [value]);

    const tabNavigation = (value) => {
        if (value === 0) {
            navigate("/dashboard/admin/role");
        } else {
            navigate("/dashboard/admin");
        }
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
        tabNavigation(newValue);
    };

    return <>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab label="Role" />
                <Tab label="Item Two" />
                <Tab label="Item Three"/>
            </Tabs>
        </Box>
        <Box>
            <Outlet />
        </Box>
    </>;
}


export default Admin;