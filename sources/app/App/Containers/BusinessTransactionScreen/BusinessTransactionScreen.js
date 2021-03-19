import React from 'react'
import {Images, Metrics} from 'App/Theme'
import {ScrollView, Text, View, FlatList, Image, ActivityIndicator} from 'react-native'
import Style from './BusinessTransactionScreenStyle'
import NavigationService from 'App/Services/NavigationService'
import CustomHeader from 'App/Components/CustomHeader'
import Moment from 'moment'
import {UserService} from 'App/Services/GraphQL/UserService'
import Colors from 'App/Theme/Colors'

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
  keyExtractor = (item) => item.uuid
  _fetchHistory = () => {
    UserService.getLoggedBusinessAllBills().then((res) => {
      this.setState({data: res.data.loggedBusinessAllBills, loading: false})
    })
  }

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
              ItemSeparatorComponent={() => {
                return <View style={Style.separatorStyle} />
              }}
              renderItem={({item}) => {
                return (
                  <View style={Style.notificationStyle}>
                    <View style={Style.scrollStyle}>
                      <View style={Style.textBarStyle}>
                        <Text style={Style.itemTextStyle}>
                          {'Redemption by @' + item.refer.redeemed.userName}
                        </Text>
                        <View style={Style.moneyBox}>
                          <Text
                            numberOfLines={1}
                            style={
                              Math.abs(item.amount) > 9999999
                                ? Style.largeMoneyStyle
                                : Style.moneyStyle
                            }>
                            {'-$' + Number(item.amount)}
                          </Text>
                        </View>
                      </View>
                      <Text style={Style.timeTextStyle}>
                        {Moment(item.createdDate, Moment.ISO_8601).fromNow()}
                        <Text style={{color: Colors.black}}>
                          {'  |  '}
                          <Text style={Style.italic}>{item.refer.promotion.uuid.toString()}</Text>
                        </Text>
                      </Text>
                    </View>
                    <Text />
                  </View>
                )
              }}
              horizontal={false}
            />
          ) : this.state.loading ? (
            <ActivityIndicator
              style={{marginTop: Metrics.applyRatio(30)}}
              color={Colors.black1}
              size={'large'}
            />
          ) : (
            <View style={Style.centerView}>
              <View style={Style.emptyContainer}>
                <Image source={Images.undrawEmpty} style={Style.undrawEmptyImg} />
                <Text style={Style.emptyTxt}>{'No Transaction History'}</Text>
              </View>
            </View>
          )}
        </ScrollView>
      </View>
    )
  }
}
