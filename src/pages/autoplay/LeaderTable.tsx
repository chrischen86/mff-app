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
import leadCalculator from './leadCalculator';
import red from '@material-ui/core/colors/red';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
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
}));

const timeFilter = { ...currentMonthFilter, hidden: true };

const LeaderTable = ({
  data,
  team,
}: {
  data: SelectedCharacterBonus[];
  team: (string | null)[];
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
      { ...trueShieldFilter, enabled: false },
      { ...allWarFilter, enabled: false },
      { ...futureEndsHereFilter, enabled: false },
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
                <TableCell>Character 1</TableCell>
                <TableCell>Character 2</TableCell>
                <TableCell>Character 3</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Leader</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {groupedData.map((row) => {
                const { position1: leader } = leadCalculator(
                  row,
                  team[0],
                  team[1],
                  team[2],
                  roster
                );

                return (
                  <TableRow key={row.stageId} hover>
                    <TableCell>
                      {row.stage
                        ? `${row.stage.stage}-${row.stage.subStage}`
                        : row.stageId}
                    </TableCell>
                    <TableCell
                      className={clsx(
                        !isOwned(row.characterId1) && classes.unownedLabel
                      )}
                    >
                      {row.character1 ? row.character1.name : row.characterId1}
                    </TableCell>
                    <TableCell
                      className={clsx(
                        !isOwned(row.characterId2) && classes.unownedLabel
                      )}
                    >
                      {row.character2 ? row.character2.name : row.characterId2}
                    </TableCell>
                    <TableCell
                      className={clsx(
                        !isOwned(row.characterId3) && classes.unownedLabel
                      )}
                    >
                      {row.character3 ? row.character3.name : row.characterId3}
                    </TableCell>
                    <TableCell
                      className={clsx(
                        row.characterId1 !== leader && classes.leader,
                        leader === null && classes.unowned
                      )}
                    >
                      <CharacterTextLabel characterId={leader ?? 'LEAD'} />
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

export default LeaderTable;
