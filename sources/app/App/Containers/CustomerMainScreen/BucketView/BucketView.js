import React, {Component} from 'react'
import {View} from 'react-native'
import {PropTypes} from 'prop-types'
// import TitleBar from 'App/Components/TitleBar/TitleBar'
import Style from 'App/Containers/CustomerMainScreen/BucketView/BucketViewStyle'
// import { Images } from 'App/Theme'
import CustomTabs from 'App/Components/CustomTabs/CustomTabs'
import Bookmarks from 'App/Containers/CustomerMainScreen/BucketView/Bookmarks'
import Referring from 'App/Containers/CustomerMainScreen/BucketView/Referring'
import UnReferring from 'App/Containers/CustomerMainScreen/BucketView/UnReferring'
import DrawerService from 'App/Services/DrawerService'
import Spinner from 'react-native-loading-spinner-overlay'
import CustomHeader from 'App/Components/CustomHeader'
import {ApplicationStyles, Colors} from 'App/Theme'
import {PromotionService} from 'App/Services/GraphQL/PromotionService'
import EventEmitter from 'App/Services/EventEmitter'
import {translate} from 'App/Services/TranslationService'

export default class BucketView extends Component {
  constructor(props) {
    super(props)
    const emptyList = [{uuid: 1}, {uuid: 2}, {uuid: 3}, {uuid: 4}]
    this.state = {
      promotions: emptyList,
      all: [],
      loading: true,
      refreshing: false,
    }
    this._fetchPromotions()
    EventEmitter.emitter.addListener(
      'refreshPromotions',
      () => {
        this.reload()
      },
      null,
    )
  }

  tabs = [
    // { title: 'All' },
    {title: translate('UNREFERRED')},
    {title: translate('REFERRING')},
    {title: translate('BOOKMARKS')},
  ]

  componentDidMount() {
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
    this.setState(
      {
        refreshing: refreshing,
        loading: !refreshing,
      },
      () => {
        this._fetchPromotions()
      },
    )
  }

  onPressSegment = (index) => {
    const {currentInd} = this.state
    if (currentInd !== index) {
      this.setState({currentInd: index})
    }
  }

  _fetchPromotions = () => {
    PromotionService.getPromotionsGraphql().then((res) => {
      this.setState({
        promotions: res.data.promotions.items,
        loading: false,
        refreshing: false,
      })
    })
  }

  onPressLeftIcon = () => {
    DrawerService.openDrawer()
  }

  onPressNotifyIcon = () => {
    console.log('on press notify')
  }

  onPressRightIcon = () => {
    console.log('right icon press')
  }

  //   renderItemAllView = (item) => {
  //     if (item.mark === false) {
  //       return <Bookmarks item={item} />
  //     } else {
  //       return <All item={item} />
  //     }
  //   }

  // renderAllView = () => {
  //   const { all } = this.state
  //   return <All data={all} />
  // }

  renderUnReferredView = () => {
    const {loading, promotions, refreshing} = this.state
    return (
      <UnReferring
        data={promotions}
        loading={loading}
        refreshing={refreshing}
        onRefresh={this._onRefresh}
      />
    )
  }

  renderReferringView = () => {
    const {loading, promotions, refreshing} = this.state
    return (
      <Referring
        data={promotions}
        loading={loading}
        refreshing={refreshing}
        onRefresh={this._onRefresh}
      />
    )
  }

  renderBookmarksView = () => {
    const {loading, promotions, refreshing} = this.state
    return (
      <Bookmarks
        data={promotions}
        loading={loading}
        refreshing={refreshing}
        onRefresh={this._onRefresh}
      />
    )
  }

  render() {
    const initialPage = this.props.navigation.getParam('initialPage', 1)
    return (
      <View style={Style.container}>
        <Spinner visible={this.state.loading} />
        <CustomHeader leftComponent={'CustomerMenu'} rightComponent={'bellAndProfile'} />
        <CustomTabs
          tabs={this.tabs}
          initialPage={initialPage}
          animationTabBarStyle={Style.animationTabBarStyle}
          tabBarStyle={Style.tabBarStyle}
          tabBarBackgroundColor={Colors.transparent}
          tabBarActiveTextColor={Colors.active}
          tabBarInactiveTextColor={Colors.inActive}
          tabBarTextStyle={ApplicationStyles.tabTextStyle}
          // tabBarUnderlineStyle={ApplicationStyles.underLineTab}
          screens={
            this.state.loading
              ? []
              : [
                  // this.renderAllView(),
                  this.renderUnReferredView(),
                  this.renderReferringView(),
                  this.renderBookmarksView(),
                ]
          }
          withHeaderBar
        />
      </View>
    )
  }
}

BucketView.propTypes = {
  navigation: PropTypes.shape({
    addListener: PropTypes.func.isRequired,
    getParam: PropTypes.func.isRequired,
  }).isRequired,
}
