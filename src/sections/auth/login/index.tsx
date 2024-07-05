import * as yup from "yup";
import { useForm } from "react-hook-form";
import { FormProvider } from "../../../components/hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signIn } from "../../../apis/auth";
import AuthTextField from "../AuthTextField";
import { LoadingButton } from "@mui/lab";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { pathPage } from "../../../routes/path";
import { useDispatch } from "../../../redux/store";
import { setUser } from "../../../redux/slices/user";
import axios from "../../../utils/axios";
import { Typography } from "@mui/material";

export type SignInFormProps = {
  account: string;
  password: string;
};
export const defaultValues: SignInFormProps = {
  account: "",
  password: "",
};
export const LoginSchema = yup.object().shape({
  account: yup.string().required("Please enter your account"),
  password: yup.string().required("Please enter your password"),
});

const Login = () => {
  const methods = useForm<SignInFormProps>({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });
  const dispatch = useDispatch();
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;
  const navigate = useNavigate();
  const onSubmit = async (data: SignInFormProps) => {
    try {
      const res = await signIn(data);
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${res.data.data.access_token}`;
      const user = await axios.get("/api/v1/users/current");
      dispatch(setUser(user.data.data));
      toast("Login success", { type: "success" });
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
        <Typography sx={{fontSize: 32, fontWeight: 600, marginBottom: '25px', textAlign: 'center'}}>Login</Typography>
        <AuthTextField
          label={"Username"}
          placeholder={"Username"}
          name="account"
        />
        <AuthTextField
          label={"Password"}
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
          Login
        </LoadingButton>

        <a 
          href="/signup"
          style={{
            display: 'block',
            textAlign: 'right',
            color: 'white',
            fontSize: '14px',
            fontWeight: 'bold',
            marginTop: '15px',
          }}
        >Register</a>
      </div>
    </FormProvider>
  );
};

export default Login;
