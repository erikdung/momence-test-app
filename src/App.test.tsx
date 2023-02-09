import { fireEvent, render, screen } from '@testing-library/react'
import nock from 'nock'

import App from './App'
import { GET_DAILY_EXCHANGE_RATES } from './consts/endpoints'

const currentRateResponse =
`08 Feb 2023 #28
Country|Currency|Amount|Code|Rate
Australia|dollar|1|AUD|15.427
Brazil|real|1|BRL|4.274
Bulgaria|lev|1|BGN|12.158
Canada|dollar|1|CAD|16.526
China|renminbi|1|CNY|3.265
Denmark|krone|1|DKK|3.195
EMU|euro|1|EUR|23.780
Hongkong|dollar|1|HKD|2.822
Hungary|forint|100|HUF|6.121
Iceland|krona|100|ISK|15.696
USA|dollar|1|USD|22`

const yesterdayRateResponse =
`08 Feb 2023 #28
Country|Currency|Amount|Code|Rate
Australia|dollar|1|AUD|15.427
Brazil|real|1|BRL|4.274
Bulgaria|lev|1|BGN|12.158
Canada|dollar|1|CAD|16.526
China|renminbi|1|CNY|3.265
Denmark|krone|1|DKK|3.195
EMU|euro|1|EUR|23.780
Hongkong|dollar|1|HKD|2.822
Hungary|forint|100|HUF|6.121
Iceland|krona|100|ISK|15.696
USA|dollar|1|USD|23`

const lastWeekRateResponse =
`08 Feb 2023 #28
Country|Currency|Amount|Code|Rate
Australia|dollar|1|AUD|15.427
Brazil|real|1|BRL|4.274
Bulgaria|lev|1|BGN|12.158
Canada|dollar|1|CAD|16.526
China|renminbi|1|CNY|3.265
Denmark|krone|1|DKK|3.195
EMU|euro|1|EUR|23.780
Hongkong|dollar|1|HKD|2.822
Hungary|forint|100|HUF|6.121
Iceland|krona|100|ISK|15.696
USA|dollar|1|USD|24`

describe('Exchange rates converter', () => {
	jest
		.useFakeTimers()
		.setSystemTime(new Date('2020-01-01'))

	const currentScope = nock('http://localhost')
		.get(GET_DAILY_EXCHANGE_RATES)
		.query({'v': new Date().toString()})
		.reply(200, currentRateResponse)

	const yesterdayScope = nock('http://localhost')
		.get(GET_DAILY_EXCHANGE_RATES)
		.query({'v': new Date().toString(), date: '31.12.2019'})
		.reply(200, yesterdayRateResponse)

	const lastWeekScope = nock('http://localhost')
		.get(GET_DAILY_EXCHANGE_RATES)
		.query({'v': new Date().toString(), date: '25.12.2019'})
		.reply(200, lastWeekRateResponse)

	it('renders exchange rates table', async () => {
		render(<App />)
		const exchangeRatesTableTitle = await screen.findByText('Exchange rates')
		expect(exchangeRatesTableTitle).toBeInTheDocument()
		const rows = screen.getAllByTestId('rate-row')
		expect(rows).toHaveLength(11)
	})

	it('renders USD as the first row', async () => {
		render(<App />)
		await screen.findByText('Exchange rates')
		const rows = screen.getAllByTestId('rate-row')
		expect(rows[0]).toHaveTextContent(/USD/)
	})

	it('renders EUR as the second row', async () => {
		render(<App />)
		await screen.findByText('Exchange rates')
		const rows = screen.getAllByTestId('rate-row')
		expect(rows[1]).toHaveTextContent(/EUR/)
	})

	it('computes correct percentage change', async () => {
		render(<App />)
		await screen.findByText('Exchange rates')
		const rows = screen.getAllByTestId('rate-row')
		expect(rows[0]).toHaveTextContent(/\+4.35 %/)
		expect(rows[1]).toHaveTextContent(/0/)
	})

	it('renders converter tab', async () => {
		render(<App />)
		const converterTitle = await screen.findByText('Converter')
		expect(converterTitle).toBeInTheDocument()
	})

	it('renders the form', async () => {
		render(<App />)
		const form = await screen.findByTestId('converter-form')
		expect(form).toBeInTheDocument()
	})

	it('converts the currencies', async () => {
		render(<App />)
		await screen.findByTestId('converter-form')
		const input = screen.getByTestId('input')
		fireEvent.change(input, {target: {value: '2200'}})
		const select = screen.getByTestId('select')
		fireEvent.change(select, {target: {value: 'USD'}})
		const button = screen.getByRole('button')
		fireEvent.click(button)
		screen.getByText('100 USD')
	})

	afterAll(() => {
		currentScope.done()
		yesterdayScope.done()
		lastWeekScope.done()
		jest.clearAllMocks()
		jest.clearAllTimers()
	})
})