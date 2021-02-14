import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Skeleton from '@material-ui/lab/Skeleton';
import React from 'react';
import { SelectedCharacterBonus } from '../types';
import AreaBumpChart from './AreaBumpChart';
import useAreaBumpData from './hooks/useAreaBumpData';

const useStyles = makeStyles({
  graphContainer: {
    height: 400,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  graphSkeleteon: {
    transform: 'scale(1,1)',
    height: '90%',
    width: '95%',
  },
});

const GraphCard = ({
  data,
  isLoading = false,
}: {
  data: SelectedCharacterBonus[];
  isLoading?: boolean;
}) => {
  const areaBumpData = useAreaBumpData(data);
  const classes = useStyles();

  return (
    <Paper className={classes.graphContainer}>
      {isLoading && <Skeleton className={classes.graphSkeleteon} />}
      {!isLoading && <AreaBumpChart areaBumpData={areaBumpData} />}
    </Paper>
  );
};

export default GraphCard;
