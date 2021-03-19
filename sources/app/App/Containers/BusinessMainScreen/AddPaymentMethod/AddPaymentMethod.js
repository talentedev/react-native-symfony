import React from 'react'
import {Alert, KeyboardAvoidingView, Text, TextInput, View} from 'react-native'
import CustomHeader from 'App/Components/CustomHeader'
import ValidationButton from 'App/Components/ValidationButton/ValidationButton'
import Style from './AddPaymentMethodStyle'
import {translate} from 'App/Services/TranslationService'
import creditCardType from 'credit-card-type'
import {Config} from 'App/Config'

import stripe from 'tipsi-stripe'
import {BusinessService} from 'App/Services/GraphQL/BusinessService'
import {BusinessDrawer} from 'App/Containers/BusinessMainScreen/BusinessMainScreen'
import Spinner from 'react-native-loading-spinner-overlay'
import ToastService from 'App/Services/ToastService'
import NavigationService from 'App/Services/NavigationService'

stripe.setOptions({
  publishableKey: Config.STRIPE_PUBLISHABLE_KEY,
})

export default class AddPaymentMethod extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      hasExistingCard: false,
      isChangingCard: false,
      cardNum1: '',
      cardNum2: '',
      cardNum3: '',
      cardNum4: '',
      last4: '',
      cardMon: '',
      cardYear: '',
      cardCSV: '',
      cardType: 'visa', // TODO
      loading: true,
    }
    BusinessService.getLoggedBusinessPayment()
      .then((res) => {
        const last4 = res.data.loggedBusinessPayment
          ? res.data.loggedBusinessPayment.stripeCardLast4
          : null
        if (last4) {
          this.setState({
            hasExistingCard: true,
            last4: last4,
          })
        }
      })
      .finally(() => {
        this.setState({
          loading: false,
        })
      })
  }

  canUpdate = () => {
    const {
      isChangingCard,
      cardNum1,
      cardNum2,
      cardNum3,
      cardNum4,
      cardMon,
      cardYear,
      cardCSV,
    } = this.state
    return (
      isChangingCard &&
      ![cardNum1, cardNum2, cardNum3, cardNum4, cardMon, cardYear, cardCSV].includes('')
    )
  }

  inputs = {}

  saveCard = () => {
    if (!this.canUpdate()) {
      return
    }
    const {cardNum1, cardNum2, cardNum3, cardNum4, cardMon, cardYear, cardCSV} = this.state
    console.log(cardNum1, cardNum2, cardNum3, cardNum4, cardMon, cardYear, cardCSV)
    this.setState({loading: true}, () => {
      const params = {
        // mandatory
        number: cardNum1 + cardNum2 + cardNum3 + cardNum4 || '',
        expMonth: parseInt(cardMon, 10) || 0,
        expYear: parseInt(cardYear, 10) || 0,
        cvc: cardCSV,
        // // optional
        // name: 'Test User',
        currency: 'hkd',
        // addressLine1: '123 Test Street',
        // addressLine2: 'Apt. 5',
        // addressCity: 'Test City',
        // addressState: 'Test State',
        // addressCountry: 'Test Country',
        // addressZip: '55555',
      }
      console.log(params)
      stripe
        .createTokenWithCard(params)
        .then((data) => {
          const stripeTokenId = data.tokenId
          BusinessService.updateLoggedBusinessPayment(stripeTokenId)
            .then((res) => {
              if (res.data.updateLoggedBusinessPayment) {
                BusinessDrawer.current.close()
                setTimeout(() => {
                  this.setState(
                    {
                      last4: cardNum4,
                      hasExistingCard: true,
                      loading: false,
                    },
                    () => {
                      NavigationService.pop()
                      ToastService.show('Card saved !')
                    },
                  )
                }, 1000)
              }
            })
            .catch(() => {
              this.setState(
                {
                  loading: false,
                },
                () =>
                  setTimeout(() => {
                    Alert.alert(translate('errors.error'), translate('errors.pleaseRetryLater'))
                  }, 100),
              )
            })
        })
        .catch((err) => {
          console.log(err.message)
          this.setState(
            {
              loading: false,
            },
            () =>
              setTimeout(() => {
                Alert.alert(translate('errors.error'), translate('errors.incorrectCardDetails'))
              }, 100),
          )
        })
    })
  }

  goToUpdateCard = () => {
    this.setState({
      isChangingCard: true,
      cardNum1: '',
      cardNum2: '',
      cardNum3: '',
      cardNum4: '',
      cardMon: '',
      cardYear: '',
      cardCSV: '',
    })
  }

  changeText(cardValue, refer) {
    if (cardValue.length >= 4) {
      this.inputs[refer].focus()
    }
  }

  updateCardDate(dateType, value, targetRef) {
    if (dateType === 'mon') {
      if (value * 1 <= 12) {
        this.setState({
          cardMon: value,
        })
        if (value.length >= 2) {
          this.inputs[targetRef].focus()
        }
      }
    } else if (dateType === 'year') {
      let curYear = new Date().getYear() - 101
      let curMonth = new Date().getMonth() + 1
      let firstYearNum = curYear.toString().substring(0, 1)

      if (value.length <= 1) {
        if (value * 1 >= firstYearNum * 1) {
          this.setState({
            cardYear: value,
          })
        } else {
          this.setState({
            cardYear: '',
          })
        }
      } else {
        if (value * 1 > curYear) {
          this.setState({
            cardYear: value,
          })
          this.inputs[targetRef].focus()
        } else if (value * 1 === curYear) {
          if (this.state.cardMon * 1 > curMonth) {
            this.setState({
              cardYear: value,
            })
            this.inputs[targetRef].focus()
          }
        }
      }
    }
  }

  checkCardType(cardNumber) {
    let self = this
    if (cardNumber.length >= 4) {
      creditCardType(cardNumber).filter(function(card) {
        self.setState({
          cardType: card.type,
        })
      })
    }
  }

  cleanCard(step) {
    this.setState({
      isChangingCard: true,
    })
    // if (step === 1) {
    //   this.setState({
    //     cardNum2: '',
    //     cardNum3: '',
    //     cardNum4: '',
    //   })
    // } else if (step === 2) {
    //   this.setState({
    //     cardNum3: '',
    //     cardNum4: '',
    //   })
    // } else if (step === 3) {
    //   this.setState({
    //     cardNum4: '',
    //   })
    // }
  }

  cleanCardDate(step) {
    this.setState({
      isChangingCard: true,
    })

    // if (step === 1) {
    //   this.setState({
    //     cardYear: '',
    //     cardCSV: '',
    //   })
    // } else if (step === 2) {
    //   this.setState({
    //     cardCSV: '',
    //   })
    // }
  }

  render() {
    let {
      hasExistingCard,
      isChangingCard,
      cardNum1,
      cardNum2,
      cardNum3,
      cardNum4,
      cardMon,
      cardYear,
      cardCSV,
      loading,
      last4,
    } = this.state
    const canUpdate = this.canUpdate()
    return (
      <React.Fragment>
        <View style={Style.container}>
          <Spinner visible={loading} />
          <CustomHeader
            leftComponent="back"
            leftIconPress={this.onPressLeftIcon}
            title={translate('addPaymentMethod')}
          />
          <View style={Style.headerTextContainer}>
            <Text style={Style.headerText}>{translate('addPaymentTitle')}</Text>
            <View>
              <Text style={Style.inputHeader}>{translate('cardNumber')}</Text>
            </View>
            <View style={Style.cardNumContent}>
              <TextInput
                style={Style.cardInputItem}
                keyboardType="number-pad"
                value={isChangingCard ? cardNum1 : hasExistingCard ? 'XXXX' : ''}
                onFocus={() => this.cleanCard(1)}
                onChangeText={(cardNum1) => {
                  this.setState({cardNum1})
                  this.changeText(cardNum1, 'second')
                }}
                maxLength={4}
                ref={(input) => {
                  this.inputs['first'] = input
                }}
              />

              <TextInput
                style={Style.cardInputItem}
                keyboardType="number-pad"
                value={isChangingCard ? cardNum2 : hasExistingCard ? 'XXXX' : ''}
                onFocus={() => this.cleanCard(2)}
                onChangeText={(cardNum2) => {
                  this.setState({cardNum2})
                  this.changeText(cardNum2, 'third')
                }}
                maxLength={4}
                ref={(input) => {
                  this.inputs['second'] = input
                }}
                onKeyPress={({nativeEvent}) => {
                  if (nativeEvent.key === 'Backspace' && cardNum2 === '') {
                    this.inputs['first'].focus()
                  }
                }}
              />

              <TextInput
                style={Style.cardInputItem}
                keyboardType="number-pad"
                value={isChangingCard ? cardNum3 : hasExistingCard ? 'XXXX' : ''}
                onFocus={() => this.cleanCard(3)}
                onChangeText={(cardNum3) => {
                  this.setState({cardNum3})
                  this.changeText(cardNum3, 'fourth')
                }}
                maxLength={4}
                ref={(input) => {
                  this.inputs['third'] = input
                }}
                onKeyPress={({nativeEvent}) => {
                  if (nativeEvent.key === 'Backspace' && cardNum3 === '') {
                    this.inputs['second'].focus()
                  }
                }}
              />

              <TextInput
                style={Style.cardInputItem}
                keyboardType="number-pad"
                value={isChangingCard ? cardNum4 : last4}
                onFocus={() => this.cleanCard(3)}
                onChangeText={(cardNum4) => {
                  this.setState({cardNum4})
                  this.changeText(cardNum4, 'month')
                  this.checkCardType(cardNum4)
                }}
                maxLength={4}
                ref={(input) => {
                  this.inputs['fourth'] = input
                }}
                onKeyPress={({nativeEvent}) => {
                  if (nativeEvent.key === 'Backspace' && cardNum4 === '') {
                    this.inputs['third'].focus()
                  }
                }}
              />
            </View>

            <View style={Style.cardNumContent}>
              <View>
                <Text style={Style.cardDetailText}>{translate('month')}</Text>
                <TextInput
                  style={Style.cardInputItem}
                  keyboardType="number-pad"
                  value={isChangingCard ? cardMon : hasExistingCard ? 'XX' : ''}
                  onFocus={() => this.cleanCardDate(1)}
                  onChangeText={(cardMon) => this.updateCardDate('mon', cardMon, 'year')}
                  maxLength={2}
                  ref={(input) => {
                    this.inputs['month'] = input
                  }}
                  onKeyPress={({nativeEvent}) => {
                    if (nativeEvent.key === 'Backspace' && cardMon === '') {
                      this.inputs['fourth'].focus()
                    }
                  }}
                />
              </View>

              <View>
                <Text style={Style.cardDetailText}>{translate('year')}</Text>
                <TextInput
                  style={Style.cardInputItem}
                  keyboardType="number-pad"
                  value={isChangingCard ? cardYear : hasExistingCard ? 'XX' : ''}
                  onFocus={() => this.cleanCardDate(2)}
                  onChangeText={(cardYear) => this.updateCardDate('year', cardYear, 'csv')}
                  maxLength={2}
                  ref={(input) => {
                    this.inputs['year'] = input
                  }}
                  onKeyPress={({nativeEvent}) => {
                    if (nativeEvent.key === 'Backspace' && cardYear === '') {
                      this.inputs['month'].focus()
                    }
                  }}
                />
              </View>

              <View>
                <Text style={Style.cardDetailText}>{translate('csv')}</Text>
                <TextInput
                  style={Style.cardInputItem}
                  keyboardType="number-pad"
                  value={isChangingCard ? cardCSV : hasExistingCard ? 'XXX' : ''}
                  onFocus={() => this.cleanCardDate(3)}
                  onChangeText={(cardCSV) => this.setState({cardCSV})}
                  maxLength={4}
                  ref={(input) => {
                    this.inputs['csv'] = input
                  }}
                  onKeyPress={({nativeEvent}) => {
                    if (nativeEvent.key === 'Backspace' && cardCSV === '') {
                      this.inputs['year'].focus()
                    }
                  }}
                />
              </View>
            </View>
          </View>

          <KeyboardAvoidingView style={Style.nextContainer} behavior="padding" enabled>
            <Text style={Style.headerText}>
              {translate('paymentPending')} <Text style={Style.boldText}>$100</Text>
            </Text>
            <ValidationButton
              text={translate('saveCard')}
              style={
                !isChangingCard || !canUpdate
                  ? Style.validationInactiveButton
                  : Style.validationButton
              }
              textStyle={Style.validationText}
              onPress={this.saveCard}
              disabled={!isChangingCard || !canUpdate}
              activeOpacity={!isChangingCard || !canUpdate ? 1 : 0.2}
            />
          </KeyboardAvoidingView>
        </View>
      </React.Fragment>
    )
  }
}
