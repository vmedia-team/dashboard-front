import {
  Box,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import PrintIcon from "@mui/icons-material/Print";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import SetDialog from "./SetDialog";
function TableAttachmentContruct() {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "end" }}>
        <Button
          variant="contained"
          startIcon={<AddCircleOutlineIcon />}
          sx={{ mb: 1 }}
          onClick={() => setOpen(!open)}
        >
          اضافة مرفق
        </Button>
      </Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>كود البند</TableCell>
              <TableCell>اسم المرفق</TableCell>
              <TableCell>رقم المرفق</TableCell>
              <TableCell>نوع المرفق</TableCell>
              <TableCell>الملف المرفق</TableCell>
              <TableCell>الاعدادات</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell>
              <Button startIcon={<FolderOpenIcon />}>عرض الملف</Button>
            </TableCell>
            <TableCell>
              <IconButton size="small">
                <PrintIcon />
              </IconButton>
              <IconButton size="small">
                <EditIcon />
              </IconButton>
              <IconButton size="small" color="error">
                <DeleteIcon />
              </IconButton>
            </TableCell>
          </TableBody>
        </Table>
      </TableContainer>
      <SetDialog open={open} setOpen={setOpen} />
    </>
  );
}

export default TableAttachmentContruct;
