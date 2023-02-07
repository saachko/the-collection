import React, { memo } from 'react';

import WelcomeSection from '../components/WelcomeSection/WelcomeSection';

function HomePage() {
  return (
    <div className="content pt-0 pb-0">
      <WelcomeSection />
    </div>
  );
}

export default memo(HomePage);
