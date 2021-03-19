import React, {Component} from 'react'
import {Alert, View} from 'react-native'
// Component
import CustomHeader from 'App/Components/CustomHeader'
import CustomTabs from 'App/Components/CustomTabs/CustomTabs'
// Other
import {translate} from 'App/Services/TranslationService'
import Style from 'App/Containers/BusinessEditProfile/BusinessEditProfileStyle'
import General from 'App/Containers/BusinessEditProfile/General/General'
import Location from 'App/Containers/BusinessEditProfile/Location/Location'
import Social from 'App/Containers/BusinessEditProfile/Social/Social'
import Web from 'App/Containers/BusinessEditProfile/Web/Web'
import {ApplicationStyles, Colors} from 'App/Theme'
import {UserService} from 'App/Services/GraphQL/UserService'
import {PromotionService} from 'App/Services/GraphQL/PromotionService'
import NavigationService from 'App/Services/NavigationService'
import EventEmitter from 'App/Services/EventEmitter'
import {BusinessService} from 'App/Services/GraphQL/BusinessService'
import PropTypes from 'prop-types'
import Spinner from 'react-native-loading-spinner-overlay'
import {checkInstaUsernameAndFacebookUrl} from 'App/Services/Validation'

export default class EditProfile extends Component {
  constructor(props) {
    super(props)
    this._fetchWholeBusiness()
    this.state = {
      business: null,
      pageIndex: this.props.navigation.getParam('pageIndex', 0),
      loading: false,
    }

    this.tabs = [
      {title: translate('GENERAL')},
      {title: translate('LOCATION')},
      {title: translate('SOCIAL')},
      {title: translate('WEB')},
    ]
  }

  _fetchWholeBusiness = () => {
    UserService.getBusinessUser().then((res) => {
      this.setState({
        business: res.data.businessUser,
      })
    })
  }

  onPressSave = () => {
    this.setState({loading: true})
    const {business} = this.state
    if (checkInstaUsernameAndFacebookUrl(business.instagramId, business.facebookUrl)) {
      PromotionService.updateLoggedBusiness(
        business.profileImageUrl,
        business.businessName,
        business.subCategory.id,
        business.description ? business.description : '',
        business.email,
        business.instagramId ? business.instagramId : '',
        business.facebookUrl ? business.facebookUrl : '',
        business.websiteUrl,
        business.appleStoreUrl,
        business.playStoreUrl,
      ).then(() => {
        BusinessService.replaceBusinessLocations(business.businessLocations.items).then(() => {
          EventEmitter.emitter.emit('refreshBusiness')
          EventEmitter.emitter.emit('refreshCampaigns')
          this.setState({loading: false}, () => {
            NavigationService.popToTop()
          })
        })
      })
    } else {
      this.setState({loading: false})
      setTimeout(() => {
        Alert.alert(translate('errors.error'), translate('invalidInstagramUsernameOrFacebookUrl'))
      }, 100)
    }
  }

  onBusinessChange(key, value) {
    const {business} = this.state
    business[key] = value
  }

  renderGeneralView = () => {
    return (
      <General
        onBusinessChange={(key, value) => this.onBusinessChange(key, value)}
        allSave={this.onPressSave}
      />
    )
  }
  renderLocationView = () => {
    return (
      <Location
        onBusinessChange={(key, value) => this.onBusinessChange(key, value)}
        allSave={this.onPressSave}
      />
    )
  }
  renderSocialView = () => {
    return (
      <Social
        onBusinessChange={(key, value) => this.onBusinessChange(key, value)}
        allSave={this.onPressSave}
      />
    )
  }

  renderWebView = () => {
    return (
      <Web
        onBusinessChange={(key, value) => this.onBusinessChange(key, value)}
        allSave={this.onPressSave}
      />
    )
  }

  render() {
    console.log(this.state.pageIndex)
    return (
      <View style={Style.container}>
        <Spinner visible={this.state.loading} />
        <CustomHeader leftComponent="back" title={translate('editProfile')} withGrey />
        <CustomTabs
          tabs={this.tabs}
          initialPage={this.state.pageIndex}
          tabBarStyle={Style.tabBarStyle}
          tabBarBackgroundColor={Colors.white}
          tabBarActiveTextColor={Colors.active}
          tabBarInactiveTextColor={Colors.inActive}
          tabBarTextStyle={ApplicationStyles.tabTextStyle}
          // tabBarUnderlineStyle={ApplicationStyles.underLineTab}
          screens={[
            this.renderGeneralView(),
            this.renderLocationView(),
            this.renderSocialView(),
            this.renderWebView(),
          ]}
          withHeaderBar
        />
      </View>
    )
  }
}

EditProfile.propTypes = {
  navigation: PropTypes.object,
}
