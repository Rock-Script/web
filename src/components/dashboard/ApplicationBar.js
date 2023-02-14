import { useNavigate } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Avatar, Box, Divider, Grid, Menu, MenuItem, Stack } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import StringUtils from '../../utils/StringUtils';
import { useState } from 'react';
import { clearUser } from'../../slices/AuthSlice';

function ApplicationBar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);
    const member = useSelector(state => state.auth.member);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    const handleLogout = () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        dispatch(clearUser());
        navigate('/login');
        handleClose();
    }

    return <AppBar position="static">
        <Toolbar>
          <Grid container justifyContent="space-between">
            <Grid item>
                <Typography align="left">
                    QuestAns
                </Typography>
            </Grid>
            <Grid item>
                <Typography align="right">
                    <Avatar sx={{bgcolor: "info.dark"}} onClick={handleClick}>
                        {StringUtils.getInitials(user.first_name)}{StringUtils.getInitials(user.last_name)}
                    </Avatar>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button'
                        }}
                    >
                        <Stack spacing={1} mb={2}>
                            <Box pl={1} pr={1}>
                                {StringUtils.capitalize(user.first_name)} {StringUtils.capitalize(user.last_name)}
                            </Box>
                            <Box pl={1} pr={1}>
                                {user.email}
                            </Box>
                            <Box pl={1} pr={1}>
                                {member?.role?.name}
                            </Box>
                        </Stack>
                        <Divider></Divider>
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </Menu>
                </Typography>
            </Grid>
          </Grid>
        </Toolbar>
    </AppBar>
}


export default ApplicationBar;