import { TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { Character } from '../../types';

const CharacterSelector = ({
  characters,
  label,
  value = null,
  onCharacterChange,
}: {
  characters: Character[];
  label: string;
  value: Character | null;
  onCharacterChange?: Function;
}) => {
  const handleOnChange = (event: any, character: Character | null) => {
    if (onCharacterChange !== undefined) {
      onCharacterChange(character);
    }
  };

  return (
    <Autocomplete
      value={value}
      onChange={handleOnChange}
      options={characters}
      getOptionLabel={(option) => option.name}
      renderInput={(params) => (
        <TextField {...params} label={label} variant="outlined" />
      )}
    />
  );
};

export default CharacterSelector;
