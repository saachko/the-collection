import { useEffect } from 'react';

import { useUpdateTagByIdMutation } from 'redux/api/tagApiSlice';

import { Item } from 'ts/interfaces';

import { useAppSelector } from './useRedux';

const useUpdateTagWithNewItem = (newItem: Item | undefined) => {
  const allTags = useAppSelector((state) => state.tag.allTags);
  const tagsFromInput = useAppSelector((state) => state.tag.tagsFromInput);
  const tagsToUpdate = allTags?.filter((existingTag) =>
    tagsFromInput.some((tag) => existingTag._id === tag.value)
  );

  const [updateTag, { isLoading: isLoadingTagUpdate }] = useUpdateTagByIdMutation();

  useEffect(() => {
    if (newItem && tagsToUpdate) {
      (async () => {
        await Promise.all(
          tagsToUpdate.map(async (tag) => {
            await updateTag({
              tagId: tag._id,
              body: { ...tag, items: [...tag.items, newItem._id] },
            });
          })
        );
      })();
    }
  }, [newItem]);

  return { isLoadingTagUpdate };
};

export default useUpdateTagWithNewItem;
