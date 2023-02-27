import { useEffect, useState } from 'react';

import { useGetAllTagsQuery } from 'redux/api/tagApiSlice';
import { setAllTags } from 'redux/slices/tagSlice';

import { SelectOption } from 'ts/interfaces';

import { useAppDispatch } from './useRedux';

const useGetAllTags = () => {
  const [tagsOptions, setTagOptions] = useState<SelectOption[]>([]);
  const dispatch = useAppDispatch();

  const {
    data: tags,
    isSuccess: isSuccessGetAllTags,
    isLoading: isGetAllTagsLoading,
    refetch,
  } = useGetAllTagsQuery();

  useEffect(() => {
    if (tags && isSuccessGetAllTags) {
      dispatch(setAllTags(tags));
      const modifiedTags: SelectOption[] = tags.map((tag) => ({
        value: tag._id,
        label: tag.label,
      }));
      setTagOptions(modifiedTags);
    }
  }, [tags]);

  useEffect(() => {
    refetch();
  }, []);

  return { tagsOptions, isGetAllTagsLoading };
};

export default useGetAllTags;
