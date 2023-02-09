import React from 'react'
import {format} from 'date-fns'
import { DATETIME_FORMAT, ENDPOINT_DATE_FORMAT } from '../consts/date'

export const useCurrentDate = () => {
	const [date, setDate] = React.useState(new Date())

	React.useEffect(() => {
		const intervalId = setInterval(
			() => {
				setDate(new Date())
			},
			// refresh the Datetime and the Date every 5 minutes
			5 * 60 * 1000)

		return () => {
			clearInterval(intervalId)
		}
	}, [])

	return {
		currentDateTime: format(date, DATETIME_FORMAT),
		currentDate: format(date, ENDPOINT_DATE_FORMAT),
	}
}