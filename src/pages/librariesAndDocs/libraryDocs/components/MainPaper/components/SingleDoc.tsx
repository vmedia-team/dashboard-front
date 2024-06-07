import { Box, Stack, Typography } from "@mui/material";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import fileImg from "../../../../../../assets/images/fileImg.png";
import { Checkbox } from "@mui/material";
import { DocumentationFileType } from "../../../../../../types/librariesAndDocs/DocumentationFile";

export default function SingleDoc(props: PropsType) {
  return (
    <Stack
      spacing={1}
      alignItems={"center"}
      sx={{ p: 3, position: "relative", cursor: "pointer" }}
    >
      {/* checkbox */}
      <Checkbox
        sx={{
          position: "absolute",
          top: "5%",
          left: "5%",
        }}
      />
      {/* doc info */}
      <img src={fileImg} width={80} height={80} alt="file name" />
      <Typography variant="body1">{props.file?.name}</Typography>
      <Typography variant="body1" color={"error"}>
        {props.file?.reference_number}
      </Typography>
      <Stack
        direction={"row"}
        justifyContent={"space-around"}
        alignItems={"center"}
      >
        <CalendarMonthOutlinedIcon />
        <Typography variant="body2">{props.file?.end_date}</Typography>
      </Stack>
      <Box bgcolor={"#D2DCEA"}>عدد التحميل : 22</Box>
    </Stack>
  );
}

type PropsType = {
  file: DocumentationFileType;
};
