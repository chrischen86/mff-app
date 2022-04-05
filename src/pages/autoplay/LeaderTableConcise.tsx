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
import Popover from '@material-ui/core/Popover';
import { makeStyles } from '@material-ui/core/styles';
import { AvatarGroup } from '@material-ui/lab';
import clsx from 'clsx';
import React from 'react';
import useFilteredData from '../../components/hooks/useFilteredData';
import useFilters from '../../components/hooks/useFilters';
import useRoster from '../../components/hooks/useRoster';
import useStageGroupedData from '../../components/hooks/useStageGroupedData';
import TableFilterSection from '../../components/TableFilterSection';
import TableToolbar from '../../components/TableToolbar';
import { StageGroupedData } from '../../components/types';
import {
  allWarFilter,
  dimensionalClashdFilter,
  futureEndsHereFilter,
  trueShieldFilter,
} from '../../filters/storyFilters';
import { currentMonthFilter } from '../../filters/timeFilters';
import { Filter } from '../../filters/types';
import { SelectedCharacterBonus } from '../../types';
import CharacterAvatar from './CharacterAvatar';
import CharacterTextLabel from './CharacterTextLabel';
import leadCalculator from './leadCalculator';
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
  typography: {
    padding: theme.spacing(2),
  },
}));

const timeFilter = { ...currentMonthFilter, hidden: true };

const LeaderTableConcise = ({
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
  const { roster } = useRoster();

  const [anchorEl, setAnchorEl] = React.useState<HTMLTableCellElement | null>(
    null
  );
  const [currentRowData, setCurrentRowData] = React.useState<string>('');

  const handleClick = (
    event: React.MouseEvent<HTMLTableCellElement>,
    rowData: StageGroupedData
  ) => {
    setAnchorEl(event.currentTarget);
    setCurrentRowData(
      `${rowData.character1?.name}, ${rowData.character2?.name}, ${rowData.character3?.name}`
    );
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
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
                    <TableCell onClick={(event) => handleClick(event, row)}>
                      <AvatarGroup>
                        <CharacterAvatar
                          character={row.character1 || row.characterId1}
                        />
                        <CharacterAvatar
                          character={row.character2 || row.characterId2}
                        />
                        <CharacterAvatar
                          character={row.character3 || row.characterId3}
                        />
                      </AvatarGroup>
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
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Typography className={classes.typography}>{currentRowData}</Typography>
      </Popover>
    </div>
  );
};

export default LeaderTableConcise;
