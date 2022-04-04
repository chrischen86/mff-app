import React from 'react';
import { MetadataContext } from '../../context/metadataContext';

const CharacterTextLabel = ({
  characterId,
}: {
  characterId: string | null;
}) => {
  const {
    state: { characters },
  } = React.useContext(MetadataContext);

  const character = characters.find((c) => characterId === c.id);
  if (character === undefined) {
    return <>{characterId}</>;
  }
  return <>{character.name}</>;
};

export default CharacterTextLabel;
