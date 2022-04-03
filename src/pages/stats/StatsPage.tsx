import { Grid } from '@material-ui/core';
import React from 'react';
import FilterSection from '../../components/FilterSection';
import GraphCard from '../../components/GraphCard';
import useCharacterBonus from '../../components/hooks/useCharacterBonus';
import useCharactersMetadata from '../../components/hooks/useCharactersMetadata';
import useFilteredData from '../../components/hooks/useFilteredData';
import useFragmentMetadata from '../../components/hooks/useFragmentsMetadata';
import useStagesMetadata from '../../components/hooks/useStagesMetadata';
import RankTableCard from '../../components/RankTableCard';
import { FilterContext } from '../../context/filterContext';
import { MetadataContext } from '../../context/metadataContext';
import filters, { createFragmentFilters } from '../../filters';

const StatsPage = () => {
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
    </>
  );
};

export default StatsPage;
