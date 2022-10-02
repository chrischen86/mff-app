import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';
import red from '@material-ui/core/colors/red';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import React from 'react';
import useFilteredData from '../../components/hooks/useFilteredData';
import useFilters from '../../components/hooks/useFilters';
import useRoster from '../../components/hooks/useRoster';
import useStageGroupedData from '../../components/hooks/useStageGroupedData';
import TableFilterSection from '../../components/TableFilterSection';
import TableToolbar from '../../components/TableToolbar';
import {
  allWarFilter,
  dimensionalClashdFilter,
  futureEndsHereFilter,
  trueShieldFilter,
} from '../../filters/storyFilters';
import { currentMonthFilter } from '../../filters/timeFilters';
import { Filter } from '../../filters/types';
import { SelectedCharacterBonus } from '../../types';

import CharacterTextLabel from './CharacterTextLabel';
import leadCalculator from './dealerCalculator';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginBottom: theme.spacing(5),
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  leader: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.getContrastText(theme.palette.primary.light),
  },
  unowned: {
    backgroundColor: red[100],
    color: theme.palette.getContrastText(red[100]),
  },
  unownedLabel: {
    color: theme.palette.error.main,
    textDecoration: 'line-through',
  },
  designated: {
    display: 'block',
    lineHeight: 1,
  },
  typography: {
    padding: theme.spacing(2),
  },
}));

const timeFilter = { ...currentMonthFilter, hidden: true };

const LeaderTableConcise = ({
  data,
  team,
  dealer = 0,
}: {
  data: SelectedCharacterBonus[];
  team: (string | null)[];
  dealer: number;
}) => {
  const classes = useStyles();
  const { filters, setFilters } = useFilters();
  const filteredData = useFilteredData(data, filters);
  const groupedData = useStageGroupedData(filteredData);
  const { roster, isOwned } = useRoster();

  React.useEffect(() => {
    setFilters([
      timeFilter,
      dimensionalClashdFilter,
      { ...trueShieldFilter, enabled: false, label: 'SHIELD' },
      { ...allWarFilter, enabled: false, label: 'All War' },
      { ...futureEndsHereFilter, enabled: false, label: 'Future Ends' },
    ]);
  }, [setFilters]);

  const handleFilterClick = (filter: Filter) => {
    setFilters([
      timeFilter,
      ...filters
        .filter((f) => f.id !== timeFilter.id)
        .map((f) => {
          return {
            ...f,
            enabled: filter.id === f.id,
          };
        }),
    ]);
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <TableToolbar title={'Autoplay Story Leader'} />
        <TableFilterSection
          filters={filters}
          onFilterClick={handleFilterClick}
        />
        <TableContainer>
          <Table size={'small'}>
            <TableHead>
              <TableRow>
                <TableCell>Stage</TableCell>
                <TableCell>Toons</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Active</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {groupedData.map((row) => {
                const { position1: leader } = leadCalculator(
                  row,
                  team,
                  roster,
                  dealer
                );

                return (
                  <TableRow key={row.stageId} hover>
                    <TableCell>
                      {row.stage
                        ? `${row.stage.stage}-${row.stage.subStage}`
                        : row.stageId}
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant={'caption'}
                        className={clsx(
                          classes.designated,
                          !isOwned(row.characterId1) && classes.unownedLabel
                        )}
                      >
                        {row.character1?.name}
                      </Typography>
                      <Typography
                        variant={'caption'}
                        className={clsx(
                          classes.designated,
                          !isOwned(row.characterId2) && classes.unownedLabel
                        )}
                      >
                        {row.character2?.name}
                      </Typography>
                      <Typography
                        variant={'caption'}
                        className={clsx(
                          classes.designated,
                          !isOwned(row.characterId3) && classes.unownedLabel
                        )}
                      >
                        {row.character3?.name}
                      </Typography>
                    </TableCell>

                    <TableCell
                      className={clsx(
                        row.characterId1 !== leader && classes.leader,
                        leader === null && classes.unowned
                      )}
                    >
                      <CharacterTextLabel characterId={leader ?? 'SLOT'} />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
};

export default LeaderTableConcise;
