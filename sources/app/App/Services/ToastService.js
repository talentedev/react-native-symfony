import Toast from 'App/Components/CustomToast/Toast'
import Metrics from 'App/Theme/Metrics'

function show(message, duration = 2000) {
  Toast.show(message, {
    duration: duration,
    position: -Metrics.applyRatio(110), // bottom side
    shadow: true,
    animation: false,
    hideOnPress: true,
    backgroundColor: 'white',
    textColor: 'black',
    delay: 0,
    opacity: 100,

    onShow: () => {
      // calls on toast`s appear animation start
    },
    onShown: () => {
      // calls on toast`s appear animation end.
    },
    onHide: () => {
      // calls on toast`s hide animation start.
    },
    onHidden: () => {
      // calls on toast`s hide animation end.
    },
  })
}

export default {
  show,
}
