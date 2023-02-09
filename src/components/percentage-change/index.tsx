import Styled from 'styled-components'

interface IProps {
	currentRate: number
	baseRate: number
}

const Text = Styled.span<{positive: boolean}>`
	color: ${props => props.positive ? 'green' : 'red'}
`

export default function PercentageChange(props: IProps) {
	const change = Math.round((1 - props.currentRate / props.baseRate) * 100 * 100) / 100
	if (!change) return <span>0 %</span>
	return <Text positive={change > 0}>{change > 0 ? '+' : ''}{change} %</Text>
}