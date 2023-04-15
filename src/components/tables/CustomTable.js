import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { capitalizeFistLetter } from '@/utils/helpers';

const headersStyle = {
  fontWeight: 'bold',
  fontSize: '1em'
}

export default function CustomTable({ data, showActions, handleEdit, handleDelete }) {
  // Get data from props and extract the keys into an array
  const columns = Object.keys(data[0])
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangePageRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };



  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              {columns?.map(column =>
                <TableCell key={column} sx={headersStyle}>
                  {capitalizeFistLetter(column)}
                </TableCell>
              )}
              {showActions && <TableCell sx={headersStyle}>Actions</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((row) => (
              <TableRow key={row.id}>
                {columns?.map((column) => (
                  <TableCell key={`${row.id}-${column}`}>
                    {column === 'price' && '$ '}{row[column]}
                  </TableCell>
                ))}
                {showActions &&
                  <TableCell>
                    <IconButton onClick={() => handleEdit(row)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(row)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                }
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}