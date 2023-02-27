import { useEffect } from 'react';

import { useCreateTagMutation } from 'redux/api/tagApiSlice';

import { Item } from 'ts/interfaces';

import { useAppSelector } from './useRedux';

const useCreateTag = (newItem: Item | undefined) => {
  const { allTags, tagsFromInput } = useAppSelector((state) => state.tag);
  const newTags = tagsFromInput.filter((tag) =>
    allTags?.every((existingTag) => existingTag._id !== tag.value)
  );

  const [createTag, { isLoading: isLoadingTagCreation }] = useCreateTagMutation();

  useEffect(() => {
    if (newItem) {
      (async () => {
        await Promise.all(
          newTags.map(async (newTag) => {
            await createTag({ label: newTag.label, items: [newItem._id] });
          })
        );
      })();
    }
  }, [newItem]);

  return { isLoadingTagCreation };
};

export default useCreateTag;
