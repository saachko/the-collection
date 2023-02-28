import { useEffect } from 'react';

import { useUpdateTagByIdMutation } from 'redux/api/tagApiSlice';

import { Item } from 'ts/interfaces';

import { useAppSelector } from './useRedux';

const useUpdateTag = (item: Item | undefined) => {
  const { tagsFromInput, tagsToItem, allTags } = useAppSelector((state) => state.tag);
  const tagsToRemove = tagsToItem?.filter((existingTag) =>
    tagsFromInput.every((tag) => existingTag._id !== tag.value)
  );

  const itemTagsList = allTags?.filter((existingTag) =>
    tagsFromInput.some((tag) => existingTag._id === tag.value)
  );
  const tagsToAdd = itemTagsList?.filter((tag) =>
    tagsToItem?.every((existingTag) => existingTag._id !== tag._id)
  );

  const [updateTag, { isLoading: isLoadingTagUpdate }] = useUpdateTagByIdMutation();

  useEffect(() => {
    if (item && tagsToRemove) {
      (async () => {
        await Promise.all(
          tagsToRemove.map(async (tag) => {
            const updatedItemsList = tag.items.filter(
              (itemElem) => itemElem !== item._id
            );
            await updateTag({
              tagId: tag._id,
              body: { ...tag, items: updatedItemsList },
            });
          })
        );
      })();
    }
  }, [item]);

  useEffect(() => {
    if (item && tagsToAdd) {
      (async () => {
        await Promise.all(
          tagsToAdd.map(async (tag) => {
            await updateTag({
              tagId: tag._id,
              body: { ...tag, items: [...tag.items, item._id] },
            });
          })
        );
      })();
    }
  }, [item]);

  return { isLoadingTagUpdate };
};

export default useUpdateTag;
