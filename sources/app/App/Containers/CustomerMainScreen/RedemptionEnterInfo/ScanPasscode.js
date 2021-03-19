import React from 'react'
import {View} from 'react-native'
import Style from './RedemptionEnterInfoStyle'
import CustomHeader from 'App/Components/CustomHeader'
import {PropTypes} from 'prop-types'
import NavigationService from 'App/Services/NavigationService'
import QRCodeScanner from 'react-native-qrcode-scanner'

export default class ScanPasscode extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      passcode: '',
    }
  }
  componentDidMount() {}

  onSuccess = (e) => {
    const {itemData, search, popIndex, selectedReferrer} = this.props.navigation.state.params
    if (this.state.passcode === '') {
      this.setState({
        passcode: e.data,
      })
      NavigationService.push('RedemptionEnterInfo', {
        itemData: itemData,
        search: search,
        scanCode: e.data,
        popIndex: popIndex + 1,
        selectedReferrer: selectedReferrer,
      })
    }
  }

  render() {
    return (
      <View style={Style.container}>
        <React.Fragment>
          <View style={Style.container}>
            <CustomHeader leftComponent="back" />
            <View style={Style.scrollContainer}>
              <QRCodeScanner
                ref={(node) => {
                  this.scanner = node
                }}
                onRead={this.onSuccess}
                // reactivate={true}
                // reactivateTimeout={1}
              />
            </View>
          </View>
        </React.Fragment>
      </View>
    )
  }
}

ScanPasscode.propTypes = {
  navigation: PropTypes.object,
}
