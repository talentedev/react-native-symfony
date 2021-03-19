import {PropTypes} from 'prop-types'
import React from 'react'
import {Alert, Image, Text, View, KeyboardAvoidingView} from 'react-native'
import Style from './CustomerWithdrawScreenStyle'
import {Images} from 'App/Theme'
import {translate} from 'App/Services/TranslationService'
import CustomButton from 'App/Components/CustomButton/CustomButton'
import {CustomerService} from 'App/Services/GraphQL/CustomerService'
import {UserService} from 'App/Services/GraphQL/UserService'
import Spinner from 'react-native-loading-spinner-overlay'
// Component
import CustomHeader from 'App/Components/CustomHeader'
import CustomInputText from 'App/Components/CustomInputText/CustomInputText'
import {validateEmail} from 'App/Services/Validation'
import NavigationService from 'App/Services/NavigationService'
import {CustomerDrawer} from 'App/Containers/CustomerMainScreen/CustomerMainScreen'
import {convertCurrency} from 'App/Services/Utils'

class CustomerWithdrawScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      amount: 0,
      email: '',
      walletData: {},
      paymentData: {},
      loading: true,
      isEditable: false,
      isAmount: false,
    }
    this._fetchWallet()
  }
  _fetchWallet = () => {
    UserService.loggedCustomerWallet().then((res) => {
      this.setState(
        {
          walletData: res.data.loggedCustomerWallet,
          amount: Number(res.data.loggedCustomerWallet.balance),
        },
        () => {
          this.valueCheck()
          this._fetchPayment()
        },
      )
    })
  }

  _fetchPayment = () => {
    UserService.loggedCustomerPayment().then((res) => {
      console.log('response =>', res)
      this.setState(
        {
          paymentData: res.data.loggedCustomerPayment,
          email: res.data
            ? res.data.loggedCustomerPayment
              ? res.data.loggedCustomerPayment.paymentEmail
                ? res.data.loggedCustomerPayment.paymentEmail
                : ''
              : ''
            : '',
          loading: false,
        },
        () => {
          this.emailCheck()
        },
      )
    })
  }

  emailCheck = () => {
    const {email, isAmount} = this.state
    if (validateEmail(email) && isAmount) {
      this.setState({isEditable: true})
    } else {
      this.setState({isEditable: false})
    }
  }

  valueCheck = () => {
    const {walletData, amount} = this.state
    if (parseFloat(amount) > 0 && parseFloat(amount) <= parseFloat(walletData.balance)) {
      this.setState({isAmount: true}, () => {
        this.emailCheck()
      })
    } else {
      this.setState({isAmount: false, isEditable: false})
    }
  }
  // Extra Function
  setAmount = (text) => {
    this.setState({amount: text}, () => {
      this.valueCheck()
    })
  }

  setEmail = (text) => {
    this.setState({email: text}, () => {
      this.valueCheck()
    })
  }

  onPressNext = () => {
    const {amount, email} = this.state
    this.setState({loading: true}, () => {
      CustomerService.withdraw(Number(amount), email)
        .then((res) => {
          this.setState({loading: false}, () => {
            setTimeout(() => {
              if (res.data.withdraw === null) {
                Alert.alert('Error', 'Incorrect information, please retry later')
              } else if (res.data.withdraw.status !== 'refused') {
                CustomerDrawer.current.close()
                setTimeout(() => {
                  NavigationService.popToTop()
                }, 500)
                Alert.alert(
                  'Success',
                  '$' + convertCurrency(amount) + ' has been transferred to your PayPal account !',
                )
                NavigationService.navigateAndReset('CustomerMainScreen')
              } else {
                Alert.alert('Error', 'PayPal payout failed, please retry later')
              }
            }, 100)
          })
        })
        .catch((err) => {
          this.setState({loading: false})
          console.log('error', err)
        })
    })
  }

  onSubmitEditing = () => {
    const {email, isAmount} = this.state
    if (email !== '' && isAmount) {
      this.onPressNext()
    }
  }

  render() {
    const {amount, loading, isEditable, email} = this.state
    return (
      <View style={Style.container}>
        <KeyboardAvoidingView style={Style.container} behavior="padding" enabled>
          <Spinner visible={loading} />
          <CustomHeader
            title={translate('withdrawBalance')}
            leftComponent="back"
            leftIconPress={this.onPressLeftIcon}
          />
          <View style={Style.viewAmount}>
            <Image style={Style.paypalStyle} source={Images.paypal} />
            <Text style={Style.placeHolder}>{translate('amountToWithdraw')}</Text>
            <View style={Style.inputStyleWithIcon}>
              <Text style={Style.dollar}>{'$'}</Text>
              <CustomInputText
                style={Style.inputStyle2}
                value={amount.toString()}
                onChangeText={this.setAmount}
                keyboardType="numeric"
              />
            </View>
            <CustomInputText
              style={Style.inputStyle}
              value={email}
              placeholder={translate('paypalEmailAccount')}
              onChangeText={this.setEmail}
              onSubmitEditing={this.onSubmitEditing}
              keyboardType="email-address"
            />
          </View>
          <View style={Style.marginBottomButton}>
            <CustomButton
              primaryButtonInputText={translate('next')}
              primaryButtonOnPress={this.onPressNext}
              primaryButtonEditable={!isEditable}></CustomButton>
          </View>
        </KeyboardAvoidingView>
      </View>
    )
  }
}

CustomerWithdrawScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
}

export default CustomerWithdrawScreen
