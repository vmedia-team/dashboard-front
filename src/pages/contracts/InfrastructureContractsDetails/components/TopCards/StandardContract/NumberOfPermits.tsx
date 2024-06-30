import { Box, Stack, Typography } from "@mui/material";

export default function NumberOfPermits() {
  return (
    <Box
      sx={{
        width: "15%",
        background: "linear-gradient(-45deg, #cddae8, transparent)",
        minHeight: "200px",
        padding: "8px",
        borderRadius: "8px",
      }}
    >
      <Typography
        variant="body1"
        fontSize={16}
        fontWeight={700}
        marginBottom={1}
        textAlign={"center"}
      >
        عدد التصاريح
      </Typography>
      <Stack
        justifyContent={"center"}
        alignItems={"center"}
        width={"100%"}
        mt={2}
      >
        <Stack
          sx={{
            width: "95.04px",
            height: "94.69px",
            bgcolor: "#fff",
            borderRadius: "50%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            variant="body1"
            fontWeight={900}
            fontSize={18}
            color="#f2a110"
          >
            900
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
}
