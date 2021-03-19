import React from 'react'
import Style from 'App/Containers/CustomerMainScreen/CustomerProfile/CustomerEditProfileStyle'
import {Alert, Image, Keyboard, Text, TouchableOpacity, View} from 'react-native'
import {translate} from 'App/Services/TranslationService'
import CustomHeader from 'App/Components/CustomHeader'
import CustomInputText from 'App/Components/CustomInputText/CustomInputText'
import NavigationService from 'App/Services/NavigationService'
import {UserService} from 'App/Services/GraphQL/UserService'
import {Images, Metrics} from 'App/Theme'
import {isInstagramUsernameValid, validateEmail} from 'App/Services/Validation'
import CustomButton from 'App/Components/CustomButton/CustomButton'
import Moment from 'moment'
import ImagePicker from 'react-native-image-crop-picker'
import Spinner from 'react-native-loading-spinner-overlay'
import {CustomerService} from 'App/Services/GraphQL/CustomerService'
import firebase from 'react-native-firebase/dist'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import EventEmitter from 'App/Services/EventEmitter'
import {WhiteSpace} from '@ant-design/react-native'

class CustomerEditProfile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: '',
      username: '',
      firstname: '',
      lastname: '',
      bio: '',
      birthday: null,
      civility: null,
      email: '',
      profileImageUrl: null,
      instagramUserName: null,
      phoneNumber: '',
      spinner: true,
    }
    this._fetchUser()
  }

  _fetchUser = () => {
    UserService.getCustomerUser()
      .then((res) => {
        this.setState({
          user: res.data.customerUser,
          username: res.data.customerUser.userName,
          firstname: res.data.customerUser.firstname,
          lastname: res.data.customerUser.lastname,
          bio: res.data.customerUser.description,
          birthday: res.data.customerUser.birthDate,
          civility: res.data.customerUser.civility,
          email: res.data.customerUser.email,
          profileImageUrl: res.data.customerUser.profileImageUrl,
          phoneNumber: res.data.customerUser.phoneNumber,
          instagramUserName: res.data.customerUser.instagramId
            ? res.data.customerUser.instagramId
            : '',
        })
      })
      .finally(() => {
        this.setState({spinner: false})
      })
  }
  /** _setUsername = (username) => {
    this.setState({ username })
  }**/
  _setFirstName = (firstname) => {
    this.setState({firstname})
  }
  _setLastName = (lastname) => {
    this.setState({lastname})
  }
  /** _setBio = (bio) => {
    this.setState({ bio })
  }**/
  /** _setBirthday = (birthday) => {
    this.setState({ birthday })
  }**/
  /** _setGender = (civility) => {
    this.setState({ civility })
  }**/
  _setEmail = (email) => {
    this.setState({email})
  }
  _setProfileImage = () => {
    this.openImagePicker()
  }
  _setInstagramId = (instagramUserName) => {
    if (isInstagramUsernameValid(instagramUserName)) {
      this.setState({instagramUserName})
    }
    this.setState({})
  }
  _onPressSave = () => {
    this.setState({spinner: true}, () => {
      CustomerService.updateLoggedCustomer(
        this.state.firstname,
        this.state.lastname,
        this.state.email,
        this.state.profileImageUrl,
        this.state.instagramUserName === null ? '' : this.state.instagramUserName,
      ).then(() => {
        this.setState({spinner: false}, () => {
          EventEmitter.emitter.emit('refreshUser')
          NavigationService.popToTop()
        })
      })
    })
  }

  uploadImage = () => {
    this.setState({isLoading: true, uploading: true}, () => {
      // // Sometime Android gives us weird non-local uri, so we use path instead (only available on Android)
      // const fileUriOrPath = Platform.select({
      //   ios: this.state.selectedImage.uri,
      //   android: this.state.selectedImage.path,
      // })

      const filePath = this.state.profileImageUrl

      console.log('upload image => ', filePath)
      firebase
        .storage()
        .ref(`upload_files/customer/${this.state.username}`)
        .putFile(filePath)
        .then((snapshot) => {
          if (snapshot.state === firebase.storage.TaskState.SUCCESS) {
            console.log('success => ', snapshot)
            this.setState({profileImageUrl: snapshot.downloadURL})
          }
          console.log('filePath', filePath)
          this.setState({uploading: false, spinner: false})
        })
        .catch((err) => {
          this.setState({uploading: false, spinner: false}, () => {
            setTimeout(() => {
              Alert.alert('Error', 'An error occurred while uploading file.')
              console.log('error => ', err)
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
        name: image.path.replace(/^.*[\\/]/, '') || this.state.username + '.png',
        uri: image.path,
      }
      this.setState({
        profileImageUrl: objImg.uri,
      })
      this.uploadImage()
    })
  }

  render() {
    const {email} = this.state
    const {profileImageUrl} = this.state
    return (
      <View style={Style.container}>
        <CustomHeader leftComponent="back" title={translate('editProfile')} />
        <Spinner visible={this.state.spinner} />

        <KeyboardAwareScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          scrollEnabled
          enableOnAndroid
          extraScrollHeight={Metrics.applyRatio(200)}
          keyboardShouldPersistTaps="handled">
          <View style={Style.profileContainer}>
            <Image
              source={
                profileImageUrl
                  ? {
                      uri: profileImageUrl,
                    }
                  : this.state.civility === 'M'
                  ? Images.maleProfile
                  : Images.femaleProfile
              }
              style={Style.profileImage}
            />
            <View style={Style.pencilImage}>
              <TouchableOpacity onPress={() => this._setProfileImage()}>
                <Image
                  source={Images.pencilRoundButtonWhiteBorder}
                  style={{height: Metrics.applyRatio(29), width: Metrics.applyRatio(29)}}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View pointerEvents="none">
            <Text style={Style.placeHolder}>{translate('username')}</Text>
            <CustomInputText
              style={Style.inputStyle}
              placeholder={this.state.username}
              value={''}
              editable={false}
            />
          </View>
          <View style={Style.nameSpace}>
            <View>
              <Text style={Style.placeHolder}>{translate('firstName')}</Text>
              <CustomInputText
                style={Style.shortInputStyle}
                value={this.state.firstname}
                placeholder={translate('firstName')}
                onChangeText={this._setFirstName}
              />
            </View>
            <View>
              <Text style={Style.placeHolder}>{translate('surname')}</Text>
              <CustomInputText
                style={Style.shortInputStyle}
                value={this.state.lastname}
                placeholder={translate('surname')}
                onChangeText={this._setLastName}
              />
            </View>
          </View>
          <View>
            <Text style={Style.placeHolder}>{translate('email')}</Text>
            <CustomInputText
              style={Style.inputStyle}
              value={email}
              placeholder={translate('email')}
              onChangeText={this._setEmail}
              keyboardType={'email-address'}
            />
          </View>
          <View pointerEvents="none">
            <Text style={Style.placeHolder}>{translate('birthday')}</Text>
            <CustomInputText
              style={Style.inputStyle}
              value={''}
              placeholder={Moment(this.state.birthday, Moment.ISO_8601).format('LL')}
              editable={false}
            />
          </View>
          <View pointerEvents={'none'}>
            <Text style={Style.placeHolder}>{translate('gender')}</Text>
            <CustomInputText
              style={Style.inputStyle}
              value={''}
              placeholder={this.state.civility}
              editable={false}
            />
          </View>
          <View>
            <Text style={Style.placeHolder}>{translate('instagramUserName')}</Text>
            <CustomInputText
              style={Style.inputStyle}
              value={this.state.instagramUserName}
              placeholder={translate('instagramUserName')}
              onChangeText={this._setInstagramId}
            />
          </View>
          <CustomButton
            primaryButtonInputText={translate('save')}
            primaryButtonStyle={
              email.length === 0 || !validateEmail(email)
                ? Style.deactivateButtonContainer
                : Style.buttonContainer
            }
            primaryButtonTextStyle={Style.buttonTextStyle}
            primaryButtonOnPress={() => {
              Keyboard.dismiss()
              if (email.length === 0) {
                Alert.alert(translate('alert'), translate('enterValidEmail'))
              }
              const emailValid = validateEmail(email)
              if (!emailValid) {
                Alert.alert(translate('alert'), translate('enterValidEmail'))
                return
              }

              this._onPressSave()
            }}
            primaryButtonEditable={email.length === 0 || !validateEmail(email)}
          />
          <WhiteSpace size={'xl'} />
        </KeyboardAwareScrollView>
      </View>
    )
  }
}

export default CustomerEditProfile
