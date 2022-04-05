import {
  makeStyles,
  Paper,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import React from 'react';
import useRoster from '../../components/hooks/useRoster';
import TableToolbar from '../../components/TableToolbar';
import { Character } from '../../types';

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

const RosterManagement = ({ characters }: { characters: Character[] }) => {
  const classes = useStyles();
  const { roster, setOwned } = useRoster();

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <TableToolbar title={'Roster Management'} />
        <TableContainer>
          <Table size={'small'}>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Advancement</TableCell>
                <TableCell>Owned?</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {characters.map((row) => {
                const handleOnChange = (
                  event: React.ChangeEvent<HTMLInputElement>
                ) => {
                  setOwned(row.id, event.target.checked);
                };

                return (
                  <TableRow key={row.id} hover>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.advancementType}</TableCell>
                    <TableCell>
                      <Switch
                        checked={!roster.unowned.hasOwnProperty(row.id)}
                        onChange={handleOnChange}
                      />
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

export default RosterManagement;
