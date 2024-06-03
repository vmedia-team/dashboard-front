import { Button, Stack } from "@mui/material";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";

export default function BranchesBtns() {
  return (
    <Stack
      direction={"row"}
      justifyContent={"space-between"}
      alignItems={"center"}
      mt={3}
    >
      <Stack direction={"row"} spacing={2}>
        <Button
          variant="text"
          sx={{
            fontWeight: 600,
            bgcolor: "none",
            color: "text.secondary",
          }}
        >
          الكل
        </Button>
        <Button
          variant="text"
          sx={{
            fontWeight: 600,
            bgcolor: "background.paper",
            color: "primary.main",
            borderRadius: 0,
          }}
        >
          فرع مكة
        </Button>
        <Button
          variant="text"
          sx={{
            fontWeight: 600,
            bgcolor: "none",
            color: "text.secondary",
          }}
        >
          فرع جدة
        </Button>
        <Button
          variant="text"
          sx={{
            fontWeight: 600,
            bgcolor: "none",
            color: "text.secondary",
          }}
        >
          فرع الرياض
        </Button>
        <Button
          variant="text"
          sx={{
            fontWeight: 600,
            color: "text.secondary",
            bgcolor: "none",
          }}
        >
          فرع القاهرة
        </Button>
      </Stack>
      {/* create documentation btn */}
      <Button
        variant="contained"
        startIcon={<AddBoxOutlinedIcon />}
        sx={{
          fontWeight: 600,
        }}
      >
        أنشاء
      </Button>
    </Stack>
  );
}
