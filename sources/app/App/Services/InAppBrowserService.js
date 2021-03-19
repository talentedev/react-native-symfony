import {Linking} from 'react-native'
import InAppBrowser from 'react-native-inappbrowser-reborn'
import Colors from 'App/Theme/Colors'

async function openInAppBrowserLink(link) {
  try {
    const url = link
    if (await InAppBrowser.isAvailable()) {
      const result = await InAppBrowser.open(url, {
        // iOS Properties
        dismissButtonStyle: 'cancel',
        preferredBarTintColor: Colors.softBlue,
        preferredControlTintColor: 'white',
        readerMode: false,
        animated: true,
        modalPresentationStyle: 'overFullScreen',
        modalTransitionStyle: 'partialCurl',
        modalEnabled: true,
        // Android Properties
        showTitle: true,
        toolbarColor: Colors.softBlue,
        secondaryToolbarColor: 'black',
        enableUrlBarHiding: true,
        enableDefaultShare: true,
        forceCloseOnRedirection: false,
        // Specify full animation resource identifier(package:anim/name)
        // or only resource name(in case of animation bundled with app).
        animations: {
          startEnter: 'slide_in_right',
          startExit: 'slide_out_left',
          endEnter: 'slide_in_left',
          endExit: 'slide_out_right',
        },
        headers: {
          'my-custom-header': 'my custom header value',
        },
        waitForRedirectDelay: 0,
      })
      console.log(result)
    } else Linking.openURL(url)
  } catch (error) {
    console.log(error.message)
  }
}

export default {
  openInAppBrowserLink,
}
