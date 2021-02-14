import {
  Card,
  CardContent,
  CardHeader,
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
import { FilterContext } from '../context/filterContext';
import { SelectedCharacterBonus } from '../types';
import { useRankTableData } from './hooks/rankTableCardReducer';

const useStyles = makeStyles({
  table: {
    minWidth: 250,
  },
  tableContainer: {
    height: '30em',
    width: '100%',
  },
  cardContent: {
    padding: 0,
    '&:last-child': {
      paddingBottom: 0,
    },
  },
});

const RankTableCard = ({ data }: { data: SelectedCharacterBonus[] }) => {
  const { data: rankedData, applyFilter } = useRankTableData();
  const { state: filterState } = React.useContext(FilterContext);

  React.useEffect(() => {
    applyFilter(data, filterState.filters);
  }, [applyFilter, data, filterState.filters]);

  const classes = useStyles();

  return (
    <>
      <Card>
        <CardHeader title="Rank" />
        <CardContent className={classes.cardContent}>
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
        </CardContent>
      </Card>
    </>
  );
};

export default RankTableCard;
