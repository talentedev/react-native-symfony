import React from 'react'
import {
  Text,
  View,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Linking,
  Platform,
} from 'react-native'

import {translate} from 'App/Services/TranslationService'
import {Images} from 'App/Theme'
import {PropTypes} from 'prop-types'
import CustomHeader from 'App/Components/CustomHeader'
import Style from 'App/Containers/AllLocations/AllLocationsStyle'
import InAppBrowserService from 'App/Services/InAppBrowserService'

export default class AllLocations extends React.Component {
  constructor(props) {
    super(props)
    const {locationData} = this.props.navigation.state.params
    this.state = {
      addressData: locationData,
    }
  }

  keyExtractor = (item) => item.uuid.toString()

  gMapOpener = (location) => {
    const url = Platform.select({
      ios: 'maps:?q=' + location,
      android: 'geo:?q=' + location,
    })

    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        return Linking.openURL(url)
      } else {
        const url = 'https://www.google.com/maps/?q=' + location
        return InAppBrowserService.openInAppBrowserLink(url)
      }
    })
  }

  renderItem = (item) => {
    return (
      <SafeAreaView style={Style.flatMainView}>
        <View style={Style.rowContainer}>
          <View style={Style.renderView}>
            <View>
              <Text style={Style.listButtonIcon}>{item.item.caption}</Text>
            </View>
          </View>
          <View style={Style.end}>
            <TouchableOpacity onPress={() => this.gMapOpener(item.item.address)}>
              <Image source={Images.locationArrowIcon} style={Style.locationArrowIcon} />
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <View style={Style.fMandarinOrient}>
            <Text style={Style.subCaptionText}>{item.item.address}</Text>
          </View>
        </View>
        <View style={Style.line} />
      </SafeAreaView>
    )
  }

  render() {
    const {addressData} = this.state
    return (
      <View style={Style.container}>
        <CustomHeader leftComponent="back" title={translate('allLocations')} />
        <View style={[Style.container, Style.addressList]}>
          <View>
            <FlatList
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              data={addressData}
              keyExtractor={this.keyExtractor}
              extraData={this.state}
              renderItem={this.renderItem}
            />
          </View>
        </View>
      </View>
    )
  }
}
AllLocations.propTypes = {
  navigation: PropTypes.object,
}
