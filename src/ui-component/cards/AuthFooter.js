// material-ui
import { Link, Typography, Stack } from '@mui/material';

// ==============================|| FOOTER - AUTHENTICATION 2 & 3 ||============================== //

const AuthFooter = () => (
    <Stack direction="row" justifyContent="center">
        <Typography
            variant="subtitle2"
            fontSize={15}
            mb={1}
            component={Link}
            href="https://github.com/abrahamescarra/abrahamescarra"
            target="_blank"
            underline="hover"
        >
            Developer: @<u>Abraham Escarra</u>
        </Typography>
    </Stack>
);

export default AuthFooter;
