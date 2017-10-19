import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {
  Button,
  Input,
  Modal,
  ModalLabel,
  HorizontalFlex,
  VerticalFlex
} from '../styles/'

const PrimaryButton = styled('button') `
    ${Button}
    background: #808cee;
    border: 0;
    color: white;
`

const SecondaryButton = styled('button') `
    ${Button}
    background: hsla(0,86%,68%,.8);
    border: 0;
    color: white;
`

const Form = styled('form') `
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%
`

const ModalStyle = styled(Modal) `
    ${VerticalFlex}
    max-width: 100%;
    height: 200px;
    position: relative;
`

const ActionButtons = styled('div') `
    ${HorizontalFlex}
`

class EditItem extends Component {
  editItem(e) {
    e.preventDefault();

    const title = this.title;
    const detail = this.detail;

    if (title.value !== '' || detail.value !== '') {
      this.props.editItem(this.props.index, title.value, detail.value);
    }
  }

  render() {
    return (
      <ModalStyle>
        <ModalLabel>Edit Item</ModalLabel>
        <Form
          name="addForm"
          innerRef={(input) => this.editForm = input}
          onSubmit={(e) => this.editItem(e)}
          onKeyPress={(e) => e.key === 'Enter' ? this.editItem(e)
            : null}>
          <Input
            type="text"
            margin='0 0 10px 0'
            width='100%'
            defaultValue={this.props.title}
            placeholder="Item title"
            innerRef={(input) => this.title = input}
          />
          <Input
            type="text"
            margin='0 0 10px 0'
            width='100%'
            defaultValue={this.props.detail}
            placeholder="Item detail"
            innerRef={(input) => this.detail = input}
          />

          <ActionButtons>
            <PrimaryButton
              name="addItem"
              type="submit"
              margin='0 10px 0 0'
            >
              Edit Item
                        </PrimaryButton>
            <SecondaryButton
              name="add"
              onClick={(e) => this.props.close(this.props.index)}>
              Cancel
                        </SecondaryButton>
          </ActionButtons>
        </Form>
      </ModalStyle>

    );
  }
}

EditItem.propTypes = {
  editItem: PropTypes.func,
  title: PropTypes.string,
  detail: PropTypes.string,
  close: PropTypes.func,
  index: PropTypes.string,
}

export default EditItem;
