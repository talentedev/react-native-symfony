import React from 'react'
import {
  FlatList,
  Image,
  Linking,
  NativeModules,
  Platform,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

import {PropTypes} from 'prop-types'
import CustomHeader from 'App/Components/CustomHeader'
import CustomButton from 'App/Components/CustomButton/CustomButton'
import {translate} from 'App/Services/TranslationService'
import Style from './CustomerReferralStyle'
import {Fonts, Images, Colors} from 'App/Theme'
import moment from 'moment/moment'
import ViewMoreText from 'react-native-view-more-text'
import NavigationService from 'App/Services/NavigationService'
import {PromotionService} from 'App/Services/GraphQL/PromotionService'
import EventEmitter from 'App/Services/EventEmitter'
import BookmarkIcon from 'App/Components/BookmarkIcon'
import {convertCurrency} from 'App/Services/Utils'
import InAppBrowserService from 'App/Services/InAppBrowserService'

const {UIManager} = NativeModules

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true)

export default class ReferPromotion extends React.Component {
  constructor(props) {
    super(props)
    const {itemData, justRedeemed} = this.props.navigation.state.params
    this._fetchPromotion(itemData.uuid)
    this.state = {
      itemData: itemData,
      showAllLocations: false,
      justRedeemed: justRedeemed,
    }
  }
  _fetchPromotion = (id) => {
    PromotionService.getPromotionGraphql(id).then((res) => {
      this.setState({
        itemData: res.data.promotion,
      })
    })
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
  onPressLeftIcon = () => {
    if (this.state.justRedeemed === true) {
      EventEmitter.emitter.emit('refreshPromotions')
    }
    NavigationService.popToTop()
  }
  render() {
    const {itemData} = this.state
    return (
      <React.Fragment>
        <CustomHeader
          compact
          leftComponent="back"
          leftIconPress={this.onPressLeftIcon}
          title={'🎉'}
        />
        <SafeAreaView style={[Style.headerContainer, itemData.isReferrer && Style.headFlex]}>
          {itemData.isReferrer ? (
            <Text style={Style.headerTitle}>{translate('allDone')}</Text>
          ) : (
            <>
              <Text style={Style.headerTitle}>{translate('letsRefer')}</Text>
              <Text style={Style.headerSubTitle}>{translate('startReferringDesc')}</Text>
            </>
          )}
        </SafeAreaView>
        <SafeAreaView style={Style.contentContainer}>
          <View style={Style.container}>
            <Image source={Images.referPromoBg} style={Style.promoBgImg} />
          </View>
          <View style={Style.promoContainer}>
            <Text style={[Fonts.style.greyInfo, Style.descTxt]}>
              {translate('earn')}
              <Text style={{fontFamily: Fonts.fonts.PoppinsMedium, color: Colors.black}}>
                {' $' + convertCurrency(itemData.referrerShare) + ' '}
              </Text>
              {translate('everyFriend')}
            </Text>
            <View style={Style.scrollContainer}>
              <TouchableOpacity
                style={Style.listContentWrapper}
                onPress={() => {
                  NavigationService.navigate('PromotionDetailScreen', {itemData: itemData})
                }}>
                <View style={Style.listViewItem}>
                  <View style={Style.listImgWrapper}>
                    {itemData.promoImageUrl !== '' ? (
                      <Image source={{uri: itemData.promoImageUrl}} style={Style.promoImg} />
                    ) : (
                      <Image source={Images.bokeh} style={Style.promoImg} />
                    )}
                  </View>
                  <View style={Style.innerPromoContent}>
                    <View style={Style.redemptionCount}>
                      <Text style={Style.redemptionTxt}>
                        {'🔥 ' + itemData.redemptionCount + ' ' + translate('redemptions')}
                      </Text>
                    </View>
                    <View style={Style.listTopSection}>
                      <Text style={Style.listTopSectionText}>{itemData.caption}</Text>
                      <BookmarkIcon promotion={itemData} />
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
                      <Text style={Style.textCenter}>{itemData.business.description}</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
        {itemData.isReferrer ? (
          <View />
        ) : (
          <SafeAreaView style={Style.bottomContainer}>
            <CustomButton
              areYouManuallyGivingPositionFromBottom={true}
              buttonPositionFromBottom={0}
              primaryButtonInputText={translate('referPromotion')}
              primaryButtonOnPress={() =>
                NavigationService.navigate('CustomerBecomeReferrerScreen', {
                  itemData: itemData,
                })
              }
              primaryButtonActiveOpacity={1}
              isSecondButton={true}
              secondaryButtonActiveOpacity={1}
              secondaryButtonStyle={Style.listBottomSection}
              secondaryButtonTextStyle={Style.addLocationText}
              secondaryButtonInputText={translate('notNow')}
              secondaryButtonOnPress={() => {
                EventEmitter.emitter.emit('refreshPromotions')
                NavigationService.popToTop()
              }}></CustomButton>
          </SafeAreaView>
        )}
      </React.Fragment>
    )
  }
}

ReferPromotion.propTypes = {
  navigation: PropTypes.object,
}
