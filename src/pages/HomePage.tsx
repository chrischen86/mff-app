import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import useCharacterBonus from '../components/hooks/useCharacterBonus';
import useCharactersMetadata from '../components/hooks/useCharactersMetadata';
import useFragmentMetadata from '../components/hooks/useFragmentsMetadata';
import useStagesMetadata from '../components/hooks/useStagesMetadata';
import SiteAppBar from '../components/SiteAppBar';
import { FilterContext } from '../context/filterContext';
import { MetadataContext } from '../context/metadataContext';
import filters, { createFragmentFilters } from '../filters';
import AutoplayPage from './autoplay/AutoplayPage';
import ManagePage from './manage/ManagePage';
import StatsPage from './stats/StatsPage';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      padding: '1em',
    },
  })
);

const HomePage = () => {
  const classes = useStyles();
  const { dispatch } = React.useContext(MetadataContext);
  const { dispatch: filterDispatch } = React.useContext(FilterContext);

  //Fetch data
  const { data: stageMetadata, isLoading: isStageMetadataLoading } =
    useStagesMetadata();
  const { data: characterMetadata, isLoading: isCharacterMetadataLoading } =
    useCharactersMetadata();
  const { data: fragmentMetadata, isLoading: isFragmentMetadataLoading } =
    useFragmentMetadata();
  const { data, isLoading: isDataLoading } = useCharacterBonus();

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
        <Routes>
          <Route
            path="/"
            element={<StatsPage data={data} isLoading={isLoading} />}
          />
          <Route
            path="/autoplay"
            element={<AutoplayPage data={data} isLoading={isLoading} />}
          />
          <Route path="/manage" element={<ManagePage />} />
        </Routes>
      </div>
    </>
  );
};

export default HomePage;
