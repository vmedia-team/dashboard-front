import { Box, IconButton, Stack, Typography } from "@mui/material";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { LibrariesMainPageMainItemType } from "./MianItemsData";
import "./styles.scss";

export default function MainItem(props: PropsType) {
  return (
    <Stack justifyContent={"center"} alignItems={"center"} className="fadeInUp">
      <Stack
        sx={{
          bgcolor: "#92AFCF",
          width: "150px",
          height: "150px",
          borderRadius: "12px",
          position: "relative",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
          transition: "all 0.5s ease",
          ":hover": {
            boxShadow: "2px 2px 4px 4px lightgray",
            transform: "scale(1.1)",
          },
        }}
      >
        {/* Edit Button */}
        <IconButton
          size="small"
          sx={{
            color: "#fff",
            position: "absolute",
            top: "5%",
            right: "5%",
          }}
        >
          <SettingsOutlinedIcon />
        </IconButton>
        {/* Type public or private */}
        <Box
          sx={{
            position: "absolute",
            top: "10%",
            left: "0%",
            bgcolor: props.item.isPublic ? "#fff" : "#004693 ",
            color: props.item.isPublic ? "#000" : "#fff",
            borderRadius: " 0 12px 12px 0",
            padding: "1px",
            boxShadow: "0px 1px 4px 2px lightgray",
          }}
        >
          {props.item.isPublic ? "علني" : "مخصص"}
        </Box>
        <img
          src={props.item.imgSrc}
          width={92}
          height={92}
          alt="libraries and docs"
        />
      </Stack>
      <Typography variant="body2" fontSize={18} textAlign={"center"} my={2}>
        {props.item.text}
      </Typography>
    </Stack>
  );
}

type PropsType = {
  item: LibrariesMainPageMainItemType;
};
