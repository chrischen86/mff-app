import React from 'react';

const FilterSection = ({
  open = true,
  filters,
}: {
  open?: boolean;
  filters?: string;
}) => {
  if (open) {
    return <div>Filters here</div>;
  } else {
    return <div />;
  }
};

export default FilterSection;
