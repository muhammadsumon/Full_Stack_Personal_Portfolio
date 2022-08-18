import closeCircleFill from '@iconify/icons-eva/close-circle-fill';
import { Icon } from '@iconify/react';

// ----------------------------------------------------------------------

export default function Chip(theme) {
  return {
    MuiChip: {
      defaultProps: {
        deleteIcon: <Icon icon={closeCircleFill} />
      },

      styleOverrides: {
        colorDefault: {
          '& .MuiChip-avatarMedium, .MuiChip-avatarSmall': {
            color: theme.palette.text.secondary
          }
        },
        outlined: {
          borderColor: theme.palette.grey[500_32],
          '&.MuiChip-colorPrimary': {
            borderColor: theme.palette.primary.main
          },
          '&.MuiChip-colorSecondary': {
            borderColor: theme.palette.secondary.main
          }
        },
        //
        avatarColorInfo: {
          color: theme.palette.info.contrastText,
          backgroundColor: theme.palette.info.dark
        },
        avatarColorSuccess: {
          color: theme.palette.success.contrastText,
          backgroundColor: theme.palette.success.dark
        },
        avatarColorWarning: {
          color: theme.palette.warning.contrastText,
          backgroundColor: theme.palette.warning.dark
        },
        avatarColorError: {
          color: theme.palette.error.contrastText,
          backgroundColor: theme.palette.error.dark
        }
      }
    }
  };
}
