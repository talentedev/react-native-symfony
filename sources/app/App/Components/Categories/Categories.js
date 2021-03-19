import React from 'react'
import PropTypes from 'prop-types'
import {Text, FlatList, View} from 'react-native'
// import CustomHeader from 'App/Components/CustomHeader'
import GridTab from 'App/Components/GridTabs/GridTabs'
import Style from './CategoriesStyle'

export default class Categories extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedTag: [],
      tagData: this.props.categories,
      currentCategory: '1',
    }
  }

  onGridTabChangeHandle = (isSelected, id) => {
    this.props.onCategoryChange(id)
    const {tagData} = this.state
    let newTagData = tagData.map((el) => ({
      ...el,
      isSelect: el.id.toString() === id.toString(),
    }))
    this.setState({currentCategory: id, tagData: newTagData})
  }
  componentDidMount() {
    if (this.props.curCatId) {
      const {tagData} = this.state
      let newTagData = tagData.map((el) => ({
        ...el,
        isSelect: el.id.toString() === this.props.curCatId.toString(),
      }))
      this.setState({currentCategory: this.props.curCatId, tagData: newTagData})
    }
  }

  _keyExtractor = (item) => item.id.toString()
  _renderListItem = (categoryItem) => {
    return (
      <GridTab
        catItem={categoryItem}
        catToggleSelect={this.onGridTabChangeHandle}
        currentCategory={this.state.currentCategory}
        isInline={this.props.isInline}
      />
    )
  }
  render() {
    const {tagData, currentCategory} = this.state
    // console.log(`Categories - render : ${currentCategory}`)
    // console.log('Categories, this.state.tagData', tagData)
    return (
      <View style={Style.containerWrapper}>
        {tagData.length > 0 ? (
          <FlatList
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            horizontal
            data={tagData}
            extraData={currentCategory}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderListItem}
          />
        ) : (
          <View>
            <Text />
          </View>
        )}
      </View>
    )
  }
}

Categories.propTypes = {
  isMultiSelect: PropTypes.bool,
  curCatId: PropTypes.any,
  onCategoryChange: PropTypes.func,
  categories: PropTypes.array,
  isInline: PropTypes.bool,
}
