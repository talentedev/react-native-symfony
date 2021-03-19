import React, {Component} from 'react'
import {Image, Keyboard, StatusBar, StyleSheet, TouchableOpacity, View} from 'react-native'
import {PropTypes} from 'prop-types'
// import debounce from 'lodash.debounce'
import TextTicker from 'react-native-text-ticker'
import {Header, Icon, SearchBar} from 'react-native-elements'
import Svg, {Circle} from 'react-native-svg'
// import DrawerService from 'App/Services/DrawerService'
import NavigationService from 'App/Services/NavigationService'
import {translate} from 'App/Services/TranslationService'
import {CustomerDrawer} from 'App/Containers/CustomerMainScreen/CustomerMainScreen'
import {BusinessDrawer} from 'App/Containers/BusinessMainScreen/BusinessMainScreen'
import {ApplicationStyles, Colors, Fonts, Images, Metrics} from 'App/Theme'
import DrawerService from 'App/Services/DrawerService'
import {NotificationService} from 'App/Services/GraphQL/NotificationService'

export default class CustomHeader extends Component {
  state = {
    search: '',
    headerHeight:
      this.props.compact === true ? Metrics.HEADER_BAR_HEIGHT_COMPACT : Metrics.HEADER_BAR_HEIGHT,
    hasNotification: false,
  }

  componentDidMount() {
    if (
      this.props.rightComponent === 'bell' ||
      this.props.rightComponent === 'bellAndSettings' ||
      this.props.rightComponent === 'bellAndProfile'
    ) {
      NotificationService.getNotifications(1, 0).then((res) => {
        if (res.data.notifications && res.data.notifications.count > 0) {
          this.setState({hasNotification: true})
        }
      })
    }
  }

  backPress = () => {
    NavigationService.pop()
  }

  _renderLeftButton = () => {
    const {leftIconPress} = this.props
    return (
      <View>
        {this.props.leftComponent === 'back' ? (
          <TouchableOpacity
            style={Style.touchableOpacityLeft}
            onPress={leftIconPress || this.backPress}
            activeOpacity={1}>
            <Image source={Images.backIcon} style={ApplicationStyles.backIcon} />
          </TouchableOpacity>
        ) : null}
        {this.props.leftComponent === 'whiteBack' ? (
          <TouchableOpacity
            style={Style.touchableOpacityLeft}
            onPress={leftIconPress || this.backPress}
            activeOpacity={1}>
            <Image source={Images.backIconWhite} style={ApplicationStyles.backIcon} />
          </TouchableOpacity>
        ) : null}
        {this.props.leftComponent === 'menu' ? (
          <TouchableOpacity
            style={Style.touchableOpacityLeft}
            onPress={() => DrawerService.openDrawer()}
            underlayColor={Colors.transparent}>
            <Image fadeDuration={0} source={Images.menu} style={Style.headerIcon} />
          </TouchableOpacity>
        ) : null}
        {this.props.leftComponent === 'BusinessMenu' ? (
          <TouchableOpacity
            style={Style.touchableOpacityLeft}
            onPress={() => BusinessDrawer.current.open()}
            underlayColor={Colors.transparent}>
            <Image fadeDuration={0} source={Images.menu} style={Style.headerIcon} />
          </TouchableOpacity>
        ) : null}
        {this.props.leftComponent === 'CustomerMenu' ? (
          <View style={Style.rowContainer}>
            <TouchableOpacity
              style={Style.touchableOpacityLeft}
              onPress={() => CustomerDrawer.current.open()}
              underlayColor={Colors.transparent}>
              <Image fadeDuration={0} source={Images.menu} style={Style.headerIcon} />
            </TouchableOpacity>
            {this.props.welcomeUser ? (
              <View style={Style.welcomeContainer}>
                <TextTicker
                  style={Style.titleWelcome}
                  duration={10000}
                  bounce={false}
                  loop
                  useNativeDriver
                  repeatSpacer={50}
                  marqueeDelay={3000}>
                  {this.props.title}
                </TextTicker>
                <TextTicker
                  style={Style.subTitleWelcome}
                  duration={10000}
                  bounce={false}
                  loop
                  useNativeDriver
                  repeatSpacer={50}
                  marqueeDelay={3000}>
                  {translate('welcomeMessage')}
                </TextTicker>
              </View>
            ) : (
              <View />
            )}
          </View>
        ) : null}
      </View>
    )
    // if (this.props.leftComponent === 'back') {
    //   return (
    //     <TouchableOpacity
    //       style={Style.touchableOpacityLeft}
    //       onPress={leftIconPress || this.backPress}
    //       activeOpacity={1}>
    //       <Image source={Images.backIcon} style={ApplicationStyles.backIcon} />
    //     </TouchableOpacity>
    //   )
    // } else if (this.props.leftComponent === 'menu') {
    //   return (
    //     <TouchableOpacity
    //       style={Style.touchableOpacityLeft}
    //       onPress={() => DrawerService.openDrawer()}
    //       underlayColor={Colors.transparent}>
    //       <Image fadeDuration={0} source={Images.menu} style={Style.headerIcon} />
    //     </TouchableOpacity>
    //   )
    // } else if (this.props.leftComponent === 'BusinessMenu') {
    //   return (
    //     <TouchableOpacity
    //       style={Style.touchableOpacityLeft}
    //       onPress={() => BusinessDrawer.current.open()}
    //       underlayColor={Colors.transparent}>
    //       <Image fadeDuration={0} source={Images.menu} style={Style.headerIcon} />
    //     </TouchableOpacity>
    //   )
    // } else if (this.props.leftComponent === 'CustomerMenu') {
    //   return (
    //     <View style={Style.rowContainer}>
    //       <TouchableOpacity
    //         style={Style.touchableOpacityLeft}
    //         onPress={() => CustomerDrawer.current.open()}
    //         underlayColor={Colors.transparent}>
    //         <Image fadeDuration={0} source={Images.menu} style={Style.headerIcon} />
    //       </TouchableOpacity>
    //       {this.props.welcomeUser ? (
    //         <View style={Style.welcomeContainer}>
    //           <TextTicker
    //             style={Style.titleWelcome}
    //             duration={10000}
    //             bounce={false}
    //             loop
    //             useNativeDriver
    //             repeatSpacer={50}
    //             marqueeDelay={3000}>
    //             {this.props.title}
    //           </TextTicker>
    //           <TextTicker
    //             style={Style.subTitleWelcome}
    //             duration={10000}
    //             bounce={false}
    //             loop
    //             useNativeDriver
    //             repeatSpacer={50}
    //             marqueeDelay={3000}>
    //             {translate('welcomeMessage')}
    //           </TextTicker>
    //         </View>
    //       ) : (
    //         <View />
    //       )}
    //     </View>
    //   )
    // }
  }

  onPressClearSearch = () => {
    this.setState({
      search: '',
    })
    this.updateSearchResult('')
    Keyboard.dismiss()
  }
  submitEditing = () => {
    const {submitEditing} = this.props
    const {search} = this.state
    if (submitEditing) {
      submitEditing(search)
    }
    // if (search.length > 0) {
    //   this._fetchSearchResultReturn(search)
    // }
  }

  focusInSearch = () => {
    this.props.focusInSearch()
  }
  _renderCenterComponent = (search) => {
    if (this.props.withSearchBar) {
      return (
        <SearchBar
          lightTheme
          placeholder={translate('searchMessage')}
          onChangeText={this.updateSearchResult}
          placeholderStyle={Style.searchBar}
          value={search}
          containerStyle={Style.searchBar}
          inputContainerStyle={{
            backgroundColor: Colors.transparent,
          }}
          onSubmitEditing={this.submitEditing}
          onFocus={this.focusInSearch}
          onSubmit={() => {
            console.log('blur')
          }}
          inputStyle={Style.searchText}
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
    } else if (this.props.withRoundSearchBar) {
      return (
        <SearchBar
          lightTheme
          round
          searchIcon={null}
          containerStyle={Style.roundSearchBar}
          placeholder={translate('searchMessage')}
          placeholderTextColor={Colors.brownGrey}
          onChangeText={this.updateSearchResult}
          onEndEditing={this.submitEditing}
          value={search}
          onSubmitEditing={this.submitEditing}
          onFocus={this.focusInSearch}
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
    } else if (this.props.raiseHand) {
      return (
        <Image
          source={Images.raiseHandWoman}
          style={{
            height: Metrics.applyRatio(24),
            width: Metrics.applyRatio(23),
            marginTop: Metrics.applyRatio(5),
          }}
        />
      )
    } else if (this.props.manRaiseHand) {
      return (
        <Image
          source={Images.raiseHandMan}
          style={{
            height: Metrics.applyRatio(24),
            width: Metrics.applyRatio(23),
            marginTop: Metrics.applyRatio(5),
          }}
        />
      )
    } else if (this.props.withRoundSearchBar) {
      return (
        <SearchBar
          lightTheme
          round
          containerStyle={Style.roundSearchBar}
          placeholder={translate('searchMessage')}
          placeholderTextColor={Colors.brownGrey}
          onChangeText={this.updateSearchResult}
          onEndEditing={this.submitEditing}
          value={search}
          onSubmitEditing={this.submitEditing}
          onFocus={this.focusInSearch}
          inputStyle={Style.roundSearchText}
          inputContainerStyle={{
            backgroundColor: Colors.transparent,
            marginTop: Metrics.applyRatio(-5),
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
    const title = this.props.title
    if (this.props.welcomeUser) {
      return (
        <React.Fragment>
          <View />
        </React.Fragment>
      )
    }
    return (
      <TextTicker
        style={this.props.compact === true ? Fonts.style.smallerTitle : Fonts.style.title}
        bounce={false}
        duration={10000}
        loop
        useNativeDriver
        repeatSpacer={50}
        marqueeDelay={3000}>
        {title}
      </TextTicker>
    )
  }

  _renderRightButton = () => {
    return (
      <View style={Style.viewFlexRow}>
        {this.props.rightComponent === 'bell' ||
        this.props.rightComponent === 'bellAndSettings' ||
        this.props.rightComponent === 'bellAndProfile' ? (
          <TouchableOpacity
            style={[Style.touchableOpacityRight, {paddingRight: Metrics.applyRatio(6)}]}
            underlayColor={Colors.transparent}
            onPress={() => NavigationService.push('NotificationScreen')}
            // onPress={() => Alert.alert('INFO', 'Bell pressed')}
          >
            <View>
              <Image fadeDuration={0} source={Images.bell} style={Style.headerIcon} />
              {this.state.hasNotification ? (
                <Svg style={Style.bellDot} height="10" width="10">
                  <Circle cx="5" cy="5" r="4" fill={Colors.pink} />
                </Svg>
              ) : null}
            </View>
          </TouchableOpacity>
        ) : null}
        {this.props.rightComponent === 'settings' ||
        this.props.rightComponent === 'bellAndSettings' ? (
          <TouchableOpacity
            style={Style.touchableOpacityRight}
            underlayColor={Colors.transparent}
            onPress={() => NavigationService.push('NotificationScreen')}
            // onPress={() => Alert.alert('INFO', 'Settings pressed')}
          >
            <Image fadeDuration={0} source={Images.more} style={Style.headerIcon} />
          </TouchableOpacity>
        ) : (
          <View>
            {this.props.rightComponent === 'bellAndProfile' ? (
              <TouchableOpacity
                style={Style.touchableOpacityRight}
                underlayColor={Colors.transparent}
                onPress={() => NavigationService.push('CustomerSignUpLastStep')}
                // onPress={() => Alert.alert('INFO', 'Settings pressed')}
              >
                <Image fadeDuration={0} source={Images.customerProfile} style={Style.headerIcon} />
              </TouchableOpacity>
            ) : null}
          </View>
        )}
        {this.props.rightComponent === 'edit' ? (
          <TouchableOpacity
            style={Style.touchableOpacityRight}
            underlayColor={Colors.transparent}
            onPress={() =>
              this.props.leftComponent === 'BusinessMenu'
                ? NavigationService.push('BusinessEditProfileScreen')
                : NavigationService.push('CustomerEditProfile')
            }
            // onPress={() => Alert.alert('INFO', 'Edit pressed')}
          >
            <Image fadeDuration={0} source={Images.pencil} style={Style.headerIcon} />
          </TouchableOpacity>
        ) : null}
      </View>
    )
  }

  // _fetchSearchResult = debounce((search) => {
  //   const { onSearchRes } = this.props
  //   SearchService.getSearchResult(search).then((res) => {
  //     if (onSearchRes) {
  //       onSearchRes(res.data)
  //     }
  //   })
  // }, 400)

  updateSearchResult = (search) => {
    this.setState({search})
    // const { onSearchTextChange } = this.props
    // if (onSearchTextChange) {
    //   onSearchTextChange(search)
    // }
    // if (search.length > 0) {
    //   this._fetchSearchResult(search)
    // }
  }

  render() {
    const {search} = this.state
    const sideComponentFlexValue =
      this.props.rightComponent === 'bellAndSettings' ||
      this.props.rightComponent === 'bellAndProfile'
        ? 2
        : 1
    const welcomeUserLeftContent = 8
    const welcomeUserContainerContent = 1
    return (
      <React.Fragment>
        {/* <View style={Style.marginBottomHeader}> */}
        <Header
          barStyle="light-content"
          leftComponent={this._renderLeftButton()}
          centerComponent={this._renderCenterComponent(search)}
          rightComponent={this._renderRightButton()}
          placement={'center'}
          containerStyle={[
            {
              height: this.state.headerHeight,
            },
            // this.props.isShadowView ? {...ApplicationStyles.headerShadow} : '',
            this.props.withGrey
              ? Style.containerStyleGrey
              : this.props.isTransparent
              ? Style.containerStyleTransparent
              : Style.containerStyle,
          ]}
          leftContainerStyle={{
            flex: this.props.welcomeUser ? welcomeUserLeftContent : sideComponentFlexValue,
          }}
          centerContainerStyle={
            this.props.welcomeUser ? {flex: welcomeUserContainerContent} : Style.centerComponent
          }
          rightContainerStyle={[Style.rightComponentStyle, {flex: sideComponentFlexValue}]}
        />
        <StatusBar
          backgroundColor="transparent"
          barStyle="dark-content"
          hidden={false}
          // To hide statusBar
          // Background color of statusBar
          translucent={true}
          // allowing light, but not detailed shapes
          networkActivityIndicatorVisible={true}
        />
        {/* </View> */}
      </React.Fragment>
    )
  }
}

CustomHeader.propTypes = {
  compact: PropTypes.bool,
  //   isShadowView: PropTypes.bool,
  leftComponent: PropTypes.oneOf(['menu', 'back', 'BusinessMenu', 'CustomerMenu', 'whiteBack']),
  rightComponent: PropTypes.oneOf([
    'bell',
    'settings',
    'bellAndSettings',
    'bellAndProfile',
    'edit',
  ]),
  title: PropTypes.string,
  withSearchBar: PropTypes.bool,
  withRoundSearchBar: PropTypes.bool,
  leftIconPress: PropTypes.func,
  bookmarkedPromotions: PropTypes.any,
  withGrey: PropTypes.bool,
  isTransparent: PropTypes.bool,
  welcomeUser: PropTypes.bool,
  submitEditing: PropTypes.func,
  raiseHand: PropTypes.bool,
  manRaiseHand: PropTypes.bool,
  focusInSearch: PropTypes.func,
}

const Style = StyleSheet.create({
  // backIcon: {
  //   height: Metrics.HEADER_ICON_SIZE,
  //   width: Metrics.HEADER_ICON_SIZE,
  // },
  bellDot: {
    position: 'absolute',
    right: -5,
    top: -5,
  },
  centerComponent: {
    flex: 8,
  },
  clearIconStyle: {
    padding: 10,
  },
  containerStyle: {
    backgroundColor: Colors.white,
    borderBottomWidth: 0,
    // height: Metrics.HEADER_BAR_HEIGHT,
  },
  containerStyleGrey: {
    backgroundColor: Colors.white,
    borderBottomLeftRadius: Metrics.applyRatio(26),
    borderBottomRightRadius: Metrics.applyRatio(26),
    borderBottomWidth: 0,
    // height: Metrics.HEADER_BAR_HEIGHT + Metrics.applyRatio(10),
    // overflow: 'hidden',
    // paddingBottom: Metrics.applyRatio(10),
    // borderBottomWidth: 0,
  },
  containerStyleTransparent: {
    backgroundColor: Colors.transparent,
    borderBottomWidth: 0,
  },
  headerIcon: {
    height: Metrics.HEADER_ICON_SIZE,
    width: Metrics.HEADER_ICON_SIZE,
  },
  rightComponentStyle: {
    alignItems: 'flex-end',
    flexDirection: 'row',
  },
  roundSearchBar: {
    backgroundColor: Colors.greyBackground,
    borderBottomWidth: 0,
    borderRadius: Metrics.applyRatio(21),
    borderTopWidth: 0,
    height: Metrics.applyRatio(42),
    justifyContent: 'center',
    marginLeft: Metrics.applyRatio(-40),
    width: Metrics.applyRatio(211),
  },
  roundSearchText: {
    borderRadius: 1,
    color: Colors.brownGrey,
    fontSize: Fonts.size.medium,
    height: Metrics.applyRatio(42),
  },
  rowContainer: {
    flexDirection: 'row',
  },
  searchBar: {
    backgroundColor: Colors.transparent,
    borderBottomWidth: 0,
    borderTopWidth: 0,
    marginLeft: -20,
    marginRight: -20,
    width: '125%',
  },
  searchText: {
    ...Fonts.style.brandName,
    fontSize: Fonts.size.big,
    textAlign: 'left',
  },
  subTitleWelcome: {
    ...Fonts.style.subSectionTitle,
    // marginLeft: Metrics.applyRatio(64),
    marginTop: Metrics.applyRatio(0),
    textAlign: 'left',
  },
  titleWelcome: {
    ...Fonts.style.title,
    alignSelf: 'flex-start',
    color: Colors.blueValidation,
    fontSize: Fonts.size.regular,
    height: Metrics.applyRatio(32),
    marginTop: Metrics.applyRatio(10),
    textAlign: 'left',
  },
  touchableOpacityLeft: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: Metrics.applyRatio(7),
    padding: Metrics.applyRatio(7),
  },
  touchableOpacityRight: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Metrics.applyRatio(10),
    paddingVertical: Metrics.applyRatio(5),
  },
  viewFlexRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  welcomeContainer: {
    alignItems: 'flex-start',
    paddingLeft: Metrics.applyRatio(15),
  },
})
