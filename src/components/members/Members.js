import { Button, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useDispatch } from 'react-redux';
import { show } from '../../slices/DialogSlice';
import MemberForm from './MemberForm';
import MemberList from './MemberList';

function Members() {
    const dispatch = useDispatch();

    const handleAdd = () => {
        dispatch(show({
            content: <MemberForm></MemberForm>,
            title: 'Add new member'
        }))
    }
    return <>
        <Box sx={{ p: 2 }} >
            <Grid container>
                <Grid xs={6}>
                    <Typography align="center" variant="h6" component="h6">
                        Members
                    </Typography>
                </Grid>
                <Grid xs={6}>
                    <Box display="flex" justifyContent="flex-end">
                        <Button align="right" variant="outlined" onClick={() => handleAdd()}>Add</Button>
                    </Box>
                </Grid>
            </Grid>
        </Box>
        <MemberList></MemberList>
    </>
}


export default Members;