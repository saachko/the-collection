# The Collection

**The Collection** is a Web-app for personal collections managements. It was made as a project for itransition internship.

[Link to the deploy](https://the-collection-saachko.netlify.app/)

[Link to the backend repository](https://github.com/saachko/the-collection-backend)

> **Attention!** The backend is deployed on a free service render.com, so when you run the application for the first time, you need to wait a little bit. Thank you 🙏

## Usage

Nonauthenticated used have read-only access. Authenticated users have access to everythng except "admin area". Admin area give administators abilities to manage users.

Every user has a personal page, which allow to manage list of own collections (add/remove/edit). Collection can be managed (edit/add/remove) only by the owner (creator) or admin. Collection allows to define arbitrary number of custom fields, which will be filled for each item in this collection.

Every page provides access to full-text search over whole site with items as a result, also you can filter items by tags.

Items can be commented by authenticated users, but any user (either authenticated or nonauthenticated) will see new comment immediately. Items have likes as well.

The app supports 2 languages: English and Russian and two visual themes - dark and light.

## Main stack:

- react
- react-router
- typescript
- redux toolkit/rtk query

## Styling:

- sass/scss modules
- bootstrap
- react-icons

## Additional tools:

- eslint
- prettier
- clsx
- i18next
- meilisearch
- react-drag-drop-files
- firebase cloud storage
- vite

_Developed by [Anastasiya Sachko](https://github.com/saachko)_
