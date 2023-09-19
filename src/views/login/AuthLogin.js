import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Box,
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormHelperText,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Stack,
    Typography
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';
import { login } from 'store/actions/auth';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

// ============================|| LOGIN ||============================ //

const AuthLogin = ({ ...others }) => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const [checked, setChecked] = useState(true);
    const auth = useSelector((state) => state.auth);

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

    return (
        <>
            <Formik
                initialValues={{
                    username: 'abraham',
                    password: '12345678',
                    submit: null
                }}
                validationSchema={Yup.object().shape({
                    username: Yup.string().max(15).required('Username is required'),
                    password: Yup.string().max(255).required('Password is required')
                })}
                onSubmit={async (values, { /* setErrors, setStatus, */ setSubmitting }) => {
                    dispatch(login({ username: values.username, password: values.password }));
                    await sleep(5000);
                    setSubmitting(false);
                }}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                    <form noValidate onSubmit={handleSubmit} {...others}>
                        <FormControl
                            fullWidth
                            error={Boolean((touched.email && errors.email) || auth.logFail)}
                            sx={{ ...theme.typography.customInput }}
                        >
                            <InputLabel htmlFor="outlined-adornment-username-login">Username</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-username-login"
                                type="text"
                                value={values.username}
                                name="username"
                                onBlur={handleBlur}
                                onChange={(e) => {
                                    handleChange(e);
                                    dispatch(login(null));
                                }}
                                label="Username"
                                inputProps={{}}
                            />
                            {touched.username && errors.username && (
                                <FormHelperText error id="standard-weight-helper-text-username-login">
                                    {errors.username}
                                </FormHelperText>
                            )}
                        </FormControl>

                        <FormControl
                            fullWidth
                            error={Boolean((touched.password && errors.password) || auth.logFail)}
                            sx={{ ...theme.typography.customInput }}
                        >
                            <InputLabel htmlFor="outlined-adornment-password-login">Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password-login"
                                type={showPassword ? 'text' : 'password'}
                                value={values.password}
                                name="password"
                                onBlur={handleBlur}
                                onChange={(e) => {
                                    handleChange(e);
                                    dispatch(login(null));
                                }}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                            size="large"
                                        >
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"
                                inputProps={{}}
                            />
                            {touched.password && errors.password && (
                                <FormHelperText error id="standard-weight-helper-text-password-login">
                                    {errors.password}
                                </FormHelperText>
                            )}
                        </FormControl>
                        <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={checked}
                                        onChange={(event) => setChecked(event.target.checked)}
                                        name="checked"
                                        color="primary"
                                    />
                                }
                                label="Remember me"
                            />
                            <Typography variant="subtitle1" color="secondary" sx={{ textDecoration: 'none', cursor: 'pointer' }}>
                                Forgot Password?
                            </Typography>
                        </Stack>
                        {errors.submit ||
                            (auth.logFail && (
                                <Box sx={{ mt: 3 }}>
                                    <FormHelperText error>{errors.submit || 'Wrong username or password'}</FormHelperText>
                                </Box>
                            ))}

                        <Box sx={{ mt: 2 }}>
                            <AnimateButton>
                                <Button
                                    disableElevation
                                    disabled={isSubmitting}
                                    fullWidth
                                    size="large"
                                    type="submit"
                                    variant="contained"
                                    color="secondary"
                                >
                                    Sign in
                                </Button>
                            </AnimateButton>
                        </Box>
                    </form>
                )}
            </Formik>
        </>
    );
};

export default AuthLogin;
