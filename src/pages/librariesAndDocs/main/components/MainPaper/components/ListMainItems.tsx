import { Grid } from "@mui/material";
import MainItem from "./MainItem";
import { LibrariesMainPageMainItemType } from "./MianItemsData";
import imgSrc1 from "../../../../../../assets/images/librariesAndDocs/lib1.png";
import imgSrc2 from "../../../../../../assets/images/librariesAndDocs/lib2.png";
import imgSrc3 from "../../../../../../assets/images/librariesAndDocs/lib3.png";
import imgSrc4 from "../../../../../../assets/images/librariesAndDocs/lib4.png";
import imgSrc5 from "../../../../../../assets/images/librariesAndDocs/lib5.png";
import imgSrc6 from "../../../../../../assets/images/librariesAndDocs/lib6.png";
import imgSrc7 from "../../../../../../assets/images/librariesAndDocs/lib7.png";
import imgSrc8 from "../../../../../../assets/images/librariesAndDocs/lib8.png";

export default function ListMainItems() {
  // TODO::declare and define component state and variables
  // TODO::declare and define component methods
  const GridItem = ({ item }: { item: LibrariesMainPageMainItemType }) => {
    return (
      <Grid item xs={3}>
        <MainItem item={item} />
      </Grid>
    );
  };
  // * Return Component Ui.
  return (
    <Grid container>
      {MainItemsDataList.map((item) => (
        <GridItem key={item.id} item={item} />
      ))}
    </Grid>
  );
}

export const MainItemsDataList: LibrariesMainPageMainItemType[] = [
  { id: "LMI-1", text: "مستندات المكاتب", isPublic: true, imgSrc: imgSrc1 },
  { id: "LMI-2", text: "عروض اسعار", isPublic: true, imgSrc: imgSrc2 },
  { id: "LMI-3", text: "عقود", isPublic: false, imgSrc: imgSrc3 },
  { id: "LMI-4", text: "خطابات", isPublic: false, imgSrc: imgSrc4 },
  { id: "LMI-5", text: "مستندات الموظفين", isPublic: true, imgSrc: imgSrc5 },
  { id: "LMI-6", text: "المشاريع", isPublic: true, imgSrc: imgSrc6 },
  { id: "LMI-7", text: "اضافة ملف / تعديل", isPublic: true, imgSrc: imgSrc7 },
  { id: "LMI-8", text: "ملفات خاصة", isPublic: true, imgSrc: imgSrc8 },
];
