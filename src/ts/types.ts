type SetState<T> = React.Dispatch<React.SetStateAction<T>>;

type Themes = 'light' | 'dark';

type AuthModal = 'signIn' | 'signUp' | '';

type SortTypes =
  | 'fromAtoZ'
  | 'fromZtoA'
  | 'fromNewToOld'
  | 'fromOldToNew'
  | 'fromMoreToLess'
  | 'fromLessToMore';

type CustomFieldTypes = 'number' | 'string' | 'text' | 'date' | 'checkbox' | '';

type ImageType = 'beam' | 'marble';

export type { SetState, Themes, AuthModal, SortTypes, CustomFieldTypes, ImageType };
