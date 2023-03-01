import React, { memo } from 'react';

import CollectionsSection from 'components/CollectionsSection/CollectionsSection';
import SignUpSection from 'components/SignUpSection/SignUpSection';
import WelcomeSection from 'components/WelcomeSection/WelcomeSection';

import { useAppSelector } from 'hooks/useRedux';

function HomePage() {
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);

  return (
    <div className="content pt-0 pb-0">
      <WelcomeSection />
      <CollectionsSection />
      {!isLoggedIn && <SignUpSection />}
    </div>
  );
}

export default memo(HomePage);
