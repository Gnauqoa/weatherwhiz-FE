import {
  Button,
  CircularProgress,
  Dialog,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { FormProvider } from "../../../components/hook-form";
import { UpdateNotifyWeatherFormProps } from "../../../apis/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import useAuth from "../../../hooks/useAuth";

import AuthTextField from "../../auth/AuthTextField";

export const defaultValues: UpdateNotifyWeatherFormProps = {
  q: undefined,
  notification_each_day: undefined,
};
export const AddMusicToPlaylistSchema = yup.object().shape({
  q: yup.string().optional(),
  notification_each_day: yup.boolean().optional(),
});
const UpdateNotifyModal = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const { user, isUpdateNotify, updateNotifyData } = useAuth();

  const methods = useForm<UpdateNotifyWeatherFormProps>({
    resolver: yupResolver(AddMusicToPlaylistSchema),
    defaultValues,
  });
  useEffect(() => {
    if (user) {
      methods.setValue("q", user.location_query);
      methods.setValue("notification_each_day", true);
    }
  }, [user, methods]);
  const { handleSubmit } = methods;
  const onSubmit = (payload: UpdateNotifyWeatherFormProps) => {
    updateNotifyData(payload);
  };
  return (
    <Dialog open={open} onClose={onClose}>
      <div className="flex flex-col bg-[#fff] w-[500px] px-3 py-3 gap-4">
        <div className="flex flex-row items-center">
          <Typography sx={{ fontSize: 16, fontWeight: 600, color: "#101010" }}>
            Subscribe for Weather Information{" "}
          </Typography>
          <IconButton onClick={onClose} sx={{ ml: "auto" }}>
            <CloseIcon />
          </IconButton>
        </div>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col w-full gap-3">
            <AuthTextField name="q" placeholder="Location" label="Location" />
            <input hidden name="notification_each_day" />
            {isUpdateNotify ? (
              <CircularProgress sx={{ ml: "auto" }} />
            ) : (
              <Button type="submit" sx={{ ml: "auto" }}>
                Save
              </Button>
            )}
          </div>
        </FormProvider>

        <Typography sx={{ fontSize: 10, color: "#808080" }}>
          <i>
            **Specify the location to retrieve the weather status for that
            location every day at midnight (00:00 AM).{" "}
          </i>
        </Typography>
      </div>
    </Dialog>
  );
};
export default UpdateNotifyModal;
