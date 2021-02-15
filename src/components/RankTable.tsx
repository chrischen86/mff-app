import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { BonusesCount } from './types';

const useStyles = makeStyles({
  table: {
    minWidth: 250,
  },
  tableContainer: {
    height: '65vh',
    width: '100%',
  },
});

const RankTable = ({ rankedData }: { rankedData: BonusesCount[] }) => {
  const classes = useStyles();
  return (
    <TableContainer component={Paper} className={classes.tableContainer}>
      <Table className={classes.table} stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>Character</TableCell>
            <TableCell align="right"># of stages</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rankedData.map((row) => (
            <TableRow key={row.characterName}>
              <TableCell component="th" scope="row">
                {row.characterName}
              </TableCell>
              <TableCell align="right">{row.count}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default RankTable;
