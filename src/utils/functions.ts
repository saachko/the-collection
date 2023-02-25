import { Collection, ParsedToken, User } from 'ts/interfaces';
import { SortTypes } from 'ts/types';

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

const createCollectionImage = (title: string | undefined, ownerId: string | undefined) =>
  `https://source.boringavatars.com/marble/120/${title}%20${ownerId}?colors=F97D58,CDDCEB,F9DBCF,33B99,5D70C5&square`;

const formatDate = (stringDate: string) => {
  const timestamp = Date.parse(stringDate);
  const date = new Date(timestamp);
  return date.toLocaleString('ru-RU');
};

const sortData = (
  sortType: SortTypes,
  userData?: User[] | null,
  collectionData?: Collection[] | null
) => {
  const data = userData || collectionData;
  if (data) {
    switch (sortType) {
      case 'fromLessToMore':
        if (collectionData) {
          return [...(data as Collection[])].sort(
            (a, b) => a.itemsQuantity - b.itemsQuantity
          );
        }
        break;
      case 'fromMoreToLess':
        if (collectionData) {
          return [...(data as Collection[])].sort(
            (a, b) => b.itemsQuantity - a.itemsQuantity
          );
        }
        break;
      case 'fromAtoZ':
        if (userData) {
          return [...(data as User[])].sort((a, b) => (a.username > b.username ? 1 : -1));
        }
        if (collectionData) {
          return [...(data as Collection[])].sort((a, b) => (a.title > b.title ? 1 : -1));
        }
        break;
      case 'fromZtoA':
        if (userData) {
          return [...(data as User[])].sort((a, b) => (a.username < b.username ? 1 : -1));
        }
        if (collectionData) {
          return [...(data as Collection[])].sort((a, b) => (a.title < b.title ? 1 : -1));
        }
        break;
      case 'fromOldToNew':
        return [...data].sort((a, b) =>
          formatDate(a.createdAt) > formatDate(b.createdAt) ? 1 : -1
        );
      case 'fromNewToOld':
      default:
        return [...data].sort((a, b) =>
          formatDate(a.createdAt) < formatDate(b.createdAt) ? 1 : -1
        );
    }
  }
  return data;
};

const filterUsersByRole = (filteringList: User[] | null) =>
  filteringList?.filter((user) => user.roles.includes('admin'));

const filterUsersByStatus = (filteringList: User[] | null) =>
  filteringList?.filter((user) => user.isBlocked);

export {
  checkToken,
  createUserAvatar,
  createCollectionImage,
  formatDate,
  sortData,
  filterUsersByRole,
  filterUsersByStatus,
};
