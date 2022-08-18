import PropTypes from 'prop-types';
// material
import { alpha, styled } from '@mui/material/styles';
import { Typography } from '@mui/material';
// components
import Scrollbar from '../components/Scrollbar';

// ----------------------------------------------------------------------

const RootStyle = styled('pre')(({ theme }) => ({
  top: 0,
  right: 0,
  bottom: 0,
  width: 250,
  zIndex: 9999999,
  position: 'fixed',
  backdropFilter: 'blur(8px)',
  WebkitBackdropFilter: 'blur(8px)', // Fix on Mobile
  boxShadow: theme.customShadows.z24,
  color: theme.palette.primary.light,
  background: alpha(theme.palette.grey[900], 0.96),
  '& code': {
    ...theme.typography.body2
  }
}));

const BlockStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(2),
  borderBottom: `dashed 1px ${theme.palette.divider}`
}));

const LabelStyle = styled('div')(({ theme }) => ({
  ...theme.typography.subtitle2,
  minWidth: 160,
  margin: theme.spacing(1, 0),
  color: theme.palette.primary.lighter
}));

const BoolStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  '& code': {
    ...theme.typography.caption,
    borderRadius: 4,
    padding: theme.spacing(0.25, 1),
    color: theme.palette.error.contrastText,
    backgroundColor: theme.palette.error.main
  }
}));

// ----------------------------------------------------------------------

HelperFormik.propTypes = {
  formik: PropTypes.object,
  placement: PropTypes.oneOf(['left', 'right'])
};

export default function HelperFormik({ formik, placement = 'right' }) {
  const {
    dirty,
    status,
    values,
    errors,
    touched,
    isValid,
    // submitCount,
    isSubmitting,
    isValidating,
    // initialValues,
    validateOnBlur,
    validateOnMount,
    validateOnChange
  } = formik;

  const BoolValue = (name, action) => (
    <BoolStyle
      sx={{
        ...(action && {
          '& code': {
            color: 'primary.contrastText',
            bgcolor: 'primary.main'
          }
        })
      }}
    >
      <LabelStyle>{name}</LabelStyle>
      <code>{JSON.stringify(action)}</code>
    </BoolStyle>
  );

  return (
    <RootStyle
      sx={{
        ...(placement === 'left' && {
          left: 0,
          right: 'auto'
        })
      }}
    >
      <Typography variant="subtitle2" sx={{ p: 2, color: 'common.white', bgcolor: 'grey.800' }}>
        Helper Formik
      </Typography>

      <Scrollbar sx={{ height: 1 }}>
        <BlockStyle>
          <LabelStyle>values</LabelStyle>
          <code>{JSON.stringify(values, null, 2)}</code>
        </BlockStyle>

        {/* <BlockStyle>
            <LabelStyle>initialValues</LabelStyle>
            <code>{JSON.stringify(initialValues, null, 2)}</code>
          </BlockStyle> */}

        <BlockStyle>
          <LabelStyle>errors</LabelStyle>
          <code>{JSON.stringify(errors, null, 2)}</code>
        </BlockStyle>

        <BlockStyle>
          <LabelStyle>status</LabelStyle>
          <code>{JSON.stringify(status, null, 2)}</code>
        </BlockStyle>

        <BlockStyle>
          <LabelStyle>touched</LabelStyle>
          <code>{JSON.stringify(touched, null, 2)}</code>
        </BlockStyle>

        {/* <BlockStyle>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <LabelStyle>submitCount</LabelStyle>
              <code>:{JSON.stringify(submitCount)}</code>
            </Box>
          </BlockStyle> */}
        <BlockStyle>
          {BoolValue('isSubmitting', isSubmitting)}
          {BoolValue('dirty', dirty)}
          {BoolValue('isValid', isValid)}
          {BoolValue('isValidating', isValidating)}
          {BoolValue('validateOnBlur', validateOnBlur)}
          {BoolValue('validateOnChange', validateOnChange)}
          {BoolValue('validateOnMount', validateOnMount)}
        </BlockStyle>
      </Scrollbar>
    </RootStyle>
  );
}
