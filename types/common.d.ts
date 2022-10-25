declare type BooleanType = '0' | '1' | 0 | 1

declare type ObjectType = Record<string, any>

declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}

declare global {
  const _lodash: typeof lodash
  export default _lodash
}
