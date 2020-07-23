import require from '../utils/require'

export function getDetails (iid) {
  return require({
    url: '/detail',
    params: {
      iid
    }
  })
}

export function getRecommond () {
  return require({
    url: '/recommend'
  })
}

export class goodsInfo {
  constructor (itemInfo, columns, services) {
    this.title = itemInfo.title
    this.desc = itemInfo.desc
    this.newPrice = itemInfo.price.match(/\d{1,4}/).join('') * 1
    this.oldPrice = itemInfo.oldPrice
    this.discount = itemInfo.discountDesc
    this.columuns = columns
    this.services = services
  }

  say () {
    console.log(this.newPrice, '我是say')
  }
}

export class GoodsParam {
  constructor (info, rule) {
    // 注: images可能没有值(某些商品有值, 某些没有值)
    this.image = info.images ? info.images[0] : ''
    this.infos = info.set
    this.sizes = rule.tables
  }
}

export class shop {
  constructor (shopInfo) {
    this.logo = shopInfo.shopLogo
    this.name = shopInfo.name
    this.fans = shopInfo.cFans
    this.sells = shopInfo.cSells
    this.score = shopInfo.score
    this.goodsCount = shopInfo.cGoods
  }
}

export class cartItem {
  constructor (goodsInfo, img, amount, iid) {
    this.desc = goodsInfo.desc
    this.price = goodsInfo.newPrice
    this.title = goodsInfo.title
    this.image = img
    this.iid = iid
    this.amount = amount
    this.checked = true
  }
}