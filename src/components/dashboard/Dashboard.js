
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import ApplicationTabs from '../../constants/ApplicationTabs';
import { Outlet, useNavigate } from 'react-router';
import { useState } from 'react';
import { Button, Grid, Typography } from '@mui/material';
import ApplicationBar from './ApplicationBar';
import { useDispatch, useSelector } from 'react-redux';
import Login from '../auth/login/Login';
import { Box } from '@mui/system';
import { resendVerificationEmail } from '../../slices/AuthSlice';

  
function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
}

function Dashboard() {
    const navigate = useNavigate();
    const dispatch = useDispatch(); 
    const [value, setValue] = useState(0);
    const user = useSelector(state => state.auth.user);
    
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
                {user && <Outlet />}
            </Grid>
        </Grid>
    </>
}

export default Dashboard;