/* eslint-disable camelcase */
import React, {Component} from 'react'
import {Image, StatusBar, Text, TouchableOpacity, View, ScrollView} from 'react-native'
import PropTypes from 'prop-types'
import Style from 'App/Containers/SignInScreen/SignInAndVerification/Journey/JourneyStyle'
import NavigationService from 'App/Services/NavigationService'
import {translate} from 'App/Services/TranslationService'
import ClickableText from 'App/Components/ClickableText/ClickableText'
import {ApplicationStyles, Colors, Images} from 'App/Theme'
import LinearGradient from 'react-native-linear-gradient'
import Modal from 'react-native-modal'
import {LoginManager, GraphRequest, GraphRequestManager, AccessToken} from 'react-native-fbsdk'
import CustomButton from 'App/Components/CustomButton/CustomButton'

class Journey extends Component {
  constructor(props) {
    super(props)
    const regionId = this.props.navigation.getParam('regionId', 1)
    this.state = {
      borderColorBusiness: Colors.white,
      borderColorShopper: Colors.white,
      businessSelect: false,
      shopperSelect: false,
      isModalShown: false,
      regionId: regionId,
    }
  }

  onPressLeftIcon = () => {
    NavigationService.pop()
  }
  businessPress = () => {
    const {businessSelect} = this.state
    this.setState({businessSelect: !businessSelect}, () => {
      if (this.state.businessSelect) {
        this.setState({shopperSelect: false})
      }
    })
  }
  shopperPress = () => {
    const {shopperSelect} = this.state
    this.setState({shopperSelect: !shopperSelect}, () => {
      if (this.state.shopperSelect) {
        this.setState({businessSelect: false})
      }
    })
  }

  onHideModal = () => {
    this.setState({isModalShown: false})
  }

  askForFacebookSignUp = () => {
    this.setState({isModalShown: true})
    // NavigationService.navigate('FacebookCustomerDetails')
  }

  verifyClick = () => {
    if (this.state.businessSelect) {
      const regionId = this.state.regionId
      NavigationService.navigate('BusinessSignUpScreen', {regionId: regionId})
    } else {
      // NavigationService.navigate('CustomerSignUpScreen', {regionId: this.state.regionId})
      this.askForFacebookSignUp()
    }
  }

  onPressContinueWithFacebook = () => {
    this.onHideModal()

    const regionId = this.state.regionId
    setTimeout(() => {
      LoginManager.logInWithPermissions([
        'email',
        'public_profile',
        'user_birthday',
        'user_gender',
      ]).then(
        function(result) {
          if (result.isCancelled) {
            console.log('Login cancelled')
          } else {
            console.log('Login success with permissions: ' + result.grantedPermissions.toString())
            console.log(result)
            this.isAttempting = true

            AccessToken.getCurrentAccessToken().then((data) => {
              console.log('dataa', data)

              const {accessToken} = data
              const infoRequest = new GraphRequest(
                '/me',
                {
                  accessToken: accessToken,
                  parameters: {
                    fields: {
                      string: 'email,gender,birthday,first_name,last_name',
                    },
                  },
                },
                async (error, result) => {
                  if (error) {
                    alert(`Error fetching data: ${error.toString()}`)
                  } else {
                    console.log(result)
                    const {email, id, first_name, last_name, gender, birthday} = result

                    const profileRequest = new GraphRequest(
                      `/${id}`,
                      {
                        accessToken: accessToken,
                        parameters: {
                          fields: {
                            string: 'picture',
                          },
                        },
                      },
                      async (error, resultProfile) => {
                        if (error) {
                          alert(`Error fetching data: ${error.toString()}`)
                        } else {
                          const {picture} = resultProfile
                          const detail = {
                            email: email,
                            firstName: first_name,
                            lastName: last_name,
                            gender: gender || '',
                            birthday: birthday || '',
                            profilePicture: picture.data.url,
                          }
                          NavigationService.navigate('FacebookCustomerDetails', {
                            userDetail: detail,
                            regionId: regionId,
                          })
                        }
                      },
                    )
                    new GraphRequestManager().addRequest(profileRequest).start()
                  }
                },
              )
              new GraphRequestManager().addRequest(infoRequest).start()
            })
          }
        },
        function(error) {
          alert(`${error.toString()}`)
        },
      )
    }, 200)
  }

  onPressContinueManually = () => {
    this.onHideModal()
    setTimeout(() => {
      const regionId = this.state.regionId
      if (this.state.businessSelect) {
        NavigationService.navigate('BusinessSignUpScreen', {regionId: regionId})
      } else {
        NavigationService.navigate('CustomerSignUpScreen', {regionId: regionId})
      }
    }, 200)
  }

  renderModal() {
    const {isModalShown} = this.state
    return (
      <Modal
        isVisible={isModalShown}
        onBackdropPress={this.onHideModal}
        swipeDirection="left"
        avoidKeyboard={true}
        style={Style.modalContainer}>
        <View>
          <View style={Style.modalContent}>
            <View style={Style.modalTopDash} />
            <Text style={Style.regestrationMethodText}>{translate('regestrationMethod')}</Text>
            <Text style={Style.useFacebookText}>
              {translate('youCanUse')}
              <Text style={Style.facebook}>{translate('facebook')}</Text>
              {translate('toSpeedUp')}
            </Text>

            <CustomButton
              mainViewStyle={false}
              primaryButton={false}
              isImagePlushText={true}
              isImagePlushTextMainView={Style.buttonImageStyleFirst}
              isImagePlushTextOnPress={this.onPressContinueWithFacebook}
              isImagePlushTextImageSource={Images.facebookLogin}
              isImagePlushTextImageStyle={Style.imageStyle}
              isImagePlushTextTitle={translate('continueWithFacebook')}
              isImagePlushTextTitleStyle={Style.fontButton}
            />

            <CustomButton
              mainViewStyle={false}
              primaryButton={false}
              isImagePlushText={true}
              isImagePlushTextMainView={Style.buttonImageStyleLast}
              isImagePlushTextOnPress={this.onPressContinueManually}
              isImagePlushTextImageSource={Images.thunder}
              isImagePlushTextImageStyle={Style.imageStyle}
              isImagePlushTextTitle={translate('continueManually')}
              isImagePlushTextTitleStyle={Style.fontButton}
            />
          </View>
        </View>
      </Modal>
    )
  }

  render() {
    const {shopperSelect, businessSelect} = this.state
    return (
      <React.Fragment>
        <StatusBar
          backgroundColor="transparent"
          barStyle="dark-content"
          hidden={false}
          // To hide statusBar
          // Background color of statusBar
          translucent={true}
          // allowing light, but not detailed shapes
          networkActivityIndicatorVisible={true}
        />
        <View style={Style.mainContain}>
          <View style={Style.customSliderContainer}>
            <LinearGradient
              colors={['#57A3E8', '#00DFBD']}
              start={{x: 1, y: 1}}
              end={{x: 0, y: 0}}
              style={Style.customSliderStyle}
            />
            <View style={Style.inactiveSlider} />
          </View>
          <TouchableOpacity
            style={[ApplicationStyles.backIcon, ApplicationStyles.backIconWrapper]}
            onPress={this.onPressLeftIcon}
            activeOpacity={1}>
            <Image source={Images.backIcon} style={ApplicationStyles.backIcon} />
          </TouchableOpacity>
          <ScrollView>
            <View style={Style.innerView}>
              <View style={Style.centerView}>
                <Text style={Style.innerTxt}>{translate('youAreInForAnExcitingJourney')}</Text>
                <Text style={Style.mainTxt}> {translate('areYouABusinessOrACustomer')} </Text>
              </View>
              <View style={Style.middalView}>
                <TouchableOpacity onPress={this.shopperPress}>
                  <Image
                    source={shopperSelect ? Images.shopperOn : Images.shopperOff}
                    resizeMode={'contain'}
                    style={Style.shopperImg}
                  />
                  <Text style={shopperSelect ? Style.txtStyleOn : Style.txtStyleOff}>
                    {translate('SHOPPER')}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.businessPress}>
                  <Image
                    source={businessSelect ? Images.businessOn : Images.businessOff}
                    resizeMode={'contain'}
                    style={Style.businessImg}
                  />
                  <Text style={businessSelect ? Style.txtStyleOn : Style.txtStyleOff}>
                    {translate('business').toUpperCase()}
                  </Text>
                </TouchableOpacity>
              </View>
              <View>
                <ClickableText
                  inputText={translate('iAmReady')}
                  onPress={this.verifyClick}
                  style={
                    businessSelect || shopperSelect
                      ? Style.buttonContainer
                      : Style.deactivateButtonContainer
                  }
                  textStyle={Style.buttonTextStyle}
                  editable={!(businessSelect || shopperSelect)}
                />
              </View>
            </View>
          </ScrollView>
        </View>
        {this.renderModal()}
      </React.Fragment>
    )
  }
}

export default Journey

Journey.propTypes = {
  navigation: PropTypes.object.isRequired,
}
