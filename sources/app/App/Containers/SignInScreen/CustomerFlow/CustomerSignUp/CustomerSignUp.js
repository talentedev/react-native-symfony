import React, {Component} from 'react'
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  Keyboard,
  LayoutAnimation,
  NativeModules,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import {connect} from 'react-redux'
import {PropTypes} from 'prop-types'
import NavigationService from 'App/Services/NavigationService'
import ExampleActions from 'App/Stores/Example/Actions'
import Style from './CustomerSignUpStyle'
// import { Images } from 'App/Theme'
import {isInstagramUsernameValid, validateEmail} from 'App/Services/Validation'
import {translate} from 'App/Services/TranslationService'
// Components
import CustomInputText from 'App/Components/CustomInputText/CustomInputText'
import ValidationButton from 'App/Components/ValidationButton/ValidationButton'
// import { TagSelect } from 'react-native-tag-select'
// import DatePickerCom from 'App/Components/DatePickerCom/DatePickerCom'
import ClickableText from 'App/Components/ClickableText/ClickableText'
import DatePicker from 'react-native-datepicker'
import CategoryItemView from 'App/Components/CategoryItemView/CategoryItemView'
import {ApplicationStyles, Colors, Images, Metrics} from 'App/Theme'
import {UserService} from 'App/Services/GraphQL/UserService'
import {TokenService} from 'App/Services/AsyncStorage/TokenService'
import LinearGradient from 'react-native-linear-gradient'
import Fonts from 'App/Theme/Fonts'
import {CategoryService} from 'App/Services/GraphQL/CategoryService'
import Spinner from 'react-native-loading-spinner-overlay'
import TextWithBold from 'App/Components/TextWithBold/TextWithBold'

const {UIManager} = NativeModules

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true)

const totalSteps = 6

class CustomerSignUp extends Component {
  constructor(props) {
    super(props)
    const {navigation} = props
    const userDetail = navigation.getParam('userDetail', null)
    const indexToRedirect = navigation.getParam('indexToRedirect', null)
    const regionId = navigation.getParam('regionId', 1)
    console.log('reg', regionId)
    this.state = {
      currentIndex: indexToRedirect || 0,
      firstName: userDetail ? userDetail.firstName : '',
      lastName: userDetail ? userDetail.lastName : '',
      email: userDetail ? userDetail.email : '',
      userName: userDetail ? userDetail.userName : '',
      selectedGender: userDetail ? userDetail.selectedGender : '',
      activeNextBtn: false,
      showError: false,
      birthDay: userDetail ? userDetail.birthday : null,
      tagData: [],
      referrerName: '',
      isLoading: false,
      regionId: regionId,
    }
  }

  // Reference Method,
  // setFirstName = (element) => {
  //   this.firstNameRef = element
  // }
  //
  // setLastName = (element) => {
  //   this.lastNameRef = element
  // }
  //
  // setEmail = (element) => {
  //   this.emailRef = element
  // }
  //
  // setInstagram = (element) => {
  //   this.instagram = element
  // }

  componentDidMount() {
    this._fetchCategories()
  }

  _fetchCategories = () => {
    CategoryService.getCategories()
      .then((res) => {
        this.setState({tagData: res.data.categories.items})
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => {})
  }

  // onChangeText Method
  onChangeFirstName = (text) => {
    this.setState({
      firstName: text,
    })
  }

  onChangeLastName = (text) => {
    this.setState({
      lastName: text,
    })
  }

  onChangeEmail = (text) => {
    this.setState({
      email: text,
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

  // onSubmitText Method

  // Mics Method

  // onPress Method
  onPressLeftIcon = () => {
    const {currentIndex} = this.state
    const {navigation} = this.props
    const indexToRedirect = navigation.getParam('indexToRedirect', null)
    if (indexToRedirect && currentIndex === 5) {
      NavigationService.pop()
      return
    }
    if (currentIndex === 0) {
      NavigationService.pop()
      return
    }
    LayoutAnimation.easeInEaseOut()
    this.setState({
      currentIndex: currentIndex - 1,
    })
  }

  onPressSave = () => {
    NavigationService.navigateAndReset('CustomerMainScreen')
  }

  onPressSubmit = () => {
    Keyboard.dismiss()
    const {currentIndex, firstName, email, lastName, activeNextBtn} = this.state

    if (currentIndex === 0) {
      if (activeNextBtn) {
        this.onPressNext()
      }
    } else if (currentIndex === 1) {
      if (firstName.length > 0 && lastName.length > 0) {
        this.onPressNext()
      }
    } else if (currentIndex === 2) {
      if (email.length > 0 && validateEmail(email)) {
        this.onPressNext()
      }
    }
  }

  onPressNext = () => {
    Keyboard.dismiss()
    const {currentIndex, userName} = this.state
    if (currentIndex === 6) {
      NavigationService.navigateAndReset('CustomerMainScreen')
      NavigationService.push('CustomerSignUpLastStep', {
        userName: this.state.userName,
      })
    } else if (currentIndex === 5) {
      const {
        userName,
        firstName,
        lastName,
        email,
        birthDay,
        selectedGender,
        tagData,
        regionId,
      } = this.state
      const {navigation} = this.props
      const userDetail = navigation.getParam('userDetail', null)
      let categoryIds = []
      tagData.map((cat) => {
        if (cat.isSelected) {
          categoryIds.push(parseInt(cat.id))
        }
      })
      this.setState({isLoading: true})
      const profileImageUrl = userDetail ? userDetail.profilePicture : null

      TokenService.getSmsSignInData().then((smsSignInData) => {
        const token = smsSignInData.smsSignInToken
        UserService.customerSignUp(
          token,
          regionId,
          userName,
          firstName,
          lastName,
          email,
          birthDay,
          selectedGender,
          categoryIds,
          profileImageUrl,
        )
          .then((res) => {
            if (userDetail) {
              LayoutAnimation.easeInEaseOut()
              this.setState({
                currentIndex: currentIndex + 1,
                isLoading: false,
              })
            } else {
              LayoutAnimation.easeInEaseOut()
              this.setState({
                currentIndex: currentIndex + 1,
                isLoading: false,
              })
            }
          })
          .catch((err) => {
            console.log('Error', err.message)
            Alert.alert('Error', err.message)
            this.setState({
              isLoading: false,
            })
          })
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
      })
    }
  }

  //   uploadImage = () => {
  //     this.setState({isLoading: true, uploading: true}, () => {
  //       const {navigation} = this.props
  //       const userDetail = navigation.getParam('userDetail', null)
  //       const filePath = userDetail.profilePicture
  //       console.log('upload image => ', filePath)
  //       firebase
  //         .storage()
  //         .ref(`upload_files/customer/${this.state.userName}`)
  //         .putFile(filePath)
  //         .then((snapshot) => {
  //           const {currentIndex} = this.state
  //           if (snapshot.state === firebase.storage.TaskState.SUCCESS) {
  //             console.log('success => ', snapshot)
  //             this.setState({profileImageUrl: snapshot.downloadURL})
  //           }
  //           console.log('filePath', filePath)
  //           this.setState({uploading: false, isLoading: false}, () => {
  //             LayoutAnimation.easeInEaseOut()
  //             this.setState({
  //               currentIndex: currentIndex + 1,
  //             })
  //           })
  //         })
  //         .catch((err) => {
  //           this.setState({uploading: false, isLoading: false}, () => {
  //             setTimeout(() => {
  //               Alert.alert('Error', 'An error occurred while uploading file.')
  //               console.log('error => ', err)
  //             }, 100)
  //           })
  //         })
  //     })
  //   }

  catToggleSelect = (isSelected, id) => {
    let {tagData} = this.state
    let newTagData = tagData.map((el) => (el.id === id ? {...el, isSelected: isSelected} : el))
    this.setState({tagData: newTagData})
  }

  _keyExtractor = (item) => item.id.toString()
  _renderListItem = (categoryItem) => {
    return <CategoryItemView catItem={categoryItem} catToggleSelect={this.catToggleSelect} />
  }

  isSelectedCat = () => {
    let {tagData} = this.state
    let isSelectedItem = false
    tagData.map((el) => {
      if (el.isSelected === true) isSelectedItem = true
    })

    return isSelectedItem
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

      default:
        return null
    }
  }

  renderFirstScreen = () => {
    const {currentIndex, userName, activeNextBtn, showError} = this.state
    return (
      <View style={[Style.container, Style.screen1Style]}>
        <View>
          <Text style={Style.stepTextStyle}>
            <Text style={{fontFamily: Fonts.fonts.PoppinsBold}}>{currentIndex + 1}</Text>{' '}
            {translate('outOf')}{' '}
            <Text style={{fontFamily: Fonts.fonts.PoppinsBold}}>{totalSteps}</Text>{' '}
            {translate('steps')}
          </Text>
          <Text style={Style.titleTextStyle}>{translate('chooseName')}</Text>
          <Text style={Style.innerTxt}>{translate('customerSignDesc1')} </Text>
        </View>
        <View>
          <Text style={Style.subTitleStyle}>{translate('username')}</Text>
          <View style={Style.inputStyleWithIcon}>
            <Text style={Style.inputTextIcon}>{'@'}</Text>
            <CustomInputText
              style={[Style.container, Style.inputText]}
              multiline={false}
              placeholderTextColor={Colors.black2}
              value={userName}
              onChangeText={this.onChangeUserName}
              onSubmitEditing={this.onPressSubmit}
            />
          </View>
          <Text style={Style.errorTxt}>{showError ? translate('userNameError') : ''}</Text>
        </View>
        <ClickableText
          inputText={translate('next')}
          style={activeNextBtn ? Style.buttonContainer : Style.deactivateButtonContainer}
          textStyle={Style.buttonTextStyle}
          onPress={this.onPressNext}
          editable={!activeNextBtn}
        />
      </View>
    )
  }

  renderSecondScreen = () => {
    const {currentIndex, firstName, lastName} = this.state
    return (
      <View style={[Style.container, Style.screen1Style]}>
        <View>
          <Text style={Style.stepTextStyle}>
            <TextWithBold
              fullTxt={translate('outOfSteps', {step: currentIndex + 1, total: totalSteps})}
              boldTxtStyle={{fontFamily: Fonts.fonts.PoppinsBold}}
              boldTxtList={[currentIndex + 1, totalSteps]}
            />
          </Text>
          <Text style={Style.titleTextStyle}>{translate('tellUsYourName')}</Text>
          <Text style={Style.innerTxt}>{translate('customerSignDesc2')} </Text>
        </View>
        <View style={Style.screen1InputContainer}>
          <CustomInputText
            style={Style.screen1InputStyle}
            value={firstName}
            placeholder={translate('firstName')}
            onChangeText={this.onChangeFirstName}
            onSubmitEditing={this.onPressSubmit}
          />
          <CustomInputText
            style={Style.screen1InputStyle}
            value={lastName}
            placeholder={translate('lastName')}
            onChangeText={this.onChangeLastName}
            onSubmitEditing={this.onPressSubmit}
          />
        </View>
        <ClickableText
          inputText={translate('next')}
          style={
            firstName === '' || lastName === ''
              ? Style.deactivateButtonContainer
              : Style.buttonContainer
          }
          textStyle={Style.buttonTextStyle}
          onPress={this.onPressNext}
          editable={firstName === '' || lastName === ''}
        />
      </View>
    )
  }

  renderThirdScreen = () => {
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
          <Text style={Style.titleTextStyle}>{translate('whatIsYourEmail')}</Text>
          <Text style={Style.innerTxt}>{translate('customerSignDesc3')} </Text>
        </View>
        <CustomInputText
          style={Style.inputStyle}
          value={email}
          placeholder={translate('email')}
          keyboardType="email-address"
          onChangeText={this.onChangeEmail}
          onSubmitEditing={this.onPressSubmit}
        />
        <ClickableText
          inputText={translate('next')}
          style={
            email.length === 0 || !validateEmail(email)
              ? Style.deactivateButtonContainer
              : Style.buttonContainer
          }
          textStyle={Style.buttonTextStyle}
          onPress={() => {
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
    )
  }

  onChangeBirthDay = (date) => {
    this.setState({
      birthDay: date,
    })
  }

  renderFourthScreen = () => {
    const {currentIndex} = this.state
    return (
      <View style={[Style.container, Style.screen1Style]}>
        <View>
          <Text style={Style.stepTextStyle}>
            <Text style={{fontFamily: Fonts.fonts.PoppinsBold}}>{currentIndex + 1}</Text>{' '}
            {translate('outOf')}{' '}
            <Text style={{fontFamily: Fonts.fonts.PoppinsBold}}>{totalSteps}</Text>{' '}
            {translate('steps')}
          </Text>
          <Text style={Style.titleTextStyle}>{translate('whenIsYourBirthday')}</Text>
          <Text style={Style.innerTxt}>{translate('customerSignDesc4')} </Text>
        </View>
        <View>
          <Text style={Style.subTitleStyle}>{'Birthday'}</Text>
          <DatePicker
            style={Style.inputStyleWithoutFontStyle}
            mode="date"
            date={this.state.birthDay}
            format="MMMM D, YYYY"
            placeholder=" "
            onDateChange={this.onChangeBirthDay}
            showIcon={false}
            customStyles={{
              dateInput: Style.datePickerCustom,
            }}
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
          />
        </View>
        <ClickableText
          inputText={translate('next')}
          style={this.state.birthDay ? Style.buttonContainer : Style.deactivateButtonContainer}
          textStyle={Style.buttonTextStyle}
          onPress={this.onPressNext}
          editable={!this.state.birthDay}
        />
      </View>
    )
  }

  renderFifthScreen = () => {
    const {currentIndex, selectedGender} = this.state
    return (
      <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
        <View style={[Style.container, Style.screen1Style]}>
          <View>
            <Text style={Style.stepTextStyle}>
              <Text style={{fontFamily: Fonts.fonts.PoppinsBold}}>{currentIndex + 1}</Text>{' '}
              {translate('outOf')}{' '}
              <Text style={{fontFamily: Fonts.fonts.PoppinsBold}}>{totalSteps}</Text>{' '}
              {translate('steps')}
            </Text>
            <Text style={Style.titleTextStyle}>{translate('whatYourGender')}</Text>
            <Text style={Style.innerTxt}>{translate('customerSignDesc5')} </Text>
          </View>
          <View>
            <View style={Style.selectGenderContainer}>
              <TouchableOpacity onPress={() => this.setState({selectedGender: 'M'})}>
                <Image
                  style={Style.genderImg}
                  source={selectedGender === 'M' ? Images.maleActive : Images.maleInactive}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.setState({selectedGender: 'F'})}>
                <Image
                  style={Style.genderImg}
                  source={selectedGender === 'F' ? Images.femaleActive : Images.femaleInactive}
                />
              </TouchableOpacity>
            </View>
            <View style={Style.selectGenderContainer}>
              <ClickableText
                style={Style.genderSelectBtn}
                inputText={translate('man')}
                textStyle={selectedGender === 'M' ? Style.genderSelected : Style.genderSelect}
                onPress={() => this.setState({selectedGender: 'M'})}
              />
              <ClickableText
                style={Style.genderSelectBtn}
                inputText={translate('female')}
                textStyle={selectedGender === 'F' ? Style.genderSelected : Style.genderSelect}
                onPress={() => this.setState({selectedGender: 'F'})}
              />
            </View>
          </View>
          <ClickableText
            inputText={translate('next')}
            style={
              selectedGender === ''
                ? Style.deactivateButtonContainer
                : [Style.buttonContainer, {marginVertical: Metrics.applyRatio(20)}]
            }
            textStyle={Style.buttonTextStyle}
            onPress={this.onPressNext}
            editable={selectedGender === ''}
          />
        </View>
      </ScrollView>
    )
  }

  renderSixthScreen = () => {
    return (
      <View style={Style.flexOne}>
        <View style={Style.sixFirstView}>
          <Text style={Style.stepTextStyle}>{translate('finalStep')}</Text>
          <Text style={[Style.titleTextStyle, Style.finalScreenTitleStyle]}>
            {translate('selectCategoriesYouWantToSeePromotionsFrom')}
          </Text>
        </View>
        <View style={Style.betweenContainer}>
          {this.state.tagData.length > 0 ? (
            <FlatList
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              data={this.state.tagData}
              keyExtractor={this._keyExtractor}
              renderItem={this._renderListItem}
              numColumns={4}
            />
          ) : (
            <View>
              <ActivityIndicator size="large" color="#0000ff" />
            </View>
          )}
        </View>
        <View style={Style.centerContainer}>
          <ValidationButton
            text={translate('youCanSelectMoreLater')}
            style={Style.moreTagSelectButtonContainer}
            textStyle={[Style.validationButtonStyle, Style.mediumFont]}
            // onPress={this.onPressNext}
          />
          <ClickableText
            inputText={translate('finish')}
            style={
              this.isSelectedCat()
                ? Style.buttonContainerFinal
                : Style.deactivateButtonContainerFinal
            }
            textStyle={Style.buttonTextStyle}
            onPress={this.onPressNext}
            editable={!this.isSelectedCat()}
          />
        </View>
      </View>
    )
  }

  renderSeventhScreen = () => {
    return (
      <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
        <View style={[Style.container, Style.screenRocstarStyle]}>
          <View style={Style.containerItem}>
            <Image style={Style.rockstarImg} source={Images.rockstar} />
          </View>
          <View style={Style.containerItem}>
            <Text style={Style.titleTextStyle}>{translate('rockstarTitle')}</Text>
            <Text style={Style.rockstarDescText}>{translate('rockstarDesc')}</Text>
          </View>
          <ClickableText
            inputText={translate('redeemFriend')}
            style={Style.buttonContainer}
            textStyle={Style.buttonTextStyle}
            onPress={this.onPressNext}
          />
          <ClickableText
            inputText={translate('continueFeed')}
            textStyle={Style.validationButtonContainer}
            onPress={this.onPressSave}
          />
        </View>
      </ScrollView>
    )
  }

  render() {
    const {currentIndex, isLoading} = this.state

    return (
      <React.Fragment>
        <Spinner visible={isLoading} />

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

        {currentIndex !== 6 ? (
          <TouchableOpacity
            style={[ApplicationStyles.backIcon, ApplicationStyles.backIconWrapper]}
            onPress={this.onPressLeftIcon}
            activeOpacity={1}>
            <Image source={Images.backIcon} style={ApplicationStyles.backIcon} />
          </TouchableOpacity>
        ) : (
          <View />
        )}
        <SafeAreaView style={Style.container}>{this.renderScreen()}</SafeAreaView>
      </React.Fragment>
    )
  }
}

CustomerSignUp.propTypes = {
  navigation: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  user: state.example.user,
  userIsLoading: state.example.userIsLoading,
  userErrorMessage: state.example.userErrorMessage,
})

const mapDispatchToProps = (dispatch) => ({
  fetchUser: () => dispatch(ExampleActions.fetchUser()),
})

export default connect(mapStateToProps, mapDispatchToProps)(CustomerSignUp)
