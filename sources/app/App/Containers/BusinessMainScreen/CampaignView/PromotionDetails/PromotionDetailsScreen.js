import React from 'react'
import {Images, Metrics, Fonts} from 'App/Theme'
import {ScrollView, Text, View, Image, TouchableOpacity, FlatList} from 'react-native'
import Style from './PromotionDetailsScreenStyle'
import NavigationService from 'App/Services/NavigationService'
import CustomHeader from 'App/Components/CustomHeader'
import {translate} from 'App/Services/TranslationService'
import Colors from 'App/Theme/Colors'
import {PropTypes} from 'prop-types'
import {convertCurrency} from 'App/Services/Utils'
import Moment from 'moment'
import TextWithBold from 'App/Components/TextWithBold/TextWithBold'

export default class PromotionDetailsScreen extends React.Component {
  constructor(props) {
    super(props)
    const {itemData} = this.props.navigation.state.params
    this.state = {
      itemData: itemData,
      loading: true,
    }
  }
  onPressLeftIcon = () => {
    NavigationService.pop()
  }
  getPromoPricingTxt(pricingItem) {
    if (pricingItem.customerMinSpending && pricingItem.customerMaxSpending) {
      return (
        <Text style={Style.referralCatDesc}>
          <TextWithBold
            fullTxt={translate('promotionBetweenDesc', {
              min: convertCurrency(pricingItem.customerMinSpending),
              max: convertCurrency(pricingItem.customerMaxSpending),
              claim: convertCurrency(pricingItem.referrerShare),
            })}
            boldTxtStyle={Style.pricingTxt}
            boldTxtList={[
              'HK$' + convertCurrency(pricingItem.customerMinSpending),
              'HK$' + convertCurrency(pricingItem.customerMaxSpending),
              'HK$' + convertCurrency(pricingItem.referrerShare),
            ]}
          />
        </Text>
      )
    } else if (pricingItem.customerMinSpending) {
      return (
        <Text style={Style.referralCatDesc}>
          <TextWithBold
            fullTxt={translate('promotionLessDesc', {
              min: convertCurrency(pricingItem.customerMinSpending),
              claim: convertCurrency(pricingItem.referrerShare),
            })}
            boldTxtStyle={Style.pricingTxt}
            boldTxtList={[
              'HK$' + convertCurrency(pricingItem.customerMinSpending),
              'HK$' + convertCurrency(pricingItem.referrerShare),
            ]}
          />
        </Text>
      )
    } else if (pricingItem.customerMaxSpending) {
      return (
        <Text style={Style.referralCatDesc}>
          <TextWithBold
            fullTxt={translate('promotionMoreDesc', {
              max: convertCurrency(pricingItem.customerMaxSpending),
              claim: convertCurrency(pricingItem.referrerShare),
            })}
            boldTxtStyle={Style.pricingTxt}
            boldTxtList={[
              'HK$' + convertCurrency(pricingItem.customerMaxSpending),
              'HK$' + convertCurrency(pricingItem.referrerShare),
            ]}
          />
        </Text>
      )
    }
  }
  _keyExtractor = (item) => item.id.toString()
  _renderPricingItem = (catItem) => {
    return (
      <View>
        <View style={Style.referralCatListItem}>
          <View style={Style.referralPercentContent}>
            <Text style={Style.referralCatTitle}>{convertCurrency(catItem.item.charge) + '%'}</Text>
            <Text style={Style.referralFeeTxt}>{translate('referralFee')} </Text>
          </View>
          <View style={Style.referralCatTxtContent}>{this.getPromoPricingTxt(catItem.item)}</View>
        </View>
      </View>
    )
  }
  render() {
    const {itemData} = this.state
    console.log('####', itemData.business)
    return (
      <View style={Style.container}>
        <CustomHeader
          title={translate('promotionDetails')}
          leftComponent="back"
          leftIconPress={this.onPressLeftIcon}
        />
        <ScrollView contentContainerStyle={Style.contentContainer}>
          <View style={Style.sectionContainer}>
            <View>
              <Text style={Style.sectionTitle}> {translate('promotionType')} </Text>
            </View>
            <Image
              source={itemData.isOnlinePromo ? Images.redeemOnline : Images.redeemInstore}
              style={Style.promoImg}
            />
            <View>
              <Text style={Style.subTitle}>
                {' '}
                {itemData.isOnlinePromo ? translate('redeemOnline') : translate('redeemInstore')}
              </Text>
            </View>
            <View>
              <Text style={[Style.descTxt, Style.centerTxt, {width: Metrics.applyRatio(240)}]}>
                {itemData.isOnlinePromo
                  ? translate('redeemOnlineDesc')
                  : translate('redeemInstoreDesc')}
              </Text>
            </View>
          </View>
          <View style={Style.sectionContainer}>
            <View>
              <Text style={Style.sectionTitle}> {translate('referalStrategy')} </Text>
            </View>
            <View>
              <Text style={Style.subTitle}>
                <Text style={Style.boldTxt}>{itemData.targetNumber} </Text>
                {translate('targetSales')}
              </Text>
            </View>
            <View style={Style.locationListItem}>
              {itemData.onlinePromoPricing.length > 0 ? (
                <FlatList
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={false}
                  data={itemData.onlinePromoPricing}
                  extraData={this.state}
                  keyExtractor={this._keyExtractor}
                  renderItem={this._renderPricingItem}
                />
              ) : (
                <View />
              )}
            </View>
          </View>
          <View style={Style.sectionContainer}>
            <View>
              <Text style={Style.sectionTitle}> Duration </Text>
            </View>
            <View style={Style.greyBgContainer}>
              <View style={Style.rowContainer}>
                <View>
                  <Text
                    style={[
                      Style.subTitle,
                      {marginTop: Metrics.applyRatio(0), fontSize: Fonts.size.small},
                    ]}>
                    {translate('startDate')}
                  </Text>
                  <Text
                    style={[
                      Style.descTxt,
                      {marginTop: Metrics.applyRatio(5.5), fontSize: Fonts.size.xsmall},
                    ]}>
                    {Moment(itemData.startDate).format('MMMM D, YYYY')}
                  </Text>
                </View>
                <View>
                  <Text
                    style={[
                      Style.subTitle,
                      Style.rightTxt,
                      {
                        marginTop: Metrics.applyRatio(0),
                        fontSize: Fonts.size.small,
                      },
                    ]}>
                    {translate('endDate')}
                  </Text>
                  <Text
                    style={[
                      Style.descTxt,
                      Style.rightTxt,
                      {
                        marginTop: Metrics.applyRatio(5.5),
                        fontSize: Fonts.size.xsmall,
                      },
                    ]}>
                    {itemData.endDate
                      ? Moment(itemData.endDate).format('MMMM D, YYYY')
                      : translate('untillTargetMet')}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={Style.sectionContainer}>
            <View>
              <Text style={Style.sectionTitle}> {translate('validatationMethod')} </Text>
            </View>
            <View style={Style.greyBgContainer}>
              <View style={Style.rowContainer}>
                <TouchableOpacity>
                  <Text
                    style={[
                      Style.subTitle,
                      {marginTop: Metrics.applyRatio(0), fontSize: Fonts.size.small},
                    ]}>
                    {translate('recieptNumber')}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => NavigationService.navigate('CusotmerValidation')}>
                  <Text
                    style={[
                      Style.sectionTitle,
                      {fontSize: Fonts.size.small, color: Colors.brightBlue},
                    ]}>
                    {translate('viewRequests')}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    )
  }
}

PromotionDetailsScreen.propTypes = {
  navigation: PropTypes.object,
}
