import {Alert, Platform} from 'react-native'
import Storage from 'react-native-storage'
import AsyncStorage from '@react-native-community/async-storage'
import Permissions from 'react-native-permissions'
import {translate} from '../TranslationService'

// ref. https://github.com/sunnylqm/react-native-storage

const storage = new Storage({
  // maximum capacity, default 1000
  size: 1000,

  // Use AsyncStorage for RN apps, or window.localStorage for web apps.
  // If storageBackend is not set, data will be lost after reload.
  storageBackend: AsyncStorage, // for web: window.localStorage

  // expire time in milliseconds, eg: 1000 * 3600 * 24 (= 1 day).
  // can be null, which means never expire.
  defaultExpires: null,

  // cache data in the memory. default is true.
  enableCache: true,

  // if data was not found in storage or expired data was found,
  // the corresponding sync method will be invoked returning
  // the latest data.
  // sync: {
  //   // retrieve wishlist
  //   async wishlist(params) {
  //     let {
  //       id, // = productId
  //     } = params
  //     const response = await fetch('wishlist/?id=' + id)
  //     const responseText = await response.text()
  //     // console.log(`wishlist${id} sync resp: `, responseText)
  //     const json = JSON.parse(responseText)
  //     if (json && json.wishlist) {
  //       storage.save({
  //         key: 'wishlist',
  //         id,
  //         data: json.wishlist,
  //       })
  //       // return required data when succeed
  //       return json.wishlist
  //     } else {
  //       // throw error when failed
  //       throw new Error(`error syncing wishlist${id}`)
  //     }
  //   },
  // },
})

// I suggest you have one (and only one) storage instance in global scope.
const initGlobalStorage = async () => {
  global.storage = storage
}

// clear map and remove all "key-id" data
// !! important: "key-only" data is not cleared, and is left intact
const clearStorage = () => {
  return storage.clearMap()
}

const askPhotoPermission = () => {
  Permissions.request(Platform.OS === 'ios' ? 'photo' : 'storage').then(() => {
    checkPhotoPermission()
  })
}

const checkPhotoPermission = () => {
  return Permissions.check(Platform.OS === 'ios' ? 'photo' : 'storage').then((response) => {
    if (response === 'authorized') {
      return true
    } else if (response === 'undetermined') {
      askPhotoPermission()
    } else {
      Alert.alert(
        translate('errors.error'),
        Platform.OS === 'ios'
          ? translate('enablePhotoPermission')
          : translate('enableStoragePermission'),
        [
          {
            text: translate('cancel'),
            style: 'cancel',
          },
          {text: 'OK', onPress: () => askPhotoPermission()},
        ],
      )
    }
  })
}

export default {
  USER_PHONE_NUMBER_DATA_KEY: 'userPhoneNumberData',
  LANG_KEY: 'lang',
  initGlobalStorage,
  clearStorage,
  checkPhotoPermission,
}
