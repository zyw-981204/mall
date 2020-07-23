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