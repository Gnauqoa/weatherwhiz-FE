import { Components, Theme } from '@mui/material/styles';

// ----------------------------------------------------------------------

export default function Container(theme: Theme): Components<Theme> {
  return {
    MuiContainer: {
      styleOverrides: {
        root: {
          paddingLeft: '0px !important',
          paddingRight: '0px !important',
          [theme.breakpoints.down('lg')]: {
            marginLeft: '16px !important',
            marginRight: '16px !important',
          },
        },
      },
    },
  };
}
