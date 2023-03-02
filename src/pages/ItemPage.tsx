import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink, useNavigate } from 'react-router-dom';

import { setCustomFieldsInItem, setCustomFieldsValues } from 'redux/slices/itemSlice';

import CommentTextarea from 'components/CommentTextarea/CommentTextarea';
import CommentsContainer from 'components/CommentsContainer/CommentsContainer';
import CustomFieldsContainer from 'components/CustomFieldsContainer/CustomFieldsContainer';
import ItemCard from 'components/ItemCard/ItemCard';
import Loader from 'components/Loader/Loader';
import TagsContainer from 'components/TagsContainer/TagsContainer';

import useGetCommentsToItem from 'hooks/useGetCommentsToItem';
import useGetCustomFieldsInCollection from 'hooks/useGetCustomFieldsInCollection';
import useGetItemFromLocation from 'hooks/useGetItemFromLocation';
import useGetTagsToItem from 'hooks/useGetTagsToItem';
import { useAppDispatch, useAppSelector } from 'hooks/useRedux';
import useSubscribeOnCommentsChanges from 'hooks/useSubscribeOnCommentsChanges';

function ItemPage() {
  const { t } = useTranslation('translation', { keyPrefix: 'itemPage' });
  const navigate = useNavigate();
  useGetItemFromLocation();
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);
  const selectedItem = useAppSelector((state) => state.item.selectedItem);
  const { fieldsInCollection } = useGetCustomFieldsInCollection(
    selectedItem?.collectionId
  );
  const { tags } = useGetTagsToItem();
  const { isLoadingGetComments } = useGetCommentsToItem();
  const dispatch = useAppDispatch();
  useSubscribeOnCommentsChanges();

  useEffect(() => {
    if (fieldsInCollection) {
      dispatch(setCustomFieldsInItem(fieldsInCollection));
      const itemFieldsValues = selectedItem
        ? [...selectedItem.customFields].map((field) => field.value)
        : [];
      dispatch(setCustomFieldsValues(itemFieldsValues));
    }
  }, [fieldsInCollection]);

  return (
    <div className="content">
      <NavLink className="link mb-2" to="" onClick={() => navigate(-1)}>
        {t('return')}
      </NavLink>
      <ItemCard item={selectedItem} />
      <TagsContainer tags={tags} />
      <CustomFieldsContainer fields={selectedItem?.customFields} />
      <CommentsContainer />
      {isLoadingGetComments && <Loader />}
      {isLoggedIn && <CommentTextarea />}
    </div>
  );
}

export default ItemPage;
