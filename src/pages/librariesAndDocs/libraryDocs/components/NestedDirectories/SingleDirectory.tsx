import { Box, Checkbox, IconButton, Stack, Typography } from "@mui/material";
import folderImg from "../../../../../assets/images/librariesAndDocs/folder.png";
import { LibrariesMainPageItemType } from "../../../main/components/MainPaper/components/MianItemsData";

export default function NestedDirectoryItem(props: PropsType) {
  // TODO::declare and define state and variables
  // todo::declare and define helper methods

  // *return our component ui.
  return (
    <Stack justifyContent={"center"} alignItems={"center"}>
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
          m: 2,
        }}
        onClick={() => {
          console.log("Nested Directory clicked");
        }}
      >
        {/* Edit Button */}
        {/* Type public or private */}
        <Box
          sx={{
            position: "absolute",
            top: "10%",
            left: "0%",
            bgcolor: props.item.type == 1 ? "#fff" : "#004693 ",
            color: props.item.type == 1 ? "#000" : "#fff",
            borderRadius: " 0 12px 12px 0",
            padding: "1px",
            boxShadow: "0px 1px 4px 2px lightgray",
          }}
        >
          {props.item.type == 1 ? "علني" : "مخصص"}
        </Box>
        <img
          src={props.item?.media?.[0]?.original_url ?? folderImg}
          width={!props.item?.media?.[0]?.original_url ? 120 : 92}
          height={!props.item?.media?.[0]?.original_url ? 120 : 92}
          alt={`icon for ${props.item.name}`}
        />
      </Stack>
      <Typography variant="body2" fontSize={18} textAlign={"center"}>
        {props.item.name}
      </Typography>
    </Stack>
  );
}

type PropsType = {
  item: LibrariesMainPageItemType;
};
