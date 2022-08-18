/* eslint-disable no-lonely-if */
import { Form, FormikProvider, useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
// material
import { LoadingButton } from '@mui/lab';
import {
  Alert,
  Autocomplete,
  Box,
  Card,
  CardContent,
  CardHeader,
  FormControlLabel,
  Grid,
  Stack,
  Switch,
  TextField
} from '@mui/material';
import Chip from '@mui/material/Chip';
import axios from 'axios';
import { getCategoryList } from '../../../redux/slices/category';
import { getTechnologyList } from '../../../redux/slices/technology';
import { getTypeList } from '../../../redux/slices/type';
// utils
//
import useAuth from '../../../hooks/useAuth';
import { PATH_DASHBOARD } from '../../../routes/paths';
import { UploadMultiFile } from '../../upload';

// ----------------------------------------------------------------------

export default function ProjectNewForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [preview, setPreview] = useState(false);
  const [files, setFiles] = useState([]);
  const [alert, setAlert] = useState({
    type: 'error',
    status: false,
    message: 'There are an error !'
  });
  const { user } = useAuth();

  const { technologyList } = useSelector((state) => state.technology);
  const { categoryList } = useSelector((state) => state.category);
  const { typeList } = useSelector((state) => state.type);
  const [usedTechnology, setUsedTechnology] = useState('');
  const [type, setType] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    dispatch(getTechnologyList());
    dispatch(getCategoryList());
    dispatch(getTypeList());
  }, [dispatch]);

  const NewProjectSchema = Yup.object().shape({
    name: Yup.string(),
    description: Yup.string(),
    responsibility: Yup.string(),
    type: Yup.string(),
    category: Yup.string(),
    code: Yup.string(),
    live: Yup.string(),
    usedTechnology: Yup.array(),
    images: Yup.array()
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: '',
      description: '',
      responsibility: '',
      live: '',
      code: ''
    },
    validationSchema: NewProjectSchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      if (user.role === 'admin') {
        try {
          if (
            !category ||
            !type ||
            !usedTechnology ||
            !values.name ||
            !values.description ||
            !values.responsibility ||
            !values.live ||
            !values.code
          ) {
            setSubmitting(false);
            setErrors(errors);
            setAlert({ ...alert, status: true, message: 'All fields are required !!' });
          } else {
            const formObject = new FormData();
            // Check whether user provide project images or not
            if (files[0]) {
              // if user upload multiple image
              files.map((data, index) => formObject.append('images', files[index]));

              // Add other values
              formObject.append('name', values.name);
              formObject.append('description', values.description);
              formObject.append('responsibility', values.responsibility);
              formObject.append('type', type);
              formObject.append('category', category);
              formObject.append('live', values.live);
              formObject.append('code', values.code);
              formObject.append('usedTechnology', JSON.stringify(usedTechnology));

              await axios
                .post(`${process.env.REACT_APP_HOST_API_URL}/projects`, formObject, {
                  withCredentials: true
                })
                .then((response) => {
                  if (response.data?.createdDocument) {
                    resetForm();
                    setSubmitting(true);
                    enqueueSnackbar('Create success', { variant: 'success' });
                    navigate(PATH_DASHBOARD.project.list);
                  }
                })
                .catch((err) => {
                  if (err) {
                    setAlert({ ...alert, status: true, message: 'Something went wrong !!' });
                  }
                });
            } else {
              setSubmitting(false);
              setErrors(errors);
              setAlert({ ...alert, status: true, message: 'Project images are required !!' });
            }
          }
        } catch (error) {
          setSubmitting(false);
          setErrors(error);
          enqueueSnackbar('Something went wrong !', { variant: 'warning' });
        }
      } else if (user.role === 'guest') {
        enqueueSnackbar('Only Admin Can Perform This Action !', { variant: 'warning' });
      }
    }
  });

  const { errors, values, touched, isSubmitting, getFieldProps } = formik;

  const handleDropMultiFile = useCallback(
    (acceptedFiles) => {
      acceptedFiles.map((file) => {
        const fileType = file.type.split('/')[0];

        if (fileType === 'image') {
          setFiles(
            acceptedFiles.map((file) =>
              Object.assign(file, {
                preview: URL.createObjectURL(file)
              })
            )
          );
        } else {
          enqueueSnackbar('Invalid File Type only png, jpg, jpeg, svg or webp file allowed', {
            variant: 'warning',
            autoHideDuration: '7s'
          });
        }

        return true;
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [setFiles]
  );

  const handleRemoveAll = () => {
    setFiles([]);
  };

  const handleRemove = (file) => {
    const filteredItems = files.filter((_file) => _file !== file);
    setFiles(filteredItems);
  };

  return (
    <FormikProvider value={formik}>
      <Form encType="multipart/form-data" noValidate autoComplete="off">
        <Grid container spacing={3}>
          <Grid item xs={12} md={5}>
            <Card>
              <CardHeader
                title="Upload Project Images"
                action={
                  <FormControlLabel
                    control={<Switch checked={preview} onChange={(event) => setPreview(event.target.checked)} />}
                    label="Show Preview"
                  />
                }
              />
              <CardContent>
                <UploadMultiFile
                  showPreview={preview}
                  files={files}
                  onDrop={handleDropMultiFile}
                  onRemove={handleRemove}
                  onRemoveAll={handleRemoveAll}
                />
              </CardContent>
            </Card>
          </Grid>

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
                    label="Description"
                    name="description"
                    value={values.description}
                    {...getFieldProps('description')}
                    error={Boolean(touched.description && errors.description)}
                    helperText={touched.description && errors.description}
                  />
                </Stack>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  <TextField
                    fullWidth
                    multiline
                    minRows={3}
                    maxRows={5}
                    value={values.responsibility}
                    name="responsibility"
                    label="Responsibility"
                    {...getFieldProps('responsibility')}
                    error={Boolean(touched.responsibility && errors.responsibility)}
                    helperText={touched.responsibility && errors.responsibility}
                  />
                </Stack>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  <Autocomplete
                    style={{ margin: '0px' }}
                    onChange={(event, newValue) => {
                      if (newValue) {
                        setType(newValue._id);
                      }
                    }}
                    options={typeList}
                    isOptionEqualToValue={(option, value) => option?._id === value?._id}
                    getOptionLabel={(option) => (option.name ? option.name : '')}
                    renderTags={(tagValue, getTagProps) =>
                      tagValue.map((option, index) => (
                        <Chip key={option.name} label={option.name} {...getTagProps({ index })} />
                      ))
                    }
                    fullWidth
                    renderInput={(params) => (
                      <TextField {...params} label="Project Type" placeholder="Select Project Type" />
                    )}
                  />

                  <Autocomplete
                    onChange={(event, newValue) => {
                      if (newValue) {
                        setCategory(newValue._id);
                      }
                    }}
                    options={categoryList}
                    isOptionEqualToValue={(option, value) => option._id === value._id}
                    getOptionLabel={(option) => (option.name ? option.name : '')}
                    renderTags={(tagValue, getTagProps) =>
                      tagValue.map((option, index) => (
                        <Chip key={option.name} label={option.name} {...getTagProps({ index })} />
                      ))
                    }
                    fullWidth
                    renderInput={(params) => (
                      <TextField {...params} label="Project Category" placeholder="Select Project Category" />
                    )}
                  />
                </Stack>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  <TextField
                    fullWidth
                    label="Live Link"
                    value={values.live}
                    {...getFieldProps('live')}
                    error={Boolean(touched.live && errors.live)}
                    helperText={touched.live && errors.live}
                  />
                  <TextField
                    fullWidth
                    label="Code Link"
                    value={values.code}
                    {...getFieldProps('code')}
                    error={Boolean(touched.code && errors.code)}
                    helperText={touched.code && errors.code}
                  />
                </Stack>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  <Autocomplete
                    multiple
                    style={{ margin: '0px' }}
                    onChange={(event, newValue) => {
                      const emArray = [];
                      newValue.map((data) => {
                        emArray.push(data._id);
                        return true;
                      });

                      setUsedTechnology(emArray);
                    }}
                    options={technologyList}
                    isOptionEqualToValue={(option, value) => option._id === value._id}
                    getOptionLabel={(option) => (option.name ? option.name : '')}
                    renderTags={(tagValue, getTagProps) =>
                      tagValue.map((option, index) => (
                        <Chip key={option.name} label={option.name} {...getTagProps({ index })} />
                      ))
                    }
                    fullWidth
                    renderInput={(params) => (
                      <TextField {...params} label="Used Technology" placeholder="Select Technology" />
                    )}
                  />
                </Stack>

                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                  <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                    Create Project
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
