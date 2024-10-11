import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import '../../components/Scrollbar.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  components: {
    MuiDataGrid: {
      styleOverrides: {
        root: {
          border: 'none',
          backgroundColor: 'white',
          '& .MuiDataGrid-cell': {
            borderBottom: '1px solid #f4f5fa',
          },
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: '#f9fafc',
            color: '#6e6b7b',
            borderBottom: 'none',
          },
          '& .MuiDataGrid-virtualScroller': {
            '&::-webkit-scrollbar': {
              width: '5px',
              height: '5px',
            },
            '&::-webkit-scrollbar-track': {
              backgroundColor: '#F5F5F5',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: '#14121986',
              borderRadius: '6px',
            },
          },
        },
      },
    },
  },
});

const initialRows = [
  { id: 1, sr: 1, bagPrepBy: ' ', employee: 'm admin', dept: 'filing', item: 'METAL', mType: 'Mi-01', type: 'GOLD', quality: '22K', color: 'bright', size: '1mm', actualPcs: 0, actualUsed: 5.0, receive: 0.0, supplier: 'company' },
  { id: 2, sr: 2, bagPrepBy: ' ', employee: 'm admin', dept: 'Setting', item: 'MISC', mType: 'PRS', type: 'PD', quality: 'PD', color: 'PD', size: '2mm', actualPcs: 2, actualUsed: 2.0, receive: 0.0, supplier: 'company' },
  { id: 3, sr: 3, bagPrepBy: ' ', employee: 'm admin', dept: 'filing', item: 'FCHAIN', mType: 'GOLD', type: 'GOLD', quality: '22K', color: 'Yellow', size: '2', actualPcs: 2, actualUsed: 2.0, receive: 0.0, supplier: 'company' },
  { id: 4, sr: 4, bagPrepBy: ' ', employee: 'm admin', dept: 'filing', item: 'DIAMOND', mType: 'ASSCH', type: 'ASSCH', quality: 'flashy', color: 'blackgreen', size: 'Any', actualPcs: 2, actualUsed: 2.0, receive: 0.0, supplier: 'company' },
  { id: 5, sr: 5, bagPrepBy: ' ', employee: 'm admin', dept: 'filing', item: 'COLOR STONE', mType: 'CS-3-A', type: 'amethyst', quality: 'white coral', color: 'bluish', size: '6', actualPcs: 2, actualUsed: 2.0, receive: 0.0, supplier: 'company' },
  { id: 6, sr: 6, bagPrepBy: ' ', employee: 'm admin', dept: 'filing', item: 'COLOR STONE', mType: 'CS-3-A', type: 'amethyst', quality: 'white coral', color: 'bluish', size: '6', actualPcs: 2, actualUsed: 2.0, receive: 0.0, supplier: 'company' },
  { id: 7, sr: 7, bagPrepBy: ' ', employee: 'm admin', dept: 'filing', item: 'COLOR STONE', mType: 'CS-3-A', type: 'amethyst', quality: 'white coral', color: 'bluish', size: '6', actualPcs: 2, actualUsed: 2.0, receive: 0.0, supplier: 'company' },
  { id: 8, sr: 8, bagPrepBy: ' ', employee: 'm admin', dept: 'filing', item: 'COLOR STONE', mType: 'CS-3-A', type: 'amethyst', quality: 'white coral', color: 'bluish', size: '6', actualPcs: 2, actualUsed: 2.0, receive: 0.0, supplier: 'company' },
];

export default function SummaryTable() {
  const [rows, setRows] = React.useState(initialRows);
  const [open, setOpen] = React.useState(false);
  const [selectedId, setSelectedId] = React.useState(null);

  const handleClickOpen = (id) => {
    setSelectedId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleReturnAll = () => {
    setRows(rows.filter((row) => row.id !== selectedId));
    setOpen(false);
  };

  const columns: GridColDef[] = [
    { field: 'sr', headerName: 'Sr#', width: 50 },
    { field: 'bagPrepBy', headerName: 'BagPrepBy', width: 120 },
    { field: 'employee', headerName: 'Employee', width: 150 },
    { field: 'dept', headerName: 'Dept', width: 100 },
    { field: 'item', headerName: 'Item', width: 150 },
    { field: 'mType', headerName: 'M.Type', width: 100 },
    { field: 'type', headerName: 'Type', width: 100 },
    { field: 'quality', headerName: 'Quality', width: 100 },
    { field: 'color', headerName: 'Color', width: 120 },
    { field: 'size', headerName: 'Size', width: 80 },
    { field: 'actualPcs', headerName: 'Actual PCs', width: 100 },
    { field: 'actualUsed', headerName: 'Actual Used', width: 120 },
    { field: 'receive', headerName: 'Receive', width: 100 },
    { field: 'supplier', headerName: 'Supplier', width: 150 },
    {
      field: 'view',
      headerName: 'View',
      width: 100,
      renderCell: (params) => (
        <Tooltip
          title={
            <div className='text-black p-3'>
              <div className='text-lg w-full font-bold flex justify-center'>0000009866</div>
              <div className='grid grid-cols-2 gap-2'>
                <div className='text-base'>Return PCs:</div>
                <div className='text-base font-semibold'>0</div>
                <div className='text-base'>PCS:</div>
                <div className='text-base font-semibold'>0</div>
                <div className='text-base'>Used Gms:</div>
                <div className='text-base font-semibold'>2.000</div>
                <div className='text-base'>Act Gms Used:</div>
                <div className='text-base font-semibold'>2.000</div>
                <div className='text-base'>Return Gms:</div>
                <div className='text-base font-semibold'>0.000</div>
                <div className='text-base'>Broken Gms:</div>
                <div className='text-base font-semibold'>0.000</div>
                <div className='text-base'>Lost Gems:</div>
                <div className='text-base font-semibold'>0.000</div>
              </div>
            </div>
          }
          componentsProps={{
            tooltip: {
              sx: {
                backgroundColor: '#eef2ff',
                color: 'black',
                fontSize: '14px',
                padding: '10px',
                borderRadius: '8px',
              },
            },
          }}
        >
          <IconButton className="text-gray-600 hover:text-blue-600">
            <VisibilityIcon size={20} />
          </IconButton>
        </Tooltip>
      ),
    },
    {
      field: 'returnall',
      headerName: 'Return All',
      width: 150,
      renderCell: (params) => (
        <div className='text-blue-600 underline cursor-pointer' onClick={() => handleClickOpen(params.id)}>
          Return All
        </div>
      ),
    },
  ];

  return (
    <div className="w-full bg-white h-[40vh] overflow-auto">
      <ThemeProvider theme={theme}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
      </ThemeProvider>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirm Return All</DialogTitle>
        <DialogContent>
          Are you sure you want to return all items from this entry?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleReturnAll} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
