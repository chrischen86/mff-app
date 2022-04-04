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
                  team[2]
                );

                return (
                  <TableRow key={row.stageId}>
                    <TableCell>
                      {row.stage
                        ? `${row.stage.stage}-${row.stage.subStage}`
                        : row.stageId}
                    </TableCell>
                    <TableCell>
                      {row.character1 ? row.character1.name : row.characterId1}
                    </TableCell>
                    <TableCell>
                      {row.character2 ? row.character2.name : row.characterId2}
                    </TableCell>
                    <TableCell>
                      {row.character3 ? row.character3.name : row.characterId3}
                    </TableCell>
                    <TableCell
                      className={clsx(
                        row.characterId1 !== leader && classes.leader
                      )}
                    >
                      <CharacterTextLabel characterId={leader} />
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
