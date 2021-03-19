let BOOKMARKS_KEY = 'allBookmarks'

const getAllBookmarkIds = () => {
  return global.storage.getIdsForKey(BOOKMARKS_KEY)
}

const getAllBookmarks = () => {
  return global.storage.getAllDataForKey(BOOKMARKS_KEY)
}

const addBookmark = (bookmark) => {
  global.storage.save({
    key: BOOKMARKS_KEY,
    id: bookmark.uuid,
    data: bookmark,
  })
}

const loadBookmark = (uuid) => {
  return global.storage
    .load({
      key: BOOKMARKS_KEY,
      id: uuid,
    })
    .then((ret) => {
      // found data goes to then()
      // console.log('Retrieved bookmark uuid=', ret.bookmark.uuid)
      return ret
    })
    .catch((err) => {
      // any exception including data not found
      // goes to catch()
      console.warn(err.message)
      switch (err.name) {
        case 'NotFoundError':
          // TODO;
          break
        case 'ExpiredError':
          // TODO
          break
      }
    })
}

const removeBookmark = (bookmark) => {
  global.storage.remove({
    key: BOOKMARKS_KEY,
    id: bookmark.uuid,
  })
}

const getBookmarksKey = () => BOOKMARKS_KEY

const changeBookmarksKey = (newKey) => {
  BOOKMARKS_KEY = newKey
}

export const BookmarksService = {
  getBookmarksKey,
  changeBookmarksKey,
  getAllBookmarkIds,
  getAllBookmarks,
  addBookmark,
  loadBookmark,
  removeBookmark,
}
