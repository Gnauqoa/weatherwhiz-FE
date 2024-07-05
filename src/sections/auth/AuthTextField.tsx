import { Typography, Box, InputAdornment, IconButton } from '@mui/material';
import { useState } from 'react';
import { RHFTextField } from '../../components/hook-form';
import Iconify from '../../components/Iconify';
import { RFFTextFieldProps } from '../../components/hook-form/RHFTextField';

const  AuthTextField = ({ sx, label, type, ...props }: RFFTextFieldProps): JSX.Element => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div 
      style={{ 
        marginBottom: 40,
      }}
    >
      {label && (
        <Typography sx={{ fontSize: 16, fontWeight: 500, color: 'white', marginBottom: '15px' }}>
          {label}
        </Typography>
      )}
      <RHFTextField
        InputProps={{
          endAdornment:
            type === 'password' ? (
              <InputAdornment position="end">
                <IconButton edge="end" onClick={() => setShowPassword(!showPassword)}>
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ) : null,
        }}
        type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
        sx={{
          '& .MuiInputBase-root': {
            fontSize: 14,
            fontWeight: 600,
            backgroundColor: 'primary.darker',
            borderRadius: '8px',
            borderWidth: 0,
            '& > input': {
              color: '#fff',
            },
          },
          ...sx,
        }}
        {...props}
      />
    </div>
  );
};

export default AuthTextField;
