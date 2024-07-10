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
    <div className="flex flex-row gap-1 items-center w-full">
      <Search />
      <Day />
    </div>
  );
};
export const Day = () => {
  const { toggle, onOpen, onClose } = useToggle();
  const { search, days, q } = useForecast();
  if (toggle)
    return (
      <div>
        <Select
          sx={{ color: "#101010", fontSize: 28 }}
          value={days}
          onChange={(event) => {
            search(q, event.target.value);
            onClose();
          }}
        >
          {[...Array(14)].map((_, index) => (
            <MenuItem key={index + 1} value={index + 1}>
              {index + 1}
            </MenuItem>
          ))}
        </Select>
      </div>
    );
  return (
    <div onClick={onOpen} className="cursor-pointer">
      <Typography sx={{ fontSize: 28, fontWeight: 300, color: "#101010" }}>
        {Number(days) > 1 ? (
          <>
            for the next{" "}
            <span className="font-[600]">{days}</span> days
          </>
        ) : (
          "today"
        )}
      </Typography>
    </div>
  );
};
export const Search = () => {
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
          fontWeight: 300,
          color: "#101010",
        }}
      >
        Weather in <span className="font-[600]">{q}</span>
      </Typography>
    </div>
  );
};

export default Header;
