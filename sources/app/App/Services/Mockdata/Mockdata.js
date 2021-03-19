import pendingApplyHistoryRedemption from './pendingApplyHistoryRedemption.json'
import pendingOnlineRedemptions from './pendingOnlineRedemptions.json'

const getPendingRefersForBecomingReferrer = () => {
  return pendingApplyHistoryRedemption
}

const getPendingOnlineRedemptions = () => {
  return pendingOnlineRedemptions
}

export const Mockdata = {
  getPendingRefersForBecomingReferrer,
  getPendingOnlineRedemptions,
}
