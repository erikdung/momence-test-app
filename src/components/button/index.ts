import Styled from "styled-components"
import { getSpacing, getColor } from "../../utils/styled"

interface IProps {
	fullWidth?: boolean
}

export const Button = Styled.button<IProps>`
	color: ${getColor('white')};
	background-color: ${getColor('purple')};
	padding: ${getSpacing('s')};
	width: ${(props) => props.fullWidth ? '100%' : 'auto'};
	border: 0;
	border-radius: ${getSpacing('xs')};
	font-size: 1rem;

	&:disabled {
		opacity: 0.5;
	}
`