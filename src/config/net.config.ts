type NetConfigSuccessCode = 200 | '200' | '000000' | '0000'
// 正式项目可以选择自己配置成需要的接口地址，如"https://api.xxx.com"
// 问号后边代表开发环境，冒号后边代表生产环境
export const baseURL = `${import.meta.env.VITE_API_URL}`
// 配后端数据的接收方式application/json;charset=UTF-8 或 application/x-www-form-urlencoded;charset=UTF-8
export const contentType = 'application/json;charset=UTF-8'
// 最长请求时间
export const requestTimeout = 180000
// 超时尝试次数
export const timeoutNum = 3
// 超时重新请求间隔
export const intervalTime = 1000
// 操作正常code，支持String、Array、int多种类型
export const successCode: NetConfigSuccessCode[] = [200, '200', '000000', '0000']
// 数据状态的字段名称
export const statusName = 'code'
// 状态信息的字段名称
export const messageName = 'msg'
