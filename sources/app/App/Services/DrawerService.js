/**
 * The drawer is implemented as a service so that it can be used outside of components, for example in sagas.
 *
 */

let drawer

/**
 * Temporary solution, maybe enhance this in the future
 */
function setDrawer(drawerRef) {
  drawer = drawerRef
}

function openDrawer() {
  drawer.openDrawer()
}

function closeDrawer() {
  drawer.closeDrawer()
}

export default {
  setDrawer,
  openDrawer,
  closeDrawer,
}
