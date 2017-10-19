import { css } from 'styled-components'

export const Avatar = css`
    width: ${ props => props.size }px;
    height: ${ props => props.size }px;
    border-radius: ${ props => props.circular ? '50%' : '0'};
    overflow: hidden;
`