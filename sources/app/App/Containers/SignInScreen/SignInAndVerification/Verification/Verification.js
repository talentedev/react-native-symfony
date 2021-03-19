import React, {Component} from 'react'
import {Alert, Text, TouchableOpacity, View} from 'react-native'
import PropTypes from 'prop-types'
import CodeInput from 'react-native-confirmation-code-field'
import Spinner from 'react-native-loading-spinner-overlay'

import ClickableText from 'App/Components/ClickableText/ClickableText'
import CustomHeader from 'App/Components/CustomHeader'
import NavigationService from 'App/Services/NavigationService'
import {UserService} from 'App/Services/GraphQL/UserService'
import {TokenService} from 'App/Services/AsyncStorage/TokenService'
import {translate} from 'App/Services/TranslationService'

import {Colors, Metrics} from 'App/Theme'
import Style from './VerificationStyle'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
// import CustomInputText from 'App/Components/CustomInputText/CustomInputText'

const DELAY = 60

export default class Verification extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isVerifyDisable: true,
      isResendDisable: true,
      opacity: 1,
      resendOpacity: 1,
      counter: DELAY,
      otpLength: 0,
      passCode: '',
      isFullCode: false,
      isInValid: false,
      timer: null,
      spinner: false,
      countryCode: this.props.navigation.getParam('countryCode', ''),
      phoneNumber: this.props.navigation.getParam('phoneNumber', ''),
    }
  }

  componentDidMount = () => {
    this.runTimer()
    // this.fieldRef.focus()
  }

  componentWillUnmount() {
    if (this.state.timer) {
      clearInterval(this.state.timer)
    }
  }

  runTimer = () => {
    if (this.state.timer === null) {
      const myInterval = setInterval(() => {
        const {counter} = this.state
        //   let result = counter - 1
        if (counter < -1) {
          this.setState({resendOpacity: 0.3, isResendDisable: false, timer: null})
          clearInterval(myInterval)
        } else {
          this.setState({
            counter: counter - 1,
            resendOpacity: 1,
            isResendDisable: true,
          })
        }
      }, 1000)
      this.setState({
        timer: myInterval,
      })
    }
  }

  verifyClick = () => {
    const {isVerifyDisable, countryCode, phoneNumber, passCode} = this.state
    this.setState({spinner: true}, () => {
      !isVerifyDisable &&
        UserService.verifyCodeAndGetToken(countryCode, phoneNumber, passCode)
          .then((res) => {
            const token = res.data.verifyCodeAndGetToken
            if (token === null) {
              this.setState({spinner: false, isInValid: true})
              return
            }
            TokenService.setSmsSignInData(countryCode, phoneNumber, token)
              .then((res) => {
                if (this.state.timer) {
                  clearInterval(this.state.timer)
                }
                this.setState(
                  {
                    spinner: false,
                    isFullCode: false,
                    isInValid: false,
                  },
                  () => NavigationService.checkUserTypeAndNavigate(true),
                )
              })
              .catch((err) => {
                this.setState({spinner: false, isInValid: true}, () =>
                  setTimeout(() => {
                    Alert.alert('Error', err.message)
                  }, 100),
                )
              })
          })
          .catch((err) => {
            this.setState({spinner: false, isInValid: true}, () =>
              setTimeout(() => {
                Alert.alert('Error', err.message)
              }, 100),
            )
          })
    })
  }
  resendClick = () => {
    const {isResendDisable, countryCode, phoneNumber} = this.state
    !isResendDisable &&
      UserService.sendVerificationSms(countryCode, phoneNumber)
        .then(() => {
          this.setState(
            {
              counter: DELAY,
            },
            () => {
              !isResendDisable && this.runTimer()
            },
          )
        })
        .catch(() => {
          this.setState(
            {
              counter: DELAY,
            },
            () => {
              !isResendDisable && this.runTimer()
            },
          )
        })
  }

  isValidCode = (code) => {
    return true
  }

  handlerOnFulfill = (code) => {
    this.setState(
      {
        passCode: code,
        isVerifyDisable: false,
      },
      () => {
        this.verifyClick()
      },
    )
  }

  render() {
    const {isResendDisable, resendOpacity, opacity, counter, isFullCode, isInValid} = this.state

    return (
      <React.Fragment>
        <Spinner visible={this.state.spinner} />
        <CustomHeader compact leftComponent="back" />
        <KeyboardAwareScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          style={Style.mainContain}
          scrollEnabled
          enableOnAndroid
          extraScrollHeight={Metrics.applyRatio(100)}
          keyboardShouldPersistTaps="handled">
          <View style={Style.innerView}>
            <Text style={Style.mainTxt}>{translate('weHaveSentYourVerificationCode')} </Text>
            <Text style={Style.innerTxt}> {translate('itWillTakeNoLongerThan1Minute')} </Text>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {
                this.fieldRef.focus()
              }}>
              <View style={Style.verifyView}>
                <CodeInput
                  ref={(ref) => {
                    this.fieldRef = ref
                  }}
                  // autoFocus={true}
                  inputPosition="full-width"
                  inputProps={{editable: !this.state.isFullCode}}
                  variant="clear"
                  keyboardType="number-pad"
                  codeLength={6}
                  size={Metrics.applyRatio(44)}
                  activeColor={this.state.isFullCode ? Colors.grey : Colors.black}
                  inactiveColor={this.state.isFullCode ? Colors.grey : Colors.black}
                  cellProps={{style: Style.codeCellItem}}
                  containerProps={{style: Style.codeCellContainer}}
                  onFulfill={this.handlerOnFulfill}
                  defaultCode={this.state.passCode}
                />
              </View>
            </TouchableOpacity>

            {isInValid && (
              <Text style={Style.inValidText}>{translate('invalidVerificationCode')}</Text>
            )}

            <ClickableText
              inputText={translate('verify')}
              onPress={this.verifyClick}
              style={isFullCode ? Style.buttonContainer : Style.disActiveButtonContainer}
              textStyle={Style.buttonTextStyle}
              editable={!isFullCode}
              activeOpacity={opacity}
            />

            <ClickableText
              disabled={isResendDisable}
              inputText={
                counter < 0
                  ? translate('resendCode')
                  : `${translate('resendCode')}` + ` (${counter})`
              }
              style={Style.clickableContainer}
              textStyle={{
                ...Style.clickableTextStyle,
                color: counter < 0 ? Colors.brightBlue : Colors.grey,
              }}
              onPress={this.resendClick}
              activeOpacity={resendOpacity}
            />
          </View>
        </KeyboardAwareScrollView>
      </React.Fragment>
    )
  }
}

Verification.propTypes = {
  navigation: PropTypes.object.isRequired,
}
