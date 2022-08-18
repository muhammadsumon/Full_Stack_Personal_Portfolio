import arrowIosBackFill from '@iconify/icons-eva/arrow-ios-back-fill';
import arrowIosForwardFill from '@iconify/icons-eva/arrow-ios-forward-fill';
import { Icon } from '@iconify/react';
// material
import { CardActionArea, Paper, Stack } from '@mui/material';
// hooks
import useSettings from '../../hooks/useSettings';

// ----------------------------------------------------------------------

export default function SettingStretch() {
  const { themeStretch, onToggleStretch } = useSettings();

  return (
    <CardActionArea sx={{ color: 'primary.main', borderRadius: 1 }}>
      <Paper
        onClick={onToggleStretch}
        sx={{
          p: 2.5,
          bgcolor: 'background.neutral'
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{
            px: 1,
            mx: 'auto',
            width: 0.5,
            height: 40,
            borderRadius: 1,
            color: 'action.active',
            bgcolor: 'background.default',
            transition: (theme) => theme.transitions.create('width'),
            boxShadow: (theme) => theme.customShadows.z12,
            ...(themeStretch && {
              width: 1,
              color: 'primary.main'
            })
          }}
        >
          <Icon icon={themeStretch ? arrowIosBackFill : arrowIosForwardFill} width={20} height={20} />
          <Icon icon={themeStretch ? arrowIosForwardFill : arrowIosBackFill} width={20} height={20} />
        </Stack>
      </Paper>
    </CardActionArea>
  );
}
