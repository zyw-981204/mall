import axios from 'axios'

const require = function (config) {
  const service = axios.create({
    baseURL: 'http://152.136.185.210:8000/api/n3',
    timeout: 5000
  })
  service.interceptors.request.use(config => {
    return config
  }, err => {
    return err
  })
  service.interceptors.response.use(config => {
    return config
  }, err => {
    return err
  })

  return service(config)
}

export default require
// const service = axios.create({
//   baseURL: 'http://123.207.32.32:8000',
//   timeout: 5000
// })
