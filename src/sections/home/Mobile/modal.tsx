import {
  Button,
  CircularProgress,
  Dialog,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { FormProvider } from "../../../components/hook-form";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect } from "react";
import useForecast from "../../../hooks/useForecast";
import AuthTextField from "../../auth/AuthTextField";

export type SearchForecastFormProps = {
  q: string;
  days: string;
};

export const defaultValues: SearchForecastFormProps = {
  q: "",
  days: "",
};
export const SearchForecastSchema = yup.object().shape({
  q: yup.string().required(),
  days: yup.string().required(),
});

const Modal = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const { q, days, isLoading, search } = useForecast();
  const methods = useForm<SearchForecastFormProps>({
    resolver: yupResolver(SearchForecastSchema),
    defaultValues,
  });
  useEffect(() => {
    if (q) methods.setValue("q", q);
    if (days) methods.setValue("days", days);
  }, [q, days, methods]);
  const { handleSubmit } = methods;
  const onSubmit = (payload: SearchForecastFormProps) => {
    search(payload.q, payload.days, () => {
      onClose();
    });
  };
  return (
    <Dialog open={open} onClose={onClose}>
      <div className="flex flex-col bg-[#fff] w-full xl:w-[500px] px-3 py-3 gap-4">
        <div className="flex flex-row items-center">
          <Typography sx={{ fontSize: 16, fontWeight: 600, color: "#101010" }}>
            Select location to see weather information{" "}
          </Typography>
          <IconButton onClick={onClose} sx={{ ml: "auto" }}>
            <CloseIcon />
          </IconButton>
        </div>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col w-full gap-3">
            <AuthTextField name="q" placeholder="Location" label="Location" />
            <AuthTextField name="days" placeholder="Days" label="Days" />
            {isLoading ? (
              <CircularProgress sx={{ ml: "auto" }} />
            ) : (
              <Button type="submit" sx={{ ml: "auto" }}>
                Find
              </Button>
            )}
          </div>
        </FormProvider>
      </div>
    </Dialog>
  );
};

export default Modal;
