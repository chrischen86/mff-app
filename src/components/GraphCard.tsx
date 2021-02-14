import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { ResponsiveAreaBump } from '@nivo/bump';
import { SelectedCharacterBonus } from '../types';
import useAreaBumpData from './hooks/useAreaBumpData';
import moment from 'moment';

const useStyles = makeStyles({
  table: {
    minWidth: 250,
  },
  tableContainer: {
    height: 400,
    width: '100%',
  },
  cardContent: {
    padding: 0,
    '&:last-child': {
      paddingBottom: 0,
    },
  },
});

const GraphCard = ({ data }: { data: SelectedCharacterBonus[] }) => {
  const areaBumpData = useAreaBumpData(data);
  const classes = useStyles();

  return (
    <Paper className={classes.tableContainer}>
      <ResponsiveAreaBump
        data={areaBumpData}
        margin={{ top: 40, right: 100, bottom: 40, left: 100 }}
        spacing={8}
        colors={{ scheme: 'nivo' }}
        blendMode="multiply"
        startLabel="id"
        axisTop={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: '',
          legendPosition: 'middle',
          legendOffset: -36,
          format: function (value: string) {
            return moment(value).format('MMM YYYY');
          },
        }}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: '',
          legendPosition: 'middle',
          legendOffset: 32,
          format: function (value: string) {
            return moment(value).format('MMM YYYY');
          },
        }}
      />
    </Paper>
  );
};

export default GraphCard;
