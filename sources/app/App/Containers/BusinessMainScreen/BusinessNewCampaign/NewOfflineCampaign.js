import React from 'react'
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  LayoutAnimation,
  NativeModules,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import {PropTypes} from 'prop-types'
import RNPickerSelect from 'react-native-picker-select'
import Modal from 'react-native-modal'
import {Tooltip} from 'react-native-elements'
import Spinner from 'react-native-loading-spinner-overlay'
import Slider from '@react-native-community/slider'
// import CustomInputText from 'App/Components/CustomInputText/CustomInputText'
import ClickableText from 'App/Components/ClickableText/ClickableText'
import ImagePicker from 'react-native-image-crop-picker'
import ValidationButton from 'App/Components/ValidationButton/ValidationButton'

import {dateDiffInDays} from 'App/Services/Utils'
import {translate} from 'App/Services/TranslationService'
import NavigationService from 'App/Services/NavigationService'

import Style from './BusinessNewCampaignStyle'
import pickerSelectStyles from 'App/Containers/BusinessEditProfile/Location/pickerStyle'
import {ApplicationStyles, Colors, Fonts, Images, Metrics} from 'App/Theme'
import DatePicker from 'react-native-datepicker'

import PreviewPromotion from 'App/Components/PreviewPromotion/PreviewPromotion'
import Moment from 'moment'

import {UserService} from 'App/Services/GraphQL/UserService'
import {PromotionService} from 'App/Services/GraphQL/PromotionService'
import firebase from 'react-native-firebase'
import LinearGradient from 'react-native-linear-gradient'
import EventEmitter from 'App/Services/EventEmitter'
import TextWithBold from 'App/Components/TextWithBold/TextWithBold'

const {UIManager} = NativeModules

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true)

const totalSteps = 9

const MIN_TARGET_NUMBER = 10 // TODO: change it with db values
const MAX_TARGET_NUMBER = 1000

export default class NewOfflineCampaign extends React.Component {
  constructor(props) {
    super(props)
    let minDate = new Date()
    let tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1) // tomorrow
    let maxDate = new Date()
    maxDate.setMonth(maxDate.getMonth() + 5 * 12) // + 5 years
    const maxDays = dateDiffInDays(minDate, maxDate) + 1
    const daysArray = Array.from(
      {length: maxDays},
      (v, k) => (k + 1).toString() + ' ' + (k === 0 ? translate('day') : translate('days')),
    )
    const itemData = this.props.navigation.getParam('itemData', null)
    itemData
      ? (this.state = {
          itemData: itemData,
          uuid: itemData.uuid,
          currentIndex: 0,
          targetNumber: itemData.targetNumber,
          caption: itemData.caption,
          description: itemData.description,
          termsOfService: itemData.termsOfService,
          selectedImage: itemData.promoImageUrl,
          minDate: minDate,
          maxDate: maxDate,
          maxDays: maxDays,
          daysArray: daysArray,
          startDate: new Date(itemData.startDate),
          endDate: new Date(itemData.endDate),
          daysIndex: dateDiffInDays(new Date(), itemData.endDate),

          firstName: '',
          lastName: '',
          email: '',
          instagramId: '',
          isMaleSelected: true,
          avenirChecked: true,
          mountChecked: true,
          isApplyFirstRedeemer: !itemData.isReturningAllowed,
          isTerms: false,
          activeNextBtn: true,
          showAddLocationModal: false,
          passcode: '',
          isFullCode: true,

          business: null,
          businessCharge: 0,
          businessLocations: [],
          selectedLocations: [],
          loading: true,
          businessName: '',
          editId: null,
          district: null,
          location: null,
          locationCaption: null,
          districts: [],
          imageChanged: false,
          isSetEndDate: false,
          referrerShare: 0,
        })
      : (this.state = {
          itemData: null,
          uuid: null,
          currentIndex: 0,
          targetNumber: 10,
          caption: '',
          description: '',
          termsOfService: '',
          selectedImage: null,
          minDate: minDate,
          maxDate: maxDate,
          maxDays: maxDays,
          daysArray: daysArray,
          startDate: minDate,
          endDate: null,
          daysIndex: -1,

          firstName: '',
          lastName: '',
          email: '',
          instagramId: '',
          isMaleSelected: true,
          avenirChecked: true,
          mountChecked: true,
          isApplyFirstRedeemer: false,
          isTerms: false,
          activeNextBtn: true,
          showAddLocationModal: false,
          passcode: '',
          isFullCode: true,

          business: null,
          businessCharge: 0,
          businessLocations: [],
          selectedLocations: [],
          loading: true,
          businessName: '',
          editId: null,
          district: null,
          location: null,
          locationCaption: null,
          districts: [],
          imageChanged: true,
          isSetEndDate: false,
          referrerShare: 0,
        })

    this.stepNames = [
      translate('newCampaignStep1'),
      translate('newCampaignStep2'),
      translate('newOnlineCampaignStep4'),
      translate('newCampaignStep4'),
      translate('newCampaignStep5'),
      translate('newCampaignStep6'),
      translate('passcodeDetails'),
      translate('newCampaignStep8'),
      translate('newCampaignStep9'),
    ]
    this.stepDescription = [
      translate('newCampaignStepDesc1', {x: Number(this.state.businessCharge)}),
      translate('newCampaignStepDesc2'),
      translate('newCampaignStepDesc3'),
      translate('newCampaignStepDesc4'),
      translate('newCampaignStepDesc5'),
      translate('newCampaignStepDesc6'),
      translate('newCampaignStepDesc7'),
      translate('newCampaignStepDesc8'),
      translate('newCampaignStepDesc9'),
    ]
    this.setpDesWidth = [
      Metrics.applyRatio(296),
      Metrics.applyRatio(262),
      Metrics.applyRatio(324),
      Metrics.applyRatio(262),
      Metrics.applyRatio(262),
      Metrics.applyRatio(262),
      Metrics.applyRatio(296),
      Metrics.applyRatio(268),
      Metrics.applyRatio(296),
    ]
  }
  componentDidMount() {
    this._getBusinessInfo()
    this._fetchDistricts()
  }
  addAddressClick = () => {
    // console.log('addAddressClick ---------- on')
    this.setState({showAddLocationModal: false})
  }
  _onChangeDistrict = (text) => {
    this.setState({
      district: text,
    })
  }
  _onChangeLocationCaption = (text) => {
    this.setState({
      locationCaption: text,
    })
  }
  _onChangeLocation = (text) => {
    this.setState({
      location: text,
    })
  }
  addLocationClick = (district, locationCaption, location) => {
    const {businessLocations, selectedLocations} = this.state
    if (district && locationCaption && location) {
      const oldAddressData = businessLocations
      const resArray1 = oldAddressData.filter((res) => res.caption === locationCaption)
      const resArray2 = oldAddressData.filter((res) => res.address === location)
      // const resArray = oldAddressData.filter((res) => res.label === item.label && res.value === item.value)
      if (resArray1.length !== 0) {
        Alert.alert('', 'Caption already exist !')
        this.setState({addressLoading: false})
      } else if (resArray2.length !== 0) {
        Alert.alert('', 'Location already exist !')
        this.setState({addressLoading: false})
      } else {
        const obj = {}
        obj.uuid = (Math.random().toString(36) + '00000000000000000').slice(2, 18)
        obj.caption = locationCaption
        obj.district = district
        obj.address = location
        businessLocations.push(obj)
        selectedLocations.push(obj)

        this.setState(
          {
            addressLoading: false,
            showAddLocationModal: false,
            businessLocations: businessLocations,
            selectedLocations: selectedLocations,
            district: null,
            location: null,
            locationCaption: null,
            // addressLocation: item.label,
            // addressCaption: item.value,
          },
          () => {
            let activeIndex = true
            if (this.state.selectedLocations.length < 1) {
              activeIndex = false
            }
            this.setState({
              activeNextBtn: activeIndex,
            })
          },
        )
      }
    }
  }

  _fetchDistricts = () => {
    UserService.getAllDistricts().then((res) => {
      const districtArray = []
      res.data.districts.items.forEach((district) => {
        districtArray.push({label: district.name, value: district})
      })
      this.setState({
        districts: districtArray,
      })
    })
  }
  _getBusinessInfo = () => {
    UserService.getBusinessUser()
      .then((res) => {
        const business = res.data.businessUser
        this.setState(
          {
            business: business,
            businessName: business.businessName,
            passcode: business.passcode,
            businessCharge: business.offlinePromoPricing.charge,
            referrerShare: business.offlinePromoPricing.charge,
            businessLocations: business.businessLocations.items,
            selectedLocations: JSON.parse(JSON.stringify(business.businessLocations.items)),
          },
          () => {
            this.stepDescription[0] = translate('newCampaignStepDesc1', {
              x: Number(this.state.businessCharge),
            })
            this.state.itemData &&
              this.setState({selectedLocations: this.state.itemData.businessLocations})
            this.setState({loading: false})
          },
        )
      })
      .catch(() => {
        this.setState({loading: false})
        setTimeout(() => {
          Alert.alert(translate('errors.serverError'), translate('errors.pleaseRetryLater'))
        }, 100)
      })
  }

  // onChangeText Method
  onChangeCaption = (text) => {
    let activeIndex = true
    if (text === '' || text.length > 100 || this.state.description === '') {
      activeIndex = false
    }
    this.setState({
      caption: text,
      activeNextBtn: activeIndex,
    })
  }

  onChangeDescription = (text) => {
    let activeIndex = true
    if (text === '' || this.state.caption === '' || this.state.caption.length > 100) {
      activeIndex = false
    }
    this.setState({
      description: text,
      activeNextBtn: activeIndex,
    })
  }

  onChangeTermsOfService = (text) => {
    let activeIndex = true
    if (text === '') {
      activeIndex = false
    }
    this.setState({
      termsOfService: text,
      activeNextBtn: activeIndex,
    })
  }

  onChangeStartDate = (date) => {
    date = new Date(date)
    const daysIndex = dateDiffInDays(date, this.state.endDate)

    this.setState({
      startDate: date,
      daysIndex: daysIndex,
      activeNextBtn: this.state.isSetEndDate ? daysIndex >= 0 : true,
    })
  }
  onChangeEndDate = (date) => {
    date = new Date(date)
    const daysIndex = dateDiffInDays(this.state.startDate, date)
    if (daysIndex >= 0) {
      this.setState({
        endDate: date,
        daysIndex: daysIndex,
        activeNextBtn: true,
      })
    }
  }

  openImagePicker = () => {
    ImagePicker.openPicker({
      width: Metrics.UPLOAD_IMAGE_WIDTH,
      height: Metrics.UPLOAD_IMAGE_HEIGHT,
      cropping: true,
    })
      .then((image) => {
        const objImg = {
          name: image.path.replace(/^.*[\\/]/, '') || this.state.userName + '.png',
          uri: image.path,
        }

        let activeIndex = true
        if (!image) {
          activeIndex = false
        }
        this.setState({
          selectedImage: objImg.uri,
          activeNextBtn: activeIndex,
          imageChanged: true,
        })
      })
      .catch((e) => {
        console.log(e)
      })
  }
  uploadImage = () => {
    this.state.imageChanged
      ? this.setState({loading: true, uploading: true}, () => {
          // // Sometime Android gives us weird non-local uri, so we use path instead (only available on Android)
          // const fileUriOrPath = Platform.select({
          //   ios: this.state.selectedImage.uri,
          //   android: this.state.selectedImage.path,
          // })
          const filePath = this.state.selectedImage
          firebase
            .storage()
            .ref(
              `upload_files/promotion/${(Math.random().toString(36) + '00000000000000000').slice(
                2,
                18,
              )}`,
            )
            .putFile(filePath)
            .then((snapshot) => {
              if (snapshot.state === firebase.storage.TaskState.SUCCESS) {
                console.log('success => ', snapshot)
                this.setState({selectedImage: snapshot.downloadURL}, () => {
                  this.onEditCampaign()
                })
              }
              console.log('filePath', filePath)
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
      : this.onEditCampaign()
  }
  // onPress Method
  onPressLeftIcon = () => {
    const {currentIndex} = this.state
    if (currentIndex === 0) {
      NavigationService.pop()
      return
    }
    LayoutAnimation.easeInEaseOut()

    let activeIndex = true
    if (currentIndex - 1 < 1) {
      if (this.state.targetNumber < MIN_TARGET_NUMBER) {
        activeIndex = false
      }
    } else if (currentIndex - 1 === 1) {
      if (this.state.caption === '' || this.state.description === '') {
        activeIndex = false
      }
    } else if (currentIndex - 1 === 2) {
      if (this.state.termsOfService !== '') {
        activeIndex = false
      }
    } else if (currentIndex - 1 === 3) {
      if (this.state.selectedImage === null) {
        activeIndex = false
      }
    } else if (currentIndex - 1 === 4) {
      if (this.state.isSetEndDate) {
        if (this.state.daysIndex < 0) activeIndex = false
      }
    } else if (currentIndex - 1 === 5) {
      if (this.state.businessLocations.length < 0) {
        activeIndex = false
      }
    } else if (currentIndex - 1 === 6) {
      if (this.state.passcode === '') {
        activeIndex = false
      }
    }

    this.setState({
      currentIndex: currentIndex - 1,
      activeNextBtn: activeIndex,
    })
  }

  onPressNext = () => {
    const {currentIndex} = this.state
    if (currentIndex === totalSteps - 1) {
      return
    }
    LayoutAnimation.easeInEaseOut()

    let activeIndex = false
    if (currentIndex + 1 < 1) {
      if (this.state.targetNumber >= MIN_TARGET_NUMBER) {
        activeIndex = true
      }
    } else if (currentIndex + 1 === 1) {
      if (this.state.caption !== '' && this.state.description !== '') {
        activeIndex = true
      }
    } else if (currentIndex + 1 === 2) {
      if (this.state.termsOfService !== '') {
        activeIndex = true
      }
    } else if (currentIndex + 1 === 3) {
      if (this.state.selectedImage !== null) {
        activeIndex = true
      }
    } else if (currentIndex + 1 === 4) {
      if (this.state.isSetEndDate) {
        if (this.state.daysIndex >= 0) {
          activeIndex = true
        }
      } else {
        activeIndex = true
      }
    } else if (currentIndex + 1 === 5) {
      if (this.state.businessLocations.length > 0) {
        activeIndex = true
      }
    } else if (currentIndex + 1 === 6) {
      if (this.state.passcode !== '') {
        activeIndex = true
      }
    } else if (currentIndex + 1 === 7) {
      activeIndex = true
    } else if (currentIndex + 1 === 8) {
      if (this.state.isTerms) {
        activeIndex = true
      }
    }
    this.setState({
      currentIndex: currentIndex + 1,
      activeNextBtn: activeIndex,
    })
  }

  onEditCampaign = () => {
    PromotionService.createOrUpdateOfflinePromotion(
      this.state.uuid,
      this.state.targetNumber,
      this.state.caption,
      this.state.description,
      this.state.termsOfService,
      this.state.selectedImage,
      this.state.startDate,
      this.state.endDate,
      this.state.passcode,
      this.state.selectedLocations,
      !this.state.isApplyFirstRedeemer, // isReturningAllowed
    ).then(() => {
      EventEmitter.emitter.emit('refreshCampaignsAndNavigateToPending')
      NavigationService.popToTop()
    })
  }
  onEditPromotion = () => {
    LayoutAnimation.easeInEaseOut()
    this.setState({currentIndex: 0})
  }

  _keyExtractor = (item) => item.uuid.toString()
  _renderLocationListItem = (locationItem) => {
    return (
      <TouchableOpacity
        onPress={() => {
          this.removeLocation(locationItem.item)
        }}>
        <View style={Style.targetLocationItem}>
          <Text style={Style.addLocationItemTxt}>{locationItem.item.caption}</Text>
          <Image
            source={Images.checkCircle}
            style={[Style.chekIcon, this.isSelected(locationItem.item) ? '' : Style.uncheckIcon]}
          />
        </View>
      </TouchableOpacity>
    )
  }
  isSelected(locationItem) {
    const result = this.state.selectedLocations.filter((item) => item.uuid === locationItem.uuid)
    return result.length !== 0
  }
  removeLocation(locationItem) {
    const updatedLocation = this.isSelected(locationItem)
      ? this.state.selectedLocations.filter((item) => item.uuid !== locationItem.uuid)
      : this.state.selectedLocations.concat(
          this.state.businessLocations.filter((item) => item.uuid === locationItem.uuid),
        )
    this.setState(
      {
        selectedLocations: updatedLocation,
      },
      () => {
        let activeIndex = true
        if (this.state.selectedLocations.length < 1) {
          activeIndex = false
        }
        this.setState({
          activeNextBtn: activeIndex,
        })
      },
    )
  }
  showLocationModal = () => {
    this.setState({
      showAddLocationModal: true,
    })
  }
  addLocation = (locationItem) => {
    let {businessLocations} = this.state

    this.setState({
      businessLocations: businessLocations.concat(locationItem),
      showAddLocationModal: false,
      activeNextBtn: true,
    })
  }
  // render Method
  renderScreen = () => {
    const {currentIndex, businessLocations} = this.state
    switch (currentIndex) {
      case 0:
        return this.renderScreen1()

      case 1:
        return this.renderScreen2()

      case 2:
        return this.renderScreen3()

      case 3:
        return this.renderScreen4()

      case 4:
        return this.renderScreen5()

      case 5:
        return this.renderScreen6(businessLocations)

      case 6:
        return this.renderScreen7()

      case 7:
        return this.renderScreen8()

      case 8:
        return this.renderScreen9()

      default:
        return null
    }
  }

  renderScreen1 = () => {
    const {targetNumber, businessCharge} = this.state

    return (
      <React.Fragment>
        <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
          <Text style={Style.bigText}>${businessCharge * targetNumber}</Text>
          <View style={ApplicationStyles.screen.inline}>
            <Text style={Style.text}>{translate('totalBudget')} </Text>
          </View>
          <View style={Style.sliderWrapper}>
            <Slider
              style={Style.sliderSection}
              minimumValue={MIN_TARGET_NUMBER} // TODO: it will depend on the business
              maximumValue={MAX_TARGET_NUMBER}
              thumbTintColor={Colors.blueValidation}
              minimumTrackTintColor={Colors.blueValidation}
              // maximumTrackTintColor="#000000"
              value={targetNumber > 0 ? targetNumber : 0}
              step={5}
              onValueChange={(targetNumber) =>
                this.setState({targetNumber: targetNumber, activeNextBtn: true})
              }
            />
            <View style={Style.sliderWrapper}>
              <View style={Style.angleIcon} />
              <View style={Style.inputWrapper}>
                <TextInput
                  style={Style.numberInputStyle}
                  keyboardType="number-pad"
                  value={targetNumber > 0 ? targetNumber.toString() : ''}
                  onChangeText={(value) => {
                    let cleanValue = parseInt(value, 10)
                    let activeIndex = true
                    // cleanValue = Math.max(MIN_TARGET_NUMBER, cleanValue)
                    cleanValue = Math.min(cleanValue, MAX_TARGET_NUMBER)
                    if (value === '') {
                      activeIndex = false
                      cleanValue = 0
                    }
                    if (cleanValue < MIN_TARGET_NUMBER) activeIndex = false
                    this.setState({targetNumber: cleanValue, activeNextBtn: activeIndex})
                  }}
                />
                <Text style={Style.salesNum}>{translate('sales')}</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </React.Fragment>
    )
  }

  renderScreen2 = () => {
    const {caption, description} = this.state
    return (
      <React.Fragment>
        <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
          <View style={Style.sliderWrapper}>
            <View>
              <TextInput
                style={Style.inputStyle}
                placeholderTextColor={Colors.coolGrey}
                value={caption}
                placeholder={translate('placeCaption')}
                onChangeText={this.onChangeCaption}
              />
              <Text style={Style.captionEg}>{translate('captionExample')}</Text>
            </View>
            <View>
              <TextInput
                style={Style.multilineDescInputStyle}
                value={description}
                placeholder={translate('promotionDescription')}
                onChangeText={this.onChangeDescription}
                multiline={true}
                numberOfLines={8}
                placeholderTextColor={Colors.coolGrey}
              />
            </View>
          </View>
        </ScrollView>
      </React.Fragment>
    )
  }

  renderScreen3 = () => {
    const {termsOfService} = this.state
    return (
      <React.Fragment>
        <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
          <View style={Style.sliderWrapper}>
            <View style={Style.templateBtnContainer}>
              <Image style={Style.templateIcon} source={Images.template} />
              <ClickableText
                textStyle={Style.selectTemplate}
                inputText={translate('selectPresetTemplate')}
                onPress={() => Alert.alert('INFO', 'select template')}
              />
            </View>
            <TextInput
              style={Style.multilineInputStyle}
              value={termsOfService}
              placeholder={translate('promotionTermsAndService')}
              onChangeText={this.onChangeTermsOfService}
              multiline={true}
              numberOfLines={12}
              placeholderTextColor={Colors.coolGrey}
            />
            <Text />
          </View>
        </ScrollView>
      </React.Fragment>
    )
  }

  renderScreen4 = () => {
    const {selectedImage} = this.state
    return (
      <React.Fragment>
        <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
          <View style={Style.sliderWrapper}>
            <View style={Style.imagePickerButtonContainer}>
              <Image style={Style.selectedImageStyle} source={{uri: selectedImage || null}} />
              <ValidationButton
                style={Style.imagePickerButton}
                textStyle={[
                  Style.validationText,
                  {color: Colors.grey, fontFamily: Fonts.fonts.PoppinsRegular},
                ]}
                text={selectedImage ? '' : translate('tapToBrowse')}
                onPress={() => {
                  this.openImagePicker()
                }}
              />
            </View>
            <Text style={Style.text}>{translate('min334x200')}</Text>
          </View>
        </ScrollView>
      </React.Fragment>
    )
  }

  renderScreen5 = () => {
    const {minDate, maxDate} = this.state
    return (
      <React.Fragment>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={Style.sliderWrapper}>
          <View style={Style.codeCellContainer}>
            <View style={Style.datePickerItem}>
              <Text style={Style.datePickerTxt}>{translate('startDate')}</Text>
              <DatePicker
                minDate={minDate}
                maxDate={maxDate}
                style={Style.datePicker}
                mode="date"
                date={this.state.startDate}
                format="MMMM D, YYYY"
                onDateChange={this.onChangeStartDate}
                showIcon={false}
                customStyles={{
                  dateInput: Style.datePickerCustom,
                }}
                confirmBtnText={translate('confirm')}
                cancelBtnText={translate('cancel')}
              />
            </View>
            <View style={[Style.checkoutList, {paddingBottom: Metrics.applyRatio(20)}]}>
              <TouchableOpacity
                style={{marginLeft: Metrics.applyRatio(8), marginRight: Metrics.applyRatio(11)}}
                onPress={() => {
                  const newValue = !this.state.isSetEndDate
                  let activeIndex = true
                  if (newValue && this.state.daysIndex < 0) {
                    activeIndex = false
                  }
                  let endDate = newValue ? this.state.endDate : null
                  this.setState({
                    isSetEndDate: newValue,
                    activeNextBtn: activeIndex,
                    endDate: endDate,
                  })
                }}>
                <Image
                  source={this.state.isSetEndDate ? Images.checkBox : Images.checkBoxOutline}
                  style={{height: Metrics.applyRatio(18), width: Metrics.applyRatio(18)}}
                />
              </TouchableOpacity>
              <Text style={Style.flexOneText}>{translate('setEndDate')}</Text>
            </View>
            {this.state.isSetEndDate ? (
              <View style={Style.datePickerItem}>
                <Text style={Style.datePickerTxt}>{translate('endDate')}</Text>
                <DatePicker
                  minDate={minDate}
                  maxDate={maxDate}
                  style={Style.datePicker}
                  mode="date"
                  date={this.state.endDate}
                  format="MMMM D, YYYY"
                  onDateChange={this.onChangeEndDate}
                  showIcon={false}
                  customStyles={{
                    dateInput: Style.datePickerCustom,
                  }}
                  confirmBtnText={translate('confirm')}
                  cancelBtnText={translate('cancel')}
                />
              </View>
            ) : (
              <View />
            )}
          </View>
        </ScrollView>
      </React.Fragment>
    )
  }

  renderScreen6 = (businessLocations) => {
    let {districts} = this.state
    return (
      <React.Fragment>
        <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
          <View style={Style.flexOne}>
            <View style={Style.locationListItem}>
              {businessLocations.length > 0 ? (
                <FlatList
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={false}
                  data={businessLocations}
                  extraData={this.state}
                  keyExtractor={this._keyExtractor}
                  renderItem={this._renderLocationListItem}
                />
              ) : (
                <View />
              )}

              <Modal
                isVisible={this.state.showAddLocationModal}
                onBackdropPress={this.addAddressClick}
                swipeDirection="left"
                avoidKeyboard={true}
                style={Style.modalContainer}>
                <View>
                  <View style={Style.modalContent}>
                    <View style={Style.modalTopDash} />
                    <View style={Style.titleContainer}>
                      <Text style={Style.addLocationTitle}>{translate('addNewLocation')}</Text>
                    </View>
                    <ScrollView>
                      <View style={Style.modalListItem}>
                        <RNPickerSelect
                          // Scroll List element
                          placeholder={{
                            label: translate('branchOrDisrict'),
                            value: null,
                            color: Colors.blueyGrey,
                          }}
                          style={{
                            ...pickerSelectStyles,
                            iconContainer: {
                              top: 20,
                              right: 10,
                            },
                          }}
                          Icon={() => {
                            return <View style={Style.pickerIcon} />
                          }}
                          items={districts}
                          value={this.state.district ? this.state.district : ''}
                          onValueChange={this._onChangeDistrict}
                        />
                      </View>
                      <View style={Style.modalListItem}>
                        {/* Step 2 */}
                        <TextInput
                          // Caption Value
                          style={Style.locationValue}
                          // changes textInput if selectedLocation is filled
                          value={this.state.locationCaption ? this.state.locationCaption : ''}
                          onChangeText={this._onChangeLocationCaption}
                          placeholder="Caption Here"
                          placeholderTextColor={Colors.coolGrey}
                        />
                      </View>
                      <View style={Style.modalListItem}>
                        {/* Step 3 */}
                        <TextInput
                          // Location Value
                          style={Style.locationValue}
                          // changes textInput if selectedLocation is filled
                          value={this.state.location ? this.state.location : ''}
                          onChangeText={this._onChangeLocation}
                          placeholder="Location Here"
                          placeholderTextColor={Colors.coolGrey}
                        />
                      </View>
                      <TouchableOpacity
                        style={[
                          Style.validationButton,
                          this.state.district && this.state.locationCaption && this.state.location
                            ? ''
                            : Style.inactiveButton,
                        ]}
                        onPress={() => {
                          this.setState({addressLoading: true}, () =>
                            this.addLocationClick(
                              this.state.district,
                              this.state.locationCaption,
                              this.state.location,
                            ),
                          )
                        }}
                        activeOpacity={1}
                        disabled={
                          !(
                            this.state.districts &&
                            this.state.locationCaption &&
                            this.state.location
                          ) || this.state.addressLoading
                        }>
                        {this.state.addressLoading ? (
                          <ActivityIndicator color={Colors.white} />
                        ) : (
                          <Text style={Style.validationText}>{translate('addAddress')}</Text>
                        )}
                      </TouchableOpacity>
                    </ScrollView>
                  </View>
                </View>
              </Modal>
            </View>
          </View>
        </ScrollView>
      </React.Fragment>
    )
  }

  renderScreen7 = () => {
    return (
      <React.Fragment>
        <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
          <View style={Style.passCodeInputContainer}>
            <Image style={Style.promoPasscodeImg} source={Images.promoPasscode} />
            <View style={Style.passCodeBottomTextContainer}>
              <Text style={Style.passCodeBottomText}>
                {translate('passCodeDesc1') + ' '}
                <Text style={{fontFamily: Fonts.fonts.PoppinsBold}}>{translate('menu')}</Text>
              </Text>
              <Text style={Style.bottomIconTxt}>{'🚨'}</Text>
              <Text style={Style.bottomDescTxt}>{translate('passCodeBottomTxt')}</Text>
            </View>
          </View>
        </ScrollView>
      </React.Fragment>
    )
  }

  renderScreen8 = () => {
    return (
      <React.Fragment>
        <PreviewPromotion promotionData={this.state} />
      </React.Fragment>
    )
  }

  renderScreen9 = () => {
    let {targetNumber} = this.state
    return (
      <React.Fragment>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          style={Style.scrollContainer}>
          <View style={Style.campaignDetail}>
            <View style={Style.campaignTextDetail}>
              <Text style={[Style.finalText, Style.listBottomSection]}>
                {translate('runningCampaign')}{' '}
              </Text>
              <Text style={[Style.nameTxt, Style.listBottomSection]}>
                {this.state.endDate
                  ? `${Moment(this.state.endDate).format('D MMM')} (${
                      this.state.daysIndex
                    } ${translate('days')}) `
                  : translate('targetReached')}
              </Text>
              <Text style={[Style.finalText, Style.listBottomSection]}>
                {translate('withTarget')}{' '}
              </Text>
              <Text style={[Style.nameTxt, Style.listBottomSection]}>
                {' '}
                {`${targetNumber} ${translate('people')}`}
              </Text>
            </View>
            <TouchableOpacity style={Style.editCampaignBtn} onPress={this.onEditPromotion}>
              <Image style={Style.editCampaignImg} source={Images.pencilRoundButtonWhiteBorder} />
            </TouchableOpacity>
          </View>
          <View style={Style.waveIconContainer}>
            <Image style={Style.waveIcon} source={Images.separator} />
          </View>
          <View style={Style.bodyFooterSection}>
            <View>
              <Text style={[Style.bigText, {fontFamily: Fonts.fonts.PoppinsMedium}]}>
                {'$0 - $' + this.state.businessCharge * targetNumber}
              </Text>
              <Text />
              <Text style={[Style.text, {fontSize: Fonts.size.medium}]}>
                {translate('creditDeduct') + ' '}
                <Text style={[Style.text, {color: Colors.black, fontSize: Fonts.size.medium}]}>
                  {'$100'}
                </Text>
              </Text>
            </View>
            <View style={[Style.checkoutList, Style.checkoutListFirstItem]}>
              <TouchableOpacity
                style={{margin: Metrics.applyRatio(8)}}
                onPress={() => {
                  const newValue = !this.state.isApplyFirstRedeemer
                  this.setState({isApplyFirstRedeemer: newValue})
                }}>
                <Image
                  source={
                    this.state.isApplyFirstRedeemer ? Images.checkBox : Images.checkBoxOutline
                  }
                  style={{height: Metrics.applyRatio(18), width: Metrics.applyRatio(18)}}
                />
              </TouchableOpacity>
              <Text style={Style.flexOneText}> {translate('firstTimeRedeemer')}</Text>
              <View
                style={{marginLeft: Metrics.applyRatio(-50), marginRight: Metrics.applyRatio(30)}}>
                <Tooltip
                  backgroundColor={Colors.blueyGrey}
                  height={Metrics.applyRatio(120)}
                  width={Metrics.applyRatio(180)}
                  popover={<Text style={Style.toolTipText}>{translate('tooltip')}</Text>}>
                  <Image
                    source={Images.questionIcon}
                    style={Style.iconSize}
                    // color={this._getIconColor()}
                  />
                </Tooltip>
              </View>
            </View>
            <View style={Style.checkoutList}>
              <TouchableOpacity
                style={{marginLeft: Metrics.applyRatio(8), marginRight: Metrics.applyRatio(11)}}
                onPress={() => {
                  const newValue = !this.state.isTerms
                  this.setState({isTerms: newValue, activeNextBtn: newValue === true})
                }}>
                <Image
                  source={this.state.isTerms ? Images.checkBox : Images.checkBoxOutline}
                  style={{height: Metrics.applyRatio(18), width: Metrics.applyRatio(18)}}
                />
              </TouchableOpacity>
              <Text style={Style.flexOneText}>
                <TextWithBold
                  fullTxt={translate('termsAndCondition', {
                    TOS: translate('TOS'),
                  })}
                  boldTxtStyle={Style.link}
                  boldTxtList={[translate('TOS')]}
                />
              </Text>
            </View>
          </View>
        </ScrollView>
      </React.Fragment>
    )
  }

  render() {
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
        <Spinner visible={this.state.loading} />
        <View style={Style.customSliderContainer}>
          <LinearGradient
            colors={['#57A3E8', '#00DFBD']}
            start={{x: 1, y: 1}}
            end={{x: 0, y: 0}}
            style={[
              Style.customSliderStyle,
              {width: (Metrics.applyRatio(375) * (this.state.currentIndex + 1)) / totalSteps},
            ]}
          />
          <View style={Style.inactiveSlider} />
        </View>
        <TouchableOpacity
          style={[ApplicationStyles.backIcon, ApplicationStyles.backIconWrapper]}
          onPress={this.onPressLeftIcon}
          activeOpacity={1}>
          <Image source={Images.backIcon} style={ApplicationStyles.backIcon} />
        </TouchableOpacity>
        <SafeAreaView style={Style.stepContainer}>
          <Text
            style={[
              Fonts.style.greyInfo,
              {fontFamily: Fonts.fonts.PoppinsBold, marginBottom: Metrics.applyRatio(10)},
            ]}>
            {this.state.currentIndex === 8
              ? `${translate('finalStep')}`
              : `${this.state.currentIndex + 1} ${translate('outOf')} ${totalSteps} ${translate(
                  'steps',
                )}`}
          </Text>
          <Text style={[Fonts.style.title, ApplicationStyles.screen.textAlignCenter]}>
            {this.stepNames[this.state.currentIndex]}
          </Text>
          <Text
            style={[
              Fonts.style.greyInfo,
              this.state.currentIndex === 0 ? Style.stepDarkDescription : Style.stepDescription,
              {width: this.setpDesWidth[this.state.currentIndex]},
            ]}>
            {this.stepDescription[this.state.currentIndex]}
          </Text>
        </SafeAreaView>
        <SafeAreaView
          style={
            this.state.currentIndex === 7 ? Style.contentFullContainer : Style.contentContainer
          }>
          {this.renderScreen()}
        </SafeAreaView>

        <View
          style={
            this.state.currentIndex === 7 || this.state.currentIndex === 5
              ? Style.previewNextContainer
              : Style.nextContainer
          }>
          {this.state.currentIndex === 5 ? (
            <TouchableOpacity
              onPress={this.showLocationModal}
              activeOpacity={1}
              style={Style.addLocationBtnContainer}>
              <Image source={Images.mapPin} style={Style.mapMarkIcon} />
              <Text style={Style.addLocationText}>{translate('addMoreLocation')}</Text>
            </TouchableOpacity>
          ) : (
            <View />
          )}
          <TouchableOpacity
            style={[Style.validationButton, this.state.activeNextBtn ? '' : Style.inactiveButton]}
            onPress={this.state.currentIndex === 8 ? this.uploadImage : this.onPressNext}
            activeOpacity={1}
            disabled={!this.state.activeNextBtn}>
            <Text style={Style.validationText}>
              {this.state.currentIndex === 8 ? `${translate('publish')}` : `${translate('next')}`}
            </Text>
          </TouchableOpacity>
          {this.state.currentIndex === 7 ? (
            <TouchableOpacity
              style={Style.editPromotionContainer}
              onPress={() => this.onEditPromotion()}
              activeOpacity={1}
              disabled={!this.state.activeNextBtn}>
              <Text style={Style.addLocationText}>{translate('editPromotion')}</Text>
            </TouchableOpacity>
          ) : (
            <View />
          )}
        </View>
      </React.Fragment>
    )
  }
}
NewOfflineCampaign.propTypes = {
  navigation: PropTypes.object,
}
