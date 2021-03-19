import React, {Component} from 'react'
import {FlatList, Image, Keyboard, Text, TouchableOpacity, View} from 'react-native'
import NavigationService from 'App/Services/NavigationService'
import Style from './CustomerSignUpStyle'
import {translate} from 'App/Services/TranslationService'
import CustomHeader from 'App/Components/CustomHeader'
import CustomButton from 'App/Components/CustomButton/CustomButton'
import {Colors, Images, Metrics, Fonts} from 'App/Theme'
import {UserService} from 'App/Services/GraphQL/UserService'
import {Icon, SearchBar} from 'react-native-elements'
import {PropTypes} from 'prop-types'

export default class CustomerSignUpLastStep extends Component {
  constructor(props) {
    super(props)
    this.state = {
      search: '',
      allReferrer: [],
      data: [],
      loading: true,
      validNext: false,
    }
    this._fetchCustomer()
  }
  onPressNext = () => {
    NavigationService.navigateAndReset('CustomerMainScreen')
  }
  onPressFind = () => {
    NavigationService.push('CustomerSelfScreen', {search: this.state.data[0].id})
  }
  _fetchCustomer = () => {
    UserService.getAllCustomers().then((res) => {
      const excludeSelf = res.data.customers.items.filter(
        (item) => item.userName !== this.props.navigation.getParam('userName'),
      )
      this.setState({allReferrer: excludeSelf})
    })
  }

  searchFilterFunction = (text) => {
    this.setState({
      search: text,
    })
    const newData = this.state.allReferrer.filter((item) => {
      const itemData = `${item.userName.toUpperCase()} ${item.lastname.toUpperCase()} ${item.firstname.toUpperCase()}`
      const textData = text.toUpperCase()
      return itemData.includes(textData)
    })
    this.setState({
      data: text === '' ? [] : newData.length > 3 ? newData.slice(0, 3) : newData,
      validNext: this.isUser(text),
    })
  }
  isUser = (text) => {
    const result = this.state.allReferrer.filter((item) => {
      const itemData = `${item.userName}`
      return text === itemData
    })
    return result.length !== 0 && text !== ''
  }
  renderListItem = (item) => {
    return (
      <TouchableOpacity onPress={() => this.onSelect(item.id, item.userName)}>
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
        searchIcon={<Image source={Images.searchHead} style={Style.searchHead} />}
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
  onSelect = (id, name) => {
    this.setState({
      search: name,
    })
    this.searchFilterFunction(name)
    Keyboard.dismiss()
    NavigationService.push('CustomerSelfScreen', {search: id})
  }
  _keyExtractor = (item) => item.id

  render() {
    const {data, search} = this.state
    return (
      <React.Fragment>
        <CustomHeader compact leftComponent="back" raiseHand />
        <View style={Style.container}>
          <View style={[Style.container, Style.screen1Style]}>
            <View>
              <Text style={Style.stepTextStyle}>{translate('redeemOffer')}</Text>
              <Text
                style={[
                  Style.titleTextStyle,
                  {marginTop: Metrics.applyRatio(10), marginBottom: Metrics.applyRatio(-10)},
                ]}>
                {translate('whoReferrer')}
              </Text>
              <Text style={[Style.innerTxt, {fontSize: Fonts.size.medium}]}>
                {translate('findRef')}{' '}
              </Text>
            </View>

            <View style={{height: Metrics.applyRatio(300)}}>
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
            </View>
          </View>
          <View style={Style.btnMargin}>
            <CustomButton
              primaryButtonInputText={translate('next')}
              primaryButtonEditable={!this.state.validNext}
              primaryButtonOnPress={this.onPressFind}></CustomButton>
          </View>
        </View>
      </React.Fragment>
    )
  }
}
CustomerSignUpLastStep.propTypes = {
  navigation: PropTypes.object,
}
