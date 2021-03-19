import React, {Component} from 'react'
import {Alert, Image, StatusBar, Text, View} from 'react-native'
import Style from 'App/Containers/SignInScreen/SignInAndVerification/SignIn/SignInStyle'
import NavigationService from 'App/Services/NavigationService'
// import CustomInputText from 'App/Components/CustomInputText/CustomInputText'
import CountryPick from 'App/Components/CountryPicker/CountryPick'
import {translate} from 'App/Services/TranslationService'
import {Images, Metrics} from 'App/Theme'
// import Colors from 'App/Theme/Colors'
import {UserService} from 'App/Services/GraphQL/UserService'
import Spinner from 'react-native-loading-spinner-overlay'
import LinearGradient from 'react-native-linear-gradient'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import StorageService from 'App/Services/AsyncStorage/StorageService'
import CustomButton from 'App/Components/CustomButton/CustomButton'
import {TouchableOpacity} from 'react-native-gesture-handler'

class SignInScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      spinner: false,
      mobileNumber: null,
    }
  }

  // TODO: remove this for prod
  tmpValidNumbers = [
    '+852101',
    '+852 101',
    '+852102',
    '+852 102',
    '+852103',
    '+852 103',
    '+852104',
    '+852 104',
    '+852105',
    '+852 105',
    '+852106',
    '+852 106',
    '+852201',
    '+852 201',
    '+852202',
    '+852 202',
    '+852203',
    '+852 203',
    '+852204',
    '+852205',
    '+852 204',
  ]

  onPressConfirm = () => {
    // NavigationService.push('ApprovalFailure', {
    //   rejectedReason: '',
    // })
    // NavigationService.push('BusinessSignUpScreen')
    const cca2 = this.countryPick.getCca2()
    const countryCode = this.countryPick.getCountryCode()
    const phoneNumber = this.countryPick.getPhoneNumber()
    const tmpFullNumber = countryCode + phoneNumber
    if (
      !this.tmpValidNumbers.includes(tmpFullNumber) && // TODO: remove it before production
      !this.countryPick.isValidNumber()
    ) {
      Alert.alert('Error', 'Invalid Number') // TODO: use translate
      return
    }
    this.setState({spinner: true}, () => {
      // console.log(countryCode, phoneNumber)
      UserService.sendVerificationSms(countryCode, phoneNumber)
        .then(() => {
          this.setState({spinner: false}, () => {
            global.storage.save({
              key: StorageService.USER_PHONE_NUMBER_DATA_KEY,
              data: {
                callingCode: countryCode + ' ' + phoneNumber,
                cca2: cca2,
              },
            })
            NavigationService.navigate('VerificationScreen', {
              countryCode: countryCode,
              phoneNumber: phoneNumber,
            })
          })
        })
        .catch((err) => {
          this.setState({spinner: false}, () => {
            setTimeout(() => {
              Alert.alert('Error', err.message)
            }, 100)
          })
        })
    })
  }

  onPressTermsAndPolicy = () => {
    console.log('click on terms and policy')
  }

  //   setMobileNumber = (text) => {
  //     text = text.replace(/[^\d]+/g, '')
  //     this.setState({ mobileNumber: text })
  //   }
  render() {
    return (
      <View style={Style.backStyle}>
        <StatusBar
          backgroundColor="transparent"
          barStyle="light-content"
          hidden={false}
          // To hide statusBar
          // Background color of statusBar
          translucent={true}
          // allowing light, but not detailed shapes
          networkActivityIndicatorVisible={true}
        />
        <LinearGradient
          colors={['#00dfbd', '#57a2e8']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          //   locations={[0, 0.5, 1.6]}
          style={Style.backStyle}
        />
        <Spinner visible={this.state.spinner} />
        <KeyboardAwareScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          style={Style.mainContain}
          scrollEnabled
          enableOnAndroid
          extraScrollHeight={Metrics.applyRatio(100)}
          keyboardShouldPersistTaps="handled">
          <View style={Style.innerView}>
            <Image source={Images.logo} style={Style.mainIcon} resizeMode="contain" />
            <Text style={Style.mainTxt}>{translate('signInMessage')}</Text>
            <CountryPick
              ref={(ref) => {
                this.countryPick = ref
              }}
              onPressConfirm={this.onPressConfirm}
            />
            <CustomButton
              primaryButtonStyle={Style.clickableContainer}
              primaryButtonInputText={translate('proceed')}
              primaryButtonOnPress={this.onPressConfirm}
              primaryButtonTextStyle={Style.clickableTextStyle}
            />
            <TouchableOpacity style={Style.byProceedStyle} onPress={this.onPressTermsAndPolicy}>
              <Text style={Style.txtStyle}>{translate('byProceeding')}</Text>
              <Text style={Style.txtStyle}>
                <Text style={Style.txtStyleBold}>{translate('terms')}</Text>
                {translate('and')}
                <Text style={Style.txtStyleBold}>{translate('privacyPolicy')}</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      </View>
    )
  }
}

export default SignInScreen
