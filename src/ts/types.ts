type SetState<T> = React.Dispatch<React.SetStateAction<T>>;

type Themes = 'light' | 'dark';

type AuthModal = 'signIn' | 'signUp' | '';

export type { SetState, Themes, AuthModal };
