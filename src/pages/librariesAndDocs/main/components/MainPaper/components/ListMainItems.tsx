import { Grid } from "@mui/material";
import MainItem from "./MainItem";
import { LibrariesMainPageItemType } from "./MianItemsData";
import imgSrc7 from "../../../../../../assets/images/librariesAndDocs/lib7.png";
import { useEffect, useState } from "react";
import AddEditLibDialog from "../../Dialog";
import axios from "axios";
import { Api } from "../../../../../../constants";

export default function ListMainItems() {
  // TODO::declare and define component state and variables
  const [openDialog, setOpenDialog] = useState(false);
  const [clickedMainItem, setClickedMainItem] = useState<
    LibrariesMainPageItemType | undefined
  >();
  const [mainPageItems, setMainPageItems] = useState<
    LibrariesMainPageItemType[]
  >([]);
  const addDirectoryItem: LibrariesMainPageItemType = {
    id: "add_new_directory_113",
    name: "اضافة فولدر / تعديل",
    type: 1,
    media: [{ original_url: imgSrc7 }],
    created_at: "",
    updated_at: "",
  };

  // TODO::fetch directories data from server
  useEffect(() => {
    axios
      .get<{ folders: LibrariesMainPageItemType[] }>(
        Api(`employee/library/folder`)
      )
      .then((response) => {
        setMainPageItems(response.data.folders);
      })
      .catch((err) => {
        console.log("Error in fetch directories data::", err);
      });
  }, []);

  // TODO::declare and define component methods
  const handleClick = (item: LibrariesMainPageItemType | undefined) => {
    setClickedMainItem(item);
    console.log("Active Item::", item);
    switch (item?.id) {
      case "add_new_directory_113":
        //create new directory.
        setOpenDialog(true);
        break;
      default:
        //edit or open
        break;
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
        setOpen={setOpenDialog}
        setMainPageItems={setMainPageItems}
      />
    </Grid>
  );
}
