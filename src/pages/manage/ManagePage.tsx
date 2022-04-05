import React from 'react';
import { MetadataContext } from '../../context/metadataContext';
import RosterManagement from './RosterManagement';

const ManagePage = () => {
  const {
    state: { characters },
  } = React.useContext(MetadataContext);

  return <RosterManagement characters={characters} />;
};

export default ManagePage;
