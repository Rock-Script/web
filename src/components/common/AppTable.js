import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function AppTable(props) {

    return <TableContainer component={Paper}>
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow>
          {
            props.columns.map((column, index) => {
              return <TableCell key={`app_table_${index}`}>{column.label}</TableCell>
            })
          }
        </TableRow>
      </TableHead>
      <TableBody>
        {props.data.map((row, index) => (
          <TableRow
          key={`app_table_row_${index}`}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            {props.columns.map((column, index) => {
              if (column.render) {
                return column.render(row) 
              }
              return <TableCell key={`app_table_cell_${index}`} align="left">{row[column.field]}</TableCell>
            })}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
    
}

export default AppTable;