import {put, call} from 'redux-saga/effects'
import BookmarksActions from 'App/Stores/Bookmarks/Actions'
import {BookmarksService} from 'App/Services/AsyncStorage/BookmarksService'

/**
 * A saga can contain multiple functions.
 */
export function* fetchBookmarks() {
  // Dispatch a redux action using `put()`
  // @see https://redux-saga.js.org/docs/basics/DispatchingActions.html

  // Fetch the temperature from an API
  const bookmarkedPromotions = yield call(BookmarksService.getAllBookmarks)

  if (bookmarkedPromotions) {
    yield put(BookmarksActions.fetchBookmarksSuccess(bookmarkedPromotions))
  } else {
    console.warn('There was an error while fetching the bookmarks.')
  }
}
