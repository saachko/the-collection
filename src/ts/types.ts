type SetState<T> = React.Dispatch<React.SetStateAction<T>>;

type Themes = 'light' | 'dark';

type AuthModal = 'signIn' | 'signUp' | '';

type SortTypes = 'fromAtoZ' | 'fromZtoA' | 'fromNewToOld' | 'fromOldToNew';

export type { SetState, Themes, AuthModal, SortTypes };
