import React from 'react'
import {
  FlatList,
  Image,
  Linking,
  NativeModules,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

import {PropTypes} from 'prop-types'
import CustomHeader from 'App/Components/CustomHeader'
import CustomButton from 'App/Components/CustomButton/CustomButton'
import {translate} from 'App/Services/TranslationService'
import Style from './CustomerReferralStyle'
import {Colors, Images} from 'App/Theme'
import moment from 'moment/moment'
import ViewMoreText from 'react-native-view-more-text'
import NavigationService from 'App/Services/NavigationService'
import {convertCurrency} from 'App/Services/Utils'
import {ApplicationStyles} from '../../../Theme'
import InAppBrowserService from 'App/Services/InAppBrowserService'

const {UIManager} = NativeModules

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true)

export default class ReferalGoingOn extends React.Component {
  constructor(props) {
    super(props)
    const {itemData} = this.props.navigation.state.params
    this.state = {
      itemData: itemData,
      showAllLocations: false,
    }
  }

  showAllLocations = () => {
    NavigationService.push('AllLocations', {locationData: this.state.itemData.businessLocations})
  }

  _keyExtractor = (item) => item.uuid.toString()
  _renderListItem = (buttonItem) => {
    if (buttonItem.index < 3 || this.state.showAllLocations) {
      return (
        <TouchableOpacity onPress={() => this.gMapOpener(buttonItem.item.address)}>
          <Text style={Style.listButtonIcon}>{buttonItem.item.caption}</Text>
        </TouchableOpacity>
      )
    } else if (buttonItem.index === 3) {
      let leftCount = this.state.itemData.businessLocations.length - 3
      return (
        <TouchableOpacity onPress={this.showAllLocations}>
          <Text style={Style.listButtonIcon}>+ {leftCount}</Text>
        </TouchableOpacity>
      )
    } else {
    }
  }
  gMapOpener = (location) => {
    const url = Platform.select({
      ios: 'maps:?q=' + location,
      android: 'geo:?q=' + location,
    })

    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        return Linking.openURL(url)
      } else {
        const url = 'https://www.google.com/maps/?q=' + location
        return InAppBrowserService.openInAppBrowserLink(url)
      }
    })
  }
  renderViewMore = (onPress) => {
    return (
      <Text onPress={onPress} style={Style.moreBtn}>
        {translate('readMore')}
      </Text>
    )
  }
  renderViewLess = (onPress) => {
    return (
      <Text onPress={onPress} style={Style.moreBtn}>
        {translate('readLess')}
      </Text>
    )
  }

  render() {
    const {itemData} = this.state
    return (
      <React.Fragment>
        <CustomHeader
          compact
          leftComponent="back"
          leftIconPress={this.onPressLeftIcon}
          manRaiseHand
        />
        <SafeAreaView style={Style.contentContainer}>
          <View style={Style.container}>
            <Image source={Images.referPromoBg} style={Style.promoBgImg} />
          </View>
          <View style={Style.promoContainer}>
            <Text style={Style.headerSubTitle}>{translate('referralProgress')}</Text>
            <Text style={Style.descTxt}>
              {moment(itemData.startDate) < moment() && moment() < moment(itemData.endDate)
                ? translate('earning')
                : translate('earnedCap')}{' '}
              <Text style={{color: Colors.black1}}>
                {'$' + convertCurrency(itemData.referrerShare) + ' '}
              </Text>
              {moment(itemData.startDate) < moment() && moment() < moment(itemData.endDate)
                ? translate('everyFriend')
                : translate('everyFriended')}
            </Text>
            <ScrollView
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              scrollEnabled={false}
              style={Style.scrollContainerWithTopSpace}>
              <TouchableOpacity
                style={Style.listContentWrapper}
                onPress={() => {
                  NavigationService.navigate('PromotionDetailScreen', {itemData: itemData})
                }}>
                <View style={Style.listViewItem}>
                  <View style={Style.listImgWrapperWithTopSpace}>
                    {itemData.promoImageUrl !== '' ? (
                      <Image source={{uri: itemData.promoImageUrl}} style={Style.promoImg} />
                    ) : (
                      <Image source={Images.bokeh} style={Style.promoImg} />
                    )}
                    <View style={Style.redemptionBottomConetent}>
                      {moment(itemData.startDate) < moment() &&
                      moment() < moment(itemData.endDate) ? (
                        <Text style={Style.redemptionBottomTxt}>{`⏰  ${Math.ceil(
                          moment(itemData.endDate).diff(moment(), 'days', true),
                        )} ${translate('daysRemaining')}`}</Text>
                      ) : (
                        <Text style={Style.redemptionBottomCompleteTxt}>
                          {translate('referralCompleted')}
                        </Text>
                      )}
                    </View>
                  </View>
                  <View style={Style.innerPromoContent}>
                    <View style={Style.listTopSection}>
                      <Text style={Style.listTopSectionText}>{itemData.caption}</Text>
                    </View>
                    <View style={[Style.listBottomSection, Style.leftContent]}>
                      <Image source={Images.clock} style={Style.circleIcon} />
                      {itemData.endDate ? (
                        <Text style={Style.listBottomSectionText}>
                          {`${translate('expiresOn')} ${moment(itemData.endDate).format(
                            'MM/DD/YYYY',
                          )} (${Math.ceil(
                            moment(itemData.endDate).diff(moment(), 'days', true),
                          )} ${translate('daysLeft')})`}
                        </Text>
                      ) : (
                        <Text style={Style.listBottomSectionText}>{translate('ongoing')}</Text>
                      )}
                    </View>
                    <View style={Style.listItemButtonList}>
                      {itemData.businessLocations.length > 0 ? (
                        <FlatList
                          showsHorizontalScrollIndicator={false}
                          showsVerticalScrollIndicator={false}
                          data={itemData.businessLocations}
                          extraData={this.state}
                          keyExtractor={this._keyExtractor}
                          renderItem={this._renderListItem}
                          horizontal={true}
                        />
                      ) : (
                        <Text />
                      )}
                    </View>
                    <View style={Style.listBottomSection}>
                      <ViewMoreText
                        numberOfLines={4}
                        renderViewMore={this.renderViewMore}
                        renderViewLess={this.renderViewLess}
                        textStyle={Style.viewMoreTxt}>
                        <Text>{itemData.description}</Text>
                      </ViewMoreText>
                    </View>
                    <View style={Style.listBottomSection}>
                      <Image source={Images.separator} style={Style.waveImg} />
                    </View>
                    <View style={Style.listBottomSection}>
                      <Image
                        source={{
                          uri: itemData.business.profileImageUrl
                            ? itemData.business.profileImageUrl
                            : null,
                        }}
                        style={Style.fabricIcon}
                      />
                      <Text style={Style.subSectionTitle}>{itemData.business.businessName}</Text>
                    </View>
                    <View style={Style.listBottomSection}>
                      <Text style={Style.textCenterDescription}>
                        {itemData.business.description}
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </SafeAreaView>

        <SafeAreaView style={Style.bottomBigContainer}>
          <View style={Style.footerListContainer}>
            <View style={Style.listBottomSection}>
              <View style={[Style.gridItem, Style.marginRight]}>
                <Image source={Images.handShake} style={Style.handShakeIcon} />
                <Text style={Style.bottomBigText}>
                  {itemData.myRedemptionCount ? itemData.myRedemptionCount : '0'}
                </Text>
                <Text style={Style.textCenter}>{translate('peopleRedeemedReferral')}</Text>
              </View>
              <View style={[Style.gridItem, Style.marginLeft]}>
                <Image source={Images.money} style={Style.handShakeIcon} />
                <Text style={Style.bottomBigText}>
                  {'$'}
                  {itemData.earnedOrPaid ? convertCurrency(itemData.earnedOrPaid) : '0'}
                </Text>
                <Text style={Style.textCenter}>{translate('wereEarned')}</Text>
              </View>
            </View>
          </View>
          <View style={ApplicationStyles.screen.containerRow}>
            <CustomButton
              areYouManuallyGivingPositionFromBottom={true}
              buttonPositionFromBottom={0}
              primaryButtonInputText={translate('done')}
              primaryButtonOnPress={() => NavigationService.popToTop()}
              primaryButtonActiveOpacity={1}
            />
            <TouchableOpacity style={Style.shareView}>
              <Image source={Images.shareIcon} style={Style.shareIconSize} />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </React.Fragment>
    )
  }
}

ReferalGoingOn.propTypes = {
  navigation: PropTypes.object,
}
