import React, {Component} from 'react'
import {Image, Linking, Platform, Text, TouchableOpacity, View} from 'react-native'
import Style from 'App/Components/CustomTabContent/CustomTabContentStyle'
import {PropTypes} from 'prop-types'
import ListCardItem from 'App/Components/ListCardItem/ListCardItem'
import ListCardItemExpanded from 'App/Components/ListCardItemExpanded/ListCardItemExpanded'
import moment from 'moment'
import {translate} from 'App/Services/TranslationService'
import NavigationService from 'App/Services/NavigationService'
import InAppBrowserService from 'App/Services/InAppBrowserService'

export default class CustomTabContent extends Component {
  constructor(props) {
    super(props)
    const {item} = this.props
    this.state = {
      itemData: item.item,
      isReferring: item.item.isRedeemed && !item.item.isReferrer,
      isRedeemed: item.item.isRedeemed,
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
    const itemData = this.props.item.item
    const isReferring = !this.props.item.item.isReferrer
    return (
      <View>
        {this.props.loading ? (
          <View>
            <View style={Style.mockContainer}>
              <View style={Style.mockBusinessIcon} />
              <View style={Style.mockNameContainer}>
                <View style={Style.mockName} />
                <View style={Style.mockNameBottom} />
              </View>
              <View style={Style.mockcategoryIconContainer}>
                <View style={Style.mockcategoryIcon} />
              </View>
            </View>
            <View style={Style.mockPromoImage} />
            <View style={Style.mockTitleContainer}>
              <View style={Style.mockPromoTitle} />
              <View style={Style.mockcategoryIcon} />
            </View>
            <View style={Style.mockPromoSubtitle} />
            <View style={Style.mockLocationsContainer}>
              <View style={Style.mockLocation} />
              <View style={Style.mockLocation} />
              <View style={Style.mockLocation} />
              <View style={Style.mockLocation} />
            </View>
          </View>
        ) : (
          <View style={Style.referView}>
            <View style={Style.referInnerView}>
              <View style={Style.referIconView}>
                <TouchableOpacity
                  onPress={() => {
                    NavigationService.push('ProfileView', {businessId: itemData.business.id})
                  }}>
                  {itemData.business.profileImageUrl ? (
                    <Image
                      style={Style.referIcon}
                      source={{uri: itemData.business.profileImageUrl}}
                    />
                  ) : (
                    <View />
                  )}
                </TouchableOpacity>
              </View>
              <View style={Style.referNameView}>
                <TouchableOpacity
                  onPress={() => {
                    NavigationService.push('ProfileView', {businessId: itemData.business.id})
                  }}>
                  <Text style={Style.nameTxt}>{itemData.business.businessName}</Text>
                </TouchableOpacity>
                {itemData.endDate ? (
                  <Text style={Style.otherTxt}>
                    {translate('validForDays', {
                      validDate: Math.ceil(moment(itemData.endDate).diff(moment(), 'days', true)),
                    })}
                  </Text>
                ) : (
                  <Text style={Style.otherTxt}>{translate('ongoing')}</Text>
                )}
              </View>
              <View style={Style.moreIconView}>
                <View style={Style.moreIconDetail}>
                  <Image
                    style={Style.moreIcon}
                    source={{uri: itemData.business.category.iconBlackUrl}}
                  />
                  <Text style={Style.categoryName}>{itemData.business.category.label}</Text>
                </View>
              </View>
            </View>
            {this.props.isExpanded ? (
              <ListCardItemExpanded
                itemData={itemData}
                isReferring={isReferring}
                showBookMark={true}
              />
            ) : (
              <ListCardItem
                itemData={itemData}
                isReferring={isReferring}
                isRedeemed={this.state.isRedeemed}
                showBookMark={true}
              />
            )}
          </View>
        )}
      </View>
    )
  }
}

CustomTabContent.propTypes = {
  item: PropTypes.object,
  isReferring: PropTypes.bool,
  isExpanded: PropTypes.bool,
  loading: PropTypes.bool,
}

CustomTabContent.defaultProps = {
  isReferring: false,
}
