import React from 'react'
import {Alert, Image, Text, TouchableOpacity, View} from 'react-native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import {PropTypes} from 'prop-types'
// Component
// import ClickableText from 'App/Components/ClickableText/ClickableText'
import CustomButton from 'App/Components/CustomButton/CustomButton'
import CustomInputText from 'App/Components/CustomInputText/CustomInputText'
// Other
import {translate} from 'App/Services/TranslationService'
import Style from 'App/Containers/BusinessEditProfile/General/GeneralStyle'
import {Colors, Fonts, Images, Metrics} from 'App/Theme'
import Spinner from 'react-native-loading-spinner-overlay'
import {CategoryService} from 'App/Services/GraphQL/CategoryService'
import {UserService} from 'App/Services/GraphQL/UserService'
import RNPickerSelect from 'react-native-picker-select'
import firebase from 'react-native-firebase'
import ImagePicker from 'react-native-image-crop-picker'
import StatusEnum from 'App/Enums/StatusEnum'

export default class General extends React.Component {
  constructor(props) {
    super(props)
    this._fetchBusiness()
    this.state = {
      business: null,
      businessName: '',
      profileImageUrl: null,
      category: {},
      cateLabel: '',
      subCategory: {},
      description: '',
      categories: [],
      subCategories: [],
      loading: true,
      status: null,
    }
  }
  setName = (text) => {
    this.setState({businessName: text}, () => {
      this.props.onBusinessChange('businessName', this.state.businessName)
    })
  }
  setCategory = (text) => {
    this.setState({category: text}, () => {
      if (this.state.category !== {}) {
        this._fetchSubCategory(text)
      }
      this.props.onBusinessChange('category', this.getCategoryByValue(this.state.category))
    })
  }
  setSubCategory = (text) => {
    this.setState({subCategory: text}, () =>
      this.props.onBusinessChange('subCategory', this.state.subCategory),
    )
  }
  setDesc = (text) => {
    this.setState({description: text}, () =>
      this.props.onBusinessChange('description', this.state.description),
    )
  }
  setProfileImage = () => {
    this.openImagePicker()
  }
  uploadImage = () => {
    this.setState({loading: true, uploading: true}, () => {
      // // Sometime Android gives us weird non-local uri, so we use path instead (only available on Android)
      // const fileUriOrPath = Platform.select({
      //   ios: this.state.selectedImage.uri,
      //   android: this.state.selectedImage.path,
      // })
      const filePath = this.state.profileImageUrl
      firebase
        .storage()
        .ref(`upload_files/business/${this.state.business.userName}`)
        .putFile(filePath)
        .then((snapshot) => {
          if (snapshot.state === firebase.storage.TaskState.SUCCESS) {
            this.setState(
              {profileImageUrl: snapshot.downloadURL},
              this.props.onBusinessChange('profileImageUrl', snapshot.downloadURL),
            )
          }
          this.setState({uploading: false, loading: false})
        })
        .catch((err) => {
          console.log('error => ', err)
          this.setState({uploading: false, loading: false})
          setTimeout(() => {
            Alert.alert('Error', 'An error occurred while uploading file.')
          }, 100)
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
        name: image.path.replace(/^.*[\\/]/, '') || this.state.business.userName + '.png',
        uri: image.path,
      }
      this.setState(
        {
          profileImageUrl: objImg.uri,
        },
        this.props.onBusinessChange('profileImageUrl', objImg.uri),
      )
      this.uploadImage()
    })
  }

  _fetchBusiness = () => {
    UserService.getBusinessUser().then((res) => {
      this.setState({
        business: res.data.businessUser,
        businessName: res.data.businessUser.businessName,
        profileImageUrl: res.data.businessUser.profileImageUrl,
        allCategories: [],
        cateLabel: res.data.businessUser.category.label,
        category: res.data.businessUser.category.subCategories,
        subCategory: res.data.businessUser.subCategory,
        description: res.data.businessUser.description,
        status: res.data.businessUser.status,
        loading: false,
        subCategories: [],
      })
    })
  }
  _fetchCategory = () => {
    CategoryService.getCategories().then((res) => {
      const itemData = []
      this.setState({allCategories: res.data.categories.items})
      res.data.categories.items.forEach((data) => {
        itemData.push({label: data.label, value: data.subCategories})
      })
      this.setState({categories: itemData})
    })
  }
  _fetchSubCategory = (category) => {
    const itemData = []
    category.items.forEach((data) => {
      itemData.push({label: data.label, value: data})
    })
    this.setState({subCategories: itemData})
  }
  getCategoryByValue(value) {
    const {allCategories} = this.state
    return allCategories.filter((catItem) => catItem.subCategories === value)
  }
  componentDidMount() {
    this._fetchBusiness()
    this._fetchCategory()
  }
  onPressSave = () => {
    this.props.allSave()
  }
  render() {
    const {status} = this.state
    return (
      <View style={Style.container}>
        <Spinner visible={this.state.loading} />
        <KeyboardAwareScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          scrollEnabled
          enableOnAndroid
          //   extraScrollHeight={Metrics.applyRatio(150)}
          keyboardShouldPersistTaps="handled">
          <View style={Style.centerView}>
            <View style={Style.profileView}>
              <Image
                style={Style.profileImage}
                source={{
                  uri: this.state.profileImageUrl ? this.state.profileImageUrl : null,
                }}
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
          <View style={Style.textView}>
            <CustomInputText
              style={Style.inputStyle}
              placeholder={translate('name')}
              value={this.state.businessName}
              onChangeText={this.setName}
              textColor={Colors.black1}
            />
            <Text style={Style.sectionTitle}>{translate('businessName')}</Text>
          </View>
          <View style={Style.textView}>
            {status ? (
              status === StatusEnum.REFUSED ? (
                <View style={Style.inputStyle}>
                  <RNPickerSelect
                    // Scroll List element
                    placeholder={{}}
                    items={this.state.categories}
                    onValueChange={(el) => this.setCategory(el)}
                    value={this.state.category}
                    useNativeAndroidPickerStyle={false}
                    style={{
                      inputAndroid: {
                        ...Fonts.style.textInput,
                        marginLeft: Metrics.applyRatio(-20),
                        marginTop: Metrics.applyRatio(5),
                      },
                      inputIOS: {
                        ...Fonts.style.textInput,
                        marginLeft: Metrics.applyRatio(-20),
                        marginTop: Metrics.applyRatio(5),
                      },
                    }}
                  />
                </View>
              ) : (
                <View style={Style.unEditableInputStyle}>
                  <Text style={Style.unEditableTextStyle}>{this.state.cateLabel}</Text>
                </View>
              )
            ) : (
              <View style={Style.unEditableInputStyle}>
                <Text style={Style.unEditableTextStyle}>{this.state.cateLabel}</Text>
              </View>
            )}

            <Text style={Style.sectionTitle}>{translate('category')}</Text>
          </View>
          <View style={Style.textView}>
            {status ? (
              status === StatusEnum.REFUSED ? (
                <View style={Style.inputStyle}>
                  <RNPickerSelect
                    // Scroll List element
                    placeholder={{}}
                    items={this.state.subCategories}
                    onValueChange={(el) => this.setSubCategory(el)}
                    value={this.state.subCategory}
                    useNativeAndroidPickerStyle={false}
                    style={{
                      inputAndroid: {
                        ...Fonts.style.textInput,
                        marginLeft: Metrics.applyRatio(-20),
                        marginTop: Metrics.applyRatio(5),
                      },
                      inputIOS: {
                        ...Fonts.style.textInput,
                        marginLeft: Metrics.applyRatio(-20),
                        marginTop: Metrics.applyRatio(5),
                      },
                    }}
                  />
                </View>
              ) : (
                <View style={Style.unEditableInputStyle}>
                  <Text style={Style.unEditableTextStyle}>{this.state.subCategory.label}</Text>
                </View>
              )
            ) : (
              <View style={Style.unEditableInputStyle}>
                <Text style={Style.unEditableTextStyle}>{this.state.subCategory.label}</Text>
              </View>
            )}
            <Text style={Style.sectionTitle}>{translate('subCategory')}</Text>
          </View>
          <View style={Style.highTextView}>
            <CustomInputText
              style={Style.highInputStyle}
              value={this.state.description}
              onChangeText={this.setDesc}
              placeholder={translate('desc')}
              multiline={true}
              textColor={Colors.black1}
            />
            <Text style={Style.sectionTitle}>{translate('desc')}</Text>
          </View>

          <View style={Style.bottomButton}>
            <CustomButton
              // areYouManuallyGivingPositionFromBottom={true}
              // buttonPositionFromBottom={0}
              primaryButtonInputText={
                status === StatusEnum.REFUSED ? translate('resubmit') : translate('save')
              }
              primaryButtonStyle={Style.buttonContainer}
              primaryButtonTextStyle={Style.buttonTextStyle}
              primaryButtonOnPress={this.onPressSave}
            />
          </View>
          {/* <ClickableText
            inputText={translate('save')}
            style={Style.buttonContainer}
            textStyle={Style.buttonTextStyle}
            onPress={this.onPressSave}
          /> */}
        </KeyboardAwareScrollView>
      </View>
    )
  }
}
General.propTypes = {
  onBusinessChange: PropTypes.func,
  allSave: PropTypes.func,
}
