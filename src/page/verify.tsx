import { useForm } from "react-hook-form";
import Logo from "../components/Logo";
import { FormProvider } from "../components/hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import AuthTextField from "../sections/auth/AuthTextField";
import useAuth from "../hooks/useAuth";
import { VerifyEmailFormProps } from "../apis/auth";
import { Button, CircularProgress } from "@mui/material";
import { Link, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { pathPage } from "../routes/path";
import AuthContainer from "../sections/auth/AuthContainer";

export const VerifyEmailSchema = yup.object().shape({
  code: yup.string().required("Please enter code"),
  user_id: yup.string().required(),
});
const defaultValues = {
  code: "",
  user_id: "",
};

const VerifyEmail = () => {
  const methods = useForm<VerifyEmailFormProps>({
    resolver: yupResolver(VerifyEmailSchema),
    defaultValues,
  });
  const [searchParams] = useSearchParams();
  const { handleSubmit, setValue } = methods;
  const { verify, isVerify, sendVerifyCode, isSendVerifyCode } = useAuth();
  const code = searchParams.get("code");
  const user_id = searchParams.get("user_id");

  useEffect(() => {
    setValue("code", code || "");
    setValue("user_id", user_id || "");
  }, [code, user_id]);

  return (
    <AuthContainer>
      <div className="w-full flex pb-4 flex-col items-center">
        <Logo />
      </div>
      <FormProvider methods={methods} onSubmit={handleSubmit(verify)}>
        <AuthTextField name="code" label="Code" />
        <input name="user_id" hidden />

        <Button
          type="submit"
          sx={{
            width: "100%",
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
          disabled={isVerify}
        >
          {isVerify ? <CircularProgress sx={{ color: "#fff" }} /> : "Verify"}
        </Button>
      </FormProvider>
      <Button
        onClick={() => {
          sendVerifyCode({ user_id: user_id || "" });
        }}
        disabled={isSendVerifyCode}
        sx={{
          width: "100%",
          borderRadius: "8px",
          mt: 1,
          py: 1.5,
          bgcolor: "#fff",
          color: "#101010",
          fontWeight: 600,
          border: "1px solid #101010",
          ":hover": {
            bgcolor: "#ccc",
          },
          boxShadow: "none",
        }}
      >
        {isSendVerifyCode ? (
          <CircularProgress sx={{ color: "#fff" }} />
        ) : (
          "Send new code"
        )}
      </Button>
      <p className="text-[#101010] text-center pt-4">
        Have an account?{" "}
        <Link to={pathPage.login} className="font-[600]">
          Sign In
        </Link>
      </p>
    </AuthContainer>
  );
};

export default VerifyEmail;
