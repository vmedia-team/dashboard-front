import { BarChart, axisClasses } from "@mui/x-charts";
import { Box, IconButton, Stack, Typography, colors } from "@mui/material";
import ZoomInIcon from "@mui/icons-material/ZoomIn";

export default function WorkOrderStatistics() {
  // todo::declare and define component state and variables
  const chartSetting = {
    height: 160,
    width: 350,
    sx: {
      [`& .${axisClasses.directionY} .${axisClasses.label}`]: {
        transform: "translateX(-10px)",
      },
    },
  };

  // return component ui.
  return (
    <Box
      sx={{
        width: "30%",
        background: "linear-gradient(45deg, #cddae8, transparent)",
        minHeight: "200px",
        padding: "8px",
        borderRadius: "8px",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        justifyContent: "space-between",
      }}
    >
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Typography variant="body2" fontSize={16} fontWeight={900}>
          أوامر العمل
        </Typography>
        <IconButton color="primary">
          <ZoomInIcon />
        </IconButton>
      </Stack>
      <BarChart
        xAxis={[
          {
            id: "barCategories",
            data: ["الاصايل", "الهاجدية", "الانوار"],
            scaleType: "band",
          },
        ]}
        colors={["#F19B02", "#FFDA98"]}
        series={[
          {
            data: [2, 5, 3],
          },
        ]}
        {...chartSetting}
      />
    </Box>
  );
}
