import React from 'react'
import {
  FlatList,
  Image,
  Keyboard,
  Linking,
  Platform,
  RefreshControl,
  StatusBar,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native'
import {PropTypes} from 'prop-types'
import CustomHeader from 'App/Components/CustomHeader'
import Style from './ExploreViewStyle'
import {translate} from 'App/Services/TranslationService'
import GridTabs from 'App/Components/GridTabs/GridTabs'
import {ApplicationStyles, Colors, Fonts, Images, Metrics} from 'App/Theme'
import Spinner from 'react-native-loading-spinner-overlay'
import {PromotionService} from 'App/Services/GraphQL/PromotionService'
import CustomTabContent from 'App/Components/CustomTabContent/CustomTabContent'
import {Header, Icon, SearchBar} from 'react-native-elements'
import {WhiteSpace} from '@ant-design/react-native'
import NavigationService from 'App/Services/NavigationService'
import {CategoryService} from 'App/Services/GraphQL/CategoryService'
import debounce from 'lodash.debounce'
import BookmarkIcon from 'App/Components/BookmarkIcon'
import EventEmitter from 'App/Services/EventEmitter'
import InAppBrowserService from 'App/Services/InAppBrowserService'
import TextWithBold from 'App/Components/TextWithBold/TextWithBold'
import {convertCurrency} from 'App/Services/Utils'

export default class ExploreView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      book: null,
      tagId: null,
      categories: [],
      spinner: false,
      loading: true,
      refreshing: false,
      showSearch: false,
      searchContent: '',
      searchBook: [],
    }
  }

  showAllLocations = (locations) => {
    NavigationService.push('AllLocations', {locationData: locations})
  }

  _scrollOffset = 0
  _handleScroll = (event) => {
    this._scrollOffset = event.nativeEvent.contentOffset.y
  }

  _onRefresh = () => {
    this.reload(true)
  }

  componentDidMount() {
    this._fetchCategories()
    this._getPromotionsByCategories()
    // this._fetchPromotionsByCategoryId(null)
    EventEmitter.emitter.addListener(
      'refreshPromotions',
      () => {
        this.reload()
      },
      null,
    )
    this._subscription = this.props.navigation.addListener('refocus', () => {
      if (this.props.navigation.isFocused()) {
        if (this._scrollOffset === 0) {
          this.reload()
        } else {
          this.flatListRef && this.flatListRef.scrollToOffset({animated: true, offset: 0})
        }
      }
    })
  }

  reload = (refreshing = false, searchPromotion = true) => {
    this.setState({refreshing: refreshing, spinner: !refreshing, loading: !refreshing}, () => {
      this.state.tagId === null
        ? this._getPromotionsByCategories()
        : this._getPromotionsByCategories(this.state.tagId)
      if (searchPromotion) {
        this._searchPromotion(this.state.searchContent)
      }
    })
  }

  _onPress = (itemData) => {
    NavigationService.checkPromotionAndNavigate(itemData)
  }
  _fetchCategories = () => {
    CategoryService.getCategories().then((res) => {
      let resCategories = res.data.categories.items.map((catItem) => {
        catItem = {...catItem, isSelected: false}
        return catItem
      })
      this.setState({categories: resCategories}, () => {
        this.setState({spinner: false})
      })
    })
  }

  _getPromotionsByCategories = (categoryId) => {
    if (categoryId != null) {
      PromotionService.getPromotionsByCategories(categoryId)
        .then((res) => {
          this.setState({
            book: res.data.promotionsByCategories,
          })
        })
        .catch((err) => console.log(err))
        .finally(() => {
          this.setState({loading: false, spinner: false, refreshing: false})
        })
    } else {
      PromotionService.getPromotionsGraphql()
        .then((res) => {
          this.setState({
            book: res.data.promotions.items,
          })
        })
        .finally(() => {
          this.setState({loading: false, spinner: false, refreshing: false})
        })
    }
  }

  keyExtractor = (item) => item.uuid.toString()
  _renderPromotionListItem = (listItem) => {
    const rewardAmountStr = '$100' // TODO: handle Indian region

    return (
      <View>
        {listItem.index === 0 ? (
          <View style={Style.bannerContainer}>
            <Image source={Images.UserIcon} style={Style.userIcon} />
            <View style={Style.bannerTxtContainter}>
              <Text style={Style.bannerTitle}>{translate('didYouKnow')}</Text>
              <Text style={Style.bannerTxt}>{translate('validReferrerName')}</Text>
            </View>
          </View>
        ) : (
          <View />
        )}
        <CustomTabContent isExpanded={true} item={listItem} isReferring={true} />
        {listItem.index === 0 && this.state.book.length === 1 ? (
          <View style={Style.bannerContainer}>
            <Image source={Images.UserIcon} style={Style.userIcon} />
            <View style={Style.bannerTxtContainter}>
              <Text style={Style.bannerTitle}>{translate('didYouKnow')}</Text>
              <TextWithBold
                fullTxt={translate('refusesPasscodeClaimsDiscount', {rewardAmountStr})}
                boldTxtStyle={Style.boldTxt}
                bannerTxtStyle={Style.bannerTxt}
                boldTxtList={[rewardAmountStr]}
              />
            </View>
          </View>
        ) : (
          <View />
        )}
        {listItem.index === 1 && this.state.book.length > 1 ? (
          <View style={Style.bannerContainer}>
            <Image source={Images.securityIcon} style={Style.userIcon} />
            <View style={Style.bannerTxtContainter}>
              <Text style={Style.bannerTitle}>{translate('didYouKnowS')}</Text>
              <TextWithBold
                fullTxt={translate('refusesPasscodeClaimsDiscount', {rewardAmountStr})}
                boldTxtStyle={Style.boldTxt}
                bannerTxtStyle={Style.bannerTxt}
                boldTxtList={[rewardAmountStr]}
              />
            </View>
          </View>
        ) : (
          <View />
        )}
      </View>
    )
  }

  catToggleSelect = (isSelected, id) => {
    const newTagData = this.state.categories.map((el) =>
      el.id === id ? {...el, isSelected: isSelected} : {...el, isSelected: false},
    )
    this.setState({categories: newTagData})
    this.state.tagId === id
      ? this.setState({tagId: null}, () => {
          this.reload()
        })
      : this.setState({tagId: id}, () => {
          this.reload()
        })
    // let selectedCat = newTagData.find((obj) => obj.id === id)
    // For now we can only select one tag max
  }

  _keyExtractor = (item) => item.id.toString()
  _renderListItem = (categoryItem) => {
    return (
      <GridTabs
        catItem={categoryItem}
        catToggleSelect={this.catToggleSelect}
        isSelected={categoryItem.isSelect}
      />
    )
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
  _changeText = (text) => {
    this.setState(
      {
        searchContent: text,
        loading: true,
      },
      () => this._searchPromotion(text),
    )
    /* const newData = this.state.book.filter((item) => {
          const itemData = `${item.caption.toUpperCase()} ${item.business.businessName.toUpperCase()}`
          const textData = text.toUpperCase()
          return itemData.includes(textData)
        }) */
  }
  _searchPromotion = debounce((text) => {
    const {tagId} = this.state
    PromotionService.searchBusinessPromotion(text, tagId).then((res) => {
      const oldData = res.data.allApprovedBusiness.items
      const newData = []
      oldData.forEach((business) => {
        business.searchPromotions !== null && newData.push(business)
      })
      this.setState({
        searchBook: newData,
        loading: false,
      })
    })
  }, 400)
  renderSearch = () => {
    return (
      <View style={Style.searchPage}>
        <WhiteSpace size={'xl'} />
        <Header
          barStyle="light-content"
          //   leftComponent={
          //     <TouchableHighlight
          //       style={([Style.touchableHighlight], {backgroundColor: 'green'})}
          //       onPress={() => {
          //         this.setState({showSearch: false, searchContent: ''})
          //         Keyboard.dismiss()
          //       }}
          //       underlayColor={Colors.transparent}>
          //       <Icon name="arrow-left" type="simple-line-icon" size={Metrics.HEADER_ICON_SIZE} />
          //     </TouchableHighlight>
          //   }
          containerStyle={{
            backgroundColor: Colors.transparent,
          }}
        />
        <StatusBar
          backgroundColor="transparent"
          barStyle="dark-content"
          hidden={false}
          // To hide statusBar
          // Background color of statusBar
          translucent={true}
          // allowing light, but not detailed shapes
          networkActivityIndicatorVisible={true}
        />
        <View style={Style.searchContent}>
          {this.state.searchContent ? (
            this.state.searchBook.length === 0 && !this.state.loading ? (
              <FlatList
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item.uuid.toString()}
                data={[
                  {
                    uuid: 'noData',
                  },
                ]}
                renderItem={(item) => <Text>{item.item.caption}</Text>}
                ListFooterComponent={
                  <Text style={Style.opsNoText}>{translate('opsNotFound')}</Text>
                }
                ListHeaderComponent={
                  <View style={Style.flatListHeaderStyle}>
                    <TouchableHighlight
                      style={
                        ([Style.touchableHighlight],
                        {
                          justifyContent: 'flex-end',
                          alignSelf: 'center',
                          marginLeft: Metrics.applyRatio(20),
                        })
                      }
                      onPress={() => {
                        this.setState({showSearch: false, searchContent: ''})
                        Keyboard.dismiss()
                      }}
                      underlayColor={Colors.transparent}>
                      <Image source={Images.backIcon} style={ApplicationStyles.backIcon} />
                    </TouchableHighlight>
                    <SearchBar
                      light
                      autofocus
                      searchIcon={null}
                      containerStyle={Style.searchBar}
                      placeholder={translate('searchMessage')}
                      onChangeText={this._changeText}
                      value={this.state.searchContent}
                      inputStyle={{
                        color: Colors.black1,
                        paddingBottom: Metrics.applyRatio(10),
                        backgroundColor: Colors.transparent,
                        fontSize: Fonts.size.bigMedium,
                      }}
                      inputContainerStyle={{
                        backgroundColor: Colors.transparent,
                        marginTop: Metrics.applyRatio(-1),
                        marginLeft: Metrics.applyRatio(-17),
                      }}
                      clearIcon={
                        this.state.searchContent.length > 0 && (
                          <Icon
                            name="close"
                            color={Colors.black3}
                            type="material"
                            size={20}
                            underlayColor={Colors.white}
                            iconStyle={Style.clearIconStyle}
                            onPress={() => {
                              this.setState({searchContent: ''})
                            }}
                          />
                        )
                      }
                    />
                  </View>
                }
                ItemSeparatorComponent={this.renderSeparator}
                keyboardShouldPersistTaps="always"
              />
            ) : (
              <FlatList
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item.id.toString()}
                data={this.state.searchBook}
                contentContainerStyle={ApplicationStyles.flexGrow1}
                renderItem={(item) => {
                  return (
                    <View style={Style.cardItem}>
                      <View style={Style.referInnerView}>
                        <View style={Style.referIconView}>
                          {item.item.profileImageUrl ? (
                            <Image
                              style={Style.referIcon}
                              source={{uri: item.item.profileImageUrl}}
                            />
                          ) : (
                            <View style={Style.referIcon} />
                          )}
                        </View>
                        <View style={Style.referNameView}>
                          <TouchableOpacity
                            onPress={() => {
                              NavigationService.push('ProfileView', {
                                businessId: item.item.id,
                              })
                            }}>
                            <Text style={Style.nameTxt}>{item.item.businessName}</Text>
                          </TouchableOpacity>
                        </View>
                        <View style={Style.moreIconView}>
                          <View style={Style.moreIconDetail}>
                            <Image
                              style={Style.moreIcon}
                              source={{uri: item.item.category.iconBlackUrl}}
                            />
                            <Text style={Style.categoryName}>{item.item.category.label}</Text>
                          </View>
                        </View>
                      </View>
                      {item.item.searchPromotions.length === 0 ? (
                        <View />
                      ) : (
                        <View
                          style={{
                            height: Metrics.applyRatio(item.item.searchPromotions.length * 106),
                            // width: '100%',
                          }}>
                          <FlatList
                            showsHorizontalScrollIndicator={false}
                            showsVerticalScrollIndicator={false}
                            data={item.item.searchPromotions}
                            keyExtractor={(itemData) => itemData.uuid.toString()}
                            renderItem={(itemData) => {
                              return (
                                <View
                                  style={[Style.listViewItem, ApplicationStyles.smallShadowView]}>
                                  <View style={Style.listInnerItem}>
                                    <TouchableOpacity
                                      style={Style.listImgWrapper}
                                      onPress={() => this._onPress(itemData.item)}>
                                      <Image
                                        style={Style.referImg}
                                        source={
                                          itemData.item.promoImageUrl
                                            ? {uri: itemData.item.promoImageUrl}
                                            : Images.logo
                                        }
                                      />
                                    </TouchableOpacity>
                                    <View style={Style.flexOne}>
                                      <View style={Style.listTopSection}>
                                        <TouchableOpacity
                                          onPress={() => this._onPress(itemData.item)}>
                                          <Text style={Style.listTopSectionText} numberOfLines={1}>
                                            {itemData.item.caption}
                                          </Text>
                                        </TouchableOpacity>
                                        <BookmarkIcon promotion={itemData.item} />
                                      </View>
                                      <View style={Style.listBottomSection}>
                                        <Text style={Style.listBottomSectionText}>
                                          <TextWithBold
                                            fullTxt={translate('earnRefer', {
                                              x: convertCurrency(itemData.item.referrerShare),
                                            })}
                                            boldTxtStyle={{color: Colors.black1}}
                                            boldTxtList={[
                                              '$' + convertCurrency(itemData.item.referrerShare),
                                            ]}
                                          />
                                        </Text>
                                      </View>
                                      <View style={Style.listItemButtonList}>
                                        {itemData.item.businessLocations.length > 0 ? (
                                          <FlatList
                                            showsHorizontalScrollIndicator={false}
                                            showsVerticalScrollIndicator={false}
                                            data={itemData.item.businessLocations}
                                            extraData={this.state}
                                            keyExtractor={(itemData) => itemData.uuid.toString()}
                                            renderItem={(buttonItem) => {
                                              if (
                                                buttonItem.index < 3 ||
                                                this.state.showAllLocations
                                              ) {
                                                return (
                                                  <TouchableOpacity
                                                    onPress={() =>
                                                      this.showLocationModal(buttonItem.item)
                                                    }>
                                                    <Text style={Style.listButtonIcon}>
                                                      {buttonItem.item.caption}
                                                    </Text>
                                                  </TouchableOpacity>
                                                )
                                              } else if (buttonItem.index === 3) {
                                                let leftCount =
                                                  itemData.item.businessLocations.length - 3
                                                return (
                                                  <TouchableOpacity
                                                    onPress={() =>
                                                      this.showAllLocations(
                                                        itemData.item.businessLocations,
                                                      )
                                                    }>
                                                    <Text style={Style.listButtonIcon}>
                                                      + {leftCount}
                                                    </Text>
                                                  </TouchableOpacity>
                                                )
                                              } else {
                                              }
                                            }}
                                            horizontal={true}
                                          />
                                        ) : (
                                          <Text>{translate('noData')}</Text>
                                        )}
                                      </View>
                                    </View>
                                  </View>
                                </View>
                              )
                            }}
                          />
                        </View>
                      )}
                    </View>
                  )
                }}
                ListHeaderComponent={
                  <View style={Style.flatListHeaderStyle}>
                    <TouchableHighlight
                      style={
                        ([Style.touchableHighlight],
                        {
                          justifyContent: 'flex-end',
                          alignSelf: 'center',
                          marginLeft: Metrics.applyRatio(20),
                        })
                      }
                      onPress={() => {
                        this.setState({showSearch: false, searchContent: ''})
                        Keyboard.dismiss()
                      }}
                      underlayColor={Colors.transparent}>
                      <Image source={Images.backIcon} style={ApplicationStyles.backIcon} />
                    </TouchableHighlight>
                    <SearchBar
                      light
                      autofocus
                      searchIcon={null}
                      containerStyle={Style.searchBar}
                      placeholder={translate('searchMessage')}
                      onChangeText={this._changeText}
                      value={this.state.searchContent}
                      inputStyle={{
                        color: Colors.black1,
                        paddingBottom: Metrics.applyRatio(10),
                        backgroundColor: Colors.transparent,
                        fontSize: Fonts.size.bigMedium,
                      }}
                      inputContainerStyle={{
                        backgroundColor: Colors.transparent,
                        marginTop: Metrics.applyRatio(-1),
                        marginLeft: Metrics.applyRatio(-17),
                      }}
                      clearIcon={
                        this.state.searchContent.length > 0 && (
                          <Icon
                            name="close"
                            color={Colors.black3}
                            type="material"
                            size={20}
                            underlayColor={Colors.white}
                            iconStyle={Style.clearIconStyle}
                            onPress={() => {
                              this.setState({searchContent: ''})
                            }}
                          />
                        )
                      }
                    />
                  </View>
                }
                ItemSeparatorComponent={this.renderSeparator}
                keyboardShouldPersistTaps="always"
              />
            )
          ) : (
            <FlatList
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item) => item.uuid.toString()}
              data={[
                {
                  uuid: 'noData',
                },
              ]}
              renderItem={(item) => <Text>{item.item.caption}</Text>}
              ListFooterComponent={
                <View style={Style.emptyStyle}>
                  <Text style={Style.emptyText}>{translate('notHappy')}</Text>
                  <Image
                    source={Images.emptyStartPromotionImage}
                    style={{height: Metrics.applyRatio(145), width: Metrics.applyRatio(167)}}
                  />
                </View>
              }
              ListHeaderComponent={
                <View style={Style.flatListHeaderStyle}>
                  <TouchableHighlight
                    style={
                      ([Style.touchableHighlight],
                      {
                        justifyContent: 'flex-end',
                        alignSelf: 'center',
                        marginLeft: Metrics.applyRatio(20),
                      })
                    }
                    onPress={() => {
                      this.setState({showSearch: false, searchContent: ''})
                      Keyboard.dismiss()
                    }}
                    underlayColor={Colors.transparent}>
                    <Image source={Images.backIcon} style={ApplicationStyles.backIcon} />
                  </TouchableHighlight>
                  <SearchBar
                    autoFocus
                    searchIcon={null}
                    containerStyle={Style.searchBar}
                    placeholder={translate('searchMessage')}
                    onChangeText={this._changeText}
                    value={this.state.searchContent}
                    inputStyle={{
                      color: Colors.black1,
                      paddingBottom: Metrics.applyRatio(10),
                      fontSize: Fonts.size.bigMedium,
                      backgroundColor: Colors.transparent,
                    }}
                    inputContainerStyle={{
                      backgroundColor: Colors.transparent,
                      marginTop: Metrics.applyRatio(-1),
                      marginLeft: Metrics.applyRatio(-17),
                    }}
                    clearIcon={
                      this.state.searchContent.length > 0 && (
                        <Icon
                          name="close"
                          color={Colors.black3}
                          type="material"
                          size={20}
                          underlayColor={Colors.white}
                          iconStyle={Style.clearIconStyle}
                          onPress={() => {
                            this.setState({searchContent: ''})
                          }}
                        />
                      )
                    }
                  />
                </View>
              }
              ItemSeparatorComponent={this.renderSeparator}
              keyboardShouldPersistTaps="always"
            />
          )}
        </View>
      </View>
    )
  }
  render() {
    const emptyList = [{uuid: 1}, {uuid: 2}, {uuid: 3}, {uuid: 4}]
    return (
      <View style={Style.container}>
        <CustomHeader
          leftComponent="CustomerMenu"
          rightComponent="bellAndProfile"
          withRoundSearchBar
          focusInSearch={() => {
            this.setState({showSearch: true})
          }}
        />
        <View
          style={{
            backgroundColor: Colors.white,
            height: Metrics.applyRatio(90),
            borderBottomLeftRadius: Metrics.applyRatio(15),
            borderBottomRightRadius: Metrics.applyRatio(15),
          }}>
          {this.state.categories.length > 0 ? (
            <FlatList
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              horizontal
              data={this.state.categories}
              keyExtractor={this._keyExtractor}
              renderItem={this._renderListItem}
            />
          ) : (
            <View />
          )}
        </View>
        <View style={ApplicationStyles.flex1}>
          <Spinner visible={this.state.spinner} />
          <View style={Style.listViewContainer}>
            {this.state.loading ? (
              <FlatList
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                data={emptyList}
                keyExtractor={this.keyExtractor}
                renderItem={(item) => (
                  <CustomTabContent isExpanded={true} item={item} isReferring={true} loading />
                )}
                horizontal={false}
              />
            ) : this.state.book && this.state.book.length > 0 ? (
              <FlatList
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                ref={(ref) => {
                  this.flatListRef = ref
                }}
                onScroll={this._handleScroll}
                refreshControl={
                  <RefreshControl refreshing={this.state.refreshing} onRefresh={this._onRefresh} />
                }
                data={this.state.book}
                keyExtractor={this.keyExtractor}
                renderItem={this._renderPromotionListItem}
                horizontal={false}
              />
            ) : (
              <View style={Style.centerError}>
                <Image
                  source={Images.undrawMakerLaunchCrhe}
                  style={{
                    height: Metrics.applyRatio(142),
                    width: Metrics.applyRatio(206),
                    marginBottom: Metrics.applyRatio(30),
                    marginTop: Metrics.applyRatio(90),
                  }}
                />
                <Text style={Style.title}>{translate('noPromotion')}</Text>
              </View>
            )}
          </View>
        </View>
        {this.state.showSearch && this.renderSearch()}
      </View>
    )
  }
}

ExploreView.propTypes = {
  navigation: PropTypes.shape({
    addListener: PropTypes.func.isRequired,
    isFocused: PropTypes.func.isRequired,
  }).isRequired,
}
