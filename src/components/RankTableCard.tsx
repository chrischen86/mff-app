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
  IconButton,
} from '@material-ui/core';
import FilterIcon from '@material-ui/icons/FilterList';
import { makeStyles } from '@material-ui/core/styles';
import FilterSection from './FilterSection';
import React from 'react';

const useStyles = makeStyles({
  table: {
    minWidth: 250,
  },
  tableContainer: {
    height: 400,
    width: '100%',
  },
  cardContent: {
    padding: 0,
    '&:last-child': {
      paddingBottom: 0,
    },
  },
});

interface BonusesCount {
  characterName: string;
  count: number;
}
interface RankTableCardProps {
  bonuses: BonusesCount[];
}

const RankTableCard = (data: RankTableCardProps) => {
  const classes = useStyles();
  return (
    <>
      <Card>
        <CardHeader
          title="Rank"
          action={
            <IconButton>
              <FilterIcon />
            </IconButton>
          }
        />
        <FilterSection />
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
                {data.bonuses.map((row) => (
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
