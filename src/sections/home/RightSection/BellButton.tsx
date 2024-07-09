import NotificationsOffIcon from "@mui/icons-material/NotificationsOff";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { CircularProgress, IconButton } from "@mui/material";
import useAuth from "../../../hooks/useAuth";
import useToggle from "../../../hooks/useToggle";
import UpdateNotifyModal from "./SubscribeModal";

const BellButton = () => {
  const { user, updateNotifyData, isUpdateNotify } = useAuth();
  const { toggle, onOpen, onClose } = useToggle();
  const onUnSub = async () => {
    await updateNotifyData({ notification_each_day: false });
  };
  if (!user) return <></>;
  return (
    <>
      {isUpdateNotify ? (
        <CircularProgress />
      ) : (
        <IconButton onClick={!user.notification_each_day ? onOpen : onUnSub}>
          {user.notification_each_day ? (
            <NotificationsIcon sx={{ width: 32, height: 32 }} />
          ) : (
            <NotificationsOffIcon sx={{ width: 32, height: 32 }} />
          )}
        </IconButton>
      )}
      <UpdateNotifyModal open={toggle} onClose={onClose} />
    </>
  );
};

export default BellButton;
