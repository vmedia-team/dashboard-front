import { Box, Stack, Typography } from "@mui/material";
import folderImg from "../../../../../assets/images/librariesAndDocs/folder.png";
import { LibrariesMainPageItemType } from "../../../main/components/MainPaper/components/MianItemsData";
import SettingBtn from "./SettingBtn";
import { useContext } from "react";
import { LibraryDocumentionContext } from "../../context/LibraryDocumentionContext";
import { useNavigate } from "react-router-dom";
import { MainBreadCrumbContext } from "../../../../../layout/main-layout/BreadCrumbContext/BreadCrumbContext";

export default function NestedDirectoryItem(props: PropsType) {
  // TODO::declare and define state and variables
  const { handleAddNewTerm } = useContext(MainBreadCrumbContext);
  const {
    handleSetSelectedNestedDirectory,
    handleSetNestedDirectoryOpenDialog,
  } = useContext(LibraryDocumentionContext);
  const navigator = useNavigate();

  // todo::declare and define helper methods
  const handleEditDirectory = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    handleSetSelectedNestedDirectory(props.item);
    handleSetNestedDirectoryOpenDialog(true);
  };
  const handleClick = () => {
    handleSetSelectedNestedDirectory(props.item);
    handleAddNewTerm({
      title: props.item?.name ?? "",
      path: `/react/librariesAndDocs/${props.item?.id}`,
    });
    if (props.item?.id) {
      handleSetSelectedNestedDirectory(undefined)
      navigator(`/react/librariesAndDocs/${props.item?.id}`);
    }
  };

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
        onClick={handleClick}
      >
        {/* Edit Button */}
        <SettingBtn
          item={props.item}
          handleEditDirectory={handleEditDirectory}
        />
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
      <Typography variant="body2" fontSize={18} textAlign={"center"}>
        {props.item.name}
      </Typography>
    </Stack>
  );
}

type PropsType = {
  item: LibrariesMainPageItemType;
};
