import React, {createRef} from 'react'
import {Alert, Image, NativeModules, ScrollView, Text, TouchableOpacity, View} from 'react-native'
import CustomHeader from 'App/Components/CustomHeader'
import CustomButton from 'App/Components/CustomButton/CustomButton'
import {translate} from 'App/Services/TranslationService'
import Style from './EditPasscodeStyle'
import {Colors, Fonts, Images, Metrics} from 'App/Theme'
import CodeInput from 'react-native-confirmation-code-field'
import NavigationService from 'App/Services/NavigationService'
import {UserService} from 'App/Services/GraphQL/UserService'
import Spinner from 'react-native-loading-spinner-overlay'
import {BusinessDrawer} from 'App/Containers/BusinessMainScreen/BusinessMainScreen'
import ToastService from 'App/Services/ToastService'
import buffer from 'buffer'
import QRCode from 'react-native-qrcode-image'
import ViewShot from 'react-native-view-shot'
import CameraRoll from '@react-native-community/cameraroll'
import StorageService from 'App/Services/AsyncStorage/StorageService'

global.Buffer = buffer.Buffer

const {UIManager} = NativeModules

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true)

export default class EditPasscode extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      passcode: '',
      isFullCode: true,
      isShowPasscode: false,
      loading: true,
    }
    this._fetchPassCode()
  }
  _fetchPassCode = () => {
    UserService.getBusinessUser().then((res) => {
      this.setState({passcode: res.data.businessUser.passcode, loading: false}, () => {
        const {current} = this.field
        if (current) {
          current.handlerOnTextChange(this.state.passcode)
        }
      })
    })
  }

  // onChangeText Method

  // onPress Method
  onPressLeftIcon = () => {
    NavigationService.pop()
  }

  // onPressNext = () => {
  //   this.setState({loading: true}, () => {
  //     UserService.updateBusinessPasscode(this.state.passcode)
  //       .then(() => {
  //         BusinessDrawer.current.close()
  //         setTimeout(() => {
  //           this.setState(
  //             {
  //               loading: false,
  //             },
  //             () => {
  //               NavigationService.pop()
  //               ToastService.show('Passcode updated !️')
  //             },
  //           )
  //         }, 500)
  //       })
  //       .catch(() => {
  //         this.setState(
  //           {
  //             loading: false,
  //           },
  //           () =>
  //             setTimeout(() => {
  //               Alert.alert(translate('errors.error'), translate('errors.pleaseRetryLater'))
  //             }, 100),
  //         )
  //       })
  //   })
  // }

  generateRandomPassCode = () => {
    let result = ''
    let chars = '0123456789'
    for (let i = 6; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)]
    this.pasteCode(result)
    this.setState({isFullCode: true})
    UserService.updateBusinessPasscode(result)
      .then(() => {
        BusinessDrawer.current.close()
        setTimeout(() => {
          this.setState(
            {
              loading: false,
            },
            () => {
              ToastService.show(translate('passcodeUpdated'))
            },
          )
        }, 500)
      })
      .catch(() => {
        this.setState(
          {
            loading: false,
          },
          () =>
            setTimeout(() => {
              Alert.alert(translate('errors.error'), translate('errors.pleaseRetryLater'))
            }, 100),
        )
      })
  }

  // editPassCoe = () => {
  //   this.setState({
  //     isFullCode: false,
  //   })
  // }
  handlerOnFulfill = (code) => {
    if (this.isValidCode(code)) {
      this.setState({
        passcode: code,
        isFullCode: true,
      })
    } else {
      this.clearCode()
    }
  }

  isValidCode(code) {
    return true
  }

  field = createRef()

  clearCode() {
    const {current} = this.field
    if (current) {
      current.clear()
    }
  }

  pasteCode(value) {
    const {current} = this.field

    if (current) {
      current.handlerOnTextChange(value)
      this.setState({
        passcode: value,
        isFullCode: true,
      })
    }
  }

  saveImageToCameraRoll = () => {
    // On iOS need to link RCTCameraRoll lib : https://facebook.github.io/react-native/docs/cameraroll.html
    this.viewShot
      .capture()
      .then((uri) => {
        this._saveImageToCameraRoll(uri)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  _saveImageToCameraRoll = (uri) => {
    StorageService.checkPhotoPermission().then((res) => {
      if (res === true) {
        CameraRoll.saveToCameraRoll(uri, 'photo')
          .then((newUri) => {
            ToastService.show(translate('imageSaved'))
          })
          .catch((err) => {
            console.log(err)
          })
      }
    })
  }

  // render Method

  render() {
    const {passcode, isShowPasscode} = this.state
    return (
      <React.Fragment>
        <View style={Style.container}>
          <CustomHeader
            withGrey
            title={translate('passCode')}
            leftComponent="back"
            leftIconPress={this.onPressLeftIcon}
          />
          <View style={Style.contentFullContainer}>
            <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
              {/* <View style={Style.container}> */}
              <View style={Style.stepContainer}>
                {/* <Text style={[Fonts.style.title, ApplicationStyles.screen.textAlignCenter]}>
              {translate('editPassCode')}
            </Text> */}
                <Text style={[Fonts.style.greyInfo, Style.stepDescription]}>
                  {translate('newCampaignStepDesc7')}
                </Text>
              </View>
              <View style={Style.contentContainer}>
                <Spinner visible={this.state.loading} />
                <View style={Style.passCodeInputContainer}>
                  <View style={Style.codeInputWrapper}>
                    <CodeInput
                      ref={this.field}
                      inputPosition="full-width"
                      inputProps={{editable: !this.state.isFullCode}}
                      variant="clear"
                      keyboardType="number-pad"
                      codeLength={6}
                      size={Metrics.applyRatio(44)}
                      activeColor={this.state.isFullCode ? Colors.grey : Colors.black}
                      inactiveColor={this.state.isFullCode ? Colors.grey : Colors.black}
                      cellProps={{
                        style: isShowPasscode ? Style.codeCellItem : Style.codeCellCenterItem,
                      }}
                      containerProps={{style: Style.codeCellContainer}}
                      onFulfill={this.handlerOnFulfill}
                      defaultCode={passcode}
                      codeInputStyle={
                        this.state.isFullCode ? {color: Colors.grey} : {color: Colors.black}
                      }
                      maskSymbol={isShowPasscode ? '' : '*'}
                    />
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({isShowPasscode: !this.state.isShowPasscode})
                      this.clearCode()
                      this.pasteCode(passcode)
                    }}>
                    <Text style={Style.showHideTxt}>
                      {this.state.isShowPasscode
                        ? translate('hidePasscode')
                        : translate('showPasscode')}
                    </Text>
                  </TouchableOpacity>
                  <ViewShot
                    ref={(viewShot) => (this.viewShot = viewShot)}
                    options={{format: 'jpg', quality: 1}}>
                    <View style={Style.qrCodeContainer}>
                      <QRCode value={passcode} size={200} bgColor="#FFFFFF" fgColor="#000000" />
                    </View>
                  </ViewShot>
                  <TouchableOpacity
                    style={Style.bookmarkContainer}
                    onPress={this.saveImageToCameraRoll}>
                    <Image
                      source={Images.arrowDown}
                      style={[
                        Style.moreIcon,
                        {
                          width: Metrics.applyRatio(11),
                          height: Metrics.applyRatio(13),
                        },
                      ]}
                    />
                    <Text style={Style.addLocationText}>{translate('saveQrcodeImg')}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </View>

          <View style={Style.nextContainer}>
            <CustomButton
              areYouManuallyGivingPositionFromBottom={true}
              buttonPositionFromBottom={0}
              primaryButtonActiveOpacity={1}
              primaryButtonInputText={translate('generateNewPasscode')}
              primaryButtonOnPress={this.generateRandomPassCode}></CustomButton>

            <View />
          </View>
        </View>
        {/* </View> */}
      </React.Fragment>
    )
  }
}
