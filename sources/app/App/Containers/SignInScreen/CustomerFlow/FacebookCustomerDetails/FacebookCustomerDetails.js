import React from 'react'
import {Image, Alert, StatusBar, TouchableOpacity, View, Text} from 'react-native'
import {PropTypes} from 'prop-types'
import Style from './FacebookCustomerDetailsStyle'
import {ApplicationStyles, Colors, Images} from 'App/Theme'
import {translate} from 'App/Services/TranslationService'
import Metrics from 'App/Theme/Metrics'
import {isInstagramUsernameValid, validateEmail} from 'App/Services/Validation'
import ImagePicker from 'react-native-image-crop-picker'
import Spinner from 'react-native-loading-spinner-overlay'
import RNPickerSelect from 'react-native-picker-select'

// Components
import CustomInputText from 'App/Components/CustomInputText/CustomInputText'
import LinearGradient from 'react-native-linear-gradient'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import ClickableText from 'App/Components/ClickableText/ClickableText'
import DatePicker from 'react-native-datepicker'
import {UserService} from 'App/Services/GraphQL/UserService'
import NavigationService from 'App/Services/NavigationService'
import firebase from 'react-native-firebase/dist'

export default class FacebookCustomerDetails extends React.Component {
  constructor(props) {
    super(props)
    const {navigation} = props
    const userDetail = navigation.getParam('userDetail', null)
    const regionId = navigation.getParam('regionId', 1)
    this.state = {
      firstName: userDetail.firstName,
      lastName: userDetail.lastName,
      email: userDetail.email,
      userName: '',
      selectedGender: userDetail.gender,
      activeNextBtn: false,
      showError: null,
      isInfoCorrect: false,
      birthday: userDetail.birthday || '',
      profilePicture: userDetail.profilePicture,
      isLoading: false,
      uploading: false,
      isGalleryImage: false,
      regionId: regionId,
    }
  }
  componentDidMount() {}

  // onChangeTextMethod

  onChangeFirstName = (text) => {
    this.setState(
      {
        firstName: text,
      },
      () => {
        this.checkAllField()
      },
    )
  }

  onChangeLastName = (text) => {
    this.setState(
      {
        lastName: text,
      },
      () => {
        this.checkAllField()
      },
    )
  }

  onChangeEmail = (text) => {
    this.setState(
      {
        email: text,
      },
      () => {
        this.checkAllField()
      },
    )
  }

  onChangeUserName = (text) => {
    if (isInstagramUsernameValid(text)) {
      this.setState(
        {
          userName: text,
        },
        () => {
          this.checkAllField()
        },
      )
    }
  }
  onChangeBirthDay = (date) => {
    this.setState(
      {
        birthday: date || '',
      },
      () => {
        this.checkAllField()
      },
    )
  }
  onChangeGender = (gender) => {
    // console.log('gender => ', gender)
    if (gender !== undefined) {
      this.setState(
        {
          selectedGender: gender,
        },
        () => {
          this.checkAllField()
        },
      )
    } else {
      this.setState(
        {
          selectedGender: ' ',
        },
        () => {
          this.checkAllField()
        },
      )
    }
  }

  uploadImage = (filePath) => {
    this.setState({isLoading: true}, () => {
      firebase
        .storage()
        .ref(`upload_files/customer/${this.state.userName}___tmp.jpg`)
        .putFile(filePath)
        .then((snapshot) => {
          if (snapshot.state === firebase.storage.TaskState.SUCCESS) {
            this.setState({isLoading: false, profilePicture: snapshot.downloadURL}, () => {
              this._navigateToCustomerSignUpScreen()
            })
          } else {
            Alert.alert('Error', 'An error occurred while uploading file.')
            this.setState({isLoading: false})
          }
        })
        .catch((err) => {
          this.setState({isLoading: false}, () => {
            setTimeout(() => {
              Alert.alert('Error', 'An error occurred while uploading file.')
              console.log('error => ', err)
            }, 100)
          })
        })
    })
  }

  // onPressMethods :

  openImagePicker = () => {
    ImagePicker.openPicker({
      width: Metrics.UPLOAD_LOGO_SIZE,
      height: Metrics.UPLOAD_LOGO_SIZE,
      cropping: true,
    }).then((image) => {
      const objImg = {
        name:
          image.path.replace(/^.*[\\/]/, '') || this.state.firstName + this.state.lastName + '.png',
        uri: image.path,
      }
      this.setState({
        profilePicture: objImg.uri,
        isGalleryImage: true,
      })
    })
  }

  setInfoCorrect = () => {
    this.setState(
      (prevState) => ({
        isInfoCorrect: !prevState.isInfoCorrect,
      }),
      () => this.checkAllField(),
    )
  }

  setProfileImage = () => {
    this.openImagePicker()
  }

  onPressLeftIcon = () => {
    NavigationService.pop()
  }

  getAge = (dateString) => {
    var today = new Date()
    var birthDate = new Date(dateString)
    var age = today.getFullYear() - birthDate.getFullYear()
    var m = today.getMonth() - birthDate.getMonth()
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    return age
  }

  onClickNext = async () => {
    const {userName, birthday, profilePicture, isGalleryImage} = this.state
    const age = this.getAge(birthday)
    if (age >= 18) {
      this.setState({isLoading: true})
      UserService.isUsernameAvailable(userName)
        .then((res) => {
          if (res.data.userNameAvailable) {
            if (isGalleryImage) {
              this.uploadImage(profilePicture)
            } else {
              this.setState({isLoading: false}, () => {
                this._navigateToCustomerSignUpScreen()
              })
            }
          } else {
            this.setState({showError: true})
          }
        })
        .catch((err) => {
          Alert.alert(translate('errors.serverError'), translate('errors.pleaseRetryLater'))
          console.log(err.message)
        })
    } else {
      Alert.alert(translate('errors.error'), translate('lowerAgeMessage'))
    }
  }

  _navigateToCustomerSignUpScreen = () => {
    const {
      userName,
      firstName,
      lastName,
      birthday,
      selectedGender,
      profilePicture,
      email,
      regionId,
    } = this.state
    const userDetail = {
      firstName: firstName,
      lastName: lastName,
      userName: userName,
      birthday: birthday,
      selectedGender: selectedGender,
      profilePicture: profilePicture,
      email: email,
    }
    NavigationService.push('CustomerSignUpScreen', {
      indexToRedirect: 5,
      userDetail: userDetail,
      regionId: regionId,
    })
  }

  // MicsMethod

  checkAllField = () => {
    var isValid = true
    const {
      firstName,
      lastName,
      email,
      selectedGender,
      birthday,
      userName,
      isInfoCorrect,
    } = this.state
    const trimFname = firstName.trim()
    const trimLname = lastName.trim()
    const trimEmail = email.trim()
    const trimUsername = userName.trim()
    const trimGender = selectedGender.trim()
    const trimBDay = birthday.trim()
    if (trimUsername.length === 0) {
      isValid = false
    }
    if (!isInstagramUsernameValid(trimUsername)) {
      isValid = false
    }
    if (trimFname.length === 0) {
      isValid = false
    }
    if (trimLname.length === 0) {
      isValid = false
    }
    if (trimEmail.length === 0) {
      isValid = false
    }
    if (!validateEmail(trimEmail)) {
      isValid = false
    }
    if (trimBDay.length === 0) {
      isValid = false
    }
    if (trimGender.length === 0) {
      isValid = false
    }
    if (isInfoCorrect === false) {
      isValid = false
    }
    this.setState({
      activeNextBtn: isValid,
    })
  }

  // Render Method

  render() {
    const {
      userName,
      showError,
      isInfoCorrect,
      activeNextBtn,
      profilePicture,
      selectedGender,
    } = this.state
    const genderImage =
      selectedGender === ''
        ? Images.maleProfile
        : selectedGender === 'male'
        ? Images.maleProfile
        : Images.femaleProfile
    return (
      <React.Fragment>
        <StatusBar
          backgroundColor="transparent"
          barStyle="dark-content"
          hidden={false}
          translucent={true}
          networkActivityIndicatorVisible={true}
        />
        <Spinner visible={this.state.isLoading} />

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
          <KeyboardAwareScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            scrollEnabled
            enableOnAndroid
            //   extraScrollHeight={Metrics.applyRatio(150)}
            keyboardShouldPersistTaps="handled">
            <View style={Style.titleView}>
              <Text style={Style.titleDescText}>{translate('checkYourDetails')}</Text>
              <Text style={Style.subtitleDescText}>{translate('validateTheInformation')}</Text>
            </View>
            <View style={Style.centerView}>
              <View style={Style.profileView}>
                <Image
                  style={Style.profileImage}
                  source={profilePicture ? {uri: profilePicture} : genderImage}
                />

                <View style={Style.editView}>
                  <TouchableOpacity
                    onPress={() => {
                      this.setProfileImage()
                    }}>
                    <Image source={Images.pencilRoundButton} style={Style.pencilIcon} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={Style.viewTextInput}>
              <View>
                <Text style={Style.subTitleStyle}>{translate('username')}</Text>
                <View style={Style.inputStyleWithIcon}>
                  <Text style={Style.inputTextIcon}>{'@'}</Text>
                  <CustomInputText
                    style={[Style.container, Style.inputText]}
                    multiline={false}
                    placeholder={translate('username')}
                    placeholderTextColor={Colors.coolGrey}
                    value={userName}
                    onChangeText={this.onChangeUserName}
                    keyboardType="default"
                  />
                </View>
                <Text style={Style.canNotEditText}>{translate('youCanNotEditLater')}</Text>
                <Text style={Style.errorTxt}>{showError ? translate('userNameError') : ''}</Text>
              </View>
              <View style={Style.screen1InputContainer}>
                <View style={Style.textView}>
                  <CustomInputText
                    style={[Style.inputStyle, Style.screen1InputStyle]}
                    multiline={false}
                    placeholder={translate('firstName')}
                    value={this.state.firstName}
                    placeholderTextColor={Colors.coolGrey}
                    onChangeText={this.onChangeFirstName}
                    textColor={Colors.black1}
                    keyboardType="default"
                  />
                  <Text style={Style.sectionTitle}>{translate('firstName')}</Text>
                </View>
                <View style={Style.textView}>
                  <CustomInputText
                    style={[Style.inputStyle, Style.screen1InputStyle, Style.marginLeft]}
                    multiline={false}
                    placeholder={translate('surname')}
                    value={this.state.lastName}
                    placeholderTextColor={Colors.coolGrey}
                    onChangeText={this.onChangeLastName}
                    textColor={Colors.black1}
                    keyboardType="default"
                  />
                  <Text style={[Style.sectionTitle, Style.marginLeft]}>{translate('surname')}</Text>
                </View>
              </View>
              <View style={Style.textView}>
                <CustomInputText
                  style={Style.inputStyle}
                  multiline={false}
                  placeholder={translate('email')}
                  value={this.state.email}
                  placeholderTextColor={Colors.coolGrey}
                  onChangeText={this.onChangeEmail}
                  textColor={Colors.black1}
                  keyboardType="email-address"
                />
                <Text style={Style.sectionTitle}>{translate('email')}</Text>
              </View>
              <View>
                <Text style={Style.subTitleStyle}>{translate('birthday')}</Text>
                <DatePicker
                  style={Style.inputStyleWithoutFontStyle}
                  mode="date"
                  date={this.state.birthday}
                  format="MMMM D, YYYY"
                  onDateChange={this.onChangeBirthDay}
                  showIcon={false}
                  placeholder="Select your birthday"
                  placeholderTextColor={Colors.coolGrey}
                  customStyles={{
                    dateInput: Style.datePickerCustom,
                  }}
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                />
              </View>
              <View style={Style.textView}>
                <View style={[Style.inputStyle, Style.genderStyle]}>
                  <RNPickerSelect
                    placeholder={{
                      label: translate('selectGender'),
                    }}
                    placeholderTextColor={Colors.coolGrey}
                    textInputProps={{color: Colors.themeColor}}
                    onValueChange={(value) => this.onChangeGender(value)}
                    value={this.state.selectedGender}
                    items={[
                      {label: translate('male'), value: 'M'},
                      {label: translate('female'), value: 'F'},
                    ]}
                  />
                </View>
                <Text style={Style.sectionTitle}>{translate('gender')}</Text>
              </View>
            </View>
            <TouchableOpacity style={Style.checkBoxStyle} onPress={this.setInfoCorrect}>
              <Image
                source={isInfoCorrect ? Images.checkBox : Images.checkBoxOutline}
                style={{height: Metrics.applyRatio(18), width: Metrics.applyRatio(18)}}
              />
              <Text style={Style.checkBoxDescText}>{translate('theAboveInformation')}</Text>
            </TouchableOpacity>
            <View>
              <ClickableText
                inputText={translate('next')}
                onPress={this.onClickNext}
                style={activeNextBtn ? Style.buttonContainer : Style.deactivateButtonContainer}
                textStyle={Style.buttonTextStyle}
                editable={!activeNextBtn}
              />
            </View>
          </KeyboardAwareScrollView>
        </View>
      </React.Fragment>
    )
  }
}

FacebookCustomerDetails.propTypes = {
  navigation: PropTypes.object,
}
