// material-ui
import { useTheme, styled } from '@mui/material/styles';
import { Avatar, Grid, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Typography } from '@mui/material';

// assets
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import AirlineSeatReclineNormalOutlinedIcon from '@mui/icons-material/AirlineSeatReclineNormalOutlined';
import RvHookupOutlinedIcon from '@mui/icons-material/RvHookupOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { markReaded } from 'store/actions/notifications';
// styles
const ListItemWrapper = styled('div')(({ theme }) => ({
    cursor: 'pointer',
    padding: 16,
    '&:hover': {
        background: theme.palette.primary.light
    },
    '& .MuiListItem-root': {
        padding: 0
    }
}));

// ==============================|| NOTIFICATION LIST ITEM ||============================== //

const NotificationList = () => {
    const notifications = useSelector((state) => state.notifications.notReaded);
    const loading = useSelector((state) => state.notifications.loading);
    const [list, setList] = useState(notifications);
    const today = new Date();
    const dispatch = useDispatch();
    useEffect(() => {
        setList(notifications);
    }, [loading]);

    const theme = useTheme();

    const subsDate = (exp_string) => {
        let exp_date = new Date(exp_string);
        exp_date.setDate(exp_date.getDate() + 1);
        if (exp_date.getMonth() - today.getMonth() == 0) {
            return exp_date.getDate() - today.getDate();
        }
        return 0;
    };

    return (
        <List
            sx={{
                width: '100%',
                maxWidth: 330,
                py: 0,
                borderRadius: '10px',
                [theme.breakpoints.down('md')]: {
                    maxWidth: 300
                },
                '& .MuiListItemSecondaryAction-root': {
                    top: 22
                },
                '& .MuiDivider-root': {
                    my: 0
                },
                '& .list-container': {
                    pl: 7
                }
            }}
        >
            {list.map((item) => (
                <ListItemWrapper
                    onClick={() => {
                        dispatch(markReaded(item.id));
                    }}
                    key={item.id}
                >
                    <ListItem alignItems="center">
                        <ListItemAvatar>
                            <Avatar sx={{ backgroundColor: 'black', color: 'white' }}>
                                {item.model === 'Driver' ? (
                                    <AirlineSeatReclineNormalOutlinedIcon />
                                ) : item.model === 'Truck' ? (
                                    <LocalShippingOutlinedIcon />
                                ) : (
                                    <RvHookupOutlinedIcon />
                                )}
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            sx={{ maxWidth: '60%' }}
                            primary={item.model === 'Driver' ? `Name: ${item.identifier}` : `VIN: ${item.identifier}`}
                            secondary={`Document: ${item.field}`}
                        />
                        <ListItemSecondaryAction>
                            <Grid container justifyContent="flex-end">
                                <Grid item xs={12}>
                                    <Typography variant="caption" display="block" gutterBottom>
                                        {subsDate(item.exp_date)} days left
                                    </Typography>
                                </Grid>
                            </Grid>
                        </ListItemSecondaryAction>
                    </ListItem>
                    <Grid container direction="column" className="list-container">
                        <Grid item xs={12}>
                            <Typography variant="subtitle2">
                                {item.field} of {item.model} {item.model === 'Driver' ? item.identifier : `with VIN: ${item.identifier}`},
                                will Expire in {subsDate(item.exp_date)} days
                            </Typography>
                        </Grid>
                    </Grid>
                </ListItemWrapper>
            ))}
        </List>
    );
};

export default NotificationList;
