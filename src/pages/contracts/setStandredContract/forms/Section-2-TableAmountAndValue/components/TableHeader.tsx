import { TableCell, TableHead, TableRow } from "@mui/material";

export default function TableHeaders() {
  return (
    <TableHead>
      <TableRow>
        <TableCell>كود البند</TableCell>
        <TableCell>وصف قصير للبند</TableCell>
        <TableCell>وصف طويل للبند</TableCell>
        <TableCell>نموذج العمل</TableCell>
        <TableCell>وحدة</TableCell>
        <TableCell>السعر</TableCell>
        <TableCell>القيمة</TableCell>
      </TableRow>
    </TableHead>
  );
}
