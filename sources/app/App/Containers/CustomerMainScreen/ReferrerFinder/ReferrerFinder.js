import React, {PureComponent} from 'react'
import {Text, View, Image, FlatList, TouchableOpacity, Keyboard} from 'react-native'
import Style from './ReferrerFinderStyle'
import {Colors, Metrics, Images} from 'App/Theme'
import {translate} from 'App/Services/TranslationService'
import CustomHeader from 'App/Components/CustomHeader'
import CustomButton from 'App/Components/CustomButton/CustomButton'
import {Icon, SearchBar} from 'react-native-elements'
import {PropTypes} from 'prop-types'
import NavigationService from 'App/Services/NavigationService'
import {convertCurrency} from 'App/Services/Utils'
import TextWithBold from 'App/Components/TextWithBold/TextWithBold'

export default class ReferrerFinder extends PureComponent {
  constructor(props) {
    super(props)
    const {itemData, validReferrerList} = this.props.navigation.state.params
    this.state = {
      search: '',
      selectedReferrer: null,
      itemData: itemData,
      referrer: validReferrerList,
      data: validReferrerList,
      validNext: true,
    }
  }

  searchFilterFunction = (text) => {
    this.setState({
      search: text,
    })
    const newData = this.state.referrer.filter((item) => {
      const itemData = `${item.userName.toUpperCase()} ${item.lastname.toUpperCase()} ${item.firstname.toUpperCase()}`
      const textData = text.toUpperCase()
      return itemData.includes(textData)
    })
    this.setState({
      data: newData,
      validNext: this.isUser(text),
    })
  }
  isUser = (text) => {
    const result = this.state.referrer.filter((item) => {
      const itemData = `${item.userName}`
      return text === itemData
    })
    return result.length !== 0 || text === ''
  }
  onPressNext = () => {
    const {itemData, search, referrer} = this.state
    NavigationService.push('RedemptionEnterInfo', {itemData, search, referrer})
  }
  renderListItem = (item) => {
    return (
      <TouchableOpacity onPress={() => this.onSelect(item)}>
        <View style={Style.listItem}>
          <Image
            source={
              item.profileImageUrl
                ? {
                    uri: item.profileImageUrl,
                  }
                : item.civility === 'M'
                ? Images.maleProfile
                : Images.femaleProfile
            }
            style={Style.nameStyle}
          />
          <View style={Style.namesStyle}>
            <Text style={Style.nameBig}>{item.userName}</Text>
            <Text style={Style.nameSmall}>{item.firstname + ' ' + item.lastname}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
  renderNullItem = () => {
    return (
      <View style={Style.nullListItem}>
        <Text style={{...Style.nameBig, color: Colors.grey2}}>{'Referrer Not Found'}</Text>
      </View>
    )
  }
  renderHeader = (search) => {
    return (
      <SearchBar
        lightTheme
        round
        searchIcon={
          <Image
            source={Images.searchHead}
            style={{
              marginLeft: Metrics.applyRatio(8),
              marginRight: Metrics.applyRatio(8),
              width: Metrics.applyRatio(20),
              height: Metrics.applyRatio(20),
              marginTop: Metrics.applyRatio(-5),
            }}
          />
        }
        containerStyle={Style.roundSearchBar}
        placeholder={translate('enterRef')}
        onChangeText={this.searchFilterFunction}
        value={search}
        inputStyle={Style.roundSearchText}
        inputContainerStyle={{
          backgroundColor: Colors.transparent,
        }}
        clearIcon={
          search.length > 0 && (
            <Icon
              name="close"
              color={Colors.black3}
              type="material"
              size={20}
              underlayColor={Colors.white}
              iconStyle={Style.clearIconStyle}
              onPress={this.onPressClearSearch}
            />
          )
        }
      />
    )
  }
  renderSeparator = () => {
    return <View style={Style.separatorStyle} />
  }
  onPressClearSearch = () => {
    this.setState({
      search: '',
    })
    this.searchFilterFunction('')
    Keyboard.dismiss()
  }
  onSelect = (userItem) => {
    const {itemData, referrer} = this.state
    this.setState({
      search: userItem.userName,
      selectedReferrer: userItem,
    })
    this.searchFilterFunction(userItem.userName)
    Keyboard.dismiss()
    NavigationService.push('RedemptionEnterInfo', {
      itemData: itemData,
      search: userItem.userName,
      selectedReferrer: userItem,
      referrer: referrer,
    })
  }
  _keyExtractor = (item) => item.id.toString()
  render() {
    const {data, search, itemData} = this.state
    return (
      <View style={[Style.listViewItem, Style.container]}>
        <CustomHeader leftComponent="back" title="Who's Your Referrer?" />
        <Text style={Style.subtitleStyle}>
          <TextWithBold
            fullTxt={translate('slectingReferrer', {x: convertCurrency(itemData.referrerShare)})}
            boldTxtStyle={{color: Colors.black}}
            boldTxtList={['$' + convertCurrency(itemData.referrerShare)]}
          />
        </Text>
        <View style={Style.contentView}>
          <View
            style={{
              ...Style.stretchableView,
              height: Metrics.applyRatio(
                data
                  ? data.length === 0
                    ? search === ''
                      ? 55
                      : 237
                    : data.length === 1
                    ? 122
                    : data.length === 2
                    ? 177
                    : 237
                  : 55,
              ),
            }}>
            {data ? (
              data.length === 0 ? (
                <FlatList
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={false}
                  keyExtractor={this._keyExtractor}
                  data={[
                    {
                      id: 'noData',
                    },
                  ]}
                  renderItem={this.renderNullItem}
                  ListHeaderComponent={this.renderHeader(search)}
                  ItemSeparatorComponent={this.renderSeparator}
                  keyboardShouldPersistTaps="handled"
                />
              ) : (
                <FlatList
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={false}
                  keyExtractor={this._keyExtractor}
                  data={data}
                  renderItem={(item) => this.renderListItem(item.item)}
                  ListHeaderComponent={this.renderHeader(search)}
                  ItemSeparatorComponent={this.renderSeparator}
                  keyboardShouldPersistTaps="handled"
                />
              )
            ) : (
              <View />
            )}
          </View>
          <View style={Style.marginTopBtn}>
            <CustomButton
              primaryButtonInputText={translate('next')}
              primaryButtonOnPress={this.onPressNext}
              primaryButtonEditable={!this.state.validNext}
            />
          </View>
        </View>
        {/* <TouchableOpacity
          style={[Style.validationButton, this.state.validNext ? '' : Style.inactiveButton]}
          onPress={this.onPressNext}
          disabled={!this.state.validNext}>
          <Text style={Style.validationText}>{translate('next')}</Text>
        </TouchableOpacity> */}
      </View>
    )
  }
}
ReferrerFinder.propTypes = {
  navigation: PropTypes.object,
}
