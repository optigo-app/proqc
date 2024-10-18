
import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
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

const columns =  [
  { field: 'sr', headerName: 'Sr#', width:  50},
  { field: 'date', headerName: 'Date', width: 80 },
  { field: 'bagPrepBy', headerName: 'BagPrepBy', width: 80 },
  // { field: 'employee', headerName: 'Employee', width: 80 },
  { field: 'dept', headerName: 'Dept', width: 80 },
  // { field: 'customer', headerName: 'Customer', width: 80 },
  { field: 'item', headerName: 'Item', width: 80 },
  { field: 'mType', headerName: 'M.Type', width: 80 },
  // { field: 'shape', headerName: 'Shape', width: 80 },
  // { field: 'clarity', headerName: 'Clarity', width: 80 },
  // { field: 'color', headerName: 'Color', width: 80 },
  // { field: 'size', headerName: 'Size', width: 80 },
  { field: 'issPCs', headerName: 'IssPCs', width: 70 },
  { field: 'rctPCs', headerName: 'RctPCs', width: 70 },
  { field: 'issue', headerName: 'Issue', width: 70 },
  { field: 'return', headerName: 'Return', width: 70 },
  { field: 'lost', headerName: 'Lost', width: 70 },
  { field: 'broken', headerName: 'Broken', width: 70 },
  { field: 'receive', headerName: 'Receive', width: 70 },
  { field: 'description', headerName: 'Description', width: 180 },
];
const rows = [
  { id: 1, sr: 1, date: '11 Oct 2024', bagPrepBy: '', employee:'pradeep verma' , dept:'EC Qc', customer: '', item: '', mType: '', shape: '', clarity: '', color: '', size: '', issPCs: 0, rctPCs: 0, issue: 2.000, return: 0.000, lost: 0.000, broken: 0.000, receive: 0.000, description: '',flag:'1'},
  { id: 2, sr: 2, date: '11 Oct 2024', bagPrepBy: '', employee:'pradeep verma' , dept:'EC Qc', customer: '', item: '', mType: '', shape: '', clarity: '', color: '', size: '', issPCs: 0, rctPCs: 0, issue: 0.000, return: 0.000, lost: 0.000, broken: 0.000, receive: 3.000, description: '',flag:'1' },
  { id: 3, sr: 3, date: '04 Oct 2024', bagPrepBy: '', employee:'pradeep verma' , dept:'EC Qc', customer: '', item: '', mType: '', shape: '', clarity: '', color: '', size: '', issPCs: 0, rctPCs: 0, issue: 3.000, return: 0.000, lost: 0.000, broken: 0.000, receive: 0.000, description: '' ,flag:'0'},
  { id: 4, sr: 4, date: '04 Oct 2024', bagPrepBy: '', employee:'pradeep verma' , dept:'Filing', customer: '', item: '', mType: '', shape: '', clarity: '', color: '', size: '', issPCs: 0, rctPCs: 0, issue: 0.000, return: 0.000, lost: 0.000, broken: 0.000, receive: 3.000, description: '' ,flag:'0'},
  { id: 5, sr: 5, date: '04 Oct 2024', bagPrepBy: '', employee:'pradeep verma' , dept:'Filing', customer: '', item: '', mType: '', shape: '', clarity: '', color: '', size: '', issPCs: 0, rctPCs: 0, issue: 4.300, return: 0.000, lost: 0.000, broken: 0.000, receive: 0.000, description: '' ,flag:'0'},
  { id: 6, sr: 6, date: '04 Oct 2024', bagPrepBy: '', employee:'pradeep verma' , dept:'Filing', customer: '', item: '', mType: '', shape: '', clarity: '', color: '', size: '', issPCs: 0, rctPCs: 0, issue: 0.000, return: 0.000, lost: 0.000, broken: 0.000, receive: 4.300, description: '' ,flag:'1'},
  { id: 7, sr: 7, date: '04 Oct 2024', bagPrepBy: '', employee:'pradeep verma' , dept:'Filing', customer: '', item: '', mType: '', shape: '', clarity: '', color: '', size: '', issPCs: 0, rctPCs: 0, issue: 4.900, return: 0.000, lost: 0.000, broken: 0.000, receive: 0.000, description: '' ,flag:'0'},
  { id: 8, sr: 8, date: '04 Oct 2024', bagPrepBy: '', employee:'pradeep verma' , dept:'EC Qc', customer: '', item: '', mType: '', shape: '', clarity: '', color: '', size: '', issPCs: 0, rctPCs: 0, issue: 0.000, return: 0.000, lost: 0.000, broken: 0.000, receive: 4.900, description: '' ,flag:'1'},
  { id: 9, sr: 9, date: '04 Oct 2024', bagPrepBy: '', employee:'pradeep verma' , dept:'EC Qc', customer: '', item: 'METAL', mType: 'GOLD', shape: '', clarity: '18K', color: 'Ayellow', size: '', issPCs: 0, rctPCs: 0, issue: 1.000, return: 0.000, lost: 0.000, broken: 0.000, receive: 0.000, description: 'From : 0000009500' ,flag:'1'},
{ id: 10, sr: 10, date: '04 Oct 2024', bagPrepBy: '', employee:'pradeep verma' , dept:'EC Qc', customer: 'Stock', item: 'Diamond', mType: 'SI', shape: 'ROUND', clarity: 'MIX', color: '', size: '', issPCs: 3, rctPCs: 0, issue: 5.000, return: 0.000, lost: 0.000, broken: 0.000, receive: 0.000, description: 'From : 0000009399',flag:'1' },
 
];

export default function DetailsTable() {
  return (
    <div className="w-full bg-white h-[50vh] overflow-auto">
   
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
          '& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-cell:focus': {
            outline: 'none',
            boxShadow: 'none',
          },
          '& .MuiDataGrid-columnHeader:focus-within, & .MuiDataGrid-cell:focus-within': {
            outline:
             'none',
            boxShadow: 'none',
          },
          '& .css-de9k3v-MuiDataGrid-selectedRowCount':{
            visibility:'hidden'
          }
        }}
      />
   </ThemeProvider>
      
    </div>
  );
}


