import { Paper, Typography, Radio } from '@material-ui/core';
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
  row: {
    display: 'flex',
  },
  selects: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
  },
  select: {
    flexGrow: 1,
  },
  title: {
    paddingRight: theme.spacing(1),
    paddingBottom: theme.spacing(2),
  },
}));

const TeamSelector = ({
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

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onDealerChange !== undefined) {
      onDealerChange(parseInt(event.target.value));
    }
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Typography variant={'h5'} className={classes.title}>
          Team Configuration
        </Typography>
        <div className={classes.selects}>
          {['Lead', '2nd', '3rd'].map((label, index) => {
            return (
              <div className={classes.row} key={`${label}${index}`}>
                <Radio
                  checked={dealer === index}
                  value={index}
                  onChange={handleRadioChange}
                  name="radio-buttons"
                  inputProps={{ 'aria-label': `${index}` }}
                  size={'small'}
                />
                <div className={classes.select}>
                  <CharacterSelector
                    characters={characters}
                    label={label}
                    value={team[index]}
                    onCharacterChange={(character: Character) =>
                      handleCharacterChange(character, index)
                    }
                  />
                </div>
              </div>
            );
          })}
        </div>
      </Paper>
    </div>
  );
};

export default TeamSelector;
