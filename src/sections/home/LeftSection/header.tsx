import {
  ClickAwayListener,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import useToggle from "../../../hooks/useToggle";
import { useEffect, useState } from "react";
import useForecast from "../../../hooks/useForecast";

const Header = () => {
  return (
    <div className="flex flex-row items-center w-full">
      <Search />
      <div className="ml-auto">
        <Day />
      </div>
    </div>
  );
};
const Day = () => {
  const [value, setValue] = useState("1"); // Initial value set to 1

  return (
    <Select
      sx={{ color: "#101010", fontSize: 28 }}
      value={value}
      defaultValue={"1"}
      onChange={(event) => setValue(event.target.value)}
    >
      {[...Array(14)].map((_, index) => (
        <MenuItem key={index + 1} value={index + 1}>
          {index + 1}
        </MenuItem>
      ))}
    </Select>
  );
};
const Search = () => {
  const { q, days, search } = useForecast();
  const [query, setQuery] = useState("");
  const { toggle: isSearch, onOpen, onClose } = useToggle();
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      onClose();
      search(query, days.toString());
    }
  };
  useEffect(() => {
    setQuery(q);
  }, [q]);

  if (isSearch)
    return (
      <ClickAwayListener onClickAway={onClose}>
        <div>
          <TextField
            sx={{
              "& .MuiInputBase-root": {
                fontSize: 28,
                borderRadius: "8px",
                borderWidth: 1,
                borderColor: "#1d1d1d",
                "& > input": {
                  color: "#101010",
                },
              },
            }}
            name="query"
            value={query}
            onKeyDown={handleKeyDown}
            onChange={(e) => setQuery(e.currentTarget.value)}
          />
        </div>
      </ClickAwayListener>
    );
  return (
    <div className="cursor-pointer" onClick={onOpen}>
      <Typography
        sx={{
          fontSize: 28,
          fontWeight: 600,
          color: "#101010",
        }}
      >
        {q}
      </Typography>
    </div>
  );
};

export default Header;