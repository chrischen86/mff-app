import {
  BottomNavigation,
  BottomNavigationAction,
  Menu,
  MenuItem,
} from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React from 'react';
import { MetadataContext } from '../../context/metadataContext';
import { Character } from '../../types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    stickToBottom: {
      width: '100%',
      position: 'fixed',
      bottom: 0,
      backgroundColor: '#648dae',

      marginLeft: theme.spacing(-2),
    },
    actionLabel: {
      color: theme.palette.getContrastText(theme.palette.primary.light),
      fontWeight: 'bold',
    },
  })
);

const TeamSelectorBar = ({ onTeamChange }: { onTeamChange?: Function }) => {
  const classes = useStyles();
  const {
    state: { characters },
  } = React.useContext(MetadataContext);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [currentPosition, setCurrentPosition] = React.useState(0);
  const [team, setTeam] = React.useState<(string | null)[]>([null, null, null]);

  const handleActionClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (
    event: React.MouseEvent<HTMLLIElement> | null,
    character: Character | null
  ) => {
    setAnchorEl(null);

    const updatedTeam = [...team];
    updatedTeam[currentPosition] = character ? character.id : null;
    setTeam(updatedTeam);

    if (onTeamChange !== undefined) {
      onTeamChange(updatedTeam);
    }
  };

  return (
    <>
      <BottomNavigation
        className={classes.stickToBottom}
        showLabels
        value={currentPosition}
        onChange={(event, newValue) => {
          setCurrentPosition(newValue);
        }}
      >
        <BottomNavigationAction
          label={characters.find((c) => c.id === team[0])?.name ?? 'Lead'}
          onClick={handleActionClick}
          classes={{
            selected: classes.actionLabel,
            label: classes.actionLabel,
          }}
        />
        <BottomNavigationAction
          label={characters.find((c) => c.id === team[1])?.name ?? '2nd'}
          onClick={handleActionClick}
          classes={{
            selected: classes.actionLabel,
            label: classes.actionLabel,
          }}
        />
        <BottomNavigationAction
          label={characters.find((c) => c.id === team[2])?.name ?? '3rd'}
          onClick={handleActionClick}
          classes={{
            selected: classes.actionLabel,
            label: classes.actionLabel,
          }}
        />
      </BottomNavigation>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={(event) => handleClose(null, null)}
      >
        {characters.map((character) => {
          return (
            <MenuItem
              key={character.id}
              onClick={(event) => handleClose(event, character)}
            >
              {character.name}
            </MenuItem>
          );
        })}
      </Menu>
    </>
  );
};
export default TeamSelectorBar;
