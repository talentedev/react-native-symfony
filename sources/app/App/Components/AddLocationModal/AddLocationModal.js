import React, {Component} from 'react'
import {View, Text, TextInput} from 'react-native'
import Style from './AddLocationModalStyle'

import Modal from 'react-native-modal'
import ValidationButton from 'App/Components/ValidationButton/ValidationButton'
import {translate} from 'App/Services/TranslationService'
import PropTypes from 'prop-types'
import RNPickerSelect from 'react-native-picker-select'
import {Colors} from 'App/Theme'

const targetLocations = [
  {
    label: 'Central',
    value: '1 Wyndham St',
  },
  {
    label: 'Causeway Bay',
    value: '2 Wyndham St',
  },
  {
    label: 'Shatin',
    value: '3 Wyndham St',
  },
  {
    label: 'Soho',
    value: '4 Wyndham St',
  },
]

export default class AddLocationModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      targetLocations: targetLocations,
      selectedLocation: '',
      selectedLocationId: 0,
      selectedDistrict: null,
    }
  }

  _onDistrictChange = (itemValue, itemIndex) => {
    if (itemIndex) {
      const newLabel = targetLocations[itemIndex - 1].label
      if (!this.state.selectedLocationId) {
        const newValue = {label: newLabel, value: itemValue, current: true}
        const newId = targetLocations.push(newValue)
        this.setState({targetLocations, selectedDistrict: newLabel, selectedLocationId: newId})
      } else if (newLabel !== this.state.selectedDistrict) {
        console.log(`<diff> ${newLabel} ${this.state.selectedDistrict}`, this.state)
        const {targetLocations} = this.state
        const current = targetLocations.find((el) => el.current)
        current.label = newLabel
        this.setState({
          targetLocations,
          selectedDistrict: newLabel,
          selectedLocationId: itemIndex,
        })
      }
      if (itemValue && itemIndex !== this.state.selectedLocationId) {
        // console.log(itemValue)
        this.setState({
          selectedLocation: itemValue,
          selectedLocationId: itemIndex,
        })
      }
    }
  }
  _
  _onLocationChange = (value) => {
    if (this.state.selectedLocationId) {
      const current = targetLocations.find((el) => el.current)
      current.value = value
      this.setState({targetLocations, selectedLocation: value})
    }
  }

  _onAddAdress = () => {
    if (this.state.selectedLocation) {
      if (this.props.isEditLocation) {
        this.props.editLocation(
          targetLocations[this.state.selectedLocationId - 1],
          this.state.selectedLocationId,
        )
      } else {
        this.props.addLocation(
          targetLocations[this.state.selectedLocationId - 1]
            ? this.props.businessEditScreen
              ? targetLocations[this.state.selectedLocationId - 1]
              : targetLocations[this.state.selectedLocationId - 1].label
            : this.state.selectedLocation,
          this.state.selectedLocationId,
        )
      }
    }
  }

  render() {
    const {selectedLocation, targetLocations} = this.state
    // console.log(this.state)
    // console.log(selectedLocation, this.state.selectedLocation)

    return (
      <Modal
        isVisible={this.props.showAddLocationModal}
        onBackdropPress={this.props.onPress}
        swipeDirection="left"
        avoidKeyboard={true}
        style={Style.modalContainer}>
        <View>
          <View style={Style.modalContent}>
            <View style={Style.modalTopDash} />
            <View style={Style.titleContainer}>
              <Text style={Style.addLocationTitle}>
                {translate(this.props.isEditLocation ? 'editLocation' : 'addNewLocation')}
              </Text>
            </View>
            <View style={Style.modalListItem}>
              <RNPickerSelect
                // Scroll List element
                items={targetLocations}
                onValueChange={this._onDistrictChange}
                style={{
                  modalViewMiddle: {
                    backgroundColor: Colors.white,
                  },
                  modalViewBottom: {
                    backgroundColor: Colors.white,
                  },
                }}
                value={selectedLocation}
              />
            </View>
            <View style={Style.modalListItem}>
              {/* Step 2 */}
              <TextInput
                // Location Value
                style={Style.locationValue}
                // changes textInput if selectedLocation is filled
                value={this.state.selectedLocation ? this.state.selectedLocation.toString() : ''}
                onChangeText={this._onLocationChange}
              />
            </View>
            <ValidationButton
              style={Style.validationButton}
              textStyle={Style.validationText}
              text={this.props.isEditLocation ? translate('editAddress') : translate('addAddress')}
              onPress={this._onAddAdress}
              activeOpacity={this.selectedLocationId && this.selectedDistrict}
            />
          </View>
        </View>
      </Modal>
    )
  }
}

AddLocationModal.propTypes = {
  showAddLocationModal: PropTypes.bool,
  addLocation: PropTypes.func,
  onPress: PropTypes.func,
  businessEditScreen: PropTypes.bool,
  isEditLocation: PropTypes.bool,
  editLocationId: PropTypes.any,
  editLocation: PropTypes.func,
}

AddLocationModal.defaultProps = {
  businessEditScreen: false,
  isEditLocation: false,
  editLocationId: null,
}
