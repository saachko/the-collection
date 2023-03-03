enum Endpoints {
  signIn = 'auth/signin',
  signUp = 'auth/signup',
  users = 'users/',
  collections = 'collections/',
  collectionsByUser = 'collections/user/',
  customFields = 'customFields/',
  customFieldsInCollection = 'customFields/collection/',
  items = 'items/',
  itemsInCollection = 'items/collection/',
  tags = 'tags/',
  tagsToItem = 'tags/item/',
  comments = 'comments/',
  commentsAll = 'comments/all',
  commentsToItem = 'comments/item/',
}

enum Methods {
  get = 'GET',
  post = 'POST',
  put = 'PUT',
  delete = 'DELETE',
}

export { Endpoints, Methods };
