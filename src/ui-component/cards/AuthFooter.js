// material-ui
import { Link, Typography, Stack } from '@mui/material';

// ==============================|| FOOTER - AUTHENTICATION 2 & 3 ||============================== //

const AuthFooter = () => (
    <Stack direction="row" justifyContent="center">
        <Typography
            variant="subtitle2"
            component={Link}
            href="https://github.com/abrahamescarra/abrahamescarra"
            target="_blank"
            underline="hover"
        >
            Developer: "@abrahamescarra"
        </Typography>
    </Stack>
);

export default AuthFooter;
