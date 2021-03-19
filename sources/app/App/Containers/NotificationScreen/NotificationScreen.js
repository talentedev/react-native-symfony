import React from 'react'
import {Fonts, Metrics, Colors} from 'App/Theme'
import {Image, ScrollView, Text, View, FlatList, TouchableOpacity} from 'react-native'
import Style from './NotificationScreenStyle'
import NavigationService from 'App/Services/NavigationService'
import CustomHeader from 'App/Components/CustomHeader'
import {NotificationService} from 'App/Services/GraphQL/NotificationService'
import Moment from 'moment'
import NotificationTypeEnum from 'App/Enums/NotificationTypeEnum'
import {translate} from 'App/Services/TranslationService'
import Images from 'App/Theme/Images'
import {UserService} from 'App/Services/GraphQL/UserService'
import {convertCurrency} from 'App/Services/Utils'

const FETCH_LIMIT = 15
const FETCH_OFFSET = 0
class NotificationScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      notifications: [],
      fetchLimit: FETCH_LIMIT,
      fetchOffset: FETCH_OFFSET,
      totalCount: 0,
      initialTotalCount: 0,
      firstLoading: true,
      civility: 'M',
    }
    this._fetchCivility()
  }
  onPressLeftIcon = () => {
    NavigationService.pop()
    console.log(this.state)
  }
  keyExtractor = (item, index) => index.toString()
  _fetchCivility = () => {
    UserService.getCustomerCivility().then((res) => {
      this.setState({civility: res.data.customerUser.civility}, () => {
        this._fetchNotification()
      })
    })
  }
  _fetchNotification = () => {
    NotificationService.getNotifications(this.state.fetchLimit, this.state.fetchOffset).then(
      (res) => {
        const newCount = res.data.notifications.count
        if (newCount === this.state.totalCount || this.state.fetchOffset === 0) {
          if (this.state.fetchOffset === 0) {
            this.setState({initialTotalCount: newCount})
          }
          // execute in first fetch or no new noti received
          const oldData = this.state.notifications
          const newData = oldData.concat(res.data.notifications.items)
          const oldOffset = this.state.fetchOffset
          const newOffset = oldOffset + this.state.fetchLimit
          this.setState({
            notifications: newData,
            fetchOffset: newOffset,
            totalCount: newCount,
            firstLoading: false,
          })
        } else {
          // execute when new noti received
          const newNotificationCount = newCount - this.state.totalCount
          NotificationService.getNotifications(
            this.state.fetchLimit,
            this.state.fetchOffset + newNotificationCount,
          ).then((res) => {
            const oldData = this.state.notifications
            const newData = oldData.concat(res.data.notifications.items)
            const oldOffset = this.state.fetchOffset
            const newOffset = oldOffset + this.state.fetchLimit + newNotificationCount
            this.setState({
              notifications: newData,
              fetchOffset: newOffset,
              totalCount: newCount,
            })
          })
        }
      },
    )
  }
  isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = Metrics.applyRatio(50)
    if (layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom) {
      this.setState({reachedBottom: true})
      return true
    }
    return false
  }
  render() {
    const {notifications} = this.state
    return (
      <View style={Style.container}>
        <CustomHeader
          title={'Notifications'}
          leftComponent="back"
          leftIconPress={this.onPressLeftIcon}
        />

        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          style={{
            marginLeft: Metrics.applyRatio(20),
            marginRight: Metrics.applyRatio(20),
          }}
          ref={(scrollView) => {
            this.scrollView = scrollView
          }}
          onContentSizeChange={() => {
            this.setState({reachedBottom: false})
          }}
          onScroll={({nativeEvent}) => {
            if (!this.state.reachedBottom && this.isCloseToBottom(nativeEvent)) {
              this._fetchNotification()
            }
          }}
          scrollEventThrottle={400}
          alwaysBounceVertical={false} // for iOS
        >
          {this.state.initialTotalCount === 0 && !this.state.firstLoading ? (
            <View style={Style.emptyScreen}>
              <Image
                source={Images.undrawMakerLaunchCrhe}
                style={{
                  height: Metrics.applyRatio(142),
                  width: Metrics.applyRatio(206),
                  marginBottom: Metrics.applyRatio(30),
                }}
              />
              {/* <Text style={Style.messageText}>{translate('featureComingSoon')}</Text> */}
              <Text style={Style.messageText}>{translate('noNotificationHistory')}</Text>
              <TouchableOpacity
                style={Style.backButtonContainer}
                onPress={() => {
                  NavigationService.pop()
                }}>
                <Text style={Style.backButton}>{translate('goBack')}</Text>
              </TouchableOpacity>
              {/* <Text style={Fonts.style.dropDownText}>{'No notification history'}</Text> */}
            </View>
          ) : (
            <>
              <FlatList
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                data={notifications}
                keyExtractor={this.keyExtractor}
                renderItem={({item}) => {
                  return (
                    <View style={Style.notificationStyle}>
                      <View style={Style.iconContainer}>
                        <Image
                          source={NotificationService.getIconByType(this.state.civility, item.type)}
                          style={Style.iconStyle}
                        />
                      </View>
                      <View style={Style.textBarStyle}>
                        <View>
                          <Text style={Style.itemTextStyle}>
                            <Text style={Style.titleTextStyle}>
                              {item.type === NotificationTypeEnum.NEW_REFERRAL
                                ? 'New Referral'
                                : item.type === NotificationTypeEnum.WITHDRAW
                                ? '$' + convertCurrency(item.amount) + ' transferred'
                                : item.type === NotificationTypeEnum.REFERRED
                                ? 'Refer promotion'
                                : item.type === NotificationTypeEnum.REDEEMED
                                ? 'Promotion redeemed'
                                : ''}
                            </Text>
                            {item.type === NotificationTypeEnum.NEW_REFERRAL
                              ? ' earned at ' + item.businessName
                              : item.type === NotificationTypeEnum.WITHDRAW
                              ? ' successfully to your Paypal account.'
                              : item.type === NotificationTypeEnum.REFERRED
                              ? ' at ' + item.businessName + ' to start earning '
                              : item.type === NotificationTypeEnum.REDEEMED
                              ? ' at ' + item.businessName
                              : ''}
                          </Text>
                        </View>
                        <Text style={Style.timeTextStyle}>
                          {Moment(item.timestamp, Moment.ISO_8601).fromNow()}
                        </Text>
                      </View>
                      <Text />
                    </View>
                  )
                }}
                horizontal={false}
              />
              <Text
                style={[
                  Fonts.style.greyInfoDarker,
                  {color: Colors.grey4, marginVertical: Metrics.applyRatio(20)},
                ]}>
                {this.state.fetchOffset >= this.state.initialTotalCount && !this.state.firstLoading
                  ? translate('noMoreHis')
                  : translate('loading')}
              </Text>
            </>
          )}
        </ScrollView>
      </View>
    )
  }
}

export default NotificationScreen
