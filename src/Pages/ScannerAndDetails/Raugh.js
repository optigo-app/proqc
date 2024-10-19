import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { IoSwapHorizontal, IoMdReturnRight } from "react-icons/io5";

const initialRows = [
  { id: 1, sr: 1, employee: 'm admin', dept: 'filing', flag: 1 },
  { id: 2, sr: 2, employee: 'm admin', dept: 'setting', flag: 2 },
  { id: 3, sr: 3, employee: 'm admin', dept: 'filing', flag: 1 },
  { id: 4, sr: 4, employee: 'm admin', dept: 'filing', flag: 0 },
  // Other rows...
];

export default function SummaryTable({ unlock }) {
  const [rows, setRows] = useState(initialRows);
  const [open, setOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);

  const handleSelectionModelChange = (ids) => {
    setSelectedIds(ids);
  };

  const handleUnlockClick = () => {
    unlock(selectedIds); // Pass selected row IDs to the parent component's unlock function
  };

  const columns = [
    { field: 'sr', headerName: 'Sr#', width: 50 },
    { field: 'employee', headerName: 'Employee', width: 150 },
    { field: 'dept', headerName: 'Dept', width: 100 },
    {
      field: 'view',
      headerName: 'View',
      width: 80,
      renderCell: (params) => (
        <Tooltip title="View Details">
          <IconButton>
            <VisibilityIcon />
          </IconButton>
        </Tooltip>
      ),
    },
    {
      field: 'return',
      headerName: 'Return',
      width: 70,
      renderCell: (params) => (
        <IconButton>
          <IoMdReturnRight size={20} />
        </IconButton>
      ),
    },
  ];

  return (
    <div>
      <Button onClick={handleUnlockClick} variant="contained" color="primary">
        Unlock Selected Rows
      </Button>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        onSelectionModelChange={handleSelectionModelChange}
        getRowClassName={(params) => (params.row.flag === 1 ? 'flagged' : '')}
      />
    </div>
  );
}
