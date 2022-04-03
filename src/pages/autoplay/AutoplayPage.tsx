import { Grid } from '@material-ui/core';
import React from 'react';
import useCharacterBonus from '../../components/hooks/useCharacterBonus';
import LeaderTable from './LeaderTable';

const AutoplayPage = () => {
  const { data, isLoading } = useCharacterBonus();

  if (isLoading) {
    return <div />;
  }

  return (
    <>
      <Grid container spacing={3}>
        <Grid item lg={12}>
          <LeaderTable data={data} />
        </Grid>
      </Grid>
    </>
  );
};

export default AutoplayPage;
