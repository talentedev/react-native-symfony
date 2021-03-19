const SMS_SIGN_IN_DATA_KEY = 'smsSignInToken'

const getSmsSignInData = () => {
  return global.storage
    .load({
      key: SMS_SIGN_IN_DATA_KEY,
    })
    .then((smsSignInData) => {
      // found data goes to then()
      return smsSignInData
    })
    .catch((err) => {
      // any exception including data not found
      // goes to catch()
      // console.warn(err.message)
      switch (err.name) {
        case 'NotFoundError':
          return null
        case 'ExpiredError':
          return null
      }
    })
}

const setSmsSignInData = (countryCode, number, smsSignInToken) => {
  return global.storage.save({
    key: SMS_SIGN_IN_DATA_KEY,
    data: {
      countryCode: countryCode,
      number: number,
      smsSignInToken: smsSignInToken,
    },
  })
}

const resetSmsSignInData = () => {
  return global.storage.save({
    key: SMS_SIGN_IN_DATA_KEY,
    data: {
      countryCode: null,
      number: null,
      smsSignInToken: null,
    },
  })
}

export const TokenService = {
  getSmsSignInData,
  setSmsSignInData,
  resetSmsSignInData,
}
