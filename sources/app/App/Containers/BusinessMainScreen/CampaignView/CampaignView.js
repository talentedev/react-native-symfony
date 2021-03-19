import React from 'react'
import {SafeAreaView} from 'react-native'
import CustomHeader from 'App/Components/CustomHeader'
import Style from './CampaignViewStyle'
import Active from 'App/Containers/BusinessMainScreen/CampaignView/Active'
import Inactive from 'App/Containers/BusinessMainScreen/CampaignView/Inactive'
import Pending from 'App/Containers/BusinessMainScreen/CampaignView/Pending'
import CustomTabs from 'App/Components/CustomTabs/CustomTabs'
import Spinner from 'react-native-loading-spinner-overlay'
import {PromotionService} from 'App/Services/GraphQL/PromotionService'
import {ApplicationStyles, Colors} from 'App/Theme'
import StatusEnum from 'App/Enums/StatusEnum'
import {UserService} from 'App/Services/GraphQL/UserService'
import {PropTypes} from 'prop-types'
import {translate} from 'App/Services/TranslationService'
import NavigationService from 'App/Services/NavigationService'
import EventEmitter from 'App/Services/EventEmitter'

export default class CampaignView extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      arrPending: [],
      arrActive: [],
      arrInActive: [],
      spinner: true,
      loading: true,
      status: '',
      refreshing: false,
      initialIndex: 0,
      canCreateOfflinePromotion: false,
      canCreateOnlinePromotion: false,
      websiteUrl: null,
      appleStoreUrl: null,
      playStoreUrl: null,
    }
    this.getData()
  }

  tabs = [
    {title: translate('ACTIVE')},
    {title: translate('PENDING')},
    {title: translate('INACTIVE')},
  ]

  componentDidMount() {
    // this._subscriptionDidFocus = this.props.navigation.addListener('didFocus', () => {
    //   this.reload()
    // })
    this._subscriptionRefocus = this.props.navigation.addListener('refocus', () => {
      this.reload()
    })
    EventEmitter.emitter.addListener(
      'refreshCampaignsAndNavigateToPending',
      () => {
        // console.log('this.tabsRef', this.tabsRef)
        this.tabsRef.goToTab(1)
        this.reload()
      },
      null,
    )

    EventEmitter.emitter.addListener(
      'refreshCampaigns',
      () => {
        // console.log('this.tabsRef', this.tabsRef)
        this.reload()
      },
      null,
    )
  }

  _onRefresh = () => {
    this.reload(true)
  }

  reload = (refreshing = false) => {
    this.setState(
      {
        refreshing: refreshing,
        spinner: !refreshing,
        status: '',
      },
      () => {
        this.getData()
      },
    )
  }

  getData = () => {
    let arrPending = []
    let arrActive = []
    let arrInActive = []
    PromotionService.getPromotionsByBusiness().then((res) => {
      res.data.loggedBusinessPromotions.map((value) => {
        //   let date = new Date(value.dateEnd)
        if (value.status !== StatusEnum.APPROVED) {
          console.log('Pending Promotion')
          arrPending.push(value)
        } else {
          if (value.isActive) {
            console.log('Active Promotion')
            arrActive.push(value)
          } else {
            console.log('InActive Promotion')
            arrInActive.push(value)
          }
        }
      })
      UserService.getBusinessUser().then((res) => {
        this.setState(
          {
            loading: true, // "Force refresh" the content
          },
          () => {
            this.setState(
              {
                arrPending: arrPending,
                arrActive: arrActive,
                arrInActive: arrInActive,
                status: res.data.businessUser.status,
                loading: false,
                spinner: false,
                refreshing: false,
                canCreateOfflinePromotion: res.data.businessUser.canCreateOfflinePromotion,
                canCreateOnlinePromotion: res.data.businessUser.canCreateOnlinePromotion,
                websiteUrl: res.data.businessUser.websiteUrl,
                appleStoreUrl: res.data.businessUser.appleStoreUrl,
                playStoreUrl: res.data.businessUser.playStoreUrl,
              },
              () => {
                if (global.justSignedUpBusinness) {
                  global.justSignedUpBusinness = false
                  setTimeout(() => NavigationService.navigate('ProfileView'), 10)
                }
              },
            )
          },
        )
      })
    })
  }

  renderActiveView = () => {
    const {
      arrActive,
      refreshing,
      status,
      canCreateOfflinePromotion,
      canCreateOnlinePromotion,
      websiteUrl,
      appleStoreUrl,
      playStoreUrl,
    } = this.state
    return (
      <Active
        dataItem={arrActive}
        status={status}
        refreshing={refreshing}
        canCreateOfflinePromotion={canCreateOfflinePromotion}
        canCreateOnlinePromotion={canCreateOnlinePromotion}
        websiteUrl={websiteUrl}
        appleStoreUrl={appleStoreUrl}
        playStoreUrl={playStoreUrl}
        onRefresh={this._onRefresh}
      />
    )
  }

  renderInactiveView = () => {
    const {
      arrInActive,
      refreshing,
      status,
      canCreateOfflinePromotion,
      canCreateOnlinePromotion,
      websiteUrl,
      appleStoreUrl,
      playStoreUrl,
    } = this.state
    return (
      <Inactive
        dataItem={arrInActive}
        status={status}
        refreshing={refreshing}
        canCreateOfflinePromotion={canCreateOfflinePromotion}
        canCreateOnlinePromotion={canCreateOnlinePromotion}
        websiteUrl={websiteUrl}
        appleStoreUrl={appleStoreUrl}
        playStoreUrl={playStoreUrl}
        onRefresh={this._onRefresh}
      />
    )
  }

  renderPendingView = () => {
    const {
      arrPending,
      refreshing,
      status,
      canCreateOfflinePromotion,
      canCreateOnlinePromotion,
      websiteUrl,
      appleStoreUrl,
      playStoreUrl,
    } = this.state
    return (
      <Pending
        dataItem={arrPending}
        status={status}
        refreshing={refreshing}
        canCreateOfflinePromotion={canCreateOfflinePromotion}
        canCreateOnlinePromotion={canCreateOnlinePromotion}
        websiteUrl={websiteUrl}
        appleStoreUrl={appleStoreUrl}
        playStoreUrl={playStoreUrl}
        onRefresh={this._onRefresh}
      />
    )
  }

  render() {
    const {initialPage, spinner, loading} = this.state
    return (
      <React.Fragment>
        <CustomHeader leftComponent="BusinessMenu" withGrey />
        <SafeAreaView style={Style.container}>
          <CustomTabs
            ref={(ref) => {
              this.tabsRef = ref
            }}
            tabs={this.tabs}
            initialPage={initialPage}
            tabBarStyle={Style.tabBarStyle}
            tabBarBackgroundColor={Colors.white}
            tabBarActiveTextColor={Colors.active}
            tabBarInactiveTextColor={Colors.inActive}
            tabBarTextStyle={ApplicationStyles.tabTextStyle}
            tabBarUnderlineStyle={ApplicationStyles.underLineTab}
            screens={
              loading
                ? []
                : [this.renderActiveView(), this.renderPendingView(), this.renderInactiveView()]
            }
            withHeaderBar
          />
        </SafeAreaView>
        <Spinner visible={spinner} />
      </React.Fragment>
    )
  }
}

CampaignView.propTypes = {
  navigation: PropTypes.shape({
    addListener: PropTypes.func.isRequired,
    getParam: PropTypes.func.isRequired,
  }).isRequired,
}
