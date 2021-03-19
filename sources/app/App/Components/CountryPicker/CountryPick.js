import React, {Component} from 'react'
import {View} from 'react-native'

import PhoneInput from 'react-native-phone-input'
import CountryPicker from 'react-native-country-picker-modal'
// import TranslationService from '../../Services/TranslationService'

import {Metrics, Colors} from 'App/Theme'
import Style from './CountryPickerStyle'
import {PropTypes} from 'prop-types'
import StorageService from 'App/Services/AsyncStorage/StorageService'

// import CustomInputText from 'App/Components/CustomInputText/CustomInputText'

class CountryPick extends Component {
  constructor(props) {
    super(props)
    this.onPressFlag = this.onPressFlag.bind(this)
    this.selectCountry = this.selectCountry.bind(this)
    this.onPressConfirm = this.onPressConfirm.bind(this)
    this.state = {
      cca2: 'hk',
      callingCode: '+852 ',
    }
    global.storage
      .load({key: StorageService.USER_PHONE_NUMBER_DATA_KEY})
      .then((data) => {
        this.setState({
          callingCode: data.callingCode,
          cca2: data.cca2,
        })
      })
      .catch(() => {})
  }

  componentDidMount() {
    this.setState({
      pickerData: this.phone.getPickerData(),
    })
  }

  onPressFlag() {
    this.countryPicker.openModal()
  }

  onPressConfirm() {
    this.props.onPressConfirm()
  }

  selectCountry(country) {
    this.phone.selectCountry(country.cca2.toLowerCase())
    this.setState({cca2: country.cca2.toLowerCase(), callingCode: `+${country.callingCode} `})
  }

  getCca2 = () => this.state.cca2

  getCountryCode = () => '+' + this.phone.getCountryCode()

  setMobileNumber = (text) => {
    text = text.replace(/[^\d]+/g, '')
    this.setState({mobileNumber: text})
  }

  getPhoneNumber = () => {
    const countryCode = this.getCountryCode()
    const fullNumber = this.phone.getValue()
    return fullNumber.substr(countryCode.length)
  }

  isValidNumber = () => this.phone.isValidNumber()

  render() {
    const {callingCode, cca2} = this.state
    return (
      <View style={Style.phoneNoView}>
        <PhoneInput
          initialCountry={cca2}
          textStyle={Style.textStyle}
          textProps={{
            marginLeft: Metrics.GUTTER_WIDTH,
            // marginLeft: 50,
            placeholder: 'MOBILE NUMBER',
            placeholderTextColor: Colors.white,
            returnKeyType: 'done',
            onSubmitEditing: () => {
              this.onPressConfirm()
            },
          }}
          ref={(ref) => {
            this.phone = ref
          }}
          onPressFlag={this.onPressFlag}
          //   onChangePhoneNumber={(number) => {
          //     var text = number.replace(/[^\d]+/g, '')
          //     console.log('number  => ', text)
          //     this.setState({ mobileNumber: text })
          //   }}
          value={callingCode}
          autoFormat
        />
        <CountryPicker
          ref={(ref) => {
            this.countryPicker = ref
          }}
          hideAlphabetFilter={true}
          onChange={(value) => this.selectCountry(value)}
          translation="eng"
          cca2={this.state.cca2}>
          <View />
        </CountryPicker>
      </View>
      //   </View>
    )
  }
}

CountryPick.propTypes = {
  onPressConfirm: PropTypes.func,
}

export default CountryPick
