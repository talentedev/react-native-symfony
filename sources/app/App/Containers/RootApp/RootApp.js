import React, {Component} from 'react'
import {connect} from 'react-redux'
import {createAppContainer, createStackNavigator} from 'react-navigation'
import PropTypes from 'prop-types'

import SplashScreen from 'App/Containers/SplashScreen/SplashScreen'
import Region from 'App/Containers/SignInScreen/SignInAndVerification/Region/Region'
import Journey from 'App/Containers/SignInScreen/SignInAndVerification/Journey/Journey'
import SignInScreen from 'App/Containers/SignInScreen/SignInAndVerification/SignIn/SignInScreen'
import Verification from 'App/Containers/SignInScreen/SignInAndVerification/Verification/Verification'
import CustomerSignUp from 'App/Containers/SignInScreen/CustomerFlow/CustomerSignUp/CustomerSignUp'
import FacebookCustomerDetails from 'App/Containers/SignInScreen/CustomerFlow/FacebookCustomerDetails/FacebookCustomerDetails'
import BusinessSignUp from 'App/Containers/SignInScreen/BussinessFlow/BusinessSignUp/BusinessSignUp'
import CustomerSignUpLastStep from 'App/Containers/SignInScreen/CustomerFlow/CustomerSignUp/CustomerSignUpLastStep'

import CustomerMainScreenWithBottomNav from 'App/Containers/CustomerMainScreen/CustomerMainScreen'
import BucketList from 'App/Containers/CustomerMainScreen/BucketView/BucketView'
import PromoDetailsScreen from 'App/Containers/CustomerMainScreen/BucketView/PromoDetailsScreen/PromoDetailsScreen'
import CustomerEditProfile from 'App/Containers/CustomerMainScreen/CustomerProfile/CustomerEditProfile'
import CustomerBecomeReferrer from 'App/Containers/CustomerMainScreen/CustomerBecomeReferrer/CustomerBecomeReferrer'
import ReferalGoingOn from 'App/Containers/CustomerMainScreen/CustomerReferralProgress/ReferalGoingOn'
import ReferPromotion from 'App/Containers/CustomerMainScreen/CustomerReferralProgress/ReferPromotion'
import PromotionDetail from 'App/Containers/CustomerMainScreen/CustomerReferralProgress/PromotionDetail'

import BusinessMainScreenWithBottomNav from 'App/Containers/BusinessMainScreen/BusinessMainScreen'
import ComponentScreen from 'App/Containers/ComponentScreen/ComponentScreen'
import TmpInstagramScreen from 'App/Containers/TmpInstagramScreen/TmpInstagramScreen'
import ExampleScreen from 'App/Containers/ExampleScreen/ExampleScreen'

import NavigationService from 'App/Services/NavigationService'
import StartupActions from 'App/Stores/Startup/Actions'
import BusinessEditProfile from 'App/Containers/BusinessEditProfile/BusinessEditProfile'
import AddPaymentMethod from 'App/Containers/BusinessMainScreen/AddPaymentMethod/AddPaymentMethod'
import TransactionScreen from '../CustomerMainScreen/WalletView/TransactionScreen'
import SelectPromotionType from 'App/Containers/BusinessMainScreen/BusinessNewCampaign/SelectPromotionType'
import NewOfflineCampaign from 'App/Containers/BusinessMainScreen/BusinessNewCampaign/NewOfflineCampaign'
import NewOnlineCampaign from 'App/Containers/BusinessMainScreen/BusinessNewCampaign/NewOnlineCampaign'
import EditPasscode from 'App/Containers/BusinessMainScreen/EditPasscode/EditPasscode'
import ExpandedFeedPromotion from 'App/Containers/CustomerMainScreen/ExpandedFeedPromotion/ExpandedFeedPromotion'
import NotificationScreen from 'App/Containers/NotificationScreen/NotificationScreen'
import CustomerSelfScreen from 'App/Containers/CustomerMainScreen/CustomerSelfScreen/CustomerSelfScreen'
import CustomerWithdrawalHistoryScreen from 'App/Containers/CustomerWithdrawalHistoryScreen/CustomerWithdrawalHistoryScreen'
import CustomerEditCategory from 'App/Containers/CustomerMainScreen/CustomerEditCategory/CustomerEditCategory'
import ReferrerFinder from 'App/Containers/CustomerMainScreen/ReferrerFinder/ReferrerFinder'
import RedemptionEnterInfo from 'App/Containers/CustomerMainScreen/RedemptionEnterInfo/RedemptionEnterInfo'
import OnlineRedemptionComplete from 'App/Containers/CustomerMainScreen/RedemptionEnterInfo/OnlineRedemptionComplete'
import ScanPasscode from 'App/Containers/CustomerMainScreen/RedemptionEnterInfo/ScanPasscode'

import ProfileView from 'App/Containers/BusinessMainScreen/ProfileView/ProfileView'
import ApprovalFailure from 'App/Containers/BusinessMainScreen/ApprovalFailure/ApprovalFailure'
import BusinessTransactionScreen from 'App/Containers/BusinessTransactionScreen/BusinessTransactionScreen'
import CustomerWithdrawScreen from 'App/Containers/CustomerWithdrawScreen/CustomerWithdrawScreen'
import DonateToCharity from 'App/Containers/CustomerMainScreen/DonateToCharity/DonateToCharity'
import BusinessTransferAccountScreen from 'App/Containers/BusinessMainScreen/BusinessTransfertAccount/BusinessTransferAccount'
import ApprovalFailurePromo from 'App/Containers/BusinessMainScreen/ApprovalFailure/ApprovalFailurePromo'
import BusinessBillScreen from 'App/Containers/BusinessTransactionScreen/BusinessBillScreen'
import PromotionDetailsScreen from 'App/Containers/BusinessMainScreen/CampaignView/PromotionDetails/PromotionDetailsScreen'
import ProofValidationMessage from 'App/Containers/BusinessMainScreen/ProofValidation/ProofValidationMessage'
import ProofValidation from 'App/Containers/BusinessMainScreen/ProofValidation/ProofValidation'
import CustomerVerification from 'App/Containers/BusinessMainScreen/CustomerVerification/CustomerVerification'
import AllLocations from 'App/Containers/AllLocations/AllLocations'

/**
 * The root screen contains the application's navigation.
 *
 * @see https://reactnavigation.org/docs/en/hello-react-navigation.html#creating-a-stack-navigator
 */
const AppContainer = createAppContainer(
  createStackNavigator(
    {
      // Create the application routes here (the key is the route name, the value is the target screen)
      // See https://reactnavigation.org/docs/en/stack-navigator.html#routeconfigs
      SignInScreen: SignInScreen,
      // HomeScreen: SignInScreen,
      SplashScreen: SplashScreen,

      RegionScreen: Region,
      JourneyScreen: Journey,
      VerificationScreen: Verification,
      CustomerSignUpScreen: CustomerSignUp,
      FacebookCustomerDetails: FacebookCustomerDetails,

      BusinessSignUpScreen: BusinessSignUp,

      CustomerMainScreen: CustomerMainScreenWithBottomNav,
      BucketListScreen: BucketList,
      PromoDetailsScreen: PromoDetailsScreen,
      CustomerEditProfile: CustomerEditProfile,
      CustomerSelfScreen: CustomerSelfScreen,
      CustomerRedeem: ReferrerFinder,
      CustomerBecomeReferrerScreen: CustomerBecomeReferrer,
      ReferalGoingOnScreen: ReferalGoingOn,
      ReferPromotionScreen: ReferPromotion,
      PromotionDetailScreen: PromotionDetail,
      RedemptionEnterInfo: RedemptionEnterInfo,
      OnlineRedemptionComplete: OnlineRedemptionComplete,
      ScanPasscode: ScanPasscode,

      BusinessMainScreen: BusinessMainScreenWithBottomNav,
      PromotionDetailsScreen: PromotionDetailsScreen,

      ComponentScreen: ComponentScreen,
      TmpInstagramScreen: TmpInstagramScreen,
      ExampleScreen: ExampleScreen,

      BusinessEditProfileScreen: BusinessEditProfile,
      AddPaymentMethodScreen: AddPaymentMethod,
      TransactionScreen: TransactionScreen,
      SelectPromotionTypeScreen: SelectPromotionType,
      NewOfflineCampaignScreen: NewOfflineCampaign,
      NewOnlineCampaignScreen: NewOnlineCampaign,
      EditPasscode: EditPasscode,
      ExpandedFeedPromotionScreen: ExpandedFeedPromotion,
      NotificationScreen: NotificationScreen,
      BusinessTransactionScreen: BusinessTransactionScreen,
      BusinessTransferAccountScreen: BusinessTransferAccountScreen,
      CustomerWithdrawalHistoryScreen: CustomerWithdrawalHistoryScreen,
      CustomerWithdrawScreen: CustomerWithdrawScreen,
      CustomerEditCategory: CustomerEditCategory,
      ProfileView: ProfileView,
      CustomerSignUpLastStep: CustomerSignUpLastStep,
      ApprovalFailure: ApprovalFailure,
      ApprovalFailurePromo: ApprovalFailurePromo,
      BillingHistory: BusinessBillScreen,
      DonateToCharity: DonateToCharity,
      CusotmerValidation: CustomerVerification,
      AllLocations: AllLocations,
      ProofValidation: ProofValidation,
      ProofValidationMessage: ProofValidationMessage,
    },
    {
      // By default the application will show the splash screen
      initialRouteName: 'SplashScreen',
      // See https://reactnavigation.org/docs/en/stack-navigator.html#stacknavigatorconfig
      headerMode: 'none',
    },
  ),
)

class RootApp extends Component {
  componentDidMount() {
    // Run the startup saga when the application is starting
    this.props.startup()
  }

  render() {
    return (
      <AppContainer
        // Initialize the NavigationService (see https://reactnavigation.org/docs/en/navigating-without-navigation-prop.html)
        // <Button onPress={() => this.drawer && this.drawer.openDrawer()}>Open drawer</Button>
        ref={(navigatorRef) => {
          NavigationService.setTopLevelNavigator(navigatorRef)
        }}
      />
    )
  }
}

const mapStateToProps = () => ({})

const mapDispatchToProps = (dispatch) => ({
  startup: () => dispatch(StartupActions.startup()),
})

RootApp.propTypes = {
  startup: PropTypes.func,
}

export default connect(mapStateToProps, mapDispatchToProps)(RootApp)
