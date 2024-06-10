import { Stack } from "@mui/material";
import "./SearchLoading.scss";
export default function SearchLoading() {
  return (
    <Stack
      spacing={2}
      width={"100%"}
      justifyContent={"center"}
      alignItems={"center"}
      height={300}
    >
      <div className="libraryLoader"></div>
      <div className="libraryTextloader"></div>
    </Stack>
  );
}
