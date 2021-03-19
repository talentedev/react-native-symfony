import React, {Component} from 'react'
import {
  Text,
  SafeAreaView,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  Platform,
  Linking,
  ImageBackground,
} from 'react-native'
import {Images, ApplicationStyles} from 'App/Theme'
import {Style} from './ActiveStyle'
import {PropTypes} from 'prop-types'
import {translate} from 'App/Services/TranslationService'
import moment from 'moment'
import InAppBrowserService from 'App/Services/InAppBrowserService'
import NavigationService from 'App/Services/NavigationService'
import {onlinePromoBoxClick} from 'App/Services/Utils'

export default class ActiveCom extends Component {
  constructor(props) {
    super(props)
    const {item} = this.props
    this.state = {
      itemData: item,
    }
  }

  onPressBookmarkIcon = () => {
    const {itemData} = this.state
    itemData.item.mark ? (itemData.item.mark = false) : (itemData.item.mark = true)
    this.setState({itemData})
  }

  showAllLocations = () => {
    NavigationService.push('AllLocations', {locationData: this.state.itemData.businessLocations})
  }
  _keyExtractor = (item) => item.uuid.toString()
  _renderListItem = (buttonItem) => {
    if (buttonItem.index < 3 || this.state.showAllLocations) {
      return (
        <TouchableOpacity onPress={() => this.gMapOpener(buttonItem.item.address)}>
          <Text style={Style.listButtonIcon}>{buttonItem.item.caption}</Text>
        </TouchableOpacity>
      )
    } else if (buttonItem.index === 3) {
      let leftCount = this.state.itemData.businessLocations.length - 3
      return (
        <TouchableOpacity onPress={this.showAllLocations}>
          <Text style={Style.listButtonIcon}>+ {leftCount}</Text>
        </TouchableOpacity>
      )
    } else {
    }
  }
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

  render() {
    const {itemData} = this.state
    const isOnlinePromo = itemData.isOnlinePromo
    const {index, onPressPromotion, onPressPromotionDetails} = this.props
    let dateEnd = ''
    if (itemData.endDate) {
      dateEnd = itemData.endDate.split('T')
    }
    return (
      <SafeAreaView style={Style.referView}>
        <TouchableOpacity
          onPress={() => {
            onPressPromotionDetails(itemData, index)
          }}>
          <View style={Style.activeCenterView}>
            {itemData.promoImageUrl !== '' ? (
              <ImageBackground
                source={{uri: itemData.promoImageUrl}}
                style={[Style.backImage, ApplicationStyles.shadowView]}
                imageStyle={Style.imgStyle}>
                <View style={[Style.transparentView, Style.backImage]} />
                <View style={Style.innerView}>
                  <View style={Style.innerStyleEmoji}>
                    <Text style={Style.emojiStyle}>🙋‍</Text>
                    <Text style={Style.textStyle}>{itemData.refers.count}</Text>
                    <Text style={Style.textContainStyle}>{translate('peopleRedeemedOffer')}</Text>
                  </View>
                  <View style={Style.secondEmojiStyle}>
                    <Text style={Style.emojiStyle}>💵</Text>
                    <Text style={Style.textStyle}>${Number(itemData.earnedOrPaid)}</Text>
                    <Text style={Style.secondTextStyle}>{translate('wereSpent')}</Text>
                  </View>
                </View>
              </ImageBackground>
            ) : (
              <Image source={Images.leavesBG} style={Style.backImage} />
            )}
          </View>
          <Text style={Style.offStyle}>{itemData.caption}</Text>
          <View style={Style.expireView}>
            <Image style={Style.clockCenter} source={Images.clock} />
            {itemData.endDate ? (
              <Text style={Style.expireText}>
                {translate('expiresOn') + dateEnd[0]} (
                {Math.ceil(moment(itemData.endDate).diff(moment(), 'days', true))}{' '}
                {translate('daysLeft')} )
              </Text>
            ) : (
              <Text style={Style.expireText}>{translate('ongoing')}</Text>
            )}
          </View>
        </TouchableOpacity>
        <View style={Style.btnView}>
          <View style={Style.fMandarinOrient}>
            {itemData.businessLocations.length > 0 ? (
              <FlatList
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                data={itemData.businessLocations}
                extraData={this.state}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderListItem}
                horizontal={true}
              />
            ) : (
              <Text />
            )}
            {isOnlinePromo && (
              <TouchableOpacity onPress={() => onlinePromoBoxClick(itemData)}>
                <Text style={Style.listButtonIcon}>{translate('onlinePromoStore')}</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
        <View style={Style.btnView}>
          <TouchableOpacity
            onPress={() => {
              onPressPromotion(itemData, index)
            }}>
            <Text style={Style.viewPromoTxt}>{translate('viewPromotion')}</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    )
  }
}

ActiveCom.propTypes = {
  item: PropTypes.object,
  onPressPromotion: PropTypes.func,
  onPressPromotionDetails: PropTypes.func,
  index: PropTypes.number,
}
