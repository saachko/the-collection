import { useEffect } from 'react';

import { useCreateTagMutation } from 'redux/api/tagApiSlice';

import { Item } from 'ts/interfaces';

import { useAppSelector } from './useRedux';

const useCreateTag = (item: Item | undefined) => {
  const { allTags, tagsFromInput } = useAppSelector((state) => state.tag);
  const newTags = tagsFromInput.filter((tag) =>
    allTags?.every((existingTag) => existingTag._id !== tag.value)
  );

  const [createTag, { isLoading: isLoadingTagCreation }] = useCreateTagMutation();

  useEffect(() => {
    if (item) {
      (async () => {
        await Promise.all(
          newTags.map(async (newTag) => {
            await createTag({ label: newTag.label, items: [item._id] });
          })
        );
      })();
    }
  }, [item]);

  return { isLoadingTagCreation };
};

export default useCreateTag;
