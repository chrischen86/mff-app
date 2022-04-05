import { Avatar } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import clsx from 'clsx';
import React from 'react';
import { Character } from '../../types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    combat: {
      backgroundColor: '#c73d2a',
      color: theme.palette.getContrastText('#c73d2a'),
    },
    blast: {
      backgroundColor: '#367bcf',
      color: theme.palette.getContrastText('#367bcf'),
    },
    speed: {
      backgroundColor: '#44912b',
      color: theme.palette.getContrastText('#44912b'),
    },
    universal: {
      backgroundColor: '#682b79',
      color: theme.palette.getContrastText('#682b79'),
    },
    t3: {
      backgroundColor: '#d37c2e',
      color: theme.palette.getContrastText('#d37c2e'),
    },
    awakening: {
      backgroundColor: '#3a1970',
      color: theme.palette.getContrastText('#3a1970'),
    },
  })
);

const CharacterAvatar = ({
  character,
}: {
  character: Character | string | null;
}) => {
  const classes = useStyles();

  if (character === null) {
    return <Avatar>?</Avatar>;
  }

  if (typeof character === 'string') {
    return <Avatar>{character.charAt(0)}</Avatar>;
  }

  const letter = character.name.charAt(0);
  return (
    <Avatar
      className={clsx(
        character.type === 'Combat' && classes.combat,
        character.type === 'Blast' && classes.blast,
        character.type === 'Speed' && classes.speed,
        character.type === 'Universal' && classes.universal
      )}
    >
      {letter}
    </Avatar>
  );
};

export default CharacterAvatar;
