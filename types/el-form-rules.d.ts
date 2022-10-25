import { RuleItem } from 'async-validator'

interface ElRuleItem extends RuleItem {
  trigger?: 'blur' | 'change'
}

export declare type ElRule = ElRuleItem | ElRuleItem[]
export declare type ElRules = Record<string, ElRule>
