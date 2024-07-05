import { Button } from "@mui/material";
import { FormProvider } from "../components/hook-form";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import AuthTextField from "../sections/auth/AuthTextField";
import useAuth from "../hooks/useAuth";
import Logo from "../components/Logo";
import { Link } from "react-router-dom";
import { pathPage } from "../routes/path";
import { AddUserType } from "../@types/user";

export const SignUpSchema = yup.object().shape({
  email: yup
    .string()
    .email("Email is not valid")
    .required("Please enter email"),
  username: yup.string().required("Please enter username"),
  first_name: yup.string().required("Please enter first name"),
  last_name: yup.string().required("Please enter last name"),
  phone: yup.string().required("Please enter phone"),
  password: yup.string().required("Please enter password"),
  confirm_password: yup
    .string()
    .label("confirm password")
    .required("Please enter confirm password")
    .oneOf([yup.ref("password"), ""], "Passwords must match"),
  birth: yup.string().required("Please enter birth"),
});
export const defaultValues = {
  email: "",
  username: "",
  first_name: "",
  last_name: "",
  phone: "",
  password: "",
  confirm_password: "",
  birth: "",
};

const SignUp = () => {
  const { register } = useAuth();
  const methods = useForm<AddUserType>({
    resolver: yupResolver(SignUpSchema),
    defaultValues,
  });
  const { handleSubmit } = methods;

  return (
    <div className="flex flex-col bg-[#FAFAFA] gap-4   px-6 py-8 rounded-[12px] w-[30%]">
      <div className="w-full flex flex-col items-center">
        <Logo />
      </div>
      <FormProvider methods={methods} onSubmit={handleSubmit(register)}>
        <div className="flex flex-col w-full gap-3">
          <div className="flex flex-row w-full items-start gap-3">
            <AuthTextField
              sx={{ width: "100%" }}
              name="first_name"
              label="First name"
            />
            <AuthTextField name="last_name" label="Last name" />
          </div>
          <AuthTextField name="email" label="Email" />
          <AuthTextField name="username" label="Username" />
          <AuthTextField name="password" label="Password" type="password" />
          <AuthTextField
            name="confirm_password"
            label="Confirm password"
            type="password"
          />

          <AuthTextField name="phone" label="Phone" />
          <AuthTextField
            label="Date of birth"
            name="birth"
            placeholder={"*************"}
            type={"date"}
          />
          <Button
            type="submit"
            sx={{
              mt: 3,
              py: 1.5,
              bgcolor: "#101010",
              color: "#fff",
              fontWeight: 600,
              borderRadius: "8px",
              ":hover": {
                bgcolor: "#696969",
              },
            }}
          >
            Create my account
          </Button>
          <p className="text-[#101010] text-center pt-4">
            Have an account?{" "}
            <Link to={pathPage.login} className="font-[600]">
              Sign In
            </Link>
          </p>
        </div>
      </FormProvider>
    </div>
  );
};

export default SignUp;
