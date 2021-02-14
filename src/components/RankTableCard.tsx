import { Card, CardContent, CardHeader } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Skeleton from '@material-ui/lab/Skeleton';
import React from 'react';
import { SelectedCharacterBonus } from '../types';
import useRankTableData from './hooks/useRankTableData';
import RankTable from './RankTable';

const useStyles = makeStyles({
  cardContent: {
    padding: 0,
    '&:last-child': {
      paddingBottom: 0,
    },
  },
  left: {
    float: 'left',
  },
  right: {
    float: 'right',
    marginRight: '1em',
  },
  contentContainer: {
    paddingLeft: '1em',
  },
});

const RankTableCard = ({
  data,
  isLoading = false,
}: {
  data: SelectedCharacterBonus[];
  isLoading?: boolean;
}) => {
  const rankedData = useRankTableData(data);
  const classes = useStyles();

  return (
    <>
      <Card>
        <CardHeader
          title={
            isLoading ? (
              <Skeleton
                animation="wave"
                height={30}
                width="80%"
                style={{ marginBottom: 6 }}
              />
            ) : (
              'Rank'
            )
          }
        />
        <CardContent className={classes.cardContent}>
          {isLoading && (
            <div className={classes.contentContainer}>
              {[...Array(20)].map((_val, index) => (
                <React.Fragment key={index}>
                  <Skeleton
                    animation="wave"
                    height={10}
                    style={{ marginBottom: 6 }}
                    width="50%"
                    className={classes.left}
                  ></Skeleton>
                  <Skeleton
                    animation="wave"
                    height={10}
                    width="10%"
                    className={classes.right}
                  />
                  <br />
                </React.Fragment>
              ))}
            </div>
          )}
          {!isLoading && <RankTable rankedData={rankedData} />}
        </CardContent>
      </Card>
    </>
  );
};

export default RankTableCard;
