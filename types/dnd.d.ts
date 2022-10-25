// import lodash from 'lodash'

interface moduleStyle {
  width: number
  height?: number
}

interface moduleInfoExceptData {
  id: string
  type: string
  label: string
  props: {
    className: string
    style: moduleStyle
  }
}

interface specialCommodityItems {
  code: string
  url: string
  itemDesc: string
  promotionType: string
  price: number
}

interface specialCommodityData {
  specialName: string
  specialNumber: number //指主题品规数量
  specialImg: string
  commodityLayout: string
  numberPerColumn: number
  items: specialCommodityItems[]
}

interface picTextAdsData {
  img: string
  title: string
}

interface richTextData {
  title: string
  content: string
}

interface moduleInfo extends moduleInfoExceptData {
  data: specialCommodityData | picTextAdsData | richTextData
}
