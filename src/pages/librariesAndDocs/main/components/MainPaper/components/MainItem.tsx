import { Box, Checkbox, IconButton, Stack, Typography } from "@mui/material";
import { LibrariesMainPageItemType } from "./MianItemsData";
import folderImg from "../../../../../../assets/images/librariesAndDocs/folder.png";
import SettingBtn from "./SettingBtn";
import { useContext } from "react";
import { LibraryMainPageContext } from "../../../context/LibraryMainPageContext";

export default function MainItem(props: PropsType) {
  // TODO::declare and define state and variables
  const {
    toggleDirectoryIdFormSelectedDirectories,
    checkedDirectoryIdInSelectedDirectories,
  } = useContext(LibraryMainPageContext);
  // todo::declare and define helper methods
  const handleEditDirectory = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    props.handleClick(props.item, true);
  };

  // *return our component ui.
  return (
    <Stack justifyContent={"center"} alignItems={"center"}>
      <Checkbox
        checked={checkedDirectoryIdInSelectedDirectories(+props.item.id)}
        onChange={() =>
          toggleDirectoryIdFormSelectedDirectories(+props.item.id)
        }
        sx={{
          alignSelf: "start",
          px: 3,
          display: props.item.id != "add_new_directory_113" ? "block" : "none",
        }}
      />
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
          mt: props.item.id != "add_new_directory_113" ? 0 : 6.5,
          transition: "all 0.2s ease-in-out",
          ":hover": {
            boxShadow: "2px 2px 4px 4px lightgray",
            transform: "scale(1.1)",
          },
        }}
        onClick={() => props.handleClick(props.item)}
      >
        {/* Edit Button */}
        {props.item.id != "add_new_directory_113" && (
          <SettingBtn
            handleEditDirectory={handleEditDirectory}
            item={props.item}
          />
        )}
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
          {props.item.type == 1 ? "عامة" : "خاصة"}
        </Box>
        <img
          src={props.item?.media?.[0]?.original_url ?? folderImg}
          width={!props.item?.media?.[0]?.original_url ? 120 : 92}
          height={!props.item?.media?.[0]?.original_url ? 120 : 92}
          alt={`icon for ${props.item.name}`}
        />
      </Stack>
      <Typography variant="body2" fontSize={18} textAlign={"center"} my={2}>
        {props.item.name}
      </Typography>
    </Stack>
  );
}

type PropsType = {
  item: LibrariesMainPageItemType;
  handleClick: (
    item: LibrariesMainPageItemType | undefined,
    editMode?: boolean
  ) => void;
};
