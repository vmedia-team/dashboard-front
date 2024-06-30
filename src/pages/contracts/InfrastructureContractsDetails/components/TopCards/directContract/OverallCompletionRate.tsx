import { Box, Button, CircularProgress, Grid, Typography } from "@mui/material";
import { useUser } from "../../../../../../contexts/user/user";
import { Contract } from "../../../../../../types";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import DoneAndReminder from "../../DoneAndReminder";
import { useState } from "react";

export default function OverallCompletionRate(props: PropsType) {
  // todo::declare and define component state and variables
  const { user } = useUser();
  let { contract, setOpenDialog } = props;
  // todo::declare and define helper methods
  // todo::return component ui.
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
      }}
    >
      <Typography
        variant="body1"
        fontSize={15}
        fontWeight={700}
        marginBottom={1}
      >
        نسب الانجاز الكلية
      </Typography>
      {user?.employee_id === contract?.employee_id && (
        <Button
          sx={{
            bgcolor: "#fff",
            position: "absolute",
            right: "5%",
            boxShadow: "1px 1px 2px 2px lightgray",
            transition: "all 0.5 ease-in-out",
            ":hover": {
              color: "#fff",
              bgcolor: "primary.main",
              transform: "scale(1.056)",
            },
          }}
          startIcon={<SettingsOutlinedIcon />}
          onClick={() => setOpenDialog(true)}
        >
          تعديل
        </Button>
      )}
      <Grid container sx={{ paddingBottom: "1rem" }}>
        <Grid item xs={4}>
          <DoneAndReminder column={true} />
        </Grid>
        <Grid item xs={8} sx={{ marginTop: "3.4rem" }}>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "start",
              position: "relative",
              paddingX: "1rem",
            }}
            className="RatioCircularProgress"
          >
            <CircularProgress
              style={{ width: "90px" }}
              variant="determinate"
              color={"warning"}
              value={contract?.achievement_percentage}
            />
            <Typography
              sx={{
                position: "absolute",
                fontSize: "18px",
                fontWeight: 900,
                top: "8px",
              }}
              color={"warning"}
              variant="body2"
            >
              {contract?.achievement_percentage}%
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

type PropsType = {
  contract: Contract | undefined;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
};
