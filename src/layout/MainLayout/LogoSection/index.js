import { Link } from 'react-router-dom';

// material-ui
import { ButtonBase, Grid, Typography } from '@mui/material';

// project imports
import config from 'config';
import Logo from 'ui-component/Logo';

// ==============================|| MAIN LOGO ||============================== //

const LogoSection = () => (
    <ButtonBase disableRipple component={Link} to={config.defaultPath}>
        <Grid container>
            <Grid item xs={4}>
                <Logo />
            </Grid>
            <Grid container item xs={7} ml={1} justifyContent="center" direction="column">
                <Grid item>
                    <Typography variant="h4">ServiFleets</Typography>
                </Grid>
            </Grid>
        </Grid>
    </ButtonBase>
);

export default LogoSection;
