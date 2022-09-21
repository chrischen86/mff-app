import { Grid } from '@material-ui/core';
import React from 'react';
import { SelectedCharacterBonus } from '../../types';
import LeaderTable from './LeaderTable';
import TeamSelector from './TeamSelector';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Theme } from '@material-ui/core/styles';
import LeaderTableConcise from './LeaderTableConcise';

import TeamSelectorBar from './TeamSelectorBar';

const AutoplayPage = ({
  data,
  isLoading,
}: {
  data: SelectedCharacterBonus[];
  isLoading: boolean;
}) => {
  const showFullTable = useMediaQuery((theme: Theme) =>
    theme.breakpoints.up('sm')
  );

  const [selectedDealer, setSelectedDealer] = React.useState(0);
  const [teamCharacters, setTeamCharacters] = React.useState<(string | null)[]>(
    [null, null, null]
  );

  const handleTeamChange = (characters: string[]) => {
    setTeamCharacters(characters);
  };

  const handleDealerChange = (dealerSlot: number) => {
    setSelectedDealer(dealerSlot);
  };

  if (isLoading) {
    return <div />;
  }

  return (
    <>
      {!showFullTable && (
        <div>
          <LeaderTableConcise
            data={data}
            team={teamCharacters}
            dealer={selectedDealer}
          />
          <TeamSelectorBar
            onTeamChange={handleTeamChange}
            onDealerChange={handleDealerChange}
            dealer={selectedDealer}
          />
        </div>
      )}
      {showFullTable && (
        <Grid container spacing={3}>
          <Grid item sm={12} md={8}>
            <LeaderTable
              data={data}
              team={teamCharacters}
              dealer={selectedDealer}
            />
          </Grid>
          <Grid item sm={12} md={4}>
            <TeamSelector
              onTeamChange={handleTeamChange}
              onDealerChange={handleDealerChange}
              dealer={selectedDealer}
            />
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default AutoplayPage;
