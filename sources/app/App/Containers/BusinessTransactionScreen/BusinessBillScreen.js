import React from 'react'
import {Images, Metrics} from 'App/Theme'
import {
  ScrollView,
  Text,
  View,
  FlatList,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native'
import Style from './BusinessTransactionScreenStyle'
import NavigationService from 'App/Services/NavigationService'
import CustomHeader from 'App/Components/CustomHeader'
import Moment from 'moment'
import {UserService} from 'App/Services/GraphQL/UserService'
import {translate} from 'App/Services/TranslationService'
import Colors from 'App/Theme/Colors'
import InAppBrowserService from 'App/Services/InAppBrowserService'

export default class BusinessTransactionScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: null,
      loading: true,
    }
    this._fetchHistory()
  }
  onPressLeftIcon = () => {
    NavigationService.pop()
    console.log(this.state)
  }
  keyExtractor = (item) => item.id.toString()
  _fetchHistory = () => {
    UserService.getBusinessStripeInvoice().then((res) => {
      this.setState({data: res.data.loggedBusinessStripeInvoices, loading: false})
    })
  }

  render() {
    return (
      <View style={Style.container}>
        <CustomHeader
          title={'Billing History'}
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
              ItemSeparatorComponent={() => {
                return <View style={Style.separatorStyle} />
              }}
              renderItem={(item) => {
                return (
                  <View style={Style.notificationStyle}>
                    <View style={Style.scrollStyle}>
                      <View style={Style.textBarStyle}>
                        <TouchableOpacity
                          style={Style.textBarStyle}
                          onPress={() => {
                            InAppBrowserService.openInAppBrowserLink(item.item.pdfLink)
                          }}>
                          <Image
                            source={Images.arrowDown}
                            style={{
                              width: Metrics.applyRatio(12),
                              height: Metrics.applyRatio(15),
                              marginBottom: Metrics.applyRatio(2),
                            }}
                          />
                          <Text style={Style.itemTextStyle}>{translate('meteredBilling')}</Text>
                        </TouchableOpacity>
                        <View style={Style.moneyBox}>
                          <Text
                            numberOfLines={1}
                            style={
                              Math.abs(item.item.amountInCents / 100) > 9999999
                                ? Style.largeMoneyStyle
                                : Style.moneyStyle
                            }>
                            {'-$' + Number(item.item.amountInCents / 100)}
                          </Text>
                        </View>
                      </View>
                      <View style={Style.textBarStyle}>
                        <Text style={Style.timeTextStyle}>
                          {Moment(item.item.timestamp, Moment.ISO_8601).fromNow()}
                          <Text style={{color: Colors.black}}>
                            {'  |  '}
                            <Text style={Style.italic}>{item.item.id.toString()}</Text>
                          </Text>
                        </Text>
                      </View>
                    </View>
                    <Text />
                  </View>
                )
              }}
              horizontal={false}
            />
          ) : this.state.loading ? (
            <View>
              <ActivityIndicator
                style={{marginTop: Metrics.applyRatio(30)}}
                color={Colors.black1}
                size={'large'}
              />
            </View>
          ) : (
            <View style={Style.centerView}>
              <View style={Style.emptyContainer}>
                <Image source={Images.undrawEmpty} style={Style.undrawEmptyImg} />
                <Text style={Style.emptyTxt}>{translate('noBillingHistory')}</Text>
              </View>
            </View>
          )}
        </ScrollView>
      </View>
    )
  }
}
