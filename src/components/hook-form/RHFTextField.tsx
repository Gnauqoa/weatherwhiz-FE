// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { TextField, TextFieldProps } from '@mui/material';
import React from 'react';

// ----------------------------------------------------------------------

type IProps = {
  name: string;
  CustomTextField?: React.ComponentType<TextFieldProps> | null;
};

type RFFTextFieldProps = IProps & TextFieldProps;
export type { RFFTextFieldProps };
export default function RHFTextField({
  name,
  CustomTextField = null,
  sx,
  ...other
}: RFFTextFieldProps) {
  const { control } = useFormContext();
  const TextFieldComponent = CustomTextField || TextField;
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        return (
          <TextFieldComponent
            {...field}
            fullWidth
            value={typeof field.value === 'number' && field.value === 0 ? '' : field.value}
            error={!!error}
            sx={{
              ...sx,
            }}
            helperText={error?.message}
            {...other}
          />
        );
      }}
    />
  );
}
