import request from '@/utils/request'

// get
const get = (params: ObjectType) => {
  return request({
    url: '',
    method: 'GET',
    params,
  })
}
// put
const put = (data: Record<string, any>) => {
  return request({
    url: '',
    method: 'PUT',
    data,
  })
}

// post
const post = (data: string[]) => {
  return request({
    url: '',
    method: 'POST',
    data,
  })
}

export const ApiUser = {
  get,
  put,
  post,
}
