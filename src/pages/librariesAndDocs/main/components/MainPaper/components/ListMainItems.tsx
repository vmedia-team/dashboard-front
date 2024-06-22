import { Grid } from "@mui/material";
import MainItem from "./MainItem";
import { LibrariesMainPageItemType } from "./MianItemsData";
import imgSrc7 from "../../../../../../assets/images/librariesAndDocs/lib7.png";
import { useContext, useEffect, useState } from "react";
import AddEditLibDialog from "../../Dialog";
import { LibraryMainPageContext } from "../../../context/LibraryMainPageContext";
import { useNavigate } from "react-router-dom";
import LibrariesLoading from "../../loading";
import "./styles.scss";
import SearchByFileNameAndRefNum from "./SearchByFileNameAndRefNum";
import SearchLoading from "../../loading/SearchLoading";

export default function ListMainItems() {
  // TODO::declare and define component state and variables
  const navigator = useNavigate();
  const [loading, setLoading] = useState(false);
  const {
    mainPageItems,
    searchInfiles,
    searchState,
    openEditDialog,
    handleSetOpenEditDialog,
    handleSetSelectedDirectoryToEdit,
  } = useContext(LibraryMainPageContext);
  const addDirectoryItem: LibrariesMainPageItemType = {
    id: "add_new_directory_113",
    name: "اضافة/تعديل مجلد",
    type: 1,
    files_count: 0,
    is_deletable: 0,
    media: [{ original_url: imgSrc7 }],
    created_at: "",
    updated_at: "",
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2500);
  }, []);
  // TODO::declare and define component methods
  const handleClick = (
    item: LibrariesMainPageItemType | undefined,
    editMode?: boolean
  ) => {
    handleSetSelectedDirectoryToEdit(item);
    if (item?.id == "add_new_directory_113" || editMode) {
      //create new directory or edit existting one.
      handleSetOpenEditDialog(true);
    } else {
      //navigate to specific page
      if (item?.id) navigator(`/react/librariesAndDocs/${item?.id}`);
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
    <Grid container className="fadeInUp">
      {/* case::loading data when page is open */}
      {loading && <LibrariesLoading />}
      {!loading &&
        (searchInfiles ? (
          // screen when search by filename of refrance number
          <SearchByFileNameAndRefNum />
        ) : searchState ? (
          // search loading
          <SearchLoading />
        ) : (
          // data arrived
          <>
            {mainPageItems.map((item) => (
              <GridItem key={item.id} item={item} />
            ))}
            <GridItem item={addDirectoryItem} />
            <AddEditLibDialog open={openEditDialog} />
          </>
        ))}
    </Grid>
  );
}
