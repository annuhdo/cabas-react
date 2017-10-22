import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Owners } from './index'
import { EditTitle, AddModal, ShareModal } from '../container'
import styled from 'styled-components'
import {
  Button,
  HorizontalFlex
} from '../../styles/'

const Top = styled('div') `
  ${HorizontalFlex}
  justify-content: space-between;
`

const Title = styled('div') `
  ${HorizontalFlex}
  font-size: 1.3em;
  font-weight: 400;
  text-align: left;
  max-width: 390px;
  align-items: center;
  position: relative;

  > span {
    margin-right: 10px;
    outline: none;
    transition: all 0.2s;
    max-width: 300px;
    word-wrap: normal;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-weight: 600;
    line-height: 1.6;
  }

  @media (max-width: 790px) {
    flex-direction: column;
    align-items: left;

    > button {
      margin-left: 0;
      margin-top: 5px;
    }
  }
`

const PrimaryButton = styled('button') `
  ${Button}
`

const SecondaryButton = styled('button')`
  ${Button}
  background: #808cee;
  border: 0;
  color: white;
`

const ActionButtons = styled('div')`
    ${HorizontalFlex}
    justify-content: space-between;
    margin-top: 30px;
    position: relative;

    @media (max-width: 790px) {
      margin-top: 20px;
    }
`

class MainTop extends Component {
  render() {
    return (
      <section>
        <Top>
          <Title>
            <span> {this.props.title} </span>
            <PrimaryButton name="editTitle" onClick={this.props.toggleDisplay}>
              Edit title
          </PrimaryButton>

            <EditTitle
              editable={this.props.editable}
              currentListInfo={this.props.currentListInfo}
              updateTitle={this.props.updateTitle}
              toggleDisplay={this.props.toggleDisplay}
              listId={this.props.match.params.listId}
            />
          </Title>

          <Owners
            owners={this.props.owners}
            allUsers={this.props.allUsers}
          />

        </Top>

        <ActionButtons>
            <PrimaryButton
              name="add"
              onClick={this.props.toggleDisplay} >
              Add Item
            </PrimaryButton>

            <AddModal
              addable={this.props.addable}
              addItem={this.props.addItem}
              owner={this.props.owner}
              toggleDisplay={this.props.toggleDisplay}
            />

            <SecondaryButton
              name="share"
              onClick={this.props.toggleDisplay}
            >
              Share
          </SecondaryButton>

            <ShareModal
              shareable={this.props.shareable}
              toggleDisplay={this.props.toggleDisplay}
            />
        </ActionButtons>
      </section>
    )
  }
}

MainTop.propTypes = {
  addable: PropTypes.bool,
  allUsers: PropTypes.object, 
  currentListInfo: PropTypes.object,
  editable: PropTypes.bool,
  listId: PropTypes.string,
  owner: PropTypes.string,
  owners: PropTypes.object,
  shareable: PropTypes.bool,
  title: PropTypes.string,
  toggleDisplay: PropTypes.func,
  updateTitle: PropTypes.func
}

export default MainTop
