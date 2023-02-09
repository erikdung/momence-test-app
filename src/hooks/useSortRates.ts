import React from 'react'
import { IRate } from "../components/types"

export default function useSortRates(rates?: Record<string, IRate>) {
	const sortedRates = React.useMemo<IRate[]>(() => {
		if (!rates) {
			return []
		}
		const {USD, EUR, ...rest} = rates
		const sortedRates = Object.values(rest).sort((a, b) => (a.country > b.country ? 1 : -1))
		if (EUR) {
			sortedRates.unshift(EUR)
		}
		if (USD) {
			sortedRates.unshift(USD)
		}
		return sortedRates
	}, [rates])

	return sortedRates
}