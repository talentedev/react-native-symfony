import React, {Component} from 'react'
import {Image, Keyboard, NativeModules, SafeAreaView, Text, View} from 'react-native'
import NavigationService from 'App/Services/NavigationService'
import Style from './ProofValidationStyle'
import {translate} from 'App/Services/TranslationService'
// Components
import CustomHeader from 'App/Components/CustomHeader'
import CustomButton from 'App/Components/CustomButton/CustomButton'
import {Images} from 'App/Theme'

const {UIManager} = NativeModules
UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true)

export default class ProofValidationMessage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isDontShow: false,
    }
  }

  // onPress Method
  onPressLeftIcon = () => {
    NavigationService.pop()
  }

  onPressNext = () => {
    NavigationService.navigate('ProofValidation')
  }

  render() {
    return (
      <React.Fragment>
        <CustomHeader
          compact
          leftComponent="back"
          leftIconPress={this.onPressLeftIcon}
          title={''}
        />
        <SafeAreaView style={Style.container}>
          <View style={Style.contentContainer}>
            <Image source={Images.proofValidation} style={Style.proofVImg} />
          </View>
          <View style={Style.bottomContainer}>
            <Text style={Style.titleTextStyle}>{translate('referrerValidation')}</Text>
            <Text style={Style.subTitleStyle}>{translate('proofDesc')}</Text>
            {/* <View style={Style.checkoutList}>
              <TouchableOpacity
                style={{marginRight: Metrics.applyRatio(11)}}
                onPress={() => {
                  const newValue = !this.state.isDontShow
                  this.setState({isDontShow: newValue})
                }}>
                <Image
                  source={this.state.isDontShow ? Images.checkBox : Images.checkBoxOutline}
                  style={{height: Metrics.applyRatio(18), width: Metrics.applyRatio(18)}}
                />
              </TouchableOpacity>
              <Text style={Style.flexOneText}>{translate('dontShowAgain')}</Text>
            </View>
            */}
            <CustomButton
              areYouManuallyGivingPositionFromBottom={true}
              buttonPositionFromBottom={0}
              primaryButtonInputText={translate('next')}
              primaryButtonStyle={Style.buttonContainer}
              primaryButtonOnPress={() => {
                Keyboard.dismiss()
                this.onPressNext()
              }}
            />
          </View>
        </SafeAreaView>
      </React.Fragment>
    )
  }
}
