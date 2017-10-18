import styled, { css } from 'styled-components'
import { HorizontalFlex, VerticalFlex } from './Flex'

export const Modal = styled.div`
  position: absolute;
  bottom: -185px;
  background: white;
  border: 1px solid #e2e5fb;
  border-radius: 3px;
  padding: 15px;
  box-sizing: border-box;
  width: ${ props => (props.width) };
  z-index: 100;
`

export const ModalLabel = styled.span`
  font-size: 1.6em;
  font-weight: 600;
  margin-bottom: 15px;
`