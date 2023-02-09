import { useQuery } from 'react-query'
import { addDays, parse, format } from 'date-fns'

import { GET_DAILY_EXCHANGE_RATES } from '../consts/endpoints'
import { ENDPOINT_DATE_FORMAT } from '../consts/date'
import parseCnbTexResponse from '../utils/parseCnbTextResponse'

const fetchExchangeRates = (query?: Record<string, string>) => {
	const ep = window.location.href.includes('localhost') ? GET_DAILY_EXCHANGE_RATES : `/cors-proxy${GET_DAILY_EXCHANGE_RATES}`
	const url = ep + `?${new URLSearchParams({
		...query,
		// added this query param to avoid browser caching
		v: new Date().toString(),
	})}`
	return fetch(url).then((res) => res.text()).then(parseCnbTexResponse)
}

export const useCurrentExchangeRates = (currentDateTime: string) => {
	return useQuery([
		'current-exchange-rate',
		// make data refresh every 5 minutes
		currentDateTime,
	], async () => {
		const data = await fetchExchangeRates()
		return data
	})
}

export const useHistoricalExchangeRates = (currentDate: string) => {
	return useQuery([
		'historical-exchange-rate',
		// refresh historical data every day
		currentDate,
	], async ({queryKey}) => {
		const currentDateObject = parse(queryKey[1], ENDPOINT_DATE_FORMAT, new Date())
		const yesterday = format(addDays(currentDateObject, -1), ENDPOINT_DATE_FORMAT)
		const lastWeek = format(addDays(currentDateObject, -7), ENDPOINT_DATE_FORMAT)
		const [yesterdayData, lastWeekData] = await Promise.all([fetchExchangeRates({date: yesterday}), fetchExchangeRates({date: lastWeek})])
		return {yesterdayData, lastWeekData}
	})
}