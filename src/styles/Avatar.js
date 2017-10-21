import styled, { css } from 'styled-components'

export const Avatar = css`
    width: ${ props => props.size }px;
    height: ${ props => props.size }px;
    border-radius: ${ props => props.circular ? '50%' : '0'};
    overflow: hidden;
`

export const Owner = styled('div') `
    ${Avatar}
    display: block;
    margin: ${ props => props.margin ? props.margin : '0 auto'};

    img {
    width: 100%;
    height: 100%;
}
`