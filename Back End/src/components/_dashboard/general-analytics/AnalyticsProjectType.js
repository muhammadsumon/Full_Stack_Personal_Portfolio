// material
import { Card, Typography } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
// utils
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getTypeList } from '../../../redux/slices/type';
import { useDispatch } from '../../../redux/store';
import { fShortenNumber } from '../../../utils/formatNumber';
import SvgIconStyle from '../../SvgIconStyle';
// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(5, 0),
  color: theme.palette.info.darker,
  backgroundColor: theme.palette.info.lighter
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
  color: theme.palette.info.dark,
  backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.info.dark, 0)} 0%, ${alpha(
    theme.palette.info.dark,
    0.24
  )} 100%)`
}));

// ----------------------------------------------------------------------

export default function AnalyticsNewUsers() {
  const { typeList } = useSelector((state) => state.type);
  const dispatch = useDispatch();

  const TOTAL = typeList.length;

  useEffect(() => {
    dispatch(getTypeList());
  }, [dispatch]);

  return (
    <RootStyle>
      <IconWrapperStyle>
        <SvgIconStyle src={`/static/icons/navbar/${'ic_type'}.svg`} sx={{ width: '24px', height: '24px' }} />
      </IconWrapperStyle>
      <Typography variant="h3">{fShortenNumber(TOTAL)}</Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        Project Types
      </Typography>
    </RootStyle>
  );
}
