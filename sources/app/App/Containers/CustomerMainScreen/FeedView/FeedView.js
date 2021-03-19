import React from 'react'
import {FlatList, Image, RefreshControl, Text, View} from 'react-native'
import {PropTypes} from 'prop-types'
import CustomTabContent from 'App/Components/CustomTabContent/CustomTabContent'
import CustomHeader from 'App/Components/CustomHeader'
import Style from 'App/Containers/CustomerMainScreen/FeedView/FeedViewStyle'
import {PromotionService} from 'App/Services/GraphQL/PromotionService'
import {UserService} from 'App/Services/GraphQL/UserService'
import EventEmitter from 'App/Services/EventEmitter'
import {Images, Metrics} from 'App/Theme'
import {translate} from 'App/Services/TranslationService'
import TextWithBold from 'App/Components/TextWithBold/TextWithBold'

export default class FeedView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      book: null,
      user: '',
      username: '',
      firstname: '',
      lastname: '',
      bio: '',
      birthday: '',
      civility: null,
      email: null,
      profilePictureURL: null,
      phoneNumber: null,
      spinner: false,
      refreshing: false,
    }
    this._fetchUser().then(() => this._fetchPromotions())
    EventEmitter.emitter.addListener('refreshPromotions', () => this.reload(), null)
    EventEmitter.emitter.addListener('refreshUser', () => this.reload(), null)
  }

  _scrollOffset = 0
  _handleScroll = (event) => {
    this._scrollOffset = event.nativeEvent.contentOffset.y
  }

  componentDidMount() {
    this._subscription = this.props.navigation.addListener('refocus', () => {
      if (this.props.navigation.isFocused() && this.flatListRef) {
        if (this._scrollOffset === 0) {
          this.reload()
        } else {
          this.flatListRef.scrollToOffset({animated: true, offset: 0})
        }
      }
    })
  }

  _onRefresh = () => {
    this.reload(true)
  }

  reload = (refreshing = false) => {
    this.setState({refreshing: refreshing, loading: !refreshing}, () => {
      this._fetchUser().then(() =>
        this._fetchPromotions().then(() => {
          this.setState({refreshing: false})
        }),
      )
    })
  }

  _fetchUser = () => {
    return UserService.getCustomerUser().then((res) => {
      this.setState({
        user: res.data.customerUser,
        username: res.data.customerUser.userName,
        firstname: res.data.customerUser.firstname,
        lastname: res.data.customerUser.lastname,
        bio: res.data.customerUser.description,
        birthday: res.data.customerUser.birthDate,
        civility: res.data.customerUser.civility,
        email: res.data.customerUser.email,
        profilePictureURL: res.data.customerUser.profilePictureURL,
        phoneNumber: res.data.customerUser.phoneNumber,
      })
    })
  }

  _fetchPromotions = () => {
    return PromotionService.getPromotionsByCustomerCategories().then((res) => {
      this.setState(
        {
          book: res.data.promotionsByCustomerCategories,
        },
        () => {
          this.setState({loading: false})
        },
      )
    })
  }

  keyExtractor = (item) => item.uuid.toString()
  _renderListItem = (listItem) => {
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
        {listItem.index === 1 && this.state.book.length > 1 ? (
          <View style={Style.bannerContainer}>
            <Image source={Images.securityIcon} style={Style.userIcon} />
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
      </View>
    )
  }
  render() {
    const emptyList = [{uuid: 1}, {uuid: 2}, {uuid: 3}, {uuid: 4}]
    return (
      <View style={Style.container}>
        <CustomHeader
          leftComponent={'CustomerMenu'}
          rightComponent={'bellAndProfile'}
          title={'Hi, ' + this.state.firstname}
          withGrey
          welcomeUser
        />

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
          ) : this.state.book && this.state.book.length === 0 ? (
            <View style={Style.emptyScreen}>
              <Image
                source={Images.emptyStartPromotionImage}
                style={{height: Metrics.applyRatio(145), width: Metrics.applyRatio(167)}}
              />
              <Text style={Style.emptyText}>{translate('noPromotionFetched')}</Text>
            </View>
          ) : (
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
              extraData={this.state}
              keyExtractor={this.keyExtractor}
              renderItem={this._renderListItem}
              horizontal={false}
            />
          )}
        </View>
      </View>
    )
  }
}

FeedView.propTypes = {
  navigation: PropTypes.shape({
    addListener: PropTypes.func.isRequired,
    isFocused: PropTypes.func.isRequired,
  }).isRequired,
}
