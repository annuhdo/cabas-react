import styled, { css } from 'styled-components'

export const Input = styled.input`
border-radius: 3px;
outline: 0;
border: 0;
font-size: 16px;
padding: 5px 10px;
background: #E2E5FB;
color: #4A5080;
margin: ${ props => props.margin ? props.margin : 0 };
`