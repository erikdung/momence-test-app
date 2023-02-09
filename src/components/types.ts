export type SpacingT = 'xxs'|'xs'|'s'|'m'|'l'|'xl'|'xxl'

export type AlignT = 'flex-start'|'center'|'flex-end'|'stretch'|'space-between'

export interface IRate {
	country: string
	currency: string
	amount: string
	rate: number
	code: string
}