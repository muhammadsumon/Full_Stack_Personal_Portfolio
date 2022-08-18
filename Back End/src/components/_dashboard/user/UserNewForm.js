import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import { Icon } from '@iconify/react';
import axios from 'axios';
import { Form, FormikProvider, useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
// material
import { LoadingButton } from '@mui/lab';
import { Alert, Autocomplete, Box, Card, Grid, IconButton, InputAdornment, Stack, TextField } from '@mui/material';
import Chip from '@mui/material/Chip';
// utils
//
import useAuth from '../../../hooks/useAuth';
import { PATH_DASHBOARD } from '../../../routes/paths';

// ----------------------------------------------------------------------

UserNewForm.propTypes = {
  isEdit: PropTypes.bool,
  currentUser: PropTypes.object
};

export default function UserNewForm({ isEdit, currentUser }) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const [showPassword, setShowPassword] = useState(false);
  const [alert, setAlert] = useState({
    type: 'error',
    status: false,
    message: 'There are an error !'
  });
  const role = [
    { id: 1, name: 'admin' },
    { id: 2, name: 'guest' }
  ];

  const NewUserSchema = Yup.object().shape({
    name: Yup.string(),
    role: Yup.string(),
    username: Yup.string(),
    email: Yup.string()
      .email()
      .matches(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Email format is invalid !'
      ),
    password: Yup.string().matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}/g,
      'Password must be minimum eight characters, at least one letter and one number !!'
    )
  });

  const getCurrentRole = () => role.find((role) => role.name === currentUser?.role);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: currentUser?.name || '',
      role: currentUser?.role || '',
      username: currentUser?.username || '',
      email: currentUser?.email || '',
      password: ''
    },
    validationSchema: NewUserSchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      if (user.role === 'admin') {
        const userObject = {
          name: values.name,
          username: values.username,
          email: values.email,
          password: values.password && values.password,
          role: values.role
        };

        if (isEdit) {
          const userObject = {};
          const validateArr = [
            {
              name: 'name',
              value: values.name
            },
            {
              name: 'username',
              value: values.username
            },
            {
              name: 'email',
              value: values.email
            },
            {
              name: 'password',
              value: values.password
            },
            {
              name: 'role',
              value: values.role
            }
          ];

          validateArr.map((data) => {
            if (data.value) {
              userObject[data.name] = data.value;
            }
            return true;
          });

          await axios
            .put(`${process.env.REACT_APP_HOST_API_URL}/users/${currentUser._id}`, userObject, {
              withCredentials: true
            })
            .then((response) => {
              if (response.data?.updatedDocument) {
                resetForm();
                setSubmitting(true);
                enqueueSnackbar(!isEdit ? 'Create success' : 'Update success', { variant: 'success' });
                navigate(PATH_DASHBOARD.user.list);
              }
            })
            .catch((error) => {
              console.log(error.response);
              console.log(error.message);
              setErrors(error.response);
              setSubmitting(false);
              // setAlert({ ...alert, status: true, message: response.data.error });
            });
        } else {
          // eslint-disable-next-line no-lonely-if
          if (!values.name || !values.username || !values.email || !values.password || !values.role) {
            setAlert({ ...alert, status: true, message: 'All fields are required !!' });
            setSubmitting(false);
          } else {
            await axios
              .post(`${process.env.REACT_APP_HOST_API_URL}/users`, userObject, {
                withCredentials: true
              })
              .then((res) => {
                if (res.data?.createdDocument) {
                  resetForm();
                  setSubmitting(true);
                  enqueueSnackbar(!isEdit ? 'Create success' : 'Update success', { variant: 'success' });
                  navigate(PATH_DASHBOARD.user.list);
                }
              })
              .catch((err) => {
                setSubmitting(false);
                setAlert({ ...alert, status: true, message: err.response.data.error });
              });
          }
        }
      } else if (user.role === 'guest') {
        enqueueSnackbar('Only Admin Can Perform This Action !', { variant: 'warning' });
      }
    }
  });

  const { errors, values, touched, isSubmitting, getFieldProps, setFieldValue } = formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return (
    <FormikProvider value={formik}>
      <Form noValidate autoComplete="off">
        <Grid container spacing={3}>
          <Grid item xs={12} md={7}>
            <Card sx={{ p: 3 }}>
              {alert.status && (
                <Alert
                  sx={{ mb: 3 }}
                  variant="outlined"
                  severity={alert.type}
                  onClose={() => {
                    setAlert({ ...alert, status: false });
                  }}
                >
                  {alert.message}
                </Alert>
              )}
              <Stack spacing={3}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  <TextField
                    fullWidth
                    label="Name"
                    name="name"
                    value={values.name}
                    {...getFieldProps('name')}
                    error={Boolean(touched.name && errors.name)}
                    helperText={touched.name && errors.name}
                  />
                  <TextField
                    fullWidth
                    label="Username"
                    name="username"
                    value={values.username}
                    {...getFieldProps('username')}
                    error={Boolean(touched.username && errors.username)}
                    helperText={touched.username && errors.username}
                  />
                </Stack>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  <TextField
                    fullWidth
                    value={values.email}
                    name="email"
                    label="Email"
                    type="email"
                    {...getFieldProps('email')}
                    error={Boolean(touched.email && errors.email)}
                    helperText={touched.email && errors.email}
                  />

                  <TextField
                    fullWidth
                    autoComplete="current-password"
                    type={showPassword ? 'text' : 'password'}
                    label="Password"
                    {...getFieldProps('password')}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={handleShowPassword} edge="end">
                            <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                    error={Boolean(touched.password && errors.password)}
                    helperText={touched.password && errors.password}
                  />
                </Stack>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  <Autocomplete
                    style={{ margin: '0px' }}
                    onChange={(event, newValue) => {
                      setFieldValue('role', newValue?.name);
                    }}
                    {...(getCurrentRole() && { defaultValue: getCurrentRole() })}
                    options={role}
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    getOptionLabel={(option) => option.name}
                    renderTags={(tagValue, getTagProps) =>
                      tagValue.map((option, index) => (
                        <Chip key={option.name} label={option.name} {...getTagProps({ index })} />
                      ))
                    }
                    fullWidth
                    renderInput={(params) => <TextField {...params} label="User Role" placeholder="Select user role" />}
                  />
                </Stack>

                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                  <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                    {!isEdit ? 'Create User' : 'Save Changes'}
                  </LoadingButton>
                </Box>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
}
