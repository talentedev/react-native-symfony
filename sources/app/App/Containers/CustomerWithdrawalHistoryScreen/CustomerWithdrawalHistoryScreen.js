import React from 'react'
import {Images, Metrics} from 'App/Theme'
import {ScrollView, Text, View, FlatList, Image, TouchableOpacity} from 'react-native'
import Style from './CustomerWithdrawalHistoryScreenStyle'
import NavigationService from 'App/Services/NavigationService'
import CustomHeader from 'App/Components/CustomHeader'
import Moment from 'moment'
import {translate} from 'App/Services/TranslationService'
import StatusEnum from 'App/Enums/StatusEnum'

function typeMatch(type) {
  if (type === 'withdraw') {
    return 'Credit withdrawal to Paypal'
  }
  if (type === 'reward') {
    return 'Reward !'
  }
  if (type === 'report') {
    return 'Report !'
  }
  // TODO: change the return string here
  return 'Action that is not withdraw'
}

export default class CustomerWithdrawalHistoryScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: null,
    }
    this._fetchHistory()
  }
  onPressLeftIcon = () => {
    NavigationService.pop()
    console.log(this.state)
  }
  keyExtractor = (item) => item.uuid
  _fetchHistory = () => {}

  render() {
    return (
      <View style={Style.container}>
        <CustomHeader
          title={'Transaction History'}
          leftComponent="back"
          leftIconPress={this.onPressLeftIcon}
        />

        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          style={{marginLeft: Metrics.applyRatio(20), marginRight: Metrics.applyRatio(20)}}>
          {this.state.data && this.state.data.length > 0 ? (
            <FlatList
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              data={this.state.data}
              keyExtractor={this.keyExtractor}
              renderItem={({item}) => {
                return item.status === StatusEnum.APPROVED ? (
                  <View style={Style.notificationStyle}>
                    <View style={Style.scrollStyle}>
                      <View style={Style.textBarStyle}>
                        <Text style={Style.itemTextStyle}>{typeMatch(item.type)}</Text>
                        <View style={Style.moneyBox}>
                          <Text
                            numberOfLines={1}
                            style={
                              Math.abs(item.amount) > 9999999
                                ? Style.largeMoneyStyle
                                : Style.moneyStyle
                            }>
                            {item.amount > 0
                              ? '$' + item.amount.toString()
                              : '-$' + (item.amount * -1).toString()}
                          </Text>
                        </View>
                      </View>
                      <Text style={Style.timeTextStyle}>
                        {Moment(item.updatedDate, Moment.ISO_8601).fromNow()}
                      </Text>
                    </View>
                    <Text />
                  </View>
                ) : (
                  <View />
                )
              }}
              horizontal={false}
            />
          ) : (
            <View style={Style.centerView}>
              <View style={Style.emptyContainer}>
                <Image source={Images.undrawEmpty} style={Style.undrawEmptyImg} />
                <Text style={Style.emptyTxt}>{translate('comeBackWithdraw')}</Text>
                <TouchableOpacity
                  style={Style.textWithIcon}
                  onPress={() => NavigationService.navigate('WalletView')}>
                  <Image source={Images.exploreOffer} style={Style.offerIcon} />
                  <Text style={Style.navigationTxt}>{translate('exploreWallet')}</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </ScrollView>
      </View>
    )
  }
}
