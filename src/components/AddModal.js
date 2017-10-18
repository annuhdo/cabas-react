import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { Button } from '../styles/Button'
import { Input } from '../styles/Input'
import { Modal, ModalLabel } from '../styles/Modal'
import { VerticalFlex, HorizontalFlex } from '../styles/Flex'

const PrimaryButton = styled('button')`
    ${Button}
    background: #808cee;
    border: 0;
    color: white;
`

const SecondaryButton = styled('button')`
    ${Button}
    background: hsla(0,86%,68%,.8);
    border: 0;
    color: white;
`

class AddModal extends Component {
    createItem(e) {
        e.preventDefault()

        if (this.title.value && this.title.value !== '') {
            const newTitle = this.title.value
            const newDetail = this.detail.value || ""
    
            const item = {
                title: newTitle,
                detail: newDetail,
                owner: this.props.owner,
                completed: false
            }
    
            this.props.toggleDisplay(e)
            this.props.addItem(item)
            this.addForm.reset()
        }
    }

    render() {
        return (
            <Modal display={this.props.addable ? 'flex' : 'none'} width='450px'>
                <ModalLabel>Add an Item</ModalLabel>
                <form
                    name="addForm"
                    className="inputs"
                    ref={(input) => this.addForm = input}
                    onSubmit={(e) => this.createItem(e)}
                    onKeyPress={(e) => e.key === 'Enter' ? this.createItem(e) : null}>
                    <Input
                        type="text"
                        innerRef={(input) => this.title = input}
                        placeholder="Item name"
                        required={this.props.addable}
                        margin='0 0 10px 0'
                    />
                    <Input
                        type="text"
                        ref={(input) => this.detail = input}
                        placeholder="Description (optional)"
                        margin='0 0 10px 0'
                    />

                    <HorizontalFlex>
                        <PrimaryButton
                            name="addItem"
                            type="submit"
                            margin='0 10px 0 0'
                        >
                            Add Item
                        </PrimaryButton>
                        <SecondaryButton
                            name="add"
                            onClick={(e) => this.props.toggleDisplay(e)}>
                            Cancel
                        </SecondaryButton>
                    </HorizontalFlex>
                </form>
            </Modal>

        );
    }
}

AddModal.propTypes = {
    owner: PropTypes.string,
    toggleDisplay: PropTypes.func,
    addItem: PropTypes.func,
    addable: PropTypes.bool
}

export default AddModal;
