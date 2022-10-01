import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
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
import StageBonusIcon from './StageBonusIcon';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  stage: {
    paddingLeft: 0,
  },
  stageBonus: {
    paddingRight: 0,
    paddingTop: 0,
    paddingBottom: 0,
    lineHeight: 0,
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
                <TableCell className={classes.stageBonus}></TableCell>
                <TableCell className={classes.stage}>Stage</TableCell>
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
                  team,
                  roster,
                  dealer
                );

                const characterArray = [
                  row.characterId1,
                  row.characterId2,
                  row.characterId3,
                ];
                return (
                  <TableRow key={row.stageId} hover>
                    <TableCell className={classes.stageBonus}>
                      {row.stage && <StageBonusIcon stage={row.stage} />}
                    </TableCell>
                    <TableCell className={classes.stage}>
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
                        characterArray[0] !== leader && classes.leader,
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

export default LeaderTable;
