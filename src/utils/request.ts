import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import qs from 'qs'
import {
  baseURL,
  contentType,
  messageName,
  requestTimeout,
  statusName,
  successCode,
} from '@/config/net.config'
import router from '@/router/router'

const CODE_MESSAGE2: Record<string, string> = {
  '0000': '服务器成功返回请求数据',
  '0002': '新建或修改数据成功',
  '401': '用户Token失效，请重新登录',
  '403': '用户没有该操作权限',
  '-1': '服务接口未知错误',
}

const service = axios.create({
  baseURL: baseURL, // url = base api url + request url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: requestTimeout, // request timeout
  headers: {
    'Content-Type': contentType,
  },
  paramsSerializer: params => {
    if (params) {
      return qs.stringify(
        Object.keys(params).reduce((obj, key) => {
          const val = params[key]
          if (val !== '') {
            obj[key] = val
          }
          return obj
        }, {})
      )
    } else {
      return params
    }
  },
  // transformRequest: (data) => {
  //   return data ? qs.stringify(data) : data
  // },
})

interface BaseResponse<T = any> {
  code: number
  data: T
  msg: string
  [propName: string]: any
}

// request拦截器 request interceptor
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const headers = { ...config.headers }
    if (config.data && config.data.contentType) {
      headers['Content-Type'] = config.data.contentType
    }

    config.headers = {
      Authorization: 'test1231',
      ...headers,
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// response拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    return handleResponse(response)
  },
  error => {
    const { response } = error
    if (response === undefined) {
      return Promise.reject(new Error(error))
    } else {
      return handleResponse(response)
    }
  }
)

function handleResponse(response: AxiosResponse) {
  responseLog(response)
  const { data, status, statusText, config } = response
  const code = data && data[statusName] ? data[statusName] : status

  switch (code) {
    case '0000':
      return Promise.resolve(response)
    case '0002':
      return Promise.resolve(response)
    case '307':
      // 记录不存在或版本不一致，需重新获取DM单数据
      return Promise.resolve(response)
    case '401':
      // Token失效 退出登录
      return router.replace('/login')
    case '403':
      if (config.url === '/menu/queryCurrentUserMenuList') {
        // 没有菜单权限 跳转403页面
        // 需要将所有参数置空
        router.replace('/403')
      }
      break
  }

  // 异常处理
  const errMsg =
    data && data[messageName]
      ? data[messageName]
      : CODE_MESSAGE2[code]
        ? CODE_MESSAGE2[code]
        : statusText
  return Promise.reject(errMsg)
}

/**
 * 响应日志
 * @protected
 * @param response
 */
function responseLog(response: AxiosResponse) {
  // console.log(`response:`, response)
  const randomColor = `rgba(${Math.round(Math.random() * 255)},${Math.round(
    Math.random() * 255
  )},${Math.round(Math.random() * 255)})`
  // console.log(
  //   '%c┍------------------------------------------------------------------┑',
  //   `color:${randomColor};`
  // )
  // console.log('| 请求地址：', response.config.url)
  // console.log('| 请求参数：', qs.parse(response.config.data))
  // console.log('| 返回数据：', response.data)
  // console.log(
  //   '%c┕------------------------------------------------------------------┙',
  //   `color:${randomColor};`
  // )
}

const request = <T = any>(config: AxiosRequestConfig): Promise<BaseResponse<T>> => {
  return new Promise((resolve, reject) => {
    service
      .request<BaseResponse<T>>(config)
      .then(res => resolve(res.data))
      .catch(err => reject(err))
  })
}

export default request
