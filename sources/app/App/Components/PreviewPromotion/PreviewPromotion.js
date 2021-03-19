import React, {Component} from 'react'
import {
  FlatList,
  Image,
  Linking,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import {ApplicationStyles, Colors, Images} from 'App/Theme'
import Style from 'App/Components/PreviewPromotion/PreviewPromotionStyle'
import {PropTypes} from 'prop-types'
import {translate} from 'App/Services/TranslationService'
import {convertCurrency, onlinePromoBoxClick} from 'App/Services/Utils'
import CustomTabs from 'App/Components/CustomTabs/CustomTabs'
import Moment from 'moment'
import NavigationService from '../../Services/NavigationService'
import InAppBrowserService from 'App/Services/InAppBrowserService'
import TextWithBold from 'App/Components/TextWithBold/TextWithBold'

export default class PreviewPromotion extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showAllLocations: false,
    }
    this.tab = [{title: translate('INFEED')}, {title: translate('WHENEXPANDED')}]
  }
  showAllLocations = () => {
    NavigationService.push('AllLocations', {
      locationData: this.props.promotionData.selectedLocations,
    })
  }

  _keyExtractor = (item, index) => '' + index
  _renderListItem = (buttonItem) => {
    if (buttonItem.index < 3 || this.state.showAllLocations) {
      return (
        <TouchableOpacity onPress={() => this.gMapOpener(buttonItem.item.address)}>
          <Text style={Style.listButtonIcon}>{buttonItem.item.caption}</Text>
        </TouchableOpacity>
      )
    } else if (buttonItem.index === 3) {
      let {promotionData} = this.props
      let leftCount = promotionData.selectedLocations.length - 3
      return (
        <TouchableOpacity onPress={() => this.showAllLocations}>
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

  renderInFeedView = () => {
    const {promotionData, isOnline} = this.props
    return (
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
        contentContainerStyle={Style.referView}>
        <View style={Style.listViewItem}>
          <View style={Style.referInnerView}>
            <View style={Style.referIconView}>
              <Image
                style={Style.referIcon}
                source={{uri: promotionData.business.profileImageUrl}}
              />
            </View>
            <View style={Style.referNameView}>
              <Text style={Style.nameTxt}>{promotionData.businessName}</Text>
              {promotionData.endDate ? (
                <Text style={Style.otherTxt}>
                  {translate('validForDays', {validDate: promotionData.daysIndex})}
                </Text>
              ) : (
                <Text style={Style.otherTxt}>{translate('ongoing')}</Text>
              )}
            </View>
            <View style={Style.moreIconView}>
              <Image
                style={Style.moreIcon}
                source={{uri: promotionData.business.category.iconBlackUrl}}
              />
              <Text style={Style.catLabel}>{promotionData.business.category.label}</Text>
            </View>
          </View>
          <View style={Style.listFeedViewItem}>
            <View style={[Style.listImgWrapper, ApplicationStyles.shadowView]}>
              <Image
                style={Style.referFullImg}
                source={{
                  uri: promotionData.selectedImage ? promotionData.selectedImage : null,
                }}
              />
            </View>
            <View style={Style.listInnerItem}>
              <View style={Style.flexOne}>
                <View style={Style.listTopSection}>
                  <Text style={Style.listTopSectionText} numberOfLines={1}>
                    {isOnline
                      ? translate('earnUptoCashback', {
                          x: convertCurrency(promotionData.referrerShare),
                        })
                      : promotionData.caption}
                  </Text>
                  <Image style={Style.listTopSectionIcon} source={Images.bookmarkCheck} />
                </View>
                <View style={Style.listBottomSection}>
                  {isOnline && <Text style={Style.captionSubTxt}>{promotionData.caption}</Text>}
                  <Text style={Style.listBottomSectionText}>
                    <TextWithBold
                      fullTxt={translate('earnRefer', {
                        x: convertCurrency(promotionData.referrerShare),
                      })}
                      boldTxtStyle={{color: Colors.black}}
                      boldTxtList={['$' + convertCurrency(promotionData.referrerShare)]}
                    />
                  </Text>
                </View>
                <View style={Style.listItemButtonList}>
                  {promotionData.selectedLocations.length > 0 ? (
                    <FlatList
                      showsHorizontalScrollIndicator={false}
                      showsVerticalScrollIndicator={false}
                      data={promotionData.selectedLocations}
                      extraData={this.props}
                      keyExtractor={this._keyExtractor}
                      renderItem={this._renderListItem}
                      horizontal={true}
                    />
                  ) : (
                    <Text />
                  )}
                  {isOnline && (
                    <TouchableOpacity onPress={() => onlinePromoBoxClick(promotionData)}>
                      <Text style={Style.listButtonIcon}>{translate('onlinePromoStore')}</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    )
  }
  renderWhenExpandedView = () => {
    const {promotionData} = this.props
    return (
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
        style={Style.referView}>
        <TouchableOpacity
          onPress={() => {
            const promotion = {
              uuid: 'previewPromotion',
              promoImageUrl: promotionData.selectedImage,
              caption: promotionData.caption,
              redemptionCount: 0,
              endDate: promotionData.endDate,
              description: promotionData.description,
              business: promotionData.business,
              referralCount: 0,
              businessLocations: promotionData.selectedLocations,
            }
            NavigationService.navigate('PromotionDetailScreen', {itemData: promotion})
          }}>
          <View style={Style.listViewItem}>
            <View style={Style.listImgWrapper}>
              <Image
                style={Style.referExpandedFullImg}
                source={{uri: promotionData.selectedImage ? promotionData.selectedImage : null}}
              />
            </View>
            <View style={Style.listInnerExpandedItem}>
              <View style={Style.flexOne}>
                <View style={Style.listTopSection}>
                  <Text style={Style.listTopSectionText} numberOfLines={1}>
                    {promotionData.caption}
                  </Text>
                </View>
                <View style={Style.expireDateContainer}>
                  <Image style={Style.listTopSectionClockIcon} source={Images.clock} />
                  <View>
                    {promotionData.endDate ? (
                      <Text style={[Style.otherTxt, Style.leftContainer]}>
                        {`${translate('expiresOn')} ${Moment(
                          promotionData.endDate,
                          'MMMM D, YYYY',
                        ).format('DD/MM/YYYY')} (${Math.ceil(
                          Moment(promotionData.endDate, 'MMMM D, YYYY').diff(
                            Moment(),
                            'days',
                            true,
                          ),
                        )} ${translate('daysLeft')})`}
                      </Text>
                    ) : (
                      <Text style={[Style.otherTxt, Style.leftContainer]}>
                        {translate('ongoing')}
                      </Text>
                    )}
                  </View>
                </View>
                <View style={Style.listItemButtonList}>
                  {promotionData.selectedLocations.length > 0 ? (
                    <FlatList
                      showsHorizontalScrollIndicator={false}
                      showsVerticalScrollIndicator={false}
                      data={promotionData.selectedLocations}
                      keyExtractor={this._keyExtractor}
                      renderItem={this._renderListItem}
                      horizontal={true}
                    />
                  ) : (
                    <Text />
                  )}
                </View>
                <View style={Style.descContainer}>
                  <Text style={[Style.otherTxt, {color: Colors.black1}]}>
                    {promotionData.description}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </ScrollView>
    )
  }

  render() {
    return (
      <View style={Style.container}>
        <CustomTabs
          tabs={this.tab}
          initialPage={0}
          tabBarStyle={Style.tabBarStyle}
          tabBarBackgroundColor={Colors.transparent}
          tabBarActiveTextColor={Colors.active}
          tabBarInactiveTextColor={Colors.inActive}
          tabBarTextStyle={ApplicationStyles.tabTextStyle}
          screens={[this.renderInFeedView(), this.renderWhenExpandedView()]}
        />
      </View>
    )
  }
}

PreviewPromotion.propTypes = {
  promotionData: PropTypes.object,
  isOnline: PropTypes.bool,
}
