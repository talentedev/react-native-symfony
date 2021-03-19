import React from 'react'
import {Image, Text, TouchableOpacity, View} from 'react-native'

import Style from './GridTabsStyle'
import PropTypes from 'prop-types'
import LinearGradient from 'react-native-linear-gradient'
import Colors from 'App/Theme/Colors'

export default class GridTabs extends React.PureComponent {
  selectCatItem = () => {
    this.props.catToggleSelect(!this.props.catItem.item.isSelected, this.props.catItem.item.id)
  }

  render() {
    let {catItem, editable, activeOpacity, currentCategory, isInline} = this.props
    let isSelected = this.props.catItem.item.isSelected

    return (
      <TouchableOpacity
        style={Style.categoryListItem}
        onPress={this.selectCatItem}
        activeOpacity={activeOpacity}
        disabled={editable}>
        {isInline ? (
          <LinearGradient
            colors={
              isSelected || currentCategory === this.props.catItem.item.id
                ? ['#57A3E8', '#00DFBD']
                : [Colors.greyBackground, Colors.greyBackground]
            }
            start={{x: 1, y: 1}}
            end={{x: 0, y: 0}}
            style={Style.categoryItemImgRowContainer}>
            <Image
              style={Style.categoryRowItemImg}
              source={{
                uri:
                  isSelected || currentCategory === this.props.catItem.item.id
                    ? catItem.item.iconWhiteUrl
                    : catItem.item.iconGreyUrl,
              }}
            />
            <Text
              style={
                isSelected || currentCategory === this.props.catItem.item.id
                  ? Style.selectedCatItemGreenTxt
                  : Style.categoryItemTxt
              }>
              {catItem.item.label}
            </Text>
          </LinearGradient>
        ) : (
          <View>
            <LinearGradient
              colors={
                isSelected || currentCategory === this.props.catItem.item.id
                  ? ['#57A3E8', '#00DFBD']
                  : [Colors.greyBackground, Colors.greyBackground]
              }
              start={{x: 1, y: 1}}
              end={{x: 0, y: 0}}
              style={Style.categoryItemImgContainer}>
              <Image
                style={Style.categoryItemImg}
                source={{
                  uri:
                    isSelected || currentCategory === this.props.catItem.item.id
                      ? catItem.item.iconWhiteUrl
                      : catItem.item.iconGreyUrl,
                }}
              />
            </LinearGradient>
            <Text
              style={
                isSelected || currentCategory === this.props.catItem.item.id
                  ? Style.selectedCatItemTxt
                  : Style.categoryItemTxt
              }>
              {catItem.item.label}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    )
  }
}

GridTabs.propTypes = {
  catItem: PropTypes.object,
  editable: PropTypes.bool,
  activeOpacity: PropTypes.number,
  catToggleSelect: PropTypes.func,
  currentCategory: PropTypes.string,
  isInline: PropTypes.bool,
}
