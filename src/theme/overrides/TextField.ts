import { Components, Theme } from '@mui/material/styles';

// ----------------------------------------------------------------------

export default function TextField(theme: Theme): Components<Theme> {
  return {
    MuiTextField: {
      styleOverrides: {
        root: {
          borderRadius: +theme.shape.borderRadius * 0,
          border: '0px',
          '.MuiTextField-root': {
            background: 'red !important',
          },
        },
      },
    },
  };
}
