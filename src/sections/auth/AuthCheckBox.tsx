import { styled } from "@mui/material";
import { RHFCheckbox, RHFCheckboxProps } from "../../components/hook-form";

const BpIcon = styled("span")(({ theme }) => ({
  borderRadius: 3,
  width: 16,
  height: 16,
  border: "1px solid #30404d",
}));

const BpCheckedIcon = styled("span")(({ theme }) => ({
  backgroundColor: "#101010",
  borderRadius: 3,
  "&:before": {
    display: "block",
    width: 16,
    height: 16,
    backgroundImage:
      "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
      " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
      "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
    content: '""',
  },
}));
const AuthCheckBox = (props: RHFCheckboxProps) => (
  <RHFCheckbox
    checkBoxProps={{ checkedIcon: <BpCheckedIcon />, icon: <BpIcon /> }}
    sx={{ margin: 0, padding: 0, ...props.sx }}

    {...props}
  />
);

export default AuthCheckBox;
