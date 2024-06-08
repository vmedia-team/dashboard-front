import { Box, Stack, Typography } from "@mui/material";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";

export default function SearchByFileNameAndRefNum() {
  return (
    <Stack spacing={1} width={"100%"}>
      <Stack
        direction={"row"}
        sx={{
          textDecoration: "underline",
          cursor: "pointer",
          borderBottom: "2px solid orange",
          padding: 1,
          width: "100%",
        }}
      >
        <InsertDriveFileOutlinedIcon sx={{ fontSize: 25 }} />
        <Typography variant="body2" fontSize={18} fontWeight={500}>
          مجلد1 / ملف 101
        </Typography>
      </Stack>
    </Stack>
  );
}
