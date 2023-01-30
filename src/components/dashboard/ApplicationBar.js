import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';

function ApplicationBar() {

    return <AppBar position="static">
        <Toolbar>
          <Grid container>
            <Grid item xs={6}>
                <Typography align="left">
                    QuestAns
                </Typography>
            </Grid>
            <Grid item xs={6}>
                <Typography align="right">
                    User
                </Typography>
            </Grid>
          </Grid>
        </Toolbar>
    </AppBar>
}


export default ApplicationBar;