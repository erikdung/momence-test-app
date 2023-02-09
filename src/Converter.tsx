import Styled from "styled-components"
import React from 'react'

import { Button } from './components/button'
import { Col } from './components/flexbox'
import { Subtitle } from "./components/typegraphy"
import { Input } from './components/input'
import { Select } from './components/select'
import { useCurrentExchangeRates } from "./hooks/useExchangeRates"
import useSortRates from "./hooks/useSortRates"
import Error from './components/error'
import Loader from './components/loader'

const Result = Styled.div`
	font-size: 2.5rem;
	font-weight: bold;
	line-height: 2.5rem;

	small {
		font-size: 1.5rem;
	}
`

interface IProps {
	currentDateTime: string
}

interface IForm {
	amount?: number
	currency: string
}

export default function Converter(props: IProps) {

	const exchangeRates = useCurrentExchangeRates(props.currentDateTime)

	const sortedRates = useSortRates(exchangeRates.data)

	const [formData, setFormData] = React.useReducer((state: IForm, changes: Partial<IForm>) => ({...state, ...changes}), {currency: 'EUR'})

	const [result, setResult] = React.useState('')

	const handleChangeAmount = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({amount: e.target.value !== '' ? +e.target.value : undefined})
		setResult('')
	}, [])

	const handleChangeCurrency = React.useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
		setFormData({currency: e.target.value})
		setResult('')
	}, [])

	const handleConvert = React.useCallback((e: React.FormEvent) => {
		e.preventDefault()
		if (!exchangeRates.data || !exchangeRates.data[formData.currency] || !formData.amount) {
			return
		}
		setResult((Math.round(formData.amount! / exchangeRates.data[formData.currency].rate * 100) / 100).toString())
	}, [formData, exchangeRates.data])

	if (exchangeRates.isLoading) {
		return <Loader />
	}

	if (exchangeRates.isError) {
		return <Error />
	}

	return (
		<Col gap='m' grow={1} justify='space-between'>
			<Col gap='s'>
				<Subtitle>Converter</Subtitle>
				{!!result && <Result>
					<Col gap='s'>
						<small>{formData.amount} CZK equals</small>
						<div>{result} {formData.currency}</div>
					</Col>
				</Result>}
			</Col>
			<form onSubmit={handleConvert} data-testid='converter-form'>
				<Col gap='m'>
					<Col gap='xs'>
						<label htmlFor='amount'>Enter amount in CZK</label>
						<Input
							data-testid='input'
							autoFocus id='amount'
							step='.01'
							onChange={handleChangeAmount}
							type='number'
							placeholder='Enter amount' />
					</Col>
					<Col gap='xs'>
						<label htmlFor='currency'>Select currency</label>
						<Select
							data-testid='select'
							id='currency'
							value={formData.currency}
							onChange={handleChangeCurrency}
							>
							{sortedRates.map((rate) => (
								<option key={rate.code} value={rate.code}>{rate.code} - {rate.country}</option>
								))}
						</Select>
					</Col>
					<Button data-testid='button' disabled={!formData.amount} fullWidth type='submit'>Convert</Button>
				</Col>
			</form>
		</Col>
	)
}