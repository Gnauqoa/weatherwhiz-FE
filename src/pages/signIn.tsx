import { Button } from "@mui/material";
import { FormProvider } from "../components/hook-form";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { SignInFormProps } from "../apis/auth";
import AuthTextField from "../sections/auth/AuthTextField";
import useAuth from "../hooks/useAuth";

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
    <div className="bg-[#FAFAFA] px-6 py-4 rounded-[12px]">
      <FormProvider methods={methods} onSubmit={handleSubmit(login)}>
        <div className="flex flex-col w-full gap-3">
          <AuthTextField name="email" label="Email" />
          <AuthTextField name="password" label="Password" type="password" />

          <Button
            type="submit"
            sx={{
              bgcolor: "#101010",
              color: "#fff",
              fontWeight: 400,
              ":hover": {
                bgcolor: "#696969",
              },
            }}
          >
            Login
          </Button>
        </div>
      </FormProvider>
    </div>
  );
};

export default SignIn;
