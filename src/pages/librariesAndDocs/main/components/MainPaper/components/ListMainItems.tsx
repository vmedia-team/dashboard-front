import { Grid } from "@mui/material";
import MainItem from "./MainItem";
import { LibrariesMainPageItemType } from "./MianItemsData";
import imgSrc7 from "../../../../../../assets/images/librariesAndDocs/lib7.png";
import { useContext, useEffect, useState } from "react";
import AddEditLibDialog from "../../Dialog";
import { LibraryMainPageContext } from "../../../context/LibraryMainPageContext";
import { useNavigate } from "react-router-dom";

export default function ListMainItems() {
  // TODO::declare and define component state and variables
  const navigator = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const { mainPageItems } = useContext(LibraryMainPageContext);
  const [clickedMainItem, setClickedMainItem] = useState<
    LibrariesMainPageItemType | undefined
  >();
  const addDirectoryItem: LibrariesMainPageItemType = {
    id: "add_new_directory_113",
    name: "اضافة فولدر / تعديل",
    type: 1,
    media: [{ original_url: imgSrc7 }],
    created_at: "",
    updated_at: "",
  };

  // TODO::declare and define component methods
  const handleClick = (
    item: LibrariesMainPageItemType | undefined,
    editMode?: boolean
  ) => {
    setClickedMainItem(item);
    console.log("Active Item::", item);
    if (item?.id == "add_new_directory_113" || editMode) {
      //create new directory or edit existting one.
      setOpenDialog(true);
    } else {
      //navigate to specific page
      switch (item?.id) {
        case 1: //'مستندات المكاتب'
          navigator(`/react/librariesAndDocs/librariesDocs`);
          break;
      }
    }
  };

  const GridItem = ({ item }: { item: LibrariesMainPageItemType }) => {
    return (
      <Grid item xs={3}>
        <MainItem item={item} handleClick={handleClick} />
      </Grid>
    );
  };

  // * Return Component Ui.
  return (
    <Grid container>
      {mainPageItems.map((item) => (
        <GridItem key={item.id} item={item} />
      ))}
      <GridItem item={addDirectoryItem} />
      <AddEditLibDialog
        open={openDialog}
        clickedMainItem={clickedMainItem}
        setOpen={setOpenDialog}
      />
    </Grid>
  );
}
