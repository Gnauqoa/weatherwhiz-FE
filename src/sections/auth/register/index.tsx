import * as yup from "yup";
import { useForm } from "react-hook-form";
import { FormProvider } from "../../../components/hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerUser } from "../../../apis/auth";
import { Box, Stack, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { pathPage } from "../../../routes/path";
import AuthTextField from "../AuthTextField";
import axios from "../../../utils/axios";
import { setUser } from "../../../redux/slices/user";
import { useDispatch } from "../../../redux/store";

export type RegisterFormProps = {
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  password: string;
};
export const defaultValues: RegisterFormProps = {
  username: "",
  email: "",
  first_name: "",
  last_name: "",
  password: "",
};
export const RegisterSchema = yup.object().shape({
  username: yup.string().required("Please enter your account"),
  email: yup.string().required("Please enter your email").email(),
  first_name: yup.string().required("Please enter your first name"),
  last_name: yup.string().required("Please enter your last name"),
  password: yup.string().required("Please enter your password"),
});

const Register = () => {
  const methods = useForm<RegisterFormProps>({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onSubmit = async (data: RegisterFormProps) => {
    try {
      const res = await registerUser(data);
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${res.data.data.access_token}`;
      const user = await axios.get("/api/v1/users/current");
      dispatch(setUser(user.data.data));
      toast("Register success", { type: "success" });
      navigate(pathPage.root);
    } catch (error) {
      const op = error as AxiosError;
      toast((op.response?.data as any)?.error?.errors[0], { type: "error" });
    }
  };
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <div
        style={{
          display: "flex", 
          flexDirection: "column", 
          margin: '150px auto 0',
          padding: '35px 30px',
          width: '750px',
          backgroundColor: "#121212",
        }}
      >
        <Typography sx={{fontSize: 32, fontWeight: 600, marginBottom: '25px', textAlign: 'center'}}>Sign up to start listen</Typography>
        <AuthTextField 
          label="Email" 
          placeholder={"Email"} 
          name="email" 
        />
        <AuthTextField 
          label="Username"
          placeholder={"Username"} 
          name="username" 
        />
        <AuthTextField 
          label="First name"
          placeholder={"First name"} 
          name="first_name" 
        />
        <AuthTextField 
          label="Last name"
          placeholder={"Last name"} 
          name="last_name" 
        />
        <AuthTextField
          label="Date of birth"
          name="birth"
          placeholder={"*************"}
          type={"date"}
        />
        <AuthTextField
          label="Password"
          name="password"
          placeholder={"*************"}
          type={"password"}
        />
        <LoadingButton
          sx={{ backgroundColor: "primary.main", width: '350px', margin: '0 auto' }}
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Register
        </LoadingButton>

        <a 
          href="/login"
          style={{
            display: 'block',
            textAlign: 'right',
            color: 'white',
            fontSize: '14px',
            fontWeight: 'bold',
            marginTop: '15px',
          }}
        >Login</a>
      </div>
    </FormProvider>
  );
};

export default Register;
