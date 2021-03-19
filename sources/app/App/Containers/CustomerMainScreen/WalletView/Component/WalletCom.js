import React, {Component} from 'react'
import {Image, RefreshControl, ScrollView, Text, View} from 'react-native'
import Style from './WalletComStyle.js'
import {Images, Metrics} from 'App/Theme'
import {translate} from 'App/Services/TranslationService'
import {PropTypes} from 'prop-types'
import {TouchableOpacity} from 'react-native-gesture-handler'
import {UserService} from 'App/Services/GraphQL/UserService'
import {SafeAreaView} from 'react-navigation'
import Spinner from 'react-native-loading-spinner-overlay'
import NavigationService from 'App/Services/NavigationService'
import {PromotionService} from 'App/Services/GraphQL/PromotionService'
import CustomButton from 'App/Components/CustomButton/CustomButton'

export default class WalletCom extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      refreshing: false,
      haveRedeemed: false,
      existingWallet: false,
      data: {},
    }
    this._fetchWallet()
  }
  _fetchPromotions = () => {
    PromotionService.getPromotionsGraphql().then((res) => {
      const promotions = res.data.promotions.items
      const redeemedData = promotions.filter(function(item) {
        return item.isRedeemed
      })
      const referredData = promotions.filter(function(item) {
        return item.isReferrer
      })
      this.setState({
        haveRedeemed: redeemedData.length > 0,
        existingWallet: referredData.length > 0,
        loading: false,
        refreshing: false,
      })
    })
  }
  _fetchWallet = () => {
    UserService.loggedCustomerWallet()
      .then((res) => {
        this.setState({
          data: res.data.loggedCustomerWallet,
        })
      })
      .then(this._fetchPromotions())
  }

  _onRefresh = () => {
    this.reload(true)
  }

  reload = (refreshing = false) => {
    this.setState({loading: !refreshing, refreshing: refreshing}, () => this._fetchWallet())
  }

  render() {
    const {haveRedeemed, existingWallet} = this.state
    const balance = this.state.data.balance ? Number(this.state.data.balance) : null
    const balanceText = balance === null ? '$' : '$' + balance
    return (
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        style={Style.container}
        refreshControl={
          <RefreshControl refreshing={this.state.refreshing} onRefresh={this._onRefresh} />
        }>
        <Spinner visible={this.state.loading} />
        <SafeAreaView style={Style.innerView}>
          <View style={Style.imageInnerView}>
            <Image source={Images.wallet} style={Style.absolutePos} />
            <View style={Style.imageInnerText}>
              <Text style={Style.amountText}>{balanceText}</Text>
              <Text style={Style.balanceText}>{translate('balance').toUpperCase()}</Text>
            </View>
            <Text style={Style.hkdTxtStyle}>{translate('HKD')}</Text>
            <View style={Style.walletTxtStyle}>
              <TouchableOpacity
                onPress={() => NavigationService.navigate('CustomerWithdrawScreen')}>
                <Text style={Style.txtWithdraw}>{translate('withdraw')}</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={Style.senView}>
            {existingWallet ? (
              <Text style={Style.greatText}>{translate('greatInfluencer')}</Text>
            ) : (
              <Text style={Style.greatTextReferring}>
                {haveRedeemed ? translate('startReferring') : translate('referringOffers')}
              </Text>
            )}
            {haveRedeemed ? (
              <TouchableOpacity
                style={Style.rawView}
                onPress={() => NavigationService.navigate('BucketView', {initialPage: 0})}>
                <Image
                  source={Images.boldUncheck}
                  style={[
                    Style.selfCenter,
                    {height: Metrics.applyRatio(15), width: Metrics.applyRatio(12)},
                  ]}
                />
                <Text style={Style.seeUnReferred}>{translate('unReferredPromotions')}</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={Style.rawView}
                onPress={() => NavigationService.navigate('ExploreView')}>
                <Image source={Images.boldOffer} style={Style.selfCenter} />
                <Text style={Style.seeUnReferred}>{translate('exploreOffers')}</Text>
              </TouchableOpacity>
            )}
            {existingWallet && balance && balance > 0 ? (
              <CustomButton
                primaryButtonInputText={translate('donateCharityButton')}
                primaryButtonStyle={Style.buttonContainer}
                primaryButtonTextStyle={Style.buttonTextStyle}
                primaryButtonOnPress={() => NavigationService.navigate('DonateToCharity')}
              />
            ) : (
              <CustomButton
                primaryButtonInputText={translate('donateCharityButton')}
                primaryButtonStyle={Style.buttonContainerDisable}
                primaryButtonTextStyle={Style.buttonTextStyle}
                primaryButtonEditable={true}
              />
            )}
          </View>
        </SafeAreaView>
      </ScrollView>
    )
  }
}
WalletCom.propTypes = {
  existingWalletData: PropTypes.bool,
  haveRedeemed: PropTypes.bool,
}
