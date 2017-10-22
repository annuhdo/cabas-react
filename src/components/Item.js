import React, { Component } from 'react'
import PropTypes from 'prop-types'
import EditItem from './EditItem'
import styled from 'styled-components'
import {
  Owner,
  Button,
  HorizontalFlex,
  VerticalFlex,
} from '../styles/'

const ListRow = styled('div') `
  ${ props => props.display ? HorizontalFlex : 'display: none'};
  font-size: 15px;
  cursor: pointer;
  transition: all 0.15s;
  position: relative;
  color: ${ props => props.completed ? '#A3A6C1' : 'inherit'};
  background: ${ props => props.completed ? '#EEEFF9' : 'none'};
  margin: ${ props => props.completed ? '0 -25px' : '0'};
  padding: ${ props => props.completed ? '18px 25px' : '18px 0'};

  &:hover {
    background: ${ props => props.completed ? '#EEEFF9' : '#FFF9FC'};
    margin: 0 -25px;
    padding: 18px 25px;
  }
`

const Bullet = styled('div') `
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: ${ props => props.completed ? '#4A5080' : 'white'};
  border: 1px solid ${ props => props.completed ? '#4A5080' : '#A3A6C1'};
  margin-right: 20px;
`

const ItemInfo = styled('div') `
  flex: 1;
  position: relative;
`

const ItemTitle = styled('div') `
  font-size: 16px;
  overflow: hidden;
  white-space: initial;
  word-wrap: break-word;
  box-sizing: border-box;
  outline: none;
`

const ItemDetail = styled('div') `
  color: #A3A6C1;
  margin-top: 8px;
  display: ${ props => props.display};
`

const ActionButtons = styled('div') `
  ${HorizontalFlex}

  @media (max-width: 790px) {
    ${VerticalFlex}
  }
`

const PrimaryButton = styled('button') `
  ${Button}

  @media (max-width: 790px) {
    margin: 0;
    margin-bottom: 10px;
    width: 100%;
  }
`

const SecondaryButton = styled('button') `
  ${Button}
  background: hsla(0,86%,68%,.8);
  border: 0;
  color: white;

  @media (max-width: 790px) {
    width: 100%;
  }
`

class Item extends Component {
  constructor() {
    super()

    this.updateItem = this.updateItem.bind(this)
  }

  updateItem(e) {
    e.preventDefault()

    const newTitle = this.title.value
    const newDetail = this.detail.value

    if (newTitle !== '') {
      this.props.editItem(this.props.index, newTitle, newDetail)
    }
  }

  render() {
    let photo = this.props.owner && this.props.owner.photo
    let name = this.props.owner && this.props.owner.name

    return (
      <div>
        <ListRow
          completed={this.props.item && this.props.item.completed}
          display={this.props.item ? 'flex' : this.props.item}
        >
          <Bullet
            completed={this.props.item && this.props.item.completed}
            onClick={(e) => this.props.toggleItemComplete(this.props.index)}>
          </Bullet>

          <ItemInfo>
            <ItemTitle>
              {this.props.item && this.props.item.title}
            </ItemTitle>
            <ItemDetail
              display={
                this.props.item && this.props.item.detail ? 'block'
                  : 'none'}
            >
              {this.props.item && this.props.item.detail}
            </ItemDetail>
          </ItemInfo>

          <Owner size='45' circular margin='0 32px'>
            <img src={photo} alt={name} />
          </Owner>

          <ActionButtons>
            <PrimaryButton
              name="edit-item"
              onClick={(e) => this.props.renderEditItem(this.props.index)}
              margin='0 10px 0 0'
            >
              Edit
                </PrimaryButton>
            <SecondaryButton
              name="delete"
              onClick={(e) => this.props.deleteItem(this.props.index)}>
              Delete
                </SecondaryButton>
          </ActionButtons>
        </ListRow>

        <EditItem
          display={this.props.showEditItem === this.props.index}
          title={this.props.item && this.props.item.title}
          detail={this.props.item && this.props.item.detail}
          close={this.props.closeEditItem}
          index={this.props.index}
          editItem={this.props.editItem}
        />

      </div>

    )
  }
}

Item.propTypes = {
  editItem: PropTypes.func,
  owner: PropTypes.object,
  index: PropTypes.string,
  item: PropTypes.object,
  deleteItem: PropTypes.func,
  closeEditItem: PropTypes.func,
  toggleItemComplete: PropTypes.func,
  showEditItem: PropTypes.string,
  renderEditItem: PropTypes.func
}

export default Item
