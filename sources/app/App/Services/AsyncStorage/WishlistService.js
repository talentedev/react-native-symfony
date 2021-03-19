const WISHLIST_KEY = 'wishlist'

const getAllProductIds = () => {
  return global.storage.getIdsForKey(WISHLIST_KEY)
}

const getAllProducts = () => {
  return global.storage.getAllDataForKey(WISHLIST_KEY)
}

const addProduct = (product) => {
  global.storage.save({
    key: WISHLIST_KEY,
    id: product.id,
    data: product,
  })
}

const loadProduct = (id) => {
  global.storage
    .load({
      key: WISHLIST_KEY,
      id: id,
    })
    .then((ret) => {
      // found data goes to then()
      // console.log('Retrieved product id=', ret.wishlist.id)
      return ret
    })
    .catch((err) => {
      // any exception including data not found
      // goes to catch()
      console.warn(err.message)
      switch (err.name) {
        case 'NotFoundError':
          // TODO;
          break
        case 'ExpiredError':
          // TODO
          break
      }
    })
}

const removeProduct = (product) => {
  global.storage.remove({
    key: WISHLIST_KEY,
    id: product.id,
  })
}

export const WishlistService = {
  getAllProductIds,
  getAllProducts,
  addProduct,
  loadProduct,
  removeProduct,
}
