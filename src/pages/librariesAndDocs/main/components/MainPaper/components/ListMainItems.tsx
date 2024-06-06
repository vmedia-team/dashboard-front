import { Grid } from "@mui/material";
import MainItem from "./MainItem";
import { LibrariesMainPageItemType } from "./MianItemsData";
import imgSrc1 from "../../../../../../assets/images/librariesAndDocs/lib1.png";
import imgSrc2 from "../../../../../../assets/images/librariesAndDocs/lib2.png";
import imgSrc3 from "../../../../../../assets/images/librariesAndDocs/lib3.png";
import imgSrc4 from "../../../../../../assets/images/librariesAndDocs/lib4.png";
import imgSrc5 from "../../../../../../assets/images/librariesAndDocs/lib5.png";
import imgSrc6 from "../../../../../../assets/images/librariesAndDocs/lib6.png";
import imgSrc7 from "../../../../../../assets/images/librariesAndDocs/lib7.png";
import imgSrc8 from "../../../../../../assets/images/librariesAndDocs/lib8.png";
import { useState } from "react";
import AddEditLibDialog from "../../Dialog";

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
    id: 190999,
    name: "اضافة فولدر / تعديل",
    type: 1,
    media: [{ original_url: imgSrc7 }],
    created_at: "",
    updated_at: "",
  };

  // TODO::declare and define component methods
  const handleClick = (item: LibrariesMainPageItemType | undefined) => {
    setClickedMainItem(item);
    console.log("Active Item::", item?.name);
    setOpenDialog(true);
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
      <AddEditLibDialog open={openDialog} setOpen={setOpenDialog} />
    </Grid>
  );
}
