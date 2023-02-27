import { useEffect } from 'react';

import { useLazyGetTagsByItemIdQuery } from 'redux/api/tagApiSlice';

import { useAppSelector } from './useRedux';

const useGetTagsToItem = () => {
  const selectedItem = useAppSelector((state) => state.item.selectedItem);
  const [getGetTagsToItem, { data: tags }] = useLazyGetTagsByItemIdQuery();

  useEffect(() => {
    if (selectedItem) {
      (async () => {
        await getGetTagsToItem(selectedItem._id);
      })();
    }
  }, [selectedItem]);

  return { tags };
};

export default useGetTagsToItem;
