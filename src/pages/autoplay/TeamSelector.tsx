import { Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { MetadataContext } from '../../context/metadataContext';
import { Character } from '../../types';
import CharacterSelector from './CharacterSelector';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    padding: theme.spacing(2),
  },
  selects: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
  },
  title: {
    paddingRight: theme.spacing(1),
    paddingBottom: theme.spacing(2),
  },
}));

const TeamSelector = ({ onTeamChange }: { onTeamChange?: Function }) => {
  const classes = useStyles();
  const {
    state: { characters },
  } = React.useContext(MetadataContext);

  const [team, setTeam] = React.useState<(Character | null)[]>([
    null,
    null,
    null,
  ]);

  const handleCharacterChange = (character: Character, index: number) => {
    const updatedTeam = [...team];
    updatedTeam[index] = character;
    setTeam(updatedTeam);

    if (onTeamChange !== undefined) {
      onTeamChange(updatedTeam.map((t) => t?.id));
    }
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Typography variant={'h5'} className={classes.title}>
          Team Configuration
        </Typography>
        <div className={classes.selects}>
          <CharacterSelector
            characters={characters}
            label={'Lead'}
            value={team[0]}
            onCharacterChange={(character: Character) =>
              handleCharacterChange(character, 0)
            }
          />
          <CharacterSelector
            characters={characters}
            label={'2nd'}
            value={team[1]}
            onCharacterChange={(character: Character) =>
              handleCharacterChange(character, 1)
            }
          />
          <CharacterSelector
            characters={characters}
            label={'3rd'}
            value={team[2]}
            onCharacterChange={(character: Character) =>
              handleCharacterChange(character, 2)
            }
          />
        </div>
      </Paper>
    </div>
  );
};

export default TeamSelector;
