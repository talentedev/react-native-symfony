import React, {Component} from 'react'
import {Text, View, FlatList} from 'react-native'
import Style from './ApprovalsStyle'
import Spinner from 'react-native-loading-spinner-overlay'
import Moment from 'moment'
import {PromotionService} from 'App/Services/GraphQL/PromotionService'
import {translate} from 'App/Services/TranslationService'
import {convertCurrency} from 'App/Services/Utils'

export default class Approvals extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      book: null,
      spinner: false,
      refreshing: false,
    }
    this._fetchPromotions()
  }
  _fetchPromotions = () => {
    return PromotionService.getLoggedCustomerPendingOnlineRedemptions().then((res) => {
      this.setState(
        {
          book: res.data.loggedCustomerPendingOnlineRedemptions,
        },
        () => {
          this.setState({loading: false})
        },
      )
    })
  }
  _scrollOffset = 0
  _handleScroll = (event) => {
    this._scrollOffset = event.nativeEvent.contentOffset.y
  }
  keyExtractor = (item) => item.uuid.toString()
  _renderListItem = (listItem) => {
    return (
      <View style={Style.innerContainer}>
        <View style={Style.dateStatusView}>
          {listItem.item.isApproved ? (
            <Text style={Style.acceptedTxt}>{translate('accepted')}</Text>
          ) : listItem.item.isApproved === null ? (
            <Text style={Style.pendingTxt}>{translate('PENDING')}</Text>
          ) : (
            <Text style={Style.failedView}>{translate('failed')}</Text>
          )}
          <Text style={Style.failedView}></Text>
          <Text style={Style.dateView}>
            {Moment(listItem.item.createdDate).format('DD/MM/YYYY')}
          </Text>
        </View>
        <View style={Style.lineView} />
        <View style={Style.innerDownView}>
          <Text style={Style.firstText}>{listItem.item.promotion.caption}</Text>
          <Text style={Style.marginTopFive}>
            <Text style={Style.claimStyle}>
              {'$' +
                convertCurrency(listItem.item.onlineRedemptionTransactionValue) +
                translate('claim') +
                ' '}
            </Text>
            <Text style={Style.nameStyle}>{'@' + listItem.item.promotion.business.userName}</Text>
          </Text>
          <Text style={Style.codeStyle}>{listItem.item.onlineRedemptionInvoiceNumber}</Text>
        </View>
      </View>
    )
  }
  render() {
    return (
      <View style={Style.container}>
        {this.state.loading ? (
          <Spinner visible={this.state.loading} />
        ) : (
          <FlatList
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            onScroll={this._handleScroll}
            data={this.state.book}
            extraData={this.state}
            keyExtractor={this.keyExtractor}
            renderItem={this._renderListItem}
            horizontal={false}
          />
        )}
      </View>
    )
  }
}
