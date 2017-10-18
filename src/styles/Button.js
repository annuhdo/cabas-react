import styled, { css } from 'styled-components'

export const Button = css`
font-size: 14px;
font-weight: 500;
background: white;
padding: 6px 18px;
margin: ${ props => props.margin ? props.margin : 0 };
border-radius: 100px;
color: #4a5080;
letter-spacing: 0;
display: inline;
border: 1px solid #e2e5fb;
cursor: pointer;
outline: none;
&:hover {
    box-shadow: inset 0 0 0 99999px rgba(128,128,128,0.2);
}
`