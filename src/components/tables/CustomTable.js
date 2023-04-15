import * as React from 'react';
import { useState } from 'react';
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
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CheckIcon from '@mui/icons-material/Check';
import { capitalizeFistLetter } from '@/utils/helpers';
import { TextField } from '@mui/material';

const headersStyle = {
  fontWeight: 'bold',
  fontSize: '1em'
}

export default function CustomTable({ data,
  deleteAction,
  editAction,
  addAction,
  inventoryActions,
  handleEdit,
  handleDelete,
  handleAdd,
  handleIncrement,
  handleDecrement,
  handleQuantityChange,
  handleConsolidateInventory,
}) {
  // Get data from props and extract the keys into an array
  const columns = Object.keys(data[0])
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangePageRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      {addAction && (
        <div style={{ textAlign: 'right', width: '100%', padding: '0.5rem' }}>
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="label"
            onClick={() => handleAdd()}
            style={{ outline: 'auto' }}
          >
            <AddIcon style={{ fontSize: '30' }} />
          </IconButton>
        </div>
      )}
      {inventoryActions && (
        <div style={{ textAlign: 'right', width: '100%', padding: '0.5rem' }}>
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="label"
            onClick={() => handleConsolidateInventory()}
            style={{ outline: 'auto' }}
          >
            <CheckIcon style={{ fontSize: '30' }} />
          </IconButton>
        </div>
      )}
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: '55vh' }}>
          <Table stickyHeader sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                {columns?.map(column =>
                  <TableCell key={column} sx={headersStyle}>
                    {capitalizeFistLetter(column)}
                  </TableCell>
                )}
                {(editAction || deleteAction || inventoryActions) && <TableCell sx={headersStyle}>Actions</TableCell>}
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
                  {(deleteAction || editAction) &&
                    <TableCell>
                      <IconButton onClick={() => handleEdit(row)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(row)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  }
                  {inventoryActions &&
                    <TableCell>
                      <IconButton onClick={() => handleIncrement(row)}>
                        <AddIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDecrement(row)}>
                        <RemoveIcon />
                      </IconButton>
                      <TextField
                        id="standard-basic"
                        label="Quantity"
                        type="number"
                        size='small'
                        sx={{ width: '100px' }}
                        inputProps={{ min: 0 }}
                        onKeyUp={(e) => { if (e.target.value < 0) e.target.value = null }}
                        onChange={(e) => handleQuantityChange(e.target.value)}
                      />
                    </TableCell>
                  }
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
}