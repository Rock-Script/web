
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import ApplicationTabs from '../../constants/ApplicationTabs';
import { Outlet, useNavigate } from 'react-router';
import { useState } from 'react';
import { Grid } from '@mui/material';
import ApplicationBar from './ApplicationBar';

  
function Dashboard() {
    const navigate = useNavigate();
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    

    const handleTabClick = (tab) => {
        navigate('/dashboard' + tab.url);
    }
    return <>
        <ApplicationBar></ApplicationBar>
        <Grid container>
            <Grid xs={1}>
                <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    aria-label="Vertical tabs example"
                    value={value}
                    onChange={handleChange}
                    sx={{ borderRight: 1, borderColor: 'divider' }}
                >
                {
                    ApplicationTabs.map((tab, index) => {
                        return <Tab icon={tab.icon} key={index} id={index} label={tab.label} onClick={() => handleTabClick(tab)} />
                    })
                }
                </Tabs>
            </Grid>
            <Grid xs={11}>
                <Outlet />
            </Grid>
        </Grid>
    </>
}

export default Dashboard;