// import { PropTypes } from 'prop-types'
import React from 'react'
import {View, Image, Text, TouchableOpacity} from 'react-native'
import Style from './BusinessTransferAccountStyle'
import {Images} from 'App/Theme'
import {translate} from 'App/Services/TranslationService'
import NavigationService from 'App/Services/NavigationService'

// Component
import CustomHeader from 'App/Components/CustomHeader'

class BusinessTransferAccount extends React.Component {
  render() {
    return (
      <View style={Style.container}>
        <CustomHeader
          title={translate('transferAccount')}
          leftComponent="back"
          leftIconPress={this.onPressLeftIcon}
        />
        <View style={Style.centerView}>
          <Image
            source={Images.undrawMakerLaunchCrhe}
            resizeMode="contain"
            style={Style.unDrawImageStyle}
          />
          <Text style={Style.messageText}>{translate('featureComingSoon')}</Text>
          <TouchableOpacity
            style={Style.backButtonContainer}
            onPress={() => {
              NavigationService.pop()
            }}>
            <Text style={Style.backButton}>{translate('goBack')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

BusinessTransferAccount.propTypes = {
  // navigation: PropTypes.shape({
  //   navigate: PropTypes.func.isRequired,
  // }).isRequired,
}

export default BusinessTransferAccount
