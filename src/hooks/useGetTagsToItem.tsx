import { useEffect } from 'react';

import { useLazyGetTagsByItemIdQuery } from 'redux/api/tagApiSlice';
import { setTagsFromInput } from 'redux/slices/tagSlice';

import { SelectOption } from 'ts/interfaces';

import { useAppDispatch, useAppSelector } from './useRedux';

const useGetTagsToItem = () => {
  const selectedItem = useAppSelector((state) => state.item.selectedItem);
  const [getGetTagsToItem, { data: tags }] = useLazyGetTagsByItemIdQuery();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (selectedItem) {
      (async () => {
        await getGetTagsToItem(selectedItem._id);
      })();
    }
  }, [selectedItem]);

  useEffect(() => {
    if (tags) {
      const modifiedTags: SelectOption[] = tags.map((tag) => ({
        value: tag._id,
        label: tag.label,
      }));
      dispatch(setTagsFromInput(modifiedTags));
    }
  }, [tags]);

  return { tags };
};

export default useGetTagsToItem;
