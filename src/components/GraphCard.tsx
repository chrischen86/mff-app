import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Skeleton from '@material-ui/lab/Skeleton';
import React from 'react';
import { FilterContext } from '../context/filterContext';
import { MetadataContext } from '../context/metadataContext';
import { SelectedCharacterBonus } from '../types';
import AreaBumpChart from './AreaBumpChart';
import BarChart from './BarChart';
import useAreaBumpData from './hooks/useAreaBumpData';
import useBarChartData from './hooks/useBarChartData';

const useStyles = makeStyles({
  graphContainer: {
    height: '75vh',
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
  const { state: metadataContext } = React.useContext(MetadataContext);
  const { state: filterContext } = React.useContext(FilterContext);
  const areaBumpData = useAreaBumpData(data);
  const barData = useBarChartData(data, metadataContext);
  const classes = useStyles();

  const showTreemap =
    filterContext.filters.filter((f) => f.id === 'currentMonth' && f.enabled)
      .length >= 1;

  return (
    <Paper className={classes.graphContainer}>
      {isLoading && <Skeleton className={classes.graphSkeleteon} />}
      {!isLoading && !showTreemap && (
        <AreaBumpChart areaBumpData={areaBumpData} />
      )}
      {!isLoading && showTreemap && <BarChart data={barData} />}
    </Paper>
  );
};

export default GraphCard;
