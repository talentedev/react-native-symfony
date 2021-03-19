import React, {Component} from 'react'
import {
  Image,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Linking,
  ActivityIndicator,
} from 'react-native'

import {Images, Metrics} from 'App/Theme'
import CustomHeader from 'App/Components/CustomHeader'
import Style from './CustomerSelfScreenStyle'
import {UserService} from 'App/Services/GraphQL/UserService'
import {translate} from 'App/Services/TranslationService'
import CustomTabContent from 'App/Components/CustomTabContent/CustomTabContent'
import {PromotionService} from 'App/Services/GraphQL/PromotionService'
import {PropTypes} from 'prop-types'
import Colors from 'App/Theme/Colors'
import NavigationService from 'App/Services/NavigationService'
import {CustomerDrawer} from '../CustomerMainScreen'
import {ApplicationStyles} from '../../../Theme'

class CustomerSelfScreen extends Component {
  constructor(props) {
    super(props)
    const search = this.props.navigation.getParam('search', '')
    this.state = {
      promotions: null,
      user: '',
      username: '',
      firstname: '',
      lastname: '',
      civility: null,
      profilePictureURL: null,
      loading: true,
      instagramId: '',
      search: search,
      referral: 0,
    }
  }
  _fetchUser = () => {
    const {search} = this.state
    search === ''
      ? UserService.getCustomerUser().then((res) => {
          this.setState(
            {
              user: res.data.customerUser,
              username: res.data.customerUser.userName,
              firstname: res.data.customerUser.firstname,
              lastname: res.data.customerUser.lastname,
              civility: res.data.customerUser.civility,
              profilePictureURL: res.data.customerUser.profileImageUrl,
              instagramId: res.data.customerUser.instagramId,
            },
            () => this._fetchPromotions(),
          )
        })
      : UserService.getCustomerOther(search).then((res) => {
          this.setState(
            {
              user: res.data.customer,
              username: res.data.customer.userName,
              firstname: res.data.customer.firstname,
              lastname: res.data.customer.lastname,
              civility: res.data.customer.civility,
              profilePictureURL: res.data.customer.profileImageUrl,
              instagramId: res.data.customer.instagramId,
            },
            () => this._fetchPromotions(),
          )
        })
  }
  componentDidMount() {
    this._fetchPromotions()
    this._fetchUser()
  }

  _fetchCount = () => {
    const {search} = this.state
    search === ''
      ? UserService.getLoggedCustomerReferralsCount().then((res) => {
          this.setState({referral: res.data.loggedCustomerReferralsCount})
        })
      : UserService.getCustomerReferralsCount(search).then((res) => {
          this.setState({referral: res.data.customerReferralsCount})
        })
  }

  _fetchPromotions = () => {
    const {search} = this.state
    search === ''
      ? PromotionService.getReferredPromotions()
          .then((res) => {
            this.setState(
              {
                promotions: res.data.loggedCustomerReferredPromotions,
              },
              () => this._fetchCount(),
            )
          })
          .finally(() => {
            this.setState({loading: false})
          })
      : PromotionService.getReferredPromotionsOther(search)
          .then((res) => {
            this.setState(
              {
                promotions: res.data.customerReferredPromotions,
              },
              () => this._fetchCount(),
            )
          })
          .finally(() => {
            this.setState({loading: false})
          })
  }

  keyExtractor = (item) => item.uuid.toString()

  render() {
    const {search} = this.state
    const emptyList = [{uuid: 1}, {uuid: 2}, {uuid: 3}, {uuid: 4}]

    return (
      <React.Fragment>
        {search === '' ? (
          <CustomHeader leftComponent={'back'} rightComponent={'edit'} />
        ) : (
          <CustomHeader leftComponent={'back'} />
        )}
        <View style={Style.container}>
          <View style={Style.topBar}>
            <View style={Style.profileSection}>
              <View style={Style.profileImgContainer}>
                <View style={[Style.profileImageContainer, ApplicationStyles.shadowView]}>
                  {this.state.profilePictureURL ? (
                    <Image
                      source={{uri: this.state.profilePictureURL}}
                      style={Style.profileImageContainer}
                    />
                  ) : this.state.civility === 'M' ? (
                    <Image source={Images.maleProfile} style={Style.profileImageContainer} />
                  ) : (
                    <Image source={Images.femaleProfile} style={Style.profileImageContainer} />
                  )}
                </View>
              </View>
              {!this.state.loading ? (
                <>
                  <Text style={Style.nameStyle}>
                    {this.state.firstname + ' ' + this.state.lastname}
                  </Text>
                  <Text style={Style.descriptionStyle}>{'@' + this.state.username}</Text>
                </>
              ) : (
                <ActivityIndicator
                  size="small"
                  style={{marginTop: Metrics.applyRatio(30)}}
                  color={Colors.black1}
                />
              )}
            </View>
            {this.state.instagramId ? (
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL('instagram://user?username=' + this.state.instagramId).catch(
                    () => {
                      Linking.openURL('https://www.instagram.com/' + this.state.instagramId)
                    },
                  )
                }}
                style={Style.touchableOpacity}>
                <Image
                  source={Images.instagram}
                  style={{
                    width: Metrics.applyRatio(22),
                    height: Metrics.applyRatio(22),
                    marginTop: Metrics.applyRatio(112),
                  }}
                />
              </TouchableOpacity>
            ) : (
              <View />
            )}
          </View>

          <View style={Style.referralContainer}>
            {!this.state.loading ? (
              <Text style={Style.referral}>
                {'🤝 ' +
                  (this.state.referral === 0 ? translate('no') : this.state.referral) +
                  ' ' +
                  (this.state.referral < 2 ? translate('referral') : translate('referrals')) +
                  ' ' +
                  (this.state.referral === 0 ? translate('yet') : '')}
              </Text>
            ) : (
              <ActivityIndicator size="small" color={Colors.white} />
            )}
          </View>
          <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
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
            ) : this.state.promotions.length === 0 ? (
              <View style={Style.emptyScreen}>
                <Image
                  source={Images.undrawEmpty}
                  style={{
                    height: Metrics.applyRatio(150),
                    width: Metrics.applyRatio(198),
                    marginBottom: Metrics.applyRatio(30),
                  }}
                />
                <Text style={Style.noRefer}>
                  {search === ''
                    ? translate('noPromotionReferred')
                    : this.state.firstname +
                      ' ' +
                      this.state.lastname +
                      ' ' +
                      translate('noPromotionReferredYet')}
                </Text>
                <TouchableOpacity
                  style={Style.textWithIcon}
                  onPress={() => {
                    CustomerDrawer.current.close()
                    setTimeout(() => {
                      NavigationService.popToTop()
                      NavigationService.navigate('ExploreView')
                    }, 500)
                  }}>
                  <Image source={Images.exploreOffer} style={Style.offerIcon} />
                  <Text style={Style.navigationTxt}>{translate('exploreOffers')}</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <>
                <View
                  style={{marginTop: Metrics.applyRatio(20), marginBottom: Metrics.applyRatio(30)}}>
                  {this.state.firstname ? (
                    <Text style={Style.textBeforePost}>
                      {this.state.firstname +
                        translate('referringText', {
                          X: this.state.civility === 'M' ? 'him' : 'her',
                        })}
                    </Text>
                  ) : (
                    <ActivityIndicator size="small" color={Colors.black1} />
                  )}
                </View>
                <FlatList
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={false}
                  data={this.state.promotions}
                  keyExtractor={this.keyExtractor}
                  renderItem={(item) => (
                    <CustomTabContent isExpanded={true} item={item} isReferring={true} />
                  )}
                  horizontal={false}
                />
              </>
            )}
          </ScrollView>
        </View>
      </React.Fragment>
    )
  }
}
export default CustomerSelfScreen
CustomerSelfScreen.propTypes = {
  navigation: PropTypes.object,
}
