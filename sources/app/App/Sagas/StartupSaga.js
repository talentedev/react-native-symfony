// import {put} from 'redux-saga/effects'
// import ExampleActions from 'App/Stores/Example/Actions'
// import BookmarksActions from 'App/Stores/Bookmarks/Actions'
import NavigationService from 'App/Services/NavigationService'
import TranslationService from 'App/Services/TranslationService'
import StorageService from 'App/Services/AsyncStorage/StorageService'

/**
 * The startup saga is the place to define behavior to execute when the application starts.
 */
export function* startup() {
  // Dispatch a redux action using `put()`
  // @see https://redux-saga.js.org/docs/basics/DispatchingActions.html

  // yield put(ExampleActions.fetchUser())
  StorageService.initGlobalStorage().then(() => {
    global.storage
      .load({key: StorageService.LANG_KEY})
      .then((lang) => {
        _init(lang)
      })
      .catch(() => {
        _init(null)
      })
  })
  // Add more operations you need to do at startup here
  // ...
  // yield put(BookmarksActions.fetchBookmarks())

  // // When those operations are finished we redirect to the main screen
  // NavigationService.navigateAndReset('SignInScreen')
}

const _init = (lang = null) => {
  TranslationService.resetLanguage(lang).then(() => {
    NavigationService.checkUserTypeAndNavigate(true)
  })
}
