/**
 * Reducers specify how the application's state changes in response to actions sent to the store.
 *
 * @see https://redux.js.org/basics/reducers
 */

import {INITIAL_STATE} from './InitialState'
import {createReducer} from 'reduxsauce'
import {BookmarksTypes} from './Actions'

export const fetchBookmarks = (state) => state

export const fetchBookmarksSuccess = (state, {bookmarkedPromotions}) => ({
  ...state,
  bookmarkedPromotions: bookmarkedPromotions,
})

/**
 * @see https://github.com/infinitered/reduxsauce#createreducer
 */
export const reducer = createReducer(INITIAL_STATE, {
  [BookmarksTypes.FETCH_BOOKMARKS]: fetchBookmarks,
  [BookmarksTypes.FETCH_BOOKMARKS_SUCCESS]: fetchBookmarksSuccess,
})
