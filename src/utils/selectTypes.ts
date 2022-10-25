/*通用状态*/
export const commonStatus = (firstName = '启用', secondName = '禁用') => {
  return [
    {
      label: firstName,
      value: '0',
    },
    {
      label: secondName,
      value: '1',
    },
  ]
}
/*时间间隔*/
export const timeSpace = [
  {
    label: '1分钟',
    value: 1,
  },
  {
    label: '2分钟',
    value: 2,
  },
  {
    label: '5分钟',
    value: 5,
  },
  {
    label: '10分钟',
    value: 10,
  },
  {
    label: '15分钟',
    value: 15,
  },
  {
    label: '30分钟',
    value: 30,
  },
  {
    label: '60分钟',
    value: 60,
  },
  {
    label: '120分钟',
    value: 120,
  },
]
