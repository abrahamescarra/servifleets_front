// material-ui
import { Card, CardContent, Grid } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';

// ==============================|| SKELETON - EARNING CARD ||============================== //

const EarningCard = () => (
    <Card>
        <CardContent>
            <Grid container direction="column">
                <Grid item>
                    <Skeleton variant="rectangular" sx={{ mb: 1 }} height={40} />
                </Grid>
                <Grid item>
                    <Skeleton variant="rectangular" height={30} />
                </Grid>
            </Grid>
        </CardContent>
    </Card>
);

export default EarningCard;
