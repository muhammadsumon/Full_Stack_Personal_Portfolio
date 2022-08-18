// material
import { Card, Typography } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
// utils
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getProjectList } from '../../../redux/slices/project';
import { useDispatch } from '../../../redux/store';
import { fShortenNumber } from '../../../utils/formatNumber';
import SvgIconStyle from '../../SvgIconStyle';
// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(5, 0),
  color: theme.palette.primary.darker,
  backgroundColor: theme.palette.primary.lighter
}));

const IconWrapperStyle = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
  color: theme.palette.primary.dark,
  backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.primary.dark, 0)} 0%, ${alpha(
    theme.palette.primary.dark,
    0.24
  )} 100%)`
}));

// ----------------------------------------------------------------------

export default function AnalyticsWeeklySales() {
  const { projectList } = useSelector((state) => state.project);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProjectList());
  }, [dispatch]);

  const TOTAL = projectList.length;

  return (
    <RootStyle>
      <IconWrapperStyle>
        <SvgIconStyle src={`/static/icons/navbar/${'ic_project'}.svg`} sx={{ width: '24px', height: '24px' }} />
      </IconWrapperStyle>
      <Typography variant="h3">{fShortenNumber(TOTAL)}</Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        Completed Projects
      </Typography>
    </RootStyle>
  );
}
