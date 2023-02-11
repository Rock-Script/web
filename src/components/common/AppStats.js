import { Grid, Typography } from "@mui/material";


function AppStats({label, value}) {

    return <Grid container>
        <Grid item>
            <Typography variant="subtitle2">
                <b>{label}: </b>
            </Typography>
        </Grid>
        <Grid item ml={1}>
            <Typography variant="subtitle2">
                {value}
            </Typography>
        </Grid>
    </Grid>;
}

export default AppStats;