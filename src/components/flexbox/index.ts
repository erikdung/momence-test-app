import Styled from 'styled-components'

import { AlignT, SpacingT } from '../types'
import { getSpacing } from '../../utils/styled'

interface IProps {
	gap?: SpacingT
	margin?: SpacingT
	padding?: SpacingT
	align?: AlignT
	justify?: AlignT
	grow?: 1|0
}

export const Row = Styled.div<IProps>`
	display: flex;
	gap: ${(props) => props.gap ? getSpacing(props.gap) : 'auto'};
	margin: ${(props) => props.margin ? getSpacing(props.margin) : 0};
	padding: ${(props) => props.padding ? getSpacing(props.padding) : 0};
	align-items: ${(props) => props.align ? props.align : 'auto'};
	justify-content: ${(props) => props.justify ? props.justify : 'auto'};
	flex-grow: ${(props) => props.grow !== undefined ? props.grow : 'auto'};
`

export const Col = Styled(Row)`
	flex-direction: column;
`