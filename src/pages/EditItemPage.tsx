import React, { memo, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import ItemEditForm from 'components/ItemEditForm/ItemEditForm';
import Loader from 'components/Loader/Loader';

import { useAppSelector } from 'hooks/useRedux';

function EditItemPage() {
  const [isItemDataLoading, setItemDataLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { isAdmin, user, isLoggedIn } = useAppSelector((state) => state.user);
  const selectedItem = useAppSelector((state) => state.item.selectedItem);

  useEffect(() => {
    if (selectedItem && user) {
      if ((isAdmin && isLoggedIn) || selectedItem.ownerId === user._id) {
        setItemDataLoading(false);
      } else {
        navigate('/');
      }
    } else {
      navigate(location.pathname.slice(0, -5));
    }
  }, [selectedItem, user]);

  return (
    <div className="content">
      {isItemDataLoading && <Loader />}
      <ItemEditForm />
    </div>
  );
}

export default memo(EditItemPage);
