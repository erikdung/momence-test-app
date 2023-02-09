import Styled from 'styled-components'

import { useCurrentExchangeRates, useHistoricalExchangeRates } from './hooks/useExchangeRates'
import { getSpacing, getColor } from './utils/styled'
import { Row, Col } from './components/flexbox'
import { Subtitle } from './components/typegraphy'
import useSortRates from './hooks/useSortRates'
import PercentageChange from './components/percentage-change'
import Error from './components/error'
import Loader from './components/loader'

interface IProps {
	currentDate: string
	currentDateTime: string
}

const Table = Styled(Col)`
	height: calc(100vh - 270px);
	overflow: auto;

	@media (max-width: 500px) {
		height: fit-content;
	}

	.header {
		font-weight: bold;
	}

	.row {
		&:hover {
			background-color: ${getColor('hover')};
			border-radius: ${getSpacing('xxs')};
		}

		.column {
			width: 80px;
			flex-shrink: 0;
			flex-grow: 0;
			text-align: right;

			@media (max-width: 500px) {
				width: 60px;
				flex-shrink: 0;
			}
		}

		.currency-column {
			flex-grow: 1;
			text-align: left;

			@media (max-width: 500px) {
				width: 70px;
				flex-shrink: 0;
			}
		}

		.country-column {
			width: 120px;
			flex-shrink: 0;
			flex-grow: 0;
			text-align: left;
			text-transform: capitalize;

			@media (max-width: 500px) {
				display: none;
			}
		}
	}
`

export default function ExchangeRatesTable(props: IProps) {
	const {currentDateTime, currentDate} = props
	const currentExchangeRates = useCurrentExchangeRates(currentDateTime)
	const historicalExchangeRates = useHistoricalExchangeRates(currentDate)

	const sortedRates = useSortRates(currentExchangeRates.data)

	if (currentExchangeRates.isLoading || historicalExchangeRates.isLoading) {
		return <Loader />
	}

	if (currentExchangeRates.isError || historicalExchangeRates.isError) {
		return <Error />
	}

	return <div>
		<Subtitle>Exchange rates</Subtitle>
		<Table grow={1}>
			<Row gap='xxs' padding='xxs' className='row header'>
				<div className='currency-column'>
					<small>Currency</small>
				</div>
				<div className='country-column'>
					<small>Country</small>
				</div>
				<div className='column'>
					<small>Rate</small>
				</div>
				<div className='column'>
					<small>24h %</small>
				</div>
				<div className='column'>
					<small>7d %</small>
				</div>
			</Row>
			{sortedRates.map((row) => (
				<Row data-testid='rate-row' gap='xxs' padding='xxs' className='row' key={row.code}>
					<div className='currency-column'>
						<small>{row.code}</small>
					</div>
					<div className='country-column'>
						<small>{row.country}</small>
					</div>
					<div className='column'>
						<small>{row.rate}</small>
					</div>
					<div className='column'>
						<small>{historicalExchangeRates.data &&
							<PercentageChange currentRate={row.rate} baseRate={historicalExchangeRates.data.yesterdayData[row.code]?.rate} />
						}</small>
					</div>
					<div className='column'>
						<small>{historicalExchangeRates.data &&
							<PercentageChange currentRate={row.rate} baseRate={historicalExchangeRates.data.lastWeekData[row.code]?.rate} />
						}</small>
					</div>
				</Row>
			))}
		</Table>
	</div>
}