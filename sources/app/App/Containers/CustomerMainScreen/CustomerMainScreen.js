import {PropTypes} from 'prop-types'
import React, {createRef} from 'react'
import {Image, Linking, Text} from 'react-native'
import {createBottomTabNavigator, createStackNavigator} from 'react-navigation'
import ScalingDrawer from 'react-native-scaling-drawer'
import BucketView from 'App/Containers/CustomerMainScreen/BucketView/BucketView'
import {DrawerContent} from 'App/Containers/CustomerMainScreen/CustomerDrawer/CustomerDrawer'
import ExploreView from 'App/Containers/CustomerMainScreen/ExploreView/ExploreView'
import FeedView from 'App/Containers/CustomerMainScreen/FeedView/FeedView'
import WalletView from 'App/Containers/CustomerMainScreen/WalletView/WalletView'
import Style from './CustomerMainScreenStyle'
import {Colors, Images} from 'App/Theme'
import NavigationService from 'App/Services/NavigationService'
import {PromotionService} from 'App/Services/GraphQL/PromotionService'
import ToastService from 'App/Services/ToastService'
import {translate} from 'App/Services/TranslationService'
// onPress={() => this.props.navigation.navigate(NavigationService.navigate('Wishlist'))}

const BucketStackNavigator = createStackNavigator({
  BucketView: {
    screen: BucketView,
    navigationOptions: {
      header: null,
    },
  },
})

const FeedStackNavigator = createStackNavigator({
  FeedView: {
    screen: FeedView,
    navigationOptions: {
      header: null,
    },
  },
})

const ExploreStackNavigator = createStackNavigator({
  ExploreView: {
    screen: ExploreView,
    navigationOptions: {
      header: null,
    },
  },
})

const WalletStackNavigator = createStackNavigator({
  WalletView: {
    screen: WalletView,
    navigationOptions: {
      header: null,
    },
  },
})

const BottomTabNavigator = createBottomTabNavigator(
  {
    Feed: {
      screen: FeedStackNavigator,
    },
    Explore: {
      screen: ExploreStackNavigator,
    },
    Wallet: {
      screen: WalletStackNavigator,
    },
    Bucket: {
      screen: BucketStackNavigator,
    },
  },
  {
    initialRouteName: 'Feed',
    backBehavior: null,
    defaultNavigationOptions: ({navigation}) => ({
      tabBarIcon: ({focused}) => {
        const {routeName} = navigation.state
        if (routeName === 'Feed') {
          return (
            <>
              <Image
                source={focused ? Images.feedActiveIcon : Images.feedIcon}
                style={Style.tabBarIcon}
                resizeMode="contain"
              />
              <Text style={focused ? Style.bottomBarLabelActive : Style.bottomBarLabelInactive}>
                {translate('FEED')}
              </Text>
            </>
          )
        } else if (routeName === 'Explore') {
          return (
            <>
              <Image
                source={focused ? Images.exploreActiveIcon : Images.exploreIcon}
                style={Style.tabBarIcon}
                resizeMode="contain"
              />
              <Text style={focused ? Style.bottomBarLabelActive : Style.bottomBarLabelInactive}>
                {translate('EXPLORE')}
              </Text>
            </>
          )
        } else if (routeName === 'Wallet') {
          return (
            <>
              <Image
                source={focused ? Images.earningActiveIcon : Images.earningIcon}
                style={Style.tabBarIcon}
                resizeMode="contain"
              />
              <Text style={focused ? Style.bottomBarLabelActive : Style.bottomBarLabelInactive}>
                {translate('EARNINGS')}
              </Text>
            </>
          )
        } else if (routeName === 'Bucket') {
          return (
            <>
              <Image
                source={focused ? Images.bookmarkCheck : Images.bookmarkUnCheck}
                style={Style.tabBarBookmarkIcon}
                resizeMode="contain"
              />
              <Text style={focused ? Style.bottomBarLabelActive : Style.bottomBarLabelInactive}>
                {translate('BOOKMARKS')}
              </Text>
            </>
          )
        }
      },
    }),
    tabBarOptions: {
      activeTintColor: Colors.selected,
      style: Style.bottomBar,
      activeColor: Colors.selected,
      inactiveColor: Colors.inActive,
      //   inactiveBackgroundColor: 'red',
      //   activeBackgroundColor: 'yellow',
      showLabel: false,
      tabStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: 'red',
      },
    },
    // tabBarOptions: {
    //   activeBackgroundColor: Colors.transparent,
    //   inactiveBackgroundColor: Colors.transparent,
    //   activeTintColor: Colors.overseaBlue,
    //   inactiveTintColor: Colors.primary,
    //   showLabel: false,
    //   showIcon: true,
    //   style: Style.bottomBar,
    //   labelStyle: Style.text,
    // },
  },
)

const defaultScalingDrawerConfig = {
  scalingFactor: 0.6,
  minimizeFactor: 0.6,
  swipeOffset: 20,
}
export const CustomerDrawer = createRef()
class CustomerMainScreenWithBottomNav extends React.Component {
  static router = BottomTabNavigator.router

  componentDidMount() {
    Linking.addEventListener('url', this.handleOpenURL)

    Linking.getInitialURL().then((url) => {
      this.navigate(url)
    })
  }

  componentWillUnmount() {
    Linking.removeEventListener('url', this.handleOpenURL)
  }

  handleOpenURL = (event) => {
    this.navigate(event.url)
  }

  navigate = (url) => {
    console.log('URL : ', url)
    if (url === null) {
      return
    }
    const route = url.replace(/.*?:\/\//g, '')
    const id = route.match(/\/([^/]+)\/?$/)[1]
    const routeName = route.split('/')[0]
    console.log(`ID : ${id} routeName : ${routeName}`)
    if (routeName === 'promotion') {
      PromotionService.getPromotionGraphql(id)
        .then((res) => {
          NavigationService.checkPromotionAndNavigate(res.data.promotion, true)
        })
        .catch((error) => {
          console.log(error)
          ToastService.show('Promotion not found 🙁')
        })
    }
  }

  render() {
    const {navigation} = this.props
    return (
      <ScalingDrawer
        ref={CustomerDrawer}
        content={<DrawerContent />}
        {...defaultScalingDrawerConfig}
        blockSwipeAbleDrawer={true}>
        <BottomTabNavigator navigation={navigation} />
      </ScalingDrawer>
    )
  }
}

CustomerMainScreenWithBottomNav.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
}

export default CustomerMainScreenWithBottomNav
