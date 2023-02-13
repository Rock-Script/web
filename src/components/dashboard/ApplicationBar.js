import { useNavigate } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Avatar, Grid, Menu, MenuItem } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import StringUtils from '../../utils/StringUtils';
import { useState } from 'react';
import { clearUser } from'../../slices/AuthSlice';

function ApplicationBar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);
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
          <Grid container   justifyContent="space-between">
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
                        <MenuItem onClick={handleClose}>Profile</MenuItem>
                        <MenuItem onClick={handleClose}>My account</MenuItem>
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </Menu>
                </Typography>
            </Grid>
          </Grid>
        </Toolbar>
    </AppBar>
}


export default ApplicationBar;