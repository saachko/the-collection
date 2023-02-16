import { ParsedToken } from 'ts/interfaces';

const parseJwt = (tokenToParse: string) => {
  const base64Url = tokenToParse.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split('')
      .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
      .join('')
  );

  return JSON.parse(jsonPayload);
};

const checkToken = (userToken: string) => {
  try {
    const parsedToken: ParsedToken = parseJwt(userToken);
    const nowTimestamp = Math.floor(Date.now() / 1000);
    if (!parsedToken.isBlocked && parsedToken.exp > nowTimestamp) {
      return parsedToken.id;
    }
    return false;
  } catch (error) {
    return false;
  }
};

const createUserAvatar = (username: string | undefined, email: string | undefined) =>
  `https://source.boringavatars.com/beam/120/${username}%20${email}?colors=F97D58,CDDCEB,F9DBCF,33B99,5D70C5&square`;

export { checkToken, createUserAvatar };
