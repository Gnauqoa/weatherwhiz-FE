import { Button } from "@mui/material";
import { FormProvider } from "../components/hook-form";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { SignInFormProps } from "../apis/auth";
import AuthTextField from "../sections/auth/AuthTextField";
import useAuth from "../hooks/useAuth";
import Logo from "../components/Logo";
import { Link } from "react-router-dom";
import { pathPage } from "../routes/path";
import AuthCheckBox from "../sections/auth/AuthCheckBox";

export const SignInSchema = yup.object().shape({
  email: yup
    .string()
    .email("Email is not valid")
    .required("Please enter email"),
  password: yup.string().required("Please enter password"),
});
const defaultValues = {
  email: "",
  password: "",
};
const SignIn = () => {
  const { login } = useAuth();
  const methods = useForm<SignInFormProps>({
    resolver: yupResolver(SignInSchema),
    defaultValues,
  });
  const { handleSubmit } = methods;

  return (
    <div className="flex flex-col gap-4 bg-[#FAFAFA] px-6 py-8 rounded-[12px] w-[30%]">
      <div className="w-full flex flex-col items-center">
        <Logo />
      </div>
      <FormProvider methods={methods} onSubmit={handleSubmit(login)}>
        <div className="flex flex-col w-full gap-3">
          <AuthTextField name="email" label="Email" />
          <AuthTextField name="password" label="Password" type="password" />
          <div className="flex flex-row items-center">
            <AuthCheckBox
              name="remember"
              label="Remember me"
              sx={{ fontSize: 16, color: "#101010", fontWeight: 600 }}
            />
            <Link
              to={pathPage.forgotPassword}
              className="ml-auto text-[#101010] font-[600]"
            >
              <p>Forgot password?</p>
            </Link>
          </div>
          <Button
            type="submit"
            sx={{
              borderRadius: "8px",
              mt: 3,
              py: 1.5,
              bgcolor: "#101010",
              color: "#fff",
              fontWeight: 600,
              ":hover": {
                bgcolor: "#696969",
              },
            }}
          >
            Login
          </Button>
          <p className="text-[#101010] text-center pt-4">
            Don't have an account?{" "}
            <Link to={pathPage.register} className="font-[600]">
              Sign Up
            </Link>
          </p>
        </div>
      </FormProvider>
    </div>
  );
};

export default SignIn;
