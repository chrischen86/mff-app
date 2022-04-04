import { Grid } from '@material-ui/core';
import React from 'react';
import useCharacterBonus from '../../components/hooks/useCharacterBonus';
import LeaderTable from './LeaderTable';
import TeamSelector from './TeamSelector';

const AutoplayPage = () => {
  const { data, isLoading } = useCharacterBonus();
  const [teamCharacters, setTeamCharacters] = React.useState<(string | null)[]>(
    [null, null, null]
  );

  const handleTeamChange = (characters: string[]) => {
    setTeamCharacters(characters);
  };

  if (isLoading) {
    return <div />;
  }

  return (
    <>
      <Grid container spacing={3}>
        <Grid item lg={8}>
          <LeaderTable data={data} team={teamCharacters} />
        </Grid>
        <Grid item lg={4}>
          <TeamSelector onTeamChange={handleTeamChange} />
        </Grid>
      </Grid>
    </>
  );
};

export default AutoplayPage;
