import { IRate } from "../components/types"

export default function parseCnbTextResponse (responseData: string) {
	const lines = responseData.split('\n')
	return lines.slice(2).reduce<Record<string, IRate>>((acc, line) => {
		if (!line.trim()) {
			return acc
		}
		const [country, currency, amount, code, rate] = line.trim().split('|')
		acc[code] = {
			country,
			currency,
			amount,
			rate: Number(rate),
			code,
		}
		return acc
	}, {})
}