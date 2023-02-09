import Styled from 'styled-components'

const Wrapper = Styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
`

export default function Loader () {
	return <Wrapper>Loading data...</Wrapper>
}