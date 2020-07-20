import service from '../utils/require'
import base from './base'

export function getHomeMultidata () {
  return service({
    url: `${base.home}/home/multidata`
  })
}

export function getHomeGoods (type, page) {
  return service({
    url: `${base.home}/home/data`,
    params: {
      type: type,
      page: page
    }
  })
}
