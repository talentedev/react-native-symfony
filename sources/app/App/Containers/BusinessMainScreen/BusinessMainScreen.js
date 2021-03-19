import {PropTypes} from 'prop-types'
import React, {createRef} from 'react'
import {createBottomTabNavigator, createStackNavigator} from 'react-navigation'

import CampaignView from 'App/Containers/BusinessMainScreen/CampaignView/CampaignView'
import {DrawerContent} from 'App/Containers/BusinessMainScreen/BusinessDrawer/BusinessDrawer'
import ProfileView from 'App/Containers/BusinessMainScreen/ProfileView/ProfileView'
import {Colors, Images, Metrics} from 'App/Theme'
import ScalingDrawer from 'react-native-scaling-drawer'
import {Image, Text} from 'react-native'
import Style from './BusinessMainScreenStyle'
import {translate} from 'App/Services/TranslationService'

// onPress={() => this.props.navigation.navigate(NavigationService.navigate('Wishlist'))}

const CampaignStackNavigator = createStackNavigator({
  CampaignView: {
    screen: CampaignView,
    navigationOptions: {
      header: null,
    },
  },
})

const ProfileStackNavigator = createStackNavigator({
  ProfileView: {
    screen: ProfileView,
    navigationOptions: {
      header: null,
    },
  },
})

const BottomTabNavigator = createBottomTabNavigator(
  {
    Campaign: {
      screen: CampaignStackNavigator,
    },
    Profile: {
      screen: ProfileStackNavigator,
    },
  },
  {
    backBehavior: null,
    initialRouteName: 'Campaign',
    barStyle: {height: Metrics.applyRatio(87)},
    defaultNavigationOptions: ({navigation}) => ({
      tabBarIcon: ({focused}) => {
        const {routeName} = navigation.state
        if (routeName === 'Campaign') {
          return (
            <>
              <Image
                source={focused ? Images.campaignSelected : Images.campaignUnSelected}
                resizeMode="contain"
                style={[
                  Style.tabBarCampaignIcon,
                  {
                    marginLeft: Metrics.applyRatio(75),
                  },
                ]}
              />
              <Text
                style={[
                  focused ? Style.bottomBarLabelActive : Style.bottomBarLabelInactive,
                  {marginLeft: Metrics.applyRatio(75)},
                ]}>
                {translate('CAMPAIGNS')}
              </Text>
            </>
          )
        } else if (routeName === 'Profile') {
          return (
            <>
              <Image
                source={focused ? Images.profileSelected : Images.profileUnSelected}
                style={[Style.tabBarIcon, {marginRight: Metrics.applyRatio(75)}]}
                resizeMode="contain"
              />
              <Text
                style={[
                  focused ? Style.bottomBarLabelActive : Style.bottomBarLabelInactive,
                  {marginRight: Metrics.applyRatio(75)},
                ]}>
                {translate('PROFILE')}
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
      showLabel: false,
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
export const BusinessDrawer = createRef()
class BusinessMainScreenWithBottomNav extends React.Component {
  static router = BottomTabNavigator.router
  render() {
    const {navigation} = this.props
    return (
      <ScalingDrawer
        ref={BusinessDrawer}
        content={<DrawerContent />}
        {...defaultScalingDrawerConfig}
        blockSwipeAbleDrawer={true}>
        <BottomTabNavigator navigation={navigation} />
      </ScalingDrawer>
    )
  }
}

BusinessMainScreenWithBottomNav.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
}

export default BusinessMainScreenWithBottomNav
