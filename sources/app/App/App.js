import React, {Component} from 'react'
import {YellowBox} from 'react-native'
import {Provider} from 'react-redux'
import {ApolloProvider} from 'react-apollo'
import {PersistGate} from 'redux-persist/lib/integration/react'
import RootApp from 'App/Containers/RootApp/RootApp'
import createStore from 'App/Stores'

import ApolloClientService from 'App/Services/GraphQL/ApolloClientService'

const {store, persistor} = createStore()

export default class App extends Component {
  constructor(props) {
    super(props)
    YellowBox.ignoreWarnings([
      'ViewPagerAndroid',
      'componentWillReceiveProps', // TODO: raised by packages, keep an eye on them and upgrade if needed
      'componentWillMount', // TODO: raised by packages, keep an eye on them and upgrade if needed
      'Require cycle', // Mostly linked to react-native-firebase
      'Async Storage', // Warning present event if we migrate to react-native-community package
      'Accessing view manager configs directly off UIManager', // unknown warning, not from our side
    ])
  }

  render() {
    return (
      /** * @see https://github.com/reduxjs/react-redux/blob/master/docs/api.md#provider-store */
      <ApolloProvider client={ApolloClientService.client}>
        <Provider store={store}>
          {/**
           * PersistGate delays the rendering of the app's UI until the persisted state has been retrieved
           * and saved to redux.
           * The `loading` prop can be `null` or any react instance to show during loading (e.g. a splash screen),
           * for example `loading={<SplashScreen />}`.
           * @see https://github.com/rt2zz/redux-persist/blob/master/docs/PersistGate.md
           */}
          <PersistGate loading={null} persistor={persistor}>
            {/* <ProductScreen /> */}
            <RootApp />
          </PersistGate>
        </Provider>
      </ApolloProvider>
    )
  }
}
