import React, { memo } from 'react';

import WelcomeSection from '../components/WelcomeSection/WelcomeSection';

function HomePage() {
  return (
    <main>
      <div className="content pt-0 pb-0">
        <WelcomeSection />
      </div>
    </main>
  );
}

export default memo(HomePage);
