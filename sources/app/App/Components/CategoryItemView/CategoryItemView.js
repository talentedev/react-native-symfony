import React from 'react'
import {Text, TouchableOpacity, Image} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import Style from './CategoryItemViewStyle'
import PropTypes from 'prop-types'
import Colors from 'App/Theme/Colors'

export default class CategoryItemView extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      isSelected: this.props.catItem.item.isSelected,
    }
  }

  selectCatItem = () => {
    this.props.catToggleSelect(!this.state.isSelected, this.props.catItem.item.id)
    this.setState({
      isSelected: !this.state.isSelected,
    })
  }

  render() {
    let {catItem, editable, activeOpacity} = this.props
    let {isSelected} = this.state
    return (
      <TouchableOpacity
        style={Style.categoryListItem}
        onPress={this.selectCatItem}
        activeOpacity={activeOpacity}
        disabled={editable}>
        <LinearGradient
          colors={
            isSelected ? ['#57A3E8', '#00DFBD'] : [Colors.greyBackground, Colors.greyBackground]
          }
          start={{x: 1, y: 1}}
          end={{x: 0, y: 0}}
          style={Style.categoryItemImgContainer}>
          <Image
            style={Style.categoryItemImg}
            source={{uri: isSelected ? catItem.item.iconWhiteUrl : catItem.item.iconGreyUrl}}
          />
        </LinearGradient>
        <Text style={isSelected ? Style.selectedCatItemTxt : Style.categoryItemTxt}>
          {catItem.item.label}
        </Text>
      </TouchableOpacity>
    )
  }
}

CategoryItemView.propTypes = {
  catItem: PropTypes.object,
  editable: PropTypes.bool,
  activeOpacity: PropTypes.number,
  catToggleSelect: PropTypes.func,
}
