import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import PhotoCameraOutlinedIcon from '@mui/icons-material/PhotoCameraOutlined';
import {
    Grid,
    TextField,
    Button,
    FormControl,
    InputLabel,
    OutlinedInput,
    InputAdornment,
    IconButton,
    FormHelperText,
    Box,
    Typography
} from '@mui/material';
import Divider from '@mui/material/Divider';
// project imports
import MainCard from 'ui-component/cards/MainCard';
import { editProfile, changePass } from 'store/actions/auth';
import { useSnackbar } from 'notistack';
import { CLEAN_MODIFIED, RESET_ERRORS } from 'store/actions/types/types_auth';
import SubCard from 'ui-component/cards/SubCard';
import { strengthColor, strengthIndicator } from 'utils/password-strength';
// ==============================|| CREATE TRUCK ||============================== //

/* initial form values */
const initalFValues = {
    company_name: '',
    logo: { name: ' ' },
    username: '',
    email: '',
    default_message: '',
    address: ''
};

const initialPass = {
    password: '',
    password2: '',
    old_password: ''
};

const Profile = () => {
    //Consts
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch();

    //Selectors
    const errorsSelect = useSelector((state) => state.auth.errors);
    const passErrorsSelect = useSelector((state) => state.auth.pass_errors);
    const edited = useSelector((state) => state.auth.modified);
    const edited_pass = useSelector((state) => state.auth.modified_pass);
    const user = useSelector((state) => state.auth.user);

    //States
    const [values, setValues] = useState({ ...user, logo: { name: user.logo === null ? '' : user.logo } });
    const [passwordValues, setPasswordValues] = useState(initialPass);
    const [errors, setErrors] = useState({ ...initalFValues, logo: '' });
    const [pass_errors, setPassErrors] = useState(initialPass);
    const [showPassword, setShowPassword] = useState(false);
    const [strength, setStrength] = useState(0);
    const [level, setLevel] = useState();
    const [img, setImg] = useState();

    //Handlers
    const changePassword = (value) => {
        const temp = strengthIndicator(value);
        setStrength(temp);
        setLevel(strengthColor(temp));
    };
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (values.username === '') {
            setErrors({ ...errors, username: 'This Field is Required' });
            return;
        }
        if (values.email === '') {
            setErrors({ ...errors, email: 'This Field is Required' });
            return;
        }
        let logo;
        values.logo.name === '' || values.logo.name === user.logo ? (logo = null) : (logo = values.logo);

        dispatch(editProfile({ ...values, logo: logo }));
    };

    const handlePassSubmit = (e) => {
        e.preventDefault();
        if (passwordValues.old_password === '') {
            setPassErrors({ ...pass_errors, old_password: 'This Field is Required' });
            return;
        }
        if (passwordValues.password === '') {
            setPassErrors({ ...pass_errors, password: 'This Field is Required' });
            return;
        }
        if (passwordValues.password.length < 6) {
            setPassErrors({ ...pass_errors, password: 'Password needs at least 6 characters' });
            return;
        }
        if (strength < 4) {
            setPassErrors({ ...pass_errors, password: 'Password is not Strong enough' });
            return;
        }
        if (passwordValues.password2 === '') {
            setPassErrors({ ...pass_errors, password2: 'This Field is Required' });
            return;
        }
        if (passwordValues.password !== passwordValues.password2) {
            setPassErrors({ ...pass_errors, password2: "Passwords don't match" });
            return;
        }
        // dispatch(changePass(passwordValues));
        setPasswordValues(initialPass);
        changePassword('');
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        });
        setErrors({
            ...errors,
            [name]: ''
        });
    };
    const handlePasswordChange = (e) => {
        const { name, value } = e.target;

        if (name === 'password') changePassword(value);
        setPasswordValues({
            ...passwordValues,
            [name]: value
        });
        setPassErrors({
            ...errors,
            [name]: ''
        });
    };
    const handleImageChange = (e) => {
        const { name, value } = e.target;
        if (e.target.files) {
            if (e.target.files.length !== 0) setImg(URL.createObjectURL(e.target.files[0]));
            setValues({
                ...values,
                [name]: e.target.files[0]
            });
        }
    };

    //Effects
    useEffect(() => {
        dispatch({ type: RESET_ERRORS });
    }, []);
    useEffect(() => {
        setValues({ ...user, logo: { name: user.logo === null ? '' : user.logo } });
        setImg(user.logo ? user.logo : '');
    }, [user]);
    useEffect(() => {
        if (edited) {
            enqueueSnackbar('Edited Profile Information', { variant: 'success' });
            dispatch({
                type: CLEAN_MODIFIED
            });
        }
    }, [edited]);
    useEffect(() => {
        if (edited_pass) {
            enqueueSnackbar('Password Changed', { variant: 'success' });
            dispatch({
                type: CLEAN_MODIFIED
            });
        }
    }, [edited_pass]);

    useEffect(() => {
        if (errorsSelect !== null) setErrors(errorsSelect);
        else setErrors({ ...initalFValues, logo: '' });
    }, [errorsSelect]);
    useEffect(() => {
        if (passErrorsSelect !== null) setPassErrors(passErrorsSelect);
        else setPassErrors(initialPass);
    }, [passErrorsSelect]);

    return (
        <MainCard title="Manage Profile Information">
            <Grid container>
                <Grid item xs={12} lg={6}>
                    <SubCard title="Data">
                        <Grid container>
                            <Grid item container xs={12} sm={6} mb={2}>
                                <Grid item xs={12} display="flex" justifyContent="center">
                                    <Box
                                        border={1}
                                        component="img"
                                        sx={{
                                            maxHeight: 100,
                                            maxWidth: 100,
                                            borderColor: 'black',
                                            borderWidth: 2,
                                            padding: 1
                                        }}
                                        alt="No Logo"
                                        src={img ? img : ''}
                                    />
                                </Grid>
                                <Grid item xs={12} display="flex" justifyContent="center">
                                    <label htmlFor="logo">
                                        <input
                                            onChange={handleImageChange}
                                            style={{ display: 'none' }}
                                            id="logo"
                                            name="logo"
                                            accept="image/*"
                                            type="file"
                                        />
                                        <Button
                                            variant="text"
                                            component="span"
                                            color="secondary"
                                            size="large"
                                            startIcon={<PhotoCameraOutlinedIcon />}
                                        >
                                            Edit
                                        </Button>
                                    </label>
                                </Grid>
                            </Grid>
                            <Grid container item xs={12} sm={6} mb={2}>
                                <Grid item xs={12} mb={2}>
                                    <TextField
                                        fullWidth
                                        required
                                        variant="outlined"
                                        label="Company Name"
                                        name="company_name"
                                        value={values.company_name ? values.company_name : ''}
                                        onChange={handleInputChange}
                                        error={Boolean(errors.company_name)}
                                        helperText={errors.company_name ? errors.company_name : ''}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        required
                                        variant="outlined"
                                        label="Username"
                                        name="username"
                                        value={values.username}
                                        onChange={handleInputChange}
                                        error={Boolean(errors.username)}
                                        helperText={errors.username ? errors.username : ''}
                                    />
                                </Grid>
                            </Grid>
                            <Grid item xs={12} md={6} mb={2}>
                                <TextField
                                    required
                                    fullWidth
                                    type="email"
                                    variant="outlined"
                                    label="Email"
                                    name="email"
                                    value={values.email}
                                    onChange={handleInputChange}
                                    error={Boolean(errors.email)}
                                    helperText={errors.email ? errors.email : ''}
                                />
                            </Grid>
                            <Grid item xs={12} md={6} mb={2}>
                                <TextField
                                    fullWidth
                                    required
                                    variant="outlined"
                                    label="Company Address"
                                    name="address"
                                    value={values.address}
                                    onChange={handleInputChange}
                                    error={Boolean(errors.address)}
                                    helperText={errors.address ? errors.address : ''}
                                />
                            </Grid>
                            <Grid item xs={12} mb={2}>
                                <TextField
                                    fullWidth
                                    required
                                    multiline
                                    variant="outlined"
                                    label="Default Invoice Message"
                                    name="default_message"
                                    value={values.default_message}
                                    onChange={handleInputChange}
                                    error={Boolean(errors.default_message)}
                                    helperText={errors.default_message ? errors.default_message : ''}
                                />
                            </Grid>
                            <Grid item display="flex" justifyContent="center" xs={12}>
                                <Button type="submit" variant="contained" onClick={handleSubmit} color="primary" size="large">
                                    Submit
                                </Button>
                            </Grid>
                        </Grid>
                    </SubCard>
                </Grid>
                <Grid item xs={12} lg={6}>
                    <SubCard title="Change Password">
                        <Grid item xs={12} mb={2}>
                            <FormControl fullWidth error={Boolean(pass_errors.old_password)}>
                                <InputLabel>Old Password</InputLabel>
                                <OutlinedInput
                                    type={showPassword ? 'text' : 'password'}
                                    value={passwordValues.old_password}
                                    name="old_password"
                                    label="Old Password"
                                    onChange={handlePasswordChange}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle old_password visibility"
                                                onClick={handleClickShowPassword}
                                                edge="end"
                                                size="large"
                                            >
                                                {showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                                {pass_errors.old_password && (
                                    <FormHelperText error id="standard-weight-helper-text-password-register">
                                        {pass_errors.old_password}
                                    </FormHelperText>
                                )}
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} mb={2}>
                            <FormControl fullWidth error={Boolean(pass_errors.password)}>
                                <InputLabel>Password</InputLabel>
                                <OutlinedInput
                                    type={showPassword ? 'text' : 'password'}
                                    value={passwordValues.password}
                                    name="password"
                                    label="Password"
                                    onChange={handlePasswordChange}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                edge="end"
                                                size="large"
                                            >
                                                {showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                                {pass_errors.password && (
                                    <FormHelperText error id="standard-weight-helper-text-password-register">
                                        {pass_errors.password}
                                    </FormHelperText>
                                )}
                            </FormControl>
                            {strength !== 0 && (
                                <FormControl fullWidth>
                                    <Box sx={{ mt: 1 }}>
                                        <Grid container spacing={2} alignItems="center">
                                            <Grid item>
                                                <Box
                                                    style={{ backgroundColor: level?.color }}
                                                    sx={{ width: 85, height: 8, borderRadius: '7px' }}
                                                />
                                            </Grid>
                                            <Grid item>
                                                <Typography variant="subtitle1" fontSize="0.75rem">
                                                    {level?.label}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </FormControl>
                            )}
                        </Grid>
                        <Grid item xs={12} mb={2}>
                            <FormControl fullWidth error={Boolean(pass_errors.password2)}>
                                <InputLabel variant="outlined">Repeat Password</InputLabel>
                                <OutlinedInput
                                    type={showPassword ? 'text' : 'password'}
                                    value={passwordValues.password2}
                                    name="password2"
                                    label="Repeat Password"
                                    onChange={handlePasswordChange}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                edge="end"
                                                size="large"
                                            >
                                                {showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                                {pass_errors.password2 && (
                                    <FormHelperText error id="standard-weight-helper-text-password-register">
                                        {pass_errors.password2}
                                    </FormHelperText>
                                )}
                            </FormControl>
                        </Grid>
                        <Grid item display="flex" justifyContent="center" mt={3} xs={12}>
                            <Button type="submit" variant="contained" onClick={handlePassSubmit} color="primary" size="large">
                                Submit
                            </Button>
                        </Grid>
                    </SubCard>
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default Profile;
