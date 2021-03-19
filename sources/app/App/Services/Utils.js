import InAppBrowserService from 'App/Services/InAppBrowserService'
import {Platform} from 'react-native'
export const dateDiffInDays = (date1, date2) => {
  const dt1 = new Date(date1)
  const dt2 = new Date(date2)
  return Math.ceil(
    (Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) -
      Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) /
      (1000 * 60 * 60 * 24),
  )
}
export const convertCurrency = (amount) => {
  const num = Number(amount)
  if (Number.isInteger(num)) {
    return num
  }
  return num.toFixed(2)
}
export const onlinePromoBoxClick = (promoItem) => {
  if (promoItem.isWebUrl) {
    InAppBrowserService.openInAppBrowserLink(promoItem.business.websiteUrl)
  } else {
    const url = Platform.select({
      ios: promoItem.business.appleStoreUrl
        ? promoItem.business.appleStoreUrl
        : promoItem.business.playStoreUrl,
      android: promoItem.business.playStoreUrl
        ? promoItem.business.playStoreUrl
        : promoItem.business.appleStoreUrl,
    })
    InAppBrowserService.openInAppBrowserLink(url)
  }
}
