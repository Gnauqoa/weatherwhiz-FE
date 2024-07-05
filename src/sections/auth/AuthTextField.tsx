import { Typography, Box, InputAdornment, IconButton } from "@mui/material";
import { useState } from "react";
import { RHFTextField } from "../../components/hook-form";
import Iconify from "../../components/Iconify";
import { RFFTextFieldProps } from "../../components/hook-form/RHFTextField";

const AuthTextField = ({
  sx,
  label,
  type,
  ...props
}: RFFTextFieldProps): JSX.Element => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="gap-2 flex flex-col">
      {label && (
        <Typography
          sx={{
            fontSize: 16,
            fontWeight: 500,
            color: "#101010",
          }}
        >
          {label}
        </Typography>
      )}
      <RHFTextField
        // autoComplete={""}
        InputProps={{
          endAdornment:
            type === "password" ? (
              <InputAdornment position="end">
                <IconButton
                  edge="end"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <Iconify
                    icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"}
                  />
                </IconButton>
              </InputAdornment>
            ) : null,
        }}
        type={type === "password" ? (showPassword ? "text" : "password") : type}
        sx={{
          "& .MuiInputBase-root": {
            fontSize: 12,
            borderRadius: "8px",
            borderWidth: 1,
            borderColor: "#E9E9E9",
            "& > input": {
              color: "#101010",
            },
          },
          ...sx,
        }}
        FormHelperTextProps={{
          sx: {
            marginLeft: 0,
          },
        }}
        {...props}
      />
    </div>
  );
};

export default AuthTextField;
