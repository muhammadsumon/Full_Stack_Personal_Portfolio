/* eslint-disable jsx-a11y/anchor-is-valid */
import closeFill from '@iconify/icons-eva/close-fill';
import { Icon } from '@iconify/react';
// material
import { Alert, Box, Card, Container, IconButton, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
// routes
import { useSnackbar } from 'notistack';
// hooks
import { useState } from 'react';
import useAuth from '../../hooks/useAuth';
// layouts
// components
import { MHidden } from '../../components/@material-extend';
import { LoginForm } from '../../components/authentication/login';
import Page from '../../components/Page';
// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex'
  }
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2)
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0)
}));

// ----------------------------------------------------------------------

export default function Login() {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false)
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handleDemoLogin = async (e) => {
    e.preventDefault();

    // Set Loading effect in Sign In Button
    setLoading(true);

    await login('guest', 'guest113rii');
    enqueueSnackbar('Login success', {
      variant: 'success',
      action: (key) => (
        <IconButton size="small" onClick={() => closeSnackbar(key)}>
          <Icon icon={closeFill} />
        </IconButton>
      )
    });
  };

  return (
    <RootStyle title="Login | Ms Portfolio">
      <MHidden width="mdDown">
        <SectionStyle>
          <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
            Hi, Welcome Back
          </Typography>
          <img src="/static/illustrations/illustration_login.png" alt="login" />
        </SectionStyle>
      </MHidden>

      <Container maxWidth="sm">
        <ContentStyle>
          <Stack direction="row" alignItems="center" sx={{ mb: 5 }}>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h4" gutterBottom>
                Sign in to Dashboard
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>Enter your details below.</Typography>
            </Box>
          </Stack>
          <Alert severity="info" sx={{ mb: 3 }}>
            <a href="" onClick={(e) => handleDemoLogin(e)}>
              LOG IN
            </a>{' '}
            as a demo user
          </Alert>

          <LoginForm isLoading={loading} />
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
