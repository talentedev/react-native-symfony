import React from 'react'
import {
  Alert,
  Image,
  Keyboard,
  LayoutAnimation,
  NativeModules,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  Linking,
  Modal,
} from 'react-native'

import NavigationService from 'App/Services/NavigationService'
import {
  checkInstaUsernameAndFacebookUrl,
  isInstagramUsernameValid,
  validateEmail,
} from 'App/Services/Validation'
import Spinner from 'react-native-loading-spinner-overlay'
import {translate} from 'App/Services/TranslationService'
// Components
import CustomButton from 'App/Components/CustomButton/CustomButton'
import CustomInputText from 'App/Components/CustomInputText/CustomInputText'
import ValidationButton from 'App/Components/ValidationButton/ValidationButton'
import Style from 'App/Containers/SignInScreen/BussinessFlow/BusinessSignUp/BusinessSignUpStyle'
import ImagePicker from 'react-native-image-crop-picker'

import firebase from 'react-native-firebase/dist'
import ClickableText from 'App/Components/ClickableText/ClickableText'
import {TokenService} from 'App/Services/AsyncStorage/TokenService'
import {UserService} from 'App/Services/GraphQL/UserService'
import {ApplicationStyles, Colors, Images, Metrics} from 'App/Theme'
import {CategoryService} from 'App/Services/GraphQL/CategoryService'
import Categories from 'App/Components/Categories/Categories'
import SubCategories from 'App/Components/SubCategories/SubCategories'
import LinearGradient from 'react-native-linear-gradient'
import Fonts from 'App/Theme/Fonts'
import {convertCurrency} from 'App/Services/Utils'
import {PropTypes} from 'prop-types'

// Constant Value
const {UIManager} = NativeModules

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true)

const totalSteps = 6
const regionId = 1

// const facebookPreLink = 'facebook.com/'
export default class BusinessSignUp extends React.Component {
  constructor(props) {
    super(props)
    const {navigation} = props
    const regionId = navigation.getParam('regionId', 1)
    this.state = {
      currentIndex: 0,
      selectedImage: null,
      email: '',
      isLoading: true,
      userName: '',
      activeNextBtn: false,
      showError: false,
      businessName: '',
      instagramUserName: '',
      facebookUrl: '',
      profileImageUrl: null,
      categories: [],
      selectedItem: '1',
      selectedSubCategory: null,
      hkdValue: '',
      myCategoryModal: false,
      regionId: regionId,
    }
  }

  componentDidMount() {
    this._fetchCategories()
  }

  _onMyCategoryNotHere = () => {
    this.setState({myCategoryModal: true})
  }
  _fetchCategories = () => {
    CategoryService.getCategories()
      .then((res) => {
        this.setState({categories: res.data.categories.items})
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => {
        this.setState({isLoading: false})
      })
  }

  _provideData = (id = 0) => {
    const {categories} = this.state
    // @Question what should be done while loading ? atm mockData is on use
    id = (id && id - 1) || 0
    return categories[id]
  }

  onCategoryChangeHandle = (item) => {
    this.setState({selectedItem: item, selectedSubCategory: null})
  }

  onSubCategoryChangeHandle = (category, subCategoryId, averageItem) => {
    let hkdValue = ''
    if (averageItem.minAverageSpending && averageItem.maxAverageSpending) {
      hkdValue =
        translate('HKD') +
        ' ' +
        convertCurrency(averageItem.minAverageSpending) +
        ' - ' +
        convertCurrency(averageItem.maxAverageSpending)
    } else if (averageItem.minAverageSpending) {
      hkdValue = '≥ ' + translate('HKD') + ' ' + convertCurrency(averageItem.minAverageSpending)
    } else if (averageItem.maxAverageSpending) {
      hkdValue = '≤ ' + translate('HKD') + ' ' + convertCurrency(averageItem.maxAverageSpending)
    }
    this.setState({selectedSubCategory: subCategoryId, hkdValue: hkdValue})
  }
  // Mics Method

  // Change Text Field Value

  onChangeEmail = (text) => {
    this.setState({
      email: text,
    })
  }

  // onPress Method
  onPressLeftIcon = () => {
    const {currentIndex} = this.state
    if (currentIndex === 0) {
      NavigationService.pop()
      return
    }
    LayoutAnimation.easeInEaseOut()
    this.setState({
      currentIndex: currentIndex - 1,
    })
  }

  onPressSubmit = () => {
    Keyboard.dismiss()
    const {
      currentIndex,
      businessName,
      email,
      instagramUserName,
      facebookUrl,
      activeNextBtn,
    } = this.state

    if (currentIndex === 0) {
      if (activeNextBtn) {
        this.onPressNext()
      }
    } else if (currentIndex === 1) {
      if (businessName.length > 0) {
        this.onPressNext()
      }
    } else if (currentIndex === 3) {
      if (email.length > 0 && validateEmail(email)) {
        this.onPressNext()
      }
    } else if (currentIndex === 5) {
      if (instagramUserName.length > 0 && facebookUrl.length > 0) {
        this.onPressNext()
      }
    }
  }

  onPressNext = () => {
    Keyboard.dismiss()
    const {currentIndex, userName} = this.state
    if (currentIndex === 5) {
      this.setState({isLoading: true}, () => {
        const {
          // token,
          userName,
          businessName,
          selectedSubCategory,
          email,
          profileImageUrl,
          instagramUserName,
          facebookUrl,
          regionId,
        } = this.state
        if (checkInstaUsernameAndFacebookUrl(instagramUserName, facebookUrl)) {
          TokenService.getSmsSignInData().then((smsSignInData) => {
            // Token shouldn't be null
            UserService.businessSignUp(
              smsSignInData.smsSignInToken,
              regionId,
              userName,
              businessName,
              selectedSubCategory, // subCategoryId,
              email,
              profileImageUrl,
              instagramUserName,
              facebookUrl,
            )
              .then(() => {
                // should return true
                this.setState({isLoading: false}, () => {
                  LayoutAnimation.easeInEaseOut()
                  this.setState({
                    currentIndex: currentIndex + 1,
                    activeNextBtn: false,
                  })
                })
              })
              .catch((err) => {
                console.log(err)
              })
          })
        } else {
          this.setState({isLoading: false})
          setTimeout(() => {
            Alert.alert(
              translate('errors.error'),
              translate('invalidInstagramUsernameOrFacebookUrl'),
            )
          }, 100)
        }
      })
    } else if (currentIndex === 0) {
      // Username step
      UserService.isUsernameAvailable(userName)
        .then((res) => {
          if (!res.data.userNameAvailable) {
            this.setState({
              showError: true,
              activeNextBtn: false,
            })
          } else {
            LayoutAnimation.easeInEaseOut()
            this.setState({
              currentIndex: currentIndex + 1,
              showError: false,
            })
          }
        })
        .catch(() => {}) // TODO
    } else {
      LayoutAnimation.easeInEaseOut()
      this.setState({
        currentIndex: currentIndex + 1,
        activeNextBtn: false,
      })
    }
  }

  onChangeInstagramName = (text) => {
    let instagramUsernameRegex = /^[a-zA-Z0-9_.]{0,29}$/
    if (instagramUsernameRegex.test(text)) {
      this.setState({
        instagramUserName: text,
      })
    }
  }

  onChangeFacebookUrl = (text) => {
    this.setState({
      facebookUrl: text,
    })
  }
  onPressSave = () => {
    global.justSignedUpBusinness = true
    NavigationService.navigateAndReset('BusinessMainScreen')
  }

  uploadImage = () => {
    this.setState({isLoading: true, uploading: true}, () => {
      // // Sometime Android gives us weird non-local uri, so we use path instead (only available on Android)
      // const fileUriOrPath = Platform.select({
      //   ios: this.state.selectedImage.uri,
      //   android: this.state.selectedImage.path,
      // })
      const filePath = this.state.selectedImage.path
      this.setState({})
      firebase
        .storage()
        .ref(`upload_files/business/${this.state.userName}`)
        .putFile(filePath)
        .then((snapshot) => {
          if (snapshot.state === firebase.storage.TaskState.SUCCESS) {
            this.setState({profileImageUrl: snapshot.downloadURL})
          }
          this.setState({uploading: false, isLoading: false}, () => {
            this.onPressNext()
          })
        })
        .catch(() => {
          this.setState({uploading: false, isLoading: false}, () => {
            setTimeout(() => {
              Alert.alert('Error', 'An error occurred while uploading file.')
            }, 100)
          })
        })
    })
  }

  openImagePicker = () => {
    ImagePicker.openPicker({
      width: Metrics.UPLOAD_LOGO_SIZE,
      height: Metrics.UPLOAD_LOGO_SIZE,
      cropping: true,
    }).then((image) => {
      const objImg = {
        name: image.path.replace(/^.*[\\/]/, '') || this.state.userName + '.png',
        path: image.path,
      }
      this.setState({
        selectedImage: objImg,
      })
    })
  }

  onChangeUserName = (text) => {
    const enoughLength = text.length >= 3 && text.length <= 20
    if (isInstagramUsernameValid(text)) {
      this.setState({
        userName: text,
        activeNextBtn: enoughLength,
      })
    }
  }

  onChangeBusinessName = (text) => {
    let activeIndex = true
    if (text === '') {
      activeIndex = false
    }
    this.setState({
      businessName: text,
      activeNextBtn: activeIndex,
    })
  }
  // render Method
  renderScreen = () => {
    const {currentIndex} = this.state
    switch (currentIndex) {
      case 0:
        return this.renderFirstScreen()
      case 1:
        return this.renderSecondScreen()
      case 2:
        return this.renderThirdScreen()
      case 3:
        return this.renderFourthScreen()
      case 4:
        return this.renderFifthScreen()
      case 5:
        return this.renderSixthScreen()
      case 6:
        return this.renderSeventhScreen()
    }
  }

  renderFirstScreen = () => {
    const {activeNextBtn, currentIndex, showError, userName} = this.state

    return (
      <View style={[Style.container, Style.screen1Style]}>
        <View>
          <Text style={Style.stepTextStyle}>
            <Text style={{fontFamily: Fonts.fonts.PoppinsBold}}>{currentIndex + 1}</Text>{' '}
            {translate('outOf')}{' '}
            <Text style={{fontFamily: Fonts.fonts.PoppinsBold}}>{totalSteps}</Text>{' '}
            {translate('steps')}
          </Text>
          <Text style={Style.titleTextStyle}>{translate('newBusinessStep1')}</Text>
          <Text style={Style.innerTxt}>{translate('newBusinessStepDesc1')} </Text>
        </View>
        <View>
          <Text style={Style.subTitleStyle}>{translate('username')}</Text>
          <View style={Style.inputStyleWithIcon}>
            <Text style={Style.inputTextIcon}>{'@'}</Text>
            <CustomInputText
              style={[Style.container, Style.inputText]}
              multiline={false}
              placeholderTextColor={Colors.coolGrey}
              value={userName}
              onChangeText={this.onChangeUserName}
              onSubmitEditing={this.onPressSubmit}
            />
          </View>
          <Text style={Style.errorTxt}>{showError ? translate('userNameError') : ''}</Text>
        </View>
        <View>
          <ClickableText
            inputText={translate('next')}
            style={activeNextBtn ? Style.buttonContainer : Style.deactivateButtonContainer}
            textStyle={Style.buttonTextStyle}
            onPress={this.onPressNext}
            editable={!activeNextBtn}
          />
        </View>
      </View>
    )
  }

  renderSecondScreen = () => {
    const {currentIndex, businessName} = this.state
    return (
      <View style={[Style.container, Style.screen1Style]}>
        <View>
          <Text style={Style.stepTextStyle}>
            <Text style={{fontFamily: Fonts.fonts.PoppinsBold}}>{currentIndex + 1}</Text>{' '}
            {translate('outOf')}{' '}
            <Text style={{fontFamily: Fonts.fonts.PoppinsBold}}>{totalSteps}</Text>{' '}
            {translate('steps')}
          </Text>
          <Text style={Style.titleTextStyle}>{translate('newBusinessStep2')}</Text>
          <Text style={Style.innerTxt}>{translate('newBusinessStepDesc2')} </Text>
        </View>
        <CustomInputText
          style={Style.inputStyle}
          value={businessName}
          placeholder={translate('businessName')}
          keyboardType="email-address"
          onChangeText={this.onChangeBusinessName}
          onSubmitEditing={this.onPressSubmit}
        />
        <View>
          <ClickableText
            inputText={translate('next')}
            style={
              businessName.length === 0 ? Style.deactivateButtonContainer : Style.buttonContainer
            }
            textStyle={Style.buttonTextStyle}
            onPress={this.onPressNext}
            editable={businessName.length === 0}
          />
        </View>
      </View>
    )
  }

  renderThirdScreen = () => {
    const {
      categories,
      currentIndex,
      selectedItem,
      selectedSubCategory,
      myCategoryModal,
      hkdValue,
    } = this.state
    if (categories.length === 0) {
      return
    }
    return (
      <View style={[Style.container, Style.selCategoryContainer]}>
        <View>
          <View style={Style.whiteHeaderContainer}>
            <Text style={Style.stepTextStyle}>
              <Text style={{fontFamily: Fonts.fonts.PoppinsBold}}>{currentIndex + 1}</Text>{' '}
              {translate('outOf')}{' '}
              <Text style={{fontFamily: Fonts.fonts.PoppinsBold}}>{totalSteps}</Text>{' '}
              {translate('steps')}
            </Text>
            <Text style={Style.titleTextStyle}>{translate('whatIsYourBusiness')}</Text>
          </View>
        </View>
        {categories.length === 0 ? (
          <Text>no categories</Text>
        ) : (
          <View style={Style.subCategoryContainer}>
            <Categories
              onCategoryChange={this.onCategoryChangeHandle}
              isMultiSelect={false}
              curCatId={this.state.selectedItem}
              categories={this.state.categories}
              isInline={true}
            />
            <View style={Style.categorySlot} />
            <View style={Style.container}>
              <Text style={Style.subCategorySelect}>{translate('selectSubCategory')}</Text>
              <SubCategories
                data={this._provideData(selectedItem)}
                onSubCategoryChange={this.onSubCategoryChangeHandle}
                curCatId={this.state.selectedItem}
                curSubcatId={this.state.selectedSubCategory}
                regionId={regionId}
              />
            </View>
          </View>
        )}
        <View>
          <View style={Style.finishContainer}>
            <Text style={Style.maxMinAvdTxt}>{hkdValue}</Text>
            {selectedSubCategory && <Text style={Style.avgCatTxt}>{translate('avgCatTxt')}</Text>}
            <View style={ApplicationStyles.screen.containerRow}>
              <ClickableText
                inputText={translate('finish')}
                style={selectedSubCategory ? Style.buttonContainer : Style.buttonContainerDisabled}
                textStyle={Style.buttonTextStyle}
                onPress={this.onPressNext}
                editable={!selectedSubCategory}
              />
              <TouchableOpacity style={Style.shareView} onPress={this._onMyCategoryNotHere}>
                {/* <Image source={Images.shareIcon} style={Style.shareIconSize} /> */}
                <Text style={Style.questionIcon}>{'?'}</Text>
              </TouchableOpacity>
            </View>
            {/* <View style={Style.finishStyle}> */}

            {/* <ClickableText */}
            {/*  inputText={translate('myCategoryNotHere')} */}
            {/*  textStyle={Style.buttonMessageStyle} */}
            {/*  onPress={this._onMyCategoryNotHere} */}
            {/* /> */}
            {/* </View> */}
          </View>
        </View>
        {myCategoryModal ? this.renderModal() : null}
      </View>
    )
  }

  onBackPress = () => {
    this.setState({myCategoryModal: false})
  }

  renderModal = () => {
    const {myCategoryModal} = this.state
    return (
      <Modal
        isVisible={myCategoryModal}
        onBackdropPress={this.onBackPress}
        swipeDirection="left"
        avoidKeyboard={true}
        transparent={true}
        style={Style.modalContainer}>
        <TouchableOpacity onPress={this.onBackPress} style={Style.innerMain}>
          <View style={Style.modalMainView}>
            <View style={Style.modalTopDash} />
            <Text style={Style.title}>{translate('categoryMissing')}</Text>
            <Text style={Style.titleContext}>{translate('categoryMissingTitle')}</Text>
            <View style={Style.modalInnerView}>
              <TouchableOpacity style={Style.modalPart} onPress={this.onPressWhatsapp}>
                <Image source={Images.whatsappIconLarge} style={Style.modalTabView} />
                <Text style={Style.innerTxt}>{translate('whatsapp')}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={Style.modalPart} onPress={this.onPressEmail}>
                <Image source={Images.subScription} style={Style.modalTabView} />
                <Text style={Style.innerTxt}>{translate('email')}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={Style.modalPart} onPress={this.onPressCall}>
                <Image source={Images.telePhone} style={Style.modalTabView} />
                <Text style={Style.innerTxt}>{translate('call')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    )
  }

  onPressCall = () => {
    Linking.openURL(`tel:85267464912`)
  }

  onPressEmail = () => {
    // Linking.openURL('mailto:info@ambassador.com?subject=abcdefg&body=body')
    Linking.openURL('mailto:info@ambassador.com')
  }

  onPressWhatsapp = () => {
    Linking.openURL('whatsapp://send?phone=85267464912').catch(() => {
      Linking.openURL('http://api.whatsapp.com/send?phone=85267464912')
    })
  }

  renderFourthScreen = () => {
    const {currentIndex, email} = this.state
    return (
      <View style={[Style.container, Style.screen1Style]}>
        <View>
          <Text style={Style.stepTextStyle}>
            <Text style={{fontFamily: Fonts.fonts.PoppinsBold}}>{currentIndex + 1}</Text>{' '}
            {translate('outOf')}{' '}
            <Text style={{fontFamily: Fonts.fonts.PoppinsBold}}>{totalSteps}</Text>{' '}
            {translate('steps')}
          </Text>
          <Text style={Style.titleTextStyle}>{translate('newBusinessStep3')}</Text>
          <Text style={Style.innerTxt}>{translate('newBusinessStepDesc3')} </Text>
        </View>
        <CustomInputText
          style={Style.inputStyle}
          value={email}
          placeholder={translate('email')}
          keyboardType="email-address"
          onChangeText={this.onChangeEmail}
          onSubmitEditing={this.onPressSubmit}
        />
        <View>
          <ClickableText
            inputText={translate('next')}
            style={
              email.length === 0 || !validateEmail(email)
                ? Style.deactivateButtonContainer
                : Style.buttonContainer
            }
            textStyle={Style.buttonTextStyle}
            onPress={() => {
              Keyboard.dismiss()
              if (email.length === 0) {
                Alert.alert(translate('alert'), translate('enterValidEmail'))
              }
              const emailValid = validateEmail(email)
              if (!emailValid) {
                Alert.alert(translate('alert'), translate('enterValidEmail'))
                return
              }
              this.onPressNext()
            }}
            editable={email.length === 0 || !validateEmail(email)}
          />
        </View>
      </View>
    )
  }

  renderFifthScreen = () => {
    const {selectedImage, currentIndex} = this.state
    return (
      <View style={Style.container}>
        <View style={Style.headerContainer}>
          <Text style={Style.stepTextStyle}>
            <Text style={{fontFamily: Fonts.fonts.PoppinsBold}}>{currentIndex + 1}</Text>{' '}
            {translate('outOf')}{' '}
            <Text style={{fontFamily: Fonts.fonts.PoppinsBold}}>{totalSteps}</Text>{' '}
            {translate('steps')}
          </Text>
          <Text style={Style.titleTextStyle}>{translate('newBusinessStep4')}</Text>
          <Text style={Style.innerTxt}>{translate('newBusinessStepDesc4')} </Text>
        </View>

        <View style={Style.contentContainer}>
          <View style={Style.imagePickerButtonContainer}>
            <Image
              style={Style.selectedImageStyle}
              source={{uri: selectedImage ? selectedImage.path : null}}
            />
            <ValidationButton
              style={Style.imagePickerButton}
              textStyle={Style.uploadLaterButtonStyle}
              text={selectedImage ? '' : translate('tapToBrowse')}
              onPress={() => {
                this.openImagePicker()
              }}
            />
          </View>
        </View>
        <View style={Style.bottomContainer}>
          {/* <ClickableText
            inputText={translate('next')}
            style={selectedImage ? Style.buttonContainer : Style.deactivateButtonContainer}
            textStyle={Style.buttonTextStyle}
            onPress={() => {
              Keyboard.dismiss()
              this.uploadImage()
            }}
            editable={!selectedImage}
          />
          <ClickableText
            inputText={translate('uploadLaterText')}
            style={Style.textButtonContainer}
            textStyle={Style.uploadLaterTxt}
            onPress={this.onPressNext}
          /> */}

          <CustomButton
            primaryButtonStyle={
              selectedImage ? Style.buttonContainer : Style.deactivateButtonContainer
            }
            primaryButtonTextStyle={Style.buttonTextStyle}
            primaryButtonInputText={translate('next')}
            primaryButtonOnPress={() => {
              Keyboard.dismiss()
              this.uploadImage()
            }}
            primaryButtonEditable={!selectedImage}
            isSecondButton={true}
            secondaryButtonStyle={Style.textButtonContainer}
            secondaryButtonTextStyle={Style.uploadLaterTxt}
            secondaryButtonInputText={translate('uploadLaterText')}
            secondaryButtonOnPress={this.onPressNext}
          />
        </View>
      </View>
    )
  }

  renderSixthScreen = () => {
    const {instagramUserName, facebookUrl} = this.state

    return (
      <View style={Style.container}>
        <View style={Style.headerBigContainer}>
          <Text style={Style.stepTextStyle}>{translate('finalStep')}</Text>
          <Text style={Style.titleTextStyle}>{translate('newBusinessStep5')}</Text>
          <Text style={Style.innerTxt}>{translate('newBusinessStepDesc5')} </Text>
        </View>

        <View style={Style.stepSixContainer}>
          <CustomInputText
            style={Style.inputSocialStyle}
            value={instagramUserName}
            placeholder={translate('instagramUserName')}
            keyboardType="email-address"
            onChangeText={this.onChangeInstagramName}
            onSubmitEditing={this.onPressSubmit}
          />
          <CustomInputText
            style={Style.inputSocialStyle}
            value={facebookUrl}
            placeholder={translate('facebookUrl')}
            keyboardType="email-address"
            onChangeText={this.onChangeFacebookUrl}
            onSubmitEditing={this.onPressSubmit}
          />
        </View>
        <View style={Style.bottomContainer}>
          <Text style={Style.uploadLaterTxt}>{translate('socialRequire')}</Text>
          <ClickableText
            inputText={translate('next')}
            style={
              instagramUserName.length !== 0 || facebookUrl.length !== 0
                ? Style.buttonContainer
                : Style.deactivateButtonContainer
            }
            textStyle={Style.buttonTextStyle}
            onPress={this.onPressNext}
            editable={instagramUserName.length === 0 && facebookUrl.length === 0}
          />
        </View>
      </View>
    )
  }

  renderSeventhScreen = () => {
    return (
      <View style={[Style.container, Style.screenRocstarStyle]}>
        <View style={Style.container}>
          <View style={Style.containerImgItem}>
            <Image style={Style.rockstarImg} source={Images.rockstar} />
          </View>
          <View style={Style.containerItem}>
            <Text style={Style.titleTextStyle}>{translate('rockstarTitle')}</Text>
            <Text style={Style.rockstarDescText}>{translate('businessRockstarText')}</Text>
          </View>
          <View style={Style.bottomContainer}>
            <ClickableText
              inputText={translate('gotIt')}
              style={Style.buttonContainer}
              textStyle={Style.buttonTextStyle}
              onPress={this.onPressSave}
            />
          </View>
        </View>
      </View>
    )
  }

  render() {
    const {isLoading, currentIndex} = this.state
    return (
      <React.Fragment>
        {currentIndex < 6 ? (
          <View style={Style.customSliderContainer}>
            <LinearGradient
              colors={['#57A3E8', '#00DFBD']}
              start={{x: 1, y: 1}}
              end={{x: 0, y: 0}}
              style={[
                Style.customSliderStyle,
                {width: (Metrics.applyRatio(375) * (currentIndex + 1)) / totalSteps},
              ]}
            />
            <View style={Style.inactiveSlider} />
          </View>
        ) : (
          <View />
        )}

        {currentIndex < 6 ? (
          <TouchableOpacity
            style={[ApplicationStyles.backIcon, ApplicationStyles.backIconWrapper]}
            onPress={this.onPressLeftIcon}
            activeOpacity={1}>
            <Image source={Images.backIcon} style={ApplicationStyles.backIcon} />
          </TouchableOpacity>
        ) : (
          <View />
        )}
        <SafeAreaView style={Style.container}>
          {this.renderScreen()}
          <Spinner visible={isLoading} />
        </SafeAreaView>
      </React.Fragment>
    )
  }
}

BusinessSignUp.propTypes = {
  navigation: PropTypes.object.isRequired,
}
