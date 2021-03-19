import React, {Component} from 'react'
import {View, SafeAreaView, Text, Keyboard} from 'react-native'

import Style from './ComponentScreenStyle'
import {PropTypes} from 'prop-types'

// Component
import CustomTabs from 'App/Components/CustomTabs/CustomTabs'
import ValidationButton from 'App/Components/ValidationButton/ValidationButton'
import Spinner from 'react-native-loading-spinner-overlay'
import ClickableText from 'App/Components/ClickableText/ClickableText'
import CustomInputText from 'App/Components/CustomInputText/CustomInputText'
import Colors from 'App/Theme/Colors'
import {translate} from 'App/Services/TranslationService'
import CountryPick from 'App/Components/CountryPicker/CountryPick'
import DatePickerCom from 'App/Components/DatePickerCom/DatePickerCom'

export default class ComponentScreen extends Component {
  // Life Cycle Methods
  constructor(props) {
    super(props)
    this.state = {
      isUnderLine: true,
      isEditable: true,
      isLoading: false,
    }
  }

  tabs = [
    {title: translate('ALL')},
    {title: translate('UNREFERRED')},
    {title: translate('REFERRING')},
    {title: translate('BOOKMARKS')},
  ]

  // Set Refrence

  setRef = (ref) => {
    this.textInput = ref
  }

  // Change Value
  changeValue = (text) => {
    console.log(text)
  }

  // Submit Editing
  onSubmitEditing = () => {
    Keyboard.dismiss()
    console.log('Submit Editing Press')
  }

  onFocus = () => {
    console.log('Focus Press')
  }
  // OnPress Method

  onPressText = () => {
    this.setState((prevState) => ({
      isUnderLine: !prevState.isUnderLine,
    }))
  }

  onPressChangeEditable = () => {
    this.setState((prevState) => ({
      isUnderLine: !prevState.isUnderLine,
    }))
  }

  onPressValidationButton = () => {
    this.setState(
      {
        isLoading: true,
      },
      () => {
        setTimeout(() => {
          this.setState({
            isLoading: false,
          })
        }, 5000)
      },
    )
  }

  renderAllView = () => {
    const {isUnderLine} = this.state
    return (
      <View style={Style.container}>
        <CustomInputText
          style={Style.textInputContainer}
          ref={this.setRef}
          onChangeText={this.changeValue}
          placeholder={translate('hello')}
          placeholderTextColor={Colors.black4}
          onSubmitEditing={this.onSubmitEditing}
          onFocus={this.onFocus}
        />
        <ClickableText
          style={Style.clickableContainer}
          inputText="balise"
          underlined={isUnderLine}
          textStyle={Style.clickableTextStyle}
          withLargePadding={true}
          onPress={this.onPressText}
        />
        <ValidationButton
          text="Got it"
          style={Style.validationButtonContainer}
          textStyle={Style.validationButtonStyle}
          onPress={this.onPressValidationButton}
        />
      </View>
    )
  }
  renderUnReferredView = () => {
    return (
      <View style={Style.container}>
        <Text> Unreferring </Text>
        <CountryPick />
        {/* <ValidationButton text="Next" onPress={() => alert('valid')} /> */}
      </View>
    )
  }
  changeDate = (date) => {
    console.log('date => ', date)
  }
  renderReferringView = () => {
    return (
      <SafeAreaView style={Style.container}>
        {/* <View style={Style.datepickerContainer}> */}
        <DatePickerCom selctedDate={this.changeDate} />
        {/* <Text style={{ marginTop: 10, textAlign: 'center' }}>DatePicker</Text> */}
        {/* </View> */}
      </SafeAreaView>
    )
  }
  renderBookmarksView = () => {
    return (
      <View style={Style.container}>
        <Text style={Style.textStyle}>Bookmarks Screen</Text>
      </View>
    )
  }

  render() {
    const {isLoading} = this.state
    return (
      <View style={Style.container}>
        <SafeAreaView style={Style.container}>
          <CustomTabs
            tabs={this.tabs}
            initialPage={0}
            tabBarBackgroundColor="#ffffff"
            tabBarActiveTextColor="#aaaaaa"
            tabBarInactiveTextColor="#000000"
            tabBarTextStyle={Style.tabTextStyle}
            screens={[
              this.renderAllView(),
              this.renderUnReferredView(),
              this.renderReferringView(),
              this.renderBookmarksView(),
            ]}
          />
        </SafeAreaView>
        <Spinner visible={isLoading} />
      </View>
    )
  }
}

ComponentScreen.propTypes = {
  startup: PropTypes.func,
}
