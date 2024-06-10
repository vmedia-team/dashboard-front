import { Stack } from "@mui/material";
import "./index.scss";
export default function LibrariesLoading() {
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
