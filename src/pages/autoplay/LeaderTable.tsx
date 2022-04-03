import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import React from 'react';
import useFilteredData from '../../components/hooks/useFilteredData';
import useStageGroupedData from '../../components/hooks/useStageGroupedData';
import TableToolbar from '../../components/TableToolbar';
import { dimensionalClashdFilter } from '../../filters/storyFilters';
import { currentMonthFilter } from '../../filters/timeFilters';
import { SelectedCharacterBonus } from '../../types';
import leadCalculator from './leadCalculator';
import { makeStyles } from '@material-ui/core/styles';

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
}));

const LeaderTable = ({ data }: { data: SelectedCharacterBonus[] }) => {
  const classes = useStyles();
  const filters = React.useMemo(() => {
    return [currentMonthFilter, dimensionalClashdFilter];
  }, []);
  const filteredData = useFilteredData(data, filters);
  const groupedData = useStageGroupedData(filteredData);

  const team = ['corvusglaive', 'professorx', 'ironfist'];
  return (
    <>
      <div>Team: {team.join(', ')}</div>
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <TableToolbar title={'Autoplay Story Leader'} />
          <TableContainer>
            <Table size={'small'}>
              <TableHead>
                <TableRow>
                  <TableCell>Stage</TableCell>
                  <TableCell>Character 1</TableCell>
                  <TableCell>Character 2</TableCell>
                  <TableCell>Character 3</TableCell>
                  <TableCell>Autoplayer Leader</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {groupedData.map((row) => (
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
                    <TableCell>
                      {leadCalculator(row, team[0], team[1], team[2]).position1}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </div>
    </>
  );
};

export default LeaderTable;
