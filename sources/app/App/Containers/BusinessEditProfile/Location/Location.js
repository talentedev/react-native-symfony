import React from 'react'
import {
  Text,
  View,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Alert,
  TextInput,
} from 'react-native'

// Component
import CustomButton from 'App/Components/CustomButton/CustomButton'

// Other
import {translate} from 'App/Services/TranslationService'
import Style from 'App/Containers/BusinessEditProfile/Location/LocationStyle'
import pickerSelectStyles from 'App/Containers/BusinessEditProfile/Location/pickerStyle'
import {ApplicationStyles, Images, Colors} from 'App/Theme'
import Metrics from 'App/Theme/Metrics'
import {UserService} from 'App/Services/GraphQL/UserService'
import Modal from 'react-native-modal'
import RNPickerSelect from 'react-native-picker-select'
import {PropTypes} from 'prop-types'
import StatusEnum from 'App/Enums/StatusEnum'

export default class Location extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      businessName: '',
      editId: null,
      district: null,
      location: null,
      caption: null,
      addressData: [],
      modalVisible: false,
      isEditLocation: false,
      districts: [],
      resubmit: false,
    }
  }
  _fetchLocation = () => {
    UserService.getBusinessUser().then((res) => {
      this.setState({
        addressData: res.data.businessUser.businessLocations.items,
        businessId: res.data.businessUser.id,
        resubmit: res.data.businessUser.status === StatusEnum.REFUSED,
      })
    })
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

  componentDidMount() {
    this._fetchDistricts()
    this._fetchLocation()
  }

  keyExtractor = (item, index) => item + index

  imgPressDelete = (item) => () => {
    const oldData = this.state.addressData
    const newData = oldData.filter((obj) => obj.uuid !== item.item.uuid)
    Alert.alert(
      translate('confirmation'),
      translate('deleteLocationQuestion'),
      [
        {
          text: translate('cancel'),
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () =>
            this.setState({addressData: newData}, () => {
              this.props.onBusinessChange('businessLocations', {items: this.state.addressData})
            }),
        },
      ],
      {cancelable: true},
    )
  }

  imgPressEdit = (item) => () => {
    this.setState({
      isEditLocation: true,
      modalVisible: true,
      editId: item.item,
      district: item.item.district,
      location: item.item.address,
      caption: item.item.caption,
    })
    // this.setState({
    //   addressLocation: item.item.label,
    //   addressCaption: item.item.value,
    // })
    // this.setState({ editTable: true, modalVisible: true, editId: item.item.id })
  }

  editLocationClick = (item) => {
    const {addressData} = this.state
    const obj = addressData
    if (item !== null) {
      obj.forEach((res) => {
        if (res.uuid === item.uuid) {
          res.district = this.state.district
          res.caption = this.state.caption
          res.address = this.state.location
        }
      })
      this.setState(
        {
          modalVisible: false,
          addressData: obj,
          district: null,
          location: null,
          caption: null,
          isEditLocation: false,
        },
        () => {
          this.props.onBusinessChange('businessLocations', {items: addressData})
        },
      )
    }
  }

  addLocationClick = (district, caption, location) => {
    const {addressData} = this.state
    if (district && caption && location) {
      const oldAddressData = addressData
      const resArray1 = oldAddressData.filter((res) => res.caption === caption)
      const resArray2 = oldAddressData.filter((res) => res.address === location)
      // const resArray = oldAddressData.filter((res) => res.label === item.label && res.value === item.value)
      if (resArray1.length !== 0) {
        Alert.alert('', 'Caption already exist !')
      } else if (resArray2.length !== 0) {
        Alert.alert('', 'Location already exist !')
      } else {
        const obj = {
          uuid: this.state.businessId + '_' + this.state.caption,
          caption: caption,
          district: {...district},
          address: location,
          __typename: 'BusinessLocation',
        }
        addressData.push(obj)
        this.setState(
          {
            modalVisible: false,
            addressData,
            district: null,
            location: null,
            caption: null,
            // addressLocation: item.label,
            // addressCaption: item.value,
          },
          () => {
            this.props.onBusinessChange('businessLocations', {items: addressData})
          },
        )
      }
    }
  }
  addAddressClick = () => {
    this.setState({modalVisible: false})
  }
  _onChangeDistrict = (text) => {
    this.setState({
      district: text,
    })
  }
  _onChangeCaption = (text) => {
    this.setState({
      caption: text,
    })
  }
  _onChangeLocation = (text) => {
    this.setState({
      location: text,
    })
  }

  onSelectedText = (text) => {
    this.setState({addressLocation: text})
  }

  onPressAddLocation = () => {
    this.setState({modalVisible: true, isEditLocation: false})
  }
  saveClick = () => {
    this.props.allSave()
  }

  noRecord = () => {
    return (
      <View style={Style.container}>
        <View style={Style.noRecInnerView}>
          <Image style={Style.noRecImg} source={Images.editProfileNoRecord} />
          <Text style={Style.noRecText}>{translate('noRecordEditProfile')}</Text>
          <View style={[ApplicationStyles.screen.containerRow, Style.addNewLocationView]}>
            <CustomButton
              primaryButton={false}
              isImageSecondButton={true}
              isImageSecondButtonViewStyle={[ApplicationStyles.screen.containerRow, Style.center]}
              isImageSource={Images.mapPin}
              isImageStyle={Style.mapPinStyle}
              isImageSecondButtonTextStyle={Style.addNewLocationText}
              isImageSecondButtonInputText={translate('addNewLocation')}
              isImageSecondButtonOnPress={this.onPressAddLocation}
            />
          </View>
        </View>
      </View>
    )
  }

  addressList = () => {
    const {addressData} = this.state
    return (
      <View style={[Style.container, Style.addressList]}>
        <View style={Style.flatList}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            data={addressData}
            keyExtractor={this.keyExtractor}
            extraData={this.state}
            renderItem={this.renderItem}
          />
        </View>
        <View style={Style.addNewLocationView}>
          {/* <View style={[ApplicationStyles.screen.containerRow, Style.center]}>
            <Image source={Images.mapPin} style={Style.mapPinStyle} />
            <ClickableText
              inputText={translate('addNewLocation')}
              textStyle={Style.addNewLocationText}
              onPress={this.onPressAddLocation}
            />
          </View> */}
          {/* <ClickableText
          inputText={translate('save')}
          onPress={this.saveClick}
          style={Style.buttonContainer}
          textStyle={Style.buttonTextStyle}
        /> */}
          {/* <CustomButton
            areYouManuallyGivingPositionFromBottom={true}
            buttonPositionFromBottom={0}
            primaryButtonStyle={Style.buttonContainer}
            primaryButtonInputText={translate('save')}
            primaryButtonOnPress={this.saveClick}></CustomButton> */}
          <CustomButton
            areYouManuallyGivingPositionFromBottom={true}
            buttonPositionFromBottom={0}
            primaryButtonStyle={Style.buttonContainer}
            primaryButtonInputText={translate('save')}
            primaryButtonOnPress={this.saveClick}
            // primaryButtonActiveOpacity={1}
            isImageSecondButton={true}
            isImageSecondButtonViewStyle={[ApplicationStyles.screen.containerRow, Style.center]}
            isImageSource={Images.mapPin}
            isImageStyle={Style.mapPinStyle}
            isImageSecondButtonTextStyle={Style.addNewLocationText}
            isImageSecondButtonInputText={translate('addNewLocation')}
            isImageSecondButtonOnPress={this.onPressAddLocation}
          />
        </View>
      </View>
    )
  }

  renderItem = (item) => {
    return (
      <SafeAreaView style={Style.flatMainView}>
        <View style={Style.renderView}>
          <Text style={Style.listButtonIcon}>{item.item.caption}</Text>
        </View>
        <View style={ApplicationStyles.screen.containerRow}>
          <View style={Style.fMandarinOrient}>
            <Text style={Style.subCaptionText}>{item.item.address}</Text>
          </View>
          <View style={Style.end}>
            <TouchableOpacity onPress={this.imgPressEdit(item)}>
              <Image
                source={Images.pencil}
                style={{height: Metrics.applyRatio(14), width: Metrics.applyRatio(14)}}
              />
            </TouchableOpacity>
            <TouchableOpacity style={Style.imgLeft} onPress={this.imgPressDelete(item)}>
              <Image
                source={Images.trash}
                style={{height: Metrics.applyRatio(14), width: Metrics.applyRatio(14)}}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={Style.line} />
      </SafeAreaView>
    )
  }

  _onAddAdress = () => {
    if (this.state.isEditLocation) {
      this.editLocationClick(this.state.editId)
    } else {
      this.addLocationClick(this.state.district, this.state.caption, this.state.location)
    }
  }
  render() {
    const {addressData, districts, resubmit} = this.state
    return (
      <View style={Style.container}>
        <Modal
          isVisible={this.state.modalVisible}
          onBackdropPress={this.addAddressClick}
          swipeDirection="left"
          avoidKeyboard={true}
          style={Style.modalContainer}>
          <View>
            <View style={Style.modalContent}>
              <View style={Style.modalTopDash} />
              <View style={Style.titleContainer}>
                <Text style={Style.addLocationTitle}>
                  {translate(this.state.isEditLocation ? 'editLocation' : 'addNewLocation')}
                </Text>
              </View>
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
                  value={this.state.caption ? this.state.caption : ''}
                  onChangeText={this._onChangeCaption}
                  placeholder="Caption Here"
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
                />
              </View>
              {/* <TouchableOpacity
                style={[
                  Style.validationButton,
                  this.state.districts && this.state.caption && this.state.location
                    ? ''
                    : Style.inactiveButton,
                ]}
                onPress={this._onAddAdress}
                activeOpacity={1}
                disabled={!(this.state.districts && this.state.caption && this.state.location)}>
                <Text style={Style.validationText}>
                  {this.state.isEditLocation ? translate('editAddress') : translate('addAddress')}
                </Text>
              </TouchableOpacity> */}
              <CustomButton
                areYouManuallyGivingPositionFromBottom={true}
                buttonPositionFromBottom={0}
                primaryButtonActiveOpacity={1}
                primaryButtonStyle={[
                  Style.validationButton,
                  !this.state.districts &&
                    !this.state.caption &&
                    !this.state.location &&
                    Style.inactiveButton,
                ]}
                primaryButtonInputText={
                  this.state.isEditLocation ? translate('editAddress') : translate('addAddress')
                }
                secondaryButtonInputText={resubmit ? translate('resubmit') : translate('save')}
                primaryButtonOnPress={this._onAddAdress}
              />
            </View>
          </View>
        </Modal>
        {addressData.length > 0 ? this.addressList() : this.noRecord()}
      </View>
    )
  }
}
Location.propTypes = {
  onBusinessChange: PropTypes.func,
  allSave: PropTypes.func,
}
