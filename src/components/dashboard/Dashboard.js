
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import ApplicationTabs from '../../constants/ApplicationTabs';
import { Outlet, useNavigate } from 'react-router';
import { useState } from 'react';
import { Grid } from '@mui/material';
import ApplicationBar from './ApplicationBar';

  
function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
}

function Dashboard() {
    const navigate = useNavigate();
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    

    const handleTabClick = (e, tab, index) => {
        setValue(index);
        setTimeout(() => navigate('/dashboard' + tab.url), 0);
    }
    return <>
        <ApplicationBar></ApplicationBar>
        <Grid container>
            <Grid item xs={1}>
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
                        return <Tab {...a11yProps(index)} icon={tab.icon} key={`app_tab_${index}`} value={index} id={index} label={tab.label} onClick={(e) => handleTabClick(e, tab, index)} />
                    })
                }
                </Tabs>
            </Grid>
            <Grid item xs={11}>
                <Outlet />
            </Grid>
        </Grid>
    </>
}

export default Dashboard;