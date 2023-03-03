import React, { memo } from 'react';

import SearchBar from 'components/FilterTools/SearchBar';

function SearchPage() {
  return (
    <div className="content">
      <div className="d-flex justify-content-end">
        <SearchBar />
      </div>
    </div>
  );
}

export default memo(SearchPage);
