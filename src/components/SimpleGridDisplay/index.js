import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  root: {
    width: '100%',
    height: '300px',
    marginTop: theme.spacing.unit * 2,
    overflow: 'auto',
  },
  table: {
    minWidth: 700,
  },
  tableHead: {

  },
  tableBody: {

  }
});

function SimpleTable(props) {
  const { classes, line, lines } = props;
  let id = 0;
  function createData(time, revenue, sector, name) {
    id += 1;
    return { id, time, revenue, sector, name };
  }

  let rows = [];
  let filteredLine = lines.filter(match => match.name === line);

  if (filteredLine.length > 0) {
      let filteredObject = filteredLine[0];
      let timesLength = filteredObject.times.length;

      for (var i = 0; i < timesLength; i++) {
        rows.push(
          createData(filteredObject.times[i], filteredObject.values[i], filteredObject.sector, filteredObject.name)
        )
      }
  }

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead className={classes.tableHead}>
          <TableRow>
            <TableCell>Time</TableCell>
            <TableCell numeric>Revenue</TableCell>
            <TableCell numeric>Sector</TableCell>
            <TableCell numeric>Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody className={classes.tableBody}>
          {rows.map(row => {
            return (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.time}
                </TableCell>
                <TableCell numeric>{row.revenue}</TableCell>
                <TableCell numeric>{row.sector}</TableCell>
                <TableCell numeric>{row.name}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTable);