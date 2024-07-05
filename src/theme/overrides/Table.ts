import { Theme } from '@mui/material/styles';

// ----------------------------------------------------------------------

export default function Table(theme: Theme) {
  return {
    MuiTableRow: {
      styleOverrides: {
        root: {
          // borderBottom: `1px solid ${theme.palette.divider}`,
          fontSize: 14,
          '&.Mui-selected': {
            backgroundColor: theme.palette.action.selected,
            '&:hover': {
              backgroundColor: theme.palette.action.hover,
            },
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          fontSize: 12,
          minWidth: 'fit-content',
          padding: '2px 0',
          border: `1px solid ${theme.palette.divider}`,
        },
        head: {
          minWidth: 'fit-content',
          color: theme.palette.text.secondary,
          backgroundColor: theme.palette.background.neutral,
          '&:first-of-type': {
            paddingLeft: theme.spacing(3),
            borderTopLeftRadius: +theme.shape.borderRadius / 2,
            borderBottomLeftRadius: +theme.shape.borderRadius / 2,
            boxShadow: `inset 0px 0 0 ${theme.palette.background.paper}`,
          },
          '&:last-of-type': {
            paddingRight: theme.spacing(3),
            borderTopRightRadius: +theme.shape.borderRadius / 2,
            borderBottomRightRadius: +theme.shape.borderRadius / 2,
            boxShadow: `inset 0px 0 0 ${theme.palette.background.paper}`,
          },
        },
        stickyHeader: {
          backgroundColor: theme.palette.background.paper,
          backgroundImage: `linear-gradient(to bottom, ${theme.palette.background.neutral} 0%, ${theme.palette.background.neutral} 100%)`,
        },
        body: {
          '&:first-of-type': {
            paddingLeft: theme.spacing(2),
          },
          '&:last-of-type': {
            paddingRight: theme.spacing(2),
          },
        },
        foot: {
          fontSize: '12px !important',
          padding: '2px 0',
        },
      },
    },
    MuiTableFoot: {
      styleOverrides: {
        root: {
          fontSize: 10,
          minWidth: 'fit-content',
          padding: '2px 0',
          border: `1px solid ${theme.palette.divider}`,
        },
      },
    },
    MuiTablePagination: {
      styleOverrides: {
        root: {
          borderTop: `solid 1px ${theme.palette.divider}`,
        },
        toolbar: {
          height: 64,
        },
        select: {
          '&:focus': {
            borderRadius: theme.shape.borderRadius,
          },
        },
        selectIcon: {
          width: 20,
          height: 20,
          marginTop: -4,
        },
      },
    },
  };
}
