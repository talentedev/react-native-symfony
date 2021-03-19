export const validateEmail = (email) => {
  let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(email)
}

// export const isUrlValid = (userInput) => {
//   var res = userInput.match(
//     /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/g,
//   )
//   if (res == null) return false
//   else return true
// }

export const isFacebookUrlValid = (userInput) => {
  let res = /(?:https?:\/\/)?(?:www\.)?(mbasic.facebook|m\.facebook|facebook|fb)\.(com|me)\/(?:(?:\w\.)*#!\/)?(?:pages\/)?(?:[\w\-.]*\/)*([\w\-.]*)/gi
  return res.test(userInput) || userInput === '' || userInput === null
}

// Also used for normal username
export const isInstagramUsernameValid = (userInput) => {
  let res = /^([a-z0-9._]){0,29}$/gi
  return res.test(userInput) || userInput === '' || userInput === null
}

export const checkInstaUsernameAndFacebookUrl = (instagramUsername, facebookUrl) => {
  return isInstagramUsernameValid(instagramUsername) && isFacebookUrlValid(facebookUrl)
}
