import React, {Component} from 'react';
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
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});


class SimpleTable extends Component {

    constructor(props){
        super(props);
    } 

render() {
    const { classes } = this.props;
    return (
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>IFSC</TableCell>
                <TableCell>Bank Name</TableCell>
                <TableCell>Branch</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>City</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.props.data.map(n => {
                  return (
                    <TableRow key={n.id}>
                    <TableCell component="th" scope="row">
                      {n.ifsc}
                    </TableCell>
                    <TableCell>{n.bank_name}</TableCell>
                    <TableCell>{n.branch}</TableCell>
                    <TableCell>{n.address}</TableCell>
                    <TableCell>{n.city}</TableCell>
                    </TableRow>
                  )
              })}
            </TableBody>
          </Table>
        </Paper>
      );  
    } 
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTable);
