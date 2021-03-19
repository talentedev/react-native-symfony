import React, {Component} from 'react'
import {View, Text, TouchableOpacity, Image} from 'react-native'
import CustomHeader from 'App/Components/CustomHeader'
import {translate} from 'App/Services/TranslationService'
import Styles from './DonateToCharityStyle'
import NavigationService from 'App/Services/NavigationService'
import Images from 'App/Theme/Images'

export default class DonateToCharity extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <View style={Styles.container}>
        <CustomHeader leftComponent="back" title={translate('donateCharity')} withGrey />
        <View style={Styles.innerContainer}>
          <Image source={Images.donateImage} style={Styles.imgStyle} />
          <Text style={Styles.descText}>{translate('donateScrTxt')}</Text>
          <TouchableOpacity onPress={() => NavigationService.pop()}>
            <Text style={Styles.goBack}>{translate('goBack')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}
