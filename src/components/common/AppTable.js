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
            props.columns.map(column => {
              return <TableCell>{column.label}</TableCell>
            })
          }
        </TableRow>
      </TableHead>
      <TableBody>
        {props.data.map((row) => (
          <TableRow
            key={row._id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            {props.columns.map(column => {
              if (column.render) {
                return column.render(row) 
              }
              return <TableCell align="left">{row[column.field]}</TableCell>
            })}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
    
}

export default AppTable;