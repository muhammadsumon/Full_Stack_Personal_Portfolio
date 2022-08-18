import { styled } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Box, Button, Container, Typography } from '@mui/material';
// components
import { SeverErrorIllustration } from '../assets';
import Page from '../components/Page';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  display: 'flex',
  minHeight: '100%',
  alignItems: 'center',
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10)
}));

// ----------------------------------------------------------------------

export default function Page500() {
  return (
    <RootStyle title="500 Internal Server Error | Ms Portfolio">
      <Container>
        <Box sx={{ maxWidth: 480, margin: 'auto', textAlign: 'center' }}>
          <Typography variant="h3" paragraph>
            500 Internal Server Error
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>There was an error, please try again later.</Typography>

          <SeverErrorIllustration sx={{ height: 260, my: { xs: 5, sm: 10 } }} />

          <Button to="/" size="large" variant="contained" component={RouterLink}>
            Go to Home
          </Button>
        </Box>
      </Container>
    </RootStyle>
  );
}
