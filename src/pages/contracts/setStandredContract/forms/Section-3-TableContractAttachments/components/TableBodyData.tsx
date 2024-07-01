import { Button, IconButton, TableBody, TableCell } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import PrintIcon from "@mui/icons-material/Print";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";

export default function TableBodyData() {
  return (
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
  );
}
