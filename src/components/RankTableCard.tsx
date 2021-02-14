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
import { SelectedCharacterBonus } from '../types';
import useRankTableData from './hooks/useRankTableData';
import Skeleton from '@material-ui/lab/Skeleton';

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

const RankTableCard = ({
  data,
  isLoading = true,
}: {
  data: SelectedCharacterBonus[];
  isLoading?: boolean;
}) => {
  const rankedData = useRankTableData(data);
  const classes = useStyles();
  return (
    <>
      <Card>
        <CardHeader
          title={
            isLoading ? (
              <Skeleton
                animation="wave"
                height={10}
                width="80%"
                style={{ marginBottom: 6 }}
              />
            ) : (
              'Rank'
            )
          }
        />
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
