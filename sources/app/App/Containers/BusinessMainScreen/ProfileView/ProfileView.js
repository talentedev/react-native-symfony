import React, {Component} from 'react'
import {
  Animated,
  FlatList,
  Image,
  Linking,
  Platform,
  RefreshControl,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import {PropTypes} from 'prop-types'
import {ApplicationStyles, Colors, Images, Metrics} from 'App/Theme'
import Style from './ProfileViewStyle'
import {UserService} from 'App/Services/GraphQL/UserService'
import {BusinessService} from 'App/Services/GraphQL/BusinessService'
import {translate} from 'App/Services/TranslationService'
import CustomTabs from 'App/Components/CustomTabs/CustomTabs'
import {PromotionService} from 'App/Services/GraphQL/PromotionService'
import CustomTabContent from 'App/Components/CustomTabContent/CustomTabContent'
import InstagramFeed from 'App/Components/Instagram/InstagramFeed'
import moment from 'moment'
import Spinner from 'react-native-loading-spinner-overlay'
import EventEmitter from 'App/Services/EventEmitter'
import NavigationService from 'App/Services/NavigationService'
import {BusinessDrawer} from 'App/Containers/BusinessMainScreen/BusinessMainScreen'
import {Icon} from 'react-native-elements'
import StatusEnum from 'App/Enums/StatusEnum'
import InAppBrowserService from 'App/Services/InAppBrowserService'
import {onlinePromoBoxClick} from 'App/Services/Utils'

class ProfileView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      headerCollapsed: false,
      headerAnimatedHeight: new Animated.Value(Metrics.applyRatio(325)),
      fadeAnimated: new Animated.Value(1),
      fadeTransition: new Animated.Value(0),
      inverseFadeAnimated: new Animated.Value(0),
      inverseTransition: new Animated.Value(50),
      headerTextAnimated: new Animated.Value(0),
      user: null,
      userName: '',
      businessName: '',
      category: null,
      bio: '',
      civility: null,
      email: '',
      profileImageUrl: null,
      phoneNumber: null,
      businessLocations: null,
      showAllLocations: false,
      showAllPromotions: false,
      loading: true,
      book: {},
      instagramId: '',
      facebookUrl: '',
      status: '',
      rejectedReason: null,
      pageIndex: 2,
      businessId: this.props.navigation.getParam('businessId', ''),
      redemptions: 0,
    }
    EventEmitter.emitter.addListener(
      'refreshBusiness',
      () => {
        this.reload()
      },
      null,
    )
  }

  tabs = [
    // { title: 'All' },
    {title: 'UPDATES'},
    {title: 'ABOUT'},
  ]

  _fetchPromotions = () => {
    this.state.businessId
      ? PromotionService.getPromotionsByBusinessSearch(this.state.businessId).then((res) => {
          this.setState(
            {
              book: res.data.businessPromotions,
            },
            () =>
              this.setState({
                loading: false,
                refreshing: false,
              }),
          )
        })
      : PromotionService.getPromotionsByBusiness().then((res) => {
          this.setState(
            {
              book: res.data.loggedBusinessPromotions,
            },
            () =>
              this.setState({
                loading: false,
                refreshing: false,
              }),
          )
        })
  }
  _fetchUser = () => {
    return this.state.businessId
      ? UserService.getBusinessOther(this.state.businessId).then((res) => {
          this.setState({
            user: res.data.business,
            userName: res.data.business.userName,
            businessName: res.data.business.businessName,
            category: res.data.business.category,
            bio: res.data.business.description,
            email: res.data.business.email,
            profileImageUrl: res.data.business.profileImageUrl,
            phoneNumber: res.data.business.phoneNumber,
            businessLocations: res.data.business.businessLocations,
            locationCount: res.data.business.businessLocations.count,
            instagramId: res.data.business.instagramId,
            facebookUrl: res.data.business.facebookUrl,
            // redemptions: REDEMPTIONS,
            status: res.data.business.status,
            rejectedReason: res.data.business.rejectedReason,
          })
        })
      : UserService.getBusinessUser().then((res) => {
          this.setState({
            user: res.data.businessUser,
            userName: res.data.businessUser.userName,
            businessName: res.data.businessUser.businessName,
            category: res.data.businessUser.category,
            bio: res.data.businessUser.description,
            email: res.data.businessUser.email,
            profileImageUrl: res.data.businessUser.profileImageUrl,
            phoneNumber: res.data.businessUser.phoneNumber,
            businessLocations: res.data.businessUser.businessLocations,
            locationCount: res.data.businessUser.businessLocations.count,
            instagramId: res.data.businessUser.instagramId,
            facebookUrl: res.data.businessUser.facebookUrl,
            // redemptions: REDEMPTIONS,
            status: res.data.businessUser.status,
            rejectedReason: res.data.businessUser.rejectedReason,
          })
        })
  }

  _renderListItemUp = (buttonItem) => {
    if (buttonItem.index < 3 || this.state.showAllLocationsUp) {
      return (
        <TouchableOpacity onPress={() => this.gMapOpener(buttonItem.item.address)}>
          <Text style={Style.listButtonIcon}>{buttonItem.item.caption}</Text>
        </TouchableOpacity>
      )
    } else if (buttonItem.index === 3) {
      let leftCount = this.state.locationCount - 3
      return (
        <TouchableOpacity onPress={this.showAllLocationsUp}>
          <Text style={Style.listButtonIcon}>+ {leftCount}</Text>
        </TouchableOpacity>
      )
    } else {
    }
  }

  _renderListItemDown = (buttonItem) => {
    if (buttonItem.index < 3 || this.state.showAllLocationsDown) {
      return (
        <TouchableOpacity onPress={() => this.gMapOpener(buttonItem.item.address)}>
          <Text style={Style.listButtonIcon}>{buttonItem.item.caption}</Text>
        </TouchableOpacity>
      )
    } else if (buttonItem.index === 3) {
      let leftCount = this.state.locationCount - 3
      return (
        <TouchableOpacity onPress={this.showAllLocationsDown}>
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
  componentDidMount() {
    this.fetchAll()
    // this._subscriptionDidFocus = this.props.navigation.addListener('didFocus', () => {
    //   this.reload()
    // })
    this._subscriptionRefocus = this.props.navigation.addListener('refocus', () => {
      this.reload()
    })
  }
  _onRefresh = () => {
    this.reload(true)
  }

  reload = (refreshing = false) => {
    this.setState({refreshing: refreshing, loading: !refreshing}, () => {
      this.fetchAll()
    })
  }

  fetchAll = () => {
    this._fetchUser().then(() => {
      this._fetchCount().then(() => {
        this._fetchPromotions()
      })
    })
  }

  _fetchCount = () => {
    return this.state.businessId
      ? UserService.getBusinessRedemptionCount(this.state.businessId).then((res) => {
          this.setState({redemptions: res.data.businessRedemptionCount})
        })
      : UserService.getLoggedBusinessRedemptionCount().then((res) => {
          this.setState({redemptions: res.data.loggedBusinessRedemptionCount})
        })
  }
  _keyExtractor = (item) => item.uuid.toString()
  showAllLocationsUp = () => {
    NavigationService.push('AllLocations', {locationData: this.state.businessLocations.items})
  }
  showAllLocationsDown = () => {
    NavigationService.push('AllLocations', {locationData: this.state.businessLocations.items})
  }
  onReloadPromotion = (index) => {
    const {book} = this.state
    if (book.length > index) {
      book.splice(index, 1)
      this.setState({
        book,
      })
    }
  }
  onPressPromotion = (buttonItem) => {
    NavigationService.navigate('PromotionDetailScreen', {
      itemData: buttonItem.item,
      index: buttonItem.index,
      onReloadPromotion: this.onReloadPromotion,
    })
  }
  renderUpdateView = (rejectedReason) => {
    const emptyList = [{uuid: 1}, {uuid: 2}, {uuid: 3}, {uuid: 4}]
    const {showAllPromotions} = this.state
    return this.state.status === 'approved' ? (
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={this.state.refreshing} onRefresh={this._onRefresh} />
        }>
        <Text style={{...Style.menuTitle, marginBottom: Metrics.applyRatio(0)}}>
          {translate('promotions')}
        </Text>
        <View style={Style.listViewContainer}>
          {this.state.loading ? (
            <FlatList
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              data={emptyList}
              keyExtractor={this._keyExtractor}
              renderItem={(item) => (
                <CustomTabContent isExpanded={true} item={item} isReferring={true} loading />
              )}
              horizontal={false}
            />
          ) : this.state.book.length === 0 ? (
            <>
              <Image style={Style.emptyImageStyle} source={Images.emptyStartPromotionImage} />
              <Text style={Style.emptyText}>{translate('noPromotionFound')}</Text>
            </>
          ) : (
            <FlatList
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              data={this.state.book}
              extraData={this.state}
              keyExtractor={this._keyExtractor}
              renderItem={(buttonItem) => {
                console.log('#####', buttonItem)
                if (buttonItem.index < 1 || showAllPromotions) {
                  return (
                    <View style={Style.listViewItem}>
                      <TouchableOpacity
                        onPress={
                          this.state.businessId
                            ? () => NavigationService.checkPromotionAndNavigate(buttonItem.item)
                            : () => this.onPressPromotion(buttonItem)
                        }>
                        <View style={Style.shadowLayer}>
                          {buttonItem.item.promoImageUrl !== '' ? (
                            <View style={{...ApplicationStyles.shadowView}}>
                              <Image
                                source={{uri: buttonItem.item.promoImageUrl}}
                                style={Style.promoImage}
                              />
                            </View>
                          ) : (
                            <Image source={Images.defaultPromotionImage} style={Style.promoImage} />
                          )}
                          {buttonItem.item.status === StatusEnum.REFUSED ? (
                            <View style={Style.refuseContainer}>
                              <Text style={Style.statusStyle}>{translate('refused')}</Text>
                            </View>
                          ) : buttonItem.item.status === StatusEnum.PENDING ? (
                            <View style={Style.pendingContainer}>
                              <Text style={Style.statusStyle}>{translate('PENDING')}</Text>
                            </View>
                          ) : moment(buttonItem.item.startDate) < moment() &&
                            moment(buttonItem.item.endDate) < moment() ? (
                            <View style={Style.validContainer}>
                              <Text style={Style.usernameStyle}>
                                {translate('expiredForDays', {
                                  expiredDate: Math.ceil(
                                    moment(buttonItem.item.endDate).diff(moment(), 'days', true),
                                  ),
                                })}
                              </Text>
                            </View>
                          ) : (
                            <View style={Style.validContainer}>
                              {buttonItem.item.endDate ? (
                                <Text style={Style.usernameStyle}>
                                  {translate('validForDays', {
                                    validDate: Math.ceil(
                                      moment(buttonItem.item.endDate).diff(moment(), 'days', true),
                                    ),
                                  })}
                                </Text>
                              ) : (
                                <Text style={Style.usernameStyle}>{translate('ongoing')}</Text>
                              )}
                            </View>
                          )}
                          {this.state.businessId &&
                          this.state.book &&
                          !buttonItem.item.isReferrer ? (
                            <View style={Style.promoRedeem}>
                              <Text style={Style.redeemText}>
                                {translate(buttonItem.item.isRedeemed ? 'referNow' : 'redeem')}
                              </Text>
                            </View>
                          ) : (
                            <View />
                          )}
                        </View>

                        <Text style={Style.listTopSectionText} numberOfLines={1}>
                          {buttonItem.item.caption}
                        </Text>
                      </TouchableOpacity>
                      <View style={Style.listItemButtonList}>
                        {buttonItem.item.businessLocations.length > 0 ? (
                          <FlatList
                            showsHorizontalScrollIndicator={false}
                            showsVerticalScrollIndicator={false}
                            data={buttonItem.item.businessLocations}
                            extraData={this.state}
                            keyExtractor={this._keyExtractor}
                            renderItem={this._renderListItemDown}
                            horizontal={true}
                          />
                        ) : (
                          <View />
                        )}
                        {buttonItem.item.isOnlinePromo && (
                          <TouchableOpacity onPress={() => onlinePromoBoxClick(buttonItem)}>
                            <Text style={Style.listButtonIcon}>
                              {translate('onlinePromoStore')}
                            </Text>
                          </TouchableOpacity>
                        )}
                      </View>
                    </View>
                  )
                } else if (buttonItem.index === 1) {
                  return (
                    <TouchableOpacity onPress={() => this.setState({showAllPromotions: true})}>
                      <View style={Style.iconWithText}>
                        <Text style={[Style.moreText, {marginTop: Metrics.applyRatio(0)}]}>
                          {translate('viewMoreOffers')}
                        </Text>
                        <View style={Style.pickerIcon} />
                      </View>
                    </TouchableOpacity>
                  )
                } else {
                }
              }}
              horizontal={false}
            />
          )}
          <Text style={{...Style.menuTitle, marginTop: Metrics.applyRatio(-20)}}>
            {translate('feed')}
          </Text>
          {this.state.instagramId ? (
            <React.Fragment>
              <InstagramFeed username={this.state.instagramId} />
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL('instagram://user?username=' + this.state.instagramId).catch(
                    () => {
                      InAppBrowserService.openInAppBrowserLink(
                        'https://www.instagram.com/' + this.state.instagramId,
                      )
                    },
                  )
                }}>
                <Text style={Style.moreText}>{translate('viewMoreOnInstagram')}</Text>
              </TouchableOpacity>
              {!this.state.businessId && (
                <TouchableOpacity
                  onPress={() =>
                    BusinessService.removeInstagramInfo().then(() =>
                      EventEmitter.emitter.emit('refreshBusiness'),
                    )
                  }>
                  <View style={Style.imageInstagramContainer}>
                    <Image source={Images.instagram} style={Style.instagramIcon} />
                    <Text style={Style.moreText}>{translate('disconnectInstagram')}</Text>
                  </View>
                </TouchableOpacity>
              )}
            </React.Fragment>
          ) : (
            <TouchableOpacity
              onPress={
                () =>
                  NavigationService.navigate('BusinessEditProfileScreen', {
                    pageIndex: this.state.pageIndex,
                  }) // TODO: finish this
              }>
              <View style={Style.imageInstagramContainer}>
                <Image source={Images.instagram} style={Style.instagramIcon} />
                <Text style={Style.moreText}>{translate('connectInstagram')}</Text>
              </View>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    ) : this.state.status === 'refused' ? (
      <View>
        <View style={{marginBottom: Metrics.applyRatio(355)}}>
          <Image source={Images.approvalFail} style={Style.failImage} />
          <Text style={Style.failTitle}>{translate('acctAppvlFailed').toUpperCase()}</Text>
          <Text style={Style.failContent}>{translate('acctAppvlFailedMsgShort')}</Text>
          <View style={Style.touchableQuestion}>
            <TouchableOpacity
              onPress={() => {
                NavigationService.push('ApprovalFailure', {rejectedReason})
              }}>
              <View style={Style.questionBox}>
                <Image source={Images.questionIcon} style={Style.questionIcon} />
                <Text style={Style.seeWhy}>{translate('seeWhy')}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    ) : this.state.status === 'pending' ? (
      <View>
        <View style={{marginBottom: Metrics.applyRatio(355)}}>
          <Image source={Images.approvalPending} style={Style.pendingImage} />
          <Text style={Style.pendingTitle}>{translate('acctAppvlPending').toUpperCase()}</Text>
          <Text style={Style.pendingContent}>{translate('acctAppvlPendingMsg')}</Text>
        </View>
      </View>
    ) : (
      <View />
    )
  }
  renderAboutView = () => {
    const {facebookUrl, instagramId} = this.state
    return (
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={this.state.refreshing} onRefresh={this._onRefresh} />
        }>
        <Text style={{...Style.menuTitle, marginBottom: Metrics.applyRatio(-10)}}>
          {translate('socialMedia')}
        </Text>
        <View style={Style.iconsContainer}>
          {facebookUrl !== null && facebookUrl !== '' && (
            <TouchableOpacity
              onPress={() => {
                const id = facebookUrl.substring(facebookUrl.lastIndexOf('/') + 1)
                // fb.me/foo won't open the browser
                const correctUrl = facebookUrl.includes('http')
                  ? facebookUrl
                  : 'https://' + facebookUrl
                if (id) {
                  Linking.openURL('fb://facewebmodal/f?href=https://www.facebook.com/' + id).catch(
                    () => {
                      InAppBrowserService.openInAppBrowserLink(correctUrl)
                    },
                  )
                } else {
                  InAppBrowserService.openInAppBrowserLink(correctUrl)
                }
              }}
              style={Style.touchableOpacity}>
              <Image source={Images.facebook} style={Style.icon} />
            </TouchableOpacity>
          )}
          {instagramId !== null && instagramId !== '' && (
            <TouchableOpacity
              onPress={() => {
                Linking.openURL('instagram://user?username=' + instagramId).catch(() => {
                  InAppBrowserService.openInAppBrowserLink(
                    'https://www.instagram.com/' + instagramId,
                  )
                })
              }}
              style={Style.touchableOpacity}>
              <Image source={Images.instagram} style={Style.icon} />
            </TouchableOpacity>
          )}
        </View>
        <Text style={{...Style.menuTitle, marginTop: Metrics.applyRatio(0)}}>
          {translate('allLocations')}
        </Text>
        <View style={Style.listViewContainer}>
          {this.state.locationCount > 0 ? (
            <FlatList
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              data={this.state.businessLocations.items}
              keyExtractor={this._keyExtractor}
              renderItem={(buttonItem) => {
                return (
                  <View style={Style.addressSector}>
                    <TouchableOpacity onPress={() => this.gMapOpener(buttonItem.item.address)}>
                      <Text style={Style.anotherListButtonIcon}>{buttonItem.item.caption}</Text>
                      <Text style={Style.descriptionStyle}>{buttonItem.item.address}</Text>
                    </TouchableOpacity>
                  </View>
                )
              }}
            />
          ) : (
            <View />
          )}
        </View>
      </ScrollView>
    )
  }

  _toggleHeader = (value) => {
    let animationTimeA = 500
    let animationTimeB = 300
    let topMargin = 50
    this.setState({headerCollapsed: value})
    if (value) {
      Animated.parallel([
        Animated.timing(this.state.headerAnimatedHeight, {
          toValue: topMargin,
          duration: animationTimeA,
        }).start(),
        Animated.timing(this.state.fadeAnimated, {
          toValue: 0,
          duration: animationTimeB,
        }).start(),
        Animated.timing(this.state.fadeTransition, {
          toValue: -50,
          duration: animationTimeB,
        }).start(),
        Animated.timing(this.state.inverseFadeAnimated, {
          toValue: 1,
          duration: animationTimeB,
        }).start(),
        Animated.timing(this.state.inverseTransition, {
          toValue: 0,
          duration: animationTimeB,
        }).start(),
        Animated.timing(this.state.headerTextAnimated, {
          toValue: -100,
          duration: animationTimeB,
        }),
      ])
    } else {
      Animated.parallel([
        Animated.timing(this.state.headerAnimatedHeight, {
          toValue: Metrics.applyRatio(325),
          duration: animationTimeB,
        }).start(),
        Animated.timing(this.state.fadeAnimated, {
          toValue: 1,
          duration: animationTimeA,
        }).start(),
        Animated.timing(this.state.fadeTransition, {
          toValue: 0,
          duration: animationTimeA,
        }).start(),
        Animated.timing(this.state.headerTextAnimated, {
          toValue: 0,
          duration: animationTimeB,
        }),
        Animated.timing(this.state.inverseFadeAnimated, {
          toValue: 0,
          duration: animationTimeB,
        }).start(),
        Animated.timing(this.state.inverseTransition, {
          toValue: 50,
          duration: animationTimeB,
        }).start(),
      ])
    }
  }

  render() {
    const {
      rejectedReason,
      headerCollapsed,
      headerAnimatedHeight,
      fadeAnimated,
      fadeTransition,
      inverseFadeAnimated,
      inverseTransition,
      // headerTextAnimated,
    } = this.state
    const fadeStyle = {opacity: fadeAnimated, marginTop: fadeTransition, zIndex: 99}
    const inverseFadeStyle = {
      opacity: inverseFadeAnimated,
      marginTop: inverseTransition,
      zIndex: 99,
    }
    // const headerTextStyle = {marginTop: headerTextAnimated}
    return (
      <React.Fragment>
        <Spinner visible={this.state.loading} />
        <StatusBar
          backgroundColor={Colors.whiteTransparent90}
          barStyle="dark-content"
          hidden={false}
          // To hide statusBar
          // Background color of statusBar
          // allowing light, but not detailed shapes
          networkActivityIndicatorVisible={true}
        />
        <View style={Style.container}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => this._toggleHeader(!headerCollapsed)}
            style={Style.toggleHeaderContainer}
          />

          <Animated.View
            style={[
              Style.topBar,
              {
                height: headerAnimatedHeight,
              },
            ]}>
            <View style={Style.flexTwoContainer}>
              {this.state.businessId ? (
                <TouchableOpacity
                  style={{marginLeft: Metrics.applyRatio(10)}}
                  onPress={() => NavigationService.pop()}
                  underlayColor={Colors.transparent}>
                  <Icon
                    name="arrow-left"
                    type="simple-line-icon"
                    size={Metrics.HEADER_ICON_SIZE}
                    fadeDuration={0}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={{marginLeft: Metrics.applyRatio(9)}}
                  onPress={() => BusinessDrawer.current.open()}
                  underlayColor={Colors.transparent}>
                  <Image fadeDuration={0} source={Images.menu} style={Style.menuIcon} />
                </TouchableOpacity>
              )}
            </View>
            <View style={Style.contentContainer}>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => this._toggleHeader(!headerCollapsed)}>
                <View style={Style.profileSection}>
                  <View style={Style.headerTextWithLabel}>
                    {headerCollapsed ? (
                      <Animated.Text style={[Style.nameStyleMin, inverseFadeStyle]}>
                        {this.state.businessName}
                      </Animated.Text>
                    ) : (
                      <View style={Style.headerLabelContent}>
                        <Animated.Image
                          style={[Style.moreIcon, fadeStyle]}
                          source={{
                            uri: this.state.category ? this.state.category.iconGreyUrl : null,
                          }}
                        />
                        <Animated.Text style={[Style.category, fadeStyle]}>
                          {this.state.category ? this.state.category.label : ''}
                        </Animated.Text>
                      </View>
                    )}
                  </View>
                  {this.state.profileImageUrl ? (
                    <Animated.Image
                      source={{uri: this.state.profileImageUrl}}
                      style={[Style.profileImageContainer, fadeStyle]}
                    />
                  ) : (
                    <Animated.Image
                      source={null}
                      style={[Style.profileImageContainer, fadeStyle]}
                    />
                  )}
                  <Animated.Text style={[Style.nameStyle, fadeStyle]}>
                    {this.state.businessName ? this.state.businessName : ''}
                  </Animated.Text>
                  <Animated.Text style={[Style.usernameStyle, fadeStyle]}>
                    {this.state.userName ? '@' + this.state.userName : ''}
                  </Animated.Text>

                  <View
                    onStartShouldSetResponder={() => true}
                    style={{height: Metrics.applyRatio(34), marginBottom: Metrics.applyRatio(10)}}>
                    <ScrollView
                      showsHorizontalScrollIndicator={false}
                      showsVerticalScrollIndicator={false}>
                      <Text style={Style.descriptionStyle}>
                        {this.state.bio ? this.state.bio : ''}
                      </Text>
                    </ScrollView>
                  </View>

                  <Animated.View style={[Style.listItemButtonList, fadeStyle]}>
                    <FlatList
                      showsHorizontalScrollIndicator={false}
                      showsVerticalScrollIndicator={false}
                      data={this.state.locationCount > 0 ? this.state.businessLocations.items : []}
                      extraData={this.state}
                      keyExtractor={this._keyExtractor}
                      renderItem={this._renderListItemUp}
                      horizontal={true}
                    />
                  </Animated.View>
                  <Animated.View style={[Style.referralDashWraper, fadeStyle]}>
                    <View style={Style.referralDashContainer}></View>
                  </Animated.View>
                  <Animated.View style={[Style.referralContainer, fadeStyle]}>
                    <Text style={Style.referral}>
                      {'🔥 ' +
                        (this.state.redemptions === 0 ? 'No' : this.state.redemptions) +
                        ' redemptions'}
                    </Text>
                  </Animated.View>
                </View>
              </TouchableOpacity>
            </View>
            <View style={Style.flexTwoContainer}>
              {this.state.businessId ? (
                <View />
              ) : (
                <TouchableOpacity
                  style={Style.touchableHighlight}
                  onPress={() => NavigationService.push('BusinessEditProfileScreen')}
                  underlayColor={Colors.transparent}>
                  <Image fadeDuration={0} source={Images.pencil} style={Style.editIcon} />
                </TouchableOpacity>
              )}
            </View>
          </Animated.View>

          <View style={Style.tabContainer}>
            <CustomTabs
              tabs={this.tabs}
              initialPage={0}
              onHeaderPress={() => this._toggleHeader(!headerCollapsed)}
              animationTabBarStyle={Style.animationTabBarStyle}
              tabBarBackgroundColor={Colors.transparent}
              tabBarActiveTextColor={Colors.active}
              tabBarInactiveTextColor={Colors.inActive}
              tabBarTextStyle={ApplicationStyles.tabTextStyle}
              // tabBarUnderlineStyle={{
              //   marginLeft: Metrics.applyRatio(60),
              //   width: Metrics.applyRatio(63),
              //   height: Metrics.applyRatio(2),
              // }}
              screens={[
                // this.renderAllView(),
                this.renderUpdateView(rejectedReason),
                this.renderAboutView(),
              ]}
              withHeaderBar
            />
          </View>
        </View>
      </React.Fragment>
    )
  }
}

export default ProfileView

ProfileView.propTypes = {
  navigation: PropTypes.shape({
    addListener: PropTypes.func.isRequired,
    getParam: PropTypes.func.isRequired,
  }).isRequired,
}
