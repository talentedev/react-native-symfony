import React from 'react'
import {View, Image, Text, ScrollView} from 'react-native'
import Style from './RedemptionEnterInfoStyle'
import {PropTypes} from 'prop-types'
import NavigationService from 'App/Services/NavigationService'
import {Images} from 'App/Theme'
import {translate} from 'App/Services/TranslationService'
import CustomButton from 'App/Components/CustomButton/CustomButton'
import TextWithBold from 'App/Components/TextWithBold/TextWithBold'
import {convertCurrency} from 'App/Services/Utils'

export default class OnlineRedemptionComplete extends React.Component {
  constructor(props) {
    super(props)
    const {redemptionData} = this.props.navigation.state.params
    this.state = {
      redemptionData: redemptionData,
    }
  }

  onPressNext = () => {
    NavigationService.popToTop()
  }

  getSpentPricingTxt = (pricingData) => {
    if (pricingData.customerMinSpending && pricingData.customerMaxSpending) {
      return translate('spentHK$', {
        min: convertCurrency(pricingData.customerMinSpending),
        max: convertCurrency(pricingData.customerMaxSpending),
      })
    } else if (pricingData.customerMinSpending) {
      return translate('spentLessHK$', {
        min: convertCurrency(pricingData.customerMinSpending),
      })
    } else if (pricingData.customerMaxSpending) {
      return translate('spentMoreHK$', {
        max: convertCurrency(pricingData.customerMaxSpending),
      })
    }
  }
  render() {
    const redemHour = '72'
    const hourTxt = 'hours'
    const {redemptionData} = this.state
    return (
      <View style={Style.container}>
        <View style={Style.contentContainer}>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={Style.scrollContentContainer}>
            <View style={Style.scrollInnerView}>
              <View style={Style.imgContainer}>
                <Image
                  source={Images.onlineRedemptionComplete}
                  style={Style.onlineRedemptionCompleteImg}
                />
              </View>
              <Text style={Style.completeTitle}>{translate('almostThere')}</Text>
              <Text style={Style.referralRequestTxt}>
                <TextWithBold
                  fullTxt={translate('onlineRedemptionCompleteTxt', {redemHour, hourTxt})}
                  boldTxtStyle={Style.completeBoldTxt}
                  bannerTxtStyle={Style.referralRequestTxt}
                  boldTxtList={['72', translate('hours')]}
                />
              </Text>
              <View style={Style.completeTextWrapper}>
                <Text style={Style.spentTxt}>
                  {this.getSpentPricingTxt(redemptionData.onlinePromoPricing)}
                </Text>
                <Text style={Style.expectedCashbackTxt}>
                  {translate('expectedCashback', {
                    cashBackValue: convertCurrency(
                      (redemptionData.onlineRedemptionTransactionValue *
                        redemptionData.onlinePromoPricing.redeemerShare) /
                        100.0,
                    ),
                  })}
                </Text>
              </View>
            </View>
          </ScrollView>
        </View>
        <View style={Style.completeFooterContainer}>
          <CustomButton
            primaryButtonInputText={translate('gotIt')}
            primaryButtonOnPress={this.onPressNext}
          />
        </View>
      </View>
    )
  }
}

OnlineRedemptionComplete.propTypes = {
  navigation: PropTypes.object,
}
