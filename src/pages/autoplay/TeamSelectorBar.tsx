import {
  BottomNavigation,
  BottomNavigationAction,
  Menu,
  MenuItem,
} from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import clsx from 'clsx';
import React from 'react';
import { MetadataContext } from '../../context/metadataContext';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    stickToBottom: {
      width: '100%',
      position: 'fixed',
      bottom: 0,
      backgroundColor: '#648dae',
      marginLeft: theme.spacing(-2),
    },
    dealer: {
      backgroundColor: theme.palette.primary.main,
    },
    actionLabel: {
      color: theme.palette.getContrastText(theme.palette.primary.light),
      fontWeight: 'bold',
    },
  })
);

const TeamSelectorBar = ({
  onTeamChange,
  onDealerChange,
  dealer = 0,
}: {
  onTeamChange?: Function;
  onDealerChange?: Function;
  dealer: number;
}) => {
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
    character: { id: string; name: string } | null
  ) => {
    setAnchorEl(null);

    if (character && character.id === 'dealer') {
      if (onDealerChange !== undefined) {
        onDealerChange(currentPosition);
      }
      return;
    }

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
            root: clsx(dealer === 0 && classes.dealer),
          }}
          value={0}
        />
        <BottomNavigationAction
          label={characters.find((c) => c.id === team[1])?.name ?? '2nd'}
          onClick={handleActionClick}
          classes={{
            selected: classes.actionLabel,
            label: classes.actionLabel,
            root: clsx(dealer === 1 && classes.dealer),
          }}
          value={1}
        />
        <BottomNavigationAction
          label={characters.find((c) => c.id === team[2])?.name ?? '3rd'}
          onClick={handleActionClick}
          classes={{
            selected: classes.actionLabel,
            label: classes.actionLabel,
            root: clsx(dealer === 2 && classes.dealer),
          }}
          value={2}
        />
      </BottomNavigation>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={(event) => handleClose(null, null)}
      >
        {[{ id: 'dealer', name: 'Set As Dealer' }, ...characters].map(
          (character) => {
            return (
              <MenuItem
                key={character.id}
                onClick={(event) => handleClose(event, character)}
              >
                {character.name}
              </MenuItem>
            );
          }
        )}
      </Menu>
    </>
  );
};
export default TeamSelectorBar;
