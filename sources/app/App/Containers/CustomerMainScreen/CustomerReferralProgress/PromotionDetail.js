import React from 'react'
import {
  Alert,
  Text,
  TouchableOpacity,
  View,
  Image,
  FlatList,
  ScrollView,
  Platform,
  Linking,
} from 'react-native'
import {Images, Colors, ApplicationStyles} from 'App/Theme'
import Style from 'App/Containers/CustomerMainScreen/ExpandedFeedPromotion/ExpandedFeedPromotionStyle'
import {translate} from 'App/Services/TranslationService'
import NavigationService from 'App/Services/NavigationService'
import CustomHeader from 'App/Components/CustomHeader'
import ViewMoreText from 'react-native-view-more-text'
import moment from 'moment'
import {PropTypes} from 'prop-types'
import {UserService} from 'App/Services/GraphQL/UserService'
import {PromotionService} from 'App/Services/GraphQL/PromotionService'
import {Icon} from 'react-native-elements'
import Spinner from 'react-native-loading-spinner-overlay'
import BookmarkIcon from 'App/Components/BookmarkIcon'
import {convertCurrency} from 'App/Services/Utils'
import InAppBrowserService from 'App/Services/InAppBrowserService'

export default class PromotionDetail extends React.PureComponent {
  constructor(props) {
    super(props)
    const {itemData} = this.props.navigation.state.params
    this.state = {
      itemData: itemData,
      showAllLocations: false,
      loginType: '',
      termsOfService: null,
    }
    this._fetchTermsOfService()
  }

  componentDidMount = () => {
    UserService.isCustomerOrBusiness()
      .then((res) => {
        // User logged
        const response = res.data.customerOrBusiness
        if (response === UserService.CUSTOMER) {
          this.setState({loginType: UserService.CUSTOMER})
        } else if (response === UserService.BUSINESS) {
          this.setState({loginType: UserService.BUSINESS})
        }
      })
      .catch(() => {})
  }

  onPressLeftIcon = () => {
    NavigationService.pop()
  }

  _fetchTermsOfService() {
    PromotionService.getPromotionTermsOfService(this.state.itemData.uuid)
      .then((res) => this.setState({termsOfService: res.data.promotion.termsOfService}))
      .catch(() => {
        this.setState({spinner: false}, () => {
          setTimeout(() => {
            Alert.alert(translate('errors.serverError'), translate('errors.pleaseRetryLater'))
          }, 100)
        })
      })
  }

  visitShop = () => {
    const isWebUrl = this.state.itemData.isWebUrl
    let url = ''
    if (isWebUrl) {
      url = this.state.itemData.business.websiteUrl
    } else {
      url = Platform.select({
        ios: this.state.itemData.business.appleStoreUrl,
        android: this.state.itemData.business.playStoreUrl,
      })
    }

    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        return Linking.openURL(url)
      } else {
        return InAppBrowserService.openInAppBrowserLink(url)
      }
    })
  }

  _renderOnlinePromoPricingListItem = (pricingItem) => {
    return (
      <View style={Style.priceListItem}>
        <View style={Style.referrerIcon}>
          <Text style={Style.referrerIconContent}>💰</Text>
        </View>
        <Text style={[Style.referrerAmount, Style.referrerText]}>
          ${convertCurrency(pricingItem.item.redeemerShare)}
        </Text>
        {pricingItem.item.customerMinSpending && pricingItem.item.customerMaxSpending ? (
          <Text style={[Style.referrerText, Style.wrapText]}>
            {translate('forSpendingBetween', {
              min: convertCurrency(pricingItem.item.customerMinSpending),
              max: convertCurrency(pricingItem.item.customerMaxSpending),
            })}
          </Text>
        ) : (
          <Text />
        )}
        {pricingItem.item.customerMinSpending && !pricingItem.item.customerMaxSpending ? (
          <Text style={[Style.referrerText, Style.wrapText]}>
            {translate('forSpendingMoreThan', {
              min: convertCurrency(pricingItem.item.customerMinSpending),
            })}
          </Text>
        ) : (
          <Text />
        )}
        {!pricingItem.item.customerMinSpending && pricingItem.item.customerMaxSpending ? (
          <Text style={[Style.referrerText, Style.wrapText]}>
            {translate('forSpendingLessThan', {
              max: convertCurrency(pricingItem.item.customerMaxSpending),
            })}
          </Text>
        ) : (
          <Text />
        )}
      </View>
    )
  }

  onPressDeletePromotion = () => {
    this.setState({isLoading: true})
    const {index, onReloadPromotion} = this.props.navigation.state.params
    const {itemData} = this.state
    UserService.deletePromotionById(itemData.uuid)
      .then(() => {
        // should return true
        console.log('Delete Success')
        this.setState({isLoading: false}, () => {
          onReloadPromotion(index)
          NavigationService.pop()
        })
      })
      .catch((err) => {
        this.setState({isLoading: false})
        console.log('Delete Fail')
        console.log('error => ', err)
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
  render() {
    const {itemData, loginType, isLoading, termsOfService} = this.state
    console.log(itemData)
    return (
      <React.Fragment>
        <View style={Style.bgContainer}>
          {itemData.promoImageUrl !== '' ? (
            <Image source={{uri: itemData.promoImageUrl}} style={Style.backgroundImage} />
          ) : (
            <Image source={Images.bokeh} style={Style.backgroundImage} />
          )}
          <View style={Style.overwrapImgContainer} />
          <View style={[Style.redemBox, ApplicationStyles.shadowView]}>
            {itemData.redemptionCount ? (
              <View style={Style.redemptionCount}>
                <Text style={Style.redemptionTxt}>
                  {'🔥 ' + itemData.redemptionCount + ' ' + translate('redemptions')}
                </Text>
              </View>
            ) : (
              <View style={Style.redemptionCount} />
            )}
            {loginType !== '' && loginType !== UserService.BUSINESS && (
              <View style={[Style.bookmarkWrapper, ApplicationStyles.shadowView]}>
                <BookmarkIcon promotion={itemData} />
              </View>
            )}
            <View style={Style.listBottomSection}>
              <Image
                source={{
                  uri: itemData.business.profileImageUrl ? itemData.business.profileImageUrl : null,
                }}
                style={Style.promoImage}
              />
              <Text style={Style.promotionTitle}>{itemData.business.businessName}</Text>
            </View>
            <Text style={Style.listTopSectionText}>{itemData.caption}</Text>
            <View style={[Style.listBottomSection, Style.leftContent]}>
              <Image source={Images.clock} style={Style.listTopSectionIcon} />
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

            {itemData.isOnlinePromo ? (
              <Text
                style={[Style.listButtonIcon, Style.listButtonIconOnline]}
                onPress={() => this.visitShop()}>
                Online
              </Text>
            ) : (
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
            )}
          </View>
        </View>
        <View style={Style.contentContainer}>
          <CustomHeader
            compact
            leftComponent="whiteBack"
            leftIconPress={this.onPressLeftIcon}
            isTransparent
          />
          <View style={Style.detailContentContainer}>
            <ScrollView
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              style={Style.contentBody}>
              <View style={Style.scrollInnerView}>
                {itemData.isOnlinePromo ? (
                  <View>
                    <View style={Style.subSectionTitleWrapper}>
                      <Image source={Images.dollar} style={Style.subSectionIcon} />
                      <Text style={Style.subSectionTitle}>
                        {translate('howToClaimExtraCashback')}
                      </Text>
                    </View>
                    <View style={Style.subSectionContentWrapper}>
                      <Text style={Style.listBottomSectionText}>
                        {translate('howToClaimDesc', {x: itemData.business.businessName})}
                      </Text>
                      <FlatList
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        data={itemData.onlinePromoPricing}
                        renderItem={this._renderOnlinePromoPricingListItem}
                      />
                      <Text style={Style.linkText} onPress={() => this.visitShop()}>
                        {translate('visitAndShop')}
                      </Text>
                      <Image source={Images.separator} style={Style.waveImg} />
                    </View>
                  </View>
                ) : (
                  <View />
                )}

                <View style={Style.subSectionTitleWrapper}>
                  <Image source={Images.tag} style={Style.subSectionIcon} />
                  <Text style={Style.subSectionTitle}>{translate('offerDetails')}</Text>
                </View>
                <View style={Style.subSectionContentWrapper}>
                  <ViewMoreText
                    numberOfLines={5}
                    renderViewMore={this.renderViewMore}
                    renderViewLess={this.renderViewLess}
                    textStyle={Style.viewMoreTxt}>
                    <Text>{itemData.description}</Text>
                  </ViewMoreText>
                  {itemData.referrerShare ? (
                    <View style={Style.priceListItem}>
                      <View style={Style.referrerIcon}>
                        <Text style={Style.referrerIconContent}>💵</Text>
                      </View>
                      <Text style={[Style.referrerAmount, Style.referrerText]}>
                        ${Number(itemData.referrerShare)}
                      </Text>
                      <Text style={[Style.referrerText, Style.wrapText]}>
                        {translate('cashReward')}
                      </Text>
                    </View>
                  ) : (
                    <View />
                  )}
                  {itemData.referralCount ? (
                    <View style={Style.priceListItem}>
                      <View style={Style.referrerIcon}>
                        <Text style={Style.referrerIconContent}>👀</Text>
                      </View>
                      <Text style={[Style.referrerAmount, Style.referrerText]}>
                        {itemData.referralCount}
                      </Text>
                      <Text style={[Style.referrerText, Style.wrapText]}>
                        {translate('peopleMadeReferral')}
                      </Text>
                    </View>
                  ) : (
                    <View />
                  )}
                </View>

                <View style={Style.subSectionTitleWrapper}>
                  <Image source={Images.file} style={Style.subSectionIcon} />
                  <Text style={Style.subSectionTitle}>{translate('termsOfServices')}</Text>
                </View>
                <View style={Style.subSectionContentWrapper}>
                  {termsOfService ? (
                    <ViewMoreText
                      numberOfLines={4}
                      renderViewMore={this.renderViewMore}
                      renderViewLess={this.renderViewLess}
                      textStyle={Style.viewMoreTxt}>
                      <Text>{termsOfService}</Text>
                    </ViewMoreText>
                  ) : (
                    <View />
                  )}
                </View>

                <View style={Style.subSectionTitleWrapper}>
                  <Image source={Images.info} style={Style.subSectionIcon} />
                  <Text style={Style.subSectionTitle}>
                    {translate('about')} {itemData.business.businessName}
                  </Text>
                </View>
                <View style={Style.subSectionContentWrapper}>
                  <ViewMoreText
                    numberOfLines={4}
                    renderViewMore={this.renderViewMore}
                    renderViewLess={this.renderViewLess}
                    textStyle={Style.viewMoreTxt}>
                    <Text>{itemData.business.description}</Text>
                  </ViewMoreText>
                </View>

                <View style={Style.footerAlert}>
                  {itemData.isReturningAllowed ? (
                    <Text style={Style.footerAlertText}>
                      {translate('youCanClaimThisOfferAsManyTimesYouLike')}
                    </Text>
                  ) : (
                    <Text style={Style.footerAlertText}>
                      {translate('youCanClaimThisOfferOnceOnly')}
                    </Text>
                  )}
                  <Icon name="info" type="feather" />
                </View>
              </View>
            </ScrollView>
            {loginType === UserService.BUSINESS &&
            itemData.redemptionCount === 0 &&
            itemData.uuid !== 'previewPromotion' ? (
              <TouchableOpacity style={Style.deleteTextView} onPress={this.onPressDeletePromotion}>
                <Icon name="delete" style={Style.shape} color={Colors.reddish91} />
                <Text style={Style.deleteText}>{translate('deletePromotion')}</Text>
              </TouchableOpacity>
            ) : null}
          </View>
          <Spinner visible={isLoading} />
        </View>
      </React.Fragment>
    )
  }
}

PromotionDetail.propTypes = {
  navigation: PropTypes.object,
  onReloadPromotion: PropTypes.func,
}
