import Styled from "styled-components"

import { getColor, getSpacing } from "../../utils/styled"

export const Select = Styled.select`
font-size: 16px;
border-radius: ${getSpacing('xs')};
border: 1px solid ${getColor('purple')};
background-color: transparent;
color: ${getColor('white')};
width: 100%;
padding: ${getSpacing('s')} ${getSpacing('m')};
box-sizing: border-box;
background: url("data:image/svg+xml,<svg height='10px' width='10px' viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'><path d='M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/></svg>") no-repeat;
background-position: calc(100% - 0.75rem) center !important;
-moz-appearance:none !important;
-webkit-appearance: none !important;
appearance: none !important;

&:focus {
	outline: none;
}
`