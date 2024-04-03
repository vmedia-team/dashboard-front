import {
  Badge,
  Box,
  Button,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import SouthIcon from "@mui/icons-material/South";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import PersonIcon from "@mui/icons-material/Person";
import EditIcon from "@mui/icons-material/Edit";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { MainPandBtns } from "./MainPand";
import TimeMapOfPanDialog from "./TimeMapOfPanDialog";
import { useState } from "react";
import NotificationList from "./NotificationsList";
import RoundedIconButton from "../../../../../../../components/RoundedIconButton";

export default function MainPandHeader(props: MainPandHeaderProps) {
  // define our variables
  const [openTimeMap, setOpenTimeMap] = useState(false);
  const [showNotificationsList, setShowNotificationsList] = useState(false);

  const handleBtnClick = (val: MainPandBtns) => {
    props.setActiveBtn(val);
    switch (val) {
      case MainPandBtns.LOCATION:
        setOpenTimeMap(true);
        break;
      case MainPandBtns.NOTIFICATIONS:
        setShowNotificationsList(!showNotificationsList);
        break;
      default:
        setOpenTimeMap(false);
    }
  };

  return (
    <>
      <Grid
        container
        borderRadius={"12px"}
        padding={2}
        marginY={2}
        bgcolor={`background.med`}
      >
        <Grid
          item
          xs={4}
          display="flex"
          alignItems="center"
          sx={{ cursor: "pointer" }}
          onClick={() => props.setExpended(!props.expended)}
        >
          {/* Icon */}
          {!props.expended ? (
            <KeyboardBackspaceIcon
              sx={{
                bgcolor: `primary.main`,
                color: `#fff`,
                borderRadius: "50%",
                fontSize: "1rem",
              }}
            />
          ) : (
            <SouthIcon
              sx={{
                bgcolor: `primary.main`,
                color: `#fff`,
                borderRadius: "50%",
                fontSize: "1rem",
              }}
            />
          )}
          {/* Pand Name */}
          <Box paddingLeft={2}>
            <Typography variant="h6" fontWeight={700}>
              {props.name}
            </Typography>
            <Typography variant="body2" color={"#077BB5"}>
              عدد البنود الفرعية : {props.numberOfSubItems}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box
            display={"flex"}
            justifyContent={"space-around"}
            alignItems={"cneter"}
          >
            {/* المسؤول */}
            <Box>
              <Typography variant="body2" fontSize={"13px"} color={`#A7A7A7`}>
                المسؤول
              </Typography>
              <Typography variant="body2" fontSize={"17px"} fontWeight={600}>
                {props.managerName}
              </Typography>
            </Box>
            {/* تاريخ الانتهاء */}
            <Box>
              <Typography variant="body2" fontSize={"13px"} color={`#A7A7A7`}>
                تاريخ الانتهاء
              </Typography>
              <Typography variant="body2" fontSize={"17px"} fontWeight={600}>
                {props.endDate
                  ? new Date(props.endDate).toLocaleDateString()
                  : ""}
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={4}
          paddingTop={1}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"cneter"}
        >
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-around"}
            width={"70%"}
          >
            <RoundedIconButton
              onClick={() => handleBtnClick(MainPandBtns.LOCATION)}
              color="secondary"
            >
              <LocationOnIcon />
            </RoundedIconButton>
            <RoundedIconButton
              onClick={() => handleBtnClick(MainPandBtns.PRINTER)}
            >
              <LocalPrintshopIcon />
            </RoundedIconButton>
            <RoundedIconButton
              onClick={() => handleBtnClick(MainPandBtns.ENGINEER)}
            >
              <PersonIcon />
            </RoundedIconButton>
            <RoundedIconButton
              onClick={() => handleBtnClick(MainPandBtns.EDIT)}
            >
              <EditIcon />
            </RoundedIconButton>
            <Tooltip title="تم التعديل بواسطة مهندس احمد" placement="top-start">
              <RoundedIconButton
                onClick={() => handleBtnClick(MainPandBtns.NOTIFICATIONS)}
              >
                {/* <LastNotification statment={"تم التعديل بواسطة مهندس احمد"} /> */}
                {showNotificationsList && <NotificationList />}
                <Badge badgeContent={4} color="error">
                  <NotificationsIcon />
                </Badge>
              </RoundedIconButton>
            </Tooltip>
          </Box>
        </Grid>
      </Grid>
      <TimeMapOfPanDialog
        startDate={props.startDate}
        endDate={props.startDate}
        open={openTimeMap}
        setOpen={setOpenTimeMap}
      />
    </>
  );
}

type MainPandHeaderProps = {
  expended: boolean;
  setExpended: React.Dispatch<React.SetStateAction<boolean>>;
  activeBtn: MainPandBtns;
  setActiveBtn: React.Dispatch<React.SetStateAction<MainPandBtns>>;
  name: string;
  numberOfSubItems: number;
  managerName: string;
  endDate: string;
  startDate: string;
};
