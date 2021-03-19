import React, {Component} from 'react'
import {Image, StatusBar, Text, TouchableOpacity, View, ScrollView} from 'react-native'
import Style from 'App/Containers/SignInScreen/SignInAndVerification/Journey/JourneyStyle'
import NavigationService from 'App/Services/NavigationService'
import {translate} from 'App/Services/TranslationService'
import ClickableText from 'App/Components/ClickableText/ClickableText'
import {ApplicationStyles, Colors, Images} from 'App/Theme'
import LinearGradient from 'react-native-linear-gradient'
import {TokenService} from 'App/Services/AsyncStorage/TokenService'

class Region extends Component {
  constructor(props) {
    super(props)
    this.state = {
      borderColorBusiness: Colors.white,
      borderColorShopper: Colors.white,
      regionIndSelect: false,
      regionHkgSelect: false,
    }
  }

  onPressLeftIcon = () => {
    TokenService.resetSmsSignInData()
    NavigationService.clearApolloStoreAndNavigateToSignInScreen()
  }
  regionIndPress = () => {
    const {regionIndSelect} = this.state
    this.setState({regionIndSelect: !regionIndSelect}, () => {
      if (this.state.regionIndSelect) {
        this.setState({regionHkgSelect: false})
      }
    })
  }
  regionHkgPress = () => {
    const {regionHkgSelect} = this.state
    this.setState({regionHkgSelect: !regionHkgSelect}, () => {
      if (this.state.regionHkgSelect) {
        this.setState({regionIndSelect: false})
      }
    })
  }

  verifyClick = () => {
    const regionId = this.state.regionHkgSelect ? 1 : 2
    NavigationService.navigate('JourneyScreen', {regionId: regionId})
  }

  render() {
    const {regionHkgSelect, regionIndSelect} = this.state
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
          <ScrollView>
            <View style={Style.innerView}>
              <View style={Style.centerView}>
                <Text style={Style.mainTxt}> {translate('selectYourRegion')} </Text>
                <Text style={Style.innerTxt}>{translate('avaliableRegions')}</Text>
              </View>
              <View style={Style.middalView}>
                <TouchableOpacity onPress={this.regionHkgPress}>
                  <Image
                    source={regionHkgSelect ? Images.regionHkOn : Images.regionHkOff}
                    resizeMode={'contain'}
                    style={Style.shopperImg}
                  />
                  <Text style={regionHkgSelect ? Style.txtStyleOn : Style.txtStyleOff}>
                    {translate('country.hk').toUpperCase()}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.regionIndPress}>
                  <Image
                    source={regionIndSelect ? Images.regionInOn : Images.regionInOff}
                    resizeMode={'contain'}
                    style={Style.businessImg}
                  />
                  <Text style={regionIndSelect ? Style.txtStyleOn : Style.txtStyleOff}>
                    {translate('country.in').toUpperCase()}
                  </Text>
                </TouchableOpacity>
              </View>
              <View>
                <ClickableText
                  inputText={translate('next')}
                  onPress={this.verifyClick}
                  style={
                    regionIndSelect || regionHkgSelect
                      ? Style.buttonContainer
                      : Style.deactivateButtonContainer
                  }
                  textStyle={Style.buttonTextStyle}
                  editable={!(regionIndSelect || regionHkgSelect)}
                />
              </View>
            </View>
          </ScrollView>
        </View>
      </React.Fragment>
    )
  }
}

export default Region
