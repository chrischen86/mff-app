import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { AreaBumpInputSerie, ResponsiveAreaBump } from '@nivo/bump';

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

interface GraphCardProps {
  data: AreaBumpInputSerie[];
}

const GraphCard = ({ data }: GraphCardProps) => {
  const classes = useStyles();
  console.log(data);
  return (
    <Paper className={classes.tableContainer}>
      <ResponsiveAreaBump
        data={data}
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
        }}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: '',
          legendPosition: 'middle',
          legendOffset: 32,
        }}
      />
    </Paper>
  );
};

export default GraphCard;
