import { StyledProps } from "styled-components"
import { SpacingT } from "../components/types"

export const getSpacing = (spacing: SpacingT) => {
	return (props: StyledProps<any>) => props.theme.spacing[spacing]
}

export const getColor = (color: string) => {
	return (props: StyledProps<any>) => props.theme.colors[color]
}