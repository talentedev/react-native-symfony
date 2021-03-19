import {NavigationActions, StackActions} from 'react-navigation'
import {UserService} from './GraphQL/UserService'
import {TokenService} from './AsyncStorage/TokenService'
import ApolloClientService from './GraphQL/ApolloClientService'
// import moment from 'moment'

/**
 * The navigation is implemented as a service so that it can be used outside of components, for example in sagas.
 *
 * @see https://reactnavigation.org/docs/en/navigating-without-navigation-prop.html
 */

let navigator

/**
 * This function is called when the RootScreen is created to set the navigator instance to use.
 */
function setTopLevelNavigator(navigatorRef) {
  navigator = navigatorRef
}

/**
 * Call this function when you want to navigate to a specific route.
 *
 * @param routeName The name of the route to navigate to. Routes are defined in RootScreen using createStackNavigator()
 * @param params Route parameters.
 */
function navigate(routeName, params) {
  navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    }),
  )
}

/**
 * Call this function when you want to navigate to a specific route AND reset the navigation history.
 *
 * That means the user cannot go back. This is useful for example to redirect from a splashscreen to
 * the main screen: the user should not be able to go back to the splashscreen.
 *
 * @param routeName The name of the route to navigate to. Routes are defined in RootScreen using createStackNavigator()
 * @param params Route parameters.
 */
function navigateAndReset(routeName, params) {
  navigator.dispatch(
    StackActions.reset({
      index: 0,
      key: null,
      actions: [
        NavigationActions.navigate({
          routeName,
          params,
        }),
      ],
    }),
  )
}

/**
 * Call this function when you want to add a route on top of the stack and navigates forward to it.
 *
 * Use pop() to navigate back to previous routes.
 *
 * @param routeName The name of the route to navigate to. Routes are defined in RootApp using createStackNavigator()
 * @param params Route parameters.
 */
function push(routeName, params) {
  navigator.dispatch(
    StackActions.push({
      routeName,
      params,
    }),
  )
}

/**
 * Call this function when you want to navigate back to previous routes.
 *
 * @param n The number of screens to pop back by.
 */
function pop(n = 1) {
  navigator.dispatch(
    StackActions.pop({
      n,
    }),
  )
}

/**
 * Call this function when you want to navigate back to the first screen in the stack, dismissing all the others.
 *
 * It's functionally identical to StackActions.pop({n: currentIndex}).
 *
 */
function popToTop() {
  navigator.dispatch(StackActions.popToTop())
}

function checkUserTypeAndNavigate(checkToken = true) {
  UserService.isCustomerOrBusiness()
    .then((res) => {
      // User logged
      const response = res.data.customerOrBusiness
      if (response === UserService.CUSTOMER) {
        UserService.getCustomerUser().then((res) => {
          global.bookmarksKey = 'BOOKMARK' + res.data.customerUser.id.replace(/_/g, '--')
          navigateAndReset('CustomerMainScreen')
        })
      } else if (response === UserService.BUSINESS) {
        UserService.getBusinessUser().then((res) => {
          global.bookmarksKey = 'BOOKMARK' + res.data.businessUser.id.replace(/_/g, '--')
          navigateAndReset('BusinessMainScreen')
        })
      } else {
        UserService.logoutAndClearTokens().then(() => {
          return clearApolloStoreAndNavigateToSignInScreen()
        })
      }
    })
    .catch(() => {
      // User not logged
      if (checkToken) {
        TokenService.getSmsSignInData()
          .then((smsSignInData) => {
            if (smsSignInData === null) {
              return clearApolloStoreAndNavigateToSignInScreen()
            }
            // Resend token and start a new logged Apollo session
            UserService.smsLogin(smsSignInData.smsSignInToken)
              .then((res) => {
                const userExists = res.data.smsLogin
                if (userExists) {
                  checkUserTypeAndNavigate(false)
                } else {
                  navigateAndReset('RegionScreen')
                }
              })
              .catch((err) => {
                console.log('err', err)
                return clearApolloStoreAndNavigateToSignInScreen()
              })
          })
          .catch((err) => {
            console.log('err', err)
            return clearApolloStoreAndNavigateToSignInScreen()
          })
      } else {
        UserService.logoutAndClearTokens().then(() => {
          return clearApolloStoreAndNavigateToSignInScreen()
        })
      }
    })
}

function checkPromotionAndNavigate(promotion, isCustomer = true) {
  if (isCustomer) {
    // const {isRedeemed, isReferrer, startDate, endDate, isReturningAllowed} = promotion
    const {isRedeemed, isReferrer, isReturningAllowed} = promotion
    if ((!isReferrer && !isRedeemed) || isReturningAllowed) {
      navigate('ExpandedFeedPromotionScreen', {itemData: promotion})
    } else if (!isReferrer && isRedeemed) {
      navigate('ReferPromotionScreen', {itemData: promotion})
    } else if (isReferrer && isRedeemed) {
      navigate('ReferalGoingOnScreen', {itemData: promotion})
      // TODO: deal with expired & not redeemed promotions

      // if (moment(startDate) < moment() && moment() < moment(endDate)) {
      //   navigate('ReferalGoingOnScreen', {itemData: promotion})
      // } else if (moment(startDate) < moment() && moment(endDate) < moment()) {
      //   navigate('ReferalCompletedScreen', {itemData: promotion})
      // }
    }
  } else {
    // TODO: business part
  }
}

function clearApolloStoreAndNavigateToSignInScreen() {
  return ApolloClientService.client.clearStore().then(() => {
    navigateAndReset('SignInScreen')
  })
}

export default {
  navigate,
  navigateAndReset,
  push,
  pop,
  popToTop,
  checkUserTypeAndNavigate,
  checkPromotionAndNavigate,
  setTopLevelNavigator,
  clearApolloStoreAndNavigateToSignInScreen,
}
