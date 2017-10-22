import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {
  Button,
  Input,
  Modal,
  HorizontalFlex
} from '../../styles/'

const ModalStyle = styled(Modal) `
    ${HorizontalFlex}
    height: 50px;
    left: 0;
    bottom: -60px;
    display: ${ props => props.display};
`
const PrimaryButton = styled('button') `
    ${Button}
    background: #808cee;
    border: 0;
    color: white;

    @media (max-width: 790px) {
        margin: 0;
        margin-right: 10px;
    }
`

const SecondaryButton = styled('button') `
    ${Button}
    background: hsla(0,86%,68%,.8);
    border: 0;
    color: white;

    @media (max-width: 790px) {
        margin: 0;
    }
`

const ActionButtons = styled('div') `
    ${HorizontalFlex}
    margin-left: 10px;
`

class EditTitle extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: props.currentListInfo.listName || ''
    }

    this.handleChange = this.handleChange.bind(this)
  }

  updateTitle(e) {
    e.preventDefault()

    const newTitle = this.title.value

    if (newTitle !== '') {
      this.props.updateTitle(newTitle)
    } else {
      this.props.toggleDisplay(e)
    }
  }

  handleChange(e) {
    this.setState({
      title: e.target.value
    })
  }

  render() {
    return (
      <ModalStyle
        name="editForm"
        display={this.props.editable ? 'flex' : 'none'}
        onSubmit={(e) => this.updateTitle(e)}
        onKeyPress={(e) => e.key === 'Enter' ? this.updateTitle(e) : null}>

        <Input
          type="text"
          value={this.state.title}
          onChange={this.handleChange}
          placeholder={this.props.currentListInfo.listName || ""}
          innerRef={(input) => this.title = input} />

        <ActionButtons>
          <PrimaryButton
            name="editTitle"
            type="submit"
            margin='0 10px 0 0'
          >
            Done
          </PrimaryButton>
          <SecondaryButton
            name="editTitle"
            onClick={(e) => this.props.toggleDisplay(e)}>
            Cancel
          </SecondaryButton>
        </ActionButtons>
      </ModalStyle>
    )
  }
}

EditTitle.propTypes = {
  updateTitle: PropTypes.func,
  toggleDisplay: PropTypes.func,
  editable: PropTypes.bool,
  currentListInfo: PropTypes.object
}

export default EditTitle
