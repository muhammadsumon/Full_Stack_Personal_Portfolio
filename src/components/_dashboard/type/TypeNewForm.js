import { Form, FormikProvider, useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
// material
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack, TextField } from '@mui/material';
// utils
// routes
import axios from 'axios';
import { apiUrl } from '../../../config';
import useAuth from '../../../hooks/useAuth';
import { PATH_DASHBOARD } from '../../../routes/paths';

// ----------------------------------------------------------------------

TypeNewForm.propTypes = {
  container: PropTypes.bool,
  isEdit: PropTypes.bool,
  currentType: PropTypes.object
};

export default function TypeNewForm({ isEdit, currentType }) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { enqueueSnackbar } = useSnackbar();

  const NewTypeSchema = Yup.object().shape({
    name: Yup.string().required('Project name is required')
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: currentType?.name || ''
    },
    validationSchema: NewTypeSchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      if (user.role === 'admin') {
        try {
          if (!isEdit) {
            await axios.post(
              `${apiUrl}/projecttypes`,
              { ...values },
              {
                withCredentials: true
              }
            );
          } else {
            await axios.put(
              `${apiUrl}/projecttypes/${currentType._id}`,
              { ...values },
              {
                withCredentials: true
              }
            );
          }

          resetForm();
          setSubmitting(true);
          enqueueSnackbar(!isEdit ? 'Create success' : 'Update success', { variant: 'success' });
          navigate(PATH_DASHBOARD.type.list);
        } catch (error) {
          console.error(error);
          setSubmitting(false);
          setErrors(error);
        }
      } else if (user.role === 'guest') {
        enqueueSnackbar('Only Admin Can Perform This Action !', { variant: 'warning' });
      }
    }
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={7}>
            <Card container sx={{ p: 3 }}>
              <Stack spacing={3}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  <TextField
                    fullWidth
                    label="Project Type Name"
                    {...getFieldProps('name')}
                    error={Boolean(touched.name && errors.name)}
                    helperText={touched.name && errors.name}
                  />
                </Stack>

                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                  <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                    {!isEdit ? 'Create Type' : 'Save Changes'}
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
