<DataGrid
  rows={rows}
  columns={columns}
  pageSize={5}
  rowsPerPageOptions={[5]}
  checkboxSelection
  isRowSelectable={(params) => params.row.flag !== 0} // Only rows with flag !== 0 are selectable
  getRowClassName={getRowClassName}
  sx={{
    '& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-cell:focus': {
      outline: 'none',
      boxShadow: 'none',
    },
    '& .MuiDataGrid-columnHeader:focus-within, & .MuiDataGrid-cell:focus-within': {
      outline: 'none',
      boxShadow: 'none',
    },
    '& .css-de9k3v-MuiDataGrid-selectedRowCount': {
      visibility: 'hidden'
    }
  }}
/>
