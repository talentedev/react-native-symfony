import React, {Component} from 'react'
import {FlatList, Image, Linking, Platform, Text, TouchableOpacity, View} from 'react-native'
import {ApplicationStyles, Colors, Images} from 'App/Theme'
import Style from 'App/Components/ListCardItemExpanded/ListCardItemExpandedStyle'
import {PropTypes} from 'prop-types'
import {translate} from 'App/Services/TranslationService'
import NavigationService from 'App/Services/NavigationService'
import {WhiteSpace} from '@ant-design/react-native'
import BookmarkIcon from 'App/Components/BookmarkIcon'
import {convertCurrency, onlinePromoBoxClick} from 'App/Services/Utils'
import InAppBrowserService from 'App/Services/InAppBrowserService'
import TextWithBold from 'App/Components/TextWithBold/TextWithBold'

export default class ListCardItemExpanded extends Component {
  constructor(props) {
    super(props)
    const {itemData, isReferring, showBookMark} = this.props
    this.state = {
      itemData: itemData,
      isReferring: isReferring,
      showBookMark: showBookMark,
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
  _onPress = () => {
    NavigationService.checkPromotionAndNavigate(this.props.itemData)
  }

  render() {
    const {showBookMark} = this.state
    const {isRedeemed, isReferrer, isOnlinePromo} = this.props.itemData
    const itemData = this.props.itemData
    return (
      <View style={Style.listViewItem}>
        <TouchableOpacity onPress={() => this._onPress()}>
          {itemData.promoImageUrl !== '' ? (
            <View style={[ApplicationStyles.shadowView, Style.promoImage]}>
              <Image source={{uri: itemData.promoImageUrl}} style={Style.promoImage} />
            </View>
          ) : (
            <Image source={Images.defaultPromotionImage} style={Style.promoImage} />
          )}
        </TouchableOpacity>

        <View style={Style.promoName}>
          <View style={Style.flexOne}>
            <View style={Style.listTopSection}>
              <TouchableOpacity onPress={() => this._onPress()}>
                <Text style={Style.listTopSectionText} numberOfLines={1}>
                  {isOnlinePromo
                    ? translate('earnUptoCashback', {x: convertCurrency(itemData.referrerShare)})
                    : itemData.caption}
                </Text>
              </TouchableOpacity>
              {showBookMark ? <BookmarkIcon promotion={itemData} /> : <View />}
            </View>
            {isOnlinePromo && <Text style={Style.captionSubTxt}>{itemData.caption}</Text>}
            <View style={Style.listBottomSection}>
              {isRedeemed && isReferrer && itemData.myRedemptionCount !== undefined ? (
                <Text style={Style.listBottomSectionText}>
                  <Text style={{color: Colors.black1}}>
                    {'$' + convertCurrency(itemData.earnedOrPaid)}
                  </Text>
                  {' ' + translate('earned') + '  '}
                  <Text style={{color: Colors.black1}}>{itemData.myRedemptionCount}</Text>{' '}
                  {this.state.myRedemptionCount < 2
                    ? translate('referral')
                    : translate('referrals')}
                </Text>
              ) : (
                <Text style={Style.listBottomSectionText}>
                  <TextWithBold
                    fullTxt={translate('earnRefer', {x: convertCurrency(itemData.referrerShare)})}
                    boldTxtStyle={{color: Colors.black1}}
                    boldTxtList={['$' + convertCurrency(itemData.referrerShare)]}
                  />
                </Text>
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
              {isOnlinePromo && (
                <TouchableOpacity onPress={() => onlinePromoBoxClick(itemData)}>
                  <Text style={Style.listButtonIcon}>{translate('onlinePromoStore')}</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
        <WhiteSpace />
      </View>
    )
  }
}

ListCardItemExpanded.propTypes = {
  itemData: PropTypes.object,
  isReferring: PropTypes.bool,
  showBookMark: PropTypes.bool,
}

ListCardItemExpanded.defaultProps = {
  isReferring: false,
  showBookMark: true,
}
