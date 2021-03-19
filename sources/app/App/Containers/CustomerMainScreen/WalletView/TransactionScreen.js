import React, {Component} from 'react'
import {Text, FlatList, View, RefreshControl, Image} from 'react-native'
import Style from './WalletViewStyle'
import {translate} from 'App/Services/TranslationService'
import {UserService} from 'App/Services/GraphQL/UserService'
import moment from 'moment'
import TransactionTypeEnum from 'App/Enums/TransactionTypeEnum'
import Spinner from 'react-native-loading-spinner-overlay'
import {Fonts, Images, Metrics, Colors} from 'App/Theme'

export default class TransactionScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: null,
      loading: true,
      refreshing: false,
    }
    this._fetchTransactions()
  }

  _fetchTransactions = () => {
    UserService.getTransactionsData()
      .then((res) => {
        this.setState({
          data: res.data.loggedCustomerAllTransactions,
          loading: false,
          refreshing: false,
        })
      })
      .catch((err) => console.log(err))
  }

  _onRefresh = () => {
    this.reload(true)
  }

  reload = (refreshing = false) => {
    this.setState({loading: !refreshing, refreshing: refreshing}, () => this._fetchTransactions())
  }

  renderView = (item) => {
    // const startDate = Moment(Moment(), 'YYYY-MM-DD HH:mm:ss')
    // const endDate = Moment(item.item.creation_date, 'YYYY-MM-DD HH:mm:ss')
    // const duration = Moment.duration(startDate.diff(endDate))
    // const duration = Math.floor(Moment.duration(startDate.diff(endDate)).asMinutes())
    return (
      <View style={Style.renderContainer}>
        <View style={Style.transactionView}>
          <View style={Style.innerTransaction}>
            <View style={Style.view1}>
              <Text style={Style.text}>
                {item.item.type === TransactionTypeEnum.REWARD
                  ? 'Reward for ' + item.item.business.businessName + ' referral'
                  : item.item.type === TransactionTypeEnum.REPORT
                  ? 'Report fee for malicious business'
                  : 'Customer withdraw'}
              </Text>
            </View>
            <View style={Style.view2}>
              <Text style={Style.textStyle}>
                {item.item.type === TransactionTypeEnum.WITHDRAW
                  ? '-$' + item.item.amount
                  : '+$' + item.item.amount}
              </Text>
            </View>
          </View>
          <View style={Style.innerTransaction}>
            {/* <Text style={Style.minAgo}>{moment(item.item.creation_date).fromNow('hour')}</Text> */}
            <Text style={Style.minAgo}>
              {moment(item.item.updatedDate, moment.ISO_8601).fromNow()}
            </Text>
            <View style={Style.separatorView} />
            <Text style={Style.textStyle1}>{item.item.uuid}</Text>
          </View>
        </View>
      </View>
    )
  }
  render() {
    const {data} = this.state
    return this.state.loading ? (
      <Spinner />
    ) : data.length === 0 ? (
      <View style={Style.emptyScreen}>
        <Image
          source={Images.undrawMakerLaunchCrhe}
          style={{
            height: Metrics.applyRatio(142),
            width: Metrics.applyRatio(206),
            marginBottom: Metrics.applyRatio(30),
          }}
        />
        <Text style={{...Fonts.style.dropDownText, color: Colors.blueyGrey}}>
          {translate('noTrans')}
        </Text>
      </View>
    ) : (
      <FlatList
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={this.state.refreshing} onRefresh={this._onRefresh} />
        }
        style={Style.flatListStyle}
        data={data}
        extraData={this.state}
        renderItem={this.renderView}
        keyExtractor={(item, index) => item + index}
      />
    )
  }
}
