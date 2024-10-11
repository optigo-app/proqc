import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';
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


const columns = [
  { field: 'srNo', headerName: 'Sr#', width: 80 },
  { field: 'date', headerName: 'Date', width: 150 },
  { field: 'bagPrepBy', headerName: 'BagPrepBy', width: 150 },
  { field: 'employee', headerName: 'Employee', width: 150 },
  { field: 'dept', headerName: 'Dept', width: 150 },
  { field: 'customer', headerName: 'Customer', width: 150 },
  { field: 'item', headerName: 'Item', width: 150 },
  { field: 'mType', headerName: 'M.Type', width: 100 },
  { field: 'shape', headerName: 'Shape', width: 100 },
  { field: 'clarity', headerName: 'Clarity', width: 100 },
  { field: 'color', headerName: 'Color', width: 100 },
  { field: 'size', headerName: 'Size', width: 100 },
  { field: 'issPcs', headerName: 'IssPCs', width: 100 },
  { field: 'retPcs', headerName: 'RetPCs', width: 100 },
  { field: 'issue', headerName: 'Issue', width: 100 },
  { field: 'return', headerName: 'Return', width: 100 },
  { field: 'lost', headerName: 'Lost', width: 100 },
  { field: 'broken', headerName: 'Broken', width: 100 },
  { field: 'receive', headerName: 'Receive', width: 100 },
  { field: 'description', headerName: 'Description', width: 200 },
  { field: 'view', headerName: 'View', width: 100, renderCell: () => <span>🔍</span> },
];


const rows = [
  { id: 1, srNo: 1, date: '08 Oct 2024', bagPrepBy: 'transaction...', employee: 'Filing', dept: 'Filing', customer: '', item: '', mType: '', shape: '', clarity: '', color: '', size: '', issPcs: 0, retPcs: 0, issue: 4.000, return: 0.000, lost: 0.000, broken: 0.000, receive: 0.000, description: '', view: '' },
  { id: 2, srNo: 2, date: '08 Oct 2024', bagPrepBy: 'transaction...', employee: 'Melting', dept: 'Melting', customer: '', item: 'METAL', mType: 'GOLD', shape: 'GOLD', clarity: '18K', color: 'P', size: '', issPcs: 0, retPcs: 0, issue: 4.000, return: 0.000, lost: 0.000, broken: 0.000, receive: 4.000, description: 'From: 0000009866', view: '' },

];

export default function DetailsTable() {
  return (
    <div className="w-full bg-white h-[40vh] overflow-auto">
   
   <ThemeProvider theme={theme}>
   <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
        sx={{
          height: '100%',  
          '& .MuiDataGrid-row:hover': {
            backgroundColor: '#f8f8f8',
          },
        }}
      />
   </ThemeProvider>
      
    </div>
  );
}


