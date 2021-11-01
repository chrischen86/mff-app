import { Grid } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React from 'react';
import { FilterContext } from '../context/filterContext';
import { MetadataContext } from '../context/metadataContext';
//import data from './__mocks__/data.json';
import filters, { createFragmentFilters } from '../filters';
import FilterSection from './FilterSection';
import GraphCard from './GraphCard';
import useCharacterBonus from './hooks/useCharacterBonus';
import useCharactersMetadata from './hooks/useCharactersMetadata';
import useFilteredData from './hooks/useFilteredData';
import useFragmentMetadata from './hooks/useFragmentsMetadata';
import useStagesMetadata from './hooks/useStagesMetadata';
import RankTableCard from './RankTableCard';
import SiteAppBar from './SiteAppBar';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      padding: '1em',
    },
  })
);

const HomePage = () => {
  //Contexts
  const { dispatch } = React.useContext(MetadataContext);
  const { dispatch: filterDispatch, state: filterContext } =
    React.useContext(FilterContext);

  //Fetch data
  const { data: stageMetadata, isLoading: isStageMetadataLoading } =
    useStagesMetadata();
  const { data: characterMetadata, isLoading: isCharacterMetadataLoading } =
    useCharactersMetadata();
  const { data: fragmentMetadata, isLoading: isFragmentMetadataLoading } =
    useFragmentMetadata();
  const { data, isLoading: isDataLoading } = useCharacterBonus();

  const filteredData = useFilteredData(data, filterContext.filters);
  const classes = useStyles();

  React.useEffect(() => {
    dispatch({ type: 'calculateLastMonth', data });
  }, [dispatch, data]);

  React.useEffect(() => {
    if (!isStageMetadataLoading) {
      dispatch({ type: 'setStages', stages: stageMetadata });
    }

    if (!isCharacterMetadataLoading) {
      dispatch({ type: 'setCharacters', characters: characterMetadata });
    }

    if (!isFragmentMetadataLoading && fragmentMetadata) {
      dispatch({ type: 'setFragments', fragments: fragmentMetadata });
    }
  }, [
    dispatch,
    characterMetadata,
    isCharacterMetadataLoading,
    isStageMetadataLoading,
    isFragmentMetadataLoading,
    stageMetadata,
    fragmentMetadata,
  ]);

  React.useEffect(() => {
    const fragmentFilters = createFragmentFilters(fragmentMetadata || []);

    filterDispatch({
      type: 'add',
      filters: [...filters, ...fragmentFilters],
    });
  }, [filterDispatch, fragmentMetadata]);

  const isLoading =
    isStageMetadataLoading &&
    isCharacterMetadataLoading &&
    isFragmentMetadataLoading &&
    isDataLoading;

  return (
    <>
      <SiteAppBar />
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item lg={12}>
            <FilterSection />
          </Grid>
          <Grid item xs={12} md={3}>
            <RankTableCard data={filteredData} isLoading={isLoading} />
          </Grid>
          <Grid item xs={12} md={9}>
            <GraphCard data={filteredData} isLoading={isLoading} />
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default HomePage;
