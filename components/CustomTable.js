import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function capitalizeFistLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}


export default function CustomTable({ data }) {
  // Get data from props and extract the keys into an array
  const columns = Object.keys(data[0])
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            {columns?.map(column =>
              <TableCell key={column} sx={{ fontWeight: 'bold' }}>
                {capitalizeFistLetter(column)}
              </TableCell>
            )}
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}