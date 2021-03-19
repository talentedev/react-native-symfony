import React, {Component} from 'react'
// import { View } from 'react-native'
import DatePicker from 'react-native-date-picker'
import {PropTypes} from 'prop-types'

export default class DatePickerCom extends Component {
  state = {date: new Date()}

  render() {
    return (
      <DatePicker
        // minimumDate="1900-01-01"
        maximumDate={new Date()}
        style={this.props.style}
        locale="en_GB"
        mode="date"
        date={this.state.date}
        onDateChange={(date) => this.setState({date}, this.props.selctedDate(date))}
      />
    )
  }
}

DatePickerCom.propTypes = {
  style: PropTypes.object,
  selctedDate: PropTypes.func,
}
