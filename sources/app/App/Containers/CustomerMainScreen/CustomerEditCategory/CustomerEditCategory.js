import React, {Component} from 'react'
import {Alert, FlatList, Text, View} from 'react-native'
import Style from './CustomerEditCategoryStyle'
// import ClickableText from 'App/Components/ClickableText/ClickableText'
import CustomButton from 'App/Components/CustomButton/CustomButton'
import {translate} from 'App/Services/TranslationService'
import NavigationService from 'App/Services/NavigationService'
import CategoryItemView from 'App/Components/CategoryItemView/CategoryItemView'
import CustomHeader from 'App/Components/CustomHeader'
import {CategoryService} from 'App/Services/GraphQL/CategoryService'
import Spinner from 'react-native-loading-spinner-overlay'
import EventEmitter from 'App/Services/EventEmitter'
import ToastService from 'App/Services/ToastService'
import {CustomerDrawer} from '../CustomerMainScreen'

class CustomerEditCategory extends Component {
  constructor(props) {
    super(props)
    this.state = {
      categories: [],
      spinner: true,
    }
  }

  componentDidMount() {
    this._fetchCategories()
  }

  onPressLeftIcon = () => {
    NavigationService.pop()
  }

  onPressSave = () => {
    let categoryIds = []
    this.state.categories.map((cat) => {
      if (cat.isSelected) {
        categoryIds.push(parseInt(cat.id))
      }
    })
    this.setState({spinner: true}, () => {
      CategoryService.updateCustomerCategories(categoryIds)
        .then((res) => {
          this.setState({spinner: false}, () => {
            if (res) {
              CustomerDrawer.current.close()
              EventEmitter.emitter.emit('refreshPromotions')
              setTimeout(() => {
                NavigationService.popToTop()
                setTimeout(() => {
                  ToastService.show('Feed updated with new categories 👏')
                }, 500)
              }, 500)
            }
          })
        })
        .catch((err) => {
          this.setState({spinner: false}, () => {
            setTimeout(() => {
              Alert.alert('Error', err)
            }, 100)
          })
        })
    })
  }

  _fetchCategories = () => {
    CategoryService.getCategories().then((res) => {
      let resCategories = res.data.categories.items
      this.setState({categories: resCategories}, () => {
        this.setState({spinner: false})
      })
    })
  }

  catToggleSelect = (isselect, id) => {
    let {categories} = this.state
    let newTagData = categories.map((el) => (el.id === id ? {...el, isSelected: isselect} : el))
    this.setState({categories: newTagData})
  }

  _keyExtractor = (item) => item.id.toString()
  _renderListItem = (categoryItem) => {
    return <CategoryItemView catItem={categoryItem} catToggleSelect={this.catToggleSelect} />
  }

  isSelectedCat = () => {
    let {categories} = this.state
    let isSlectedItem = false
    categories.map((el) => {
      if (el.isSelected === true) isSlectedItem = true
    })
    return isSlectedItem
  }

  renderScreen() {
    return (
      <View style={Style.screen1Style}>
        <View>
          <Text style={[Style.titleTextStyle, Style.finalScreenTitleStyle]}>
            {translate('selectCategoriesYouWantToSeePromotionsFrom')}
          </Text>
        </View>
        <View style={Style.betweenContainer}>
          <View style={Style.categoryListContainer}>
            {this.state.categories.length > 0 ? (
              <FlatList
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                data={this.state.categories}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderListItem}
                numColumns={4}
              />
            ) : (
              <View>{/*  TODO Change to another way while fetching data */}</View>
            )}
          </View>
          {/* <View style={Style.centerContainer}>
            <ClickableText
              inputText={translate('finish')}
              style={this.isSelectedCat() ? Style.buttonContainer : Style.deactivateButtonContainer}
              textStyle={Style.buttonTextStyle}
              onPress={this.onPressSave}
              editable={!this.isSelectedCat()}
            />
          </View> */}
        </View>
      </View>
    )
  }

  render() {
    return (
      <React.Fragment>
        <Spinner visible={this.state.spinner} />
        <CustomHeader compact leftComponent="back" leftIconPress={this.onPressLeftIcon} />
        {/* <ScrollView
          style={{flex: 1, backgroundColor: 'red'}}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}> */}
        <View style={Style.container}>{this.renderScreen()}</View>
        <CustomButton
          primaryButtonInputText={translate('finish')}
          primaryButtonOnPress={this.onPressSave}
          primaryButtonEditable={!this.isSelectedCat()}></CustomButton>
        {/* </ScrollView> */}
      </React.Fragment>
    )
  }
}

export default CustomerEditCategory
