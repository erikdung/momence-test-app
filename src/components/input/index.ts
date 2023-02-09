import Styled from "styled-components"

import { getColor, getSpacing } from "../../utils/styled"

export const Input = Styled.input`
	font-size: 16px;
	border-radius: ${getSpacing('xs')};
	border: 1px solid ${getColor('purple')};
	background-color: transparent;
	color: ${getColor('white')};
	width: 100%;
	padding: ${getSpacing('s')} ${getSpacing('m')};
	box-sizing: border-box;
	-moz-appearance:none !important;
    -webkit-appearance: none !important;
    appearance: none !important;

	&:focus {
		outline: none;
	}
`