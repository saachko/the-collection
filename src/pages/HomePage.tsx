import React, { memo } from 'react';

import CollectionsSection from 'components/CollectionsSection/CollectionsSection';
import ItemsSection from 'components/ItemsSection/ItemsSection';
import Loader from 'components/Loader/Loader';
import SignUpSection from 'components/SignUpSection/SignUpSection';
import WelcomeSection from 'components/WelcomeSection/WelcomeSection';

import useGetAllCollections from 'hooks/useGetAllCollections';
import useGetAllItems from 'hooks/useGetAllItems';
import { useAppSelector } from 'hooks/useRedux';

function HomePage() {
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);
  const { isGetAllItemsLoading } = useGetAllItems();
  const { isGetCollectionsLoading } = useGetAllCollections();

  return (
    <div className="content pt-0 pb-0">
      {(isGetAllItemsLoading || isGetCollectionsLoading) && <Loader />}
      <WelcomeSection />
      <CollectionsSection />
      <ItemsSection />
      {!isLoggedIn && <SignUpSection />}
    </div>
  );
}

export default memo(HomePage);
