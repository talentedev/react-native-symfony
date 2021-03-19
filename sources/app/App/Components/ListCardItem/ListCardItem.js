import React, {Component} from 'react'
import {FlatList, Image, Linking, Platform, Text, TouchableOpacity, View} from 'react-native'
import {Colors, Images, ApplicationStyles} from 'App/Theme'
import Style from 'App/Components/ListCardItem/ListCardItemStyle'
import {PropTypes} from 'prop-types'
import {translate} from 'App/Services/TranslationService'
import NavigationService from 'App/Services/NavigationService'
import {PromotionService} from 'App/Services/GraphQL/PromotionService'
import EventEmitter from 'App/Services/EventEmitter'
import BookmarkIcon from 'App/Components/BookmarkIcon'
import {convertCurrency, onlinePromoBoxClick} from 'App/Services/Utils'
import InAppBrowserService from 'App/Services/InAppBrowserService'
import TextWithBold from 'App/Components/TextWithBold/TextWithBold'

export default class ListCardItem extends Component {
  constructor(props) {
    super(props)
    const {
      itemData,
      isReferring,
      isRedeemed,
      showBookMark,
      isBorder,
      forceUpdate,
      isMargin,
    } = this.props
    this.state = {
      itemData: itemData,
      isReferring: isReferring,
      showBookMark: showBookMark,
      isBorder: isBorder,
      isRedeemed: isRedeemed,
      isMargin: isMargin,
    }
    if (forceUpdate) {
      this._updatePromotion()
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.itemData !== prevState.itemData) {
      return {itemData: nextProps.itemData}
    }
    if (nextProps.isReferring !== prevState.isReferring) {
      return {isReferring: nextProps.isReferring}
    }
    if (nextProps.showBookMark !== prevState.showBookMark) {
      return {showBookMark: nextProps.showBookMark}
    }
    if (nextProps.isBorder !== prevState.isBorder) {
      return {isBorder: nextProps.isBorder}
    }
    if (nextProps.isRedeemed !== prevState.isRedeemed) {
      return {isRedeemed: nextProps.isRedeemed}
    }
    if (nextProps.isMargin !== prevState.isMargin) {
      return {isMargin: nextProps.isMargin}
    } else return null
  }

  _updatePromotion = () => {
    PromotionService.getPromotionGraphql(this.props.itemData.uuid)
      .then((res) => {
        this.setState({
          itemData: res.data.promotion,
          isRedeemed: res.data.promotion.isRedeemed,
          isReferring: res.data.promotion.isRedeemed && !res.data.promotion.isReferrer,
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  componentDidMount() {
    if (this.props.forceUpdate) {
      EventEmitter.emitter.addListener(
        'refreshPromotions', // TODO: it throws a unmounted warning, to be taken care
        () => {
          this._updatePromotion()
        },
        null,
      )
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
    const {itemData, isReferring, showBookMark, isBorder, isMargin} = this.state
    const isOnlinePromo = itemData.isOnlinePromo
    return (
      <View
        style={
          isBorder
            ? [Style.listViewItemWithBorder, ApplicationStyles.smallShadowView]
            : [Style.listViewItem, ApplicationStyles.smallShadowView]
        }>
        <View style={[Style.listInnerItem, isMargin && Style.margins]}>
          <View style={Style.listImgWrapper}>
            <TouchableOpacity onPress={() => this._onPress()}>
              <Image
                style={Style.referImg}
                source={itemData.promoImageUrl ? {uri: itemData.promoImageUrl} : Images.logo}
              />
            </TouchableOpacity>
          </View>
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
              {this.state.isRedeemed && !isReferring ? (
                <Text style={Style.listBottomSectionText}>
                  <Text style={{color: Colors.black1}}>
                    {'$' + convertCurrency(itemData.earnedOrPaid)}
                  </Text>
                  {' ' + translate('earned') + '   '}
                  <Text style={{color: Colors.black1}}>{itemData.myRedemptionCount + ' '}</Text>
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
        {this.state.isRedeemed ? (
          isReferring ? (
            <TouchableOpacity style={Style.referButtonWrapper} onPress={() => this._onPress()}>
              <Text style={Style.referNow}>{translate('referNow')}</Text>
              <Image style={Style.moreIcon} source={Images.handShake} />
            </TouchableOpacity>
          ) : (
            <View />
          )
        ) : (
          <TouchableOpacity style={Style.referButtonWrapper} onPress={() => this._onPress()}>
            <Text style={Style.referNow}>{translate('redeemNow')}</Text>
            <Image style={Style.moreIcon} source={Images.raiseHandWoman} />
          </TouchableOpacity>
        )}
      </View>
    )
  }
}

ListCardItem.propTypes = {
  itemData: PropTypes.object,
  isReferring: PropTypes.bool,
  showBookMark: PropTypes.bool,
  isBorder: PropTypes.bool,
  isRedeemed: PropTypes.bool,
  forceUpdate: PropTypes.bool,
  isMargin: PropTypes.bool,
}

ListCardItem.defaultProps = {
  isReferring: false,
  showBookMark: true,
  isBorder: false,
  isRedeemed: false,
  forceUpdate: true,
  isMargin: false,
}
