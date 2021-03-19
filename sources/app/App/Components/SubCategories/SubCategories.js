// React
import React from 'react'
import {Text, FlatList, View} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import PropTypes from 'prop-types'
// Styling
import Style from './SubCategoriesStyle'

export default class SubCategories extends React.Component {
  constructor(props) {
    super(props)
    let {data} = props
    this.state = {data, selection: [], selected: null}
  }
  componentDidUpdate(prevProps) {
    if (prevProps.data !== this.props.data) {
      this.setState({data: this.props.data})
    }
  }

  componentDidMount() {
    if (this.props.curSubcatId && this.props.curCatId) {
      this.setState({selected: `${this.props.curCatId} ${this.props.curSubcatId}`})
    }
  }

  _keyExtractor = (item, index) => item.id

  _itemOnPress = (categoryId, subCategoryId, item, subCategoryCustomerAverageSpending) => {
    const currentAverageSpending = subCategoryCustomerAverageSpending.items.find((el) => {
      return el.region.id === this.props.regionId.toString()
    })
    this.props.onSubCategoryChange(item, subCategoryId, currentAverageSpending)
    this.setState({selected: `${categoryId} ${subCategoryId}`})
  }

  render() {
    const {
      data,
      selected,
      data: {id: categoryId},
    } = this.state
    return (
      <FlatList
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        data={data.subCategories.items}
        keyExtractor={this._keyExtractor}
        extraData={this.state.selected}
        renderItem={({item: subCategory}) => {
          return (
            <View>
              <View>
                <View key={subCategory.id}>
                  <LinearGradient
                    colors={
                      selected === `${categoryId} ${subCategory.id}`
                        ? ['#00DFBD', '#57a3e8']
                        : ['rgba(0,0,0,0)', 'rgba(0,0,0,0)']
                    }
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 1}}
                    style={
                      selected === `${categoryId} ${subCategory.id}`
                        ? Style.subCategoryItemSelected
                        : Style.subCategoryItem
                    }>
                    <Text
                      style={
                        selected === `${categoryId} ${subCategory.id}`
                          ? Style.subCategoryItemSelected
                          : Style.subCategoryItem
                      }
                      onPress={() =>
                        this._itemOnPress(
                          categoryId,
                          subCategory.id,
                          data,
                          subCategory.subCategoryCustomerAverageSpending,
                        )
                      }>
                      {subCategory.label}
                    </Text>
                  </LinearGradient>
                </View>
              </View>
            </View>
          )
        }}
      />
    )
  }
}

SubCategories.propTypes = {
  curCatId: PropTypes.any,
  curSubcatId: PropTypes.any,
  data: PropTypes.object,
  onSubCategoryChange: PropTypes.func,
  regionId: PropTypes.number,
}
