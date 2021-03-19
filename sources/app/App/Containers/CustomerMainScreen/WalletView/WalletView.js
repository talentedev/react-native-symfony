import React from 'react'
import {View} from 'react-native'
import {PropTypes} from 'prop-types'
import CustomHeader from 'App/Components/CustomHeader'
import Style from './WalletViewStyle'
import CustomTabs from 'App/Components/CustomTabs/CustomTabs'
import {ApplicationStyles, Colors} from 'App/Theme'
import WalletCom from './Component/WalletCom'
import TransactionScreen from 'App/Containers/CustomerMainScreen/WalletView/TransactionScreen'
import {translate} from 'App/Services/TranslationService'
import Approvals from './Approval/Approvals'

export default class WalletView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  tabs = [
    {title: translate('WALLET')},
    {title: translate('TRANSACTIONS')},
    {title: translate('APPROVALS')},
  ]

  componentDidMount() {
    this._subscriptionDidFocus = this.props.navigation.addListener('didFocus', () => {
      this.walletTabRef && this.walletTabRef.reload()
    })
    this._subscriptionRefocus = this.props.navigation.addListener('refocus', () => {
      this.transactionTabRef && this.transactionTabRef.reload()
    })
  }

  renderWalletView = () => {
    return (
      <WalletCom
        ref={(ref) => {
          this.walletTabRef = ref
        }}
      />
    )
  }

  renderTransactionsView = () => {
    return (
      <TransactionScreen
        ref={(ref) => {
          this.transactionTabRef = ref
        }}
      />
    )
  }

  renderApprovalView = () => {
    return (
      <Approvals
        ref={(ref) => {
          this.transactionTabRef = ref
        }}
      />
    )
  }

  render() {
    return (
      <View style={Style.container}>
        <CustomHeader leftComponent="CustomerMenu" rightComponent="bellAndProfile" />
        <CustomTabs
          tabs={this.tabs}
          initialPage={0}
          tabBarStyle={Style.tabBarStyle}
          tabBarBackgroundColor={Colors.white}
          tabBarActiveTextColor={Colors.active}
          tabBarInactiveTextColor={Colors.inActive}
          tabBarTextStyle={ApplicationStyles.tabTextStyle}
          // tabBarUnderlineStyle={ApplicationStyles.underLineTabDuo}
          screens={[
            this.renderWalletView(),
            this.renderTransactionsView(),
            this.renderApprovalView(),
          ]}
          withHeaderBar
        />
      </View>
    )
  }
}

WalletView.propTypes = {
  navigation: PropTypes.shape({
    addListener: PropTypes.func.isRequired,
    isFocused: PropTypes.func.isRequired,
  }).isRequired,
}
