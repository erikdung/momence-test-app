import React from 'react'
import Styled, { ThemeProvider, createGlobalStyle } from 'styled-components'
import { QueryClientProvider, QueryClient } from 'react-query'

import { theme } from './consts/theme'
import { Row, Col } from './components/flexbox'
import { getSpacing } from './utils/styled'
import { useCurrentDate } from './hooks/useCurrentDate'
import { Title } from './components/typegraphy'
import Loader from './components/loader'

const GlobalStyle = createGlobalStyle`
	body {
		margin: 0;
		font-family: 'Epilogue', sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		font-size: 16px;
	}

	::-webkit-scrollbar {
		width: 5px;
	}

	::-webkit-scrollbar-track {
		box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
	}

	::-webkit-scrollbar-thumb {
		background-color: darkgrey;
	}
`

const Container = Styled(Col)`
	box-sizing: border-box;
	min-height: 100vh;
	background-color: ${props => props.theme.backgroundColor};
`

const AppRow = Styled(Row)`
	@media (max-width:1000px) {
		flex-direction: column;
	}
`

interface IPanelProps {
	dark?: boolean
}

const Panel = Styled(Col)<IPanelProps>`
	width: 30rem;
	padding: ${getSpacing('m')};
	border-radius: ${getSpacing('xs')};
	background-color: ${(props) => props.dark ? props.theme.colors.black : props.theme.colors.white};
	color: ${(props) => props.dark ? props.theme.colors.white : props.theme.colors.black};
	box-shadow: rgb(88 102 126 / 8%) 0px 4px 24px, rgb(88 102 126 / 12%) 0px 1px 2px;

	@media (max-width: 500px) {
		width: calc(100vw - 5rem);
	}
`

const queryClient = new QueryClient()

const ExchangeRatesTableComponent = React.lazy(() => import('./ExchangeRatesTable'))
const Converter = React.lazy(() => import('./Converter'))

export default function App() {

	const { currentDate, currentDateTime } = useCurrentDate()

	return (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider theme={theme}>
				<GlobalStyle />
				<Container justify='center' align='center' gap='m' padding='m'>
					<Title>Foreign exchange rates</Title>
					<AppRow gap={'l'}>
						<Panel dark>
							<React.Suspense fallback={<Loader />}>
								<Converter
									currentDateTime={currentDateTime} />
							</React.Suspense>
						</Panel>
						<Panel>
							<React.Suspense fallback={<Loader />}>
								<ExchangeRatesTableComponent
									currentDate={currentDate}
									currentDateTime={currentDateTime} />
							</React.Suspense>
						</Panel>
					</AppRow>
				</Container>
			</ThemeProvider>
		</QueryClientProvider>
	)
}
